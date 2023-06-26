import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, Timestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9tEo0ZQEDATrmN6Ggtt4uG6MHFMZ8nDI",
  authDomain: "chatok-5062a.firebaseapp.com",
  databaseURL: "https://chatok-5062a-default-rtdb.firebaseio.com",
  projectId: "chatok-5062a",
  storageBucket: "chatok-5062a.appspot.com",
  messagingSenderId: "688967939413",
  appId: "1:688967939413:web:a1cbc05b7da7d5c1d62bdc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realTimeDb = getDatabase(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
