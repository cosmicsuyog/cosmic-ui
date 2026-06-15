import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Grid = ({
  children,
  columns = 3,
  gap = "20px",
  minWidth = "220px",
  style = {}
}) => <div style={cx({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
  gap
}, style)}>{children}</div>;
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
  boxSizing: "border-box",
  color: colors.text
}, style)}>{children}</div>;
export const KanbanBoard = ({
  columns = [{
    title: "Todo",
    cards: ["Design"]
  }, {
    title: "Done",
    cards: ["Setup"]
  }]
}) => <Grid columns={columns.length}>{columns.map(column => <Stack key={column.title} style={cardBase({
    shadow: false
  })}><strong>{column.title}</strong>{column.cards.map(card => <Box key={card} backgroundColor="#fff">{card}</Box>)}</Stack>)}</Grid>;

export default KanbanBoard;
