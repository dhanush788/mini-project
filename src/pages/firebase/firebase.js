import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD8nPjDMQG5u5gJcgnmYXjk93UOhj68mag",
    authDomain: "passkey-auth.firebaseapp.com",
    projectId: "passkey-auth",
    storageBucket: "passkey-auth.appspot.com",
    messagingSenderId: "985615710770",
    appId: "1:985615710770:web:f56af5d1bd6231c0fa1a2b",
    measurementId: "G-YV7198B87G"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

