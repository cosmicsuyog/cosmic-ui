import authClient from "../../auth/services/authService";

export const getMyComponentsService = () => authClient.get("/components/my");
