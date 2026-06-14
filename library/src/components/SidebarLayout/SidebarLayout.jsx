import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
export const SidebarLayout = ({
  sidebar,
  children,
  sidebarWidth = "260px",
  gap = "24px",
  style = {}
}) => <div style={cx({
  display: "grid",
  gridTemplateColumns: `${sidebarWidth} 1fr`,
  gap,
  minHeight: "100%"
}, style)}><aside>{sidebar}</aside><main>{children}</main></div>;

export default SidebarLayout;
