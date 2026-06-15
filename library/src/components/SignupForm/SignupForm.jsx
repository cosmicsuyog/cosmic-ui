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
const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
const FormWrapper = ({
  title = "Form",
  children,
  onSubmit = () => {}
}) => <form onSubmit={e => {
  e.preventDefault();
  onSubmit(e);
}} style={cardBase({
  width: "420px"
})}><Stack><h3 style={{
      margin: 0
    }}>{title}</h3>{children}<button style={buttonBase()}>Submit</button></Stack></form>;
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
const Input = ({
  label = "Label",
  placeholder = "Enter text",
  value,
  onChange = () => {},
  type = "text"
}) => <label style={{
  display: "grid",
  gap: "6px",
  color: colors.text,
  fontSize: "14px"
}}>{label}<input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={fieldBase()} /></label>;
export const SignupForm = ({
  onSubmit = () => {}
}) => <FormWrapper title="Create account" onSubmit={onSubmit}><Input label="Name" /><Input label="Email" type="email" /><Input label="Password" type="password" /></FormWrapper>;

export default SignupForm;
