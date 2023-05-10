import React from 'react';
import yahoo from "../../../assets/mentor/yahoo.svg";
import bank from "../../../assets/mentor/go-bank.svg";
import street from "../../../assets/mentor/street.svg";
import fox from "../../../assets/mentor/fox.svg";

const OstelloLeader = () => {
  const images = []
  return (
    <section className='w-[433px] flex justify-center items-center bg-[#263238] md:w-full md:h-[156px]'>
      <div className="flex items-center justify-center gap-20">
        <p className="text-[26px] text-white border-r-4 border-white pr-2 w-[323px]">Thought Leadership from Ostello Featured in</p>
        <div className="flex items-center justify-center gap-4 w-[743px] ml-5">
        <img
              className="w-[162px] h-[57px]"
              src={yahoo.src}
              alt=""
            />
            <img
              className="w-[200px] h-[70px]"
              src={bank.src}
              alt=""
            />
            <img
              className="w-[164px] h-[50px]"
              src={street.src}
              alt=""
            />
            <img
              className="w-[144px] h-[47px]"
              src={fox.src}
              alt=""
            />
        </div>
      </div>
    </section>
  );
};

export default OstelloLeader;