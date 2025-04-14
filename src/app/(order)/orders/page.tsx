import OrdersList from "@/components/OrdersList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Your Store Name",
  description: "View and manage your order history. Track your purchases and order status.",
  keywords: "orders, order history, purchase history, track orders, order status",
  openGraph: {
    title: "My Orders | Your Store Name",
    description: "View and manage your order history. Track your purchases and order status.",
    type: "website",
  },
};

export default function Orders() {
  return <OrdersList />;
}
