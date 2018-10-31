const path = require('path');
const Promise = require('bluebird');
const promiseWriteFile = Promise.promisify(require('fs').writeFile);

const saveLocation = path.join(__dirname, '../../Exports');

const saveMetadata = (fileName, metaData) => {
  promiseWriteFile(`${fileName}_metadata.txt`, metaData)
    .then(() => true)
    .catch((err) => {
      throw err;
    });
};

const saveTranscript = (fileName, transcript) => {
  promiseWriteFile(`${saveLocation}/${fileName}_transcript.txt`, transcript)
    .then(() => true)
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  saveMetadata,
  saveTranscript,
};
