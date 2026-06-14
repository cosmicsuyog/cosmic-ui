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
const ChartFrame = ({
  title,
  children
}) => <div style={cardBase({
  width: "360px"
})}><h3 style={{
    marginTop: 0
  }}>{title}</h3>{children}</div>;
const LineChart = ({
  data = [20, 50, 35, 80, 60]
}) => <ChartFrame title="Line Chart"><svg viewBox="0 0 300 120" width="100%" height="140"><polyline fill="none" stroke={colors.accent} strokeWidth="4" points={data.map((v, i) => `${i * 70},${120 - v}`).join(" ")} /></svg></ChartFrame>;
export const AreaChart = LineChart;

export default AreaChart;
