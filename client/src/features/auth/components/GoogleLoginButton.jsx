import { useEffect, useCallback } from "react";

import { useAuth } from "../hooks/useAuth";

const GoogleLoginButton = ({ onSuccess }) => {
  const { handleGoogleAuth, loading, error } = useAuth();

  const handleGoogleSuccess = useCallback(
    async (response) => {
      const idToken = response.credential;
      const result = await handleGoogleAuth(idToken);

      if (result.type === "auth/googleAuth/fulfilled") {
        onSuccess?.();
      }
    },
    [handleGoogleAuth, onSuccess]
  );

  useEffect(() => {
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
      });
      window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
        theme: "outline",
        size: "large",
      });
    }
  }, [handleGoogleSuccess]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-md)",
      }}
    >
      <div
        id="google-signin-button"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
      {error && (
        <div
          style={{
            color: "var(--color-red-soft)",
            fontSize: "var(--text-body-s)",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
      {loading && (
        <div
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-body-s)",
            textAlign: "center",
          }}
        >
          Signing in...
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
