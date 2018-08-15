/* eslint-env browser */
import React, { Component } from 'react';
import axios from 'axios';
import FileSelector from './Components/FileSelector';
// Enter the following to leverage bootstrap:
// import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAudio: '',
    };
    this.handleFileSelectionSubmit = this.handleFileSelectionSubmit.bind(this);
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
    console.log(audioData[0].lastModifiedDate);
    axios({
      method: 'post',
      url: 'http://localhost:3001/audio',
      data: {
        audioFiles: audioData,
      },
    })
      .then((response) => {
        console.log('Success! The repsonse is: ', response);
      })
      .catch((error) => {
        console.log('Error! The error is: ', error);
      });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">
          <u>Search The Unsearchable!</u>
        </h1>
        <FileSelector handleFileSelectionSubmit={this.handleFileSelectionSubmit} />
      </div>
    );
  }
}

export default App;
