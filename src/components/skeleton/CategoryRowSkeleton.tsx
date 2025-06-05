import React from "react";

const CategoryRowSkeleton = () => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex overflow-x-auto justify-between gap-7 md:gap-2.5 lg:gap-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="min-w-20 sm:min-w-28 flex flex-col items-center gap-2 bg-white rounded-lg"
            >
              <div className="w-full h-20 sm:h-28 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryRowSkeleton;
