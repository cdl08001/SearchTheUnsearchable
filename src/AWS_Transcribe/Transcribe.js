const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

// Config region and bucket region need to match per API specs.
// For some reason, I can only get it to work out of 'us-east-1' region:
AWS.config.update({ region: 'us-east-1' });

// Create the transcribe service object:
const transcribeService = new AWS.TranscribeService({ apiVersion: '2017-10-26' });

// Need to pass in the URL of the S3 location.
// Must be in the same region as the API endpoint
// Send transcriptionjob back to cb for tracking

const submitTranscriptionJob = file => new Promise((resolve, reject) => {
  const jobId = uuidv4();
  const fileExtension = file.key.slice(file.key.indexOf('.') + 1);
  const objectParams = {
    LanguageCode: 'en-US',
    Media: {
      MediaFileUri: file.Location,
    },
    MediaFormat: fileExtension,
    TranscriptionJobName: jobId,
    OutputBucketName: file.Bucket,
  };
  const startTranscriptionPromise = transcribeService.startTranscriptionJob(objectParams).promise();
  startTranscriptionPromise
    .then((jobData) => {
      console.log('SUCCESS: Transcription Job Submitted: ', jobData);
      resolve(jobData);
    })
    .catch(jobSubmitErr => reject(jobSubmitErr));
});

const checkTranscriptionStatus = jobData => new Promise((resolve, reject) => {
  const objectParams = {
    TranscriptionJobName: jobData.TranscriptionJobName,
  };
  const transcribeServicePromise = transcribeService.getTranscriptionJob(objectParams).promise();
  transcribeServicePromise
    .then((data) => {
      if (data.TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
        reject(data.TranscriptionJob.FailureReason);
      }
      if (data.TranscriptionJob.TranscriptionJobStatus === 'IN_PROGRESS') {
        console.log('WAITING: The job is still in progress. Will retry in 30 seconds.');
        setTimeout(() => { checkTranscriptionStatus(jobData); }, 30000);
      }
      if (data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
        resolve(data);
      }
    })
    .catch(transcriptionErr => reject(transcriptionErr));
});

module.exports = {
  submitTranscriptionJob,
  checkTranscriptionStatus,
};
