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
const cardBase = ({
  backgroundColor = colors.bg,
  borderColor = colors.border,
  borderRadius = "8px",
  padding = "20px",
  shadow = true,
  width = "100%"
} = {}) => ({
  backgroundColor,
  border: `1px solid ${borderColor}`,
  borderRadius,
  padding,
  width,
  boxSizing: "border-box",
  boxShadow: shadow ? "0 8px 28px rgba(15,23,42,0.08)" : "none",
  fontFamily: "inherit"
});
const toneMap = {
  default: {
    bg: "#f8fafc",
    color: "#334155",
    border: "#e2e8f0"
  },
  primary: {
    bg: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe"
  },
  success: {
    bg: "#ecfdf5",
    color: "#047857",
    border: "#bbf7d0"
  },
  warning: {
    bg: "#fffbeb",
    color: "#b45309",
    border: "#fde68a"
  },
  danger: {
    bg: "#fef2f2",
    color: "#b91c1c",
    border: "#fecaca"
  }
};
const Toast = ({
  message = "Saved successfully",
  tone = "success"
}) => <div style={cx(cardBase({
  backgroundColor: toneMap[tone].bg,
  borderColor: toneMap[tone].border,
  width: "320px"
}), {
  color: toneMap[tone].color
})}>{message}</div>;
export const Snackbar = Toast;

export default Snackbar;
