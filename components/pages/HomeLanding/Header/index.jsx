import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import BG from "../../../../assets/courses_institutions/course-banner/GroupBG.webp";
import MBG from "../../../../assets/courses_institutions/course-banner/GroupMBG.webp";
const SearchBar = dynamic(
  () => {
    return import("./SearchBar/index");
  },
  { ssr: false }
);

const HeaderDescription = dynamic(
  () => {
    return import("./HeaderDescription");
  },
  { ssr: false }
);

export default function Header() {
  return (
    <div>
      <section className=" px-2 my-[55px] min-h-[300px]">
        <div className="rounded-xl ">
          <div className="relative">
            <div className="hidden lg:block h-full  w-full rounded-xl">
              <Image
                width="0"
                height="0"
                fetchpriority="high"
                sizes="100vw"
                src={BG.src}
             
                className="h-full w-full "
                alt=""
              />
            </div>
            <div className="lg:hidden block h-full w-full  rounded-xl">
              <Image
                width="500"
                height="500"
                sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                fetchPriority="high"
                src={MBG.src}
             
                className="h-full w-full  "
                alt=""
              />
            </div>
            <HeaderDescription />
          </div>
        </div>
      </section>
      <div
        className="sm:-mt-8 mt-1
       "
      >
        <SearchBar />
      </div>
    </div>
  );
}
