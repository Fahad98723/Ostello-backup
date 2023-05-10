import React, { useEffect, useState } from "react";
import ChartHeader from "./ChartHeader";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { authSelector } from "../../../../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { FaCrown } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import UpgardeModal from "../../UpgradeModal/UpgardeModal";

const Charts = ({ merchantAnalyticsData, dates, analytics }) => {
  const [usersCount, setUsersCount] = useState([]);
  const [oldUsersCount, setOldUsersCount] = useState([]);
  const [newUsersCount, setNewUsersCount] = useState([]);
  const router = useRouter();
  

  const { instituteDetails } = useSelector(authSelector);

  // useEffect(() => {
  //   let users = [];
  //   const temp = new Set();
  //   const tempNew = new Set();
  //   let oldUsersInDate = [];
  //   let newUsersInDate = [];
  //   datesData?.map((d) => {
  //     let arrOld = [];
  //     let arrNew = [];
  //     d?.data?.map((u) => {
  //       temp.add(u?.payload?.userid);
  //       tempNew.add(u?.payload?.ipaddress);
  //     });
  //     arrOld = [...temp];
  //     arrNew = [...tempNew];
  //     oldUsersInDate.push(arrOld?.length);
  //     newUsersInDate.push(Math.abs(arrNew?.length - arrOld?.length));
  //     users?.push(arrNew?.length);
  //   });
  //   setUsersCount(users);
  //   setOldUsersCount(oldUsersInDate);
  //   setNewUsersCount(newUsersInDate);
  // }, [datesData]);

  useEffect(() => {
    let users = [];
    const temp = new Set();
    const tempNew = new Set();
    let oldUsersInDate = [];
    let newUsersInDate = [];

    merchantAnalyticsData.forEach((element) => {
      users.push(element.totalUsers);
      oldUsersInDate.push(element.oldUsers);
      newUsersInDate.push(element.newUsers);
    });

    setUsersCount(users);
    setOldUsersCount(oldUsersInDate);
    setNewUsersCount(newUsersInDate);
  }, [merchantAnalyticsData]);

  

  const config = {
    series: [
      {
        name: "Total Users",
        data: usersCount,
      },
      {
        name: "Old Users",
        type: "line",
        data: oldUsersCount,
      },
      {
        name: "New Users",
        type: "line",
        data: newUsersCount,
      },
    ],
    options: {
      chart: {
        id: "usersChart",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
      },

      dataLabels: {
        enabled: true,
      },

      stroke: {
        curve: "smooth",
      },
      //   title: {
      //     text: 'Total Users: ',
      //     align: 'left'
      //   },

      xaxis: {
        categories: dates,
        title: {
          text: "Days",
        },
      },

      yaxis: {
        title: {
          text: "Users",
        },
      },
    },
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <div className="bg-white p-3 rounded-2xl">
        <div style={{ width: "100%" }}>
          <ChartHeader />
          <div
            className={`${
              instituteDetails?.accountplan === "free_plan" ? " relative" : ""
            }
            `}
          >
            <Chart
              options={config.options}
              series={config.series}
              type="line"
              height="300"
              width="100%"
              className={`${
                instituteDetails?.accountplan === "free_plan"
                  ? "blur-sm relative"
                  : ""
              }
            `}
            />
            {instituteDetails?.accountplan === "free_plan" ? (
              <div
                className="absolute top-1/2 left-1/2 shadow-md bg-white p-2 rounded-md  transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  handleOpen();
                }}
              >
                <div className="flex items-center">
                  <FaCrown className="text-[#FFD907]  mr-2 text-[30px]" />
                  <p className="text-primary mr-2 text-[20px]">Unlock</p>
                  <AiOutlineQuestionCircle />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-end mb-5 items-center gap-3">
            <button
              onClick={() => router.push("/merchant/dashboard/user-analytics")}
              className="px-5 py-.5 rounded text-xs font-bold text-primary hover:bg-[#FAFAFB]"
            >
              View Impressions
            </button>
          </div>
          <div className="flex justify-end items-center gap-3 pr-2">
            <button className="px-5 py-1 rounded font-bold text-primary border-2 border-primary hover:bg-[#FAFAFB]">
              After Math
            </button>
            <button className="px-5 py-1.5 rounded text-primary bg-[#F2E9FC] hover:bg-[#FAFAFB]">
              Sales
            </button>
          </div>
        </div>
      </div>

      <UpgardeModal open={open} setOpen={setOpen} handleClose={handleClose} />
    </>
  );
};

export default Charts;
