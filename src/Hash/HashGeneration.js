const crypto = require('crypto');
const fs = require('fs');

const calculateSHA256 = (file, cb) => {
  const hash = crypto.createHash('sha256');
  const input = fs.createReadStream(file.path);
  input.on('error', err => cb(err));
  input.on('readable', () => {
    const data = input.read();
    if (data) {
      hash.update(data);
    } else {
      const hc = hash.digest('hex');
      const updatedFileInfo = file;
      updatedFileInfo.hashcode = hc;
      return cb(null, updatedFileInfo);
    }
  });
};

module.exports = calculateSHA256;
