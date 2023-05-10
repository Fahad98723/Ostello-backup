import Image from "next/image";
import React from "react";
import MBG from "../../../../assets/courses_institutions/course-banner/GroupMBG.webp";

const MobileBackground = () => {
  return (
    <div>
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
    </div>
  );
};

export default MobileBackground;
