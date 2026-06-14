import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
export const Center = ({
  children,
  minHeight = "240px",
  style = {}
}) => <div style={cx({
  minHeight,
  display: "grid",
  placeItems: "center"
}, style)}>{children}</div>;

export default Center;
