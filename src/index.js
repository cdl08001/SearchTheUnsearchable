import 'bootstrap/dist/css/bootstrap.css';
// Will need to add something similar to my componenets:
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
