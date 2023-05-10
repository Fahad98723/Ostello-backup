import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Courses from "../../../../components/pages/Merchant/Dashboard/Courses/Courses";
import DashboardSidebar from "../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import ToggleDashboard from "../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../redux/slices/authSlice";
import { INSTITUTE_ID, OWNER_ID } from "../../../../utils/constant";
import { isEmpty } from "../../../../utils/utils";
const MerchantCourses = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { instituteDetails, loading } = useSelector(authSelector);
  const [refetch, setRefetch] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (OWNER_ID === null) router.push("/merchant/login");
    else if (INSTITUTE_ID === null) router.push("/merchant/details");
    dispatch(getInstituteDetails());
  }, [refetch, router, dispatch]);

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
  }, [instituteDetails, router, loading]);

  return (
    <>
      <Head>
        <title>Courses - Merchant Dashboard - Ostello</title>
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
            <Courses />
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantCourses;
