import dynamic from "next/dynamic";
import React from "react";
const MarketingDisplay = dynamic(
  () => {
    return import("./MarketingDisplay");
  },
  { ssr: false }
);
const TwoRowCard = dynamic(
  () => {
    return import("./TwoRowCard");
  },
  { ssr: false }
);
const TwoColCard = dynamic(
  () => {
    return import("./TwoColCard");
  },
  { ssr: false }
);
const ListingCard = dynamic(
  () => {
    return import("./ListingCard");
  },
  { ssr: false }
);
const InstituteDisplay = dynamic(
  () => {
    return import("./InstituteDisplay");
  },
  { ssr: false }
);
const DescTopView = () => {
  return (
    <div className="hidden  lg:block  text-white  ">
      <div className="flex">
        <TwoRowCard />
        <div className="flex flex-col ml-5  space-y-5">
          <div className="grid grid-cols-2 justify-between   ">
            <InstituteDisplay />
            <ListingCard />
          </div>
          <TwoColCard />
        </div>
      </div>
      <MarketingDisplay />
    </div>
  );
};

export default DescTopView;
