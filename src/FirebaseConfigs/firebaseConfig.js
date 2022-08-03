// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCwIw0c29A6mR1jXy-sMnVi842ulkkJ-TU",
    authDomain: "sasta-aeeb9.firebaseapp.com",
    projectId: "sasta-aeeb9",
    storageBucket: "sasta-aeeb9.appspot.com",
    messagingSenderId: "121090616764",
    appId: "1:121090616764:web:9e92ffc10af6c175bdcfb9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)