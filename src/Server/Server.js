const express = require('express');

const bodyParser = require('body-parser');

const calculateSHA256 = require('../Hash/HashGeneration');

const uploadAudio = require('../AWS_S3/S3.js');

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
      console.log('File Info with Hashcode: ', hashResultsData);
      uploadAudio(file, (uploadError, uploadResultsData) => {
        if (uploadError) throw uploadError;
        console.log(`Successfully uploaded ${file.name} to S3!: ${uploadResultsData}`);
      });
    });
  });
  res.send('Here is your response');
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
