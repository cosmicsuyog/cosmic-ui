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
const DataTable = ({
  columns = ["Name", "Status"],
  rows = [{
    name: "Cosmic UI",
    status: "Ready"
  }]
}) => <table style={{
  width: "100%",
  borderCollapse: "collapse"
}}><thead><tr>{columns.map(c => <th key={c} style={{
        textAlign: "left",
        padding: "10px",
        borderBottom: `1px solid ${colors.border}`
      }}>{c}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{Object.values(row).map((value, j) => <td key={j} style={{
        padding: "10px",
        borderBottom: `1px solid ${colors.border}`
      }}>{value}</td>)}</tr>)}</tbody></table>;
export const RecentTransactions = ({
  transactions = [{
    name: "Order #123",
    amount: "$99"
  }]
}) => <DataTable columns={["Name", "Amount"]} rows={transactions} />;

export default RecentTransactions;
