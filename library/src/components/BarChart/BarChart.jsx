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
const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
export const BarChart = ({
  data = [40, 70, 55, 90]
}) => <ChartFrame title="Bar Chart"><Flex align="flex-end" style={{
    height: "140px"
  }}>{data.map((v, i) => <div key={i} style={{
      width: "42px",
      height: `${v}%`,
      backgroundColor: colors.accent,
      borderRadius: "6px 6px 0 0"
    }} />)}</Flex></ChartFrame>;

export default BarChart;
