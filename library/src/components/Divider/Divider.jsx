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
export const Divider = ({
  color = colors.border,
  thickness = "1px",
  margin = "16px 0",
  vertical = false
}) => <div style={{
  backgroundColor: color,
  width: vertical ? thickness : "100%",
  height: vertical ? "100%" : thickness,
  margin
}} />;

export default Divider;
