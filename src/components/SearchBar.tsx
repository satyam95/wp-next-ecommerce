"use client";

import React, { useState, useCallback, Suspense } from "react";
import { Input } from "./ui/input"; 
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!searchQuery.trim()) return;

      const encodedSearchQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/search?q=${encodedSearchQuery}`);
    },
    [searchQuery, router]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-md xl:mx-4">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 rounded-md border focus:ring-2 focus:ring-primary transition-all [appearance:textfield] [&::-webkit-search-cancel-button]:hidden"
          aria-label="Search products"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
    </div>
  );
};


export default function SearchBar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchForm />
    </Suspense>
  );
}