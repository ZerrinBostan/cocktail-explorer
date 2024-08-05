import { getCocktailDetails } from '@/services/cocktailService';
import BackButton from '@/ui/BackButton';
import CocktailAddToCard from '@/ui/CocktailAddToCard';
import Image from 'next/image';

const CocktailDetailPage = async ({ params }) => {
  const cocktailName = decodeURIComponent(params.name);

  let cocktail = await getCocktailDetails(cocktailName);


  if (!cocktail) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full mx-auto flex flex-col md:flex-row xs:mx-5">
        <div className="md:w-1/2 p-10">
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
             <BackButton />

              <h2 className="text-2xl font-bold md:order-1">{cocktail.strDrink}</h2>
            </div>

            <p className="text-gray-600 mt-2">
              {truncateInstructions(cocktail.strInstructions)}
            </p>
            <div className="mt-4">
              <span className="font-semibold text-gray-700">
                Glass: {cocktail.strGlass}
              </span>
              <span className="ml-4 font-semibold text-gray-700">
                Category: {cocktail.strCategory}
              </span>
            </div>
          </div>
          <CocktailAddToCard cocktail={cocktail} />
        </div>
      </div>
    </>
  );
};

export default CocktailDetailPage;


const truncateInstructions = (text) => {
  const maxLength = 200;
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};