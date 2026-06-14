import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Section = ({
  children,
  padding = "64px 24px",
  backgroundColor = "transparent",
  style = {}
}) => <section style={cx({
  padding,
  backgroundColor,
  boxSizing: "border-box"
}, style)}>{children}</section>;
const Container = ({
  children,
  maxWidth = "1120px",
  padding = "24px",
  center = true,
  style = {}
}) => <div style={cx({
  width: "100%",
  maxWidth,
  padding,
  margin: center ? "0 auto" : 0,
  boxSizing: "border-box"
}, style)}>{children}</div>;
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
const Input = ({
  label = "Label",
  placeholder = "Enter text",
  value,
  onChange = () => {},
  type = "text"
}) => <label style={{
  display: "grid",
  gap: "6px",
  color: colors.text,
  fontSize: "14px"
}}>{label}<input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={fieldBase()} /></label>;
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
export const NewsletterSection = () => <Section><Container><Flex><Input label="Newsletter" placeholder="Email address" /><button style={buttonBase()}>Subscribe</button></Flex></Container></Section>;

export default NewsletterSection;
