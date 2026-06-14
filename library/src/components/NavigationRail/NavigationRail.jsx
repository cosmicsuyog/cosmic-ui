import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
export const NavigationRail = ({
  items = ["Home", "Search", "Settings"],
  active = "Home",
  onSelect = () => {}
}) => <Stack gap="8px" style={{
  width: "80px",
  padding: "12px",
  backgroundColor: "#fff",
  borderRight: `1px solid ${colors.border}`
}}>{items.map(item => <button key={item} onClick={() => onSelect(item)} title={item} style={buttonBase({
    backgroundColor: item === active ? colors.accent : colors.soft,
    padding: "12px",
    textColor: item === active ? "#fff" : colors.text
  })}>{item.slice(0, 1)}</button>)}</Stack>;

export default NavigationRail;
