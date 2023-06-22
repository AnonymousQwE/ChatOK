import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, Timestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9tEo0ZQEDATrmN6Ggtt4uG6MHFMZ8nDI",
  authDomain: "chatok-5062a.firebaseapp.com",
  projectId: "chatok-5062a",
  storageBucket: "chatok-5062a.appspot.com",
  messagingSenderId: "688967939413",
  appId: "1:688967939413:web:a1cbc05b7da7d5c1d62bdc",
  // apiKey: "AIzaSyB6k8oLQdXxQ8IBatzD2fcbmnqIq8sihCo",
  // authDomain: "anonymousqwe-chat.firebaseapp.com",
  // projectId: "anonymousqwe-chat",
  // storageBucket: "anonymousqwe-chat.appspot.com",
  // messagingSenderId: "321251792345",
  // appId: "1:321251792345:web:863722027e37d8a24bf5c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realTimeDb = getDatabase(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
