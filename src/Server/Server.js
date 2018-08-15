const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.options('/audio', (req, res) => {
  console.log('An OPTIONS network request was recieved.');
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send('Sure.');
});

app.post('/audio', (req, res) => {
  console.log('An audio file has been recieved');
  console.log('The request body is: ', req.body);
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send('Here is your response');
});

app.listen(3001, () => console.log('Server is listening on port 3001!'));
