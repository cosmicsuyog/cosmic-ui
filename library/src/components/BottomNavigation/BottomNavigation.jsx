import React, { useEffect, useMemo, useState } from "react";

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
export const BottomNavigation = ({
  items = ["Home", "Search", "Profile"],
  active = "Home",
  onSelect = () => {}
}) => <Flex justify="space-around" style={{
  width: "100%",
  padding: "10px",
  borderTop: `1px solid ${colors.border}`,
  backgroundColor: "#fff"
}}>{items.map(item => <button key={item} onClick={() => onSelect(item)} style={buttonBase({
    backgroundColor: "transparent",
    textColor: item === active ? colors.accent : colors.muted
  })}>{item}</button>)}</Flex>;

export default BottomNavigation;
