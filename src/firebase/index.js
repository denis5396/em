import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMXcV5HLTyBjkfPBUcHJQrgYCFuS2NwMU",
  authDomain: "elektromonting-dce15.firebaseapp.com",
  databaseURL:
    "https://elektromonting-dce15-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "elektromonting-dce15",
  storageBucket: "elektromonting-dce15.appspot.com",
  messagingSenderId: "933945519723",
  appId: "1:933945519723:web:441c8883382b98fd208b2e",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();

export { auth, storage, db, firebase as default };
