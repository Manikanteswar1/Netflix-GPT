// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY } from "./constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "netflixgpt-4b82a.firebaseapp.com",
  projectId: "netflixgpt-4b82a",
  storageBucket: "netflixgpt-4b82a.firebasestorage.app",
  messagingSenderId: "163174758586",
  appId: "1:163174758586:web:5f25e3a903eafac745aa83",
  measurementId: "G-MSP0FZPNCH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();