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
export const Spinner = ({
  size = 32,
  color = colors.accent
}) => <div style={{
  width: size,
  height: size,
  border: `3px solid ${colors.border}`,
  borderTopColor: color,
  borderRadius: "50%"
}} />;

export default Spinner;
