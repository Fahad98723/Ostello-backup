import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/layout/Footer";
import MetaHelmet from "../../components/MetaHelmet";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import { setUserLocation } from "../../redux/slices/UserAnalytics";

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

const Recommended = dynamic(
  () => {
    return import("../../components/pages/Filter/Recommended");
  },
  { ssr: false }
);
// const LocationSearch = dynamic(
//   () => {
//     return import(
//       "../../components/pages/HomeLanding/Header/SearchBar/LocationSearch"
//     );
//   },
//   { ssr: false }
// );
// const Search = dynamic(
//   () => {
//     return import("../../components/pages/HomeLanding/Header/SearchBar/Search");
//   },
//   { ssr: false }
// );

const SearchPage = ({ meta }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  return (
    <main className="md:max-w-[1350px] mx-auto ">
      <MetaHelmet
        title="Search Top Coaching Institutes & Coaching Classes for Courses"
        description="Ostello is the world's first marketplace for coaching institutes. It provides you the platform to get your institute listed among thousands of coaching institutes all over India."
        link="https://www.ostello.co.in/search"
      ></MetaHelmet>
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
      <Recommended />
      <OstelloConnect />
      {/* <CoursesAndInstitutes /> */}
      <OstelloSubscribe />
      <Footer />
      </div>
    </main>
  );
};

export default SearchPage;

export const getStaticProps = async () => {
  const meta = {
    title: "Search Top Coaching Institutes & Coaching Classes for Courses",
    description:
      "Ostello is the world's first marketplace for coaching institutes. It provides you the platform to get your institute listed among thousands of coaching institutes all over India.",
    link: "https://www.ostello.co.in/search",
  };

  return {
    props: {
      meta,
    },
  };
};
