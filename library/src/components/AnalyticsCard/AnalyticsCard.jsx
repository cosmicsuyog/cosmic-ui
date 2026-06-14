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
const StatisticsCard = ({
  label = "Revenue",
  value = "$42K",
  change = "+12%"
}) => <div style={cardBase({
  width: "240px"
})}><span style={{
    color: colors.muted
  }}>{label}</span><h2 style={{
    margin: "8px 0"
  }}>{value}</h2><strong style={{
    color: colors.success
  }}>{change}</strong></div>;
export const AnalyticsCard = StatisticsCard;

export default AnalyticsCard;
