import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDvCP5cX0Vmfm6MFjBfRBmAyq8fMMq8q0s',
  authDomain: 'elektro-plus-ca75d.firebaseapp.com',
  databaseURL:
    'https://elektro-plus-ca75d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'elektro-plus-ca75d',
  storageBucket: 'elektro-plus-ca75d.appspot.com',
  messagingSenderId: '729453747137',
  appId: '1:729453747137:web:1618e7235b9281884d6d40',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();

export { auth, storage, db, firebase as default };
