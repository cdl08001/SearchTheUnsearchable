const crypto = require('crypto');
const fs = require('fs');

const calculateSHA256 = (file) => {
  const hash = crypto.createHash('sha256');
  const input = fs.createReadStream(file.path);
  input.on('readable', () => {
    const data = input.read();
    if (data) {
      hash.update(data);
    } else {
      const hashcode = hash.digest('hex');
      console.log('The hashcode for file: ', file.name, ' is: ', hashcode);
    }
  });
};

export default calculateSHA256;
