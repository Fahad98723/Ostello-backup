import Head from "next/head";
import React from "react";
import avatar from "../../../assets/images/avatar.png";
import dollar from "../../../assets/images/dollar.png";
import time from "../../../assets/images/time.png";
import TopCard from "../../../components/pages/AdminDashboard/AdminCard/TopCard";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import Chart from "../../../components/pages/AdminDashboard/Overview/Chart/Chart";
import PendingRequests from "../../../components/pages/AdminDashboard/Overview/PendingRequests";
import TopCourses from "../../../components/pages/AdminDashboard/Overview/TopCourses";
import Transactions from "../../../components/pages/AdminDashboard/Overview/Transactions";
TopCourses;
export default function AdminOverview() {
  const allData = [
    {
      title: "Total Funds received",
      icon: dollar,
      quantity: "₹ 0",
    },
    {
      title: "recieved queries",
      icon: time,
      quantity: 0,
    },
    {
      title: "Funds Despersed",
      icon: avatar,
      quantity: 0,
    },
  ];
  return (
    <AdminDashboard currentSection="Overview">
      <Head>
        <title>Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" md:px-[30px] bg-[#fafafa] px-[15px] ">
        <div className="grid lg:grid-cols-4 !mt-[0px] md:grid-cols-2 gap-6 lg:gap-x-6">
          {allData.map((data, index) => (
            <TopCard key={index} data={data} />
          ))}
          <button className="px-8 py-1 md:block hidden self-center rounded-full ml-5 shadow-lg w-fit text-white text-[18px] h-fit bg-[#7D23E0]">
            Google Analytics
          </button>
        </div>

        <Chart />

        <div className="flex md:flex-row flex-col my-12 lg:justify-start justify-between items-start lg:gap-8 gap-5">
          <TopCourses />
          <PendingRequests />
        </div>
        <div className="pb-12">
          <Transactions />
        </div>
      </div>
    </AdminDashboard>
  );
}
