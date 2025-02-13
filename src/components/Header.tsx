"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Navigation from "./Navigation";
import { HeartIcon, Package2Icon, ShoppingCartIcon } from "@/constants/icons";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-950 ">
      <div className="container flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link className="flex items-center gap-2" href="/">
            <Package2Icon className="h-6 w-6" />
            <span className="text-lg font-semibold">Acme Store</span>
          </Link>
          <Navigation />
        </div>
        <div className="flex items-center gap-10">
          <div>
            <HeartIcon className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </div>
          <Link href="/cart">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
