module.exports = function createDraftsTable(client) {
  client.query('CREATE TABLE IF NOT EXISTS drafts (' +
    'id SERIAL,' +
    'reader_name TEXT,' +
    'request_date DATE,' +
    'book_title TEXT,' +
    'comment TEXT)', (err, res) => {
      if (err) {
        console.error(`Error creating drafts table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('drafts table exists, moving on...');
      }
    });
}
