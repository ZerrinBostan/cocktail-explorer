'use server'
const { getRandomCocktails } = require("@/services/cocktailService");

const GetCocktailsData = async ({ searchQuery }) => {

    const drinks =  await getRandomCocktails();

    if (!drinks) {
        throw new Error('Failed')
    }

    return drinks;
};
export default GetCocktailsData;