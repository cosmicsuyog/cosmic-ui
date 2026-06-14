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
export const Avatar = ({
  name = "User",
  src = "",
  size = 40
}) => <div title={name} style={{
  width: size,
  height: size,
  borderRadius: "999px",
  background: src ? `url(${src}) center/cover` : colors.accent,
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontWeight: 700
}}>{!src && name.slice(0, 1)}</div>;

export default Avatar;
