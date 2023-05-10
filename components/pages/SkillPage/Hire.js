import React from "react";
import hire from "../../../assets/Pages/SkillPage/hire.png";
import useScreenWidth from "../../../components/hooks/useScreenWidth";
import banner from "../../../assets/Pages/SkillPage/hirebanner.png";
import mobileBanner from "../../../assets/Pages/SkillPage/hireMobileBanner.png";
const Hire = () => {
  const { screenWidth } = useScreenWidth();
  return (
    <div
      style={{
        backgroundImage: `url(${
          screenWidth > 768 ? banner.src : mobileBanner.src
        })`,
      }}
      // className="h-[300px] md:hidden block   rounded-3xl "
      className=" bg-no-repeat md:bg-contain bg-cover md:p-20 p-10 pb-36 pt-5 bg-center-center w-full h-full"
    >
      <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto md:gap-x-[50px] md:gap-y-[25px] my-10">
        <div className=" py-5 sm:py-10">
          <p className="text-white md:text-[45px] text-[25px] text-bold">Hire from us</p>
          <hr className="w-1/4 text-white h-[5px] bg-white mb-3" />
          <p className="text-white md:text-[25px] text-[20px]">Save your</p>
          <p className="text-white md:text-[25px] text-[20px]">recruiting hassles</p>
        </div>
        <div className=" py-5 sm:py-10">
          <ul className="md:text-[20px] text-[16px] text-white">
            <li>No Recruitment & Training Hassles.</li>
            <li>Kick off new projects instantly.</li>
            <li>Save Operational Cost.</li>
            <li>Direct Communication.</li>
            <li>Verified Skills.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hire;
