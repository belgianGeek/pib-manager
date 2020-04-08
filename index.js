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

const createInRequestsTable = require('./modules/createInRequestsTable').createInRequestsTable;
const createOutRequestsTable = require('./modules/createOutRequestsTable').createOutRequestsTable;
const createReadersTable = require('./modules/createReadersTable').createReadersTable;
const createDB = (client, config, DBname) => {
  const reconnect = (client, config) => {
    client.end();

    newClient = new Client(config);
    newClient.connect()
      .then(() => {
        console.log('successfully connected, creating tables...');
        createInRequestsTable(newClient);
        createOutRequestsTable(newClient);
        createReadersTable(newClient);
      })
      .catch(err => {
        console.error(`Error reconnecting... ${err}`);
      });
  }

  console.log(`Creating DB ${DBname}...`);
  client.query(`CREATE DATABASE ${DBname}`)
    .then(res => {
      console.log(JSON.stringify(res, null, 2));
      config.database = DBname;
      console.log(`${DBname} successfully created, reconnecting...`);
      reconnect(client, config);
    })
    .catch(err => {
      if (!err.message.match('already exists')) {
        console.error(`Error creating db : ${err}`);
      } else {
        console.log(`${DBname} already exists !`);
        config.database = DBname;
        reconnect(client, config);
      }
    });
}

const DBquery = (query, data) => {
  newClient.query(query, data)
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      console.log(err);
    });
}

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
    let inventoryNb = '13609100000015';
    qr.toString(inventoryNb, {
        type: 'svg'
      })
      .then(url => {
        io.emit('barcode', {
          code: url,
          number: inventoryNb
        });
      })
      .catch(err => {
        console.error(err);
      });

    io.on('append data', data => {
      console.log(JSON.stringify(data, null, 2));
      let query;

      if (data.table === 'out_requests') {
        // Si le nom de l'auteur ne contient pas de prénom
        if (!data.authorFirstName) {
          query = `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_name, cdu, out_province) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
          DBquery(query, data.values);
        } else {
          // Si le nom de l'auteur contient un prénom
          query = `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_name, book_author_firstname, cdu, out_province) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
          DBquery(query, data.values);
        }
      } else if (data.table === 'in_requests') {
        // Si le nom de l'auteur ne contient pas de prénom
        if (!data.authorFirstName) {
          query = `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_name, cdu, out_province, barcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
          DBquery(query, data.values);
        } else {
          // Si le nom de l'auteur contient un prénom
          query = `INSERT INTO ${data.table}(pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_name, book_author_firstname, cdu, out_province, barcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
          DBquery(query, data.values);
        }
      }
    });

    io.on('retrieve readers', name => {
      if (name.length >= 3) {
        newClient.query(`SELECT name FROM readers WHERE name ILIKE '${name}%'`)
          .then(res => {
            console.log(res.rows);
            io.emit('readers retrieved', res.rows);
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  });
});
