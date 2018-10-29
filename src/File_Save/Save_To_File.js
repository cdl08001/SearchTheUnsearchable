const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const saveMetadata = (filePath, metaData) => {
  fs.writeFile(`${filePath}_metadata.txt`, metaData)
    .then(() => 0)
    .catch((err) => {
      throw err;
    });
};

const saveTranscript = (filePath, transcript) => {
  fs.writeFile(`${filePath}_transcript.txt`, transcript)
    .then(() => 0)
    .catch((err) => {
      throw err;
    });
};

console.log(path.join(__dirname, '../../Exports'));

module.exports = {
  saveMetadata,
  saveTranscript,
};
