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
const Stepper = ({
  steps = ["Account", "Profile", "Finish"],
  current = 1
}) => <Flex>{steps.map((step, i) => <Flex key={step} gap="8px"><span style={{
      ...buttonBase({
        backgroundColor: i <= current ? colors.accent : colors.soft,
        textColor: i <= current ? "#fff" : colors.muted,
        padding: "7px 11px"
      }),
      borderRadius: "999px"
    }}>{i + 1}</span><span style={{
      fontSize: "14px",
      color: i <= current ? colors.text : colors.muted
    }}>{step}</span></Flex>)}</Flex>;
export const WorkflowBuilder = ({
  steps = ["Trigger", "Action", "Done"]
}) => <Stepper steps={steps} />;

export default WorkflowBuilder;
