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
const DropdownMenu = ({
  label = "Options",
  items = ["Edit", "Duplicate", "Delete"],
  onSelect = () => {}
}) => {
  const [open, setOpen] = useState(false);
  return <div style={{
    position: "relative",
    display: "inline-block"
  }}><button style={buttonBase()} onClick={() => setOpen(!open)}>{label}</button>{open && <div style={{
      position: "absolute",
      top: "calc(100% + 8px)",
      right: 0,
      zIndex: 20
    }}><Menu items={items} onSelect={item => {
        onSelect(item);
        setOpen(false);
      }} /></div>}</div>;
};
const Popover = ({
  trigger = "Open popover",
  content = "Popover content"
}) => <DropdownMenu label={trigger} items={[content]} />;
export const Popup = Popover;

export default Popup;
