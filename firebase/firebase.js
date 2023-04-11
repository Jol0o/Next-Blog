import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDiXEjl01HsC8unJLzGTyo7MFNChHt3Pzc",
    authDomain: "blog-b2097.firebaseapp.com",
    projectId: "blog-b2097",
    storageBucket: "blog-b2097.appspot.com",
    messagingSenderId: "927170592115",
    appId: "1:927170592115:web:3f5388db19a910997e9906",
    measurementId: "G-1X41NNGVKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
