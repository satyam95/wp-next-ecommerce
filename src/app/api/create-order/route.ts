// app/api/orders/route.ts
import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

export async function POST(request: Request) {
  let payload: any;
  try {
    payload = await request.json();
  } catch (err: any) {
    console.error("Failed to parse JSON:", err.message);
    return NextResponse.json(
      { message: "Invalid JSON", error: err.message },
      { status: 400 }
    );
  }

  // Merge in defaults
  const orderData = {
    ...payload,
    status: "pending",
    set_paid: false,
  };

  try {
    const { data: wcData } = await api.post("orders", orderData);
    return NextResponse.json(
      {
        success: true,
        orderId: wcData.number,
        total: wcData.total,
        currency: wcData.currency,
      },
      { status: 200 }
    );
  } catch (err: any) {
    const details = err.response?.data || err.message;
    console.error("WC Error:", details);
    return NextResponse.json(
      { success: false, error: "WooCommerce rejected the order", details },
      { status: 400 }
    );
  }
}
