// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcxWxYuShrazEITqGyXsw1DCChlfQpT-Y",
  authDomain: "my-portfolio-c205c.firebaseapp.com",
  projectId: "my-portfolio-c205c",
  storageBucket: "my-portfolio-c205c.firebasestorage.app",
  messagingSenderId: "576078413639",
  appId: "1:576078413639:web:9987e0858f60d9d4cf9662",
  measurementId: "G-87L4ZJ4HKT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
