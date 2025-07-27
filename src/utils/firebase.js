// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSRUA2PS_ceK3vPnVUsImrmghpWwqYTe0",
  authDomain: "moviegpt-92713.firebaseapp.com",
  projectId: "moviegpt-92713",
  storageBucket: "moviegpt-92713.firebasestorage.app",
  messagingSenderId: "85278199361",
  appId: "1:85278199361:web:0d8cbf582e2c16bb2b40c0",
  measurementId: "G-J97MRKE6VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
