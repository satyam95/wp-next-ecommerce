// pages/category/[slug]/page.tsx
import { GET_PRODUCTS_BY_CATEGORY } from "@/apollo/queries/getProductsByCategory";
import { GET_MIN_MAX_PRICE_BY_CATEGORY } from "@/apollo/queries/getMinMaxPriceByCategory";
import { GET_PRODUCT_ATTRIBUTES_BY_CATEGORY } from "@/apollo/queries/getProductAttributesByCategory";
import Breadcrumb from "@/components/Breadcrumb";
import { getServerApolloClient } from "@/lib/apollo-server";
import FiltersClient from "./FiltersClient";
import ProductsClient from "./ProductsClient";
import { createMetadataFromSeo } from "@/lib/seoUtils";
import { GET_PRODUCT_CATEGORY_SEO_DATA } from "@/apollo/queries/getProductCategorySeoData";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const uri = `product-category/${params.slug}`;
  const client = getServerApolloClient();
  const { data } = await client.query({
    query: GET_PRODUCT_CATEGORY_SEO_DATA,
    variables: { id: uri },
  });
  return createMetadataFromSeo(data.productCategory.seo);
}

// Define props type for the server component
interface CategoryPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Utility to map sort query param to GraphQL orderby input
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

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const categorySlug = params.slug;
  const currentPage = parseInt((searchParams.page as string) || "1", 10);
  const productsPerPage = 9;

  // Extract filter parameters from searchParams
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

  // Initialize Apollo Client for server-side data fetching
  const client = getServerApolloClient();

  // Fetch min/max price
  const { data: minMaxData } = await client.query({
    query: GET_MIN_MAX_PRICE_BY_CATEGORY,
    variables: { category1: categorySlug },
  });

  // Fetch product attributes (sizes and colors)
  const { data: attributesData } = await client.query({
    query: GET_PRODUCT_ATTRIBUTES_BY_CATEGORY,
    variables: { id: categorySlug },
  });

  // Fetch products with pagination and filters
  const first = currentPage * productsPerPage;
  const { data } = await client.query({
    query: GET_PRODUCTS_BY_CATEGORY,
    variables: {
      slug: [categorySlug],
      first,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      sizes: urlSizes.length > 0 ? urlSizes : undefined,
      colors: urlColors.length > 0 ? urlColors : undefined,
      orderby,
    },
  });

  // Extract data from the GraphQL response
  const categoryNode = data.productCategories.edges[0]?.node;
  const allProducts = categoryNode.products.edges.map((edge: any) => edge.node);
  const products = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalCount = categoryNode.products.pageInfo.total; // Assuming count reflects filtered total; adjust if schema provides products.totalCount
  const totalPages = Math.ceil(totalCount / productsPerPage);
  
  // Extract filter attributes
  const sizeAttribute = attributesData?.productCategory?.allAttributes?.find(
    (attr: any) => attr.name.toLowerCase().includes("size")
  );
  const colorAttribute = attributesData?.productCategory?.allAttributes?.find(
    (attr: any) => attr.name.toLowerCase().includes("color")
  );

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-8">
        {/* Category Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {categoryNode.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {categoryNode.description}
          </p>
        </div>
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <FiltersClient
            sizeAttribute={sizeAttribute}
            colorAttribute={colorAttribute}
            minPrice={Number(minMaxData?.minPrice?.nodes[0]?.price) || 0}
            maxPrice={Number(minMaxData?.maxPrice?.nodes[0]?.price) || 100}
            currentSizes={urlSizes}
            currentColors={urlColors}
            currentMinPrice={urlMinPrice}
            currentMaxPrice={urlMaxPrice}
            categorySlug={categorySlug}
          />
          {/* Main Content */}
          <div>
            <div className="mb-4">
              <Breadcrumb />
            </div>
            <ProductsClient
              products={products}
              totalPages={totalPages}
              currentPage={currentPage}
              categorySlug={categorySlug}
              searchParams={searchParams}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
