import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDjhp94HJ-Ct5dOMqy8cQPDSe2BVoa0utI",
  authDomain: "netflixclone4373.firebaseapp.com",
  databaseURL: "https://netflixclone4373-default-rtdb.firebaseio.com",
  projectId: "netflixclone4373",
  storageBucket: "netflixclone4373.appspot.com",
  messagingSenderId: "849139825197",
  appId: "1:849139825197:web:c2ad94d273e013514e96a4",
  measurementId: "G-MCCE8EEWLP"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fire = getAuth(app);

export { app, fire, analytics };
