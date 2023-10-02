// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMNSYN72ROPfZtKLmve0M8p9gyZ3EaqtU",
  authDomain: "user-email-password-auth-d5b4c.firebaseapp.com",
  projectId: "user-email-password-auth-d5b4c",
  storageBucket: "user-email-password-auth-d5b4c.appspot.com",
  messagingSenderId: "558214601571",
  appId: "1:558214601571:web:c6d26c12ddf92d37461156"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;