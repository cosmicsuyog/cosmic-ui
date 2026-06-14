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
export const MessageBubble = ({
  children = "Message",
  mine = false
}) => <div style={{
  alignSelf: mine ? "flex-end" : "flex-start",
  backgroundColor: mine ? colors.accent : colors.soft,
  color: mine ? "#fff" : colors.text,
  padding: "10px 12px",
  borderRadius: "14px",
  maxWidth: "78%"
}}>{children}</div>;

export default MessageBubble;
