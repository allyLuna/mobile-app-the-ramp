// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
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


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};