import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
export const FloatingActionButton = ({
  icon = "+",
  onClick = () => {},
  bottom = "24px",
  right = "24px"
}) => <button onClick={onClick} style={cx(buttonBase({
  padding: "16px 20px"
}), {
  position: "fixed",
  bottom,
  right,
  borderRadius: "999px",
  boxShadow: "0 16px 34px rgba(37,99,235,0.3)"
})}>{icon}</button>;

export default FloatingActionButton;
