const fs = require('fs');
const express = require('express');
const app = express();
const ip = require('ip');
const {
  execFile
} = require('child_process');
const path = require('path');
const process = require('process');
const qr = require('qrcode');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mail = require('./modules/mail');

server.listen(8000);

const {
  Client
} = require('pg');

const config = {
  user: 'postgres',
  password: 'psql',
  database: 'postgres',
  port: 5432,
  host: 'localhost'
};
const client = new Client(config);
let newClient;

// Tableau permettant de stocker les code-barres
let unusedBarcodes = [];

const createInRequestsTable = require('./modules/createInRequestsTable');
const createOutRequestsTable = require('./modules/createOutRequestsTable');
const createReadersTable = require('./modules/createReadersTable');
const notify = require('./modules/notify');
const createDB = (client, config, DBname) => {
  const reconnect = (client, config) => {
    client.end();

    newClient = new Client(config);
    newClient.connect()
      .then(() => {
        console.log('Connexion établie, création des tables...');
        createInRequestsTable(newClient);
        createOutRequestsTable(newClient);
        createReadersTable(newClient);
      })
      .catch(err => {
        console.error(`Erreur de reconnexion... ${err}`);
      });
  }

  console.log(`Création de la base de données ${DBname}...`);
  client.query(`CREATE DATABASE ${DBname}`)
    .then(res => {
      console.log(JSON.stringify(res, null, 2));
      config.database = DBname;
      console.log(`${DBname} créée avec succès, reconnexion en cours...`);
      reconnect(client, config);
    })
    .catch(err => {
      if (!err.message.match('already exists')) {
        console.error(`Erreur lors de la création de la base de données ${DBname} : ${err}`);
      } else {
        console.log(`${DBname} existe déjà !`);
        config.database = DBname;
        reconnect(client, config);
      }
    });
}

const DBquery = (io, action, table, query) => {
  return new Promise((fullfill, reject) => {
    newClient.query(query)
      .then(res => {
        if (res.rowCount === 0 || res.rowCount === null) {
          notify(io, 'info');
        } else {
          if (action !== 'SELECT') {
            notify(io, 'success');
          }
        }

        fullfill(res);
      })
      .catch(err => {
        if (action !== 'SELECT') {
          notify(io, 'error');
        }
        console.log(err);
        reject(err);
      });
  });
}

// Récupérer les code-barres inutilisés au démarrage de l'application
unusedBarcodes = fs.readFileSync('./barcodes/unused.json', 'utf-8');
unusedBarcodes = JSON.parse(unusedBarcodes);
JSON.stringify(unusedBarcodes, null, 2);

// Sauvegarder les code-barres toutes les 5 minutes
const saveBarcodes = require('./modules/saveBarcodes');
saveBarcodes(unusedBarcodes);

client.connect()
  .then(() => {
    if (!ip.address().match(/169.254/) || !ip.address().match(/127.0/)) {
      console.log(`Tu peux te connecter à PIB Manager ici : http://${ip.address()}:8000.`);
    } else {
      console.log(`Désolé, il semble que tu n'aies pas accès à Internet... Rétablis ta connexion et réessaie :-)`);
    }

    createDB(client, config, 'pib');
  })
  .catch(err => {
    console.log(JSON.stringify(err, null, 2));
    if (err.code === 'ECONNREFUSED') {
      let errMsg = 'Désolé, la connexion à la base de données n\'a pas pu être établie...\n' +
        'Vérifie que le service PostgreSQL est bien démarré et relance PIB Manager.';

      console.log(errMsg);
    }
  });

app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.render('index.ejs');

    io.once('connection', io => {
      const updateBarcode = () => {
        qr.toString(unusedBarcodes[0], {
            type: 'svg'
          })
          .then(url => {
            io.emit('barcode', {
              code: url,
              number: unusedBarcodes[0]
            });
          })
          .catch(err => {
            console.error(err);
          });
      }
      updateBarcode();

      io.on('append data', data => {
        if (data.table === 'out_requests') {
          // Si le nom de l'auteur ne contient pas de prénom
          if (!data.authorFirstName) {
            DBquery(io, 'INSERT INTO', data.table, {
              text: `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, book_title, book_author_name, cdu, out_province) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
              values: data.values
            });
          } else {
            // Si le nom de l'auteur contient un prénom
            DBquery(io, 'INSERT INTO', data.table, {
              text: `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, book_title, book_author_name, book_author_firstname, cdu, out_province) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
              values: data.values
            });
          }
        } else if (data.table === 'in_requests') {
          // Si le nom de l'auteur ne contient pas de prénom
          if (!data.authorFirstName) {
            DBquery(io, 'INSERT INTO', data.table, {
              text: `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_name, cdu, out_province, barcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
              values: data.values
            });
          } else {
            // Si le nom de l'auteur contient un prénom
            DBquery(io, 'INSERT INTO', data.table, {
              text: `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_name, book_author_firstname, cdu, out_province, barcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
              values: data.values
            });
          }

          // On supprime le code-barres utilisé
          unusedBarcodes.shift();
          updateBarcode();
        } else if (data.table === 'readers') {
          // S'il n'y a pas d'email
          if (data.values.length === 2) {
            DBquery(io, 'INSERT INTO', data.table, {
              text: `INSERT INTO ${data.table}(name, gender) VALUES($1, $2)`,
              values: data.values
            });
          } else if (data.values.length === 3) {
            DBquery(io, 'INSERT INTO', data.table, {
              text: `INSERT INTO ${data.table}(name, email, gender) VALUES($1, $2, $3)`,
              values: data.values
            });
          }
        }
      });

      io.on('delete data', data => {
        if (data.table === 'in_requests') {
          DBquery(io, 'DELETE FROM', data.table, {
              text: `DELETE FROM ${data.table} WHERE barcode = '${data.data}'`
            })
            .then(barcode => {
              unusedBarcodes.push(data.barcode);
            })
            .catch(err => {
              console.error(err);
            });
        } else if (data.table === 'out_requests') {
          DBquery(io, 'DELETE FROM', data.table, {
              text: `DELETE FROM ${data.table} WHERE pib_number = '${data.data}'`
            })
            .catch(err => {
              console.error(err);
            });
        }
      });

      io.on('mail request', reader => {
        DBquery(io, 'SELECT', 'readers', {
            text: `SELECT email, gender FROM readers WHERE name ILIKE '${reader}'`
          })
          .then(res => {
            io.emit('mail retrieved', {
              mail: res.rows[0].email.substring(7, 100),
              gender: res.rows[0].gender
            });
          })
          .catch(err => {
            console.log(JSON.stringify(err, null, 2));
          });
      });

      io.on('send mail', receiver => {
        mail(receiver);
      });

      io.on('retrieve readers', name => {
        if (name.length >= 3) {
          newClient.query(`SELECT name FROM readers WHERE name ILIKE '${name}%' LIMIT 5`)
            .then(res => {
              io.emit('readers retrieved', res.rows);
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    });
  })

  .get('/search', (req, res) => {
    res.render('search.ejs');

    io.on('connection', io => {
      io.on('search', data => {
        let query = '';
        console.log(JSON.stringify(data, null, 2));
        if (data.table === 'in_requests') {
          if (data.getTitle && !data.getReader) {
            query = `SELECT * FROM ${data.table} WHERE book_title ILIKE '%${data.title}%'`;
          } else if (data.getReader && !data.title) {
            query = `SELECT * FROM ${data.table} WHERE reader_name ILIKE '%${data.reader}%'`;
          } else if (data.getReader && data.title) {
            query = `SELECT * FROM ${data.table} WHERE (book_title ILIKE '%${data.title}%') AND (reader_name ILIKE '%${data.reader}%')`;
          }
        } else if (data.table === 'out_requests') {
          if (data.getTitle) {
            query = `SELECT * FROM ${data.table} WHERE book_title ILIKE '%${data.title}%'`;
          }
        }

        DBquery(io, 'SELECT', data.table, {
          text: query
        })
        .then(res => {
          if (res.rowCount === 0 || res.rowCount === null) {
            notify(io, 'info');
          } else {
            console.log(JSON.stringify(res.rows, null, 2));
            io.emit('search results', res.rows);
          }
        });
      });
    });
  });
