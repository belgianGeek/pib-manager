const cp = require('child_process').exec;

module.exports = function update(io, tag) {
  cp('git fetch && git pull', (err, stdout, stderr) => {
    if (err) {
      console.error(`Une erreur est survenue lors de la vérification des mises à jour : ${err}`);
    } else {
      if (!stderr) {
        console.log(stdout);

        io.emit('update progress', {
          code: 200,
          text: 'Récupération des fichiers...'
        });

        cp('npm install', (err, stdout, stderr) => {
          if (err) {
            console.error(`Une erreur est survenue lors de la mise à jour des dépendances : ${err}`);
          } else {
            if (!stderr) {
              console.log(stdout);

              io.emit('update progress', {
                code: 200,
                text: 'Mise à jour des dépendances...'
              });

              cp('npm prune', (err, stdout, stderr) => {
                if (err) {
                  console.error(`Une erreur est survenue lors du nettoyage des dépendances : ${err}`);
                } else {
                  if (!stderr) {
                    console.log(stdout);

                    io.emit('update progress', {
                      code: 200,
                      text: 'Nettoyage...'
                    });

                  } else console.error(`Une erreur est survenue lors du processus 'npm prune' : ${stderr}`);
                }
              });
            } else console.error(`Une erreur est survenue lors du processus 'npm install' : ${stderr}`);
          }
        });
      } else console.error(`Une erreur est survenue lors du processus 'git fetch && git pull' : ${stderr}`);
    }
  });
}
