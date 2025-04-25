import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import ThankYouSkeleton from "@/components/skeleton/ThankYouSkeleton";

export const metadata: Metadata = {
  title: "Order Confirmation - Thank You",
  description: "Thank you for your order. Your purchase has been confirmed and is being processed.",
  openGraph: {
    title: "Order Confirmation - Thank You",
    description: "Thank you for your order. Your purchase has been confirmed and is being processed.",
    type: "website",
  },
};

export default function ThankYou({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams.orderId;

  return (
    <Suspense fallback={<ThankYouSkeleton />}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-gray-600">
              Your order has been successfully placed and is being processed.
            </p>
          </div>

          <Card className="p-6 mb-8 border-green-100 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Order #{orderId || "Loading..."}
                </h2>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Confirmed
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order Processing
                  </p>
                  <p className="text-sm text-gray-500">
                    We&apos;ll notify you when your order has been shipped
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Truck className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Estimated Delivery
                  </p>
                  <p className="text-sm text-gray-500">3-5 Business Days</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                A confirmation email has been sent to your email address.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild variant="outline">
                  <Link href="/orders">View Order Status</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
