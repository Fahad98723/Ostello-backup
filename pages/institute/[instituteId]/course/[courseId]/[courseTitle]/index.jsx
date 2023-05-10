import axios from "axios";
import React from "react";
import Footer from "../../../../../../components/layout/Footer";
import SingleCourse from "../../../../../../components/pages/Course/SingleCourse";
import Navbar from "../../../../../../components/pages/HomeLanding/Header/Navbar";
import OstelloSubscribe from "../../../../../../components/pages/HomeLanding/OstelloSubscribe";
import EnquirySection from "../../../../../../components/pages/institutes/EnquirySection";
import Join from "../../../../../../components/pages/institutes/Join";
import { host } from "../../../../../../utils/constant";



const index = ({currentCourse, currentInstitute, ip}) => {
  
  return (
    <div className=" md:max-w-[1350px] mx-auto">
      <div className="md:mb-[70px] mb-[50px]">
        <div className="fixed top-0 z-50 bg-white  md:max-w-[1350px] w-full mx-auto  shadow">
          <Navbar />
        </div>
      </div>
      <SingleCourse currentInstitute={currentInstitute} currentCourse={currentCourse}/>
      <EnquirySection currentInstitute={currentInstitute} currentCourse={currentCourse}/>
      <Join />

      <OstelloSubscribe />
      <Footer />
    </div>
  );
};

export default index;


export async function getServerSideProps({ params, req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  //   
  let currentInstitute;
  let currentCourse;

  try {
    const institute = await axios.get(
      `${host}/institute?approval=1&slug=${params.instituteId}&relations=owner,courses,faculties,achievements,reviews`
    );
    const course = await axios.get(
      `${host}/course?id=${params.courseId}`
    );
    currentInstitute = institute?.data?.message;
    currentCourse = course?.data?.message;
  } catch (err) {
    
  }

  
  


  let ip;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  if (!currentInstitute && !currentCourse) {
    return {
      props: {
        notFound: true,
        currentInstitute: {},
        currentCourse: {},
      },
    };
  }

  return { props: {currentInstitute, currentCourse, ip } };
}
