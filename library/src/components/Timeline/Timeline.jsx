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
const toneMap = {
  default: {
    bg: "#f8fafc",
    color: "#334155",
    border: "#e2e8f0"
  },
  primary: {
    bg: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe"
  },
  success: {
    bg: "#ecfdf5",
    color: "#047857",
    border: "#bbf7d0"
  },
  warning: {
    bg: "#fffbeb",
    color: "#b45309",
    border: "#fde68a"
  },
  danger: {
    bg: "#fef2f2",
    color: "#b91c1c",
    border: "#fecaca"
  }
};
const Badge = ({
  children = "Badge",
  tone = "primary"
}) => <span style={{
  display: "inline-flex",
  padding: "4px 9px",
  borderRadius: "999px",
  backgroundColor: toneMap[tone].bg,
  color: toneMap[tone].color,
  border: `1px solid ${toneMap[tone].border}`,
  fontSize: "12px",
  fontWeight: 700
}}>{children}</span>;
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
export const Timeline = ({
  items = [{
    title: "Created",
    time: "9:00"
  }, {
    title: "Reviewed",
    time: "10:00"
  }]
}) => <Stack>{items.map(item => <Flex key={item.title} align="flex-start"><Badge>{item.time}</Badge><div><strong>{item.title}</strong><p style={{
        margin: 0,
        color: colors.muted
      }}>{item.description}</p></div></Flex>)}</Stack>;

export default Timeline;
