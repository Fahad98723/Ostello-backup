import React, { useRef } from "react";
import location991 from "../../../../assets/Pages/Home/images/location99(1).webp";
import location992 from "../../../../assets/Pages/Home/images/location99(2).webp";
import location993 from "../../../../assets/Pages/Home/images/location99(3).webp";
import location994 from "../../../../assets/Pages/Home/images/location99(4).webp";
import location995 from "../../../../assets/Pages/Home/images/location99(5).webp";
import useScreenWidth from "../../../hooks/useScreenWidth";
import dynamic from "next/dynamic";
const InstituteDisplayCard = dynamic(
  () => {
    return import("./InstituteDisplayCard");
  },
  { ssr: false }
);
const Carousel = dynamic(
  () => {
    return import("react-elastic-carousel");
  },
  { ssr: false }
);

export default function InstituteDisplay() {
  const items = [
    { id: 1, img: location991 },
    { id: 2, img: location992 },
    { id: 3, img: location993 },
    { id: 4, img: location994 },
    { id: 5, img: location995 },
  ];
  const carouselRef = useRef(null); // declare at state level
  let resetTimeout;
  const { screenWidth } = useScreenWidth();
  return (
    <div className="  rounded-xl w-full relative md:px-0  px-2   h-[350px]">
      <Carousel
        ref={carouselRef}
        enableMouseSwipe={true}
        showArrows={false}
        itemsToShow={1}
        className=""
        enableAutoPlay={true}
        autoPlaySpeed={1000}
        // onNextEnd={({ index }) => {
        //   if (index === items.length - 1) {
        //     clearTimeout(resetTimeout);
        //     resetTimeout = setTimeout(() => {
        //       carouselRef?.current?.goTo(0);
        //     }, 1000); // same time
        //   }
        // }}
        pagination={screenWidth > 768 ? true : false}
        breakPoints={[
          { width: 1, itemsToShow: 1 },
          { width: 600, itemsToShow: 1 },
          { width: 900, itemsToShow: 1 },
        ]}
      >
        {items?.map((item, index) => (
          <InstituteDisplayCard item={item} key={index} />
        ))}
      </Carousel>
    </div>
  );
}
