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

interface ProductsClientProps {
  products: any[];
  totalPages: number;
  currentPage: number;
  categorySlug: string;
  searchParams: { [key: string]: string | string[] | undefined };
  totalCount: number;
}

export default function ProductsClient({
  products,
  totalPages,
  currentPage,
  categorySlug,
  searchParams,
  totalCount,
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
    router.push(`/category/${categorySlug}?${params.toString()}`);
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
      router.push(`/category/${categorySlug}?${params.toString()}`);
    }
  };

  // Extract current filter values with type safety
  const urlSort = typeof searchParams.sort === "string" ? searchParams.sort : "";
  const urlSizes = Array.isArray(searchParams.size)
    ? searchParams.size
    : typeof searchParams.size === "string"
    ? [searchParams.size]
    : [];
  const urlColors = Array.isArray(searchParams.color)
    ? searchParams.color
    : typeof searchParams.color === "string"
    ? [searchParams.color]
    : [];
  const urlMinPrice =
    typeof searchParams.minPrice === "string" ? Number(searchParams.minPrice) : undefined;
  const urlMaxPrice =
    typeof searchParams.maxPrice === "string" ? Number(searchParams.maxPrice) : undefined;

  // Handle size filter changes
  const handleSizeChange = (size: string, checked: boolean) => {
    const currentSizes = urlSizes;
    const newSizes = checked
      ? [...currentSizes, size]
      : currentSizes.filter((s) => s !== size);
    updateQueryParam("size", newSizes.join(",") || null);
  };

  // Handle color filter changes
  const handleColorChange = (color: string, checked: boolean) => {
    const currentColors = urlColors;
    const newColors = checked
      ? [...currentColors, color]
      : currentColors.filter((c) => c !== color);
    updateQueryParam("color", newColors.join(",") || null);
  };

  // Handle price filter reset
  const handlePriceReset = () => {
    const params = new URLSearchParams(urlSearchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-4 gap-4">
        {/* Active Filters Display */}
        {(urlSizes.length > 0 ||
          urlColors.length > 0 ||
          urlMinPrice !== undefined ||
          urlMaxPrice !== undefined) && (
          <div className="flex flex-wrap gap-2 items-center grow">
            <h4 className="text-base font-semibold">Filter:</h4>
            {urlSizes.map((size) => (
              <div
                key={size}
                className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                <span>{size}</span>
                <button
                  type="button"
                  onClick={() => handleSizeChange(size, false)}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            {urlColors.map((color) => (
              <div
                key={color}
                className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                <span>{color}</span>
                <button
                  type="button"
                  onClick={() => handleColorChange(color, false)}
                  className="ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            {(urlMinPrice !== undefined || urlMaxPrice !== undefined) && (
              <div className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                <span>
                  {urlMinPrice !== undefined ? `$${urlMinPrice}` : "$0"} -{" "}
                  {urlMaxPrice !== undefined ? `$${urlMaxPrice}` : "$100"}
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
        {/* Sorting Select */}
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
      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.name}
            excerpt={product.excerpt}
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
          hasNextPage={totalCount > currentPage * 9} // Adjust based on your items per page
        />
      )}
    </div>
  );
}