import React, { useState } from "react";

export const ProductCard = ({
  image = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20420%22%3E%3Crect%20width%3D%22600%22%20height%3D%22420%22%20fill%3D%22%23f8f3ee%22%2F%3E%3Crect%20x%3D%2280%22%20y%3D%22255%22%20width%3D%22440%22%20height%3D%2258%22%20rx%3D%2229%22%20fill%3D%22%232a2622%22%20opacity%3D%220.92%22%2F%3E%3Cpath%20d%3D%22M145%20254C198%20188%20278%20152%20354%20168C420%20182%20478%20218%20510%20254H145Z%22%20fill%3D%22%23e8a06e%22%2F%3E%3Ccircle%20cx%3D%22212%22%20cy%3D%22314%22%20r%3D%2234%22%20fill%3D%22%232a2622%22%2F%3E%3Ccircle%20cx%3D%22438%22%20cy%3D%22314%22%20r%3D%2234%22%20fill%3D%22%232a2622%22%2F%3E%3Ctext%20x%3D%2274%22%20y%3D%2286%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2238%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3EProduct%20preview%3C%2Ftext%3E%3C%2Fsvg%3E",
  title = "Premium Leather Sneakers",
  description = "Handcrafted leather sneakers with premium comfort and modern design.",
  price = 129.99,
  currency = "$",
  rating = 4.5,
  reviews = 112,
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {},
  onWishlist = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "20px",
        overflow: "hidden",
        width: "280px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s ease" }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "8px" }}>
          <button onClick={onWishlist} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </button>
        </div>
      </div>
      <div style={{ padding: "18px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 8px", lineHeight: 1.4 }}>{title}</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 18px" }}>{description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          {stars.map((star) => (
            <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= rating ? accent : "rgba(255,255,255,0.15)"} stroke={star <= rating ? accent : "rgba(255,255,255,0.15)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.12 12 17.77 5.82 21.12 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          ))}
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>({reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div style={{ fontSize: "18px", fontWeight: "800", color: accent }}>{currency}{price}</div>
          <button onClick={onAddToCart} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};