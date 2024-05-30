import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { SVGProps } from "react";

export default function Cart() {
  return (
    <>
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="mb-6">
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <Link className="text-primary hover:underline" href="#">
              Clear Cart
            </Link>
          </div>
        </div>
        <div className="flex flex-row w-full gap-8">
          <div className="grow grid gap-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-[80px_1fr_80px_80px] items-center gap-4 rounded-lg border p-4">
                <Image
                  alt="Product Image"
                  className="rounded-md object-cover"
                  height={80}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width={80}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">Cozy Blanket</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Warm and Soft for Chilly Nights
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="h-8 w-8" size="icon" variant="outline">
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>1</span>
                  <Button className="h-8 w-8" size="icon" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-medium">$29.99</div>
              </div>
              <div className="grid grid-cols-[80px_1fr_80px_80px] items-center gap-4 rounded-lg border p-4">
                <Image
                  alt="Product Image"
                  className="rounded-md object-cover"
                  height={80}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width={80}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">Autumn Mug</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enjoy Your Hot Beverages in Style
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="h-8 w-8" size="icon" variant="outline">
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>2</span>
                  <Button className="h-8 w-8" size="icon" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-medium">$12.99</div>
              </div>
              <div className="grid grid-cols-[80px_1fr_80px_80px] items-center gap-4 rounded-lg border p-4">
                <Image
                  alt="Product Image"
                  className="rounded-md object-cover"
                  height={80}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width={80}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">Fall Fragrance Candle</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fill Your Space with a Cozy Scent
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="h-8 w-8" size="icon" variant="outline">
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>1</span>
                  <Button className="h-8 w-8" size="icon" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-medium">$16.99</div>
              </div>
            </div>
          </div>
          <div className="w-80 flex flex-col h-fit gap-4 rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Order Summary</h2>
              {/* <Link className="text-primary hover:underline" href="#">
                Edit
              </Link> */}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-medium">$59.97</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping</p>
                <p className="font-medium">$0.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tax</p>
                <p className="font-medium">$4.80</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Total</h3>
                <p className="text-lg font-bold">$64.77</p>
              </div>
            </div>
            <Link href="/shipping">
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
