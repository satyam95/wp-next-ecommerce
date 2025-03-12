"use client";

import ProductGallery from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { SVGProps, useState } from "react";
import { GET_PRODUCT } from "@/apollo/queries/getProduct";
import { StarRating } from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import Breadcrumb from "@/components/Breadcrumb";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GET_PRODUCT_ATTRIBUTES_BY_PRODUCT } from "@/apollo/queries/getProductAttributesByProduct";
import { useCartActions } from "@/redux/useCartActions";

export default function Category({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const productSlug = params.slug;
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: productSlug },
  });
  const { data: productAttributes } = useQuery(
    GET_PRODUCT_ATTRIBUTES_BY_PRODUCT,
    {
      variables: { id: productSlug },
    }
  );
  
  const { addToCart, loading: cartLoading } = useCartActions();

  const handleAddToCart = async () => {
    try {
      await addToCart(data.product.databaseId, quantity);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <div className="container px-6 mx-auto py-12">
        <div className="mb-4">
          <Breadcrumb />
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div className="grid gap-4 md:gap-10 items-start">
            <ProductGallery images={data?.product?.galleryImages} />
          </div>
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl lg:text-4xl">
                {data?.product?.name}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.product?.shortDescription,
                }}
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  <StarRating rating={data?.product?.averageRating} />
                </div>
              </div>
              <div className="text-4xl font-bold">{data?.product?.price}</div>
              <div className="grid gap-4">
                {productAttributes?.product?.attributes?.nodes.map(
                  (attribute: any) => (
                    <div className="grid gap-2" key={attribute.id}>
                      <Label htmlFor={attribute.name}>{attribute.label}</Label>
                      <RadioGroup
                        className="flex flex-wrap items-center gap-2"
                        id={attribute.name}
                      >
                        {attribute.terms.nodes.map((term: any) => (
                          <Label
                            key={term.id}
                            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            htmlFor={term.id}
                          >
                            <RadioGroupItem id={term.id} value={term.slug} />
                            {term.name}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  )
                )}
              </div>
              {!data?.product?.soldIndividually && (
                <div className="flex items-center gap-2">
                  <Button
                    className="w-8 h-8 p-0 flex items-center justify-center"
                    variant="outline"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <div className="text-base font-medium">{quantity}</div>
                  <Button
                    className="w-8 h-8 p-0 flex items-center justify-center"
                    variant="outline"
                    onClick={() => {
                      if (quantity < data?.product?.stockQuantity) {
                        setQuantity(quantity + 1);
                      }
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                  {data?.product?.stockStatus === "IN_STOCK" ? (
                    <>
                      <Button
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={cartLoading}
                      >
                        Add to cart
                      </Button>
                      <Button size="lg" variant="outline">
                        Buy Now
                      </Button>
                    </>
                  ) : (
                    <p>Out of stock</p>
                  )}
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
              <div className="flex flex-col gap-2">
                <div className="text-sm">SKU: {data?.product?.sku}</div>
                <div className="text-sm flex gap-1">
                  Categories:
                  <ul className="flex gap-1">
                    {data?.product?.productCategories?.edges.map(
                      (category: any, index: number) => (
                        <li key={category.node.id}>
                          {category.node.name}
                          {index <
                            data.product.productCategories.edges.length - 1 &&
                            ","}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="text-sm flex gap-1">
                  Tags:
                  <ul className="flex gap-1">
                    {data?.product?.productTags?.edges.map(
                      (tag: any, index: number) => (
                        <li key={tag.node.id}>
                          {tag.node.name}
                          {index < data.product.productTags.edges.length - 1 &&
                            ","}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid gap-4 md:gap-10 items-start">
              <div className="grid gap-4">
                <h2 className="font-bold text-2xl">Product Description</h2>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: data?.product?.description,
                  }}
                />
              </div>
            </div>
          </div>
          {data?.product?.reviews?.edges.length > 0 && (
            <div className="col-span-2">
              <div>
                <h2 className="font-bold text-2xl mb-4">Reviews</h2>
                <div className="grid gap-6">
                  {data?.product?.reviews?.edges.map((review: any) => (
                    <ReviewCard
                      key={review?.node?.id}
                      avatarUrl={review?.node?.author?.node?.avatar?.url}
                      authorName={review?.node?.author?.node?.name}
                      postedDate={review?.node?.date}
                      rating={review?.rating}
                      reviewContent={review?.node?.content}
                    />
                  ))}
                </div>
              </div>
              {/* <div className="mt-4">
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
            </div> */}
            </div>
          )}
          <div className="col-span-2">
            <div>
              <h2 className="font-bold text-2xl mb-4">Related Products</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data?.product?.related?.edges?.map((product: any) => (
                  <div className="relative group" key={product.node.id}>
                    <Link
                      className="absolute inset-0 z-10"
                      href={`/product/${product.node.slug}`}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <Image
                      alt={product.node.image.id}
                      className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                      height={300}
                      src={product.node.image.sourceUrl}
                      width={300}
                    />
                    <div className="flex-1 py-2">
                      <h3 className="font-semibold tracking-tight">
                        {product.node.name}
                      </h3>
                    </div>
                  </div>
                ))}
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
