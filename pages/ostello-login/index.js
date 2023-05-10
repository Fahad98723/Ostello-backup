import React from "react";
import logo from "../../assets/courses_institutions/header/logo.svg";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import Footer from "../../components/layout/Footer";
import { assets } from "../../utils/assets";
import { useRouter } from "next/router";

const OstelloLogin = () => {
  const ostelloLogo = assets.images.ostello_titled_logo;
  const router = useRouter();
  return (
    <div className="max-w-[1350px] mx-auto flex flex-col h-screen">
      <Navbar />
      <div className=" m-auto  py-20 text-center">
        {" "}
        <img
          onClick={() => router.push("/")}
          className="w-40 mx-auto"
          src={ostelloLogo}
          alt="ostello"
        />
        <p className="my-3 text-[17px]">Welcome to OstelloAI</p>
        <p className="my-3 text-[17px]">Log in with your Ostello account to continue</p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              router.push("/merchant/login");
            }}
            className="py-2 px-4 border border-primary bg-primary text-white rounded-md"
          >
            Log In
          </button>
          <button
            onClick={() => {
              router.push("/merchant/signup/");
            }}
            className="py-2 ml-2 px-4 border border-primary bg-primary text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OstelloLogin;
