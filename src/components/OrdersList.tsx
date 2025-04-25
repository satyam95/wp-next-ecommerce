"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { GET_ORDERS } from "@/apollo/queries/getOrders";
import { useQuery } from "@apollo/client";
import { formatDate } from "@/lib/formatDate";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrdersSkeleton from "./skeleton/OrdersSkeleton";

interface ProductImage {
  altText: string;
  sourceUrl: string;
  id: string;
}

interface Product {
  node: {
    id: string;
    name: string;
    image: ProductImage;
    price?: string;
  };
}

interface LineItem {
  id: string;
  total: string;
  quantity: number;
  product: Product;
}

interface OrderNode {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  paymentMethodTitle: string;
  lineItems: {
    nodes: LineItem[];
  };
}

interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface OrderEdge {
  cursor: string;
  node: OrderNode;
}

interface OrdersData {
  ordersByCustomerId: {
    pageInfo: PageInfo;
    edges: OrderEdge[];
  };
}

interface Customer {
  databaseId: string;
  billing: {
    email: string;
  };
}

interface RootState {
  session: {
    customer: Customer | null;
  };
}

export default function OrdersList() {
  const { customer } = useAppSelector((state: RootState) => state.session);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const variables = {
    first: 10,
    customerId: customer?.databaseId,
    after: null as string | null,
  };

  const { data, loading, error, fetchMore } = useQuery<OrdersData>(GET_ORDERS, {
    variables,
    notifyOnNetworkStatusChange: true,
    skip: !customer?.databaseId,
  });

  const handleLoadMore = async () => {
    if (!data?.ordersByCustomerId.pageInfo.hasNextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          first: 5,
          customerId: customer?.databaseId,
          after: data.ordersByCustomerId.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            ordersByCustomerId: {
              ...fetchMoreResult.ordersByCustomerId,
              edges: [
                ...prev.ordersByCustomerId.edges,
                ...fetchMoreResult.ordersByCustomerId.edges,
              ],
              pageInfo: fetchMoreResult.ordersByCustomerId.pageInfo,
            },
          };
        },
      });
    } catch (err) {
      console.error("Error fetching more orders:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading && !data) {
    return <OrdersSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error.message}
      </div>
    );
  }

  if (!data?.ordersByCustomerId?.edges.length) {
    return <div className="text-center py-10">No orders found.</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          </div>
        </div>
      </div>
      <div className="container py-6">
        <div className="grid gap-4">
          {data.ordersByCustomerId.edges.map((order) => (
            <Card key={order.cursor} className="overflow-hidden">
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
                      {order.node.lineItems.nodes.map((orderItem) => (
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
                              {orderItem.product.node.price ?? "N/A"} each
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
          {data.ordersByCustomerId.pageInfo.hasNextPage && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-4 py-2 text-white rounded"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
