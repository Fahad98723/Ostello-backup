import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/layout/Footer";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import MetaHelmet from "../../components/MetaHelmet";
import CardSection from "../../components/pages/Course/MetaCourseSection/CardSection";
import SearchHeader from "../../components/pages/Course/MetaCourseSection/SearchHeader";
import ExamLocation from "../../components/pages/exams/ExamLocation";
import CoursesAndInstitutes from "../../components/pages/Filter/CoursesAndInstitutes";
import MetaRecommended from "../../components/pages/Filter/MetaRecmmended";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import OstelloConnect from "../../components/pages/HomeLanding/OstelloConnect";
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import { setLocationQuery } from "../../redux/slices/SearchSlice";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
import { host } from "../../utils/constant";

const MetaSection = ({ currentMeta }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { metaSection } = router.query;
  const meta_area =
    metaSection.split("-coaching-institutes-in-")[1]?.replace("-", " ") ||
    metaSection.split("-coaching-institutes-in-")[1]?.toString();
  const meta_course = metaSection
    .split("-coaching-institutes-in-")[0]
    ?.toString();
  
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
    if (metaSection?.length > 1) {
      dispatch(setLocationQuery(meta_area));
    }
  }, [metaSection, meta_area]);

  

  const arr = metaSection.split("-coaching-institutes-in-")[0]?.split("-");

  //loop through each element of the array and capitalize the first letter.

  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1);
  }

  const str2 = arr?.join(" ");

  const arr2 = metaSection.split("-coaching-institutes-in-")[1]?.split("-");

  for (var i = 0; i < arr2?.length; i++) {
    arr2[i] = arr2[i]?.charAt(0)?.toUpperCase() + arr2[i]?.slice(1);
  }

  const areaName = arr2?.join(" ");

  

  const[contentData, setContentData] = useState('')

  useEffect(() => {
    if(currentMeta.content){
      setContentData(currentMeta.content)
    }
    else{
      setContentData(null)
    }
  },[currentMeta.content])

  if (router.isFallback) {
    return <LoadingSpinner />;
  }
  return (
    <main className="md:max-w-[1350px] mx-auto ">
      <MetaHelmet
        title={`${currentMeta?.title} | Ostello`}
        description={currentMeta?.description}
        link={`https://www.ostello.co.in/${currentMeta?.url}`}
      />
      <div className="">
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
      {meta_course === "cuet" ? (
        <div className="md:mt-[80px] mt-[10px]">
          <ExamLocation
            examLocation={meta_area}
            content={currentMeta?.content}
          />
        </div>
      ) : (
        <div className="md:mt-[100px] mt-[10px]">
          {/* <MetaRecommended name={currentMeta?.title} content={currentMeta?.content} meta_area={meta_area} meta_course={meta_course}/> */}
          <SearchHeader metaSection={str2} />
          <CardSection metaSection={str2} meta_area={areaName} content={currentMeta?.content} />
          {/* <OstelloConnect /> */}
          {/* <CoursesAndInstitutes /> */}
        </div>
      )}
      <div className="mt-[80px]">
        <OstelloSubscribe />
        <Footer />
      </div>
    </main>
  );
};

export default MetaSection;

export async function getServerSideProps({ params, req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  
  const { data } = await axios.get(`${host}/meta?url=${params.metaSection}`);
  
  const currentMeta = data.message;

  if (!currentMeta) {
    return {
      notFound: true,
    };
  }
  // Pass post data to the page via props
  return { props: { currentMeta } };
}
