import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { initializeAuth } from "../features/auth/auth.slice";
import LoginPage from "../features/auth/pages/LoginPage";
import AdminPage from "../features/admin/pages/AdminPage";
import ComingSoonPage from "../features/coming-soon/pages/ComingSoonPage";
import PublicComponentsPage from "../features/docs/pages/PublicComponentsPage";
import GeneratePage from "../features/generate/pages/GeneratePage";
import HomePage from "../features/home/pages/HomePage";
import PricingPage from "../features/pricing/pages/PricingPage";
import CustomCursor from "./CustomCursor";
import "./index.css";

const INITIAL_LOADER_DURATION_MS = 900;
const ROUTE_TRANSITION_DURATION_MS = 650;

const TopLoadingBar = () => (
  <div className="cosmic-top-loader" aria-label="Loading page" aria-live="polite" role="status">
    <span className="cosmic-top-loader-bar" />
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const [initialLoaderActive, setInitialLoaderActive] = useState(true);
  const [routeTransitioning, setRouteTransitioning] = useState(false);
  const hasSeenFirstRoute = useRef(false);
  const showInitialLoader = loading || initialLoaderActive;

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialLoaderActive(false);
    }, INITIAL_LOADER_DURATION_MS);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showInitialLoader) {
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
  }, [location.pathname, showInitialLoader]);

  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <>
      {(showInitialLoader || routeTransitioning) && <TopLoadingBar />}
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
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to={isAuthenticated ? "/home" : "/"} replace />}
        />
        <Route
          path="/generate"
          element={isAuthenticated ? <GeneratePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/components"
          element={
            isAuthenticated ? (
              <PublicComponentsPage key="my-components" initialSource="mine" />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/coming-soon/components"
          element={
            isAuthenticated ? (
              <PublicComponentsPage key="my-components-alias" initialSource="mine" />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/docs"
          element={<PublicComponentsPage key="public-components" initialSource="public" />}
        />
        <Route
          path="/docs/components"
          element={<PublicComponentsPage key="public-components-docs" initialSource="public" />}
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/coming-soon/docs"
          element={<PublicComponentsPage key="public-components-alias" initialSource="public" />}
        />
        <Route path="/coming-soon/:page" element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
