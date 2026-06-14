import React, { useEffect, useMemo, useState } from "react";

export const FullscreenModal = ({
  open = true,
  children = "Fullscreen content"
}) => open ? <div style={{
  position: "fixed",
  inset: 0,
  backgroundColor: "#fff",
  zIndex: 120,
  padding: "32px"
}}>{children}</div> : null;

export default FullscreenModal;
