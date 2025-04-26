import { Suspense } from "react";
import { GET_SEARCHED_PRODUCTS } from "@/apollo/queries/getSearchedProducts";
import ProductCard from "@/components/ProductCard";
import { getServerApolloClient } from "@/lib/apollo-server";
import { Metadata } from "next";
import { SearchPageSkeleton } from "@/components/skeleton/SearchPageSkeleton";

// Define types
interface ProductNode {
  id: string;
  name: string;
  shortDescription: string;
  slug: string;
  price: string;
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const searchQuery = searchParams?.q ?? "";

  return {
    title: searchQuery
      ? `${searchQuery} - Search Results | Your Store Name`
      : "Search Results | Your Store Name",
    description: searchQuery
      ? `Find ${searchQuery} products. Browse our selection of items matching your search query.`
      : "Search our store for products. Find what you're looking for with our comprehensive search.",
    openGraph: {
      title: searchQuery ? `${searchQuery} - Search Results` : "Search Results",
      description: searchQuery
        ? `Explore products related to ${searchQuery}`
        : "Search our product catalog",
      type: "website",
    },
  };
}

async function SearchResults({ searchQuery }: { searchQuery: string }) {
  let data: ProductsData | undefined;
  let error: Error | undefined;

  const client = getServerApolloClient();

  if (searchQuery) {
    try {
      const result = await client.query<ProductsData>({
        query: GET_SEARCHED_PRODUCTS,
        variables: {
          first: 10,
          search: searchQuery,
        },
      });
      data = result.data;
    } catch (err) {
      error = err instanceof Error ? err : new Error("An error occurred");
    }
  }

  const products = data?.products?.edges || [];

  if (!data && !error) {
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

  if (!products.length) {
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const searchQuery = searchParams?.q ?? "";

  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchResults searchQuery={searchQuery} />
    </Suspense>
  );
}
