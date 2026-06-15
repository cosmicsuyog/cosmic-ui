import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
const cardBase = ({
  backgroundColor = colors.bg,
  borderColor = colors.border,
  borderRadius = "8px",
  padding = "20px",
  shadow = true,
  width = "100%"
} = {}) => ({
  backgroundColor,
  border: `1px solid ${borderColor}`,
  borderRadius,
  padding,
  width,
  boxSizing: "border-box",
  boxShadow: shadow ? "0 8px 28px rgba(15,23,42,0.08)" : "none",
  color: colors.text,
  fontFamily: "inherit"
});
export const FileUpload = ({
  label = "Upload file",
  onChange = () => {}
}) => <label style={cx(cardBase({
  padding: "18px",
  shadow: false
}), {
  display: "block",
  cursor: "pointer",
  color: colors.muted
})}>{label}<input type="file" onChange={e => onChange(e.target.files)} style={{
    display: "block",
    marginTop: "10px"
  }} /></label>;

export default FileUpload;
