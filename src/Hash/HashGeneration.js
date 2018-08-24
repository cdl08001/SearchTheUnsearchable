const crypto = require('crypto');
const fs = require('fs');

const calculateSHA256 = file => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha256');
  const input = fs.createReadStream(file.path);
  input.on('error', readStreamErr => reject(readStreamErr));
  input.on('readable', () => {
    const data = input.read();
    if (data) {
      hash.update(data);
    } else {
      const updatedFileInfo = file;
      updatedFileInfo.hashcode = hash.digest('hex');
      resolve(updatedFileInfo);
    }
  });
});

module.exports = calculateSHA256;
