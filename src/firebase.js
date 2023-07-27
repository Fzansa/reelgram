// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAX8rbMgwIhKNqFUMKC3EGHo58MjpVq-XY",
    authDomain: "reelgram-38b75.firebaseapp.com",
    projectId: "reelgram-38b75",
    storageBucket: "reelgram-38b75.appspot.com",
    messagingSenderId: "940181655207",
    appId: "1:940181655207:web:93a54bec33679346f05582"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'), // Corrected 'firstore' to 'firestore'
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
}

export const storage = firebase.storage();