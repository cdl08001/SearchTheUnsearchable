const mongoose = require('mongoose');

const { Schema } = mongoose;

const hashSchema = new Schema({
  hashcode: String,
  name: String,
  path: String,
  lastModifiedDate: String,
  size: Number,
  type: String,
});

const transcriptionResultsSchema = new Schema({
  hashcode: String,
  contentLength: String,
  transcription: String,
});

mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected!');
});
