import CocktailDetailServer from './CocktailDetailServer';
import CocktailDetailClient from './CocktailDetailClient';

const CocktailDetailPage = async ({ params }) => {
  const cocktailName = decodeURIComponent(params.name);

  return (
    <div>
      <CocktailDetailServer cocktailName={cocktailName} />
      
      <CocktailDetailClient cocktail={cocktailName} />
    </div>
  );
};

export default CocktailDetailPage;
