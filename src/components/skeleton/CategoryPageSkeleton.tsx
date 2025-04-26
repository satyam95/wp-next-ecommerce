import { FiltersSkeleton } from "./FiltersSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryPageSkeleton() {
  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="text-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mx-auto" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mx-auto mt-2" />
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 xl:gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <FiltersSkeleton />
        </div>

        <div>
          {/* Breadcrumb */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Filter and Sort Bar */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[100px] lg:hidden" /> {/* Mobile Filter Button */}
              <div className="ml-auto">
                <Skeleton className="h-10 w-[180px]" /> {/* Sort Dropdown */}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
} 