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
export const Box = ({
  children,
  padding = "16px",
  backgroundColor = colors.soft,
  borderRadius = "8px",
  style = {}
}) => <div style={cx({
  padding,
  backgroundColor,
  borderRadius,
  boxSizing: "border-box",
  color: colors.text
}, style)}>{children}</div>;

export default Box;
