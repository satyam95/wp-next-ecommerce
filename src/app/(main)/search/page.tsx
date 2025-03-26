"use client";

import { Suspense, useMemo } from "react";
import { GET_SEARCHED_PRODUCTS } from "@/apollo/queries/getSearchedProducts";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

// Define types for better TypeScript support
interface ProductNode {
  id: string;
  name: string;
  shortDescription: string;
  slug: string;
  price: number;
  averageRating: number;
  image: string;
}

interface ProductEdge {
  node: ProductNode;
}

interface ProductsData {
  products: {
    found: number;
    edges: ProductEdge[];
  };
}

function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("q") ?? "";

  const { data, loading, error } = useQuery<ProductsData>(
    GET_SEARCHED_PRODUCTS,
    {
      variables: {
        first: 10,
        search: searchQuery,
      },
      skip: !searchQuery,
    }
  );

  const products = useMemo(() => data?.products?.edges || [], [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error.message}</p>
        <p className="mt-2">Please try again later or refine your search.</p>
      </div>
    );
  }

  if (!products.length && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="mt-2 text-gray-600">
          Try adjusting your search term <b>{searchQuery}</b> to find what
          you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-8">
        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight">
            Showing results for: {searchQuery}
          </h1>
          <p className="text-gray-600 mt-1">
            {data?.products.found} product
            {data?.products.found !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(({ node }) => (
            <ProductCard
              key={node.id}
              image={node.image}
              title={node.name}
              excerpt={node.shortDescription}
              slug={node.slug}
              price={node.price}
              rating={node.averageRating}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <SearchResults />
    </Suspense>
  );
}
