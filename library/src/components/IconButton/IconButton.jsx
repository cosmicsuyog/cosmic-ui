import React, { useEffect, useMemo, useState } from "react";

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
export const IconButton = ({
  icon = "+",
  label = "Action",
  onClick = () => {},
  backgroundColor = colors.soft,
  textColor = colors.text
}) => <button aria-label={label} title={label} onClick={onClick} style={buttonBase({
  backgroundColor,
  textColor,
  padding: "10px 12px"
})}>{icon}</button>;

export default IconButton;
