// Import Firebase v9+ (modular) and compat for older features
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyN4HBZ1Or6bhvgoZEaJIEL3jOetI0l9w",
  authDomain: "notion-diary-3b39d.firebaseapp.com",
  projectId: "notion-diary-3b39d",
  storageBucket: "notion-diary-3b39d.appspot.com",
  messagingSenderId: "855877809654",
  appId: "1:855877809654:web:edfc54f62391de2a66c3d7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Firebase services
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = getAuth(app); // ✅ Fix: Correctly initialize Firebase Auth

// Firestore timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp, auth };
