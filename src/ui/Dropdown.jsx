import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  removeFromBasket,
  increaseQuantity,
  decreaseQuantity,
} from '@/lib/cocktail/cocktailSlice';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const basketItems = useSelector((state) => state.cocktail.basket);

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleRemoveFromBasket = (item) => {
    dispatch(removeFromBasket(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleRedirectToSavedCocktails = () => {
    router.push('/saved-cocktails');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex flex-row cursor-pointer truncate p-2 px-4 rounded"
            onClick={toggleDropdown}
          >
            <div className="flex flex-row-reverse ml-2 w-full">
              <div className="relative">
                <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
                  {basketItems.reduce((total, item) => total + item.quantity, 0)}
                </div>
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
                  className="feather feather-shopping-cart w-6 h-6 mt-2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="absolute right-44 w-full mt-2 rounded-b border-t-0 z-10 bg-white shadow-xl">
              <div className="w-64">
                <div className="max-h-80 overflow-y-auto">
                  {basketItems.length > 0 ? (
                    basketItems.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                      >
                        <div className="p-2 w-12">
                          <Image
                            src={item.strDrinkThumb}
                            alt={item.strDrink}
                            width={40}
                            height={40}
                            className="rounded w-10 h-10 object-cover"
                          />
                        </div>
                        <div className="flex-auto text-sm w-32">
                          <div className="font-bold">{item.strDrink}</div>
                          <div className="truncate text-gray-600">
                            {item.strGlass} - {item.strCategory}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2 text-gray-400">
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
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm p-4 bg-white">
                      Your cart is empty
                    </p>
                  )}
                </div>

                {basketItems.length > 0 && (
                  <div className="p-4 justify-center flex bg-white">
                    <Button
                      text="Saved Cocktails"
                      size="small"
                      className="text-black bg-teal-100 hover:bg-teal-700 hover:text-teal-100 border-teal-600"
                      onClick={handleRedirectToSavedCocktails}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
