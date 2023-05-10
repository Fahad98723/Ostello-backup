import React, { useState } from "react";
import event1 from "../../../assets/Pages/SkillPage/Event/event(1).png";
import event2 from "../../../assets/Pages/SkillPage/Event/event(2).png";
import event3 from "../../../assets/Pages/SkillPage/Event/event(3).png";
import event4 from "../../../assets/Pages/SkillPage/Event/event(4).png";
import event5 from "../../../assets/Pages/SkillPage/Event/event(5).png";
const Events = () => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="p-5 md:p-10">
      <p className="md:text-[45px] text-[25px] font-semibold text-center mb-5">
        College
        <span className="text-primary font-bold "> Events </span>{" "}
      </p>
      <div className="grid grid-cols-6 md:gap-4 gap-2">
        <div className="col-span-2">
          <img src={event3.src} className="w-full h-full" alt="" />
        </div>
        <div className="col-span-4 ">
          <div className="grid grid-cols-1 md:gap-4 gap-2">
            <div className="">
              <img src={event2.src} className="w-full h-full" alt="" />
            </div>
            <div className="">
              <img src={event1.src} className="w-full h-full" alt="" />
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <img src={event4.src} className="w-full" alt="" />
        </div>
        <div className="col-span-3">
          <img src={event5.src} className="w-full" alt="" />
        </div>

        {viewMore ? (
          <>
            <div className="col-span-2">
              <img src={event3.src} className="w-full h-full" alt="" />
            </div>
            <div className="col-span-4 ">
              <div className="grid grid-cols-1 gap-4">
                <div className="">
                  <img src={event2.src} className="w-full" alt="" />
                </div>
                <div className="">
                  <img src={event1.src} className="w-full" alt="" />
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <img src={event4.src} className="w-full" alt="" />
            </div>
            <div className="col-span-3">
              <img src={event5.src} className="w-full" alt="" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <p
        onClick={() => setViewMore(!viewMore)}
        className="text-center w-[200px] mx-auto mt-10 underline hover:text-primary cursor-pointer font-bold text-[18px]"
      >
        view {viewMore ? "less" : "more"}...
      </p>
    </div>
  );
};

export default Events;
