const fs = require('fs');

exports.saveBarcodes = function(barcodes) {
  setInterval(() => {
    fs.writeFile('./barcodes/unused.json', JSON.stringify(barcodes, null, 2), 'utf-8', () => {
      console.log('Les code-barres ont été sauvegardés ;-)');
    })
  }, 300000);
}
