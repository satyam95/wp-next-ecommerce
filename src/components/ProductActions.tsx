// components/ProductActions.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/redux/useCartActions";
import { MinusIcon, PlusIcon } from "@/constants/icons";

interface ProductActionsProps {
  productId: number;
  stockStatus: string;
  soldIndividually: boolean;
  stockQuantity: number;
}

export default function ProductActions({
  productId,
  stockStatus,
  soldIndividually,
  stockQuantity,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading: cartLoading } = useCartActions();

  const handleAddToCart = async () => {
    try {
      await addToCart(productId, quantity);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Selector */}
      {!soldIndividually && (
        <div className="flex items-center gap-2">
          <Button
            className="w-8 h-8 p-0 flex items-center justify-center"
            variant="outline"
            onClick={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <div className="text-base font-medium">{quantity}</div>
          <Button
            className="w-8 h-8 p-0 flex items-center justify-center"
            variant="outline"
            onClick={() => {
              if (quantity < stockQuantity) setQuantity(quantity + 1);
            }}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Add to Cart and Buy Now Buttons */}
      <div className="flex gap-8">
        {stockStatus === "IN_STOCK" ? (
          <>
            <Button size="lg" onClick={handleAddToCart} disabled={cartLoading}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Buy Now
            </Button>
          </>
        ) : (
          <p>Out of stock</p>
        )}
      </div>
    </div>
  );
}