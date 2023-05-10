import React, { useContext } from "react";
import activeTabContext from "../context/ActiveTabContext";
import { BasicDetails } from "../CourseAdding/BasicDetails";
const CourseAddSideNav = () => {
  return (
    <nav
      className={` hidden lg:flex font-dm-sans mt-4 mb-10 px-10 py-4 z-50  `}
    >
      <div className="">
        <h1 className="text-2xl hidden font-medium ">Profile Section</h1>

        <div className="bg-white my-7 mx-2 mb-10 px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72">
          <button className="text-primary text-lg">Basic Details</button>
          <BasicDetails />
          <button className="text-lg">Additional Description</button>
          <button className="text-lg">Filters</button>
        </div>

        <h1 className="text-2xl font-medium ">What’s in the course</h1>

        <div className="bg-white my-7 mx-2 mb-10 px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72">
          <button className="text-lg">Syllabus description</button>
        </div>

        <h1 className="text-2xl font-medium ">Payment</h1>

        <div className="bg-white my-7 mx-2  px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72">
          <button className="text-lg">Course Price & Coupons</button>
          <button className="text-lg">Production Support</button>
        </div>
      </div>
    </nav>
  );
};

export default CourseAddSideNav;
