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
const Select = ({
  label = "Select",
  options = ["Option 1", "Option 2"],
  value,
  onChange = () => {}
}) => <label style={{
  display: "grid",
  gap: "6px",
  fontSize: "14px"
}}>{label}<select value={value} onChange={e => onChange(e.target.value)} style={fieldBase()}>{options.map(option => <option key={option}>{option}</option>)}</select></label>;
export const AIModelSelector = ({
  models = ["gpt-5", "gpt-4.1"],
  value,
  onChange
}) => <Select label="Model" options={models} value={value} onChange={onChange} />;

export default AIModelSelector;
