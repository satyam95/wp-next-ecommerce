import React from "react";

export const ProductPageSkeleton = () => {
  return (
    <div className="container px-6 mx-auto py-12">
      {/* Breadcrumb Skeleton */}
      <div className="mb-4">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* Product Gallery Skeleton */}
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

            {/* Product Attributes Skeleton */}
            <div className="grid gap-4">
              {[...Array(2)].map((_, index) => (
                <div className="grid gap-2" key={index}>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, termIndex) => (
                      <div
                        key={termIndex}
                        className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add to Cart Button Skeleton */}
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

            {/* Check Delivery Skeleton */}
            <div className="grid gap-2 max-w-sm">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-9 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            {/* Metadata Skeleton */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Product Description Skeleton */}
        <div className="col-span-2">
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="col-span-2">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
          <div className="grid gap-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="col-span-2">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 