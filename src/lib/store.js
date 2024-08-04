import { configureStore } from '@reduxjs/toolkit';
import cocktailReducer from './cocktail/cocktailSlice';


const store = configureStore({
  reducer: {
    cocktail: cocktailReducer,
  },
});

export default store;
