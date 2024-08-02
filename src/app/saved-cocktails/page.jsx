"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromBasket,
  toggleConfetti,
} from "@/lib/cocktail/cocktailSlice";
import Button from "@/ui/Button";

const SavedCocktails = () => {
  const basketItems = useSelector((state) => state.cocktail.basket);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveFromBasket = (item) => {
    dispatch(removeFromBasket(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleBackToProducts = () => {
    router.push("/cocktails");
  };

  const handlePayment = () => {
    dispatch(toggleConfetti(true));
  };

  return (
    <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <button
          className="text-indigo-600 hover:text-indigo-500 font-medium mb-2 md:mb-0 md:order-2 md:ml-4"
          onClick={handleBackToProducts}
        >
          &larr; Turn back
        </button>

        <h2 className="text-2xl font-bold md:order-1">Saved Cocktails</h2>
      </div>

      {basketItems.length > 0 ? (
        <div className="space-y-4">
          {basketItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 rounded-lg p-4"
            >
              <div className="flex flex-col sm:flex-row items-center space-x-4">
                <Image
                  src={item.strDrinkThumb}
                  alt={item.strDrink}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div className="mt-2 sm:mt-0 text-center sm:text-left">
                  <h3 className="text-lg font-bold">{item.strDrink}</h3>
                  <p className="text-gray-600">
                    {item.strGlass} - {item.strCategory}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400 me-4">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="text-green-500 hover:text-green-700"
                    >
                      +
                    </button>
                  </div>
                  <div
                    className="w-4 h-4 hover:bg-red-200 rounded-full cursor-pointer text-red-700"
                    onClick={() => handleRemoveFromBasket(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash-2"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <Button
              text="Continue to Payment"
              className="text-black bg-teal-100 hover:bg-teal-700 hover:text-teal-100 border-teal-600"
              onClick={handlePayment}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is empty</p>
      )}
    </div>
  );
};

export default SavedCocktails;
