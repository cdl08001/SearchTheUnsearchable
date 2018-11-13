## SearchTheUnsearchable
This application aims to convert mutlimedia files to text using AWS (S3 and Transcribe). 

## Motivation
One challenge that is present in the eDiscovery space is the conversion of multimedia files to text. The motivation for the creation of this app is to leverage speech-to-text technology to help conquer this challenge. 

## Build status
This application leverages CircleCI for continuous integration:

![CircleCI](https://circleci.com/gh/cdl08001/SearchTheUnsearchable/tree/master.svg?style=svg)

## Code style
This application follows the Airbnb JavaScript Style Guide:

[![JavaScript Style Guide: Airbbnb](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
 
## Screenshots
Working

## Tech/framework used
<b>Built with</b>
- [Electron](https://electron.atom.io)
- [ReactJS](https://reactjs.org/)
- [Express JS](https://expressjs.com/)
- [Mongoose JS](https://mongoosejs.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS Transcribe](https://aws.amazon.com/transcribe/)

## Features
Working

## Code Example
Working

## Installation
**NOTE: The AWS services used in this application (S3 and Transcribe) are not free services. Amazon _currently_ offers free tiers for both services depending on usage (as of 11/13/18), however this can change at any moment. Please review Amazon's pricing for these services before leveraging this application:** https://aws.amazon.com/pricing/

In order to leverage this application, you will need to create an AWS account and associated access key. Documentation to help get you started can be found below: 

Getting Started: https://aws.amazon.com/getting-started/
Configuration and Credential Files: https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html

Once the AWS configuration is complete, clone the repo and run `npm intall` to install the necessary dependencies. Then, simply start the app with the command `npm run start` 

## API Reference

Working

## Database Reference: 

This application will automatically create a local 'searchtheunsearchable' database and the following two collections the first time an audio file is uploaded, run through transcription, and downloaded: 

### filehashes
Schema: 
```
const hashSchema = new Schema({
  hashcode: String,
  name: String,
  path: String,
  lastModifiedDate: Date,
  size: Number,
  type: String,
});
```

### transcriptionresults
Schema:
```
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
```

## Tests

Working

## How to use?

Working

## Contribute

Working
