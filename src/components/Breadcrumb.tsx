import React from "react";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  const formatLabel = (value: string): string => {
    if (value.toLowerCase() === "category" || value.toLowerCase() === "product") {
      return "Shop";
    }
    return value
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const items = [
    { label: "Home", href: "/" },
    ...pathnames.map((value: string, index: number) => {
      const modifiedLabel = formatLabel(value);

      const modifiedHref =
        value.toLowerCase() === "category" || value.toLowerCase() === "product"
          ? "/shop"
          : `/${pathnames.slice(0, index + 1).join("/")}`;

      return {
        label: modifiedLabel,
        href: modifiedHref,
      };
    }),
  ];

  return (
    <nav aria-label="breadcrumb" className="text-sm font-medium">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-500">{item.label}</span>
              )}
            </li>
            {index < items.length - 1 && (
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
};

export default Breadcrumb;
