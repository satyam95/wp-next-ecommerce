import React from "react";

const AdsRow = () => {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-3 gap-2">
          <div className="w-full h-80 bg-[#eaeaea] rounded-md"></div>
          <div className="w-full h-80 bg-[#eaeaea] rounded-md"></div>
          <div className="w-full h-80 bg-[#eaeaea] rounded-md"></div>
        </div>
      </div>
    </section>
  );
};

export default AdsRow;