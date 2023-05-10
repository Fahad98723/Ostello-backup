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

const MobileView = () => {
  return (
    <div className="lg:hidden w-full mx-auto space-y-5">
      <TwoRowCard />
      <InstituteDisplay />
      <ListingCard />
      <TwoColCard />
      <MarketingDisplay />
    </div>
  );
};

export default MobileView;
