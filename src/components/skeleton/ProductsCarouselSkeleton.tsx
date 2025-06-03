import React from "react";
import { Card, CardContent } from "../ui/card";

export const ProductsCarouselSkeleton = () => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-2 md:mb-4 lg:mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Card>
                <div className="w-full aspect-square bg-gray-200 rounded-t-lg animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 