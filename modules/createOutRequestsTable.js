exports.createOutRequestsTable = function(client) {
  client.query('CREATE TABLE IF NOT EXISTS out_requests (' +
    'pib_number INT,' +
    'borrowing_library TEXT,' +
    'request_date DATE,' +
    'loan_library TEXT,' +
    'book_title TEXT,' +
    'book_author_firstname TEXT,' +
    'book_author_name TEXT,' +
    'cdu TEXT,' +
    'out_province BOOLEAN,' +
    'date_arrival DATE,' +
    'return_date DATE)', (err, res) => {
      if (err) {
        console.error(`Error creating out_requests table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('out_requests table exists, moving on...');
      }
    });
}
