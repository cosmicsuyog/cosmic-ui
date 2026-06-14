import React, { useEffect, useMemo, useState } from "react";

const TreeView = ({
  items = [{
    label: "src",
    children: [{
      label: "components"
    }]
  }]
}) => <ul>{items.map(item => <li key={item.label}>{item.label}{item.children && <TreeView items={item.children} />}</li>)}</ul>;
export const FileExplorer = ({
  files = ["src", "package.json", "README.md"]
}) => <TreeView items={files.map(label => ({
  label
}))} />;

export default FileExplorer;
