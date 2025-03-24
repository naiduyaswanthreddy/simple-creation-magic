import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAJuJ8DKdnn75WgvyXnKV3PJwp4BbwMvCc",
    authDomain: "trail-f142f.firebaseapp.com",
    projectId: "trail-f142f",
    storageBucket: "trail-f142f.firebasestorage.app",
    messagingSenderId: "472625893135",
    appId: "1:472625893135:web:0096c358c7589df975f87a",
    measurementId: "G-8NTM6KGK8J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Ensure user session persists
setPersistence(auth, browserLocalPersistence);

export { db, auth };