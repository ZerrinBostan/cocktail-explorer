'use client'
import { addToBasket } from "@/lib/cocktail/cocktailSlice";
import { getCocktailsBySearch } from "@/services/cocktailService";
import Card from "@/ui/Card";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";

const CocktailsList = ({ drinks }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchQuery = useSelector((state) => state.cocktail.searchQuery);

    useEffect(() => {
        const fetchCocktails = async () => {
            setLoading(true);
            try {
                const drinks = await getCocktailsBySearch(searchQuery)

                setCocktails(drinks || []);
            } catch (error) {
                console.error('Error fetching cocktails:', error);
                setCocktails([]);
            }
            setLoading(false);
        };

        fetchCocktails();
    }, [searchQuery]);

    const handleAddToBasket = (cocktail) => {
        const positionType = isMobile === true ? 'bottom-center': 'bottom-right' 
        dispatch(addToBasket(cocktail));
        
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
    
      const handleCardClick = (drinkName) => {
        router.push(`/cocktail-detail/${encodeURIComponent(drinkName)}`);
      };

    const isCocktails = cocktails.length > 0;

    return (
        <>
            {loading && (
                <p className="text-lg sm:text-xl font-bold text-indigo mb-4 sm:mb-11">
                    Loading...
                </p>
            )}
            {!loading && !searchQuery && isCocktails && (
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-11 text-indigo">
                    List Most Latest Cocktails
                </h2>
            )}
            {!loading && !isCocktails && (
                <div>
                    <div className="flex items-center justify-start">
                        <p className="text-base sm:text-lg font-bold text-gray-800 p-2 sm:p-4 rounded-md">
                            No cocktail found
                        </p>
                    </div>
                </div>
            )}
            {!loading && (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:space-y-0 md:px-4">
                    {cocktails.map((item, index) => (
                        <Card
                            key={index}
                            title={item.strDrink}
                            imgSrc={item.strDrinkThumb}
                            description={item.strInstructions}
                            glass={item.strGlass}
                            category={item.strCategory}
                            onAddToBasket={() => handleAddToBasket(item)}
                            onClick={() => handleCardClick(item.strDrink)}
                        />))}
                </div>
            )}
        </>
    )
}
export default CocktailsList;