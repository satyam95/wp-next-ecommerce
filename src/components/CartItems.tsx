"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useCartActions } from "@/redux/useCartActions";
import { toast } from "sonner";

export default function CartItems() {
  const { removeItemFromCart, updateCartItemQty, clearCart, loading, error } =
    useCartActions();

  const { contents, total, totalTax, shippingTotal, subtotal, appliedCoupons } =
    useAppSelector((state) => state.cart);

  const handleRemoveItemFromCart = async (key: string) => {
    try {
      await removeItemFromCart([key]);
      toast.success("Product removed!");
    } catch {
      toast.error("Failed to remove product. Please try again.");
    }
  };

  const updateItemQty = async (key: string, qty: number) => {
    try {
      await updateCartItemQty(key, qty);
      toast.success("Product quantity updated!");
    } catch {
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared!");
    } catch {
      toast.error("Failed to clear cart. Please try again.");
    }
  };

  if (!contents.nodes.length) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <ShoppingCartIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add some items to get started
        </p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {contents.itemCount}{" "}
                {contents.itemCount === 1 ? "item" : "items"} (
                {contents.productCount}{" "}
                {contents.productCount === 1 ? "product" : "products"})
              </p>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleClearCart}
              disabled={loading}
            >
              <TrashIcon className="h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="flex flex-col gap-4">
            {contents.nodes.map((item: any) => (
              <div
                key={item.key}
                className="bg-white rounded-xl border p-6 transition-shadow hover:shadow-md"
              >
                <div className="grid sm:grid-cols-[120px_1fr] gap-6">
                  <div className="relative aspect-square">
                    <Image
                      alt={
                        item.product.node.image.altText ||
                        item.product.node.name
                      }
                      className="rounded-lg object-cover"
                      fill
                      src={item.product.node.image.sourceUrl}
                      sizes="(max-width: 120px) 100vw, 120px"
                    />
                    {item.product.node.onSale && (
                      <Badge
                        className="absolute top-2 right-2"
                        variant="destructive"
                      >
                        Sale
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {item.product.node.name}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: item.product.node.description,
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-red-100 p-1"
                        onClick={() => handleRemoveItemFromCart(item.key)}
                        disabled={loading}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            updateItemQty(item.key, item.quantity - 1)
                          }
                          disabled={loading}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            updateItemQty(item.key, item.quantity + 1)
                          }
                          disabled={loading}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border p-6 h-fit sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{totalTax}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">{total}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 