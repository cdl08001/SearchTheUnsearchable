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
  const s3UploadPromise = s3.upload(objectParams, options).promise();
  s3UploadPromise
    .then((uploadData) => {
      resolve(uploadData);
    })
    .catch(uploadErr => reject(uploadErr));
});

const pullTranscription = transcriptLocation => new Promise((resolve, reject) => {
  const s3 = new AWS.S3();
  const transcript = transcriptLocation;
  const objectParams = {
    Bucket: myBucket,
    Key: transcript.split('/')[4],
  };
  const s3pullPromise = s3.getObject(objectParams).promise();
  s3pullPromise
    .then((pullData) => {
      resolve(JSON.parse(pullData.Body.toString()));
    })
    .catch(pullError => reject(pullError));
});

module.exports = {
  uploadAudio,
  myBucket,
  pullTranscription,
};
