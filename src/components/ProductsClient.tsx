"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ProductsClientProps {
  products: any[];
  totalPages: number;
  currentPage: number;
  searchParams: { [key: string]: string | string[] | undefined };
  totalCount: number;
  currentCategories?: string[]; // Optional for category page
  currentSizes: string[];
  currentColors: string[];
  currentMinPrice?: number;
  currentMaxPrice?: number;
  onOpenMobileFilter: () => void;
}

export default function ProductsClient({
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
  onOpenMobileFilter,
}: ProductsClientProps) {
  const router = useRouter();

  // Convert searchParams to URLSearchParams
  const urlSearchParams = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, value);
      }
    });
    return params;
  }, [searchParams]);

  // Helper to update URL query parameters
  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(urlSearchParams);
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    params.set("page", "1"); // Reset to page 1 when filters change
    router.push(`?${params.toString()}`);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    updateQueryParam("sort", value);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      const params = new URLSearchParams(urlSearchParams);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  // Handle category filter removal
  const handleCategoryRemove = (category: string) => {
    if (currentCategories) {
      const newCategories = currentCategories.filter((c) => c !== category);
      updateQueryParam("categories", newCategories.join(",") || null);
    }
  };

  // Handle size filter removal
  const handleSizeRemove = (size: string) => {
    const newSizes = currentSizes.filter((s) => s !== size);
    updateQueryParam("size", newSizes.join(",") || null);
  };

  // Handle color filter removal
  const handleColorRemove = (color: string) => {
    const newColors = currentColors.filter((c) => c !== color);
    updateQueryParam("color", newColors.join(",") || null);
  };

  // Handle price filter reset
  const handlePriceReset = () => {
    const params = new URLSearchParams(urlSearchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  // Extract current filter values
  const urlSort = typeof searchParams.sort === "string" ? searchParams.sort : "";

  return (
    <div>
      {/* Top Bar with Filter and Sort */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2 lg:hidden"
            onClick={onOpenMobileFilter}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="ml-auto">
            <Select onValueChange={handleSortChange} value={urlSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="customerRating">Customer Rating</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {((currentCategories ?? []).length > 0 ||
          currentSizes.length > 0 ||
          currentColors.length > 0 ||
          currentMinPrice !== undefined ||
          currentMaxPrice !== undefined) && (
          <div className="flex flex-wrap gap-2 items-center">
            <h4 className="text-base font-semibold">Active filters:</h4>
            {currentCategories && currentCategories.map((category) => (
              <div
                key={category}
                className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                <span>{category}</span>
                <button
                  type="button"
                  onClick={() => handleCategoryRemove(category)}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            {currentSizes.map((size) => (
              <div
                key={size}
                className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                <span>{size}</span>
                <button
                  type="button"
                  onClick={() => handleSizeRemove(size)}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            {currentColors.map((color) => (
              <div
                key={color}
                className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                <span>{color}</span>
                <button
                  type="button"
                  onClick={() => handleColorRemove(color)}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            {(currentMinPrice !== undefined || currentMaxPrice !== undefined) && (
              <div className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                <span>
                  {currentMinPrice !== undefined ? `$${currentMinPrice}` : "$0"} -{" "}
                  {currentMaxPrice !== undefined ? `$${currentMaxPrice}` : "$100"}
                </span>
                <button
                  type="button"
                  onClick={handlePriceReset}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.name}
            excerpt={product.shortDescription}
            slug={product.slug}
            price={product.price}
            rating={product.averageRating}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNextPage={totalCount > currentPage * 9}
        />
      )}
    </div>
  );
}