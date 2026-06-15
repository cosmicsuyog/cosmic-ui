import React, { useEffect, useMemo, useState } from "react";

const colors = {
  bg: "#ffffff",
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  soft: "#f8fafc",
  accent: "#2563eb",
  success: "#16a34a",
  danger: "#dc2626",
  warning: "#d97706"
};
const cardBase = ({
  backgroundColor = colors.bg,
  borderColor = colors.border,
  borderRadius = "8px",
  padding = "20px",
  shadow = true,
  width = "100%"
} = {}) => ({
  backgroundColor,
  border: `1px solid ${borderColor}`,
  borderRadius,
  padding,
  width,
  boxSizing: "border-box",
  boxShadow: shadow ? "0 8px 28px rgba(15,23,42,0.08)" : "none",
  color: colors.text,
  fontFamily: "inherit"
});
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
const ProductList = ({
  products = [{
    title: "Product",
    price: "$29"
  }]
}) => <Stack>{products.map(product => <Flex key={product.title} justify="space-between" style={cardBase({
    shadow: false
  })}><strong>{product.title}</strong><span>{product.price}</span></Flex>)}</Stack>;
const Divider = ({
  color = colors.border,
  thickness = "1px",
  margin = "16px 0",
  vertical = false
}) => <div style={{
  backgroundColor: color,
  width: vertical ? thickness : "100%",
  height: vertical ? "100%" : thickness,
  margin
}} />;
const buttonBase = ({
  backgroundColor = colors.accent,
  textColor = "#ffffff",
  borderRadius = "6px",
  padding = "10px 14px"
} = {}) => ({
  backgroundColor,
  color: textColor,
  border: "none",
  borderRadius,
  padding,
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit"
});
export const ShoppingCart = ({
  items = [{
    title: "Product",
    price: "$29"
  }]
}) => <div style={cardBase({
  width: "360px"
})}><h3>Cart</h3><ProductList products={items} /><Divider /><button style={buttonBase()}>Checkout</button></div>;

export default ShoppingCart;
