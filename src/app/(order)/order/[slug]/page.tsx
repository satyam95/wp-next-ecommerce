import OrderDetailsBlock from "@/components/OrderDetailsBlock";
import { Metadata } from "next";
import { Suspense } from "react";
import OrderDetailSkeleton from "@/components/skeleton/OrderDetailSkeleton";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Order #${params.slug} | Your Store Name`,
    description: `View details of your order #${params.slug}. Track your order status, view items, and manage your purchase.`,
    openGraph: {
      title: `Order #${params.slug} | Your Store Name`,
      description: `View details of your order #${params.slug}. Track your order status, view items, and manage your purchase.`,
      type: "website",
    },
  };
}

export default function OrderDetail({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailsBlock params={params} />
    </Suspense>
  );
}
