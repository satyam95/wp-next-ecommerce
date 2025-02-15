"use client";

import { GET_PRODUCTS } from "@/apollo/queries/getProducts";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Shop() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const productsPerPage = 9;

  const [products, setProducts] = useState([]);
  const [pageCursors, setPageCursors] = useState<{
    [page: number]: string | null;
  }>({ 1: null });
  const [hasNextPage, setHasNextPage] = useState(false);
  const [globalTotalCount, setGlobalTotalCount] = useState<number | null>(null);

  const afterCursor = pageCursors[currentPage] ?? null;

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      first: productsPerPage,
      after: afterCursor,
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
        localStorage.setItem(
          "globalTotalCount",
          data.products.found.toString()
        );
      } else {
        const storedCount = localStorage.getItem("globalTotalCount");
        if (storedCount) {
          setGlobalTotalCount(Number(storedCount));
        }
      }
    }
  }, [data, currentPage, productsPerPage]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      router.push(`/shop?page=${page}`);
    }
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
          {/* Filters Section */}
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-base font-medium">Categories</h4>
                  <div className="mt-2 space-y-2">
                    {data.productCategories.nodes.map(
                      (item: any) =>
                        item.count > 0 && (
                          <div className="flex items-center" key={item.id}>
                            <Checkbox id={item.slug} />
                            <Label className="ml-3" htmlFor={item.slug}>
                              {item.name}{" "}
                              <span className="text-xs">({item.count})</span>
                            </Label>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              hasNextPage={hasNextPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
