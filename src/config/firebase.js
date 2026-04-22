import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth'; // Uncomment if using Auth

// TODO: Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDY4Q0HdgwnOccrkAHrZZRroeStp_nnpI8",
  authDomain: "anthinh-storage.firebaseapp.com",
  projectId: "anthinh-storage",
  storageBucket: "anthinh-storage.firebasestorage.app",
  messagingSenderId: "373637135044",
  appId: "1:373637135044:web:4f2753040d0f45e9a56791"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const auth = getAuth(app); // Uncomment if using Auth
