import React from "react";

const NavigationSkeleton = () => {
  return (
    <nav className="hidden lg:flex items-center gap-4 ml-8">
      <ul className="flex items-center gap-6">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="relative">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationSkeleton; 