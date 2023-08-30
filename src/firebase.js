import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtFabJHsABPQ3oK7m4Zw5qR8BwfXhzi6g",
  authDomain: "digital-recruitment-solutions.firebaseapp.com",
  projectId: "digital-recruitment-solutions",
  storageBucket: "digital-recruitment-solutions.appspot.com",
  messagingSenderId: "460969005656",
  appId: "1:460969005656:web:efe635083cfd4c481cf02d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
