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
const DescriptionList = ({
  items = {
    Framework: "React",
    Package: "Cosmic UI"
  }
}) => <dl>{Object.entries(items).map(([key, value]) => <React.Fragment key={key}><dt style={{
      fontWeight: 700
    }}>{key}</dt><dd style={{
      margin: "0 0 10px",
      color: colors.muted
    }}>{value}</dd></React.Fragment>)}</dl>;
export const OrderSummary = ({
  subtotal = "$99",
  total = "$99"
}) => <DescriptionList items={{
  Subtotal: subtotal,
  Total: total
}} />;

export default OrderSummary;
