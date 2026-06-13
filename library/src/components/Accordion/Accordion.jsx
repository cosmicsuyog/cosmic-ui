import React, { useState } from "react";

export const Accordion = ({
  items = [
    { title: "What is this?", content: "This is an accordion component." },
    { title: "How does it work?", content: "You can expand and collapse items by clicking on them." },
    { title: "Can I customize it?", content: "Yes, you can pass your own items and styles." }
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  textColor = "#fff",
  borderColor = "rgba(255,255,255,0.08)"
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "12px", border: "1px solid " + borderColor, width: "400px", fontFamily: "system-ui,sans-serif" }}>
      {items.map((item, index) => (
        <div key={index} style={{ borderBottom: index < items.length - 1 ? "1px solid " + borderColor : "none" }}>
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            style={{
              width: "100%",
              padding: "14px 16px",
              background: activeIndex === index ? alpha(accent, 0.12) : "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: textColor,
              fontSize: "14px",
              fontWeight: "600"
            }}
          >
            {item.title}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: activeIndex === index ? "rotate(180deg)" : "none" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {activeIndex === index && (
            <div style={{ padding: "14px 16px", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};