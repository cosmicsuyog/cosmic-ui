import { useAuth } from "../hooks/useAuth";

const LogoutButton = ({ onLogoutSuccess }) => {
  const { handleLogout, loading } = useAuth();

  const handleClick = async () => {
    const result = await handleLogout();
    if (result.type === "auth/logout/fulfilled") {
      onLogoutSuccess?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        padding: "var(--spacing-sm) var(--spacing-md)",
        backgroundColor: loading ? "var(--color-text-tertiary)" : "var(--color-accent)",
        color: "var(--color-white)",
        border: "none",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-body-m)",
        fontWeight: "var(--weight-medium)",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        if (!loading) {
          const target = e.currentTarget;
          target.style.backgroundColor = "#D8914D";
          target.style.boxShadow = "var(--shadow-md)";
        }
      }}
      onFocus={(e) => {
        if (!loading) {
          const target = e.currentTarget;
          target.style.backgroundColor = "#D8914D";
          target.style.boxShadow = "var(--shadow-md)";
        }
      }}
      onMouseOut={(e) => {
        if (!loading) {
          const target = e.currentTarget;
          target.style.backgroundColor = "var(--color-accent)";
          target.style.boxShadow = "var(--shadow-sm)";
        }
      }}
      onBlur={(e) => {
        if (!loading) {
          const target = e.currentTarget;
          target.style.backgroundColor = "var(--color-accent)";
          target.style.boxShadow = "var(--shadow-sm)";
        }
      }}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
