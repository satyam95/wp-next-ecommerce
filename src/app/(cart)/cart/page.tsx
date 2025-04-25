import { Metadata } from "next";
import { Suspense } from "react";
import CartItems from "@/components/CartItems";
import CartSkeleton from "@/components/skeleton/CartSkeleton";

export const metadata: Metadata = {
  title: "Shopping Cart | Your Store",
  description: "View and manage your shopping cart items. Update quantities, remove items, or proceed to checkout.",
  openGraph: {
    title: "Shopping Cart | Your Store",
    description: "View and manage your shopping cart items. Update quantities, remove items, or proceed to checkout.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart | Your Store",
    description: "View and manage your shopping cart items. Update quantities, remove items, or proceed to checkout.",
  },
};

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartItems />
    </Suspense>
  );
}
