import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/user';
import cocktailReducer from './cocktail/cocktailSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cocktail: cocktailReducer,
  },
});

export default store;
