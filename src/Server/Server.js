const express = require('express');

const bodyParser = require('body-parser');

const calculateSHA256 = require('../Hash/HashGeneration');

const { uploadAudio } = require('../AWS_S3/S3.js');

const {
  submitTranscriptionJob,
  checkTranscriptionStatus,
  pullTranscription,
} = require('../AWS_Transcribe/Transcribe.js');

const app = express();

app.use(bodyParser.json());

app.options('/audio', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  console.log('An OPTIONS network request was recieved.');
  res.status(200).send();
});

// Calculate hashcode and send back to client
// Client should restrict the number of selected files to 1 until handling of
// multiple files can be supported
app.post('/audio', (req, res) => {
  console.log('An audio file has been recieved');
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  req.body.audioFiles.forEach((file) => {
    calculateSHA256(file)
      .then((hashFileData) => {
        res.status(200).send(hashFileData);
      })
      .catch(hashError => res.status(500).send('ERROR: Hash Calculation Error: ', hashError));
  });
});

app.post('/audio', (req, res, next) => {
  uploadAudio(res.locals.hashFileData)
    .then((uploadFileData) => {
      res.locals.uploadFileData = uploadFileData;
      next();
    })
    .catch(uploadFileError => res.status(500).send('ERROR: File Upload Error: ', uploadFileError));
});

app.post('/audio', (req, res, next) => {
  submitTranscriptionJob(res.locals.uploadFileData)
    .then((transcriptionJobData) => {
      res.locals.transcriptionJobData = transcriptionJobData;
      next();
    })
    .catch(submitTranscriptionJobError => res.status(500).send('ERROR: Job Submission Error: ', submitTranscriptionJobError));
});

app.post('/audio', (req, res, next) => {
  checkTranscriptionStatus(res.locals.transcriptionJobData)
    .then((transcriptionStatusData) => {
      res.locals.transcriptionStatusData = transcriptionStatusData;
      next();
    })
    .catch(checkTranscriptionStatusError => res.status(500).send('ERROR: Check Transcription Status Error: ', checkTranscriptionStatusError));
});

app.post('/audio', (req, res, next) => {
  pullTranscription(res.locals.transcriptionStatusData)
    .then((transcriptionResults) => {
      res.locals.transcriptionResults = transcriptionResults;
      next();
    })
    .catch(pullTranscriptionError => res.status(500).send('ERROR: Pull Transcription Error: ', pullTranscriptionError));
});

app.post('/audio', (req, res) => {
  res.send(500).send(res.locals.transcriptionResults);
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
