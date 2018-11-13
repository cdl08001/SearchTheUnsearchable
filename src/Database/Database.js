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

// wordType needs to be used as 'type' is reserved mongoose name
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
});

const Hash = mongoose.model('FileHashes', hashSchema);
const TranscriptResult = mongoose.model('TranscriptResult', transcriptionResultsSchema);

// Finds a provided hashcode within the 'filehashes' collection and returns the query result
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

// Adds hashcode and file metadata to the 'filehashes' collection and returns the query result
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
    .catch(connectErr => reject(connectErr));
});

// Finds a provided hash within the 'transcriptionresults' collection and returns the query result
const findTranscription = targetHash => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true })
    .then(() => {
      const findPromise = TranscriptResult.find({ hashcode: targetHash }).exec();
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

// Adds hashcode and transcription information to the 'transcriptionresults' collection and returns query result
const addTranscription = (hashcode, transcripts, items) => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/searchtheunsearchable', { useNewUrlParser: true })
    .then(() => {
      const newTranscript = new TranscriptResult({
        hashcode,
        transcripts,
        items,
      });
      const addTranscriptPromise = newTranscript.save();
      addTranscriptPromise
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch(connectErr => reject(connectErr));
});

module.exports = {
  addHash,
  addTranscription,
  findHash,
  findTranscription,
};
