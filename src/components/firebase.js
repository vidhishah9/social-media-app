// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_A0eBYDO1v52SxEhfzpHxgVZLIlETF0A",
  authDomain: "social-media-firebase-b1f6e.firebaseapp.com",
  projectId: "social-media-firebase-b1f6e",
  storageBucket: "social-media-firebase-b1f6e.appspot.com",
  messagingSenderId: "461004958626",
  appId: "1:461004958626:web:02f6b01d417395131060fb",
  measurementId: "G-WZG7C176N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

