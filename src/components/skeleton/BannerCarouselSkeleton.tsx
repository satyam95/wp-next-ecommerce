import React from "react";

export const BannerCarouselSkeleton = () => {
  return (
    <section>
      <div className="py-4 md:py-2 md:pb-8">
        <div className="container px-4 md:px-6">
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </section>
  );
};
