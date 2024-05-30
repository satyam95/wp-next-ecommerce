"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const BannerCarousel = () => {
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
            <SwiperSlide>
              <div className="h-80 w-full bg-[#eaeaea] rounded-md"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-80 w-full bg-[#eaeaea] rounded-md"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-80 w-full bg-[#eaeaea] rounded-md"></div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
