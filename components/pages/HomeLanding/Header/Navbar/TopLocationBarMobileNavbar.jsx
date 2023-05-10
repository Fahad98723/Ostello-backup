import { useRouter } from "next/router";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const TopLocationBarMobileNavbar = ({ text }) => {
  const router = useRouter();
  return (
    <div>
      <div className="absolute left-0 z-10 mt-7 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="none">
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/toplocation/delhi");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Delhi</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            onClick={() => {
              router.push("/toplocation/haryana");
            }}
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Haryana</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/toplocation/uttar-pradesh");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Uttar Pradesh</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLocationBarMobileNavbar;
