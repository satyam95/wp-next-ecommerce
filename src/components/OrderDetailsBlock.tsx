"use client";

import { GET_ORDER } from "@/apollo/queries/getOrder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatDate";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import OrderDetailsSkeleton from "./skeleton/OrderDetailsSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface orderProductType {
  id: string;
  quantity: number;
  total: string;
  product: {
    node: {
      name: string;
      image: {
        altText: string;
        id: string;
        sourceUrl: string;
      };
    };
  };
}

export default function OrderDetailsBlock({ params }: { params: { slug: string } }) {
  const orderSlug = params.slug;
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { id: orderSlug },
  });

  if (loading) return <OrderDetailsSkeleton />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || "Failed to load order details. Please try again later."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Order #{data.order.orderNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Placed on {formatDate(data.order.date)}
                </p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {data.order.status}
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.order.lineItems.nodes.map((product: orderProductType) => (
                  <div
                    className="flex items-center gap-4 pb-4"
                    key={product.id}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={product.product.node.image?.sourceUrl}
                        alt={product.product.node.image?.altText}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {product.product.node.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        ${product.total}
                      </p>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{data.order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-green-600">
                      {data.order.shippingTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment method:</span>
                    <span>{data.order.paymentMethodTitle}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{data.order.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Delivery Address
                  </h3>
                  <p className="text-gray-600">
                    {data.order.shipping.firstName}{" "}
                    {data.order.shipping.lastName}
                    <br />
                    {data.order.shipping.address1}
                    <br />
                    {data.order.shipping.city}, {data.order.shipping.state} -{" "}
                    {data.order.shipping.postcode}
                    <br />
                    {data.order.shipping.country}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Shipping Method
                  </h3>
                  {data.order.shippingLines.nodes.map(
                    (item: { id: string; methodTitle: string }) => (
                      <p className="text-gray-600" key={item.id}>
                        {item.methodTitle}
                      </p>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
