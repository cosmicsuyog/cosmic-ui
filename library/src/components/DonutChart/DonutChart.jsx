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
  color: colors.text,
  fontFamily: "inherit"
});
const ChartFrame = ({
  title,
  children
}) => <div style={cardBase({
  width: "360px"
})}><h3 style={{
    marginTop: 0
  }}>{title}</h3>{children}</div>;
const CircularProgress = ({
  value = 70,
  size = 76
}) => <div style={{
  width: size,
  height: size,
  borderRadius: "50%",
  background: `conic-gradient(${colors.accent} ${value}%, ${colors.soft} 0)`,
  display: "grid",
  placeItems: "center"
}}><span style={{
    background: "#fff",
    borderRadius: "50%",
    width: size - 18,
    height: size - 18,
    display: "grid",
    placeItems: "center",
    fontSize: "13px"
  }}>{value}%</span></div>;
const PieChart = ({
  value = 65
}) => <ChartFrame title="Pie Chart"><CircularProgress value={value} size={140} /></ChartFrame>;
export const DonutChart = PieChart;

export default DonutChart;
