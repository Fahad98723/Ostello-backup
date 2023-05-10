import Image from "next/image";
import React from "react";

const InstituteDisplayCard = ({ item }) => {
  return (
    <div>
      <div className="block md:hidden ">
        <Image
          width={380}
          height={380}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          src={item.img.src}
          className="w-[430px]  h-[350px] rounded-xl"
          alt=""
        />
      </div>
      <div className="hidden md:block">
        <Image
          width={380}
          height={380}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          src={item.img.src}
          className="w-[430px] md:h-[320px] h-[350px] rounded-xl"
          alt=""
        />
      </div>
    </div>
  );
};

export default InstituteDisplayCard;
