import { GET_PAGE_SEO_DATA } from "@/apollo/queries/getSeoData";
import { createMetadataFromSeo } from "@/lib/seoUtils";
import { getServerApolloClient } from "@/lib/apollo-server";
import ProductContent from "@/components/ProductContent";

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

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProductContent slug={params.slug} />;
}
