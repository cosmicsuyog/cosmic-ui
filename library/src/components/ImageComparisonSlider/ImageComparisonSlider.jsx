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
const Image = ({
  src = "",
  alt = "Image",
  width = "100%",
  height = "auto",
  borderRadius = "8px"
}) => <img src={src} alt={alt} style={{
  width,
  height,
  borderRadius,
  objectFit: "cover",
  display: "block",
  backgroundColor: colors.soft
}} />;
export const ImageComparisonSlider = ({
  before = "",
  after = ""
}) => <div style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2px",
  overflow: "hidden",
  borderRadius: "8px"
}}><Image src={before} alt="Before" /><Image src={after} alt="After" /></div>;

export default ImageComparisonSlider;
