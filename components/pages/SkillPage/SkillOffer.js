import React, { useState } from "react";
import {
  BsArrowDownRight,
  BsBag,
  BsFillSunriseFill,
  BsGraphUp,
  BsSunrise,
} from "react-icons/bs";
import { TiHtml5 } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import icon1 from "../../../assets/Pages/SkillPage/Icons/icons(1).svg";
import icon2 from "../../../assets/Pages/SkillPage/Icons/icons(2).svg";
import icon3 from "../../../assets/Pages/SkillPage/Icons/icons(3).svg";
import icon4 from "../../../assets/Pages/SkillPage/Icons/icons(4).svg";
import icon5 from "../../../assets/Pages/SkillPage/Icons/icons(5).svg";
import icon6 from "../../../assets/Pages/SkillPage/Icons/icons(6).svg";
import { FaBusinessTime } from "react-icons/fa";

const data = [
  {
    id: 1,
    name: "Communication",
    img: <BsBag />,
  },
  {
    id: 2,
    name: "Data Analytic",
    img: <FiCamera />,
  },
  {
    id: 3,
    name: "Programming",
    img: <TiHtml5 />,
  },
  {
    id: 4,
    name: "Lifestyle",
    img: <BsFillSunriseFill />,
  },
  {
    id: 5,
    name: "Finance",
    img: <BsGraphUp />,
  },
  {
    id: 6,
    name: "Marketing",
    img: <FaBusinessTime />,
  },
  {
    id: 7,
    name: "Entrepreneur",
    img: <BsGraphUp />,
  },
  {
    id: 8,
    name: "AI & ML",
    img: <FiCamera />,
  },
  {
    id: 9,
    name: "Management",
    img: <BsFillSunriseFill />,
  },
];

const SkillOffer = () => {
  const [count, setCount] = useState(6);
  return (
    <div className="p-5 sm:p-10 md:max-w-[1200px] mx-auto">
      <div>
        <p className="md:text-[45px] text-[25px] font-semibold text-center text-primary">
          Skill we offer
        </p>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10 md:px-[100px]">
        {data.slice(0, count).map((a, idx) => {
          return (
            <div
              key={idx}
              className="border-[1px] border-[#000000] rounded-[20px] p-3 flex items-center justify-between cursor-pointer hover:bg-primary hover:text-white text-gray"
            >
              {/* <BsSunrise className="text-[20px] text-gray" /> */}
              <div className="flex items-center">
                {/* <div className="text-[25px] font-bold mr-2">{a.img}</div> */}

                <p className="text-[20px] font-semibold ">{a.name}</p>
              </div>
              <BsArrowDownRight className="rotate-180  text-[20px]" />
            </div>
          );
        })}

        {/* <div className="border-2 border-light-gray rounded-[15px] p-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src={icon2.src} className="mr-2" alt="" />
            <p className="text-[20px] font-semibold text-gray">Videography</p>
          </div>
          <BsArrowDownRight className="rotate-180 text-gray text-[20px]" />
        </div>
        <div className="border-2 border-light-gray rounded-[15px] p-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src={icon3.src} className="mr-2" alt="" />
            <p className="text-[20px] font-semibold text-gray">Programming</p>
          </div>
          <BsArrowDownRight className="rotate-180 text-gray text-[20px]" />
        </div>
        <div className="border-2 border-light-gray rounded-[15px] p-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src={icon4.src} className="mr-2" alt="" />
            <p className="text-[20px] font-semibold text-gray">Lifestyle</p>
          </div>
          <BsArrowDownRight className="rotate-180 text-gray text-[20px]" />
        </div>
        <div className="border-2 border-light-gray rounded-[15px] p-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src={icon5.src} className="mr-2" alt="" />
            <p className="text-[20px] font-semibold text-gray">Finance</p>
          </div>
          <BsArrowDownRight className="rotate-180 text-gray text-[20px]" />
        </div>
        <div className="border-2 border-light-gray rounded-[15px] p-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src={icon6.src} className="mr-2" alt="" />
            <p className="text-[20px] font-semibold text-gray">Business</p>
          </div>
          <BsArrowDownRight className="rotate-180 text-gray text-[20px]" />
        </div> */}
      </div>
      <p
        onClick={() => {
          if (count === 6) {
            setCount(9);
          }
          if (count === 9) {
            setCount(6);
          }
        }}
        className="text-center w-[200px] mx-auto mt-10  underline hover:text-primary cursor-pointer font-bold text-[18px]"
      >
        view {count === 9 ? "less" : "more"}...
      </p>
    </div>
  );
};

export default SkillOffer;
