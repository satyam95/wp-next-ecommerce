"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductGallery = ({ images }: any) => {
  const [mainImage, setMainImage] = useState(images?.edges[0] || null);

  useEffect(() => {
    if (images?.edges.length > 0) {
      setMainImage(images.edges[0]);
    }
  }, [images]);

  if (!images?.edges || images.edges.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
      <div className="sm:w-32 flex sm:flex-col gap-2 overflow-x-auto justify-between">
        {images?.edges.map((image: any) => (
          <Image
            key={image?.node?.id}
            src={image?.node?.sourceUrl}
            alt={image?.node?.id}
            width={128}
            height={128}
            className="rounded-lg h-20 w-20 sm:w-32 sm:h-32 cursor-pointer object-cover aspect-square"
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
      {mainImage !== null && (
        <Image
          alt={`${mainImage?.node.id} main image`}
          className="grow w-full aspect-square border border-gray-200 rounded-lg object-cover overflow-hidden"
          height={300}
          src={mainImage?.node.sourceUrl}
          width={300}
        />
      )}
    </div>
  );
};

export default ProductGallery;
