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
export const SkeletonLoader = ({
  lines = 3
}) => <Stack>{Array.from({
    length: lines
  }, (_, i) => <div key={i} style={{
    height: "14px",
    width: i === lines - 1 ? "65%" : "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "999px"
  }} />)}</Stack>;

export default SkeletonLoader;
