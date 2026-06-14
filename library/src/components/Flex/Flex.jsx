import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
export const Flex = ({
  children,
  direction = "row",
  align = "center",
  justify = "flex-start",
  gap = "12px",
  wrap = "wrap",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: direction,
  alignItems: align,
  justifyContent: justify,
  gap,
  flexWrap: wrap
}, style)}>{children}</div>;

export default Flex;
