import React, { useRef } from "react";
import marketing1 from "../../../../assets/Pages/Home/images/unlimited.png";
import marketing2 from "../../../../assets/Pages/Home/images/unlimited (1).png";
import marketing3 from "../../../../assets/Pages/Home/images/unlimited (2).png";
import marketing4 from "../../../../assets/Pages/Home/images/unlimited (3).png";
import marketingMobile1 from "../../../../assets/Pages/Home/images/unlimitedMobile (1).png";
import marketingMobile2 from "../../../../assets/Pages/Home/images/unlimitedMobile (2).png";
import marketingMobile3 from "../../../../assets/Pages/Home/images/unlimitedMobile (3).png";

import useScreenWidth from "../../../hooks/useScreenWidth";
import Image from "next/image";
import dynamic from "next/dynamic";
import Carousel from "react-elastic-carousel";

export default function MarketingDisplay() {
  const items = [
    { id: 1, img: marketing1 },
    { id: 2, img: marketing2 },
    { id: 3, img: marketing3 },
    { id: 4, img: marketing4 },
  ];
  const mobileItems = [
    { id: 1, img: marketingMobile1 },
    { id: 2, img: marketingMobile2 },
    { id: 3, img: marketingMobile3 },
  ];
  const carouselRef = useRef(null); // declare at state level
  let resetTimeout;
  const { screenWidth } = useScreenWidth();
  return (
    <div className=" px-2 mt-4 rounded-xl w-full">
      <div className="block md:hidden ">
        <Carousel
          ref={carouselRef}
          enableMouseSwipe={true}
          showArrows={false}
          itemsToShow={1}
          className=""
          enableAutoPlay={true}
          autoPlaySpeed={4000}
          onNextEnd={({ index }) => {
            if (index === mobileItems.length - 1) {
              clearTimeout(resetTimeout);
              resetTimeout = setTimeout(() => {
                carouselRef?.current?.goTo(0);
              }, 1000); // same time
            }
          }}
          pagination={false}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 600, itemsToShow: 1 },
            { width: 900, itemsToShow: 1 },
          ]}
        >
          {mobileItems?.map((item, index) => (
            <div key={index}>
              <Image
                width={380}
                height={380}
                sizes="100vw"
                src={item.img.src}
                className="w-full h-full min-w-[380px]  rounded-xl"
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="hidden md:block">
        <Carousel
          ref={carouselRef}
          enableMouseSwipe={true}
          showArrows={false}
          itemsToShow={1}
          className=""
          enableAutoPlay={true}
          autoPlaySpeed={4000}
          onNextEnd={({ index }) => {
            if (index === items.length - 1) {
              clearTimeout(resetTimeout);
              resetTimeout = setTimeout(() => {
                carouselRef?.current?.goTo(0);
              }, 1000); // same time
            }
          }}
          pagination={false}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 600, itemsToShow: 1 },
            { width: 900, itemsToShow: 1 },
          ]}
        >
          {items?.map((item, index) => (
            <div key={index}>
              <Image
                width={800}
                height={380}
                sizes="100vw"
                src={item.img.src}
                className="w-full h-full rounded-xl"
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
