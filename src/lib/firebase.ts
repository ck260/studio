
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV7YySNc93m5J16c-AokbBIGi2jC_4YqI",
  authDomain: "bugsmash-96rb8.firebaseapp.com",
  projectId: "bugsmash-96rb8",
  storageBucket: "bugsmash-96rb8.appspot.com",
  messagingSenderId: "828716915274",
  appId: "1:828716915274:web:60ce8a3f7b5dc74711e4b3",
  measurementId: "G-R5S8J14T45"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
