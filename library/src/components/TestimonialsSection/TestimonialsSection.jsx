import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Section = ({
  children,
  padding = "64px 24px",
  backgroundColor = "transparent",
  style = {}
}) => <section style={cx({
  padding,
  backgroundColor,
  boxSizing: "border-box"
}, style)}>{children}</section>;
const Container = ({
  children,
  maxWidth = "1120px",
  padding = "24px",
  center = true,
  style = {}
}) => <div style={cx({
  width: "100%",
  maxWidth,
  padding,
  margin: center ? "0 auto" : 0,
  boxSizing: "border-box"
}, style)}>{children}</div>;
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
const TestimonialCard = ({
  quote = "This library saved us hours.",
  name = "Happy User",
  role = "Founder"
}) => <div style={cardBase({
  width: "360px"
})}><p style={{
    fontSize: "18px"
  }}>"{quote}"</p><strong>{name}</strong><span style={{
    color: colors.muted
  }}>{role}</span></div>;
export const TestimonialsSection = ({
  testimonials = ["Loved by teams"]
}) => <Section><Container><Grid>{testimonials.map(quote => <TestimonialCard key={quote} quote={quote} />)}</Grid></Container></Section>;

export default TestimonialsSection;
