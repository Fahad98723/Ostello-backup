import React from "react";
import dynamic from "next/dynamic";

const MobileView = dynamic(
  () => {
    return import("./MobileView");
  },
  { ssr: false }
);
const DescTopView = dynamic(
  () => {
    return import("./DescTopView");
  },
  { ssr: false }
);
const OfferText = dynamic(
  () => {
    return import("./OfferText");
  },
  { ssr: false }
);

export default function OstelloOffers() {
  return (
    <section className=" mx-auto   lg:px-16 my-10 space-y-10  max-w-6xl ">
      <div className="  w-full lg:ml-10">
        <OfferText />
        <DescTopView />
        <MobileView />
      </div>
    </section>
  );
}
