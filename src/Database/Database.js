const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

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

const findHash = targetHash => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true })
    .then(() => {
      const findPromise = Hash.find({ hashcode: targetHash }).exec();
      findPromise
        .then((queryResult) => {
          resolve(queryResult);
          mongoose.connection.close();
        })
        .catch((err) => {
          reject(err);
          mongoose.connection.close();
        });
    })
    .catch(connectErr => reject(connectErr));
});

const addHash = (hashcode, name, path, lastModifiedDate, size, type) => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true })
    .then(() => {
      const newHash = new Hash({
        hashcode,
        name,
        path,
        lastModifiedDate,
        size,
        type,
      });
      const addHashPromise = newHash.save();
      addHashPromise
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((connectErr) => {
      reject(connectErr);
    });
});

const addTranscription = (hashcode, transcripts, items, type) => {
  mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true }, (error) => {
    if (error) throw new Error('ERROR (DB Connection): ', error);
  });
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

module.exports = {
  addHash,
  addTranscription,
  findHash,
};
