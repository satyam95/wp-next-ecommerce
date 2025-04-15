import { FiltersSkeleton } from "./FiltersSkeleton";
import { ProductsGridSkeleton } from "./ProductsGridSkeleton";

export function ShopPageSkeleton() {
  return (
    <div className="grid gap-8">
      {/* Header skeleton */}
      <div className="text-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mt-2" />
      </div>

      {/* Main content grid skeleton */}
      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        {/* Filters skeleton */}
        <FiltersSkeleton />
        
        {/* Products section skeleton */}
        <div>
          {/* Breadcrumb skeleton */}
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
          
          {/* Products grid skeleton */}
          <ProductsGridSkeleton />
        </div>
      </div>
    </div>
  );
} 