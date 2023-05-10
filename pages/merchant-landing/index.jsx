import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaHelmet from "../../components/MetaHelmet";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import Footer from "../../components/layout/Footer";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
import Banner from "../../components/pages/RegisterTution/Banner";
import { authSelector } from "../../redux/slices/authSlice";


const OstelloStatistics = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloStatistics");
  },
  { ssr: false }
);
const OstelloFAQ = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloFAQ");
  },
  { ssr: false }
);
const OstelloSubscribe = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);
const Company = dynamic(
  () => {
    return import("../../components/pages/MerchantLanding/Company");
  },
  { ssr: false }
);

const Feature = dynamic(
  () => {
    return import("../../components/pages/MerchantLanding/Feature");
  },
  { ssr: false }
);
const Header = dynamic(
  () => {
    return import("../../components/pages/MerchantLanding/Header");
  },
  { ssr: false }
);
const Review = dynamic(
  () => {
    return import("../../components/pages/MerchantLanding/Review");
  },
  { ssr: false }
);
const JoinHand = dynamic(
  () => {
    return import("../../components/pages/MerchantLanding/JoinHand");
  },
  { ssr: false }
);
const MerchantLanding = ({ meta }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);
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
    <section>
      <MetaHelmet title={meta.title} link={meta.link} />
      <div className=" md:max-w-[1350px] mx-auto">
        <div className="divide-y-[.5px] divide-gray/10">

          <div className="md:mb-[70px]">
        <div className="fixed top-0 z-50 bg-white  md:max-w-[1350px] w-full mx-auto  shadow">
        <Navbar usingFor="merchant" text={"text-[#667085]"} />
        </div>
        </div>
          <Header />
        </div>
        <JoinHand />
        <Feature />
        <OstelloStatistics />
        <OstelloFAQ usingFor="merchantLanding" />
        <Review />
      </div>
      <Company />
      <div className=" md:max-w-[1350px] mx-auto">
      {!isAuthenticated ? <Banner /> : ""}
      </div>
      <div className="md:p-10 p-5 md:pb-0 pb-0 container mx-auto">
        <OstelloSubscribe />
        <Footer />
      </div>
    </section>
  );
};

export default MerchantLanding;

export const getStaticProps = async () => {
  const meta = {
    title: "Merchant - ostello.co.in",
    link: "https://www.ostello.co.in/merchant-landing",
  };
  return {
    props: {
      meta,
    },
  };
};
