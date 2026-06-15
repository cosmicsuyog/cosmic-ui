import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Grid = ({
  children,
  columns = 3,
  gap = "20px",
  minWidth = "220px",
  style = {}
}) => <div style={cx({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
  gap
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
const ChartFrame = ({
  title,
  children
}) => <div style={cardBase({
  width: "360px"
})}><h3 style={{
    marginTop: 0
  }}>{title}</h3>{children}</div>;
const Flex = ({
  children,
  direction = "row",
  align = "center",
  justify = "flex-start",
  gap = "12px",
  wrap = "wrap",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: direction,
  alignItems: align,
  justifyContent: justify,
  gap,
  flexWrap: wrap
}, style)}>{children}</div>;
const BarChart = ({
  data = [40, 70, 55, 90]
}) => <ChartFrame title="Bar Chart"><Flex align="flex-end" style={{
    height: "140px"
  }}>{data.map((v, i) => <div key={i} style={{
      width: "42px",
      height: `${v}%`,
      backgroundColor: colors.accent,
      borderRadius: "6px 6px 0 0"
    }} />)}</Flex></ChartFrame>;
const LineChart = ({
  data = [20, 50, 35, 80, 60]
}) => <ChartFrame title="Line Chart"><svg viewBox="0 0 300 120" width="100%" height="140"><polyline fill="none" stroke={colors.accent} strokeWidth="4" points={data.map((v, i) => `${i * 70},${120 - v}`).join(" ")} /></svg></ChartFrame>;
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
const Alert = ({
  title = "Alert",
  message = "Something needs your attention.",
  tone = "primary"
}) => <div style={cx(cardBase({
  backgroundColor: toneMap[tone].bg,
  borderColor: toneMap[tone].border,
  shadow: false
}), {
  color: toneMap[tone].color
})}><strong>{title}</strong><div>{message}</div></div>;
const ActivityFeed = ({
  items = ["New signup", "Payment received", "Component published"]
}) => <Stack>{items.map(item => <Alert key={item} title={item} message="Just now" tone="default" />)}</Stack>;
export const AnalyticsDashboard = () => <Grid columns={2}><StatisticsCard /><BarChart /><LineChart /><ActivityFeed /></Grid>;

export default AnalyticsDashboard;
