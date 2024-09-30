// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo08FHLKSVPqIqA9Hy7rU_Mxznrkq42q4",
  authDomain: "senior-project-b7fd8.firebaseapp.com",
  databaseURL: "https://senior-project-b7fd8-default-rtdb.firebaseio.com",
  projectId: "senior-project-b7fd8",
  storageBucket: "senior-project-b7fd8.appspot.com",
  messagingSenderId: "1008419761400",
  appId: "1:1008419761400:web:60b068bc6e1164cce49f0d",
  measurementId: "G-HT3PJL35N3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export  {app, auth, database};