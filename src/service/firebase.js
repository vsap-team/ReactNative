import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK7vOMVjC8f1ywxYXgRfSmeYXbP8D1NZY",
  authDomain: "file-upload-92de3.firebaseapp.com",
  projectId: "file-upload-92de3",
  storageBucket: "file-upload-92de3.appspot.com",
  messagingSenderId: "442275839531",
  appId: "1:442275839531:web:3063968c59d4a40a64746e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
export const db = getFirestore();

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  // console.log("hi",currentUser)

  return currentUser;
}
