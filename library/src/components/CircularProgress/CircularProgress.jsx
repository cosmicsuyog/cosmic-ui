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
export const CircularProgress = ({
  value = 70,
  size = 76
}) => <div style={{
  width: size,
  height: size,
  borderRadius: "50%",
  background: `conic-gradient(${colors.accent} ${value}%, ${colors.soft} 0)`,
  display: "grid",
  placeItems: "center"
}}><span style={{
    background: "#fff",
    borderRadius: "50%",
    width: size - 18,
    height: size - 18,
    display: "grid",
    placeItems: "center",
    fontSize: "13px"
  }}>{value}%</span></div>;

export default CircularProgress;
