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
const ImageGallery = ({
  images = []
}) => <Grid columns={3}>{(images.length ? images : ["", "", ""]).map((src, i) => <Image key={i} src={src} height="160px" />)}</Grid>;
export const LightboxGallery = ImageGallery;

export default LightboxGallery;
