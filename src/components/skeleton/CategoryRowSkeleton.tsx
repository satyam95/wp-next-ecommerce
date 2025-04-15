import React from "react";

const CategoryRowSkeleton = () => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-9 gap-6">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 rounded-lg"
            >
              <div className="w-full h-28 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryRowSkeleton; 