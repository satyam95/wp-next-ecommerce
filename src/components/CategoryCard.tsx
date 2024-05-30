import Link from "next/link";
import React from "react";

type PropsType = {
  name: string;
  slug: string;
};

const CategoryCard = ({ name, slug }: PropsType) => {
  return (
    <div>
      <Link href={`category/${slug}`}>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="w-28 h-28 bg-[#eaeaea] rounded-md"></div>
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
