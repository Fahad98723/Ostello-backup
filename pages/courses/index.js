import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MetaHelmet from "../../components/MetaHelmet";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import Footer from "../../components/layout/Footer";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import CourseCard from "../../components/pages/Home/PopularCourses/CourseCard";
import toast from "react-hot-toast";
import { host } from "../../utils/constant";
import axios from "axios";

const OstelloSubscribe = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);
const OstelloConnect = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloConnect");
  },
  { ssr: false }
);

const CoursesAndInstitutes = dynamic(
  () => {
    return import("../../components/pages/Filter/CoursesAndInstitutes");
  },
  { ssr: false }
);

const RecommendedCourses = dynamic(
  () => {
    return import("../../components/pages/Filter/RecommendedCourses");
  },
  { ssr: false }
);
const LocationSearch = dynamic(
  () => {
    return import(
      "../../components/pages/HomeLanding/Header/SearchBar/LocationSearch"
    );
  },
  { ssr: false }
);
const Search = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/Header/SearchBar/Search");
  },
  { ssr: false }
);
const Courses = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState(15);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      try {
        const { data } = await axios.get(`${host}/course?limit=50`, config);
        const newData = data?.message;

        setCourses(newData);
      } catch (error) {
        toast.error(error.toString());
      }
    };
    getCourses();
  }, []);



  return (
    <div>
      <main className="md:max-w-[1350px] mx-auto ">
        {/* <MetaHelmet
        title={meta.title}
        description={meta.description}
        link={meta.link}
      ></MetaHelmet> */}
        <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto md:shadow md:rounded-xl">
          <Navbar />
          {/* <div className=" p-3 rounded-b-xl md:shadow-md ">
        <div className=" md:max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 divide-gray/30 divide-y sm:divide-x sm:divide-y-0 rounded-md border border-gray p-2  sm:mx-auto bg-white ">
          <div className="w-full">
            <LocationSearch />
          </div>
          <div className="relative w-full">
            <Search />
          </div>
        </div>
      </div> */}
        </div>
        <div className="md:mt-[50px]">
          <RecommendedCourses />
          <OstelloConnect />
          <div className="md:px-24 px-5 md:py-10 pb-5">
            <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
              {courses?.length > 0 &&
                courses.slice(9, itemCount).map((item, key) => <CourseCard {...item} key={key} />)}
            </div>

            <div
              onClick={() => {
                const itemHandler = () => {
                  if (!isViewMore) {
                    setItemCount(30);
                  } else {
                    setItemCount(12);
                  }
                };
                itemHandler();

                setIsViewMore(!isViewMore);
              }}
              className="text-xl text-primary flex items-center space-x-2 cursor-pointer justify-center"
            >
              <p>{isViewMore ? "View Less" : "View More"}</p>
              {isViewMore ? (
                <UpOutlined className="flex items-center text-sm" />
              ) : (
                <DownOutlined className="flex items-center text-sm" />
              )}
            </div>

            {/* <Adsense
              client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
              slot="2378478334"
              style={{ display: "block", marginTop: "10px" }}
              layout="in-article"
              format="autorelaxed"
            /> */}
          </div>
          <OstelloSubscribe />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Courses;
