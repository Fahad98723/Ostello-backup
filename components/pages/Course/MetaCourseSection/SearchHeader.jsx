import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import class10 from "../../../../assets/Pages/Home/icons/10.svg";
import class12 from "../../../../assets/Pages/Home/icons/12.svg";
import commerce from "../../../../assets/Pages/Home/icons/commerce.svg";
import commerceColor from "../../../../assets/Pages/Home/icons/commerceColor.svg";
import humanities from "../../../../assets/Pages/Home/icons/humanities.svg";
import humanitiesColor from "../../../../assets/Pages/Home/icons/humanitiesColor.svg";
import law from "../../../../assets/Pages/Home/icons/law.svg";
import lawColor from "../../../../assets/Pages/Home/icons/lawColor.svg";
import medical from "../../../../assets/Pages/Home/icons/medical.svg";
import medicalColor from "../../../../assets/Pages/Home/icons/medicalColor.svg";
import non_medical from "../../../../assets/Pages/Home/icons/non-medical.svg";
import non_medicalColor from "../../../../assets/Pages/Home/icons/non_medicalColor.svg";
import skill from "../../../../assets/Pages/Home/icons/skillBased2.svg";
import skillColor from "../../../../assets/Pages/Home/icons/skillBasedColor.svg";
import cuet from "../../../../assets/Pages/Home/icons/Text.svg";
import cuetColor from "../../../../assets/Pages/Home/icons/TextColor.svg";
import k12 from "../../../../assets/Pages/Home/icons/K12.svg";
import k12Color from "../../../../assets/Pages/Home/icons/K12Color.svg";
import { setFields, setSearch } from "../../../../redux/slices/courseSlice";
import {
  setCategory,
  setClass,
  setLocationQuery,
} from "../../../../redux/slices/SearchSlice";

import dynamic from "next/dynamic";
import Image from "next/image";

export default function SearchHeader({ metaSection }) {
  const dispatch = useDispatch();
  const router = useRouter();

  
  const shortcuts = [
    {
      title: "Academics",
      img: metaSection === "Academics" ? k12Color.src : k12.src,
      class: "w-[70px] h-[40px] mb-1 ",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Academics" ? "text-[#FFD600]" : "text-white"
      }`,
      url: "/academics-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setClass(["Class 12"]));
        // dispatch(setLocationQuery("Delhi"));
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
      img: metaSection === "Medical" ? medicalColor.src : medical.src,
      class: "w-[75px] h-[40px] mb-1",
      url: "/medical-coaching-institutes-in-delhi",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Medical" ? "text-[#FFD600]" : "text-white"
      }`,
      action: () => {
        dispatch(setFields("Medical"));
        // dispatch(setLocationQuery("Delhi"));
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
      img:
        metaSection === "Engineering" ? non_medicalColor.src : non_medical.src,
      class: "w-[80px] h-[40px] mb-1",
      url: "/engineering-coaching-institutes-in-delhi",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Engineering" ? "text-[#FFD600]" : "text-white"
      }`,
      action: () => {
        dispatch(setFields("Engineering"));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
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
      img: metaSection === "Humanities" ? humanitiesColor.src : humanities.src,
      class: "w-[80px] h-[40px] mb-1",
      url: "/humanities-coaching-institutes-in-delhi",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Humanities" ? "text-[#FFD600]" : "text-white"
      }`,
      action: () => {
        dispatch(setCategory("Arts/Humanities"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
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
      img: metaSection === "Law" ? lawColor.src : law.src,
      class: "w-[80px] h-[40px] mb-1",
      url: "/law-coaching-institutes-in-delhi",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Law" ? "text-[#FFD600]" : "text-white"
      }`,
      action: () => {
        dispatch(setCategory());
        dispatch(setFields("LAW"));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
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
      img: metaSection === "Commerce" ? commerceColor.src : commerce.src,
      class: "w-[80px] h-[40px] mb-1",
      url: "/commerce-coaching-institutes-in-delhi",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Commerce" ? "text-[#FFD600]" : "text-white"
      }`,
      action: () => {
        dispatch(setCategory("Commerce"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
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
      img: metaSection === "Skill Based" ? skillColor.src : skill.src,
      class: "w-[85px] h-[40px] mb-1",
      // url: "/skill-based-coaching-institutes-in-delhi",
      url: "/skillbased",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Skill Based" ? "text-[#FFD600]" : "text-white"
      }`,
      action: () => {
        dispatch(setCategory("Skill Based"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
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
      img: metaSection === "Cuet" ? cuetColor.src : cuet.src,
      class: "w-[85px] h-[40px] mb-1",
      textColor: `md:text-[12px] text-[11px] whitespace-nowrap ${
        metaSection === "Cuet" ? "text-[#FFD600]" : "text-white"
      }`,
      url: "/exams/cuet",
      action: () => {
        dispatch(setCategory("Boards + CUET"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
  ];

  return (
    <div className="px-5 sm:px-10 md:py-10 py-5">
      <p className="text-[48px] font-semibold md:text-center text-[#1D2939]">
        Course We <span className="text-primary">Offer</span>
      </p>
      <div
        className=" 
       grid sm:grid-cols-8 grid-cols-4  md:gap-4 gap-3 justify-around rounded-md border border-gray  sm:mx-auto mt-5  bg-[#101828]   px-2 py-6 "
      >
        <>
          {shortcuts.map((item, key) => (
            <div
              onClick={() => {
                router.push(item.url, undefined, { shallow: true });
              }}
              className="sm:max-h-[50px] max-h-[70px]"
              key={key}
            >
              <a
                onClick={() => {
                  setTimeout(() => {
                    item.action();
                  }, 1500);
                }}
                className="flex flex-col items-center  hover:scale-[1.2]  sm:p-0 p-2  text-white"
              >
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src={item.img}
                  className={`${item.class}`}
                  alt=""
                />
                <p className={`${item.textColor}`}>{item.title}</p>
              </a>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
