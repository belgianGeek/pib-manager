const unzip = require('adm-zip');
const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');
const cp = require('child_process').exec;

module.exports = function(io, tag) {
  axios({
      url: 'https://api.github.com/repos/belgianGeek/pib-manager/releases',
      method: 'GET'
    })
    .then(res => {
      if (res.status === 200) {
        if (res.data[0].tag_name > tag) {
          axios({
              url: res.data[0].zipball_url,
              method: 'GET',
              responseType: 'stream'
            })
            .then(res => {
              let downloadWriteStream = fs.createWriteStream('./tmp/update.zip');
              let readStream = fs.createReadStream('./tmp/update.zip');

              if (res.status === 200) {
                // Send update progress to the client
                io.emit('update progress', 'Téléchargement...');

                res.data.pipe(downloadWriteStream);
                downloadWriteStream.on('error', err => {
                    console.log('file error : ' + err);
                  })
                  .on('finish', () => {
                    console.log('Download finished, unzipping update...');
                    let zip = new unzip('./tmp/update.zip');
                    let zipEntries = zip.getEntries();
                    let unzippedDir = `tmp/${zipEntries[0].entryName}`;

                    // Send update progress to the client
                    io.emit('update progress', 'Extraction...');

                    zip.extractAllTo('./tmp/', true);
                    fs.readdir(path.join(__dirname, '..', unzippedDir), (err, files) => {
                      if (err) {
                        console.error(`Error reading unzipped folder ${unzippedDir} : ${err}`);
                      } else {
                        console.log('Update unzipped, moving files...');
                        files.forEach((file, i) => {
                          fs.moveSync(path.join(__dirname, '..', unzippedDir, file), path.join(__dirname, '..', file), {
                            overwrite: true
                          });

                          if (i === files.length - 1) {
                            console.log('Update successfully extracted !');
                            console.log('Checking for dependencies updates...');
                            cp('npm install', (err, stdout, stderr) => {
                              if (err) {
                                console.error(`Error checking for dependencies updates : ${err}`);
                              } else {
                                if (!stderr) {
                                  console.log(stdout);
                                  cp('npm prune', (err, stdout, stderr) => {
                                    if (err) {
                                      console.log(`Error removing unused dependencies : ${err}`);
                                    } else {
                                      if (!stderr) {
                                        console.log(stdout);
                                      } else console.log(`Error running npm prune : ${stderr}`);
                                    }
                                  });
                                } else {
                                  console.error(`Error running npm install : ${stderr}`);
                                }
                              }
                            });

                            // Send update progress to the client
                            io.emit('update progress', 'Nettoyage...');
                            console.log('Nettoyage...');
                            fs.remove(unzippedDir, () => {
                              io.emit('update progress', 'Terminé !');

                              io.emit('update progress', 'Redémarre PIB Manager');
                            });
                          }
                        });
                      }
                    });
                  });
              } else if (res.status === 404) {
                console.log('Impossible de rechercher des mises à jour, page non trouvée...');
              } else if (res.status === 401) {
                console.log('Tu n\'es pas autorisé à visiter cette page. La recherche de mises à jour à échoué.');
              } else if (res.status === 500) {
                console.log('L\'API Github est injoignable :((');
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else if (res.data[0].tag_name >= tag) {
          console.log("Tu es déjà à jour !");
          io.emit('update progress', 'Terminé !');

          setTimeout(() => {
            io.emit('update progress', 'Mettre à jour');
          }, 2500);
        }
      } else if (res.status === 404) {
        console.log('Impossible de rechercher des mises à jour, page non trouvée...');
      } else if (res.status === 401) {
        console.log('Tu n\'es pas autorisé à visiter cette page. La recherche de mises à jour à échoué.');
      } else if (res.status === 500) {
        console.log('L\'API Github est injoignable, code d\'erreur 500:((');
      } else {
        console.error(`Une ereur inconnue s'est produite lors de la recherche de mises à jour... Le serveur a renvoyé un statut ${res.status}.`);
      }
    })
    .catch(err => console.error(`Axios a renvoyé une erreur lors de la recherche de mises à jour : ${err}`));
};
