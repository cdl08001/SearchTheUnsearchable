/* eslint-env browser */
import React, { Component } from 'react';
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
    console.log(targetFile);
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