"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Label } from "@/components/ui/label";

export function PriceRangeSlider({ min, max }: { min: number; max: number }) {
  const [values, setValues] = React.useState([min, max]);

  const formatPrice = (price: number) =>
    isNaN(price) ? "$0.00" : `$${price.toFixed(2)}`;

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="price-range-slider" className="text-sm font-medium">
          Price
        </Label>
        <span className="text-sm font-bold">
          {formatPrice(values[0])} - {formatPrice(values[1])}
        </span>
      </div>
      <SliderPrimitive.Root
        id="price-range-slider"
        className="relative flex w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={1}
        value={values}
        onValueChange={setValues}
        aria-label="Price range"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-3 w-3 rounded-full bg-black focus:none"
            aria-label={index === 0 ? "Minimum price" : "Maximum price"}
          />
        ))}
      </SliderPrimitive.Root>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
