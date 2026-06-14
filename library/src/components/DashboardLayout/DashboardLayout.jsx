import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const SidebarLayout = ({
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
export const DashboardLayout = ({
  header,
  sidebar,
  children,
  sidebarWidth = "260px"
}) => <div style={{
  minHeight: "100vh",
  backgroundColor: "#f6f8fb"
}}>
    {header}
    <SidebarLayout sidebar={sidebar} sidebarWidth={sidebarWidth} style={{
    padding: "20px"
  }}>{children}</SidebarLayout>
  </div>;

export default DashboardLayout;
