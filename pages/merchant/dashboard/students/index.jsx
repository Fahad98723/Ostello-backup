import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import DashboardSidebar from "../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import Testimonial from "../../../../components/pages/Merchant/Dashboard/Testimonials/Testimonial";
import ToggleDashboard from "../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import Toppers from "../../../../components/pages/Merchant/Dashboard/Toppers/Toppers";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../redux/slices/authSlice";
import { isEmpty } from "../../../../utils/utils";
const MerchantToppers = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { instituteDetails, loading, userData } = useSelector(authSelector);
  const [refetch, setRefetch] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("OWNER_ID") === null
    )
      router.push("/merchant/login");
    if (userData) {
      if (userData?.usertype !== 2) {
        router.push("/merchant/login");
      }
    } else if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("INSTITUTE_ID") === null
    )
      router.push("/merchant/details");
    dispatch(getInstituteDetails());
  }, [refetch, router]);

  useEffect(() => {
    if (
      !loading &&
      !isEmpty(instituteDetails) &&
      instituteDetails.approval !== 1
    ) {
      router.push("/merchant/details/success");
    } else {
      return;
    }
  }, [instituteDetails, loading, router]);

  const [allStudents, setAllStudents] = useState(false);
  const [allToppers, setAllToppers] = useState(false);
  const [allTestimonials, setAllTestimonials] = useState(false);

  return (
    <>
      <Head>
        <title>Students - Merchant Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="dashboard">
        <ToggleDashboard
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></ToggleDashboard>
        <div className=" grid grid-cols-6 gap-0 bg-white ">
          <DashboardSidebar />
          <div
            style={{ background: " #FAFAFB" }}
            className="  col-span-6 lg:col-span-5  "
            onClick={() => setShowSidebar(false)}
          >
            <div className="heading p-5 mb-5 flex justify-between">
              <h1 className="text-2xl font-bold ">Students And Toppers</h1>
            </div>
            <div className="mb-10">
              <div className=" px-[5px] !mt-[0px]">
                <div
                  onClick={() => {
                    setAllToppers(false);
                    setAllTestimonials(false);
                    setAllStudents(true);
                  }}
                  className="flex justify-between bg-white p-3 cursor-pointer"
                >
                  <p className="text-xl bold ml-4 font-bold">All Students</p>
                  <div className="cursor-pointer mr-16">
                    <RiArrowRightSLine className="scale-125 text-3xl" />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setAllToppers(true);
                    setAllTestimonials(false);
                    setAllStudents(false);
                  }}
                  className="flex justify-between bg-white p-3 mt-1 cursor-pointer"
                >
                  <p className="text-xl bold ml-4 font-bold">All Toppers</p>
                  <div className="cursor-pointer mr-16">
                    <RiArrowRightSLine className="scale-125 text-3xl" />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setAllToppers(false);
                    setAllTestimonials(true);
                    setAllStudents(false);
                  }}
                  className="flex justify-between bg-white cursor-pointer p-3 mt-1"
                >
                  <p className="text-xl bold ml-4 font-bold">
                    All Testimonials
                  </p>
                  <div className="cursor-pointer mr-16">
                    <RiArrowRightSLine className="scale-125 text-3xl" />
                  </div>
                </div>
              </div>
            </div>
            {allToppers ? <Toppers /> : allTestimonials ? <Testimonial /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantToppers;
