import { useRouter } from "next/router";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const CourseBarMobileNavbar = ({text}) => {
  const router = useRouter();
  return (
    <div>
      <div className="absolute left-0 z-10 mt-7 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="none">
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/academics-coaching-institutes-in-delhi");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>K12 (Academics)</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            onClick={() => {
              router.push("/medical-coaching-institutes-in-delhi");
            }}
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Medical</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/engineering-coaching-institutes-in-delhi");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Engineering</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/humanities-coaching-institutes-in-delhi");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Humanities</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/law-coaching-institutes-in-delhi");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Law</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/commerce-coaching-institutes-in-delhi");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Commerce</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/skillbased");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Skill Based</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
          <div
            className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
            onClick={() => {
              router.push("/exams/cuet");
            }}
          >
            <p className={`  text-[16px]  px-4 py-2 `}>Boards + CUET</p>
            <IoIosArrowBack className={`mr-2   text-[16px] rotate-180`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBarMobileNavbar;
