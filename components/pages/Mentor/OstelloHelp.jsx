import React from "react";
import helpImg from "../../../assets/mentor/help_img.svg";

const OstelloHelp = () => {
  return (
    <section className="mt-20 bg-primary md:w-full md:max-h-[600px] w-[433px] px-5">
      <div className="flex items-center md:justify-center md:flex-row flex-col md:gap-10 mt-5">
        <div className="flex flex-col md:w-[600px] md:h-[584px] pt-5">
          <h1 className="md:text-[41px] text-[#FFD600] pt-8 px-5 text-[25px]">
            How We can help you ?
          </h1>
          <div className="flex justify-center items-center gap-5 pt-5">
            <div className="md:w-[90px] md:h-[90px] bg-white py-6 px-6 flex justify-center items-center text-primary md:text-[40px] rounded-full font-bold">
              01
            </div>
            <div className="flex flex-col text-white text-start">
              <p className="md:text-[30px] text-[18px]">
                Create your Career Path
              </p>
              <p className="md:text-[18px] ">
                Ready to launch your career? In less 60 seconds identify your
                interests, research potential careers, network with
                professionals, gain experience
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 mt-5">
            <p className="md:w-[90px] md:h-[90px] bg-white text-primary md:text-[40px] rounded-full font-bold py-6 px-6 flex justify-center items-center">
              02
            </p>
            <div className="flex flex-col text-white text-start">
              <p className="md:text-[30px] text-[18px]">Keep a Track </p>
              <p className="md:text-[18px]">
                With Ostello's AI, you can confidently track your career, get
                personalized mentor support, stay up-to-date on education
                trends, and achieve your dream career goals.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 mt-5">
            <p className="md:w-[90px] md:h-[90px] bg-white text-primary md:text-[40px] rounded-full font-bold py-6 px-6 flex justify-center items-center">
              03
            </p>
            <div className="flex flex-col text-white text-start">
              <p className="md:text-[30px] text-[18px]">Get Recommendation</p>
              <p className="md:text-[18px] text-[16px]">
                Let Ostello help you achieve your career goals by recommending
                personalized suggestions based on the path you choose.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[433px] md:w-[448px]">
          <img className="" src={helpImg.src} alt="" />
        </div>
      </div>
    </section>
  );
};

export default OstelloHelp;
