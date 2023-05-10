import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/layout/Footer";
import MetaHelmet from "../../../components/MetaHelmet";
import Navbar from "../../../components/pages/Payment/components/navabr/Navbar";
import {
  authSelector,
  getInstituteDetails,
} from "../../../redux/slices/authSlice";
import { host } from "../../../utils/constant";

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { instituteDetails, loading } = useSelector(authSelector);

  const approval = instituteDetails.approval;

  const [mounted, setMounted] = useState(false);

  

  return (
    <main className='bg-white className="md:max-w-[1350px] mx-auto '>
      <div className="fixed w-full bg-white z-50 top-0 shadow">
        <Navbar />
      </div>
      <main className="flex justify-center flex-col items-center  w-screen h-screen m-0 md:p-0 px-2 font-dm-sans mt-7">
        <div className="flex flex-col  h-fit bg-[#F4EBFF] rounded-2xl w-full lg:w-4/6 px-6 lg:px-12 py-2 lg:py-12 ">
          <div className="flex flex-col items-center justify-center w-full font-dm-sans">
            <div className="mb-6 w-36 h-36 flex justify-center items-center rounded-full bg-primary">
              <BsCheck2 className="text-8xl text-white" />
            </div>
            <h1 className="my-2 text-2xl text-center w-max font-bold">
              Form Data Submitted
            </h1>

            <p className="text-xl text-center my-2">
              Thank you for providing confirmation. Our team will contact you
              shortly. If you have any questions, please contact us at
              care@ostello.co.in.
            </p>

            <div
              onClick={() => {
                router.push("/");
              }}
              className="bg-primary text-white uppercase px-12 py-2 mt-10 rounded-full"
            >
              Home{" "}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
};

export default Success;
