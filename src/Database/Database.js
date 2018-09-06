const mongoose = require('mongoose');

const { Schema } = mongoose;

// Open default mongoose  27017
mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true }, (error) => {
  if (error) throw new Error('ERROR (DB Connection): ', error);
});

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

const addHash = (hashcode, name, path, lastModifiedDate, size, type) => {
  const db = mongoose.connection;
  db.on('error', () => { throw new Error('ERROR: (DB Connection) '); });
  db.once('open', () => {
    const newHash = new Hash({
      hashcode,
      name,
      path,
      lastModifiedDate,
      size,
      type,
    });
    newHash.save((err) => {
      if (err) throw new Error('ERROR (DB Save): ', err);
      console.log('SUCCESS (Hash Saved)');
      db.close();
    });
  });
};

const addTranscription = (hashcode, transcripts, items, type) => {
  const db = mongoose.connection;
  db.on('error', () => { throw new Error('ERROR: (DB Connection) '); });
  db.once('open', () => {
    const newTranscript = new TranscriptResult({
      hashcode,
      transcripts,
      items,
      type,
    });
    newTranscript.save((err) => {
      if (err) throw new Error('ERROR (DB Save): ', err);
      console.log('SUCCESS (Transcript Saved)');
    });
  });
};

const findHash = (targetHash, cb) => {
  const db = mongoose.connection;
  db.on('error', () => { throw new Error('ERROR: (DB Connection) '); });
  db.once('open', () => {
    Hash.find({ hashcode: targetHash }, (err, docs) => {
      if (err) throw new Error('ERROR (Find Documents): ', err);
      console.log('Results: ', docs);
      cb(docs);
      db.close();
    });
  });
};

module.exports = {
  addHash,
  addTranscription,
  findHash,
};
