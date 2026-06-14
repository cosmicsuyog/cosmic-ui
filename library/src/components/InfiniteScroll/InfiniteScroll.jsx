import React, { useEffect, useMemo, useState } from "react";

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));
const Stack = ({
  children,
  gap = "12px",
  align = "stretch",
  style = {}
}) => <div style={cx({
  display: "flex",
  flexDirection: "column",
  gap,
  alignItems: align
}, style)}>{children}</div>;
export const InfiniteScroll = ({
  items = ["Item 1", "Item 2"],
  renderItem
}) => <Stack>{items.map((item, i) => <div key={i}>{renderItem ? renderItem(item, i) : item}</div>)}</Stack>;

export default InfiniteScroll;
