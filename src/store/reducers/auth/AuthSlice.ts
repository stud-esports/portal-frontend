import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchLogout,
  fetchRefreshTokens,
  fetchSignin,
  fetchSignup,
} from './ActionCreators';

export interface AuthState {
  access_token: string | null;
  isRefreshing: boolean;
  isTryingToLogin: boolean;
  errorRefreshing: string | null;
  errorLogin: string | null;
  isFirstRefreshDone: boolean;
}

const initialState: AuthState = {
  access_token: null,
  isRefreshing: true,
  isTryingToLogin: false,
  errorRefreshing: null,
  errorLogin: null,
  isFirstRefreshDone: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
    },
    clearAuthState(state) {
      state.access_token = null;
      state.errorRefreshing = null;
      state.errorLogin = null;
      state.isRefreshing = false;
      state.isTryingToLogin = false;
      state.isFirstRefreshDone = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRefreshTokens.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.errorRefreshing = null;
      state.isRefreshing = false;
      if (!state.isFirstRefreshDone) {
        state.isFirstRefreshDone = true;
      }
    });

    builder.addCase(fetchRefreshTokens.pending, (state) => {
      state.isRefreshing = true;
    });

    builder.addCase(fetchRefreshTokens.rejected, (state, action) => {
      state.isRefreshing = false;
      state.errorRefreshing = action.error.message || null;
      state.access_token = null;
      if (!state.isFirstRefreshDone) {
        state.isFirstRefreshDone = true;
      }
    });

    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.errorLogin = null;
      state.isTryingToLogin = false;
      state.isFirstRefreshDone = true;
    });

    builder.addCase(fetchSignup.pending, (state) => {
      state.isTryingToLogin = true;
    });

    builder.addCase(fetchSignup.rejected, (state, action) => {
      state.isTryingToLogin = false;
      state.errorLogin = action.error.message || null;
      state.access_token = null;
    });

    builder.addCase(fetchSignin.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.errorLogin = null;
      state.isTryingToLogin = false;
      state.isFirstRefreshDone = true;
    });

    builder.addCase(fetchSignin.pending, (state) => {
      state.isTryingToLogin = true;
      state.errorLogin = null;
    });

    builder.addCase(fetchSignin.rejected, (state, action) => {
      state.isTryingToLogin = false;
      state.errorLogin = action.error.message || null;
      state.access_token = null;
    });

    builder.addCase(fetchLogout.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});
