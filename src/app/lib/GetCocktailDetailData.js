'use server'
const { getCocktailDetails } = require("@/services/cocktailService");

const GetCocktailDetailData = async ({ searchQuery }) => {
    const cocktailDetail = await getCocktailDetails()

    if (!cocktailDetail) {
        throw new Error('Failed')
    }

    return cocktailDetail;

};
export default GetCocktailDetailData;