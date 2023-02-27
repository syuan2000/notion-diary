// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyN4HBZ1Or6bhvgoZEaJIEL3jOetI0l9w",
  authDomain: "notion-diary-3b39d.firebaseapp.com",
  projectId: "notion-diary-3b39d",
  storageBucket: "notion-diary-3b39d.appspot.com",
  messagingSenderId: "855877809654",
  appId: "1:855877809654:web:edfc54f62391de2a66c3d7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore, projectStorage, timestamp};