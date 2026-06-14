import React, { useEffect, useMemo, useState } from "react";

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
export const Chip = ({
  label = "Chip",
  onRemove
}) => <Flex gap="6px" style={{
  display: "inline-flex",
  backgroundColor: colors.soft,
  borderRadius: "999px",
  padding: "6px 10px"
}}><span>{label}</span>{onRemove && <button onClick={onRemove} style={{
    border: "none",
    background: "transparent",
    cursor: "pointer"
  }}>x</button>}</Flex>;

export default Chip;
