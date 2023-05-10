import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/layout/Footer";
import OfferRecommended from "../../components/pages/Filter/OfferRecommended";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import OstelloConnect from "../../components/pages/HomeLanding/OstelloConnect";
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import { urlToTitle } from "../../components/utils";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
import ninetynineImage from "../../assets/images/99rs.png";
import WillGet from "../../components/FreeRegistrationForm/WillGet";
import CountdownTimer from "../../components/FreeRegistrationForm/CountDownTimer";
import { authSelector, setAuthModalState } from "../../redux/slices/authSlice";
import AuthModal from "../../components/pages/HomeLanding/Header/Navbar/AuthModal";
const OfferInstitutes = () => {
  const router = useRouter();
  const TargetDate = new Date("2023-03-23T00:00:00");
  const dispatch = useDispatch();

  

  const { isAuthenticated, userData } = useSelector(authSelector);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <main className="md:max-w-[1350px] mx-auto ">
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto  md:shadow md:rounded-xl">
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
          onClick={() => {
            if (isAuthenticated) {
              router.push("/free-registration-form");
            } else {
              handleOpen()
              dispatch(setAuthModalState(2));
            }
          }}
          className="px-8 py-2 bg-primary w-full md:my-8 md:w-[200px] mx-auto rounded-md text-[20px] text-center text-white cursor-pointer"
        >
          Join Now
        </p>
      </div>
      <div className="md:mt-[100px] px-5">
        <WillGet handleOpen={handleOpen}/>
        <CountdownTimer TargetDate={TargetDate} handleOpen={handleOpen}/>
      </div>
      <div className="md:mt-[50px]">
        <OfferRecommended />
        <OstelloConnect />

        <OstelloSubscribe />
        <Footer />
      </div>
    </main>
  );
};

export default OfferInstitutes;
