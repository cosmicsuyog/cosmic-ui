const AuthHeader = ({ title, subtitle }) => (
  <div
    style={{
      textAlign: "center",
      marginBottom: "var(--spacing-2xl)",
    }}
  >
    <h1
      style={{
        fontSize: "var(--text-h1)",
        fontWeight: "var(--weight-bold)",
        color: "var(--color-charcoal)",
        marginBottom: "var(--spacing-md)",
      }}
    >
      {title}
    </h1>
    {subtitle && (
      <p
        style={{
          fontSize: "var(--text-body-m)",
          color: "var(--color-text-secondary)",
          fontWeight: "var(--weight-regular)",
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default AuthHeader;
