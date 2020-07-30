const createBarcodesTable = require('./createBarcodesTable');
const createDraftsTable = require('./createDraftsTable');
const createInRequestsTable = require('./createInRequestsTable');
const createOutRequestsTable = require('./createOutRequestsTable');
const createReadersTable = require('./createReadersTable');
const createRole = require('./createRole');

const createDB = (client, config, DBname) => {
  // const reconnect = (client, config) => {
  //   client.end();
  //
  //   newClient = new Client(config);
  //   newClient.connect()
  //     .then(() => {
  //       console.log('Connexion établie, création des tables...');
  //       createBarcodesTable(newClient);
  //       createDraftsTable(newClient);
  //       createInRequestsTable(newClient);
  //       createOutRequestsTable(newClient);
  //       createReadersTable(newClient);
  //     })
  //     .catch(err => {
  //       console.error(`Erreur de reconnexion... ${err}`);
  //     });
  // }
  const reconnect = (client, config) => {
    createBarcodesTable(client);
    createDraftsTable(client);
    createInRequestsTable(client);
    createOutRequestsTable(client);
    createReadersTable(client);
  }

  console.log(`Création de la base de données ${DBname}...`);
  client.query(`CREATE DATABASE ${DBname} WITH ENCODING = 'UTF-8'`)
    .then(res => {
      config.database = DBname;
      console.log(`Base de données ${DBname} créée avec succès, reconnexion en cours...`);
      reconnect(client, config);
    })
    .catch(err => {
      if (!err.message.match('already exists')) {
        console.error(`Erreur lors de la création de la base de données ${DBname} : ${err}`);
      } else {
        console.log(`La base de données ${DBname} existe déjà !`);
        config.database = DBname;
        reconnect(client, config);
      }
    });
}

module.exports = createDB;
