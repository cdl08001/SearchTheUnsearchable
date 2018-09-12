const express = require('express');

const bodyParser = require('body-parser');

const calculateSHA256 = require('../Hash/HashGeneration');

const { uploadAudio, pullTranscription } = require('../AWS_S3/S3.js');

const { addHash, addTranscription, findHash } = require('../Database/Database.js');

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
app.post('/hash', (req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  calculateSHA256(req.body.audioFiles[0])
    .then((hashFileData) => {
      res.locals.hashFileData = hashFileData;
      next();
    })
    .catch(hashError => res.status(500).send(hashError));
});

app.post('/hash', (req, res, next) => {
  findHash(res.locals.hashFileData.hashcode)
    .then((queryResult) => {
      res.locals.queryResult = queryResult;
      if (queryResult.length > 0) {
        res.status(200).send({
          inDatabase: true,
          result: queryResult[0],
        });
      } else {
        next();
      }
    })
    .catch(queryErr => res.status(500).send(queryErr));
});

app.post('/hash', (req, res) => {
  const hd = res.locals.hashFileData;
  addHash(hd.hashcode, hd.name, hd.path, hd.lastModifiedDate, hd.size, hd.type)
    .then((hashCreationData) => {
      res.status(200).send({
        inDatabase: false,
        result: hashCreationData,
      });
    })
    .catch(hashSaveErr => res.status(500).send(hashSaveErr));
});

app.post('/S3Upload', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  uploadAudio(req.body.uploadFile)
    .then((uploadFileData) => {
      res.status(200).send(uploadFileData);
    })
    .catch(uploadFileError => res.status(500).send(uploadFileError));
});

app.post('/submitTranscribeJob', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  submitTranscriptionJob(req.body.uploadFile)
    .then((transcribeJobData) => {
      res.status(200).send(transcribeJobData);
    })
    .catch(submitTranscriptionJobError => res.status(500).send(submitTranscriptionJobError));
});

app.post('/checkTranscribeStatus', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  checkTranscriptionStatus(req.body.transcribeJobData)
    .then((transcriptionStatusData) => {
      res.status(200).send(transcriptionStatusData);
    })
    .catch(checkTranscriptionStatusError => res.status(500).send(checkTranscriptionStatusError));
});

app.post('/downloadTranscription', (req, res) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  pullTranscription(req.body.transcriptLocation)
    .then((transcriptionResults) => {
      res.status(200).send(transcriptionResults);
    })
    .catch((pullTranscriptionError) => {
      res.status(500).send(pullTranscriptionError);
    });
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
