import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL69qI-t9fuGHuCquJudILbUwlb79WdV0",
  authDomain: "graceful-flowers.firebaseapp.com",
  projectId: "graceful-flowers",
  storageBucket: "graceful-flowers.firebasestorage.app",
  messagingSenderId: "440075792487",
  appId: "1:440075792487:web:c396d5f91bcebc4e6224c2",
  measurementId: "G-YXB9558KH2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);