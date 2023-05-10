import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../../redux/slices/UserAnalytics";
import dynamic from "next/dynamic";
import { setLocationQuery } from "../../../redux/slices/SearchSlice";
const Schema = dynamic(

  () => {
    return import("../../Schema");
  },
  { compatibleMode: true, on: ["visible"] }
);
const Header = lazyHydrate(
  () => {
    return import("./Header");
  },
  { compatibleMode: true, on: ["visible"] }
);
const Navbar = lazyHydrate(
  () => {
    return import("./Header/Navbar");
  },
  { compatibleMode: true, on: ["visible"] }
);
const Footer = lazyHydrate(
  () => {
    return import("../../layout/Footer");
  },
  { compatibleMode: true, on: ["visible"] }
);
const InstituteSection = lazyHydrate(
  () => {
    return import("./InstituteSection");
  },
  { compatibleMode: true, on: ["visible"] }
);
const OstelloOffers = lazyHydrate(
  () => {
    return import("./OstelloOffers");
  },
  { compatibleMode: true, on: ["visible"] }
);
const OstelloExplore = lazyHydrate(
  () => {
    return import("./OstelloExplore/OstelloExplore");
  },
  { compatibleMode: true, on: ["visible"] }
);

const OstelloFAQ = lazyHydrate(
  () => {
    return import("./OstelloFAQ");
  },
  { compatibleMode: true, on: ["visible"] }
);

const DownloadApp = lazyHydrate(
  () => {
    return import("../Mentor/DownloadApp");
  },
  { compatibleMode: true, on: ["visible"] }
);

export default function HomeLanding() {
  const description = "Ostello ";
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
  }, []);

  useEffect(() => {
    dispatch(setLocationQuery(""));
  }, []);

  return (
    <>
      <main className="md:max-w-[1350px] mx-auto ">
        <div className="">
          <Navbar />
        </div>
        <Header />
        <OstelloOffers />
        <InstituteSection />
        <OstelloExplore />
        <DownloadApp />
        <OstelloFAQ usingFor={"userLanding"} />
        <Footer />
      </main>
    </>
  );
}
