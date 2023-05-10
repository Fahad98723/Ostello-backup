import Image from "next/image";
import React from "react";
import BG from "../../../../assets/courses_institutions/course-banner/GroupBG.webp";

const DescTopBackground = () => {
  return (
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
  );
};

export default DescTopBackground;
