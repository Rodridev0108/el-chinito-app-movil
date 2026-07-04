import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf5CEjz01zthDCMj_eiEzoX2Khn6M2pEc",
  authDomain: "el-chinito-app-movil.firebaseapp.com",
  projectId: "el-chinito-app-movil",
  storageBucket: "el-chinito-app-movil.firebasestorage.app",
  messagingSenderId: "91021333749",
  appId: "1:91021333749:web:77110baab26cd9250d21bc",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
