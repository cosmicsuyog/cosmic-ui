import React, { useState } from "react";

export const EcommerceCard = ({
  image = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  title = "Premium Sunglasses",
  description = "Polarized UV400 protection lenses with trendy frame design.",
  price = 149,
  currency = "$",
  rating = 4.5,
  reviews = 123,
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {},
  onViewDetails = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "20px",
        overflow: "hidden",
        width: "300px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s ease" }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", padding: "4px 10px", borderRadius: "20px", background: alpha(accent, 0.85), fontSize: "10px", fontWeight: "700", color: "#fff", textTransform: "uppercase", letterSpacing: "0.5px" }}>NEW</div>
      </div>
      <div style={{ padding: "18px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 8px", lineHeight: 1.4 }}>{title}</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 8px" }}>{description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(rating) ? accent : "rgba(255,255,255,0.1)"} stroke={i < Math.round(rating) ? accent : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.12 12 17.77 5.82 21.12 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            ))}
          </div>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>({reviews} reviews)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>{currency}{Math.round(price)}</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Free shipping</div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onAddToCart} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Add to Cart</button>
          <button onClick={onViewDetails} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "1px solid " + alpha(accent, 0.3), background: "transparent", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Details</button>
        </div>
      </div>
    </div>
  );
};