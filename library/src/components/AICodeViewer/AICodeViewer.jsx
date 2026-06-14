import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
const CodeBlock = ({
  code = "const component = 'Cosmic UI';",
  language = "javascript"
}) => <pre style={cx(cardBase({
  backgroundColor: "#0f172a",
  borderColor: "#1e293b"
}), {
  color: "#e2e8f0",
  overflow: "auto"
})}><code>{language && `// ${language}\n`}{code}</code></pre>;
export const AICodeViewer = CodeBlock;

export default AICodeViewer;
