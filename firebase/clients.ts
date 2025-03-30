// Import the functions you need from the SDKs you need
import { initializeApp , getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-4v0x1X2b3g5J6k7Q8w9z5Y6Z8a9b5cE",
  authDomain: "prepwize-2004.firebaseapp.com",
  projectId: "prepwize-2004",
  storageBucket: "prepwize-2004.firebasestorage.app",
  messagingSenderId: "660736090758",
  appId: "1:660736090758:web:48ea71c8996340c2b1e707",
  measurementId: "G-C69VRELBXR"
};

// Initialize Firebase
const app = !getApps.length ?initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);