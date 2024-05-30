import React from "react";
import CategoryCard from "./CategoryCard";

type PropsTypes = {
  categoryItems: Item[];
};

type Item = {
  id: number;
  slug: string;
  name: string;
};

const CategoryRow = ({ categoryItems }: PropsTypes) => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-10 gap-2">
          {categoryItems.map((item) => (
            <CategoryCard key={item.id} name={item.name} slug={item.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryRow;
