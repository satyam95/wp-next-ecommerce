"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDER_STATUS } from "@/apollo/queries/getOrderStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

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

export default function TrackOrder() {
  const [orderIdInput, setOrderIdInput] = useState<string>("");
  const [searchOrderId, setSearchOrderId] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_ORDER_STATUS, {
    variables: { id: searchOrderId! },
    skip: searchOrderId === null,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (orderIdInput.trim() !== "") {
      setSearchOrderId(orderIdInput);
    }
  };

  function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split("T")[0].split("-");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[parseInt(month, 10) - 1];
    const dayNumber = parseInt(day, 10);
    return `${monthName} ${dayNumber}, ${year}`;
  }

  console.log(error)
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your order ID to track your order
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="Enter your order ID"
            className="flex-1"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Searching...
              </>
            ) : (
              "Track Order"
            )}
          </Button>
        </form>
        {searchOrderId !== null && (
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
                <p className="ml-2 text-gray-600">Fetching order details...</p>
              </div>
            ) : error ? (
              error.message.includes("No order exists") ? (
                <div className="text-center py-8">
                  <p className="text-gray-800 font-medium">No order found</p>
                  <p className="text-gray-600 mt-2">
                    Please check the order ID and try again.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-600 font-medium">
                    Oops! Something went wrong.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Please try again later or contact support.
                  </p>
                </div>
              )
            ) : data && data.order ? (
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
                      {data.order.lineItems.nodes.map(
                        (product: orderProductType) => (
                          <div
                            className="flex items-center gap-4 pb-4"
                            key={product.id}
                          >
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                              <Image
                                src={product.product.node.image.sourceUrl}
                                alt={product.product.node.image.altText}
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
                        )
                      )}
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
                          {data.order.shipping.city},{" "}
                          {data.order.shipping.state} -{" "}
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-800 font-medium">No order found</p>
                <p className="text-gray-600 mt-2">
                  Please check the order ID and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
