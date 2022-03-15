// Import the functions you need from the SDKs you need

import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA43zHNAVLi0XExrectdHevRQ1lRZsSnA",
  authDomain: "pharmacy-fb5d1.firebaseapp.com",
  databaseURL: "https://pharmacy-fb5d1-default-rtdb.firebaseio.com",
  projectId: "pharmacy-fb5d1",
  storageBucket: "pharmacy-fb5d1.appspot.com",
  messagingSenderId: "55525374564",
  appId: "1:55525374564:web:48b623c4b8ff5b2ecffd71"
};

// Initialize Firebase
const firebase_app  = initializeApp(firebaseConfig);

export default firebase_app;