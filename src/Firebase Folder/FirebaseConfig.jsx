
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyOmw6OpgSYvAeeiCMEIFiM31fSzGw8aY",
  authDomain: "al-shathibi-df719.firebaseapp.com",
  projectId: "al-shathibi-df719",
  storageBucket: "al-shathibi-df719.firebasestorage.app",
  messagingSenderId: "41245309723",
  appId: "1:41245309723:web:8ff08971e4daf5a9c5f1be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
const analytics = getAnalytics(app);