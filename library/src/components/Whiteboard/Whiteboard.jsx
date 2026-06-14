import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Center = ({
  children,
  minHeight = "240px",
  style = {}
}) => <div style={cx({
  minHeight,
  display: "grid",
  placeItems: "center"
}, style)}>{children}</div>;
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
export const Whiteboard = ({
  children = "Whiteboard area"
}) => <Center minHeight="360px" style={{
  border: `1px dashed ${colors.border}`,
  borderRadius: "8px",
  backgroundColor: "#fff"
}}>{children}</Center>;

export default Whiteboard;
