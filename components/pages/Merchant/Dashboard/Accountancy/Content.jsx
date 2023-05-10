import React from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
const Content = () => {
  return (
    <div  className="p-5">
            <div className="heading mb-5">
      <h1 className="text-2xl font-bold ">Accountancy</h1>
    </div>
      <div className=" grid grid-cols-5 gap-6 ">
        <div className=" col-span-5 lg:col-span-3">
          <LeftContent></LeftContent>
        </div>
        <div className=" col-span-5 lg:col-span-2  ">
          <RightContent></RightContent>
        </div>
      </div>
    </div>
  );
};

export default Content;
