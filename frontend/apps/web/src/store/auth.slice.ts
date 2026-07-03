import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: number;
  username: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<AuthResponse>) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
