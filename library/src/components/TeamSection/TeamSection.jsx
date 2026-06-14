import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Section = ({
  children,
  padding = "64px 24px",
  backgroundColor = "transparent",
  style = {}
}) => <section style={cx({
  padding,
  backgroundColor,
  boxSizing: "border-box"
}, style)}>{children}</section>;
const Container = ({
  children,
  maxWidth = "1120px",
  padding = "24px",
  center = true,
  style = {}
}) => <div style={cx({
  width: "100%",
  maxWidth,
  padding,
  margin: center ? "0 auto" : 0,
  boxSizing: "border-box"
}, style)}>{children}</div>;
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
const TeamCard = ({
  name = "Alex Morgan",
  role = "Product Designer",
  imageUrl = ""
}) => <ProfileSummary name={name} subtitle={role} imageUrl={imageUrl} />;
export const TeamSection = ({
  members = ["Ana", "Ben", "Cara"]
}) => <Section><Container><Grid>{members.map(name => <TeamCard key={name} name={name} />)}</Grid></Container></Section>;

export default TeamSection;
