const fs = require('fs-extra');
const express = require('express');
const app = express();
const ip = require('ip');
const cp = require('child_process').exec;
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

const createBarcodesTable = require('./modules/createBarcodesTable');
const createDraftsTable = require('./modules/createDraftsTable');
const createInRequestsTable = require('./modules/createInRequestsTable');
const createOutRequestsTable = require('./modules/createOutRequestsTable');
const createReadersTable = require('./modules/createReadersTable');
const exportDB = require('./modules/exportDB');
const notify = require('./modules/notify');
const existPath = require('./modules/existPath');
const createDB = (client, config, DBname) => {
  const reconnect = (client, config) => {
    client.end();

    newClient = new Client(config);
    newClient.connect()
      .then(() => {
        newClient.query('SET datestyle TO sql, dmy;')
          .then(res => {
            console.log("Le format de date de la DB a bien été reglé sur 'SQL, DMY'");
          })
          .catch(err => {
            console.error(`Erreur lors du réglage de la date de la DB : ${err}`);
          });
        console.log('Connexion établie, création des tables...');
        createBarcodesTable(newClient);
        createDraftsTable(newClient);
        createInRequestsTable(newClient);
        createOutRequestsTable(newClient);
        createReadersTable(newClient);
      })
      .catch(err => {
        console.error(`Erreur de reconnexion... ${err}`);
      });
  }

  console.log(`Création de la base de données ${DBname}...`);
  client.query(`CREATE DATABASE ${DBname} WITH ENCODING = 'UTF-8'`)
    .then(res => {
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
  if (arguments.length === 3) {
    action = arguments[0];
    table = arguments[1];
    query = arguments[2];
    io = null;
  }

  return new Promise((fullfill, reject) => {
    newClient.query(query)
      .then(res => {
        if (res.rowCount === 0 || res.rowCount === null) {
          if (io !== null) {
            notify(io, 'info');
          }
        } else {
          if (action !== 'SELECT' && table !== 'barcodes') {
            if (io !== null) {
              notify(io, 'success');
            }
          }
        }

        fullfill(res);
        return;
      })
      .catch(err => {
        if (action !== 'SELECT' && table !== 'barcodes') {
          notify(io, 'error');
        }
        console.log(err);
        reject(err);
        return;
      });
  });
}

existPath('./backups/');

// Exporter une sauvegarde de la DB toutes les demi-heures
setInterval(() => {
  exportDB(`./backups/pib_${Date.now()}.pgsql`);
}, 30 * 60 * 1000);

client.connect()
  .then(() => {
    if (!ip.address().match(/169.254/) || !ip.address().match(/127.0/)) {
      console.log(`Tu peux te connecter à PIB Manager ici : http://${ip.address()}:8000.`);
    } else {
      console.log(`Désolé, il semble que tu n'aies pas accès à Internet... Rétablis ta connexion et réessaie :-)`);
    }

    createDB(client, config, 'pib');
    return;
  })
  .catch(err => {
    console.log(`Connection error : ${JSON.stringify(err, null, 2)}`);
    if (err.code === 'ECONNREFUSED') {
      let errMsg = 'Désolé, la connexion à la base de données n\'a pas pu être établie...\n' +
        'Vérifie que le service PostgreSQL est bien démarré et relance PIB Manager.';

      console.log(errMsg);
    }
    return;
  });

app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.render('index.ejs');

    io.once('connection', io => {
      const updateBarcode = () => {
        DBquery(io, 'SELECT', 'barcodes', {
            text: `SELECT barcode FROM barcodes LIMIT 1`
          })
          .then(res => {
            let code = res.rows[0].barcode;
            qr.toString(code, {
                type: 'svg'
              })
              .then(url => {
                io.emit('barcode', {
                  code: url,
                  number: code
                });
              })
              .catch(err => {
                console.error(err);
              });
          })
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
          DBquery(io, 'DELETE FROM', 'barcodes', {
              text: `DELETE FROM barcodes WHERE barcode ILIKE '${data.values[data.values.length - 1]}'`
            })
            .then(() => {
              updateBarcode();
            })
            .catch(err => {
              console.error(`Erreur lors de la mise à jour de la table barcodes : ${err}`);
            });
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
        } else if (data.table === 'drafts') {
          DBquery(io, 'INSERT INTO', data.table, {
            text: `INSERT INTO ${data.table}(reader_name, request_date, book_title, comment) VALUES($1, $2, $3, $4)`,
            values: data.values
          });
        }

      });

      io.on('delete data', data => {
        if (data.table === 'in_requests') {
          DBquery(io, 'DELETE FROM', data.table, {
              text: `DELETE FROM ${data.table} WHERE barcode ILIKE '${data.data}'`
            })
            .then(() => {
              DBquery(io, 'INSERT INTO', 'barcodes', {
                  text: `INSERT INTO barcodes(barcode) VALUES($1)`,
                  values: [data.data]
                })
                .catch(err => {
                  console.error(`Erreur lors de la mise à jour de la table barcodes : ${err}`);
                });
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

      io.on('export db', format => {
        if (format === 'csv') {
          DBquery(io, 'COPY', 'in_requests', {
              text: `COPY in_requests TO '${path.join(__dirname + 'prêts.csv')}' DELIMITER ',' CSV HEADER`
            })
            .then(() => {
              DBquery(io, 'COPY', 'out_requests', {
                  text: `COPY out_requests TO '${path.join(__dirname + 'emprunts.csv')}' DELIMITER ',' CSV HEADER`
                })
                .then(() => {
                  DBquery(io, 'COPY', 'drafts', {
                    text: `COPY drafts TO '${path.join(__dirname + 'drafts.csv')}' DELIMITER ',' CSV HEADER`
                  })
                  .catch(err => {
                    console.error(`Une erreur est survenue lorts de l'export de la table des requêtes express : ${err}`);
                  });
                })
                .catch(err => {
                  console.error(`Une erreur est survenue lors de l'export de la table des prêts : ${err}`);
                });
            })
            .catch(err => {
              console.error(`Une erreur est survenue lors de l'export de la table des emprunts : ${err}`);
            });
        } else if (format === 'pgsql') {
          exportDB('pib.pgsql');
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
        } else if (data.table === 'drafts') {
          if (data.getTitle && !data.getReader) {
            query = `SELECT * FROM ${data.table} WHERE book_title ILIKE '%${data.title}%'`;
          } else if (!data.getTitle && data.getReader) {
            query = `SELECT * FROM ${data.table} WHERE reader_name ILIKE '%${data.reader}%'`;
          }
        }

        DBquery(io, 'SELECT', data.table, {
            text: query
          })
          .then(res => {
            if (res.rowCount !== 0 || res.rowCount !== null) {
              console.log('Results : ' + JSON.stringify(res.rows, null, 2));
              io.emit('search results', res.rows);
            }
          });
      });
    });
  });
