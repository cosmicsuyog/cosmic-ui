import React, { useEffect, useMemo, useState } from "react";

export const RadioButton = ({
  label = "Radio",
  name = "radio",
  checked = false,
  onChange = () => {}
}) => <label style={{
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontSize: "14px"
}}><input type="radio" name={name} checked={checked} onChange={e => onChange(e.target.checked)} />{label}</label>;

export default RadioButton;
