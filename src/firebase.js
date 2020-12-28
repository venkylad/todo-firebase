import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAqhOED1QfVRaSPBdcEaYoBDjIhyT70fM",
  authDomain: "todo-4e72f.firebaseapp.com",
  projectId: "todo-4e72f",
  storageBucket: "todo-4e72f.appspot.com",
  messagingSenderId: "992180305379",
  appId: "1:992180305379:web:a85158ce7d63b1275034d6",
  measurementId: "G-J07T41LCVM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);


