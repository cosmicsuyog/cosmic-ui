import React, { useEffect, useMemo, useState } from "react";

export const TreeView = ({
  items = [{
    label: "src",
    children: [{
      label: "components"
    }]
  }]
}) => <ul>{items.map(item => <li key={item.label}>{item.label}{item.children && <TreeView items={item.children} />}</li>)}</ul>;

export default TreeView;
