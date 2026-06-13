import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { initializeAuth } from "../features/auth/auth.slice";
import LoginPage from "../features/auth/pages/LoginPage";
import AdminPage from "../features/admin/pages/AdminPage";
import ComingSoonPage from "../features/coming-soon/pages/ComingSoonPage";
import GeneratePage from "../features/generate/pages/GeneratePage";
import HomePage from "../features/home/pages/HomePage";
import CustomCursor from "./CustomCursor";
import "./index.css";

const MIN_LOADER_DURATION_MS = 2500;
const ROUTE_TRANSITION_DURATION_MS = 520;

const RouteTransitionLoader = () => (
  <div className="cosmic-route-transition" aria-label="Loading page" aria-live="polite">
    <div className="cosmic-route-transition-card">
      <img src="/favicon.svg" alt="" className="cosmic-route-transition-logo" />
      <span className="cosmic-route-transition-text">COSMIC UI</span>
      <span className="cosmic-route-transition-track">
        <span className="cosmic-route-transition-bar" />
      </span>
    </div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const [loaderProgress, setLoaderProgress] = useState(1);
  const [minimumLoaderComplete, setMinimumLoaderComplete] = useState(false);
  const [routeTransitioning, setRouteTransitioning] = useState(false);
  const hasSeenFirstRoute = useRef(false);
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

  useEffect(() => {
    if (showLoader) {
      return undefined;
    }

    if (!hasSeenFirstRoute.current) {
      hasSeenFirstRoute.current = true;
      return undefined;
    }

    setRouteTransitioning(true);

    const timeout = setTimeout(() => {
      setRouteTransitioning(false);
    }, ROUTE_TRANSITION_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [location.pathname, showLoader]);

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

  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={isAdmin ? "/admin" : "/home"} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/home" element={isAdmin ? <Navigate to="/admin" replace /> : <HomePage />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to={isAuthenticated ? "/home" : "/"} replace />}
        />
        <Route
          path="/generate"
          element={isAuthenticated ? <GeneratePage /> : <Navigate to="/" replace />}
        />
        <Route path="/coming-soon/:page" element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {routeTransitioning && <RouteTransitionLoader />}
    </>
  );
};

export default App;
