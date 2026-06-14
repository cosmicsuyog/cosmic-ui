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
const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const AspectRatio = ({
  children,
  ratio = "16 / 9",
  backgroundColor = colors.soft,
  borderRadius = "8px",
  style = {}
}) => <div style={cx({
  aspectRatio: ratio,
  backgroundColor,
  borderRadius,
  overflow: "hidden"
}, style)}>{children}</div>;
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
export const StoryViewer = ({
  title = "Story",
  imageUrl = ""
}) => <AspectRatio ratio="9 / 16"><Image src={imageUrl} alt={title} height="100%" /></AspectRatio>;

export default StoryViewer;
