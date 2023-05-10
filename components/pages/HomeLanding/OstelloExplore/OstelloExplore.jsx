import { useRouter } from "next/router";
import React from "react";
import Images from "../../../../assets/images/exploreImage.webp";
import Image from "next/image";
export default function OstelloExplore({}) {
  const router = useRouter();

  return (
    <section className="container mx-auto lg:px-20 px-5 grid grid-cols-1 place-items-center  lg:grid-cols-2  gap-y-5 my-10">
      <h1 className="text-2xl lg:hidden text-center ">
        Explore the world of Ostello with us
      </h1>

      <div className="relative flex items-center justify-center md:w-[380px] w-full h-[380px]  sm:w-[530px] sm:h-[530px]">
        <div className="">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className=" rounded-xl max-auto  md:w-[500px] w-[300px] h-full items-center  z-10"
            src={Images.src}
            alt={" Ostello "}
          />
        </div>
      </div>
      <div className="md:w-10/12 mr-auto">
        <h1 className="hidden text-4xl lg:block font-bold leading-[44px]">
          Explore the world of Ostello with us
        </h1>
        <div className="space-y-5 mt-10 text-lg">
          <>
            <p>
              Ostello is the world's first B2B marketplace for coaching
              institutions. It gives the institutions a platform to tell the
              students about their institute, facilities, faculty, and success
              stories. Every institute can stand among the best institutes in
              India and use Ostello's resources to grow its business.
            </p>
            <p>
              If you are a student, you just got lucky as Ostello lets you find
              the best coaching institutes near you. Compare and choose through
              location, demo classes, course fees, and discount offers, and
              select what’s best for you & make the right decision for your
              career. It's time to OWN YOUR CAREER!
            </p>
          </>

          <button
            onClick={() => {
              router.push("/about-us");
            }}
            className="px-3 py-2 bg-black text-white rounded"
          >
            Know More
          </button>
        </div>
      </div>
    </section>
  );
}
