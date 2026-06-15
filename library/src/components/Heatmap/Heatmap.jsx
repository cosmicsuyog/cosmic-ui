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
export const Heatmap = ({
  cells = 24
}) => <ChartFrame title="Heatmap"><Grid columns={6} gap="6px">{Array.from({
      length: cells
    }, (_, i) => <div key={i} style={{
      height: "28px",
      borderRadius: "4px",
      backgroundColor: `rgba(37,99,235,${0.15 + i % 6 * 0.12})`
    }} />)}</Grid></ChartFrame>;

export default Heatmap;
