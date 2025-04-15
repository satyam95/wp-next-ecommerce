import React from "react";
import { Card, CardContent } from "../ui/card";

export const ProductsGridSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-end mb-4 gap-4">
        <div className="h-9 w-[180px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <CardContent className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 