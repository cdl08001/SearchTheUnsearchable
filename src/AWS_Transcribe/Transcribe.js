const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const { myBucket } = require('../AWS_S3/S3.js');

// Config region and bucket region need to match per API specs.
// For some reason, I can only get it to work out of 'us-east-1' region:
AWS.config.update({ region: 'us-east-1' });

// Create the transcribe service object:
const transcribeService = new AWS.TranscribeService({ apiVersion: '2017-10-26' });

// Need to pass in the URL of the S3 location.
// Must be in the same region as the API endpoint
// Send transcriptionjob back to cb for tracking

const submitTranscriptionJob = (file, cb) => {
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
  transcribeService.startTranscriptionJob(objectParams, (jobSubmitErr, data) => {
    if (jobSubmitErr) cb(jobSubmitErr);
    else cb(null, data, jobId);
  });
};

const checkTranscriptionStatus = (jobId, cb) => {
  const objectParams = {
    TranscriptionJobName: jobId,
  };
  transcribeService.getTranscriptionJob(objectParams, (checkStatusErr, data) => {
    if (checkStatusErr) {
      cb(checkStatusErr);
    } else if (data.TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
      cb(null, data.TranscriptionJob.FailureReason);
    } else if (data.TranscriptionJob.TranscriptionJobStatus === 'IN_PROGRESS') {
      cb(null, null, true);
      setTimeout(() => { checkTranscriptionStatus(jobId, cb); }, 30000);
    } else if (data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
      cb(null, null, null, data);
    }
  });
};

module.exports = {
  submitTranscriptionJob,
  checkTranscriptionStatus,
};
