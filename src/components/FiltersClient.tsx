"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";

interface FiltersClientProps {
  categories?: { slug: string; name: string }[];
  sizeAttribute: any;
  colorAttribute: any;
  minPrice: number;
  maxPrice: number;
  currentCategories?: string[];
  currentSizes: string[];
  currentColors: string[];
  currentMinPrice: number | undefined;
  currentMaxPrice: number | undefined;
}

export default function FiltersClient({
  categories,
  sizeAttribute,
  colorAttribute,
  minPrice,
  maxPrice,
  currentCategories,
  currentSizes,
  currentColors,
  currentMinPrice,
  currentMaxPrice,
}: FiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`); // Adjust path as needed (e.g., /shop or /category/[slug])
  };

  const handleCategoryChange = (slug: string, checked: boolean) => {
    const newCategories = checked
      ? [...(currentCategories || []), slug]
      : (currentCategories || []).filter((c) => c !== slug);
    updateQueryParam("categories", newCategories.join(",") || null);
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
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg py-6 lg:space-y-6">
      <h3 className="hidden lg:block text-lg font-semibold">Filters</h3>
      <div className="lg:mt-4 space-y-4">
        {/* Category Filter (only if categories are provided) */}
        {categories && categories.length > 0 && (
          <div>
            <h4 className="text-base font-medium">Categories</h4>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <div className="flex items-center" key={category.slug}>
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={currentCategories?.includes(category.slug) || false}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.slug, checked as boolean)
                    }
                  />
                  <Label className="ml-3" htmlFor={`category-${category.slug}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
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
            <h4 className="text-base font-medium">Sizes</h4>
            <div className="mt-2 space-y-2">
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
            <h4 className="text-base font-medium">Colors</h4>
            <div className="mt-2 space-y-2">
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