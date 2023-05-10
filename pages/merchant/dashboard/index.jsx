import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaHelmet from "../../../components/MetaHelmet";
import DashboardHome from "../../../components/pages/Merchant/Dashboard/DashboardHome";
import DashboardSidebar from "../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import ToggleDashboard from "../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import {
  authSelector,
  getInstituteDetails,
} from "../../../redux/slices/authSlice";
import { isEmpty } from "../../../utils/utils";

const Dashboard = ({ meta }) => {
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

  return (
    <>
      <MetaHelmet title={meta?.title} />
      <div className="dashboard">
        <ToggleDashboard
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className=" md:grid grid-cols-6 gap-0 bg-white ">
          <div className="hidden md:col-span-1 md:block">
            <DashboardSidebar />
          </div>
          <div className=" md:col-span-5">
            <DashboardHome />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export const getStaticProps = async () => {
  const meta = {
    title: "Merchant Dashboard - Ostello",
  };

  return {
    props: {
      meta,
    },
  };
};
