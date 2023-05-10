import React from "react";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import OstelloFAQ from "../../components/pages/HomeLanding/OstelloFAQ";
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import Banner from "../../components/pages/RegisterTution/Banner";
import RegisterForm from "../../components/pages/RegisterTution/RegisterForm";

const RegisterTution = () => {
  return (
    <div>
      <div className=" md:max-w-[1350px] mx-auto">
        <Navbar text={"text-[#667085]"} />
      </div>
      <Banner />
      <div className=" md:max-w-[1350px] mx-auto">
        <RegisterForm/>
        <OstelloFAQ/>
        <OstelloSubscribe />
        <Footer />
      </div>
    </div>
  );
};

export default RegisterTution;
