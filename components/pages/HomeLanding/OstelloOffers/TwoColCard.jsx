import React from "react";
import mentorImage from "../../../../assets/Pages/Home/images/mentorImage.webp";
import mentorImageMobile from "../../../../assets/Pages/Home/images/mentorImageMobile.webp";
import { useRouter } from "next/router";
import Image from "next/image";

export default function TwoColCard() {
  const router = useRouter();
  return (
    <div className="md:px-0 md:pr-4 px-4 ">
      <div
        onClick={() => {
          router.push("/mentor");
        }}
        className="rounded-xl w-full lg:max-w-[690px] sm:h-auto h-[350px] relative"
      >
        <Image
          width={380}
          height={380}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
          src={mentorImage.src}
          className="h-full w-full rounded-xl  lg:block hidden cursor-pointer"
        />
        <Image
          width={380}
          height={380}
          layout="intrinsic"
          src={mentorImageMobile.src}
          className="h-full w-full rounded-xl  block lg:hidden cursor-pointer"
          alt=""
        />
      </div>
    </div>
  );
}
