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
export const Footer = ({
  brand = "Cosmic UI"
}) => <footer style={{
  padding: "24px",
  borderTop: `1px solid ${colors.border}`,
  color: colors.muted
}}>{brand} © 2026</footer>;

export default Footer;
