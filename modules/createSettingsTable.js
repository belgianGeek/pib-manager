const createSettingsTable = client => {
  client.query(`CREATE TABLE IF NOT EXISTS settings (
    library TEXT,
    mail_address TEXT,
    smtp_user TEXT,
    smtp_passwd TEXT,
    pg_passwd TEXT
)`, (err, res) => {
  if (err) {
    console.error(`La création de la table 'settings' a échoué : ${JSON.stringify(err, null, 2)}`);
  } else {
    console.log('La table \'settings\' existe...');
  }
});
}

module.exports = createSettingsTable;
