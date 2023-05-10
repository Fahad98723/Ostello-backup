import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AnalyticsSidebar from "../../../components/pages/Merchant/Dashboard/UserAnalytics/AnalyticsSidebar";
import ToggleAnalyticsSidebar from "../../../components/pages/Merchant/Dashboard/UserAnalytics/ToggleAnalyticsSidebar";
import { host, INSTITUTE_ID } from "../../../utils/constant";

export default function SingleActivity() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userName, setUserName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const router = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    const getSingleData = async () => {
      const response = await axios.get(
        `${host}/analytics?instituteid=${INSTITUTE_ID}&id=${router.query?.singleactivity}`,
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

      setData(response?.data?.message);
    };
    if (INSTITUTE_ID?.length > 0) {
      getSingleData();
    }
  }, []);

  useEffect(() => {
    if (data?.payload?.userid) {
      getUserName(data?.payload?.userid);
    }
    if (data?.payload?.courseid) {
      getCourseName(data?.payload?.courseid);
    }
    if (data?.payload?.instituteid) {
      getInstituteName(data?.payload?.instituteid);
    }
    if (data?.payload?.facultyid) {
      getFacultyName(data?.payload?.facultyid);
    }
  }, [
    data?.payload?.userid,
    data?.payload?.courseid,
    data?.payload?.instituteid,
    data?.payload?.facultyid,
  ]);

  const getUserName = async (userId) => {
    const response = await axios.get(`${host}/users?id=${userId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${
          typeof window !== "undefined" &&
          window.localStorage.getItem("ACCESS_TOKEN")
        }`,
      },
    });
    setUserName(response?.data?.message?.name);
  };
  const getFacultyName = async (facultyId) => {
    const response = await axios.get(
      `${host}/institute/faculty?id=${facultyId}`,
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
    setFacultyName(response?.data?.message?.name);
  };
  const getInstituteName = async (instituteId) => {
    const response = await axios.get(`${host}/institute?id=${instituteId}`);
    setInstituteName(response?.data?.message?.name);
  };
  const getCourseName = async (courseId) => {
    const response = await axios.get(`${host}/course?id=${courseId}`);
    setCourseName(response?.data?.message?.name);
  };
  return (
    <>
      <Head>
        <title>Single Activity - Merchant Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="dashboard">
        <ToggleAnalyticsSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></ToggleAnalyticsSidebar>
        <div className=" grid grid-cols-6 gap-0 bg-white ">
          <AnalyticsSidebar />
          <div
            // style={{ background: ' #FAFAFB' }}
            className="  col-span-6 lg:col-span-5  mt-5"
            onClick={() => setShowSidebar(false)}
          >
            <div className=" bg-white">
              <div className="flex justify-center items-center mt-5 bg-white">
                <h1>Activity Type : {data?.activity_type} </h1>
              </div>
              <p className="font-bold text-xl ml-5">
                User: {userName || "Anonymous"}
              </p>
              <p className="font-bold text-xl ml-5">
                Location: {data?.areas?.length > 1 ? data?.areas[2] : "N/A"}
              </p>
              <div className="ml-5">
                {data?.activity_type === "visit_institute" ? (
                  <div className="mr-2">
                    <p className="text-xl font-bold">
                      Institute: {instituteName}
                    </p>
                  </div>
                ) : data?.activity_type === "watch_videos" ? (
                  <div className="mr-2">
                    <p className="text-xl font-bold mb-3">Content :</p>
                    <div className="border relative border-white rounded-xl overflow-hidden h-[300px] w-[400px] aspect-video">
                      <video
                        onContextMenu={(e) => e.preventDefault()}
                        controlsList="nodownload"
                        // poster={thumbnailURL}
                        // style={{ maxWidth: '50%', width: '100%', margin: '0 auto' }}
                        loop
                        muted
                        preload="true"
                        controls
                        alt="Ostello"
                        src={data?.payload?.video?.video?.url}
                      />
                    </div>
                  </div>
                ) : data?.activity_type === "research_faculties" ? (
                  <div className="ml-5">
                    <p className="text-xl font-bold">Faculty : {facultyName}</p>
                  </div>
                ) : data?.activity_type === "explore_courses" ? (
                  <div className="ml-5">
                    <p className="text-xl font-bold">Course: {courseName}</p>
                  </div>
                ) : data?.activity_type === "visit_time" ? (
                  <div className="ml-5">
                    <p className="text-xl font-bold">
                      Total Time: {data?.payload?.total_time_in_seconds} s
                    </p>
                  </div>
                ) : (
                  <div className="ml-5">
                    <p className="text-xl font-bold">
                      Institute: {instituteName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
