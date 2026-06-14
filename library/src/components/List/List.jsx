import React, { useEffect, useMemo, useState } from "react";

export const List = ({
  items = ["First item", "Second item"]
}) => <ul style={{
  margin: 0,
  paddingLeft: "20px"
}}>{items.map(item => <li key={item}>{item}</li>)}</ul>;

export default List;
