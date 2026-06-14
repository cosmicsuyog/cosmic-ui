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
export const HeroSection = ({
  title = "Build beautiful components",
  subtitle = "A prop-first React UI library for fast product work.",
  action = "Start building"
}) => <Section padding="80px 24px"><Container><Stack gap="18px" style={{
      maxWidth: "680px"
    }}><h1 style={{
        fontSize: "48px",
        margin: 0
      }}>{title}</h1><p style={{
        color: colors.muted,
        fontSize: "18px"
      }}>{subtitle}</p><button style={buttonBase({
        padding: "12px 18px"
      })}>{action}</button></Stack></Container></Section>;

export default HeroSection;
