"use client";
import { GET_ADS_BANNERS } from "@/apollo/queries/getAdsBanners";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import AdsRowSkeleton from "./skeleton/AdsRowSkeleton";

const AdsRow = () => {
  const { data, loading } = useQuery(GET_ADS_BANNERS);

  if (loading) {
    return <AdsRowSkeleton />;
  }

  return (
    <section className="w-full py-4 xl:py-8">
      <div className="container w-full px-4 md:px-6">
        <div className="flex justify-between gap-4">
          {data?.homeBanners?.edges.map((item: any) => (
            <div
              key={item?.node.bannerField.bannerimage.altText}
              className="relative w-full h-[144px] sm:h-[280px] lg:h-[386px] xl:h-[550px]"
            >
              <Image
                src={item?.node.bannerField.bannerimage.sourceUrl}
                alt={
                  item?.node.bannerField.bannerimage.altText || "Ad Banner 1"
                }
                fill
                priority
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsRow;
