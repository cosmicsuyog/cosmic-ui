import React, { useEffect, useMemo, useState } from "react";

export const VideoPlayer = ({
  src = "",
  controls = true
}) => <video src={src} controls={controls} style={{
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#000"
}} />;

export default VideoPlayer;
