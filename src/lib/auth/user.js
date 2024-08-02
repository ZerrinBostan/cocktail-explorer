import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const userReducers = {
  login: (state) => {
    state.isAuthenticated = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
    }
  },
  logout: (state) => {
    state.isAuthenticated = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('isAuthenticated') : false,
  },
  reducers: userReducers,
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
