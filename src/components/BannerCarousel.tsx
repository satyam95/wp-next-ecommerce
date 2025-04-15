"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useQuery } from "@apollo/client";
import { GET_BANNER_CAROUSEL } from "@/apollo/queries/getBannerCarousel";
import Image from "next/image";
import { BannerCarouselSkeleton } from "./skeleton/BannerCarouselSkeleton";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const BannerCarousel = () => {
  const { data, loading } = useQuery(GET_BANNER_CAROUSEL);

  if (loading) {
    return <BannerCarouselSkeleton />;
  }

  return (
    <section>
      <div className="py-2 pb-8">
        <div className="container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {data?.bannerCarousels.edges.length > 0 ? (
              data?.bannerCarousels.edges.map((item: any) => (
                <SwiperSlide key={item.node.id}>
                  <Image
                    src={item.node.featuredImage.node.sourceUrl}
                    alt={
                      item.node.featuredImage.node.altText || "Ad Banner"
                    }
                    width={1336}
                    height={320}
                    priority
                    className="object-fit rounded-md"
                  />
                </SwiperSlide>
              ))
            ) : (
              <p>No banners available</p>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
