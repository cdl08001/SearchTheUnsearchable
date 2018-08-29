/* eslint-env browser */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleFileSelectionSubmit"] }] */
import React, { Component } from 'react';
import axios from 'axios';
import FileSelector from './Components/FileSelector';
import FileMetadataResults from './Components/FileMetadataResults';
import S3UploadResults from './Components/S3UploadResults';

const baseUrl = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: null,
    };
    this.hashcodeResults = '';
    this.s3UploadData = '';
    this.updateView = this.updateView.bind(this);
    this.handleFileSelectionSubmit = this.handleFileSelectionSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleS3UploadSubmit = this.handleS3UploadSubmit.bind(this);
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
        />
      );
    }
    return currentView;
  }

  handleBack(event) {
    const { currentPhase } = this.state;
    event.preventDefault();
    if (currentPhase === 'hashCodeGenerated') {
      this.setState({
        currentPhase: null,
      });
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
