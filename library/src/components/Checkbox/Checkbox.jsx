import React, { useEffect, useMemo, useState } from "react";

export const Checkbox = ({
  label = "Checkbox",
  checked = false,
  onChange = () => {}
}) => <label style={{
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontSize: "14px"
}}><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />{label}</label>;

export default Checkbox;
