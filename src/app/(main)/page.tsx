import AdsRow from "@/components/AdsRow";
import { BannerCarousel } from "@/components/BannerCarousel";
import CategoryRow from "@/components/CategoryRow";
import FooterStrip from "@/components/FooterStrip";
import { ProductsCarousel } from "@/components/ProductsCarousel";

export default function Home() {
  return (
    <>
      <main>
        <BannerCarousel />
        <CategoryRow />
        <ProductsCarousel title="Trending Products" catSlug="shirt" />
        <AdsRow />
        <ProductsCarousel title="Trending Bags" catSlug="bag" />
        <FooterStrip />
      </main>
    </>
  );
}
