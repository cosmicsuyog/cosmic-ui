import React, { useEffect, useMemo, useState } from "react";

export const Spacer = ({
  size = "24px",
  axis = "vertical"
}) => <div style={{
  width: axis === "horizontal" ? size : "1px",
  height: axis === "vertical" ? size : "1px"
}} />;

export default Spacer;
