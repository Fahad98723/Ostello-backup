import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import commerce from "../../../../../assets/Pages/Home/icons/commerce.webp";
import humanities from "../../../../../assets/Pages/Home/icons/humanities.webp";
import law from "../../../../../assets/Pages/Home/icons/law.webp";
import medical from "../../../../../assets/Pages/Home/icons/medical.webp";
import non_medical from "../../../../../assets/Pages/Home/icons/non-medical.webp";
import skill from "../../../../../assets/Pages/Home/icons/skillBased2.webp";
import cuet from "../../../../../assets/Pages/Home/icons/Text.webp";
import k12 from "../../../../../assets/Pages/Home/icons/K12.webp";
import { setFields, setSearch } from "../../../../../redux/slices/courseSlice";
import { setCategory, setClass } from "../../../../../redux/slices/SearchSlice";
import dynamic from "next/dynamic";
import useScreenWidth from "../../../../hooks/useScreenWidth";
import Image from "next/image";
const Search = dynamic(
  () => {
    return import("./Search");
  },
  { ssr: false }
);
const LocationSearch = dynamic(
  () => {
    return import("./LocationSearch");
  },
  { ssr: false }
);
const Carousel = dynamic(
  () => {
    return import("react-elastic-carousel");
  },
  { ssr: false }
);

export default function SearchBar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const shortcuts = [
    {
      title: "Academic",
      img: k12.src,
      class: "w-[70px] h-[40px] mb-1",
      url: "/academics-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setClass(["Class 12"]));
        dispatch(setFields(""));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Medical",
      img: medical.src,
      class: "w-[50px] h-[40px] mb-1",
      url: "/medical-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setFields("Medical"));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Engineering",
      img: non_medical.src,
      class: "w-[40px] h-[40px] mb-1",
      url: "/engineering-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setFields("Engineering"));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Humanities",
      img: humanities.src,
      class: "w-[50px] h-[40px] mb-1",
      url: "/humanities-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setCategory("Arts/Humanities"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Law",
      img: law.src,
      class: "w-[50px] h-[40px] mb-1",
      url: "/law-coaching-institutes-in-delhi",

      action: () => {
        dispatch(setCategory());
        dispatch(setFields("LAW"));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Commerce",
      img: commerce.src,
      class: "w-[60px] h-[40px] mb-1",
      url: "/commerce-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setCategory("Commerce"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Skill Based",
      img: skill.src,
      class: "w-[50px] h-[40px] mb-1",
      url: "/skillbased",
      action: () => {
        dispatch(setCategory("Skill Based"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Boards + CUET",
      img: cuet.src,
      class: "w-[70px] h-[40px] mb-1",
      url: "/exams/cuet",
      action: () => {
        dispatch(setCategory("Boards + CUET"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
  ];

  const { screenWidth } = useScreenWidth();

  const breakPoints = [
    { width: 1, itemsToShow: 3 },
    { width: 550, itemsToShow: 8 },
    { width: 1200, itemsToShow: 8 },
  ];

  return (
    <div className="px-5 sm:px-0">
      <div className=" sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 divide-gray/30 divide-y sm:divide-x sm:divide-y-0 rounded-md border border-gray p-2  md:h-[90px] items-center  sm:mx-auto bg-white ">
        <div className="w-full">
          <LocationSearch />
        </div>
        <div className="relative w-full">
          <Search />
        </div>
      </div>
      <div className=" sm:w-[73%] h-[90px]   rounded-md border border-gray  sm:mx-auto mt-5  bg-[#101828]  px-2 py-4 ">
        <Carousel
          breakPoints={breakPoints}
          showArrows={true}
          className="search-header"
          autoPlaySpeed={1500}
          pagination={false}
        >
          {shortcuts.map((item, key) => (
            <div
              onClick={() => {
                router.push(item.url, undefined, { shallow: true });
              }}
              className=""
              key={key}
            >
              <a
                onClick={() => {
                  setTimeout(() => {
                    item.action();
                  }, 1500);
                }}
                className="flex flex-col items-center  hover:scale-[1.1]  sm:p-0 p-2  text-white"
              >
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src={item.img}
                  className={`${item.class}`}
                  alt=""
                />
                <p className="md:text-[12px] text-[11px] whitespace-nowrap  text-white">
                  {item.title}
                </p>
              </a>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
