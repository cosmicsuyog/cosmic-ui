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
export const Avatar = ({
  name = "User",
  src = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232a2622%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20rx%3D%22150%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22118%22%20r%3D%2254%22%20fill%3D%22%23fff8f0%22%20opacity%3D%220.92%22%2F%3E%3Cpath%20d%3D%22M68%20258C82%20200%20116%20172%20150%20172S218%20200%20232%20258%22%20fill%3D%22%23fff8f0%22%20opacity%3D%220.92%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22286%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2234%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECU%3C%2Ftext%3E%3C%2Fsvg%3E",
  size = 40
}) => <div title={name} style={{
  width: size,
  height: size,
  borderRadius: "999px",
  background: src ? `url(${src}) center/cover` : colors.accent,
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontWeight: 700
}}>{!src && name.slice(0, 1)}</div>;

export default Avatar;
