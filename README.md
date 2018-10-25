## SearchTheUnsearchavle
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
Ex. -

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
The first step will be to create a mongodb database called 'searchtheunsearchable', and add the following two collections: 

# filehashes
Schema: 
`const hashSchema = new Schema({
  hashcode: String,
  name: String,
  path: String,
  lastModifiedDate: Date,
  size: Number,
  type: String,
});`

# transcriptionresults
Schema:
`const transcriptionResultsSchema = new Schema({
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
});`

Once your database has been setup and the respository cloned down to a local machine, the following code will need to be run within the terminal to start the dev environment (use separate windows for each script): 

`npm run react`
`npm run electron`
`npm run server`
`npm run database`

## API Reference

Working

## Tests

Working

## How to use?

Working

## Contribute

Working
