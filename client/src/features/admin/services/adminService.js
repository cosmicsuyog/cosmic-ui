import authClient from "../../auth/services/authService";

export const getAdminStatsService = () => authClient.get("/admin/stats");

export const getAdminUsersService = () => authClient.get("/admin/users");

export const getAdminComponentsService = () => authClient.get("/admin/components");

export const saveAdminComponentService = ({ name, props, code }) =>
  authClient.post("/components/save", {
    name,
    props,
    code,
    visibility: "public",
  });
