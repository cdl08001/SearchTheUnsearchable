const express = require('express');

const bodyParser = require('body-parser');

const calculateSHA256 = require('../Hash/HashGeneration');

const { uploadAudio, pullTranscription } = require('../AWS_S3/S3.js');

const { addHash, addTranscription, findHash, findTranscription } = require('../Database/Database.js');

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

// Query the database to see if matching hash exists.
// Take note of whether or not matching record was found and call next middleware
app.post('/hash', (req, res, next) => {
  findHash(res.locals.hashFileData.hashcode)
    .then((queryResult) => {
      res.locals.queryResult = queryResult;
      // result: queryResult[0],
      if (queryResult.length > 0) {
        res.locals.inDatabase = true;
        next();
      } else {
        res.locals.inDatabase = false;
        next();
      }
    })
    .catch(queryErr => res.status(500).send(queryErr));
});

// Add hash to db if no matching hash was found.
// Otherwise, query transcriptions collection to pull results from db.
// If successful, format data and send to client.
app.post('/hash', (req, res) => {
  const hd = res.locals.hashFileData;
  if (res.locals.inDatabase === false) {
    addHash(hd.hashcode, hd.name, hd.path, hd.lastModifiedDate, hd.size, hd.type)
      .then((hashCreationData) => {
        res.status(200).send({
          inDatabase: res.locals.inDatabase,
          result: hashCreationData,
        });
      })
      .catch(hashSaveErr => res.status(500).send(hashSaveErr));
  } else if (res.locals.inDatabase === true) {
    findTranscription(hd.hashcode)
      .then((transcriptionData) => {
        res.locals.formattedTranscription = {
          results: {
            items: transcriptionData[0].items,
            transcripts: transcriptionData[0].transcripts,
          },
        };
        res.status(200).send({
          inDatabase: res.locals.inDatabase,
          result: res.locals.hashFileData,
          transcript: res.locals.formattedTranscription,
        });
      })
      .catch(queryErr => res.status(500).send(queryErr));
  }
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

app.post('/downloadTranscription', (req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Save hashcode results to res.locals in order to leverage when saving transcript results
  res.locals.hashcode = req.body.hashcode;
  // Attempt to download transcription from S3
  // If successful, pass to next middleware to save transcript to db
  pullTranscription(req.body.transcriptLocation)
    .then((transcriptionResults) => {
      res.locals.transcriptionResults = transcriptionResults;
      next();
    })
    .catch((pullTranscriptionError) => {
      res.status(500).send(pullTranscriptionError);
    });
});

app.post('/downloadTranscription', (req, res) => {
  const { hashcode } = res.locals;
  const { transcripts, items } = res.locals.transcriptionResults.results;
  addTranscription(hashcode, transcripts, items)
    .then((transcriptionSaveData) => {
      res.status(200).send(res.locals.transcriptionResults);
    })
    .catch(transcriptionSaveErr => res.status(500).send(transcriptionSaveErr));
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
