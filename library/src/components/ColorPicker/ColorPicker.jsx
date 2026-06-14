import React, { useEffect, useMemo, useState } from "react";

export const ColorPicker = ({
  label = "Color",
  value = "#2563eb",
  onChange = () => {}
}) => <label style={{
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px"
}}>{label}<input type="color" value={value} onChange={e => onChange(e.target.value)} /></label>;

export default ColorPicker;
