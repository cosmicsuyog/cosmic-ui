import React, { useEffect, useMemo, useState } from "react";

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
const Box = ({
  children,
  padding = "16px",
  backgroundColor = colors.soft,
  borderRadius = "8px",
  style = {}
}) => <div style={cx({
  padding,
  backgroundColor,
  borderRadius,
  boxSizing: "border-box"
}, style)}>{children}</div>;
export const DragAndDropList = ({
  items = ["First", "Second", "Third"]
}) => <Stack>{items.map(item => <Box key={item}>{item}</Box>)}</Stack>;

export default DragAndDropList;
