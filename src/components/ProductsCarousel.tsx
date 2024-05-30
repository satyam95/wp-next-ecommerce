"use client";
import Link from "next/link";
import React, { SVGProps } from "react";
import { Card, CardContent } from "./ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

type PropsType = {
  title: string;
  catSlug: string;
  data: ItemPropsType[];
};

type ItemPropsType = {
  id: number;
  name: string;
  slug: string;
  price: number;
};

export const ProductsCarousel = ({ title, data, catSlug }: PropsType) => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-2 md:mb-4 lg:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          <Link
            className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href={`category/${catSlug}`}
          >
            View All
          </Link>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          className="mySwiper"
          navigation={true}
          modules={[Navigation]}
        >
          {data.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`product/${product.slug}`}>
                <div className="p-2">
                  <Card>
                    <Image
                      alt="Product Image"
                      className="object-cover w-full aspect-square rounded-t-lg"
                      height={300}
                      src="/placeholder.svg"
                      width={300}
                    />
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        ${product.price}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
