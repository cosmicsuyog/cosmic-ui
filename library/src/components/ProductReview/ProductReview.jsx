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
export const ProductReview = ({
  name = "Customer",
  rating = 5,
  text = "Great product."
}) => <TestimonialCard quote={`${"★".repeat(rating)} ${text}`} name={name} role="Verified buyer" />;

export default ProductReview;
