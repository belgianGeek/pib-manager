const path = require('path');

const createReadersTable = client => {
  client.query('CREATE TABLE IF NOT EXISTS readers (' +
    'name TEXT,' +
    'email TEXT,' +
    'gender TEXT)', (err, res) => {
      if (err) {
        console.error(`Error creating readers table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('readers table exists, moving on...');
        client.query('SELECT * FROM readers')
          .then(res => {
            if (res.rowCount === 0 || res.rowCount === undefined || res.rowCount === null) {
              client.query(`COPY readers(name, email, gender) FROM '${path.join(__dirname, '../')}adlib.csv' DELIMITER ',' CSV HEADER;`)
                .then(res => {
                  console.log(`${res.rowCount} enregistrements ont été ajoutés à la table readers ;-)`);
                })
                .catch(err => {
                  console.error(`Une erreur est survenue lors du remplissage de la table readers : ${err}`);
                });
            } else {
              console.log('La table readers est déjà remplie ;-)');
            }
          });
      }
    });
}

module.exports = createReadersTable;
