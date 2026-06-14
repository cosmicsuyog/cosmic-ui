import React, { useEffect, useMemo, useState } from "react";

const toneMap = {
  default: {
    bg: "#f8fafc",
    color: "#334155",
    border: "#e2e8f0"
  },
  primary: {
    bg: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe"
  },
  success: {
    bg: "#ecfdf5",
    color: "#047857",
    border: "#bbf7d0"
  },
  warning: {
    bg: "#fffbeb",
    color: "#b45309",
    border: "#fde68a"
  },
  danger: {
    bg: "#fef2f2",
    color: "#b91c1c",
    border: "#fecaca"
  }
};
const Badge = ({
  children = "Badge",
  tone = "primary"
}) => <span style={{
  display: "inline-flex",
  padding: "4px 9px",
  borderRadius: "999px",
  backgroundColor: toneMap[tone].bg,
  color: toneMap[tone].color,
  border: `1px solid ${toneMap[tone].border}`,
  fontSize: "12px",
  fontWeight: 700
}}>{children}</span>;
export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTime(v => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <Badge>{time}s</Badge>;
};

export default Stopwatch;
