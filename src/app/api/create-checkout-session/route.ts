import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

interface Variables {
  billing?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

interface SessionData {
  success_url: string;
  cancel_url: string;
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[];
  metadata?: Record<string, any>;
  mode: Stripe.Checkout.SessionCreateParams.Mode;
}

export async function POST(request: Request) {
  try {
    const { sessionData, variables, orderId }: { sessionData: SessionData; variables: Variables; orderId: string } =
      await request.json();

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: variables.billing?.email || '',
      name: `${variables.billing?.firstName || ''} ${variables.billing?.lastName || ''}`,
      address: {
        line1: variables.billing?.address1 || '',
        line2: variables.billing?.address2 || '',
        city: variables.billing?.city || '',
        state: variables.billing?.state || '',
        postal_code: variables.billing?.postalCode || '',
        country: variables.billing?.country || '',
      },
    });

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'auto', // Automatically hides billing fields if address is pre-filled
      line_items: sessionData.line_items,
      mode: sessionData.mode,
      success_url: sessionData.success_url,
      cancel_url: sessionData.cancel_url,
      metadata: sessionData.metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
