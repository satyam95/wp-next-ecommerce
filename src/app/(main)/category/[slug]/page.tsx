"use client";

import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "@/apollo/queries/getProductsByCategory";
import Breadcrumb from "@/components/Breadcrumb";

export default function Category({ params }: { params: { slug: string } }) {
  const categorySlug = params.slug;
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { slug: [categorySlug] },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              {data?.productCategories?.edges[0].node.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {data?.productCategories?.edges[0].node.description}
            </p>
          </div>
          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Filters</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Price</h4>
                    <div className="mt-2">
                      <Slider
                        className="w-full"
                        defaultValue={[50, 150]}
                        max={200}
                        min={0}
                        step={10}
                      />
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>$0</span>
                        <span>$200</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Color</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="color-black" />
                        <Label className="ml-3" htmlFor="color-black">
                          Black
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="color-white" />
                        <Label className="ml-3" htmlFor="color-white">
                          White
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="color-blue" />
                        <Label className="ml-3" htmlFor="color-blue">
                          Blue
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Size</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="size-s" />
                        <Label className="ml-3" htmlFor="size-s">
                          S
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="size-m" />
                        <Label className="ml-3" htmlFor="size-m">
                          M
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="size-l" />
                        <Label className="ml-3" htmlFor="size-l">
                          L
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <Breadcrumb />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.productCategories?.edges[0].node.products.edges.map(
                  (product: any) => (
                    <ProductCard
                      image={product.node.image}
                      key={product.node.id}
                      title={product.node.name}
                      description={product.node.excerpt}
                      slug={product.node.slug}
                      price={product.node.price}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
