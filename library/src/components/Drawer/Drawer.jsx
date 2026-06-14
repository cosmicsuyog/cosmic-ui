import React, { useEffect, useMemo, useState } from "react";

export const Drawer = ({
  open = true,
  children = "Drawer content",
  side = "right",
  width = "360px"
}) => open ? <div style={{
  position: "fixed",
  top: 0,
  bottom: 0,
  [side]: 0,
  width,
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "0 0 40px rgba(0,0,0,0.18)",
  zIndex: 90
}}>{children}</div> : null;

export default Drawer;
