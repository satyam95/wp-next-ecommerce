import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Stripe configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// WooCommerce configuration
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: "wc/v3",
});

// Helper function to read raw body from NextRequest
async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = req.body?.getReader();

  if (!reader) {
    throw new Error("ReadableStream is null.");
  }

  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

// Function to update WooCommerce order status
const updateOrder = async (
  newStatus: string,
  orderId: string,
  transactionId: string = ""
): Promise<void> => {
  const newOrderData: Record<string, any> = { status: newStatus };

  if (transactionId) {
    newOrderData.transaction_id = transactionId;
  }

  try {
    const { data } = await api.put(`orders/${orderId}`, newOrderData);
    console.log("Order updated successfully:", data);
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error;
  }
};

// POST handler
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const buf = await getRawBody(req);
    const sig = req.headers.get("stripe-signature");

    let stripeEvent: Stripe.Event;

    // Verify Stripe webhook signature
    try {
      stripeEvent = stripe.webhooks.constructEvent(buf, sig || "", webhookSecret);
      console.log("Stripe event received:", stripeEvent);
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return NextResponse.json({ error: "Webhook Error: Invalid signature" }, { status: 400 });
    }

    // Handle specific event types
    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      console.log("Checkout session completed:", session);

      try {
        const orderId = session.metadata?.orderId || "";
        const transactionId = session.id;

        if (!orderId) {
          throw new Error("Order ID is missing in session metadata.");
        }

        // Update WooCommerce order status
        await updateOrder("processing", orderId, transactionId);
      } catch (error) {
        console.error("Failed to process order:", error);
        const orderId = (stripeEvent.data.object as any)?.metadata?.orderId || "";
        await updateOrder("failed", orderId);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
