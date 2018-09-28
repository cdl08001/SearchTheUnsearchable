import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Will need to add something similar to my componenets:
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error('Sorry, this app does not support window.eval().');
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
