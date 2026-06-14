import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Stack = ({
  children,
  gap = "12px",
  align = "stretch",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: "column",
  gap,
  alignItems: align
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
const MessageBubble = ({
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
const Flex = ({
  children,
  direction = "row",
  align = "center",
  justify = "flex-start",
  gap = "12px",
  wrap = "wrap",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: direction,
  alignItems: align,
  justifyContent: justify,
  gap,
  flexWrap: wrap
}, style)}>{children}</div>;
const fieldBase = ({
  width = "100%",
  borderColor = colors.border,
  borderRadius = "6px",
  padding = "10px 12px"
} = {}) => ({
  width,
  border: `1px solid ${borderColor}`,
  borderRadius,
  padding,
  fontSize: "14px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none"
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
const PromptInput = ({
  placeholder = "Ask AI...",
  onSend = () => {}
}) => {
  const [value, setValue] = useState("");
  return <Flex><input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} style={fieldBase()} /><button style={buttonBase()} onClick={() => {
      onSend(value);
      setValue("");
    }}>Send</button></Flex>;
};
export const ChatWindow = ({
  messages = [{
    from: "AI",
    text: "How can I help?"
  }]
}) => <Stack style={cardBase({
  width: "420px"
})}>{messages.map((message, i) => <MessageBubble key={i} mine={message.from === "You"}>{message.text}</MessageBubble>)}<PromptInput /></Stack>;

export default ChatWindow;
