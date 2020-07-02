const cp = require('child_process').exec;

const exportDB = name => {
  cp(`PGPASSWORD="psql" pg_dump -U postgres -h localhost pib > ${name}`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(`Erreur lors de l'export de la DB: ${err}`);
      return;
    } else {
      console.log(`La base de données a été exportée avec succès !`);
      return;
    }
  });
}

module.exports = exportDB;
