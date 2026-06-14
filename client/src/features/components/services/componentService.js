import authClient from "../../auth/services/authService";

export const getMyComponentsService = () => authClient.get("/components/my");

export const getPublicComponentsService = () => authClient.get("/components/public");
