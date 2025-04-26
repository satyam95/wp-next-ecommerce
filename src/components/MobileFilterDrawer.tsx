"use client";

import { X } from "lucide-react";
import FiltersClient from "./FiltersClient";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  categories?: any[];
  sizeAttribute: any;
  colorAttribute: any;
  minPrice: number;
  maxPrice: number;
  currentSizes: string[];
  currentColors: string[];
  currentMinPrice?: number;
  currentMaxPrice?: number;
  currentCategories?: string[];
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  onApply,
  categories,
  sizeAttribute,
  colorAttribute,
  minPrice,
  maxPrice,
  currentSizes,
  currentColors,
  currentMinPrice,
  currentMaxPrice,
  currentCategories,
}: MobileFilterDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full max-w-[280px] flex flex-col p-0">
        <div className="px-4 py-2">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="border-t border-gray-200 dark:border-gray-700">
            <FiltersClient
              categories={categories}
              sizeAttribute={sizeAttribute}
              colorAttribute={colorAttribute}
              minPrice={minPrice}
              maxPrice={maxPrice}
              currentSizes={currentSizes}
              currentColors={currentColors}
              currentMinPrice={currentMinPrice}
              currentMaxPrice={currentMaxPrice}
              currentCategories={currentCategories}
            />
          </div>
        </div>

        {/* <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-4 mt-auto">
          <Button
            className="w-full"
            onClick={() => {
              onApply();
              onClose();
            }}
          >
            Apply Filters
          </Button>
        </div> */}
      </SheetContent>
    </Sheet>
  );
} 