import CocktailsClient from './CocktailsClient';
import { getRandomCocktails, getCocktailsBySearch } from '@/services/cocktailService';

const CocktailsServer = async ({ searchQuery }) => {
  let cocktails = [];

  try {
    cocktails = searchQuery
      ? await getCocktailsBySearch(searchQuery)
      : await getRandomCocktails();
  } catch (error) {
    console.error('Error fetching cocktails:', error);
    cocktails = [];
  }

  const isCocktails = cocktails.length > 0;

  return (
    <CocktailsClient cocktails={cocktails} isCocktails={isCocktails} />
  );
};

export default CocktailsServer;
