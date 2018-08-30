const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

// Config region and bucket region need to match per API specs.
// For some reason, I can only get it to work out of 'us-east-1' region:
AWS.config.update({ region: 'us-east-1' });

// Create the transcribe service object:
const transcribeService = new AWS.TranscribeService({ apiVersion: '2017-10-26' });

const submitTranscriptionJob = S3UploadData => new Promise((resolve, reject) => {
  const jobId = uuidv4();
  const fileExtension = S3UploadData.key.slice(S3UploadData.key.indexOf('.') + 1);
  const objectParams = {
    LanguageCode: 'en-US',
    Media: {
      MediaFileUri: S3UploadData.Location,
    },
    MediaFormat: fileExtension,
    TranscriptionJobName: jobId,
    OutputBucketName: S3UploadData.Bucket,
  };
  const startTranscriptionPromise = transcribeService.startTranscriptionJob(objectParams).promise();
  startTranscriptionPromise
    .then((jobData) => {
      resolve(jobData, S3UploadData);
    })
    .catch(jobSubmitErr => reject(jobSubmitErr));
});

const checkTranscriptionStatus = jobData => new Promise((resolve, reject) => {
  const objectParams = {
    TranscriptionJobName: jobData.TranscriptionJob.TranscriptionJobName,
  };
  const transcribeServicePromise = transcribeService.getTranscriptionJob(objectParams).promise();
  transcribeServicePromise
    .then((data) => {
      if (data.TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
        reject(data.TranscriptionJob.FailureReason);
      } else {
        resolve(data);
      }
    })
    .catch(transcriptionErr => reject(transcriptionErr));
});

module.exports = {
  submitTranscriptionJob,
  checkTranscriptionStatus,
};
