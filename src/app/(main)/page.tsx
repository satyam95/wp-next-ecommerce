import AdsRow from "@/components/AdsRow";
import { BannerCarousel } from "@/components/BannerCarousel";
import CategoryRow from "@/components/CategoryRow";
import FooterStrip from "@/components/FooterStrip";
import { ProductsCarousel } from "@/components/ProductsCarousel";
import { categoryItems, fearturedProductItems } from "@/constants/staticData";

export default function Home() {
  return (
    <>
      <main>
        <BannerCarousel />
        <CategoryRow categoryItems={categoryItems} />
        <ProductsCarousel
          title="Featured Products"
          catSlug="featured-products"
          data={fearturedProductItems}
        />
        <AdsRow />
        <ProductsCarousel
          title="Frequently Bought Products"
          catSlug="featured-products"
          data={fearturedProductItems}
        />
        <FooterStrip />
      </main>
    </>
  );
}
