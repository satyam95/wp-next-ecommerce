import React from "react";

export const ProductPageSkeleton = () => {
  return (
    <div className="container px-6 mx-auto py-6 sm:py-8 lg:py-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* Product Gallery Skeleton */}
          <div className="flex flex-col gap-4 md:gap-10 items-start w-full lg:w-1/2">
            <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
              <div className="sm:min-w-32 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-hidden justify-between">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square h-20 w-20 sm:w-32 sm:h-32 bg-gray-200 rounded-lg animate-pulse w-1/4"
                  />
                ))}
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg animate-pulse w-full" />
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col items-start w-full lg:w-1/2">
            <div className="mb-2">
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />

              {/* Product Attributes Skeleton */}
              <div className="flex flex-col gap-4">
                {[...Array(2)].map((_, index) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(4)].map((_, termIndex) => (
                        <div
                          key={termIndex}
                          className="h-8 w-16 bg-gray-200 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to Cart Button Skeleton */}
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />

              {/* Metadata Skeleton */}
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Skeleton */}
        <div className="w-full">
          <div className="flex flex-col gap-4 items-start">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2 w-full">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-full bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="w-full">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex flex-col gap-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="w-full flex flex-col gap-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
