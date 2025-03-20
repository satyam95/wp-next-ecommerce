"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { GET_ORDERS } from "@/apollo/queries/getOrders";
import { useQuery } from "@apollo/client";
import { formatDate } from "@/lib/formatDate";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import Link from "next/link";

export default function Orders() {
  const [endCursor, setEndCursor] = useState("");
  const postPerPage = 10;
  const { customer } = useAppSelector((state) => state.session);
  const { data, loading, error } = useQuery(GET_ORDERS, {
    variables: {
      first: postPerPage,
      after: endCursor,
      billingEmail: customer?.billing.email,
    },
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-6">
        <div className="grid gap-4">
          {data?.orders?.edges.map((order: any) => (
            <Card key={order.id} className="overflow-hidden">
              <Link href={`/order/${order.node.orderNumber}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Order #{order.node.orderNumber} •{" "}
                        {formatDate(order.node.date)}
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium capitalize">
                        {order.node.status}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {order.node.lineItems.nodes.map((orderItem: any) => (
                        <div
                          key={orderItem.id}
                          className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                        >
                          <div className="relative h-20 w-20 overflow-hidden rounded-lg border">
                            <Image
                              src={orderItem.product.node.image.sourceUrl}
                              className="object-cover"
                              fill
                              alt={orderItem.product.node.image.altText}
                              sizes="80px"
                            />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="font-medium">
                              {orderItem.product.node.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Quantity: {orderItem.quantity}
                            </div>
                            <div className="text-sm font-medium">
                              {orderItem.product.node.price} each
                            </div>
                          </div>
                          <div className="text-right font-medium">
                            ${orderItem.total}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Payment Method: {order.node.paymentMethodTitle}
                      </div>
                      <div className="text-lg font-semibold">
                        Total: {order.node.total}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
