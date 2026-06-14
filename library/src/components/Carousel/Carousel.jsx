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
  fontFamily: "inherit"
});
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
export const Carousel = ({
  items = ["Slide 1", "Slide 2", "Slide 3"]
}) => {
  const [index, setIndex] = useState(0);
  return <div style={cardBase({
    width: "520px"
  })}><Center minHeight="180px">{items[index]}</Center><Flex justify="space-between"><button style={buttonBase({
        backgroundColor: colors.soft,
        textColor: colors.text
      })} onClick={() => setIndex((index - 1 + items.length) % items.length)}>Prev</button><button style={buttonBase()} onClick={() => setIndex((index + 1) % items.length)}>Next</button></Flex></div>;
};

export default Carousel;
