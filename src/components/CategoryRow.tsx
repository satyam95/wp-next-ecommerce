"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CATEGORIES } from "@/apollo/queries/getProductCategories";
import CategoryRowSkeleton from "./skeleton/CategoryRowSkeleton";

type Item = {
  id: string;
  slug: string;
  name: string;
  image: any;
};

const CategoryRow = () => {
  const { data, loading } = useQuery(GET_PRODUCT_CATEGORIES);

  if (loading) {
    return (
        <CategoryRowSkeleton />
    );
  }

  return (
    <section className="w-full py-4 xl:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex overflow-x-auto justify-between gap-7 md:gap-2.5 lg:gap-8">
          {data?.productCategories?.nodes.map((item: Item) => (
            <CategoryCard
              key={item.id}
              name={item.name}
              slug={item.slug}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryRow;
