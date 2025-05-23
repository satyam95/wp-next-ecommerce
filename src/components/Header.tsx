"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Navigation from "./Navigation";
import { Package2Icon, ShoppingCartIcon } from "@/constants/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/sessionSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchBar from "./SearchBar";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.session);
  const { contents } = useAppSelector((state) => state.cart);
  const isLoggedIn = !!customer;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link className="flex items-center gap-2" href="/">
              <Package2Icon className="h-6 w-6" />
              <span className="text-lg font-semibold">Store</span>
            </Link>
            <Navigation />
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <Link href="/cart" className="relative inline-flex items-center">
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {contents.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {contents.itemCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src="/01.png" alt="User" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {customer.username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center justify-between cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
        <div className="block mt-2 md:mt-0 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};
