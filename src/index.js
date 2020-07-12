import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBFbcxZG5sYIiaIFpR0LLvgGHmNEPLLDYc',
  authDomain: 'wasfa-34e2b.firebaseapp.com',
  databaseURL: 'https://wasfa-34e2b.firebaseio.com',
  projectId: 'wasfa-34e2b',
  storageBucket: 'wasfa-34e2b.appspot.com',
  messagingSenderId: '340868704339',
  appId: '1:340868704339:web:34121419129800e7f03ea6',
  measurementId: 'G-0QZMXVRQ8N'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
