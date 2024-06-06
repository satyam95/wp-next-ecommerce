import { GET_MENUS } from "@/apollo/queries/getMenus";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import React, { SVGProps } from "react";

const Navigation = () => {
  const { data } = useQuery(GET_MENUS);
  return (
    <nav className="hidden lg:flex items-center gap-4 ml-8">
      <ul className="flex items-center gap-6">
        {data?.menu?.menuItems?.edges?.map((item: any) => (
          <li key={item.node.id} className="relative ">
            <div className="group ">
              <Link
                className="text-sm font-medium flex items-center gap-1"
                href={item.node.uri}
              >
                {item.node.label}{" "}
                {item.node?.childItems?.edges.length === 0 ? (
                  ""
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </Link>
              {item.node?.childItems?.edges.length === 0 ? (
                ""
              ) : (
                <ul className="absolute z-10 top-0 left-0 mt-5 py-1 w-48 rounded-md bg-white shadow-lg hidden group-hover:block">
                  {item.node?.childItems?.edges.map((subitem: any) => (
                    <li key={subitem.node.id} className="px-4 py-2 text-sm font-medium hover:bg-gray-100">
                      <Link href={subitem.node.uri}>{subitem.node.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
