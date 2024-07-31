import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/user';

const makeStore = (preloadedState) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });
};

export default makeStore;
