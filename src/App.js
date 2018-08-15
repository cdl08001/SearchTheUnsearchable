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
    const targetFile = document.getElementById('fileSelector').files;
    axios({
      method: 'post',
      url: 'http://localhost:3001/audio',
      data: {
        audioFile: targetFile,
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
