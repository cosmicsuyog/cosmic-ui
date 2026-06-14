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
export const Navbar = ({
  brand = "Cosmic UI",
  links = ["Home", "Docs", "Pricing"],
  action = "Get Started",
  onAction = () => {},
  backgroundColor = "#ffffff"
}) => <nav style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 24px",
  backgroundColor,
  borderBottom: `1px solid ${colors.border}`
}}>
    <strong style={{
    color: colors.text
  }}>{brand}</strong>
    <Flex gap="18px">{links.map(link => <a key={link} href="#" style={{
      color: colors.muted,
      textDecoration: "none",
      fontSize: "14px"
    }}>{link}</a>)}</Flex>
    <button style={buttonBase()} onClick={onAction}>{action}</button>
  </nav>;

export default Navbar;
