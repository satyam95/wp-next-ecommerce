import { FiltersSkeleton } from "./FiltersSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryPageSkeleton() {
  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="text-center">
        <Skeleton className="h-9 w-48 mx-auto" /> {/* Title */}
        <Skeleton className="h-5 w-3/4 mx-auto mt-2" /> {/* Description */}
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

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] mb-3">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
} 