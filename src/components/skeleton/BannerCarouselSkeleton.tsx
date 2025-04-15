import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const BannerCarouselSkeleton = () => {
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
            {[...Array(3)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[320px] bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}; 