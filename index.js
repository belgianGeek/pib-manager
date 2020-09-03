const env = require('dotenv').config();
const fs = require('fs-extra');
const express = require('express');
const app = express();
const ip = require('ip');
const cp = require('child_process').exec;
const path = require('path');
const process = require('process');
const admZip = require('adm-zip');
const os = require('os');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mail = require('./modules/mail');

server.listen(8000);

const {
  Client
} = require('pg');

let config = {
  user: 'postgres',
  password: 'psql',
  database: 'postgres',
  port: 5432,
  host: 'localhost'
};
const initClient = new Client(config);
let client;

// Define a variable to store the settings queried retrieved from the DB
var settings = {};

const exportDB = require('./modules/exportDB');
const emptyDir = require('./modules/emptyDir');
const notify = require('./modules/notify');
const existPath = require('./modules/existPath');

const createBarcodesTable = require('./modules/createBarcodesTable');
const createDraftsTable = require('./modules/createDraftsTable');
const createInRequestsTable = require('./modules/createInRequestsTable');
const createOutRequestsTable = require('./modules/createOutRequestsTable');
const createReadersTable = require('./modules/createReadersTable');
const createSettingsTable = require('./modules/createSettingsTable');

const createDB = (config, DBname) => {
  const createTables = () => {
    client = new Client(config);

    client.connect()
      .then(() => {
        console.log('Reconnexion effectuée !', config);
        createBarcodesTable(client);
        createDraftsTable(client);
        createInRequestsTable(client);
        createOutRequestsTable(client);
        createReadersTable(client);
        createSettingsTable(client);

        client.query({
            text: 'SELECT * FROM settings'
          })
          .then(res => {
            settings = res.rows[0];
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const setPrivileges = () => {
    // Grant all privileges to the current user connected to the OS
    initClient.query(`GRANT ALL PRIVILEGES ON DATABASE ${DBname} TO ${config.user}`)
      .then(res => {
        console.log(`Privilèges accordés à l'utilisateur ${config.user} !`);
      })
      .catch(err => {
        console.log(err);
      });

    // Set database owner
    initClient.query(`ALTER DATABASE ${DBname} OWNER TO ${config.user}`)
      .then(res => {
        console.log(`L'utilisateur ${config.user} est désormais le propriétaire de la base de données ${DBname} !`);
        initClient
          .end()
          .then(() => console.log('Reconnexion en cours...'))
          .catch(err => console.error('Une erreur est survenue lors de la tentative de reconnexion à la base de données', err));
      })
      .catch(err => {
        console.log(err);
      });
  }

  console.log(`Création de la base de données ${DBname}...`);
  initClient.query(`CREATE DATABASE ${DBname} WITH ENCODING = 'UTF-8'`)
    .then(res => {
      setPrivileges();
      console.log(`Base de données ${DBname} créée avec succès, création des tables en cours...`);
      createTables();
    })
    .catch(err => {
      if (!err.message.match('already exists')) {
        console.error(`Erreur lors de la création de la base de données ${DBname} : ${err}`);
      } else {
        console.log(`La base de données ${DBname} existe déjà !`);
        setPrivileges();
        createTables();
      }
    });
}

const createRole = (config, DBname, password) => {
  config.user = os.userInfo().username;
  config.password = password;
  config.database = DBname;
  initClient.query(`CREATE ROLE ${config.user} WITH CREATEDB CREATEROLE LOGIN PASSWORD '${password}'`, (err, res) => {
    if (err && err.code !== '42710') {
      console.log(`Une erreur est survenue lors de la création du rôle ${config.user} : ${JSON.stringify(err, null, 2)}`);
      console.error('La création de la base de données a échoué ! :-((');
    } else {
      console.log(`Rôle ${config.user} créé avec succès !`);
      createDB(config, DBname);
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
    client.query(query)
      .then(res => {
        if (res.rowCount === 0 || res.rowCount === null) {
          if (io !== null) {
            notify(io, 'info');
          }
        } else {
          if (action !== 'SELECT' && action !== 'COPY' && table !== 'barcodes') {
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
existPath('./exports/');

// Exporter une sauvegarde de la DB toutes les demi-heures
setInterval(() => {
  console.log('DB backup on ' + Date.now());
  exportDB(`./backups/pib_${Date.now()}.pgsql`);
}, 30 * 60 * 1000);


// Define a variable to store a file to download when exporting DB
let file2download = {};

initClient.connect()
  .then(() => {
    if (!ip.address().match(/169.254/) || !ip.address().match(/127.0/)) {
      console.log(`Tu peux te connecter à PIB Manager ici : http://${ip.address()}:8000.`);
      createRole(config, 'pib', process.env.PG_PASSWD);
    } else {
      console.log(`Désolé, il semble que tu n'aies pas accès à Internet... Rétablis ta connexion et réessaie :-)`);
    }
    return;
  })
  .catch(err => {
    console.log(`Connection error : ${err}`);
    if (err.code === 'ECONNREFUSED') {
      console.log('Désolé, la connexion à la base de données n\'a pas pu être établie...\n' +
        'Vérifie que le service PostgreSQL est bien démarré et relance PIB Manager.');
    }
    return;
  });

app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.render('index.ejs', {
      wallpaper: settings.wallpaper
    });

    io.once('connection', io => {
      const updateBarcode = () => {
        DBquery(io, 'SELECT', 'barcodes', {
            text: `SELECT barcode FROM barcodes LIMIT 1`
          })
          .then(res => {
            let code = res.rows[0].barcode;

            io.emit('barcode', code);
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
        emptyDir('exports');

        if (format === 'csv') {
          DBquery(io, 'COPY', 'in_requests', {
              text: `COPY in_requests TO '${path.join(__dirname + '/exports/loans.csv')}' DELIMITER ',' CSV HEADER`
            })
            .then(() => {
              DBquery(io, 'COPY', 'out_requests', {
                  text: `COPY out_requests TO '${path.join(__dirname + '/exports/borrowings.csv')}' DELIMITER ',' CSV HEADER`
                })
                .then(() => {
                  DBquery(io, 'COPY', 'drafts', {
                      text: `COPY drafts TO '${path.join(__dirname + '/exports/drafts.csv')}' DELIMITER ',' CSV HEADER`
                    })
                    .then(() => {
                      // Zip the received files before sending them to the client
                      let zip = new admZip();

                      zip.addLocalFolder('exports', 'pib-manager-export.zip');

                      file2download.path = 'exports/pib-manager-export.zip';
                      file2download.name = 'pib-manager-export.zip';

                      zip.writeZip(file2download.path);
                      io.emit('export successfull');
                    })
                    .catch(err => {
                      console.error(`Une erreur est survenue lors de l'export de la table des requêtes express : ${err}`);
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
          file2download.path = 'exports/pib.pgsql';
          file2download.name = 'pib.pgsql';
          exportDB(file2download.path);

          io.emit('export successfull');
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
        setTimeout(function() {
          mail(receiver);
          notify(io, 'mail');
        }, 10000);
      });

      io.on('retrieve readers', name => {
        if (name.length >= 3) {
          client.query(`SELECT name FROM readers WHERE name ILIKE '${name}%' LIMIT 5`)
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
    let query = '';

    io.once('connection', io => {
      io.on('search', data => {
        if (data.table === 'in_requests') {
          if (data.getTitle && !data.getReader) {
            query = `SELECT * FROM ${data.table} WHERE book_title ILIKE '%${data.title}%'`;
          } else if (data.getReader && !data.title) {
            query = `SELECT * FROM ${data.table} WHERE reader_name ILIKE '%${data.reader}%'`;
          } else if (data.getReader && data.title) {
            query = `SELECT * FROM ${data.table} WHERE (book_title ILIKE '%${data.title}%') AND (reader_name ILIKE '%${data.reader}%')`;
          } else {
            query = `SELECT * FROM ${data.table}`;
          }
        } else if (data.table === 'out_requests') {
          if (data.getTitle) {
            query = `SELECT * FROM ${data.table} WHERE book_title ILIKE '%${data.title}%'`;
          } else {
            query = `SELECT * FROM ${data.table}`;
          }
        } else if (data.table === 'drafts') {
          if (data.getTitle && !data.getReader) {
            query = `SELECT * FROM ${data.table} WHERE book_title ILIKE '%${data.title}%'`;
          } else if (!data.getTitle && data.getReader) {
            query = `SELECT * FROM ${data.table} WHERE reader_name ILIKE '%${data.reader}%'`;
          } else {
            query = `SELECT * FROM ${data.table}`;
          }
        }

        DBquery(io, 'SELECT', data.table, {
            text: query
          })
          .then(res => {
            if (res.rowCount !== 0 || res.rowCount !== null) {
              io.emit('search results', res.rows);
            }
          });
      });

      io.on('update', record => {
        if (record.table === 'drafts') {
          query = `UPDATE ${record.table} SET request_date = '${record.date}', reader_name = '${record.reader}', book_title = '${record.title}', comment = '${record.comment}' WHERE id = ${record.id}`;
        } else if (record.table === 'in_requests') {
          console.log(JSON.stringify(record, null, 2));
          if (record.authorFirstName) {
            query = `UPDATE ${record.table} SET pib_number = '${record.values[0]}', borrowing_library = '${record.values[1]}', request_date = '${record.values[2]}', reader_name = '${record.values[4]}', book_title = '${record.values[5]}', book_author_name = '${record.values[6]}', book_author_firstname = '${record.values[7]}', cdu = '${record.values[8]}', out_province = ${record.values[9]}, barcode = '${record.values[10]}' WHERE pib_number = '${record.key}'`;
          } else {
            query = `UPDATE ${record.table} SET pib_number = '${record.values[0]}', borrowing_library = '${record.values[1]}', request_date = '${record.values[2]}', reader_name = '${record.values[4]}', book_title = '${record.values[5]}', book_author_name = '${record.values[6]}', cdu = '${record.values[7]}', out_province = ${record.values[8]}, barcode = '${record.values[9]}' WHERE pib_number = '${record.key}'`;
          }
        }
        console.log(query);
        DBquery(io, 'UPDATE', record.table, {
          text: query
        })
      });

      io.on('delete data', data => {
        console.log(data);
        if (data.table === 'drafts') {
          query = `DELETE FROM ${data.table} WHERE id = ${data.key}`;
        } else if (data.table === 'in_requests') {
          query = `DELETE FROM ${data.table} WHERE pib_number = ${data.key}`;
        }
        console.log(query);

        DBquery(io, 'DELETE FROM', data.table, {
            text: query
          })
          .catch(err => {
            console.error(err);
          });
      });
    });
  })

  .get('/download', (req, res, next) => {
    res.download(file2download.path, file2download.name, err => {
      if (err) console.log(JSON.stringify(err, null, 2));
    });
  });
