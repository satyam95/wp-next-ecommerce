import React from "react";

export const BannerCarouselSkeleton = () => {
  return (
    <section>
      <div className="py-4 md:py-2 md:pb-8">
        <div className="container px-4 md:px-6">
          <div className="w-full h-[168px] sm:h-[396px] lg:h-[540px] xl:h-[760px] bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </section>
  );
};
