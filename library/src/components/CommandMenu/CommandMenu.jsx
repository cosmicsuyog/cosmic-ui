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
const fieldBase = ({
  width = "100%",
  borderColor = colors.border,
  borderRadius = "6px",
  padding = "10px 12px"
} = {}) => ({
  width,
  border: `1px solid ${borderColor}`,
  borderRadius,
  padding,
  fontSize: "14px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none"
});
const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange = () => {}
}) => <input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={fieldBase()} />;
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
const Menu = ({
  items = ["Profile", "Billing", "Logout"],
  onSelect = () => {}
}) => <Stack gap="4px" style={cardBase({
  padding: "8px",
  width: "220px",
  shadow: false
})}>{items.map(item => <button key={item} onClick={() => onSelect(item)} style={cx(buttonBase({
    backgroundColor: "transparent",
    textColor: colors.text
  }), {
    textAlign: "left"
  })}>{item}</button>)}</Stack>;
export const CommandMenu = ({
  commands = ["Create component", "Open settings", "Search docs"],
  onSelect = () => {}
}) => <Stack style={cardBase({
  width: "420px",
  padding: "12px"
})}><SearchBar placeholder="Type a command..." /><Menu items={commands} onSelect={onSelect} /></Stack>;

export default CommandMenu;
