// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqPG60tIJOOTy90m0olbsPkTbMK8F1p28",
  authDomain: "vitecontact-43b10.firebaseapp.com",
  projectId: "vitecontact-43b10",
  storageBucket: "vitecontact-43b10.appspot.com",
  messagingSenderId: "35605605323",
  appId: "1:35605605323:web:823cd16be007499dea244e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);