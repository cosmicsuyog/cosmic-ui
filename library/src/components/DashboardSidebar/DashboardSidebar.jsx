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
const Sidebar = ({
  title = "Workspace",
  items = ["Dashboard", "Components", "Settings"],
  active = "Dashboard",
  onSelect = () => {},
  width = "260px"
}) => <aside style={{
  width,
  padding: "16px",
  borderRight: `1px solid ${colors.border}`,
  backgroundColor: "#fff",
  boxSizing: "border-box"
}}>
    <strong>{title}</strong>
    <Stack gap="6px" style={{
    marginTop: "16px"
  }}>{items.map(item => <button key={item} onClick={() => onSelect(item)} style={cx(buttonBase({
      backgroundColor: item === active ? colors.accent : "transparent",
      textColor: item === active ? "#fff" : colors.text
    }), {
      textAlign: "left"
    })}>{item}</button>)}</Stack>
  </aside>;
export const DashboardSidebar = Sidebar;

export default DashboardSidebar;
