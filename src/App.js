/* eslint-env browser */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleFileSelectionSubmit"] }] */
import React, { Component } from 'react';
import axios from 'axios';
import FileSelector from './Components/FileSelector';
import FileMetadata from './Components/FileMetadata';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: null,
    };
    this.updateView = this.updateView.bind(this);
    this.handleFileSelectionSubmit = this.handleFileSelectionSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.serverData = '';
  }

  updateView(serverData) {
    const { currentPhase } = this.state;
    let currentView;
    if (currentPhase === null) {
      currentView = <FileSelector handleFileSelectionSubmit={this.handleFileSelectionSubmit} />;
    }
    if (currentPhase === 'hashCodeGenerated') {
      currentView = <FileMetadata serverData={serverData} handleBack={this.handleBack} />;
    }
    return currentView;
  }

  handleFileSelectionSubmit(event) {
    event.preventDefault();
    const audioData = [];
    const targetFiles = document.getElementById('fileSelector').files;
    for (let i = 0; i < targetFiles.length; i += 1) {
      const fileInfo = {
        lastModifiedDate: targetFiles[i].lastModifiedDate,
        name: targetFiles[i].name,
        path: targetFiles[i].path,
        size: targetFiles[i].size,
        type: targetFiles[i].type,
      };
      audioData.push(fileInfo);
    }
    axios({
      method: 'post',
      url: 'http://localhost:3001/audio',
      data: {
        audioFiles: audioData,
      },
    })
      .then((response) => {
        this.serverData = response.data;
        console.log('Success! The repsonse is: ', response);
        this.setState({
          currentPhase: 'hashCodeGenerated',
        });
      })
      .catch((error) => {
        throw new Error('Error! The error is: ', error);
      });
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

  render() {
    return (
      <div>
        <h1 className="text-center">
          <u>Search The Unsearchable!</u>
        </h1>
        {this.updateView(this.serverData)}
      </div>
    );
  }
}

export default App;
