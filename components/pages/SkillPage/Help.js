import React from "react";
import first from "../../../assets/Pages/SkillPage/first.png";
import second from "../../../assets/Pages/SkillPage/second.png";
import third from "../../../assets/Pages/SkillPage/third.png";
import arrow from "../../../assets/Pages/SkillPage/arrow.png";
const Help = () => {
  return (
    <div className="p-5 sm:p-10">
      <div>
        <p className="md:text-[45px] text-[25px] font-semibold text-center mb-5">
          How will <span className="text-primary font-bold ">Ostello </span>{" "}
          help you in growing
        </p>
      </div>

      <div className="grid xl:grid-cols-5 grid-cols-1 items-center md-mx-auto gap-x-[5px] gap-y-[5px] my-10">
        <div>
          <img src={first.src} className="h-[200px] w-[180px] mx-auto" alt="" />
          <p className="text-[20px] text-center font-bold mt-4">
            Help you find right course
          </p>
        </div>
        <div>
          <img
            src={arrow.src}
            alt=""
            className="md:rotate-0 rotate-90 mx-auto"
          />
          <p></p>
        </div>
        <div>
          <img
            src={second.src}
            className="h-[200px] w-[250px] md:w-full mx-auto"
            alt=""
          />
          <p className="text-[20px] text-center font-bold mt-4">
            Help you in skilling up
          </p>
        </div>
        <div>
          <img
            src={arrow.src}
            alt=""
            className="md:rotate-0 rotate-90 mx-auto"
          />
          <p></p>
        </div>
        <div>
          <img src={third.src} className="h-[200px] w-[180px] mx-auto" alt="" />
          <p className="text-[20px] font-bold text-center mt-4">Help you find right job</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
