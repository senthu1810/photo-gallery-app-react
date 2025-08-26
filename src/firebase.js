import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBiUGzOIky4RYoZdV1pWcqmMU4N6AqnI88",

    authDomain: "photo-gallery-app-react-38a7d.firebaseapp.com",
  
    projectId: "photo-gallery-app-react-38a7d",
  
    storageBucket: "photo-gallery-app-react-38a7d.firebasestorage.app",
  
    messagingSenderId: "35649777724",
  
    appId: "1:35649777724:web:c0b5e7db0d39bd47025339"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized (Firestore):", db);

export { db };