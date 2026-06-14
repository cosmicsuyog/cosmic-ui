import React, { useEffect, useMemo, useState } from "react";

const toneMap = {
  default: {
    bg: "#f8fafc",
    color: "#334155",
    border: "#e2e8f0"
  },
  primary: {
    bg: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe"
  },
  success: {
    bg: "#ecfdf5",
    color: "#047857",
    border: "#bbf7d0"
  },
  warning: {
    bg: "#fffbeb",
    color: "#b45309",
    border: "#fde68a"
  },
  danger: {
    bg: "#fef2f2",
    color: "#b91c1c",
    border: "#fecaca"
  }
};
export const FormValidation = ({
  message = "This field is required.",
  tone = "danger"
}) => <span style={{
  color: toneMap[tone].color,
  fontSize: "13px"
}}>{message}</span>;

export default FormValidation;
