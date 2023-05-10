import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import { ACCESS_TOKEN, host } from "../../../utils/constant";

const AdminSetting = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuildReq = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${host}/utils/invoke`,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      toast.success("App building started !");
    } catch (err) {
      
      toast.error("Got an error !");
      toast.error("Failed to start building the app !");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AdminDashboard currentSection="Setting">
      <Head>
        <title>Settings - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:px-[30px] px-[5px] !mt-[0px]">
        <div
          onClick={() =>
            router.push("/admin-dashboard/settings/edit-categories")
          }
          className="flex justify-between bg-white p-3 cursor-pointer"
        >
          <p className="text-xl bold ml-4 font-bold">Edit Categories</p>
          <div className="cursor-pointer mr-16">
            <RiArrowRightSLine className="scale-125 text-3xl" />
          </div>
        </div>
        <div
          onClick={() => router.push("/admin-dashboard/settings/edit-filters")}
          className="flex justify-between bg-white cursor-pointer p-3 mt-1"
        >
          <p className="text-xl bold ml-4 font-bold">Edit Filter</p>
          <div className="cursor-pointer mr-16">
            <RiArrowRightSLine className="scale-125 text-3xl" />
          </div>
        </div>

        <button
          className="bg-primary px-3 py-1 rounded text-white active:opacity-70 mt-5 ml-6"
          disabled={isLoading}
          onClick={() => {
            handleBuildReq();
          }}
        >
          Build App !
        </button>
      </div>
    </AdminDashboard>
  );
};

export default AdminSetting;
