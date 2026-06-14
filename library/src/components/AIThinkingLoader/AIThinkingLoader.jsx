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
const Spinner = ({
  size = 32,
  color = colors.accent
}) => <div style={{
  width: size,
  height: size,
  border: `3px solid ${colors.border}`,
  borderTopColor: color,
  borderRadius: "50%"
}} />;
export const AIThinkingLoader = () => <Flex><Spinner size={20} /><span style={{
    color: colors.muted
  }}>Thinking...</span></Flex>;

export default AIThinkingLoader;
