import React from "react";

export const FiltersSkeleton = () => {
  return (
    <div className="hidden sm:block bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-6">
        {/* Price Range Skeleton */}
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
        </div>
        {/* Size Filter Skeleton */}
        <div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        {/* Color Filter Skeleton */}
        <div>
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
