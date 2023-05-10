import Link from "next/link";
import React from "react";
import connectBG from "../../../../assets/Pages/Home/images/connectBG.svg";
import connectModel from "../../../../assets/Pages/Home/images/connectModel1.webp";
import connectMobileBG from "../../../../assets/Pages/Home/images/connectMobileBG.webp";
import { useRouter } from "next/router";

export default function OstelloConnect() {
  const router = useRouter();
  return (
    <section className="md:container md:mx-auto my-10  ">
      <div className="md:hidden p-5 relative">
        <img
          src={connectMobileBG.src}
          className="w-full h-full"
          alt="Get the best offers for your coaching needs - Ostello"
        />
        <div className=" absolute top-0 left-0  h-full  p-10 ">
          <h1 className=" text-primary leading-6 text-2xl font-bold my-4">
            Get the best offers for your coaching needs.
          </h1>
          <p className="text-gray">
            Everything you need to know about the product and billing. Can’t
            find the answer you’re looking for? Please chat to our friendly
            team.
          </p>

          <div className="flex mt-5 shrink-0 items-center space-x-5">
            <button className="px-2 py-1 rounded-md text-white bg-primary hover:text-primary hover:bg-white border-primary border duration-300">
              Button CTA
            </button>

            <Link legacyBehavior prefetch={false} href={"/"}>
              <p className="text-primary" >
                Button CTA
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${connectBG.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="md:flex hidden items-end md:max-w-6xl mx-auto lg:mt-16 mt-28 lg:h-[450px] h-[400px] "
      >
        <img
          className="z-10  h-[540px] lg:w-[500px] w-[370px]"
          src={connectModel.src}
          alt="Get the best offers for your coaching needs - Ostello"
        />
        <div className=" pr-20 mb-20 items-center">
          <h1 className="lg:text-[38px] text-[30px] text-[#7F56D9] leading-[45px] font-bold mb-8">
            Connect with our friendly team to clear out all your doubts!
          </h1>
          <p className="lg:text-lg text-md">
            Ostello lets you compare through Demo videos, discounted prices and
            never seen before offers that lets you choose from the best
            institutes near you! Get the best for your coaching needs.
          </p>
          <div className="flex space-x-5  items-center mt-5">
            <button
              onClick={() =>
                router.push("https://chatwith.io/s/ostello-india-pvt-ltd")
              }
              className="bg-primary text-white rounded-lg px-4 py-1 border border-primary hover:bg-white hover:text-primary duration-300"
            >
              Connect
            </button>

            <Link legacyBehavior prefetch={false} href={"/contact-us"}>
              <p className="text-primary">
                Helpline
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
