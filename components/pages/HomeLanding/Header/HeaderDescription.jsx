import React from "react";

const HeaderDescription = () => {
  return (
    <div className="xl:py-36  py-16  absolute top-1/2 left-5 right-5 transform  -translate-y-1/2  lg:px-8 md:px-6 ">
      <h1 className="my-5 md:my-10 text-[55px] md:block hidden text-black  leading-12 md:leading-none font-bold ">
        Discover the best <br /> coaching institutes <br /> in your area
      </h1>
      <h1 className="my-5 md:my-10 text-[28px] md:hidden block text-black  leading-[40px] font-bold ">
        Discover the best <br /> coaching institutes <br /> in your area
      </h1>
      <p className=" md:w-[400px]  text-justify leading-6 text-lg">
        Designed by creators for millions of students all over India. With over
        a 1000 coaching institutions listed, Ostello lets you compare and choose
        the best for you.
      </p>
    </div>
  );
};

export default HeaderDescription;
