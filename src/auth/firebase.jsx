// src/firebase.js

// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3xAEmmWCI8Mo0kI3DvITjoNYxyaywEvs",
    authDomain: "crypto-currency-b940e.firebaseapp.com",
    projectId: "crypto-currency-b940e",
    storageBucket: "crypto-currency-b940e.appspot.com",
    messagingSenderId: "44215524282",
    appId: "1:44215524282:web:72b61f7771e45f647c5b83",
    measurementId: "G-76FGZ50DEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
