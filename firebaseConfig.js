import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB96Ac3UtBitrWHZWRKCgL_bz4TJKcidPo",
  authDomain: "infiqai.firebaseapp.com",
  projectId: "infiqai",
  storageBucket: "infiqai.firebasestorage.app",
  messagingSenderId: "894376434941",
  appId: "1:894376434941:web:1b038d626d615584713294",
  measurementId: "G-280RPXEFE3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);