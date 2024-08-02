import api from "./api";

export const getRandomCocktails = async (count = 10) => {
  const promises = Array.from({ length: count }, () =>
    api.get("/random.php").then((response) => response.data.drinks[0])
  );

  const drinks = await Promise.all(promises);
  return drinks;
};

export const getCocktailsBySearch = async (query) => {
  const response = await api.get(`/search.php?s=${query}`);
  return response.data.drinks;
};

export const getCocktailDetails = async (name) => {
  const response = await api.get(`/search.php?s=${name}`);
  return response.data.drinks[0];
};
