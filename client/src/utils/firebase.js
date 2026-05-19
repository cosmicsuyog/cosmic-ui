import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cosmicui.firebaseapp.com",
  projectId: "cosmicui",
  storageBucket: "cosmicui.firebasestorage.app",
  messagingSenderId: "1013228782009",
  appId: "1:1013228782009:web:b71faa9f54a04e75d1f668",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
