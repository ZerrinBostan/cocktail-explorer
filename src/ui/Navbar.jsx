"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import Button from "./Button";
import Link from "next/link";
import Input from "./Input";
import Image from "next/image";
import { setSearchQuery } from "../lib/cocktail/cocktailSlice";
import Dropdown from "./Dropdown";
import { useMediaQuery } from "react-responsive";
import { logout } from "@/app/auth/authControl";


const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceDispatch = debounce((value) => {
    dispatch(setSearchQuery(value));
  }, 2000);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    debounceDispatch(value);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" href="/">
              <Image
                className="h-7 w-auto"
                src="https://cdn-icons-png.flaticon.com/512/5873/5873604.png"
                alt="Cocktails Explorer"
                width={28}
                height={28}
                priority={true}
              />
              {!isMobile && <p>Cocktails Explorer</p>}
            </Link>
          </div>

          <Input
            id="search"
            showLabel={false}
            name="search"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            error={false}
            className="cocktail-search lg:w-96"
          />

          <div className="flex items-center justify-end gap-3">
            <Dropdown />
            <button
              onClick={async () => {
                await logout();
              }}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Çıkış Yap"
            >
              <FiLogOut size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
