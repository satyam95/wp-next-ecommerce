"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Label } from "@/components/ui/label";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
  onChange?: (min: number, max: number) => void;
};

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  initialMin,
  initialMax,
  onChange,
}) => {
  const [values, setValues] = React.useState<number[]>([
    initialMin ?? min,
    initialMax ?? max,
  ]);

  // If the initial values change, update the state.
  React.useEffect(() => {
    setValues([initialMin ?? min, initialMax ?? max]);
  }, [initialMin, initialMax, min, max]);

  const formatPrice = (price: number) =>
    isNaN(price) ? "$0.00" : `$${price.toFixed(2)}`;

  const handleValueChange = (newValues: number[]) => {
    setValues(newValues);
    if (onChange) {
      onChange(newValues[0], newValues[1]);
    }
  };

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
        onValueChange={handleValueChange}
        aria-label="Price range"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-3 w-3 rounded-full bg-black focus:outline-none"
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
};
