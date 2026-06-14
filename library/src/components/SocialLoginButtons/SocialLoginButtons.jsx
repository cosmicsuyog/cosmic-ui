import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Stack = ({
  children,
  gap = "12px",
  align = "stretch",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: "column",
  gap,
  alignItems: align
}, style)}>{children}</div>;
const colors = {
  bg: "#ffffff",
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  soft: "#f8fafc",
  accent: "#2563eb",
  success: "#16a34a",
  danger: "#dc2626",
  warning: "#d97706"
};
const buttonBase = ({
  backgroundColor = colors.accent,
  textColor = "#ffffff",
  borderRadius = "6px",
  padding = "10px 14px"
} = {}) => ({
  backgroundColor,
  color: textColor,
  border: "none",
  borderRadius,
  padding,
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit"
});
const SocialButton = ({
  provider = "Google",
  onClick = () => {}
}) => <button onClick={onClick} style={cx(buttonBase({
  backgroundColor: "#fff",
  textColor: colors.text
}), {
  border: `1px solid ${colors.border}`
})}>Continue with {provider}</button>;
export const SocialLoginButtons = ({
  providers = ["Google", "GitHub"]
}) => <Stack>{providers.map(provider => <SocialButton key={provider} provider={provider} />)}</Stack>;

export default SocialLoginButtons;
