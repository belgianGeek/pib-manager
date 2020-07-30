const createDB = require('./createDB');
const fs = require('fs');
const os = require('os');

const createRole = (client, config, DBname, password) => {
  config.user = os.userInfo().username;
  config.password = password;
  config.database = DBname;
  client.query(`CREATE ROLE ${os.userInfo().username} LOGIN CREATEDB PASSWORD '${password}'`, (err, res) => {
      if (err) {
        client.query(`DROP ROLE IF EXISTS ${os.userInfo().username}`, (err, res) => {
          if (err) {
            console.log(`Erreur lors de la suppression du rôle ${os.userInfo().username} : ${JSON.stringify(err, null, 2)}`);
            createRole(client, config, DBname, password);
          } else {
            createRole(client, config, DBname, password);
          }
        });
      } else {
        console.log(`Rôle ${os.userInfo().username} créé avec succès !`);
        console.log('dbname : ' + config.database);

        createDB(client, config, DBname);
      }
    });
}

module.exports = createRole;
