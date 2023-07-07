// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
//import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI6q7ohP_cgP6l-Tf-R_cnNzi7EXQNkA8",
  authDomain: "the-ramp-e6199.firebaseapp.com",
  projectId: "the-ramp-e6199",
  storageBucket: "the-ramp-e6199.appspot.com",
  messagingSenderId: "745975342483",
  appId: "1:745975342483:web:98df453324a362dc4cf466",
  measurementId: "G-GMMBYKZVCN"
};

// Initialize Firebase


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_App);
//export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

