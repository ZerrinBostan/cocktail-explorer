"use client";

import Navbar from "@/ui/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { toggleConfetti } from "@/lib/cocktail/cocktailSlice";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import Login from "./page";

const ClientSideAuth = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const showConfetti = useSelector((state) => state.cocktail.showConfetti);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated && pathname === "/login") {
      router.push("/cocktails");
    } else if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }

    setAuthChecked(true);
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        dispatch(toggleConfetti(false));
      }, 3000);
    }
  }, [showConfetti, dispatch]);

  if (!authChecked) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main>
        {isAuthenticated ? (
          <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-red-300 to-yellow-200 min-h-screen py-36 px-10 md:px-0 lg:px-0">
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
        ) : (
          <div>
            <Login />
          </div>
        )}
      </main>
    </>
  );
};

export default ClientSideAuth;
