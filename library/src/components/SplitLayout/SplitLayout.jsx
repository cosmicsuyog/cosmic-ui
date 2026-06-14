import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
export const SplitLayout = ({
  left,
  right,
  gap = "32px",
  leftWidth = "1fr",
  rightWidth = "1fr",
  style = {}
}) => <div style={cx({
  display: "grid",
  gridTemplateColumns: `${leftWidth} ${rightWidth}`,
  gap,
  alignItems: "center"
}, style)}><div>{left}</div><div>{right}</div></div>;

export default SplitLayout;
