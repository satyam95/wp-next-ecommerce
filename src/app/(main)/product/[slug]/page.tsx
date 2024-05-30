import ProductGallery from "@/components/ProductGallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { SVGProps } from "react";

const images = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

export default function Category() {
  return (
    <>
      <div className="container px-6 mx-auto py-12">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Summer Collection</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div className="grid gap-4 md:gap-10 items-start">
            <ProductGallery images={images} />
          </div>
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl lg:text-4xl">
                Acme Prism T-Shirt
              </h1>
              <div>
                <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="text-4xl font-bold">$99</div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <RadioGroup
                    className="flex items-center gap-2"
                    defaultValue="black"
                    id="color"
                  >
                    <Label
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                      htmlFor="color-black"
                    >
                      <RadioGroupItem id="color-black" value="black" />
                      Black
                    </Label>
                    <Label
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                      htmlFor="color-white"
                    >
                      <RadioGroupItem id="color-white" value="white" />
                      White
                    </Label>
                    <Label
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                      htmlFor="color-blue"
                    >
                      <RadioGroupItem id="color-blue" value="blue" />
                      Blue
                    </Label>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size">Size</Label>
                  <RadioGroup
                    className="flex items-center gap-2"
                    defaultValue="medium"
                    id="size"
                  >
                    <Label
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                      htmlFor="size-small"
                    >
                      <RadioGroupItem id="size-small" value="small" />
                      Small
                    </Label>
                    <Label
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                      htmlFor="size-medium"
                    >
                      <RadioGroupItem id="size-medium" value="medium" />
                      Medium
                    </Label>
                    <Label
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                      htmlFor="size-large"
                    >
                      <RadioGroupItem id="size-large" value="large" />
                      Large
                    </Label>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    className="w-8 h-8 p-0 flex items-center justify-center"
                    variant="outline"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <div className="text-base font-medium">1</div>
                  <Button
                    className="w-8 h-8 p-0 flex items-center justify-center"
                    variant="outline"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-8">
                  <Button size="lg">Add to cart</Button>
                  <Button size="lg" variant="outline">
                    Buy Now
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 max-w-sm">
                <Label htmlFor="zipcode">Check Delivery</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="zipcode"
                    placeholder="Enter zip code"
                    type="text"
                  />
                  <Button variant="outline">Check</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid gap-4 md:gap-10 items-start">
              <div className="grid gap-4">
                <h2 className="font-bold text-2xl">Product Description</h2>
                <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  <p>
                    {`The Acme Prism T-Shirt is a versatile and stylish addition
                    to your wardrobe. Crafted from a blend of 60% combed
                    ringspun cotton and 40% polyester, this tee offers a soft
                    and breathable feel that's perfect for everyday wear.`}
                  </p>
                  <p>
                    {`The unique prism design adds a modern touch to the classic
                    t-shirt silhouette, making it a standout piece in your
                    collection. Whether you're running errands or meeting up
                    with friends, the Acme Prism T-Shirt is sure to become a
                    go-to favorite.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div>
              <h2 className="font-bold text-2xl mb-4">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="grid gap-0.5 text-sm">
                        <h3 className="font-semibold">Sarah Johnson</h3>
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          2 days ago
                        </time>
                      </div>
                      <div className="flex items-center gap-0.5 ml-auto">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                      <p>
                        {`I've been experimenting with my Acme Prism T-Shirt for a
                        few weeks now, and it's been a versatile addition to my
                        wardrobe. The fabric is soft and breathable, and the
                        unique prism design adds a modern touch.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="grid gap-0.5 text-sm">
                        <h3 className="font-semibold">Alex Smith</h3>
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          3 weeks ago
                        </time>
                      </div>
                      <div className="flex items-center gap-0.5 ml-auto">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                      <p>
                        {`
                        I've been experimenting with my Acme Prism T-Shirt for a
                        few weeks now, and it's been a versatile addition to my
                        wardrobe. The fabric is soft and breathable, and the
                        unique prism design adds a modern touch.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-bold text-xl mb-4">Write a Review</h2>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <RadioGroup defaultValue="4" id="rating">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="rating-5" value="5" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <RadioGroupItem id="rating-4" value="4" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <RadioGroupItem id="rating-3" value="3" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <RadioGroupItem id="rating-2" value="2" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <RadioGroupItem id="rating-1" value="1" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="review">Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Write your review"
                    rows={4}
                  />
                </div>
                <Button className="justify-self-end" type="submit">
                  Submit Review
                </Button>
              </form>
            </div>
          </div>
          <div className="col-span-2">
            <div>
              <h2 className="font-bold text-2xl mb-4">Related Products</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative group">
                  <Link className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                  </Link>
                  <Image
                    alt="Related Product"
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                  <div className="flex-1 py-2">
                    <h3 className="font-semibold tracking-tight">
                      Acme Circles Tee
                    </h3>
                  </div>
                </div>
                <div className="relative group">
                  <Link className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                  </Link>
                  <Image
                    alt="Related Product"
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                  <div className="flex-1 py-2">
                    <h3 className="font-semibold tracking-tight">
                      Acme Stripes Hoodie
                    </h3>
                  </div>
                </div>
                <div className="relative group">
                  <Link className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                  </Link>
                  <Image
                    alt="Related Product"
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                  <div className="flex-1 py-2">
                    <h3 className="font-semibold tracking-tight">
                      Acme Dots Joggers
                    </h3>
                  </div>
                </div>
                <div className="relative group">
                  <Link className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                  </Link>
                  <Image
                    alt="Related Product"
                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                  <div className="flex-1 py-2">
                    <h3 className="font-semibold tracking-tight">
                      Acme Dots Joggers
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

function StarIcon(props: SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
