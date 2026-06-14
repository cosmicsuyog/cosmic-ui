import React, { useEffect, useMemo, useState } from "react";

export const Rating = ({
  value = 4,
  max = 5
}) => <span style={{
  color: "#f59e0b"
}}>{Array.from({
    length: max
  }, (_, i) => i < value ? "★" : "☆").join("")}</span>;

export default Rating;
