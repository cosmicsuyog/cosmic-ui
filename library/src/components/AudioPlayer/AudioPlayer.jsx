import React, { useEffect, useMemo, useState } from "react";

export const AudioPlayer = ({
  src = "",
  controls = true
}) => <audio src={src} controls={controls} style={{
  width: "100%"
}} />;

export default AudioPlayer;
