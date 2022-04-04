import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// const isEmulating = window.location.hostname === "localhost:5000";
// if (isEmulating) {
//   firebase.auth().useEmulator("http://localhost:9099");
//   firebase.functions().useEmulator("localhost", 5001);
//   firebase.firestore().useEmulator("localhost", 8080);
// }

// firebase Session管理の設定変更
firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    //console.log("Initialized!");
  });

export const db = firebaseApp.firestore();
export const rtdb = firebaseApp.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
