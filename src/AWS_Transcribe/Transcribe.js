const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { myBucket } = require('../AWS_S3/S3.js');

// Config region and bucket region need to match per API specs.
// For some reason, I can only get it to work out of 'us-east-1' region:
AWS.config.update({ region: 'us-east-1' });

// Need to pass in the URL of the S3 location.
// Must be in the same region as the API endpoint
// Send transcriptionjob back to cb for tracking

const transcribeAudio = (file, cb) => {
  const transcribeService = new AWS.TranscribeService({ apiVersion: '2017-10-26' });
  const jobId = uuidv4();
  const fileExtension = file.name.slice(file.name.indexOf('.') + 1);
  const objectParams = {
    LanguageCode: 'en-US',
    Media: {
      MediaFileUri: `https://s3-us-east-1.amazonaws.com/${myBucket}/${file.name}`,
    },
    MediaFormat: fileExtension,
    TranscriptionJobName: jobId,
    OutputBucketName: myBucket,
  };
  transcribeService.startTranscriptionJob(objectParams, (err, data) => {
    if (err) cb(err);
    else cb(null, data);
  });
};

const tempFile = {
  lastModifiedDate: '2018-08-14T19:17:20.617Z',
  name: 'BOSpeechTrimmed.mp3',
  path: '/Users/calinlewis/Desktop/Personal_Projects/Sample Audio/BOSpeechTrimmed.mp3',
  size: 2581355,
  type: 'audio/mp3',
  hashcode: 'f630fe5ade1595ce291186a0d441dcbefb5de8d843c3f75e2f5ac99a039ef15e',
};

transcribeAudio(tempFile, (err, data) => {
  if (err) console.log('Transcription Error Occurred: ', err);
  else console.log('Transcription Succeeded: ', data);
});

module.exports = {
  transcribeAudio,
};
