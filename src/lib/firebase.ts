
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "bugsmash-96rb8",
  "appId": "1:828716915274:web:60ce8a3f7b5dc74711e4b3",
  "storageBucket": "bugsmash-96rb8.firebasestorage.app",
  "apiKey": "AIzaSyCDrYTXJFr0FuXZmMNsYNLzV_7hAZ109bw",
  "authDomain": "bugsmash-96rb8.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "828716915274"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
