"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ImagesType {
  images: string[];
}

const ProductGallery = ({ images }: ImagesType) => {
  const [mainImage, setMainImage] = useState(images[0]);
  return (
    <div className="flex gap-4">
      <div className="w-32 flex flex-col gap-3">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="image"
            width={104}
            height={104}
            className="rounded-lg cursor-pointer"
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
      <Image
        alt="Product Image"
        className="grow aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
        height={300}
        src={mainImage}
        width={300}
      />
    </div>
  );
};

export default ProductGallery;
