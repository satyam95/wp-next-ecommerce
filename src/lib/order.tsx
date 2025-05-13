// Define types for shipping and billing addresses
interface Shipping {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  state?: string;
  postcode?: string;
  company?: string;
  email?: string;
  phone?: string;
}

interface Billing {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  state?: string;
  postcode?: string;
  company?: string;
  email?: string;
  phone?: string;
}

// Define types for input variables and cart items
interface Variables {
  shipping?: Shipping;
  billing?: Billing;
  email?: string;
  phone?: string;
  paymentMethod: string;
  isPaid?: boolean;
}

interface CartItem {
  product: {
    node: {
      databaseId: number;
    };
  };
  quantity: number;
  total?: string;
}

// Define types for order data and line items
interface LineItem {
  product_id: number;
  quantity: number;
}

interface OrderData {
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    country: string;
    state: string;
    postcode: string;
    email: string;
    phone: string;
    company: string;
  };
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    country: string;
    state: string;
    postcode: string;
    email: string;
    phone: string;
    company: string;
  };
  payment_method: string;
  payment_method_title: "Cash on Delivery" | "Stripe";
  line_items: LineItem[];
}

// Function to create order data
export const getCreateOrderData = (
  variables: Variables,
  contentsNodes: CartItem[]
): OrderData => {
  const { shipping, billing, email, phone, paymentMethod } = variables;

  const lineItems: LineItem[] = contentsNodes.map((item) => ({
    product_id: item.product.node.databaseId,
    quantity: item.quantity,
  }));

  return {
    shipping: {
      first_name: shipping?.firstName || "",
      last_name: shipping?.lastName || "",
      address_1: shipping?.address1 || "",
      address_2: shipping?.address2 || "",
      city: shipping?.city || "",
      country: shipping?.country || "",
      state: shipping?.state || "",
      postcode: shipping?.postcode || "",
      email: email || shipping?.email || "",
      phone: phone || shipping?.phone || "",
      company: shipping?.company || "",
    },
    billing: {
      first_name: billing?.firstName || "",
      last_name: billing?.lastName || "",
      address_1: billing?.address1 || "",
      address_2: billing?.address2 || "",
      city: billing?.city || "",
      country: billing?.country || "",
      state: billing?.state || "",
      postcode: billing?.postcode || "",
      email: email || billing?.email || "",
      phone: phone || billing?.phone || "",
      company: billing?.company || "",
    },
    payment_method: paymentMethod,
    payment_method_title:
      paymentMethod === "cod" ? "Cash on Delivery" : "Stripe",
    line_items: lineItems,
  };
};

// Define types for Stripe checkout session
interface ProductNode {
  name?: string;
  image?: {
    sourceUrl?: string;
  };
}

interface ContentNode {
  quantity: number;
  subtotal: string;
  product: {
    node: ProductNode;
  };
}

interface StripeLineItem {
  quantity: number;
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
    };
    unit_amount: number;
  };
}

interface SessionData {
  success_url: string;
  cancel_url: string;
  line_items: StripeLineItem[];
  metadata: {
    billing: string;
    shipping: string;
    orderId: string;
  };
  mode: string;
}

// Function to create Stripe checkout session data
export const createCheckoutSessionAndRedirect = async (
  orderId: string,
  contentsNodes: ContentNode[],
  variables: Variables
) => {
  const stripeLineItems: StripeLineItem[] = contentsNodes.map(
    ({ quantity, subtotal, product: { node: prod } }) => {
      const rawSubtotal = parseFloat(subtotal.replace(/[^0-9.]/g, "")) || 0;
      const unitPrice = rawSubtotal / (quantity || 1);

      return {
        quantity,
        price_data: {
          currency: "usd",
          product_data: {
            name: prod.name || "Unnamed product",
            images: prod.image?.sourceUrl ? [prod.image.sourceUrl] : [],
          },
          unit_amount: Math.round(unitPrice * 100),
        },
      };
    }
  );

  const getMetaData = (variables: Variables, orderId: string) => {
    return {
      billing: JSON.stringify(variables?.billing),
      shipping: JSON.stringify(variables?.shipping),
      orderId,
    };
  };

  const sessionData: SessionData = {
    success_url:
      window.location.origin +
      `/thank-you?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
    cancel_url: window.location.href,
    line_items: stripeLineItems,
    metadata: getMetaData(variables, orderId),
    mode: "payment",
  };

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionData, variables, orderId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    alert("Failed to initiate payment. Please try again."); // Basic error handling
    throw error; // Re-throw to allow onSubmit to handle it if needed
  }
};
