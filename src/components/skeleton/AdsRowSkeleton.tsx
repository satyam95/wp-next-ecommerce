import React from "react";

const AdsRowSkeleton = () => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full h-[745px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsRowSkeleton; 