import axios from "axios";

import { auth, provider } from "../../../utils/firebase";

const API_URL = import.meta.env.VITE_API_URL || "https://cosmic-ui.onrender.com/api";

const authClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
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

export const googleAuthService = ({ displayName, email }) =>
  authClient.post("/auth/google", { name: displayName || email, email });

export const logoutService = () =>
  // Sign out from Firebase
  auth.signOut().then(() =>
    // Then call backend logout
    authClient.get("/auth/logout")
  );

export { auth, provider };

export default authClient;
