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
const BasicCard = ({
  title = "Card Title",
  content = "Simple card content.",
  action = "Learn more"
}) => <div style={cardBase({
  width: "320px"
})}><h3 style={{
    marginTop: 0
  }}>{title}</h3><p style={{
    color: colors.muted
  }}>{content}</p><button style={buttonBase()}>{action}</button></div>;
export const CourseCard = ({
  title = "React Basics",
  lessons = 24,
  level = "Beginner"
}) => <BasicCard title={title} content={`${lessons} lessons - ${level}`} action="Start" />;

export default CourseCard;
