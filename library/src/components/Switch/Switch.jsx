import React, { useState } from "react";

export const Switch = ({
  checked = false,
  accent = "#6366f1",
  bg = "#0f172a",
  onChange = () => {}
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onClick={() => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
      }}
      style={{
        width: "48px",
        height: "24px",
        borderRadius: "24px",
        background: isChecked ? accent : "rgba(255,255,255,0.12)",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s"
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "2px",
          left: isChecked ? "26px" : "2px",
          transition: "left 0.2s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      />
    </div>
  );
};