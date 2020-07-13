const firebase = require('firebase/app');
// Required for side-effects
require('firebase/firestore');
require('firebase/auth');
require('firebase/storage');

// Your web app's Firebase configuration
const firebaseConfig = {
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();

export { firebase, db as default };
