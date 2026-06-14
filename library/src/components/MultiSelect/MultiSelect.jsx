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
const Checkbox = ({
  label = "Checkbox",
  checked = false,
  onChange = () => {}
}) => <label style={{
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontSize: "14px"
}}><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />{label}</label>;
export const MultiSelect = ({
  options = ["React", "Vue", "Svelte"],
  selected = [],
  onChange = () => {}
}) => <Stack>{options.map(option => <Checkbox key={option} label={option} checked={selected.includes(option)} onChange={checked => onChange(checked ? [...selected, option] : selected.filter(item => item !== option))} />)}</Stack>;

export default MultiSelect;
