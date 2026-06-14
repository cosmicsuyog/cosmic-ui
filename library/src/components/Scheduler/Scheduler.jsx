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
  fontFamily: "inherit"
});
const Center = ({
  children,
  minHeight = "240px",
  style = {}
}) => <div style={cx({
  minHeight,
  display: "grid",
  placeItems: "center"
}, style)}>{children}</div>;
function CalendarPreview({
  days = 30
}) {
  const cells = useMemo(() => Array.from({
    length: days
  }, (_, i) => i + 1), [days]);
  return <Grid columns={7} gap="6px" style={cardBase({
    width: "360px"
  })}>{cells.map(day => <Center key={day} minHeight="36px" style={{
      backgroundColor: day === 13 ? colors.accent : colors.soft,
      color: day === 13 ? "#fff" : colors.text,
      borderRadius: "6px"
    }}>{day}</Center>)}</Grid>;
}
export const Scheduler = CalendarPreview;

export default Scheduler;
