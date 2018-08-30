/* eslint-env browser */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleFileSelectionSubmit"] }] */
import React, { Component } from 'react';
import axios from 'axios';
import FileSelector from './Components/FileSelector';
import FileMetadataResults from './Components/FileMetadataResults';
import S3UploadResults from './Components/S3UploadResults';
import TranscriptionJobResults from './Components/TranscriptionJobResults';

const baseUrl = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: null,
    };
    this.hashcodeResults = '';
    this.s3UploadData = '';
    this.transcribeJobData = '';
    this.transcriptionResults = '';
    this.updateView = this.updateView.bind(this);
    this.handleFileSelectionSubmit = this.handleFileSelectionSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleS3UploadSubmit = this.handleS3UploadSubmit.bind(this);
    this.handleTranscribeJobSubmit = this.handleTranscribeJobSubmit.bind(this);
    this.checkTranscribeJobStatus = this.checkTranscribeJobStatus.bind(this);
  }

  updateView() {
    const { currentPhase } = this.state;
    let currentView;
    if (currentPhase === null) {
      currentView = (
        <FileSelector
          handleFileSelectionSubmit={this.handleFileSelectionSubmit}
        />
      );
    }
    if (currentPhase === 'hashCodeGenerated') {
      currentView = (
        <FileMetadataResults
          hashcodeResults={this.hashcodeResults}
          handleBack={this.handleBack}
          handleS3UploadSubmit={this.handleS3UploadSubmit}
        />
      );
    }
    if (currentPhase === 's3UploadComplete') {
      currentView = (
        <S3UploadResults
          s3UploadData={this.s3UploadData}
          handleBack={this.handleBack}
          handleTranscribeJobSubmit={this.handleTranscribeJobSubmit}
        />
      );
    }
    if (currentPhase === 'transcribeJobSubmitted') {
      currentView = (
        <TranscriptionJobResults
          transcribeJobData={this.transcribeJobData}
        />
      );
    }
    return currentView;
  }

  handleBack(event) {
    const { currentPhase } = this.state;
    event.preventDefault();
    if (currentPhase === 'hashCodeGenerated') {
      this.setState({ currentPhase: null });
    }
    if (currentPhase === 's3UploadComplete') {
      this.setState({ currentPhase: 'hashCodeGenerated' });
    }
  }

  // Step 1: Select file and generate hash + metadata:
  handleFileSelectionSubmit(event) {
    event.preventDefault();
    const audioData = [];
    const targetFile = document.getElementById('fileSelector').files;
    const fileInfo = {
      lastModifiedDate: targetFile[0].lastModifiedDate,
      name: targetFile[0].name,
      path: targetFile[0].path,
      size: targetFile[0].size,
      type: targetFile[0].type,
    };
    audioData.push(fileInfo);
    axios({
      method: 'post',
      url: `${baseUrl}/hash`,
      data: {
        audioFiles: audioData,
      },
    })
      .then((response) => {
        this.hashcodeResults = response.data;
        this.setState({
          currentPhase: 'hashCodeGenerated',
        });
      })
      .catch((error) => {
        throw new Error('ERROR (Hascode Generation): ', error);
      });
  }

  // Step 2: Send file for upload to S3:
  handleS3UploadSubmit() {
    if (this.hashcodeResults !== '') {
      axios({
        method: 'post',
        url: `${baseUrl}/S3Upload`,
        data: {
          uploadFile: this.hashcodeResults,
        },
      })
        .then((response) => {
          this.s3UploadData = response.data;
          this.setState({
            currentPhase: 's3UploadComplete',
          });
        })
        .catch((error) => {
          throw new Error('ERROR (S3 Upload): ', error);
        });
    }
  }

  // Step 3: Initiate transcription job:
  handleTranscribeJobSubmit() {
    if (this.s3UploadData !== '') {
      axios({
        method: 'post',
        url: `${baseUrl}/submitTranscribeJob`,
        data: {
          uploadFile: this.s3UploadData,
        },
      })
        .then((response) => {
          this.transcribeJobData = response.data;
          this.setState({
            currentPhase: 'transcribeJobSubmitted',
          });
        })
        .catch((error) => {
          throw new Error('ERROR (Transcription Job): ', error);
        });
    }
  }

  // Step 4: Check transcription job status.
  // if transcription results have not been saved, continue to
  // check until job is completed.
  checkTranscribeJobStatus() {
    if (this.transcriptionResults === '') {
      axios({
        method: 'get',
        url: `${baseUrl}/checkTranscribeStatus`,
        data: {
          transcribeJobData: this.transcribeJobData,
        },
      })
        .then((response) => {
          if (response.data.TranscriptionJob.TranscriptionJobStatus === 'IN_PROGRESS') {
            console.log('Checking...');
            setTimeout(() => { this.checkTranscibeJobStatus(); }, 30000);
          }
          if (response.data.TranscriptionJob.TranscriptionJobbStatus === 'COMPLETED') {
            this.transcriptionResults = response.data;
            console.log(this.transcriptionResults);
          }
        })
        .catch((error) => {
          throw new Error('ERROR (Check Job Status): ', error);
        });
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center">
          <u>Search The Unsearchable!</u>
        </h1>
        {this.updateView()}
      </div>
    );
  }
}

export default App;
