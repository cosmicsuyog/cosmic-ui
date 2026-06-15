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
const Flex = ({
  children,
  direction = "row",
  align = "center",
  justify = "flex-start",
  gap = "12px",
  wrap = "wrap",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: direction,
  alignItems: align,
  justifyContent: justify,
  gap,
  flexWrap: wrap
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
const IconButton = ({
  icon = "+",
  label = "Action",
  onClick = () => {},
  backgroundColor = colors.soft,
  textColor = colors.text
}) => <button aria-label={label} title={label} onClick={onClick} style={buttonBase({
  backgroundColor,
  textColor,
  padding: "10px 12px"
})}>{icon}</button>;
export const Modal = ({
  open = true,
  title = "Modal",
  children = "Modal content",
  onClose = () => {}
}) => open ? <div style={{
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15,23,42,0.45)",
  display: "grid",
  placeItems: "center",
  zIndex: 100
}}><div style={cardBase({
    width: "420px"
  })}><Flex justify="space-between"><h3 style={{
        margin: 0
      }}>{title}</h3><IconButton icon="x" label="Close" onClick={onClose} /></Flex><div style={{
      marginTop: "16px"
    }}>{children}</div></div></div> : null;

export default Modal;
