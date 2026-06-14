import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
export const Section = ({
  children,
  padding = "64px 24px",
  backgroundColor = "transparent",
  style = {}
}) => <section style={cx({
  padding,
  backgroundColor,
  boxSizing: "border-box"
}, style)}>{children}</section>;

export default Section;
