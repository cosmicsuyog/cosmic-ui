import React, { useEffect, useMemo, useState } from "react";

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
export const Tabs = ({
  tabs = ["Overview", "Details", "Settings"],
  activeTab,
  onChange = () => {},
  children
}) => {
  const [current, setCurrent] = useState(activeTab || tabs[0]);
  const choose = tab => {
    setCurrent(tab);
    onChange(tab);
  };
  return <div><Flex gap="4px" style={{
      borderBottom: `1px solid ${colors.border}`
    }}>{tabs.map(tab => <button key={tab} onClick={() => choose(tab)} style={cx(buttonBase({
        backgroundColor: "transparent",
        textColor: current === tab ? colors.accent : colors.muted
      }), {
        borderBottom: current === tab ? `2px solid ${colors.accent}` : "2px solid transparent",
        borderRadius: 0
      })}>{tab}</button>)}</Flex><div style={{
      paddingTop: "16px"
    }}>{children || current}</div></div>;
};

export default Tabs;
