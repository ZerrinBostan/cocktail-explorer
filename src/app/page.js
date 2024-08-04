import CocktailList from '../ui/CocktailsList'
import { getRandomCocktails } from '@/services/cocktailService';

const Page = async () => {
    const drinks = await getRandomCocktails();

    return (
        <CocktailList drinks={drinks} />
    )
};


export default Page;