import React, { useEffect, useMemo, useState } from "react";

const List = ({
  items = ["First item", "Second item"]
}) => <ul style={{
  margin: 0,
  paddingLeft: "20px"
}}>{items.map(item => <li key={item}>{item}</li>)}</ul>;
export const RelatedPosts = ({
  posts = ["Post one", "Post two"]
}) => <List items={posts} />;

export default RelatedPosts;
