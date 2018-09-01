const express = require('express');

const bodyParser = require('body-parser');

const calculateSHA256 = require('../Hash/HashGeneration');

const { uploadAudio, pullTranscription } = require('../AWS_S3/S3.js');

const { submitTranscriptionJob, checkTranscriptionStatus } = require('../AWS_Transcribe/Transcribe.js');

const app = express();

app.use(bodyParser.json());

app.options('/*', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send();
});

// Calculate hashcode and send back to client
// Client should restrict the number of selected files to 1 until handling of
// multiple files can be supported
app.post('/hash', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  calculateSHA256(req.body.audioFiles[0])
    .then((hashFileData) => {
      res.status(200).send(hashFileData);
    })
    .catch(hashError => res.status(500).send('ERROR: Hash Calculation Error: ', hashError));
});

app.post('/S3Upload', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  uploadAudio(req.body.uploadFile)
    .then((uploadFileData) => {
      res.status(200).send(uploadFileData);
    })
    .catch(uploadFileError => res.status(500).send('ERROR: File Upload Error: ', uploadFileError));
});

app.post('/submitTranscribeJob', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  submitTranscriptionJob(req.body.uploadFile)
    .then((transcribeJobData) => {
      res.status(200).send(transcribeJobData);
    })
    .catch(submitTranscriptionJobError => res.status(500).send('ERROR: Job Submission Error: ', submitTranscriptionJobError));
});

app.post('/checkTranscribeStatus', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  checkTranscriptionStatus(req.body.transcribeJobData)
    .then((transcriptionStatusData) => {
      res.status(200).send(transcriptionStatusData);
    })
    .catch(checkTranscriptionStatusError => res.status(500).send('ERROR: Check Transcription Status Error: ', checkTranscriptionStatusError));
});

app.post('/downloadTranscription', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  pullTranscription(req.body.transcriptLocation)
    .then((transcriptionResults) => {
      res.status(200).send(transcriptionResults);
    })
    .catch((pullTranscriptionError) => {
      res.status(500).send('ERROR: Pull Transcription Error: ', pullTranscriptionError);
    });
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
