const mongoose = require('mongoose');

const { Schema } = mongoose;

// Open default mongoose  27017
mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true }, (error) => {
  if (error) throw new Error('ERROR (DB Connection): ', error);
});

const db = mongoose.connection;

const hashSchema = new Schema({
  hashcode: String,
  name: String,
  path: String,
  lastModifiedDate: Date,
  size: Number,
  type: String,
});

const transcriptionResultsSchema = new Schema({
  hashcode: String,
  transcripts: [{
    transcript: String,
  }],
  items: [{
    start_time: String,
    end_time: String,
    alternatives: [{
      confidence: String,
      content: String,
    }],
  }],
  type: String,
});

const Hash = mongoose.model('FileHashes', hashSchema);
const TranscriptResult = mongoose.model('TranscriptResult', transcriptionResultsSchema);

module.exports = {
  Hash,
  TranscriptResult,
  db,
};
