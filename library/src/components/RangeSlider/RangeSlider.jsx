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
export const RangeSlider = ({
  label = "Range",
  min = 0,
  max = 100,
  value = 50,
  onChange = () => {}
}) => <label style={{
  display: "grid",
  gap: "8px",
  fontSize: "14px"
}}><Flex justify="space-between"><span>{label}</span><strong>{value}</strong></Flex><input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} /></label>;

export default RangeSlider;
