import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '~/models/modules/login';

interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: '',
    name: '',
    phoneNumber: '',
    userName: '',
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = { ...payload.payload };
    },
    logout: (state) => {
      state.isAuthenticated = true;
      state.user = { ...initialState.user };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
