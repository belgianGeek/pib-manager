module.exports = function createInRequestsTable(client) {
  client.query('CREATE TABLE IF NOT EXISTS in_requests (' +
    'pib_number INT,' +
    'borrowing_library TEXT,' +
    'request_date TIMESTAMPTZ,' +
    'loan_library TEXT,' +
    'reader_name TEXT,' +
    'book_title TEXT,' +
    'book_author_firstname TEXT,' +
    'book_author_name TEXT,' +
    'cdu TEXT,' +
    'out_province BOOLEAN,' +
    'barcode TEXT)', (err, res) => {
      if (err) {
        console.error(`Error creating in_requests table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('in_requests table exists, moving on...');
      }
    });
}
