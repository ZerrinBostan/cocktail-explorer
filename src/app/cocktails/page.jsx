"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Card from "@/ui/Card";
import { addToBasket } from "../../lib/cocktail/cocktailSlice";

const Cocktails = () => {
  const dispatch = useDispatch();
  const [cocktails, setCocktails] = useState([]);
  const searchQuery = useSelector((state) => state.cocktail.searchQuery);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRandomCocktails = async () => {
    try {
      setLoading(true);
      const promises = Array.from({ length: 10 }, () =>
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
          (response) => response.json()
        )
      );

      const results = await Promise.all(promises);
      const drinks = results.map((result) => result.drinks[0]);

      setCocktails(drinks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching random cocktails:", error);
      setCocktails([]);
      setLoading(false);
    }
  };

  const fetchCocktailsBySearch = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cocktails by search:", error);
      setCocktails([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchCocktailsBySearch(searchQuery);
    } else {
      fetchRandomCocktails();
    }
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
        <p className="text-xl font-bold text-indigo mb-11">Yükleniyor...</p>
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
              Kokteyl bulunamadı
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
