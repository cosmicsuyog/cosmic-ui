import authClient from "../../auth/services/authService";

export const getMyComponentsService = () => authClient.get("/components/my");

export const getPublicComponentsService = () => authClient.get("/components/public");

export const saveMyComponentService = ({ name, props, code }) =>
  authClient.post("/components/save", {
    name,
    props,
    code,
    visibility: "private",
  });
