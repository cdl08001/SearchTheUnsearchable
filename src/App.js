import React, { Component } from 'react';
// Enter the following to leverage bootstrap:
// import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    console.log('A render is occurring');
    return (
      <div>
        <h1 className="text-center"><u>Search The Unsearchable!</u></h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputFile">Select an Audio File</label>
            <input type="file" id="fileSelector"/>
          </div>
          <button type="submit" className="defaultButton">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;