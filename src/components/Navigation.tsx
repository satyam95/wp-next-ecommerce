import { GET_MENUS } from "@/apollo/queries/getMenus";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  const { data } = useQuery(GET_MENUS);
  return (
    <nav className="hidden lg:flex items-center gap-4 ml-8">
      {data?.menu?.menuItems?.edges?.map((item: any) => (
        <Link
          key={item.node.id}
          className="text-sm font-medium hover:underline underline-offset-4"
          href={item.node.uri}
        >
          {item.node.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
