const createOutRequestsTable = client => {
  client.query('CREATE TABLE IF NOT EXISTS out_requests (' +
    'pib_number INT,' +
    'borrowing_library TEXT,' +
    'request_date TIMESTAMPTZ,' +
    'loan_library TEXT,' +
    'book_title TEXT,' +
    'book_author_firstname TEXT,' +
    'book_author_name TEXT,' +
    'cdu TEXT,' +
    'out_province BOOLEAN)', (err, res) => {
      if (err) {
        console.error(`Error creating out_requests table : ${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('out_requests table exists, moving on...');
      }
    });
}

module.exports = createOutRequestsTable;
