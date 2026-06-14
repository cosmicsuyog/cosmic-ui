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
export const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange = () => {}
}) => <input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={fieldBase()} />;

export default SearchBar;
