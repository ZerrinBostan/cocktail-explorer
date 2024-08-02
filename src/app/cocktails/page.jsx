'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addToBasket } from '../../lib/cocktail/cocktailSlice';
import {
  getRandomCocktails,
  getCocktailsBySearch,
} from '@/services/cocktailService';
import Card from '@/ui/Card';

const Cocktails = () => {
  const dispatch = useDispatch();
  const [cocktails, setCocktails] = useState([]);
  const searchQuery = useSelector((state) => state.cocktail.searchQuery);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        const drinks = searchQuery
          ? await getCocktailsBySearch(searchQuery)
          : await getRandomCocktails();
        setCocktails(drinks || []);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
        setCocktails([]);
      }
      setLoading(false);
    };

    fetchCocktails();
  }, [searchQuery]);

  const isCocktails = cocktails.length > 0;

  const handleAddToBasket = (cocktail) => {
    dispatch(addToBasket(cocktail));
  };

  const handleCardClick = (drinkName) => {
    router.push(`/cocktail-detail/${encodeURIComponent(drinkName)}`);
  };

  return (
    <>
      {loading && (
        <p className="text-xl font-bold text-indigo mb-11">Loading...</p>
      )}

      {!loading && !searchQuery && isCocktails && (
        <h2 className="text-2xl font-bold mb-11 text-indigo">
          List Most Latest Cocktails
        </h2>
      )}

      {!loading && !isCocktails && (
        <div>
          <div className="flex items-center justify-start">
            <p className="text-lg font-bold text-gray-800 p-4 rounded-md">
              No cocktail found
            </p>
          </div>
        </div>
      )}

      {!loading && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:space-y-0 md:px-4">
          {isCocktails &&
            cocktails.map((item, index) => (
              <Card
                key={index}
                title={item.strDrink}
                imgSrc={item.strDrinkThumb}
                description={item.strInstructions}
                glass={item.strGlass}
                category={item.strCategory}
                onAddToBasket={() => handleAddToBasket(item)}
                onClick={() => handleCardClick(item.strDrink)}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Cocktails;
