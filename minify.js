const fs = require('fs');
const minify = require('minify');

let totalCode = '';

// Remove the old minified file
fs.unlink('./src/js/app.min.js', (err) => {
  if (err && err.code !== 'ENOENT') {
    console.log(`Error deleting outdated minified file : ${err}`);
  }
});

let files = fs.readdirSync('./src/js/');

files.forEach((file, i) => {
  minify(`./src/js/${file}`).then(code => {
      fs.appendFile('./src/js/app.min.js', code, (err) => {
        if (err) {
          console.log(`Error writing file : ${err}`);
        } else {
          console.log(`Successfully minified file : ${file}`);
        }
      });
    })
    .catch(console.error);
});
