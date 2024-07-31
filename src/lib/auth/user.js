import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const userReducers = {
  login: (state) => {
    state.isAuthenticated = true;
  },
  logout: (state) => {
    state.isAuthenticated = false;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers,
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
