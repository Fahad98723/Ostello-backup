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
import FreeRegistrationForm from "../../components/FreeRegistrationForm/FreeRegistrationForm";
import { useRouter } from "next/router";
import ninetynineImage from "../../assets/images/99rs.png";
import WillGet from "../../components/FreeRegistrationForm/WillGet";
import CountdownTimer from "../../components/FreeRegistrationForm/CountDownTimer";

const OstelloSubscribe = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);

const FreeRegistration = () => {
  const router = useRouter();
  const TargetDate = new Date('2023-03-23T00:00:00');
  return (
    <div>
      <main className="md:max-w-[1350px] mx-auto ">
        <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto md:shadow md:rounded-xl">
          <Navbar />
        </div>
        <div className="  w-full md:mt-[100px] px-5">
          <img
            className="  cursor-pointer w-full h-[115px] md:h-full rounded-md mb-2"
            src={ninetynineImage.src}
            onClick={() => router.push("/coaching-in-99")}
            alt=""
          />

          <p
            onClick={() => setOpen(true)}
            className="px-8 py-2 bg-primary w-full md:my-8 md:w-[200px] mx-auto rounded-md text-[20px] text-center text-white cursor-pointer"
          >
            Join Now
          </p>
        </div>
        <div className="md:mt-[100px] px-5">
          <WillGet/>
          <CountdownTimer TargetDate={TargetDate}/>
          <OstelloSubscribe />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default FreeRegistration;
