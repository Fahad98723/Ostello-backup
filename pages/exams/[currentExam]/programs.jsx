import { Rating } from "@mui/material";
import React from "react";
import banner2 from "../../../assets/exams/exam-banner.svg";
import banner from "../../../assets/toplocationbanner.png";
import Footer from "../../../components/layout/Footer";
import MetaHelmet from "../../../components/MetaHelmet";
import dynamic from "next/dynamic";

const Carousel = dynamic(
  () => {
    return import("react-elastic-carousel");
  },
  { ssr: false }
);
const OstelloSubscribe = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);
const Navbar = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/Header/Navbar");
  },
  { ssr: false }
);

const programs = () => {
  return (
    <div>
      <section>
        <MetaHelmet title="CUET exams preparation with Ostello" />
        <div className="mx-auto">
          <div className="md:mb-[100px]">
            <div className="fixed top-0 z-50 bg-white w-full mx-auto  shadow">
              <Navbar text={"text-[#667085]"} />
            </div>
          </div>
          <div className="mx-ato">
            <div className="mb-5 px-5 md:mx-auto container md:mt-0 mt-20">
              <Carousel
                enableMouseSwipe={true}
                showArrows={false}
                itemsToShow={1}
                className=""
                // enableAutoPlay={true}
                // autoPlaySpeed={1000}
                // onNextEnd={({ index }) => {
                //   if (index === items.length - 1) {
                //     clearTimeout(resetTimeout);
                //     resetTimeout = setTimeout(() => {
                //       carouselRef?.current?.goTo(0);
                //     }, 1000); // same time
                //   }
                // }}
                pagination={true}
                breakPoints={[
                  { width: 1, itemsToShow: 1 },
                  { width: 600, itemsToShow: 1 },
                  { width: 900, itemsToShow: 1 },
                ]}
              >
                <div>
                  <img className="w-full" src={banner.src} alt="" />
                </div>
                <div>
                  <img className="w-full" src={banner2.src} alt="" />
                </div>
              </Carousel>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container md:mx-auto md:px-0 px-5 mt-20">
            <div className="flex flex-col items-start w-full md:w-[630px]">
              <h1 className=" leading-none font-bold text-2xl lg:text-4xl ">
                CUET 2023{" "}
                <span className="text-primary font-bold">Online Live</span>
              </h1>
              <p className="lg:text-lg mb-5 text-wrap">
                Crack CUET 2023 (Common Universities Entrance Test) with the
                most comprehensive preparation program & get into your Dream
                University like DU, BHU, AMU, JNU etc
              </p>
              <div className="flex flex-row mt-5">
                <Rating className="text-primary" readOnly value={4.8} />
                <p className="lg:text-lg font-bold ml-5">4.8</p>
              </div>
            </div>
            <div className="flex flex-col bg-[#000000] md:ml-10 text-white rounded-[10px] w-full md:w-[461px] md:h-[508px] px-5 py-5">
              <div className="flex justify-between gap-4 mt-5">
                <p className="text-[21px]">Fee</p>
                <p className="text-[21px]">0 Rs</p>
              </div>
              <div className="flex justify-between gap-4 mt-5">
                <p className="text-[21px]">GST</p>
                <p className="text-[21px]">0 Rs</p>
              </div>
              <p className="text-[21px] mt-5">Fee waiver code apply</p>
              <p className="text-[21px] mt-5">Invite Code apply</p>
              <div className="border-t border-[#ffffff] mt-5"></div>
              <div className="flex justify-between gap-4 mt-5">
                <p className="text-[21px]">Final Fee</p>
                <p className="text-[21px]">0 Rs</p>
              </div>
              <div className="flex justify-around items-center mt-5 mb-5">
                <label className="inline-flex items-center">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">HDFC</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">PayTM</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">PayU</span>
                </label>
              </div>
              <p className="text-[18px] mt-5">
                I agree with the Privacy policy of Ostello
              </p>
              <button
                onClick={() => {}}
                className="bg-primary text-white w-full rounded-lg mt-10 xl:mb-0 h-8"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 container md:mx-auto md:px-0 px-5 mt-20">
            <div className="flex flex-col border border-primary rounded-[10px] px-5 py-5">
              <p className="text-[20px] text-primary">Recuirments</p>
              <div className="flex justify-center items-center gap-2">
                <p className="text-[16px] mt-5 mr-2 border-l-4 border-primary line-wrap pl-2">
                  Strategically designed as per the requirements of CUET 2023
                  aspirants.
                </p>
              </div>
            </div>
            <div className="flex flex-col border border-primary rounded-[10px] px-5 py-5">
              <p className="text-[20px] text-primary ">Domain Subjects</p>
              <p className="text-[16px] mt-5 border-l-4 border-primary pl-2">
                Covers all 3 Sections & 14 Domain Subjects
              </p>
            </div>
            <div className="flex flex-col border border-primary rounded-[10px] px-5 py-5">
              <p className="text-[20px] text-primary">Make your choice</p>
              <p className="text-[16px] border-l-4 border-primary pl-2 mt-5">
                Create your own course by selecting your choice of domain
                subjects.
              </p>
            </div>
          </div>
          <div className="flex flex-col container md:mx-auto md:px-0 px-5 mt-20">
            <p className="text-[24px] mt-5">
              Create your own program. Choose your target subjects for CUET from
              each section of the exam. Get more fee waiver with each subject
              that you add
            </p>
            <p className="text-[24px] text-primary  font-bold mt-20">
              Choose Section 1 subjects
            </p>
            <p className="text-[24px]  mt-5 font-bold">Language</p>
            <label className="inline-flex items-center mt-5">
              <input type="radio" className="w-3 h-3 rounded-full" />
              <span className="ml-2">English</span>
            </label>
            <div className="border-t border-[#CDD0D3] mt-5"></div>

            <p className="text-[24px] text-primary mt-5 font-bold">
              Choose Section 2 subjects
            </p>
            <div className="grid grid-cols-3 items-start gap-4">
              <div className="flex flex-col items-start">
                <p className="text-[24px]  mt-5 font-bold">Science</p>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Mathematics</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Physics</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Chemistry</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Biology</span>
                </label>
                <p className="text-[24px]  mt-5 font-bold">Commerce</p>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Accountancy</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Business studies</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Economics</span>
                </label>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[24px]  mt-5 font-bold">Humanities</p>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">History</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Political Science</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Sociology</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Geography</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Legal studies</span>
                </label>
                <label className="inline-flex items-center mt-5">
                  <input type="radio" className="w-3 h-3 rounded-full" />
                  <span className="ml-2">Psychology</span>
                </label>
              </div>
              <div className="flex flex-col"></div>
            </div>
            <div className="border-t border-[#CDD0D3] mt-5"></div>
            <p className="text-[24px] text-primary mt-5 font-bold">
              Choose Section 3 subjects
            </p>
            <p className="text-[24px]  mt-5 font-bold">Aptitude</p>
            <label className="inline-flex items-center mt-5">
              <input type="radio" className="w-3 h-3 rounded-full" />
              <span className="ml-2">General Test</span>
            </label>
          </div>
        </div>
        <div className="md:p-10 p-5 container md:mx-auto md:px-0 px-5 mt-10">
          <OstelloSubscribe />
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default programs;
