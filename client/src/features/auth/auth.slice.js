import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { googleAuthService, logoutService } from "./services/authService";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (googleUser, { rejectWithValue }) => {
    try {
      const response = await googleAuthService(googleUser);
      const { token = null, user } = response.data;
      if (!token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return rejectWithValue(
          "Sign-in token missing. Please try again after the backend deploys."
        );
      }
      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Auth failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutService();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  } catch (error) {
    return rejectWithValue(error.message || "Logout failed");
  }
});

const storedUser = getStoredUser();

const initialState = {
  user: localStorage.getItem("token") ? storedUser : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const token = localStorage.getItem("token");
      const user = getStoredUser();
      if (!token) {
        localStorage.removeItem("user");
      }
      state.token = token;
      state.user = token ? user : null;
      state.isAuthenticated = !!token;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.token;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { initializeAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
