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
  res.status(200).send('Sure.');
});

app.post('/audio', (req, res) => {
  console.log('An audio file has been recieved');
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  req.body.audioFiles.forEach((file) => {
    calculateSHA256(file)
      .then(hashFileData => uploadAudio(hashFileData))
      .then(uploadFileData => submitTranscriptionJob(uploadFileData))
      .then(transcriptionJobData => checkTranscriptionStatus(transcriptionJobData))
      .then(transcriptionJobResults => pullTranscription(transcriptionJobResults))
      .then(transcriptionResults => res.status(200).send(transcriptionResults))
      .catch(error => res.status(500).console.log('ERROR: ', error));
  });
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
