"use client";

import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { GET_PRODUCT_CATEGORIES } from "@/apollo/queries/getProductCategories";
import { GET_PRODUCT_ATTRIBUTES } from "@/apollo/queries/getProductAttributes";
import { GET_PRODUCTS } from "@/apollo/queries/getProducts";
import { GET_MIN_MAX_PRICE } from "@/apollo/queries/getMinMaxPrice";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Shop() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const productsPerPage = 9;

  // Get filter values from URL (if any)
  const urlCategories = searchParams.get("category")
    ? searchParams.get("category")!.split(",")
    : [];
  const urlSizes = searchParams.get("size")
    ? searchParams.get("size")!.split(",")
    : [];
  const urlColors = searchParams.get("color")
    ? searchParams.get("color")!.split(",")
    : [];
  const urlMinPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const urlMaxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const urlSort = searchParams.get("sort") || ""; // e.g., "priceHighToLow", "priceLowToHigh", "customerRating"

  // Map sort value to the orderby variable expected by the backend.
  const getOrderbyValue = (sort: string) => {
    switch (sort) {
      case "priceHighToLow":
        return [{ field: "PRICE", order: "DESC" }];
      case "priceLowToHigh":
        return [{ field: "PRICE", order: "ASC" }];
      case "customerRating":
        return [{ field: "RATING", order: "DESC" }];
      default:
        // Default sort order
        return [
          { field: "RATING", order: "ASC" },
          { field: "PRICE", order: "ASC" },
        ];
    }
  };

  const orderby = getOrderbyValue(urlSort);

  const [products, setProducts] = useState<any[]>([]);
  const [pageCursors, setPageCursors] = useState<{
    [page: number]: string | null;
  }>({ 1: null });
  const [hasNextPage, setHasNextPage] = useState(false);
  const [globalTotalCount, setGlobalTotalCount] = useState<number | null>(null);

  const afterCursor = pageCursors[currentPage] ?? null;

  // Query min/max price, categories, and attributes
  const { data: minMaxPrice } = useQuery(GET_MIN_MAX_PRICE);
  const { data: productCategories } = useQuery(GET_PRODUCT_CATEGORIES);
  const { data: productAttributes } = useQuery(GET_PRODUCT_ATTRIBUTES);
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      first: productsPerPage,
      after: afterCursor,
      categories: urlCategories.length > 0 ? urlCategories : undefined,
      sizes: urlSizes.length > 0 ? urlSizes : undefined,
      colors: urlColors.length > 0 ? urlColors : undefined,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      orderby,
    },
  });

  useEffect(() => {
    if (data) {
      const fetchedProducts = data.products.edges.map((edge: any) => edge.node);
      setProducts(fetchedProducts);
      setHasNextPage(data.products.pageInfo.hasNextPage);

      setPageCursors((prev) => {
        if (prev[currentPage + 1] !== data.products.pageInfo.endCursor) {
          return {
            ...prev,
            [currentPage + 1]: data.products.pageInfo.endCursor,
          };
        }
        return prev;
      });

      if (data.products.found != null) {
        setGlobalTotalCount(data.products.found);
      }
    }
  }, [data, currentPage, productsPerPage]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      router.push(`/shop?page=${page}`);
    }
  };

  // Helper: update a URL query parameter and reset page to 1.
  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  const handleCategoryChange = (slug: string, checked: boolean) => {
    const currentCategories = searchParams.get("category")
      ? searchParams.get("category")!.split(",").filter(Boolean)
      : [];
    const newCategories = checked
      ? [...currentCategories, slug]
      : currentCategories.filter((c) => c !== slug);
    updateQueryParam("category", newCategories.join(",") || null);
  };

  const handleSizeChange = (slug: string, checked: boolean) => {
    const currentSizes = searchParams.get("size")
      ? searchParams.get("size")!.split(",").filter(Boolean)
      : [];
    const newSizes = checked
      ? [...currentSizes, slug]
      : currentSizes.filter((s) => s !== slug);
    updateQueryParam("size", newSizes.join(",") || null);
  };

  const handleColorChange = (slug: string, checked: boolean) => {
    const currentColors = searchParams.get("color")
      ? searchParams.get("color")!.split(",").filter(Boolean)
      : [];
    const newColors = checked
      ? [...currentColors, slug]
      : currentColors.filter((c) => c !== slug);
    updateQueryParam("color", newColors.join(",") || null);
  };

  const handlePriceChange = (newMin: number, newMax: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("minPrice", newMin.toString());
    params.set("maxPrice", newMax.toString());
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    updateQueryParam("sort", value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  const totalPages = globalTotalCount
    ? Math.ceil(globalTotalCount / productsPerPage)
    : 1;

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
        </div>
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="mt-4 space-y-4">
              {/* Price Range Filter */}
              <div>
                <h4 className="text-base font-medium">Price Range</h4>
                <div className="mt-2">
                  <PriceRangeSlider
                    min={Number(minMaxPrice?.minPrice.nodes[0].price) || 0}
                    max={Number(minMaxPrice?.maxPrice.nodes[0].price) || 100}
                    initialMin={
                      urlMinPrice !== undefined
                        ? urlMinPrice
                        : Number(minMaxPrice?.minPrice.nodes[0].price) || 0
                    }
                    initialMax={
                      urlMaxPrice !== undefined
                        ? urlMaxPrice
                        : Number(minMaxPrice?.maxPrice.nodes[0].price) || 100
                    }
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold">Categories</h3>
                <div className="mt-4 space-y-2">
                  {productCategories?.productCategories.nodes.map(
                    (item: any) => {
                      const isChecked = searchParams
                        .get("category")
                        ?.split(",")
                        .includes(item.name);
                      return (
                        <div className="flex items-center" key={item.id}>
                          <Checkbox
                            id={item.slug}
                            checked={isChecked}
                            onCheckedChange={(checked: boolean) =>
                              handleCategoryChange(item.name, checked)
                            }
                          />
                          <Label className="ml-3" htmlFor={item.slug}>
                            {item.name}
                            {item.count > 0 && (
                              <span className="text-xs">({item.count})</span>
                            )}
                          </Label>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {/* Size Filter */}
              <div>
                <h3 className="text-lg font-semibold">Sizes</h3>
                <div className="mt-4 space-y-2">
                  {productAttributes?.allPaSize.nodes.map((item: any) => {
                    const isChecked = searchParams
                      .get("size")
                      ?.split(",")
                      .includes(item.name);
                    return (
                      <div className="flex items-center" key={item.id}>
                        <Checkbox
                          id={item.slug}
                          checked={isChecked}
                          onCheckedChange={(checked: boolean) =>
                            handleSizeChange(item.name, checked)
                          }
                        />
                        <Label className="ml-3" htmlFor={item.slug}>
                          {item.name}
                          {item.count > 0 && (
                            <span className="text-xs">({item.count})</span>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Colors Filter */}
              <div>
                <h3 className="text-lg font-semibold">Colors</h3>
                <div className="mt-4 space-y-2">
                  {productAttributes?.allPaColor.nodes.map((item: any) => {
                    const isChecked = searchParams
                      .get("color")
                      ?.split(",")
                      .includes(item.name);
                    return (
                      <div className="flex items-center" key={item.id}>
                        <Checkbox
                          id={item.slug}
                          checked={isChecked}
                          onCheckedChange={(checked: boolean) =>
                            handleColorChange(item.name, checked)
                          }
                        />
                        <Label className="ml-3" htmlFor={item.slug}>
                          {item.name}
                          {item.count > 0 && (
                            <span className="text-xs">({item.count})</span>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div>
            <div className="flex items-center justify-end mb-4 gap-4">
              {/* Active Filters Display */}
              {(urlCategories.length > 0 ||
                urlSizes.length > 0 ||
                urlColors.length > 0 ||
                urlMinPrice !== undefined ||
                urlMaxPrice !== undefined) && (
                <div className="flex flex-wrap gap-2 items-center grow">
                  <h4 className="text-base font-semibold">Filter:</h4>
                  {urlCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                    >
                      <span>{category}</span>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange(category, false)}
                        className="ml-1 text-xs font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
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
                        &times;
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
                        &times;
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
                        onClick={() =>
                          handlePriceChange(
                            0,
                            Number(minMaxPrice?.maxPrice.nodes[0].price) || 100
                          )
                        }
                        className="ml-1 text-xs font-bold"
                      >
                        &times;
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
                    <SelectItem value="priceHighToLow">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="priceLowToHigh">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="customerRating">
                      Customer Rating
                    </SelectItem>
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
                  excerpt={product.shortDescription}
                  slug={product.slug}
                  price={product.price}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                hasNextPage={hasNextPage}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading Suspense...</div>}>
      <Shop />
    </Suspense>
  );
}
