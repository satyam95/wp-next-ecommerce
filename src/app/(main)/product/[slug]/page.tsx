// pages/product/[slug].tsx (or your file path)
import { GET_PRODUCT } from "@/apollo/queries/getProduct";
import { GET_PRODUCT_ATTRIBUTES_BY_PRODUCT } from "@/apollo/queries/getProductAttributesByProduct";
import ProductGallery from "@/components/ProductGallery";
import { StarRating } from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "@/components/ProductActions"; // Client component for interactivity
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServerApolloClient } from "@/lib/apollo-server";
import { GET_PAGE_SEO_DATA } from "@/apollo/queries/getSeoData";
import { createMetadataFromSeo } from "@/lib/seoUtils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const uri = `product/${params.slug}`;
  const client = getServerApolloClient();
  const { data } = await client.query({
    query: GET_PAGE_SEO_DATA,
    variables: { id: uri },
  });
  return createMetadataFromSeo(data.page.seo);
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Initialize Apollo Client for server-side queries
  const client = getServerApolloClient();

  // Fetch product data
  const { data: productData } = await client.query({
    query: GET_PRODUCT,
    variables: { id: params.slug },
  });

  // Fetch product attributes
  const { data: attributesData } = await client.query({
    query: GET_PRODUCT_ATTRIBUTES_BY_PRODUCT,
    variables: { id: params.slug },
  });

  const product = productData.product;
  const attributes = attributesData.product.attributes.nodes;

  return (
    <div className="container px-6 mx-auto py-12">
      <div className="mb-4">
        <Breadcrumb />
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* Product Gallery */}
        <div className="grid gap-4 md:gap-10 items-start">
          <ProductGallery images={product.galleryImages} />
        </div>

        {/* Product Details */}
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />
            <div className="flex items-center gap-4">
              <StarRating rating={product.averageRating} />
            </div>
            <div className="text-4xl font-bold">{product.price}</div>

            {/* Product Attributes */}
            <div className="grid gap-4">
              {attributes.map((attribute: any) => (
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
              ))}
            </div>

            {/* Interactive Actions */}
            <ProductActions
              productId={product.databaseId}
              stockStatus={product.stockStatus}
              soldIndividually={product.soldIndividually}
              stockQuantity={product.stockQuantity}
            />

            {/* Check Delivery */}
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="zipcode">Check Delivery</Label>
              <div className="flex items-center gap-2">
                <Input id="zipcode" placeholder="Enter zip code" type="text" />
                <Button variant="outline">Check</Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-col gap-2">
              <div className="text-sm">SKU: {product.sku}</div>
              <div className="text-sm flex gap-1">
                Categories:
                <ul className="flex gap-1">
                  {product.productCategories?.edges.map(
                    (category: any, index: number) => (
                      <li key={category.node.id}>
                        {category.node.name}
                        {index < product.productCategories.edges.length - 1 &&
                          ","}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="text-sm flex gap-1">
                Tags:
                <ul className="flex gap-1">
                  {product.productTags?.edges.map((tag: any, index: number) => (
                    <li key={tag.node.id}>
                      {tag.node.name}
                      {index < product.productTags.edges.length - 1 && ","}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="col-span-2">
          <div className="grid gap-4 md:gap-10 items-start">
            <h2 className="font-bold text-2xl">Product Description</h2>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>

        {/* Reviews */}
        {product.reviews?.edges.length > 0 && (
          <div className="col-span-2">
            <h2 className="font-bold text-2xl mb-4">Reviews</h2>
            <div className="grid gap-6">
              {product.reviews.edges.map((review: any) => (
                <ReviewCard
                  key={review.node.id}
                  avatarUrl={review.node.author.node.avatar.url}
                  authorName={review.node.author.node.name}
                  postedDate={review.node.date}
                  rating={review.rating}
                  reviewContent={review.node.content}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="col-span-2">
          <h2 className="font-bold text-2xl mb-4">Related Products</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {product.related?.edges?.map((relatedProduct: any) => (
              <div className="relative group" key={relatedProduct.node.id}>
                <Link
                  className="absolute inset-0 z-10"
                  href={`/product/${relatedProduct.node.slug}`}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  alt={relatedProduct.node.image.id}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  height={300}
                  src={relatedProduct.node.image.sourceUrl}
                  width={300}
                />
                <div className="flex-1 py-2">
                  <h3 className="font-semibold tracking-tight">
                    {relatedProduct.node.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
