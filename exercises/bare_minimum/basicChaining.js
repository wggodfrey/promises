/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

// var testRoll = function(param1, param2, callback) {
//   fs.readFile('./rolltest.txt', 'utf8', (err, data) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, param1, param2);
//     }
//   });
// }

// testRoll(5,6, (param1, param2) => {
//   console.log(param1, param2)
// })

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync; 
var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then((response) => {
      // console.log(response);
      // writeFileAsync(writeFilePath);
      
    })
    .catch((e) => { console.log(e); });
  // TODO
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
