import Image from "next/image";
import { getCocktailDetails } from "@/services/cocktailService";

const CocktailDetailServer = async ({ cocktailName }) => {
  let cocktail = null;

  try {
    if (cocktailName) {
      cocktail = await getCocktailDetails(cocktailName);
    }
  } catch (error) {
    console.error("Error fetching cocktail details:", error);
  }

  if (!cocktail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full mx-auto flex flex-col md:flex-row">
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
          <h2 className="text-2xl font-bold text-gray-800">
            {cocktail.strDrink}
          </h2>
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
      </div>
    </div>
  );
};

const truncateInstructions = (text) => {
  const maxLength = 200;
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default CocktailDetailServer;
