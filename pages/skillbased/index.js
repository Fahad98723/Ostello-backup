import dynamic from "next/dynamic";
import React, { useEffect } from "react";

import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import Footer from "../../components/layout/Footer";
import SkillHeader from "../../components/pages/SkillPage/SkillHeader";
import TopCourses from "../../components/pages/SkillPage/TopCourses";
import SkillOffer from "../../components/pages/SkillPage/SkillOffer";
import OurBrands from "../../components/pages/SkillPage/OurBrands";
import banner from "../../assets/Pages/SkillPage/secondBanner.png";
import Help from "../../components/pages/SkillPage/Help";
import Feedback from "../../components/pages/SkillPage/Feedback";
import Partners from "../../components/pages/SkillPage/Partners";
import Hire from "../../components/pages/SkillPage/Hire";
import Events from "../../components/pages/SkillPage/Events";
import Mode from "../../components/pages/SkillPage/Mode";

const OstelloSubscribe = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);

const SkillBased = () => {
  return (
    <div>
      <section>
        <div className=" md:max-w-[1350px] mx-auto">
          <div className="md:mb-[70px]">
            <div className="fixed top-0 z-50 bg-white  md:max-w-[1350px] w-full mx-auto  shadow">
              <Navbar />
            </div>
          </div>
        </div>
        <SkillHeader />
        <div className=" md:max-w-[1350px] mx-auto">
          <SkillOffer />
          <TopCourses />
          <OurBrands />
          {/* <div className=" mx-auto py-5">
            <img src={banner.src} className="w-full mx-auto" alt="" />
          </div> */}
          <Mode />
        </div>

        <div className="md:max-w-[1350px] mx-auto">
          <Help />
          <Events />
          <Feedback />
          <Hire />
          <Partners />
          <OstelloSubscribe />
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default SkillBased;
