import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyCsVVPOFZKB_GEAQv1ub7hRAVkk1p6NTVU",
  authDomain: "scrapit-439211.firebaseapp.com",
  databaseURL: "https://scrapit-439211-default-rtdb.firebaseio.com",
  projectId: "scrapit-439211",
  storageBucket: "scrapit-439211.firebasestorage.app",
  messagingSenderId: "729103709945",
  appId: "1:729103709945:web:59744d83f1402a2c1c1428",
  measurementId: "G-ZQ6HQYLC55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;