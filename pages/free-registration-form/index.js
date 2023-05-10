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

const OstelloSubscribe = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);

const FreeRegistrationWithForm = () => {
  return (
    <div>
      <main className="md:max-w-[1350px] mx-auto ">
        <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto md:shadow md:rounded-xl">
          <Navbar />
        </div>
        <div className="md:mt-[100px]">
          <FreeRegistrationForm />
          
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default FreeRegistrationWithForm;
