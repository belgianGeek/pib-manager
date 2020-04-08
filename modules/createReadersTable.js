exports.createReadersTable = function(client) {
  client.query('CREATE TABLE IF NOT EXISTS readers (' +
    'name TEXT,' +
    'email TEXT,' +
    'gender TEXT)', (err, res) => {
      if (err) {
        console.error(`Error creating readers table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('readers table exists, moving on...');
      }
    });
}
