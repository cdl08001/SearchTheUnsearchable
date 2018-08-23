const express = require('express');

const bodyParser = require('body-parser');

const calculateSHA256 = require('../Hash/HashGeneration');

const { uploadAudio } = require('../AWS_S3/S3.js');

const { submitTranscriptionJob, checkTranscriptionStatus } = require('../AWS_Transcribe/Transcribe.js');

const app = express();

app.use(bodyParser.json());

app.options('/audio', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  console.log('An OPTIONS network request was recieved.');
  res.status(200).send('Sure.');
});

// Current configuration has node creating two readStreams.
// This should be reduced to one stream in the near future.
app.post('/audio', (req, res) => {
  console.log('An audio file has been recieved');
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  req.body.audioFiles.forEach((file) => {
    calculateSHA256(file, (hashError, hashResultsData) => {
      if (hashError) { throw hashError; }
      console.log('Success: Hashcode Generated: ', hashResultsData);
      uploadAudio(file, (uploadError, uploadResultsData) => {
        if (uploadError) throw uploadError;
        console.log(`Success: Uploaded ${file.name} to S3!: ${uploadResultsData}`);
        submitTranscriptionJob(file, (submitTranscriptionError, submitTranscribeData, jobId) => {
          if (submitTranscriptionError) throw submitTranscriptionError;
          console.log('Success: Transcription Job Submitted: ', submitTranscribeData);
          checkTranscriptionStatus(jobId, (transcriptionError, failureReason, inProgress, data) => {
            if (transcriptionError) {
              throw transcriptionError;
            } else if (failureReason) {
              console.log('Error: Transcription Failed: ', failureReason);
            } else if (inProgress) {
              console.log('The job is still in progress. Will try again in 30 seconds.');
            } else if (data) {
              console.log('Success: Transcription Complete', data);
            }
          });
        });
      });
    });
  });
  res.send('Here is your response');
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
