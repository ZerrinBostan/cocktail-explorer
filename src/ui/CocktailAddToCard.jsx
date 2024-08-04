'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  increaseQuantity,
} from "@/lib/cocktail/cocktailSlice";
import Button from "@/ui/Button";
import { toast } from 'react-toastify';
import { useMediaQuery } from "react-responsive";

const CocktailAddToCard = ({ cocktail }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => state.cocktail.basket);

  const currentItem = basketItems.find(
    (item) => item.strDrink === cocktail.strDrink
  );

  const [quantity, setQuantity] = useState(currentItem ? currentItem.quantity : 1);

  useEffect(() => {
    if (currentItem) {
      setQuantity(currentItem.quantity);
    }
  }, [currentItem]);

  const handleAddToBasket = (cocktail) => {
    const positionType = isMobile ? 'bottom-center' : 'bottom-right';

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

  return (
    <Button
      text="Add to Basket"
      size="medium"
      className="mt-4 text-white"
      onClick={() => handleAddToBasket(cocktail)}
    />
  );
};

export default CocktailAddToCard;
