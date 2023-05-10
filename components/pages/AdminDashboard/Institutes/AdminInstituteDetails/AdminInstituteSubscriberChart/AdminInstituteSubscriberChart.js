import { Pagination } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoPencilOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { adminDeleteCourse } from "../../../../../../redux/slices/adminCourseSlice";
import { fetchAdminInstitutes } from "../../../../../../redux/slices/adminInstitutesSlice";
import { host } from "../../../../../../utils/constant";
import { DeleteIcon } from "../../../../../SVGIcons";
import CourseCard from "../../../AdminCard/CourseCard";
import DeleteConfirmationModal from "../../../AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";
import SubscriberChart from "./SubscriberChart";
import { RiArrowRightSLine } from "react-icons/ri";

const AdminInstituteSubscriberChart = () => {
  const router = useRouter();
  const { instituteId } = router.query;
  const [courses, setCourses] = useState([]);
  const [deleteCoupon, setDeleteCoupon] = useState(false);
  const [id, setId] = useState("");
  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(20);

  const [merchantAnalytics, setMerchantAnalytics] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await axios.get(
          `${host}/analytics?instituteid=${instituteId}&activitytype=subscribe_institute&limit=50`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${
                typeof window !== "undefined" &&
                window.localStorage.getItem("ACCESS_TOKEN")
              }`,
            },
          }
        );
        setMerchantAnalytics(response.data.message);

     
      } catch (err) {
 
      }
    };
    run();
  }, [instituteId]);

  const [dates, setDates] = useState([]);
  const [datesData, setDatesData] = useState([]);

  useEffect(() => {
    let visit_institute = [];
    let know_institute = [];
    let research_faculties = [];
    let explore_courses = [];
    let watch_videos = [];

    let DataWithTime = (time = "", dataArray = []) => {
      const temp = new Set();
      let arr = [];
      dataArray?.map((u) => temp.add(u?.payload?.userid));
      arr = [...temp];
      return {
        date: time,
        data: dataArray,
        totalUsers: dataArray?.length,
        oldUsers: arr?.length,
        newUsers: dataArray?.length - arr?.length,
      };
    };

    const set_of_dates = new Set();
    const setOfType = new Set();
    const setOfLocations = new Set();
    merchantAnalytics?.map((items) => {
      set_of_dates?.add(
        moment(items?.timestamp?.split("T")[0])?.format("ll")?.split(",")[0]
      );
      setOfType.add(items?.activity_type);
      // setOfLocations.add(items?.area)
    });
    let allArea = [...setOfLocations];
    let allDates = [...set_of_dates];

    let dates_data = [];
    allDates?.map((date) => {
      let data_of_date = merchantAnalytics?.filter(
        (item) =>
          moment(item?.timestamp?.split("T")[0])
            ?.format("ll")
            ?.split(",")[0] === date
      );
      let visit_institute_dod = [];
      let know_institute_dod = [];
      let research_faculties_dod = [];
      let explore_courses_dod = [];
      let watch_videos_dod = [];
      let subscribe_institute = [];

      dates_data.push({ date: date, data: data_of_date });



      data_of_date.forEach((data) => {
        if (data.activity_type === "subscribe_institute") {
          subscribe_institute.push(data);
        }
        // if (data.activity_type === "visit_institute") {
        //   visit_institute_dod.push(data);
        // }
        // if (data.activity_type === "know_institute") {
        //   know_institute_dod.push(data);
        // }
        // if (data.activity_type === "explore_courses") {
        //   explore_courses_dod.push(data);
        // }
        // if (data.activity_type === "research_faculties") {
        //   research_faculties_dod.push(data);
        // }
        // if (data.activity_type === "watch_videos") {
        //   watch_videos_dod.push(data);
        // }
      });
      //   visit_institute.push(DataWithTime(date, visit_institute_dod));
      //   know_institute.push(DataWithTime(date, know_institute_dod));
      //   explore_courses.push(DataWithTime(date, explore_courses_dod));
      //   research_faculties.push(DataWithTime(date, research_faculties_dod));
      //   watch_videos.push(DataWithTime(date, watch_videos_dod));
      //   subscribe_institute.push(date, subscribe_institute);
      //   subscribe_institute.push(date, subscribe_institute));
    });
    setDates(allDates);
    setDatesData(dates_data);
  }, [merchantAnalytics]);



  const [subscribers, setSubscribers] = useState([]);
  const [subscriberData, setSubscriberData] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(
          `${host}/institute/subscriptions?instituteid=${instituteId}&limit=${limit}&skip=${
            skip * 20
          }`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setSubscribers(res?.data?.count);
        setSubscriberData(res?.data?.message);
        setPaginationButton(Math.ceil(res.data.count / 20));
   
      } catch (err) {
        toast.error(err.message);
      }
    };
    run();
  }, [instituteId, limit, skip]);



  return (
    <div>
      <div className="px-[30px] pt-4 pb-16">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">
          Institute Subscriber
        </h2>
        <p>Total Subscriber {subscribers}</p>
        <div>
          <SubscriberChart dates={dates} datesData={datesData} />

          <div className="bg-white md:mt-5 mt-0 p-3 rounded-lg">
            <table className="md:block hidden">
              <thead className="bg-white table w-full table-fixed border-light-gray border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Name of Student
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Date of Subscriptions
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody className="">
                {subscriberData?.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <td className="px-6 py-4 font-medium text-[#252733]">
                      <div className="flex items-center">
                        {data?.student?.avatar?.key ? (
                          <img
                            className="mr-3 h-10 w-10 rounded-full"
                            src={`https://cdn.ostello.co.in/${data?.student?.avatar?.key}`}
                            alt=""
                          />
                        ) : (
                          <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                            {data?.student?.name?.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        {data?.student.name}
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      {data?.student?.phonenumber}
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div>
                          {new Date(data?.created_at).toLocaleDateString()}
                        </div>

                        <div className="text-[#9FA2B4] text-sm">
                          {new Date(data?.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4">
                      <div className="flex flex-col ">
                        {data?.student?.location?.area}
                        <div className="text-[#9FA2B4] font-normal">
                          {" "}
                          {data?.student?.location?.state}
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <>
              <div className="md:hidden block">
                <h3 className="mb-3 font-bold text-[#9FA2B4]">
                  Name of Students
                </h3>
                <div className="flex space-y-4 flex-col">
                  {subscriberData?.map((data, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-start">
                        <div className="flex items-center space-x-3">
                          {data?.student?.avatar?.key ? (
                            <img
                              className="mr-3 h-10 w-10 rounded-full"
                              src={`https://cdn.ostello.co.in/${data?.student?.avatar?.key}`}
                              alt=""
                            />
                          ) : (
                            <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                              {data?.student?.name?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <p className="text-[#252733] font-bold">
                            {data.student.name}
                          </p>
                        </div>
                        <div>
                          <RiArrowRightSLine className="scale-125" />
                        </div>
                      </div>
                      <div className="flex mt-3 space-x-1 justify-between">
                        <div className="w-6/12 text-[#717171] text-sm">
                          <div>Phonenumber:</div>
                          <div>Date of Registration :</div>
                          <div>Location :</div>
                        </div>
                        <div className="w-6/12 font-bold text-sm">
                          <div>Above {data?.student?.phonenumber}</div>
                          <div>{data?.created_at?.split("T")[0]}</div>
                          <div>
                            {" "}
                            {data?.student?.location?.area},{" "}
                            {data?.student?.location?.state}
                          </div>
                        </div>
                      </div>
                      <hr className="mt-3" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          </div>

          <Pagination
            onChange={(e, v) => {
              setSkip(v - 1);
          
            }}
            count={paginationButton}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminInstituteSubscriberChart;
