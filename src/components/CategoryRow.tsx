"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import CategoryCard from "./CategoryCard";
import CategoryRowSkeleton from "./skeleton/CategoryRowSkeleton";
import { GET_PRODUCT_CATEGORIES } from "@/apollo/queries/getProductCategories";

type Item = {
  id: string;
  slug: string;
  name: string;
  image: any;
};

const MIN_FILL = 0.3; // 30%

const CategoryRow = () => {
  const { data, loading } = useQuery(GET_PRODUCT_CATEGORIES);
  const scroller = useRef<HTMLDivElement>(null);

  // progress: 0 → 1
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  // detect if content overflows
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // update progress on scroll
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const max = scrollWidth - clientWidth;
      setProgress(max > 0 ? scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return <CategoryRowSkeleton />;
  }

  // compute a width that starts at MIN_FILL and goes to 1.0
  const fillPercent = MIN_FILL + progress * (1 - MIN_FILL); // 0.3 → 1

  return (
    <section className="w-full py-4 xl:py-8">
      <div className="container px-4 md:px-6">
        <div className="relative">
          <div
            ref={scroller}
            className="flex overflow-x-auto overflow-y-hidden gap-5 sm:gap-7 py-2 md:gap-2.5 lg:gap-8"
          >
            {data?.productCategories?.nodes.map((item: Item) => (
              <CategoryCard
                key={item.id}
                name={item.name}
                slug={item.slug}
                image={item.image}
              />
            ))}
          </div>

          {scrollable && (
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
              <div
                className="h-full bg-black transition-all ease-in-out duration-500"
                style={{ width: `${fillPercent * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryRow;
