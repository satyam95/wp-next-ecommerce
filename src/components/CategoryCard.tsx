import Image from "next/image";
import Link from "next/link";
import React from "react";

type PropsType = {
  name: string;
  slug: string;
  image: any;
};

const CategoryCard = ({ name, slug, image }: PropsType) => {
  return (
    <div className="min-w-28 w-full">
      <Link className="w-full" href={`category/${slug}`}>
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          {image === null ? (
            <div className="w-full h-28 bg-[#eaeaea] rounded-md"></div>
          ) : (
            <Image
              src={image.sourceUrl}
              alt={image.altText}
              width={112}
              height={112}
              style={{
                aspectRatio: "112/112",
                objectFit: "cover",
              }}
              className="rounded-md"
            />
          )}
          <h3 className="text-base xl:text-lg font-semibold tracking-tight">{name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
