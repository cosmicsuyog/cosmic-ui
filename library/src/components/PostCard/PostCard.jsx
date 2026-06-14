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
const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
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
const Avatar = ({
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
function ProfileSummary({
  name = "User",
  subtitle = "Member",
  imageUrl = ""
}) {
  return <Flex align="center" style={cardBase({
    width: "320px",
    shadow: false
  })}><Avatar name={name} src={imageUrl} /><div><strong>{name}</strong><div style={{
        color: colors.muted,
        fontSize: "14px"
      }}>{subtitle}</div></div></Flex>;
}
const UserSummary = ({
  name = "Suyog",
  email = "user@example.com"
}) => <ProfileSummary name={name} subtitle={email} />;
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
export const PostCard = ({
  author = "User",
  content = "Today I built a component.",
  actions = ["Like", "Share"]
}) => <div style={cardBase({
  width: "420px"
})}><UserSummary name={author} email="@user" /><p>{content}</p><Flex>{actions.map(action => <button key={action} style={buttonBase({
      backgroundColor: colors.soft,
      textColor: colors.text
    })}>{action}</button>)}</Flex></div>;

export default PostCard;
