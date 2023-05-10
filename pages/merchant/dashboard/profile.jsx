import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import DashboardSidebar from "../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import Profile from "../../../components/pages/Merchant/Dashboard/MyProfile/Profile";
import ToggleDashboard from "../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import {
  authSelector,
  getInstituteDetails
} from "../../../redux/slices/authSlice";
import { isEmpty } from "../../../utils/utils";
const MerchantProfile = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { instituteDetails, loading, userData } = useSelector(authSelector);

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
      }
    else if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("INSTITUTE_ID") === null
    )
      router.push("/merchant/details");
    dispatch(getInstituteDetails());
  }, [router]);

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

  // useEffect(() => {});

  function logout() {
    router.push("/merchant");
    localStorage.clear();
    typeof window !== "undefined" && window.location.reload();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Profile - Merchant Dashboard - Ostello</title>
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
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantProfile;
