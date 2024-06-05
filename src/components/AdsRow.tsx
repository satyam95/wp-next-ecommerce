"use client";
import { GET_ADS_BANNERS } from "@/apollo/queries/getAdsBanners";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";

const AdsRow = () => {
  const { data } = useQuery(GET_ADS_BANNERS);
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-3 gap-4">
          {data?.homeBanners?.edges.map((item: any) => (
            <Image
              key={item.node.bannerField.bannerimage.altText}
              src={item.node.bannerField.bannerimage.sourceUrl}
              alt={item.node.bannerField.bannerimage.altText || "Ad Banner 1"}
              height={745}
              width={555}
              className="object-cover w-full m-auto rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsRow;
