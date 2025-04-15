import { GET_PRODUCTS } from "@/apollo/queries/getProducts";
import { GET_MIN_MAX_PRICE } from "@/apollo/queries/getMinMaxPrice";
import { GET_PRODUCT_ATTRIBUTES } from "@/apollo/queries/getProductAttributes";
import { GET_PRODUCT_CATEGORIES } from "@/apollo/queries/getProductCategories";
import Breadcrumb from "@/components/Breadcrumb";
import { getServerApolloClient } from "@/lib/apollo-server";
import FiltersClient from "@/components/FiltersClient";
import ProductsClient from "@/components/ProductsClient";
import { GET_PAGE_SEO_DATA } from "@/apollo/queries/getSeoData";
import { createMetadataFromSeo } from "@/lib/seoUtils";
import { Suspense } from "react";
import { ShopPageSkeleton } from "@/components/skeleton/ShopPageSkeleton";

const getOrderbyValue = (sort: string) => {
  switch (sort) {
    case "priceHighToLow":
      return [{ field: "PRICE", order: "DESC" }];
    case "priceLowToHigh":
      return [{ field: "PRICE", order: "ASC" }];
    case "customerRating":
      return [{ field: "RATING", order: "DESC" }];
    default:
      return [
        { field: "RATING", order: "ASC" },
        { field: "PRICE", order: "ASC" },
      ];
  }
};

export async function generateMetadata() {
  const client = getServerApolloClient();
  const { data } = await client.query({
    query: GET_PAGE_SEO_DATA,
    variables: { id: "/wpecom.satyam.works/shop/" },
  });
  return createMetadataFromSeo(data.page.seo);
}

interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const client = getServerApolloClient();
  const productsPerPage = 9;
  const currentPage = parseInt((searchParams.page as string) || "1", 10);
  const afterCursor = searchParams.after as string | undefined;

  const selectedCategories = searchParams.categories
    ? (searchParams.categories as string).split(",")
    : [];
  const urlSizes = searchParams.size
    ? (searchParams.size as string).split(",")
    : [];
  const urlColors = searchParams.color
    ? (searchParams.color as string).split(",")
    : [];
  const urlMinPrice = searchParams.minPrice
    ? Number(searchParams.minPrice)
    : undefined;
  const urlMaxPrice = searchParams.maxPrice
    ? Number(searchParams.maxPrice)
    : undefined;
  const urlSort = (searchParams.sort as string) || "";
  const orderby = getOrderbyValue(urlSort);

  // Fetch all product categories
  const { data: categoriesData } = await client.query({
    query: GET_PRODUCT_CATEGORIES,
  });
  const categories = categoriesData.productCategories.nodes;

  // Fetch min/max price
  const { data: minMaxData } = await client.query({
    query: GET_MIN_MAX_PRICE,
    variables: {
      categoryIn: selectedCategories.length > 0 ? selectedCategories : undefined,
    },
  });

  // Fetch product attributes (sizes and colors)
  const { data: attributesData } = await client.query({
    query: GET_PRODUCT_ATTRIBUTES,
  });

  const sizeAttribute = {
    name: "pa_size",
    options: attributesData.allPaSize.nodes.map((node: any) => ({
      count: node.count,
      name: node.name,
    })),
  };
  const colorAttribute = {
    name: "pa_color",
    options: attributesData.allPaColor.nodes.map((node: any) => ({
      count: node.count,
      name: node.name,
    })),
  };

  // Fetch products with cursor-based pagination
  const first = productsPerPage;
  const { data } = await client.query({
    query: GET_PRODUCTS,
    variables: {
      first,
      after: afterCursor || null, // Use null if no cursor
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      sizes: urlSizes.length > 0 ? urlSizes : undefined,
      colors: urlColors.length > 0 ? urlColors : undefined,
      orderby,
    },
  });

  const products = data.products.edges.map((edge: any) => edge.node);
  const pageInfo = data.products.pageInfo;
  const totalCount = data.products.found || data.products.pageInfo.total; // Use 'found' if available
  const totalPages = Math.ceil(totalCount / productsPerPage);
  const endCursor = pageInfo.endCursor;

  // console.log(`Products fetched: ${products.length}, Total: ${totalCount}, Cursor: ${endCursor}`);

  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Browse our full range of products.
            </p>
          </div>
          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            <FiltersClient
              categories={categories}
              sizeAttribute={sizeAttribute}
              colorAttribute={colorAttribute}
              minPrice={Number(minMaxData?.minPrice?.nodes[0]?.price) || 0}
              maxPrice={Number(minMaxData?.maxPrice?.nodes[0]?.price) || 100}
              currentCategories={selectedCategories}
              currentSizes={urlSizes}
              currentColors={urlColors}
              currentMinPrice={urlMinPrice}
              currentMaxPrice={urlMaxPrice}
            />
            <div>
              <div className="mb-4">
                <Breadcrumb />
              </div>
              <ProductsClient
                products={products}
                totalPages={totalPages}
                currentPage={currentPage}
                searchParams={searchParams}
                totalCount={totalCount}
                currentCategories={selectedCategories}
                currentSizes={urlSizes}
                currentColors={urlColors}
                currentMinPrice={urlMinPrice}
                currentMaxPrice={urlMaxPrice}
              />
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}