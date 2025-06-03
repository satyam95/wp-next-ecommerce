"use client";

import { GET_PRODUCT } from "@/apollo/queries/getProduct";
import { GET_PRODUCT_ATTRIBUTES_BY_PRODUCT } from "@/apollo/queries/getProductAttributesByProduct";
import ProductGallery from "@/components/ProductGallery";
import { StarRating } from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import Breadcrumb from "@/components/Breadcrumb";
import ProductActions from "@/components/ProductActions";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { ProductPageSkeleton } from "@/components/skeleton/ProductPageSkeleton";
import ProductCard from "./ProductCard";

export default function ProductContent({ slug }: { slug: string }) {
  // Fetch product data
  const { data: productData, loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: { id: slug },
  });

  // Fetch product attributes
  const { data: attributesData, loading: attributesLoading } = useQuery(
    GET_PRODUCT_ATTRIBUTES_BY_PRODUCT,
    {
      variables: { id: slug },
    }
  );

  if (productLoading || attributesLoading) {
    return <ProductPageSkeleton />;
  }

  const product = productData.product;
  const attributes = attributesData.product.attributes.nodes;

  return (
    <div className="container px-4 sm:px-6 mx-auto py-6 sm:py-8 lg:py-12">
      <div className="flex flex-col gap-12">
        <div className="flex items-center flex-col lg:flex-row gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* Product Gallery */}
          <div className="flex flex-col gap-4 md:gap-10 items-start w-full lg:w-1/2">
            <ProductGallery images={product.galleryImages} />
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-start w-full lg:w-1/2">
            <div className="mb-2">
              <Breadcrumb />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
              <div className="text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
              <div className="flex items-center justify-start gap-4">
                <StarRating rating={product.averageRating} />
              </div>
              <div className="text-4xl font-bold">{product.price}</div>

              {/* Product Attributes */}
              {/* <div className="flex flex-col gap-4">
                {attributes.map((attribute: any) => (
                  <div className="flex flex-col gap-2" key={attribute.id}>
                    <Label htmlFor={attribute.name}>{attribute.label}</Label>
                    <RadioGroup
                      className="flex flex-wrap items-center gap-2"
                      id={attribute.name}
                    >
                      {attribute.terms.nodes.map((term: any) => (
                        <Label
                          key={term.id}
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                          htmlFor={term.id}
                        >
                          <RadioGroupItem id={term.id} value={term.slug} />
                          {term.name}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div> */}

              {/* Interactive Actions */}
              <ProductActions
                productId={product.databaseId}
                stockStatus={product.stockStatus}
                soldIndividually={product.soldIndividually}
                stockQuantity={product.stockQuantity}
              />

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
                    {product.productTags?.edges.map(
                      (tag: any, index: number) => (
                        <li key={tag.node.id}>
                          {tag.node.name}
                          {index < product.productTags.edges.length - 1 && ","}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Product Description */}
        <div className="w-full">
          <div className="flex flex-col gap-4 items-start">
            <h2 className="font-bold text-2xl">Product Description</h2>
            <div
              className="text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
        {/* Reviews */}
        {product.reviews?.edges.length > 0 && (
          <div className="w-full">
            <h2 className="font-bold text-2xl mb-4">Reviews</h2>
            <div className="flex flex-col gap-6">
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
        <div className="w-full flex flex-col gap-6">
          <h2 className="font-bold text-2xl">Related Products</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {product.related?.edges?.map((relatedProduct: any) => (
              <ProductCard
                key={relatedProduct.node.id}
                image={relatedProduct.node.image}
                title={relatedProduct.node.name}
                excerpt={relatedProduct.node.shortDescription}
                slug={relatedProduct.node.slug}
                price={relatedProduct.node.price}
                rating={relatedProduct.node.averageRating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
