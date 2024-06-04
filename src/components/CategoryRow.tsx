"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CATEGORIES } from "@/apollo/queries/getProductCategories";

type Item = {
  id: string;
  slug: string;
  name: string;
  image: any;
};

const CategoryRow = () => {
  const { data } = useQuery(GET_PRODUCT_CATEGORIES);
  // console.log(data.productCategories.nodes);
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-9 gap-2">
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
