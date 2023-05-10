import React, { useState } from "react";
import ApplicationSidebar from "../../../../../components/pages/Merchant/Dashboard/Application/ApplicationSidebar";
import Navbar from "../../../../../components/pages/HomeLanding/Header/Navbar";
import { FiSearch } from "react-icons/fi";
import ApplicationDatabase from "../../../../../components/pages/Merchant/Dashboard/Application/ApplicationDatabase/ApplicationDatabase";
import FilterSideBar from "../../../../../components/pages/Merchant/Dashboard/Application/FilterSidebar";
import ApplicationReceived from "../../../../../components/pages/Merchant/Dashboard/Application/ApplicationReceived/ApplicationReceived";

const ApplicationsReceivedData = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="dashboard md:p-5 p-0">
      <Navbar />
      {/* <ToggleDashboard
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></ToggleDashboard> */}

      <p className="px-5 md:px-0">Merchant Dashboard / Applications received </p>

      <div className="md:flex mb-3  justify-between items-center md:px-0 px-5">
        <p className="text-[30px]">
          Applications for Business Development (Sales) internship
        </p>

        <div className="search">
          {" "}
          <div
            className={` shrink md:w-96 px-3 py-1.5    rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out flex items-center justify-between `}
          >
            <FiSearch
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-gray text-xl cursor-pointer mr-2"
            />
            <input
              type="text"
              placeholder="Search applicants by name"
              autoFocus
              className="text-md bg-white  focus:outline-none w-full"
              defaultValue={searchText || ""}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className=" grid md:grid-cols-10 gap-0  ">
        <div className="lg:col-span-2 ">
          <ApplicationSidebar />
        </div>
        <div
          style={{}}
          className="  col-span-6 lg:col-span-6  p-5 border border-light-gray"
          //   onClick={() => setShowSidebar(false)}
        >
          <ApplicationReceived />
        </div>

        <div className="lg:col-span-2 border border-light-gray">
          <FilterSideBar />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsReceivedData;
