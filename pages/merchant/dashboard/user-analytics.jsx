import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import UserStats from "../../../components/pages/Merchant/Dashboard/DashboardHome/Chart/UserStats";
import AnalyticsSidebar from "../../../components/pages/Merchant/Dashboard/UserAnalytics/AnalyticsSidebar";
import ToggleAnalyticsSidebar from "../../../components/pages/Merchant/Dashboard/UserAnalytics/ToggleAnalyticsSidebar";
import {
  getMerchantAnalytics,
  selectUserAnalytics,
} from "../../../redux/slices/UserAnalytics";
import { INSTITUTE_ID } from "../../../utils/constant";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export default function UserAnalytics() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [dates, setDates] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [visitInstitute, setVisitInstitute] = useState([]);
  const [knowInstitute, setKnowInstitute] = useState([]);
  const [researchFaculty, setResearchFaculty] = useState([]);
  const [watchVideos, setWatchVideos] = useState([]);
  const [exploreCourses, setExploreCourses] = useState([]);
  const { merchantAnalytics } = useSelector(selectUserAnalytics);
  const dispatch = useDispatch();
  const [visitInstituteCount, setVisitInstituteCount] = useState([]);
  const [knowInstituteCount, setKnowInstituteCount] = useState([]);
  const [exploreCoursesCount, setExploreCoursesCount] = useState([]);
  const [researchFacultyCount, setResearchFacultyCount] = useState([]);
  const [watchVideosCount, setWatchVideosCount] = useState([]);
  useEffect(() => {
    INSTITUTE_ID?.length > 0 && dispatch(getMerchantAnalytics(INSTITUTE_ID));
  }, [dispatch]);

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

      dates_data.push({ date: date, data: data_of_date });

      data_of_date.forEach((data) => {
        if (data.activity_type === "visit_institute") {
          visit_institute_dod.push(data);
        }
        if (data.activity_type === "know_institute") {
          know_institute_dod.push(data);
        }
        if (data.activity_type === "explore_courses") {
          explore_courses_dod.push(data);
        }
        if (data.activity_type === "research_faculties") {
          research_faculties_dod.push(data);
        }
        if (data.activity_type === "watch_videos") {
          watch_videos_dod.push(data);
        }
      });
      visit_institute.push(DataWithTime(date, visit_institute_dod));
      know_institute.push(DataWithTime(date, know_institute_dod));
      explore_courses.push(DataWithTime(date, explore_courses_dod));
      research_faculties.push(DataWithTime(date, research_faculties_dod));
      watch_videos.push(DataWithTime(date, watch_videos_dod));
    });
    setDates(allDates);
    setDatesData(dates_data);
    setVisitInstitute(visit_institute);
    setKnowInstitute(know_institute);
    setExploreCourses(explore_courses);
    setResearchFaculty(research_faculties);
    setWatchVideos(watch_videos);
  }, [merchantAnalytics]);

  useEffect(() => {
    let vi = [];
    let ki = [];
    let ec = [];
    let rf = [];
    let wv = [];
    visitInstitute?.map((i) => vi.push(i?.totalUsers));
    knowInstitute?.map((i) => ki.push(i?.totalUsers));
    exploreCourses?.map((i) => ec.push(i?.totalUsers));
    researchFaculty?.map((i) => rf.push(i?.totalUsers));
    watchVideos?.map((i) => wv.push(i?.totalUsers));

    setVisitInstituteCount(vi);
    setKnowInstituteCount(ki);
    setExploreCoursesCount(ec);
    setResearchFacultyCount(rf);
    setWatchVideosCount(wv);
  }, [
    exploreCourses,
    visitInstitute,
    knowInstitute,
    researchFaculty,
    watchVideos,
  ]);

  return (
    <>
      <div className="p-5 ">
        <Head>
          <title>User Analytics - Merchant Dashboard - Ostello</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="dashboard">
          <ToggleAnalyticsSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          ></ToggleAnalyticsSidebar>
          <div className=" grid grid-cols-6 gap-0 bg-white ">
            <AnalyticsSidebar />
            <div
              style={{ background: " #FAFAFB" }}
              className="  col-span-6 lg:col-span-5  mt-5"
              onClick={() => setShowSidebar(false)}
            >
              <div className="heading bg-white">
                <h1 className="text-2xl font-bold">Users Analytics</h1>
              </div>
              <div className=" grid gap-6 ">
                <div className=" col-span-6 lg:col-span-4">
                  <div className="bg-white pt-5">
                    <div style={{ width: "100%" }}>
                      <Chart
                        type="bar"
                        // width={1150}
                        // height={560}
                        series={[
                          {
                            name: "Visit Institute",
                            data: visitInstituteCount,
                            //color: '#f90000'
                          },
                          {
                            name: "Know Institute,",
                            data: knowInstituteCount,
                            // color: '#000000'
                          },
                          {
                            name: "Explore Courses,",
                            data: exploreCoursesCount,
                            // color: '#000000'
                          },
                          {
                            name: "Research Faculty,",
                            data: researchFacultyCount,
                            // color: '#000000'
                          },
                          {
                            name: "Watch Videos",
                            data: watchVideosCount,
                            // color: '#000000'
                          },
                        ]}
                        options={{
                          title: {
                            text: "All Impressions in Month",
                          },
                          chart: {
                            stacked: true,
                            toolbar: {
                              show: true,
                            },
                          },
                          plotOptions: {
                            bar: {
                              // horizontal:true,
                              // columnWidth:'100%'
                            },
                          },
                          stroke: {
                            width: 1,
                            colors: ["#fff"],
                          },
                          xaxis: {
                            categories: dates,
                            title: {
                              text: "Impressions in Month",
                            },
                            // labels: {
                            //   formatter: function (val) {
                            //     return val + "K"
                            //   }
                            // }
                          },
                          yaxis: {
                            title: {
                              text: "Users Engagement",
                            },
                          },
                          dataLabels: {
                            enabled: true,
                          },
                          // tooltip: {
                          //   y: {
                          //     formatter: function (val) {
                          //       return val + "K"
                          //     }
                          //   }
                          // },
                          fill: {
                            opacity: 1,
                          },
                          legend: {
                            position: "top",
                            horizontalAlign: "left",
                            offsetX: 10,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-5">
                <UserStats />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
