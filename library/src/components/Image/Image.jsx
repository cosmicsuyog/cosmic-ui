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
export const Image = ({
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

export default Image;
