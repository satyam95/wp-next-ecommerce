// pages/category/[slug]/FiltersClient.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";

interface FiltersClientProps {
  sizeAttribute: any;
  colorAttribute: any;
  minPrice: number;
  maxPrice: number;
  currentSizes: string[];
  currentColors: string[];
  currentMinPrice: number | undefined;
  currentMaxPrice: number | undefined;
  categorySlug: string;
}

export default function FiltersClient({
  sizeAttribute,
  colorAttribute,
  minPrice,
  maxPrice,
  currentSizes,
  currentColors,
  currentMinPrice,
  currentMaxPrice,
  categorySlug,
}: FiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to update URL query parameters
  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  const handleSizeChange = (option: string, checked: boolean) => {
    const newSizes = checked
      ? [...currentSizes, option]
      : currentSizes.filter((s) => s !== option);
    updateQueryParam("size", newSizes.join(",") || null);
  };

  const handleColorChange = (option: string, checked: boolean) => {
    const newColors = checked
      ? [...currentColors, option]
      : currentColors.filter((c) => c !== option);
    updateQueryParam("color", newColors.join(",") || null);
  };

  const handlePriceChange = (newMin: number, newMax: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("minPrice", newMin.toString());
    params.set("maxPrice", newMax.toString());
    params.set("page", "1");
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-semibold">Filters</h3>
      <div className="mt-4 space-y-4">
        {/* Price Range Filter */}
        <div>
          <h4 className="text-base font-medium">Price Range</h4>
          <div className="mt-2">
            <PriceRangeSlider
              min={minPrice}
              max={maxPrice}
              initialMin={currentMinPrice !== undefined ? currentMinPrice : minPrice}
              initialMax={currentMaxPrice !== undefined ? currentMaxPrice : maxPrice}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        {/* Size Filter */}
        {sizeAttribute && (
          <div>
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="mt-4 space-y-2">
              {sizeAttribute.options.map((option: any) => (
                <div className="flex items-center" key={option.name}>
                  <Checkbox
                    id={`size-${option.name}`}
                    checked={currentSizes.includes(option.name)}
                    onCheckedChange={(checked) =>
                      handleSizeChange(option.name, checked as boolean)
                    }
                  />
                  <Label className="ml-3" htmlFor={`size-${option.name}`}>
                    {option.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Color Filter */}
        {colorAttribute && (
          <div>
            <h3 className="text-lg font-semibold">Colors</h3>
            <div className="mt-4 space-y-2">
              {colorAttribute.options.map((option: any) => (
                <div className="flex items-center" key={option.name}>
                  <Checkbox
                    id={`color-${option.name}`}
                    checked={currentColors.includes(option.name)}
                    onCheckedChange={(checked) =>
                      handleColorChange(option.name, checked as boolean)
                    }
                  />
                  <Label className="ml-3" htmlFor={`color-${option.name}`}>
                    {option.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}