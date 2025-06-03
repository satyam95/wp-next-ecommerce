"use client";

import { useEffect, useState } from "react";
import FiltersClient from "./FiltersClient";
import ProductsClient from "./ProductsClient";
import { ProductsGridSkeleton } from "./skeleton/ProductsGridSkeleton";
import { FiltersSkeleton } from "./skeleton/FiltersSkeleton";
import Breadcrumb from "./Breadcrumb";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryPageClientProps {
  categoryNode: any;
  products: any[];
  totalPages: number;
  currentPage: number;
  searchParams: { [key: string]: string | string[] | undefined };
  totalCount: number;
  sizeAttribute: any;
  colorAttribute: any;
  minPrice: number;
  maxPrice: number;
  currentSizes: string[];
  currentColors: string[];
  currentMinPrice?: number;
  currentMaxPrice?: number;
}

export default function CategoryPageClient({
  categoryNode,
  products,
  totalPages,
  currentPage,
  searchParams,
  totalCount,
  sizeAttribute,
  colorAttribute,
  minPrice,
  maxPrice,
  currentSizes,
  currentColors,
  currentMinPrice,
  currentMaxPrice,
}: CategoryPageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    sizes: currentSizes,
    colors: currentColors,
    minPrice: currentMinPrice,
    maxPrice: currentMaxPrice,
  });

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Update temp filters when current filters change
  useEffect(() => {
    setTempFilters({
      sizes: currentSizes,
      colors: currentColors,
      minPrice: currentMinPrice,
      maxPrice: currentMaxPrice,
    });
  }, [currentSizes, currentColors, currentMinPrice, currentMaxPrice]);

  if (isLoading) {
    return (
      <div className="grid gap-8">
        <div className="text-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mt-2" />
        </div>
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <FiltersSkeleton />
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <ProductsGridSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {categoryNode.name}
        </h1>
        <p className="text-gray-500 mt-2">
          {categoryNode.description}
        </p>
      </div>
      <div className="grid lg:grid-cols-[200px_1fr] xl:grid-cols-[280px_1fr] gap-6 xl:gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <FiltersClient
            sizeAttribute={sizeAttribute}
            colorAttribute={colorAttribute}
            minPrice={minPrice}
            maxPrice={maxPrice}
            currentSizes={currentSizes}
            currentColors={currentColors}
            currentMinPrice={currentMinPrice}
            currentMaxPrice={currentMaxPrice}
          />
        </div>

        <div>
          <div className="mb-4">
            <Breadcrumb />
          </div>
          <ProductsClient
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
            searchParams={searchParams}
            totalCount={totalCount}
            currentSizes={currentSizes}
            currentColors={currentColors}
            currentMinPrice={currentMinPrice}
            currentMaxPrice={currentMaxPrice}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => {
          setIsMobileFilterOpen(false);
          // Reset temp filters when closing without applying
          setTempFilters({
            sizes: currentSizes,
            colors: currentColors,
            minPrice: currentMinPrice,
            maxPrice: currentMaxPrice,
          });
        }}
        onApply={() => {
          // Apply the temp filters here
          // You'll need to implement the logic to update the URL with the new filters
          setIsMobileFilterOpen(false);
        }}
        sizeAttribute={sizeAttribute}
        colorAttribute={colorAttribute}
        minPrice={minPrice}
        maxPrice={maxPrice}
        currentSizes={tempFilters.sizes}
        currentColors={tempFilters.colors}
        currentMinPrice={tempFilters.minPrice}
        currentMaxPrice={tempFilters.maxPrice}
      />
    </div>
  );
} 