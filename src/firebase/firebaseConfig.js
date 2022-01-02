// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = { 
  apiKey: "AIzaSyCsrxGvI4H3zeMBSXSHISH2NTbIALPQ0e8", 
  authDomain: "dubai-desk.firebaseapp.com", 
  projectId: "dubai-desk", 
  storageBucket: "dubai-desk.appspot.com", 
  messagingSenderId: "699777607815", 
  appId: "1:699777607815:web:31e158ab7445311139f022", 
  measurementId: "G-DFQP2GK7R0" 
}; 

// Initialize Firebase
export default firebaseConfig
initializeApp(firebaseConfig);

export const db = getFirestore();

