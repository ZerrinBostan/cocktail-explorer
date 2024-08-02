"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  addToBasket,
  decreaseQuantity,
  increaseQuantity,
} from "@/lib/cocktail/cocktailSlice";
import Button from "@/ui/Button";

const CocktailDetail = () => {
  const [cocktail, setCocktail] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const cocktailName = params.name;
  const basketItems = useSelector((state) => state.cocktail.basket);

  const currentItem = basketItems.find(
    (item) => item.strDrink === cocktailName
  );
  const [quantity, setQuantity] = useState(currentItem ? currentItem.quantity : 1);

  useEffect(() => {
    if (cocktailName) {
      fetchCocktailDetails(cocktailName);
    }
  }, [cocktailName]);

  useEffect(() => {
    if (currentItem) {
      setQuantity(currentItem.quantity);
    }
  }, [currentItem]);

  const fetchCocktailDetails = async (name) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      );
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        setCocktail(data.drinks[0]);
      }
    } catch (error) {
      console.error("Error fetching cocktail details:", error);
    }
  };

  const handleAddToBasket = (cocktail) => {
    if (currentItem) {
      dispatch(increaseQuantity(cocktail));
    } else {
      dispatch(addToBasket({ ...cocktail, quantity: quantity }));
    }
  };

  const handleIncreaseQuantity = () => {
    if (currentItem) {
      dispatch(increaseQuantity(currentItem));
    } else {
      dispatch(addToBasket({ ...cocktail, quantity: 1 }));
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      if (currentItem) {
        dispatch(decreaseQuantity(currentItem));
      }
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleBackToProducts = () => {
    router.back();
  };

  const truncateInstructions = (text) => {
    const maxLength = 200;
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (!cocktail) {
    return <p>Loading...</p>;
  }

  return (
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto flex flex-col md:flex-row">
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
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDecreaseQuantity}
                  className="text-red-500 hover:text-red-700"
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="text-green-500 hover:text-green-700"
                >
                  +
                </button>
              </div>
              <button
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                onClick={handleBackToProducts}
              >
                &larr; Turn back
              </button>
            </div>
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
          <Button
            text="Sepete Ekle"
            size="medium"
            className="mt-4"
            onClick={() => handleAddToBasket(cocktail)}
          />
        </div>
      </div>
  );
};

export default CocktailDetail;
