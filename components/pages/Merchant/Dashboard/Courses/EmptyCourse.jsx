import React from 'react';
import NOCourseImg1 from "../../../../../assets/vectors/noCourse1.png";

const EmptyCourse = () => {
    return (
    <div className="flex flex-col h-screen lg:justify-center items-center ">
      <h1 className="text-[#C2C2C2] text-2xl lg:text-3xl text-center pb-10">
        Start your journey with <br className="lg:hidden" /> Ostello by{" "}
        <br className="hidden lg:flex" /> adding a <br className="lg:hidden" />{" "}
        Course{" "}
      </h1>
      <div className="flex flex-col lg:flex-row justify-center  items-center  gap-10 w-full ">
        <img
          src={NOCourseImg1.src}
          alt="No Course Adding Vector1"
          className="w-1/2 lg:w-1/5 "
        />
        {/* <img
          src={NOCourseImg2}
          alt="No Course Adding Vector2"
          className="w-1/4 "
        /> */}
      </div>
    </div>
    );
};

export default EmptyCourse;