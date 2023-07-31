// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI9dz06G9TuKBgkp15JPGQdWkDWHQw7Bs",
  authDomain: "my-3d-portfolio.firebaseapp.com",
  projectId: "my-3d-portfolio",
  storageBucket: "my-3d-portfolio.appspot.com",
  messagingSenderId: "13711270786",
  appId: "1:13711270786:web:a78acecf341716bc2aa59b",
  measurementId: "G-SRC5XNCXGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);