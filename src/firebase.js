// import firebase from 'firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAe6XhUFIT6AplvVAGHosg5Pc2HiIlsp6w",
  authDomain: "disneyplus-6fb54.firebaseapp.com",
  projectId: "disneyplus-6fb54",
  storageBucket: "disneyplus-6fb54.appspot.com",
  messagingSenderId: "860235014905",
  appId: "1:860235014905:web:4511b4c1372fae4a80f828",
  measurementId: "G-DFF9NVZ35F"
  // measurementId: "G-GF51QDSH3M"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth= firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
const storage=firebase.storage();

export {auth,provider,storage};
export default db;