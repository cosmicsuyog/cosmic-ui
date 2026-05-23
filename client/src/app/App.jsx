import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { initializeAuth } from "../features/auth/auth.slice";
import LoginPage from "../features/auth/pages/LoginPage";
import ComingSoonPage from "../features/coming-soon/pages/ComingSoonPage";
import HomePage from "../features/home/pages/HomePage";
import "./index.css";

const MIN_LOADER_DURATION_MS = 2500;

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const [loaderProgress, setLoaderProgress] = useState(1);
  const [minimumLoaderComplete, setMinimumLoaderComplete] = useState(false);
  const showLoader = loading || !minimumLoaderComplete;

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoaderComplete(true);
    }, MIN_LOADER_DURATION_MS);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showLoader) {
      return undefined;
    }

    const interval = setInterval(() => {
      setLoaderProgress((progress) => Math.min(progress + 1, 100));
    }, 25);

    return () => clearInterval(interval);
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className="cosmic-loader-screen">
        <div className="cosmic-loader-brand" aria-label="Loading COSMIC UI">
          <span>COSMIC UI</span>
        </div>

        <div className="cosmic-loader-progress" aria-live="polite">
          <div className="cosmic-loader-percent">{loaderProgress}%</div>
          <div className="cosmic-loader-track">
            <div className="cosmic-loader-bar" style={{ width: `${loaderProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/coming-soon/:page" element={<ComingSoonPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
