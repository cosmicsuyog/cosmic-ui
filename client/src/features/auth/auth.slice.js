import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { googleAuthService } from "./services/authService";

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await googleAuthService(idToken);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Auth failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    return null;
  } catch (error) {
    return rejectWithValue(error.message || "Logout failed");
  }
});

const initialState = {
  user: null,
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
      state.token = token;
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
        state.isAuthenticated = true;
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
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { initializeAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
