/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  var body = '';
  var stream = fs.createReadStream(filePath, {encoding: 'utf8'});
  stream.on('data', (chunk) => {
    body += chunk;
    if (chunk.indexOf('\n') !== -1) {
      stream.close();
    }
  });
  stream.on('error', (err) => {
    callback(err, null);
  });
  stream.on('close', () => {
    callback(null, body.slice(0, body.indexOf('\n')));
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, res, body) => {
    if (err) {
      callback(new Error('Invalid URI'));
    } else {
      callback(err, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
