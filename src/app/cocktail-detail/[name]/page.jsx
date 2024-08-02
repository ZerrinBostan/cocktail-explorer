'use client';

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
import { getCocktailDetails } from "@/services/cocktailService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from "react-responsive";

const CocktailDetail = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    const fetchCocktailDetailsData = async () => {
      try {
        if (cocktailName) {
          const cocktailData = await getCocktailDetails(cocktailName);
          setCocktail(cocktailData);
        }
      } catch (error) {
        console.error("Error fetching cocktail details:", error);
      }
    };

    fetchCocktailDetailsData();
  }, [cocktailName]);

  useEffect(() => {
    if (currentItem) {
      setQuantity(currentItem.quantity);
    }
  }, [currentItem]);

  const handleAddToBasket = (cocktail) => {
    const positionType = isMobile === true ? 'bottom-center': 'bottom-right' 

    if (currentItem) {
      dispatch(increaseQuantity(currentItem));
    } else {
      dispatch(addToBasket({ ...cocktail, quantity: quantity }));
    }

    toast.success(`${cocktail.strDrink} has been added to your basket!`, {
      position: positionType,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'toast-custom',
    });
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
          <div className="flex justify-end items-center mb-4">
       
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
          text="Add to Basket"
          size="medium"
          className="mt-4 text-white"
          onClick={() => handleAddToBasket(cocktail)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CocktailDetail;
