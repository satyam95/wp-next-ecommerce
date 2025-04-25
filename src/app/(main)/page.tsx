import { GET_PAGE_SEO_DATA } from "@/apollo/queries/getSeoData";
import AdsRow from "@/components/AdsRow";
import { BannerCarousel } from "@/components/BannerCarousel";
import CategoryRow from "@/components/CategoryRow";
import FooterStrip from "@/components/FooterStrip";
import { ProductsCarousel } from "@/components/ProductsCarousel";
import { getServerApolloClient } from "@/lib/apollo-server";
import { createMetadataFromSeo } from "@/lib/seoUtils";

export async function generateMetadata() {
  const client = getServerApolloClient();
  const { data } = await client.query({
    query: GET_PAGE_SEO_DATA,
    variables: { id: "/" },
  });
  return createMetadataFromSeo(data.page.seo);
}

export default function Home() {
  return (
    <>
      <main>
        <BannerCarousel />
        <CategoryRow />
        <ProductsCarousel title="Trending Products" catSlug="shirt" />
        <AdsRow />
        <ProductsCarousel title="Trending Bags" catSlug="bag" />
        {/* <FooterStrip /> */}
      </main>
    </>
  );
}
