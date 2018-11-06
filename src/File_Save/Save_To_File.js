const path = require('path');
const Promise = require('bluebird');
const promiseWriteFile = Promise.promisify(require('fs').writeFile);

// Specify export location:
const saveLocation = path.join(__dirname, '../../Exports');

// Format date to 'mm/dd/yyyy AM/PM TIMEZONE' format
// Requires 'replace' to remove commma separating date and time.
const formatDate = (dateString) => {
  const newDate = new Date(dateString);
  const options = {
    timeZone: 'UTC',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };
  const regex = /, /gi;
  return newDate.toLocaleString('en', options).replace(regex, ' ');
};

// Convert incoming metadata from JSON to CSV format and save to 'saveLocation'
const saveMetadata = (fileName, metaData) => {
  let commaSeparatedData = 'Last Modified Date,File Name,File Path,File Size,File Type,Hashcode\n';

  Object.keys(metaData).forEach((field) => {
    if (field === 'hashcode') {
      commaSeparatedData += metaData[field];
    } else if (field === 'lastModifiedDate') {
      const dateString = formatDate(metaData[field]);
      commaSeparatedData += `${dateString},`;
    } else {
      commaSeparatedData += `${metaData[field]},`;
    }
  });

  return promiseWriteFile(`${saveLocation}/${fileName}_metadata.csv`, commaSeparatedData)
    .then(() => 'Metadata Saved Successfully')
    .catch((err) => {
      throw err;
    });
};

const saveTranscript = (fileName, transcript) => promiseWriteFile(`${saveLocation}/${fileName}_transcript.txt`, transcript)
  .then(() => true)
  .catch((err) => {
    throw err;
  });

module.exports = {
  saveMetadata,
  saveTranscript,
};
