import authClient from "../../auth/services/authService";

export const generateComponentService = (prompt) =>
  authClient.post("/components/generate", { prompt });

export const saveComponentService = ({ name, code, props, visibility = "private" }) =>
  authClient.post("/components/save", { name, code, props, visibility });

export const publishComponentService = ({ componentId, otp }) =>
  authClient.post("/components/publish", { componentId, otp });
