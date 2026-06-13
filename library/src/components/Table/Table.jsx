import React from "react";

export const Table = ({
  columns = ["Name", "Age", "Status"],
  rows = [
    { name: "John Doe", age: 28, status: "Active" },
    { name: "Jane Smith", age: 34, status: "Inactive" },
    { name: "Alice Johnson", age: 22, status: "Active" }
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  onRowClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "12px", overflow: "hidden", width: "720px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + columns.length + ", 1fr)", background: alpha(accent, 0.12), padding: "12px 16px", borderBottom: "1px solid " + alpha(accent, 0.1) }}>
        {columns.map((col, i) => (
          <div key={i} style={{ fontSize: "13px", fontWeight: "700", color: accent }}>{col}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {rows.map((row, i) => (
          <div key={i} onClick={() => onRowClick(row)} style={{ display: "grid", gridTemplateColumns: "repeat(" + columns.length + ", 1fr)", padding: "12px 16px", background: i % 2 === 0 ? bg : alpha(bg, 0.95), cursor: "pointer", transition: "background 0.2s" }}>
            {Object.values(row).map((value, j) => (
              <div key={j} style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>{value}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};