"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { truncateHTML } from "@/lib/truncate";
import { Star } from "lucide-react";

type PropsType = {
  title: string;
  excerpt: string;
  price: string;
  slug: string;
  image: any;
  rating?: number;
};

const ProductCard = ({ title, excerpt, price, slug, image, rating }: PropsType) => {
  const [truncatedDescription, setTruncatedDescription] = useState(excerpt); // Use original text during SSR

  useEffect(() => {
    setTruncatedDescription(truncateHTML(excerpt, 10)); // Update on client-side
  }, [excerpt]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link href={`/product/${slug}`}>
        <Image
          alt={image?.altText || "Product Image"}
          className="w-full h-60 object-cover"
          height={300}
          src={image?.sourceUrl || "/placeholder.svg"}
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
          width={400}
        />
      </Link>
      <div className="p-4 space-y-2">
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        <div className="hidden sm:block text-gray-500 dark:text-gray-400 text-sm">
          {truncatedDescription}
        </div>
        <div className="flex items-center justify-between">
          {rating !== null && (
            <div className="flex items-center gap-1">
              <Star
                className={`w-4 h-4 ${
                  rating === 0
                    ? "fill-gray-400 text-gray-400"
                    : "fill-yellow-400 text-yellow-400"
                }`}
              />
              <span className="text-sm">{rating}</span>
            </div>
          )}
          <div className="text-gray-500 text-sm sm:text-lg">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
