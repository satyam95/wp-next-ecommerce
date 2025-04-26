import CheckoutForm from "@/components/forms/CheckoutForm";
import { Metadata } from "next";
import { Suspense } from "react";
import CheckoutSkeleton from "@/components/skeleton/CheckoutSkeleton";

export const metadata: Metadata = {
  title: "Checkout | Your Store Name",
  description: "Complete your purchase with secure checkout. Enter your shipping and billing information to place your order.",
  keywords: ["checkout", "shopping cart", "secure payment", "online store", "ecommerce"],
  openGraph: {
    title: "Checkout | Your Store Name",
    description: "Complete your purchase with secure checkout. Enter your shipping and billing information to place your order.",
    type: "website",
  },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutForm />
    </Suspense>
  );
}
