"use client";

import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { GET_PRODUCTS_BY_CATEGORY } from "@/apollo/queries/getProductsByCategory";
import { GET_MIN_MAX_PRICE_BY_CATEGORY } from "@/apollo/queries/getMinMaxPriceByCategory";
import { GET_PRODUCT_ATTRIBUTES_BY_CATEGORY } from "@/apollo/queries/getProductAttributesByCategory";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

function Category({ params }: CategoryPageProps) {
  const categorySlug = params.slug;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Determine current page and products per page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const productsPerPage = 9;

  // Read URL query parameters for filters and sort
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
  const urlSort = searchParams.get("sort") || "";

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
        return [
          { field: "RATING", order: "ASC" },
          { field: "PRICE", order: "ASC" },
        ];
    }
  };
  const orderby = getOrderbyValue(urlSort);

  // State for pagination and products
  const [products, setProducts] = useState<any[]>([]);
  const [pageCursors, setPageCursors] = useState<{ [page: number]: string | null }>(
    { 1: null }
  );
  const [hasNextPage, setHasNextPage] = useState(false);
  const [globalTotalCount, setGlobalTotalCount] = useState<number | null>(null);

  const afterCursor = pageCursors[currentPage] ?? null;

  // Query the minimum and maximum price for this category
  const { data: minMaxData } = useQuery(GET_MIN_MAX_PRICE_BY_CATEGORY, {
    variables: { category1: categorySlug },
  });

  // Query available product attributes (including sizes and colors)
  const { data: attributesData } = useQuery(GET_PRODUCT_ATTRIBUTES_BY_CATEGORY, {
    variables: { id: categorySlug },
  });

  // Query products for this category with pagination, filters, and sorting
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      slug: [categorySlug],
      first: productsPerPage,
      after: afterCursor,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      sizes: urlSizes.length > 0 ? urlSizes : undefined,
      colors: urlColors.length > 0 ? urlColors : undefined,
      orderby,
    },
  });

  useEffect(() => {
    if (data) {
      // Data structure: data.productCategories.edges[0].node contains category info
      const categoryNode = data?.productCategories?.edges[0]?.node;
      if (categoryNode) {
        const fetchedProducts = categoryNode.products.edges.map(
          (edge: any) => edge.node
        );
        setProducts(fetchedProducts);
        setHasNextPage(categoryNode.products.pageInfo.hasNextPage);

        setPageCursors((prev) => {
          if (prev[currentPage + 1] !== categoryNode.products.pageInfo.endCursor) {
            return {
              ...prev,
              [currentPage + 1]: categoryNode.products.pageInfo.endCursor,
            };
          }
          return prev;
        });

        // Use the category's count as the total (adjust if your schema provides a filtered total)
        setGlobalTotalCount(categoryNode.count);
      }
    }
  }, [data, currentPage, productsPerPage]);

  // Helper to update query parameters in the URL (resetting page to 1)
  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    params.set("page", "1");
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  const handleSizeChange = (option: string, checked: boolean) => {
    const currentSizes = searchParams.get("size")
      ? searchParams.get("size")!.split(",").filter(Boolean)
      : [];
    const newSizes = checked
      ? [...currentSizes, option]
      : currentSizes.filter((s) => s !== option);
    updateQueryParam("size", newSizes.join(",") || null);
  };

  const handleColorChange = (option: string, checked: boolean) => {
    const currentColors = searchParams.get("color")
      ? searchParams.get("color")!.split(",").filter(Boolean)
      : [];
    const newColors = checked
      ? [...currentColors, option]
      : currentColors.filter((c) => c !== option);
    updateQueryParam("color", newColors.join(",") || null);
  };

  const handlePriceChange = (newMin: number, newMax: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("minPrice", newMin.toString());
    params.set("maxPrice", newMax.toString());
    params.set("page", "1");
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    updateQueryParam("sort", value);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      router.push(`/category/${categorySlug}?page=${page}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  // Calculate total pages (fall back to 1 if total count is not available)
  const totalPages = globalTotalCount
    ? Math.ceil(globalTotalCount / productsPerPage)
    : 1;

  // Extract category title and description
  const categoryNode = data?.productCategories?.edges[0]?.node;
  const categoryTitle = categoryNode?.name;
  const categoryDescription = categoryNode?.description;

  // Filter attributes for sizes and colors (assuming attribute name contains "size" or "color")
  const sizeAttribute = attributesData?.productCategory?.allAttributes?.find(
    (attr: any) => attr.name.toLowerCase().includes("size")
  );
  const colorAttribute = attributesData?.productCategory?.allAttributes?.find(
    (attr: any) => attr.name.toLowerCase().includes("color")
  );

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{categoryTitle}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {categoryDescription}
          </p>
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
                    min={Number(minMaxData?.minPrice?.nodes[0]?.price) || 0}
                    max={Number(minMaxData?.maxPrice?.nodes[0]?.price) || 100}
                    initialMin={
                      urlMinPrice !== undefined
                        ? urlMinPrice
                        : Number(minMaxData?.minPrice?.nodes[0]?.price) || 0
                    }
                    initialMax={
                      urlMaxPrice !== undefined
                        ? urlMaxPrice
                        : Number(minMaxData?.maxPrice?.nodes[0]?.price) || 100
                    }
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              {/* Size Filter */}
              {sizeAttribute && (
                <div>
                  <h3 className="text-lg font-semibold">Sizes</h3>
                  <div className="mt-4 space-y-2">
                    {sizeAttribute.options.map((option: any) => {
                      const isChecked = searchParams
                        .get("size")
                        ?.split(",")
                        .includes(option.name);
                      return (
                        <div className="flex items-center" key={option.name}>
                          <Checkbox
                            id={`size-${option.name}`}
                            checked={isChecked}
                            onCheckedChange={(checked: boolean) =>
                              handleSizeChange(option.name, checked)
                            }
                          />
                          <Label className="ml-3" htmlFor={`size-${option.name}`}>
                            {option.name}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Color Filter */}
              {colorAttribute && (
                <div>
                  <h3 className="text-lg font-semibold">Colors</h3>
                  <div className="mt-4 space-y-2">
                    {colorAttribute.options.map((option: any) => {
                      const isChecked = searchParams
                        .get("color")
                        ?.split(",")
                        .includes(option.name);
                      return (
                        <div className="flex items-center" key={option.name}>
                          <Checkbox
                            id={`color-${option.name}`}
                            checked={isChecked}
                            onCheckedChange={(checked: boolean) =>
                              handleColorChange(option.name, checked)
                            }
                          />
                          <Label className="ml-3" htmlFor={`color-${option.name}`}>
                            {option.name}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main Content */}
          <div>
            <div className="mb-4">
              <Breadcrumb />
            </div>
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
                        {urlMaxPrice !== undefined
                          ? `$${urlMaxPrice}`
                          : `$${Number(minMaxData?.maxPrice?.nodes[0]?.price) || 100}`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handlePriceChange(
                            Number(minMaxData?.minPrice?.nodes[0]?.price) || 0,
                            Number(minMaxData?.maxPrice?.nodes[0]?.price) || 100
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
                  excerpt={product.excerpt}
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

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Category {...props} />
    </Suspense>
  );
}
