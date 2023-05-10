import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/layout/Footer";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import MetaHelmet from "../../../components/MetaHelmet";
import Recommended from "../../../components/pages/Filter/Recommended";
import { urlToTitle } from "../../../components/utils";
import {
  selectSearch,
  setLocationQuery,
} from "../../../redux/slices/SearchSlice";
import { setUserLocation } from "../../../redux/slices/UserAnalytics";
import { host } from "../../../utils/constant";
import dynamic from "next/dynamic";

const OstelloSubscribe = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);
const OstelloConnect = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloConnect");
  },
  { ssr: false }
);
const Navbar = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/Header/Navbar");
  },
  { ssr: false }
);
const LocationRecommended = dynamic(
  () => {
    return import("../../../components/pages/Filter/LocationRecommended");
  },
  { ssr: false }
);
const CoursesAndInstitutes = dynamic(
  () => {
    return import("../../../components/pages/Filter/CoursesAndInstitutes");
  },
  { ssr: false }
);

const TopLocation = ({ currentTop }) => {
  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
    areaLocation,
    searchByName,
  } = useSelector(selectSearch);
  const { metatitle, metadesc, slugurl, name, content } = currentTop;

  const router = useRouter();
  const dispatch = useDispatch();

  const [contentData, setContentData] = useState(null);

  useEffect(() => {
    if (content) {
      setContentData(content);
    } else {
      setContentData(null);
    }
  }, [content]);

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
  useEffect(() => {
    if (name) {
      const loc = urlToTitle(name);
      dispatch(setLocationQuery(loc));
    }
  }, [name]);

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  return (
    <main className="md:max-w-[1350px] mx-auto ">
      <MetaHelmet
        k
        title={metatitle}
        description={metadesc}
        link={`https://www.ostello.co.in/search/${slugurl}`}
      />
      <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto  md:shadow md:rounded-xl">
        <Navbar />
        {/* <div className=' p-3 rounded-b-xl md:shadow-md '>
        <div className=' md:max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 divide-gray/30 divide-y sm:divide-x sm:divide-y-0 rounded-md border border-gray p-2  sm:mx-auto bg-white '>
          <div className='w-full'>
            <LocationSearch />
          </div>
          <div className='relative w-full'>
            <Search />
          </div>
        </div>
      </div> */}
      </div>
      <div className="md:mt-[50px]">
        <LocationRecommended {...{ name }} content={contentData} />
        <OstelloConnect />
        <CoursesAndInstitutes />
        <OstelloSubscribe />
        <Footer />
      </div>
    </main>
  );
};

export default TopLocation;

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const location = params.toplocation.replace(/-/g, " ");
  const { data } = await axios.get(`${host}/locations?name=${location}`);
  const currentTop = data.message[0];

  if (!data) {
    return {
      notFound: true,
    };
  }
  // Pass post data to the page via props
  return { props: { currentTop } };
}
