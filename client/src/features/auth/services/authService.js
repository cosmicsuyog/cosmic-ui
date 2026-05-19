import axios from "axios";

import { auth, provider } from "../../../utils/firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request if available
authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config;
});

export const googleAuthService = (idToken) => authClient.post("/auth/google", { idToken });

export const logoutService = () =>
  // Sign out from Firebase
  auth.signOut().then(() =>
    // Then call backend logout
    authClient.get("/auth/logout")
  );

export { auth, provider };

export default authClient;
