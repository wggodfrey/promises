/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise((resolve, reject) => {
    var body = '';
    var stream = fs.createReadStream(filePath, {encoding: 'utf8'});
    stream.on('data', (chunk) => {
      body += chunk;
      if (chunk.indexOf('\n') !== -1) {
        stream.close();
      }
    });
    stream.on('error', (err) => {
      reject(err);
    });
    stream.on('close', () => {
      resolve(body.slice(0, body.indexOf('\n')));
    });
  });
};

// pluckFirstLineFromFileAsync('myDir/myFile.txt').then(console.log).catch((err) => { throw err });

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(new Error('Invalid URI'));
      } else {
        resolve(res.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
