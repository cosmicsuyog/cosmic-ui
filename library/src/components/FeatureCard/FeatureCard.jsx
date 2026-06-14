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
export const FeatureCard = ({
  title = "Fast components",
  description = "Reusable props and sensible defaults.",
  icon = "*"
}) => <div style={cardBase({
  width: "300px"
})}><div style={{
    fontSize: "24px"
  }}>{icon}</div><h3>{title}</h3><p style={{
    color: colors.muted
  }}>{description}</p></div>;

export default FeatureCard;
