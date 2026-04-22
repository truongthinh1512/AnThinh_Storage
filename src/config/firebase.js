import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth'; // Uncomment if using Auth

// TODO: Replace with your actual Firebase project config
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const auth = getAuth(app); // Uncomment if using Auth
