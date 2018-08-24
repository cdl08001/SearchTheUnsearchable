const AWS = require('aws-sdk');
const fs = require('fs');

const myBucket = 'stu-bucket-02';

// createReadStream used for decreased memory consumption.
// Uploads to S3 in 10mb chunks.
const uploadAudio = file => new Promise((resolve, reject) => {
  const s3 = new AWS.S3();
  const input = fs.createReadStream(file.path);
  const objectParams = {
    Bucket: myBucket,
    Key: file.name,
    Body: input,
    ServerSideEncryption: 'AES256',
  };
  const options = {
    partSize: 10 * 1024 * 1024,
    queueSize: 1,
  };
  input.on('error', readStreamError => reject(readStreamError));
  const s3Promise = s3.upload(objectParams, options).promise();
  s3Promise
    .then((uploadData) => {
      console.log('SUCCESS: File Uploaded: ', uploadData);
      resolve(uploadData);
    })
    .catch(uploadErr => reject(uploadErr));
});

module.exports = {
  uploadAudio,
  myBucket,
};
