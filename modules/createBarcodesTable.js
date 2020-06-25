const fs = require('fs');

module.exports = function createBarcodesTable(client) {
  client.query('CREATE TABLE IF NOT EXISTS barcodes (' +
    'id SERIAL,' +
    'barcode TEXT)', (err, res) => {
      if (err) {
        console.error(`Error creating barcodes table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('barcodes table exists, moving on...');

        client.query(`SELECT * FROM barcodes`, (err, res) => {
          if (err) {
            console.error(`Erreur lors de la requête de code-barres dans la table barcodes : ${err}`);
          } else {
            if (res.rowCount === 0 || res.rowCount === null) {
              fs.readFile('./barcodes/unused.json', (err, data) => {
                if (err) {
                  console.error(`Erreur lors de la lecture du fichier code-barres : ${err}`);
                } else {
                  let barcodes = JSON.parse(data);
                  for (const code of barcodes) {
                    client.query({
                        text: `INSERT INTO barcodes(barcode) VALUES($1)`,
                        values: [code]
                      })
                      .catch(err => {
                        console.error(`Erreur lors de l'ajout de code-barres dans la table barcodes : ${err}`);
                      });
                  }
                }
              });
            }
          }
        });
      }
    });
}
