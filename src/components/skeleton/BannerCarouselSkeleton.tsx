import React from "react";

export const BannerCarouselSkeleton = () => {
  return (
    <section>
      <div className="py-4 md:py-2 md:pb-8">
        <div className="container px-4 md:px-6">
          <div className="w-full h-[94.3px] sm:h-[320px] bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>
      </div>
    </section>
  );
};
