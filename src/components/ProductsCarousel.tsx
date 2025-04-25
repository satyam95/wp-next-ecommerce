"use client";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_TAG } from "@/apollo/queries/getProductsByTag";
import { ProductsCarouselSkeleton } from "./skeleton/ProductsCarouselSkeleton";

type PropsType = {
  title: string;
  catSlug: string;
};

type ItemPropsType = {
  id: number;
  name: string;
  slug: string;
  price: number;
};

export const ProductsCarousel = ({ title, catSlug }: PropsType) => {
  const { data, loading } = useQuery(GET_PRODUCTS_BY_TAG, {
    variables: { tagIn: [catSlug] },
  });

  if (loading) {
    return <ProductsCarouselSkeleton />;
  }

  return (
    <section className="w-full py-4 xl:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-4 xl:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          <Link
            className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href={`product-tag/${catSlug}`}
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.products?.edges?.slice(0, 4).map((product: any) => (
            <div key={product.node.id}>
              <Link href={`product/${product.node.slug}`}>
                  <Card>
                    <Image
                      alt={
                        product.node.image === null ||
                        product.node.image.altText === ""
                          ? "Product Image"
                          : product.node.image.altText
                      }
                      className="object-cover w-full aspect-square rounded-t-lg"
                      height={300}
                      src={
                        product.node.image === null
                          ? "/placeholder.svg"
                          : product.node.image.sourceUrl
                      }
                      width={300}
                    />
                    <CardContent className="p-2 xl:p-4">
                      <h3 className="text-sm md:text-base xl:text-lg font-semibold tracking-tight">
                        {product.node.name}
                      </h3>
                      <p className="text-xs md:text-base text-gray-500 dark:text-gray-400 xl:mt-1">
                        {product.node.regularPrice}
                      </p>
                    </CardContent>
                  </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
