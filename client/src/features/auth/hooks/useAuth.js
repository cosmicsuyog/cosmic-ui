import { useDispatch, useSelector } from "react-redux";

import { auth, provider } from "../../../utils/firebase";
import { googleAuth, logout, clearError } from "../auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    if (!state.auth) {
      return {};
    }
    return state.auth;
  });

  const handleGoogleAuth = async (googleUser) => {
    const result = await dispatch(googleAuth(googleUser));
    return result;
  };

  const handleLogout = async () => {
    const result = await dispatch(logout());
    return result;
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    ...authState,
    handleGoogleAuth,
    handleLogout,
    handleClearError,
    auth,
    provider,
  };
};
