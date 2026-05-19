import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeAuth } from "../features/auth/auth.slice";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "var(--color-cream)",
        }}
      >
        <div
          style={{
            fontSize: "var(--text-body-m)",
            color: "var(--color-text-secondary)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-cream)",
      }}
    >
      {/* Router will render pages here */}
      App Layout
    </div>
  );
};

export default App;
