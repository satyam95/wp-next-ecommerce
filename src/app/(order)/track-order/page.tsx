import TrackOrderClient from "@/components/TrackOrderClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | Your Store Name",
  description: "Track your order status and view order details using your order ID and email address.",
  keywords: ["order tracking", "track order", "order status", "order details"],
  openGraph: {
    title: "Track Your Order | Your Store Name",
    description: "Track your order status and view order details using your order ID and email address.",
    type: "website",
  },
};

export default function TrackOrder() {
  return <TrackOrderClient />;
}
