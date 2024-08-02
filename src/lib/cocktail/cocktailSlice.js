import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  basket: [],
  savedCocktails: [],
  showConfetti: false,
};

const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addToBasket: (state, action) => {
      const existingItem = state.basket.find(
        (item) => item.idDrink === action.payload.idDrink
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      state.basket = state.basket.filter(
        (cocktail) => cocktail.idDrink !== action.payload.idDrink
      );
    },
    increaseQuantity: (state, action) => {
      const item = state.basket.find((cocktail) => cocktail.idDrink === action.payload.idDrink);
      if (item) {
        item.quantity += 1; 
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.basket.find((cocktail) => cocktail.idDrink === action.payload.idDrink);
      if (item && item.quantity > 1) {
        item.quantity -= 1; 
      } else if (item && item.quantity === 1) {
        state.basket = state.basket.filter(
          (cocktail) => cocktail.idDrink !== action.payload.idDrink
        );
      }
    },
    toggleConfetti: (state, action) => {
      state.showConfetti = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  addToBasket,
  removeFromBasket,
  increaseQuantity,
  decreaseQuantity,
  toggleConfetti
} = cocktailSlice.actions;

export default cocktailSlice.reducer;
