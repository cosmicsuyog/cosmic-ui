import React from "react";

export const Textarea = ({
  value = "",
  placeholder = "Enter your message...",
  rows = 4,
  accent = "#6366f1",
  bg = "#0f172a",
  color = "#fff",
  disabled = false,
  onChange = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid " + alpha(accent, 0.2),
        background: bg,
        color: color,
        fontFamily: "system-ui,sans-serif",
        fontSize: "14px",
        lineHeight: 1.5,
        resize: "vertical",
        outline: "none",
        minHeight: rows * 24 + "px",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "text",
        transition: "border-color 0.2s, box-shadow 0.2s"
      }}
    />
  );
};