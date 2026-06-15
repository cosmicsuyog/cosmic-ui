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
export const BlogCard = ({
  title = "Design systems that scale",
  author = "Cosmic UI",
  excerpt = "Build reusable interfaces faster.",
  imageUrl = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fff8f0%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232a2622%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22720%22%20cy%3D%22130%22%20r%3D%22150%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.32%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22500%22%20r%3D%22210%22%20fill%3D%22%232a2622%22%20opacity%3D%220.18%22%2F%3E%3Cpath%20d%3D%22M0%20430C180%20350%20315%20520%20515%20420C665%20345%20760%20355%20900%20305V600H0Z%22%20fill%3D%22%232a2622%22%20opacity%3D%220.82%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2296%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2252%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECosmic%20UI%3C%2Ftext%3E%3Ctext%20x%3D%2264%22%20y%3D%22150%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22600%22%20fill%3D%22%236d5f56%22%3EPreview%20image%3C%2Ftext%3E%3C%2Fsvg%3E"
}) => <BasicCard title={title} content={`${author} - ${excerpt}`} action="Read" />;

export default BlogCard;
