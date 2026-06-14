import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Center = ({
  children,
  minHeight = "240px",
  style = {}
}) => <div style={cx({
  minHeight,
  display: "grid",
  placeItems: "center"
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
const Spinner = ({
  size = 32,
  color = colors.accent
}) => <div style={{
  width: size,
  height: size,
  border: `3px solid ${colors.border}`,
  borderTopColor: color,
  borderRadius: "50%"
}} />;
export const LoadingOverlay = ({
  label = "Loading..."
}) => <Center style={{
  backgroundColor: "rgba(255,255,255,0.86)"
}}><Stack align="center"><Spinner /><span>{label}</span></Stack></Center>;

export default LoadingOverlay;
