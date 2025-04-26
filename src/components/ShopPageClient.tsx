"use client";

import { useState, useEffect } from "react";
import FiltersClient from "./FiltersClient";
import ProductsClient from "./ProductsClient";
import Breadcrumb from "./Breadcrumb";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { useRouter } from "next/navigation";

interface ShopPageClientProps {
  categories: any[];
  sizeAttribute: any;
  colorAttribute: any;
  minPrice: number;
  maxPrice: number;
  products: any[];
  totalPages: number;
  currentPage: number;
  searchParams: { [key: string]: string | string[] | undefined };
  totalCount: number;
  currentCategories: string[];
  currentSizes: string[];
  currentColors: string[];
  currentMinPrice?: number;
  currentMaxPrice?: number;
}

export default function ShopPageClient({
  categories,
  sizeAttribute,
  colorAttribute,
  minPrice,
  maxPrice,
  products,
  totalPages,
  currentPage,
  searchParams,
  totalCount,
  currentCategories,
  currentSizes,
  currentColors,
  currentMinPrice,
  currentMaxPrice,
}: ShopPageClientProps) {
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    categories: currentCategories,
    sizes: currentSizes,
    colors: currentColors,
    minPrice: currentMinPrice,
    maxPrice: currentMaxPrice,
  });

  // Update temp filters when current filters change
  useEffect(() => {
    setTempFilters({
      categories: currentCategories,
      sizes: currentSizes,
      colors: currentColors,
      minPrice: currentMinPrice,
      maxPrice: currentMaxPrice,
    });
  }, [currentCategories, currentSizes, currentColors, currentMinPrice, currentMaxPrice]);

  // Handle applying filters
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    
    // Update categories
    if (tempFilters.categories.length > 0) {
      params.set("categories", tempFilters.categories.join(","));
    } else {
      params.delete("categories");
    }

    // Update sizes
    if (tempFilters.sizes.length > 0) {
      params.set("size", tempFilters.sizes.join(","));
    } else {
      params.delete("size");
    }

    // Update colors
    if (tempFilters.colors.length > 0) {
      params.set("color", tempFilters.colors.join(","));
    } else {
      params.delete("color");
    }

    // Update price range
    if (tempFilters.minPrice !== undefined) {
      params.set("minPrice", tempFilters.minPrice.toString());
    } else {
      params.delete("minPrice");
    }
    if (tempFilters.maxPrice !== undefined) {
      params.set("maxPrice", tempFilters.maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    // Update URL
    router.push(`?${params.toString()}`);
    setIsMobileFilterOpen(false);
  };

  return (
    <div className="grid gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Browse our full range of products.
        </p>
      </div>
      <div className="grid lg:grid-cols-[280px_1fr] gap-6 xl:gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <FiltersClient
            categories={categories}
            sizeAttribute={sizeAttribute}
            colorAttribute={colorAttribute}
            minPrice={minPrice}
            maxPrice={maxPrice}
            currentCategories={currentCategories}
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
            currentCategories={currentCategories}
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
            categories: currentCategories,
            sizes: currentSizes,
            colors: currentColors,
            minPrice: currentMinPrice,
            maxPrice: currentMaxPrice,
          });
        }}
        onApply={handleApplyFilters}
        categories={categories}
        sizeAttribute={sizeAttribute}
        colorAttribute={colorAttribute}
        minPrice={minPrice}
        maxPrice={maxPrice}
        currentCategories={tempFilters.categories}
        currentSizes={tempFilters.sizes}
        currentColors={tempFilters.colors}
        currentMinPrice={tempFilters.minPrice}
        currentMaxPrice={tempFilters.maxPrice}
      />
    </div>
  );
} 