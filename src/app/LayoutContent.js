"use client";

import Navbar from "@/ui/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { useEffect } from "react";
import { toggleConfetti } from "@/lib/cocktail/cocktailSlice";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LayoutContent = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const showConfetti = useSelector((state) => state.cocktail.showConfetti);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        dispatch(toggleConfetti(false));
      }, 3000);
    }
  }, [showConfetti, dispatch]);

  const defaultLayoutStyle = 'flex flex-col items-center justify-center from-red-300 to-yellow-200 py-36 px-10 md:px-0 lg:px-0'
  const userSessionLayout = isLoginPage === false ? 'bg-gradient-to-tr min-h-screen' : 'h-full';

  return (
    <>
      <main>
        {isLoginPage === false && <Navbar />}

        <div className={`${defaultLayoutStyle} ${userSessionLayout}`}>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={isMobile ? 100 : 300}
              recycle={false}
              gravity={isMobile ? 0.05 : 0.1}
              wind={isMobile ? 0.01 : 0.02}
            />
          )}
          {children}
        </div>
        <ToastContainer
          toastClassName="bg-gray-800 text-white text-sm sm:text-base p-2 sm:p-4 rounded-md shadow-lg toast-custom"
          bodyClassName="flex items-center"
          position="bottom-center"
        />
      </main>
    </>
  );
};

export default LayoutContent;
