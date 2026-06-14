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
export const ProgressBar = ({
  value = 60,
  color = colors.accent
}) => <div style={{
  width: "100%",
  height: "10px",
  backgroundColor: colors.soft,
  borderRadius: "999px",
  overflow: "hidden"
}}><div style={{
    width: `${value}%`,
    height: "100%",
    backgroundColor: color
  }} /></div>;

export default ProgressBar;
