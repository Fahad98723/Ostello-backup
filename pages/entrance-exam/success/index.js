import React, { useEffect } from "react";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
  logout,
} from "../../../redux/slices/authSlice";
import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "../../../components/layout/Footer";
import { host } from "../../../utils/constant";
import Navbar from "../../../components/pages/Payment/components/navabr/Navbar";
import MetaHelmet from "../../../components/MetaHelmet";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import { MdContentCopy } from "react-icons/md";
import { isEmpty } from "../../../utils/utils";

const Finished = ({ meta }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { instituteDetails, loading } = useSelector(authSelector);

  const approval = instituteDetails.approval;

  const [mounted, setMounted] = useState(false);

  const { examRefCode } = useSelector(institutesSelector);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("OWNER_ID") === null
    ) {
      return router.push("/merchant/login");
    } else {
      axios
        .get(
          `${host}/users?id=${
            typeof window !== "undefined" &&
            window.localStorage.getItem("OWNER_ID")
          }`,
          {
            headers: {
              Authorization: `Bearer ${
                typeof window !== "undefined" &&
                window.localStorage.getItem("ACCESS_TOKEN")
              }`,
            },
          }
        )
        .then((res) => {
          if (res.data.message.institute === null) {
            router.push("/merchant/details");
            return;
          }
          

          typeof window !== "undefined" &&
            window.localStorage.setItem(
              "INSTITUTE_ID",
              res?.data?.message?.institute?.id
            );
          setMounted(true);
        })
        .catch((err) => {})
    }
  }, []);

  useEffect(() => {
    if (isEmpty(instituteDetails) && mounted) {
      dispatch(getInstituteDetails());
    }
    if (!loading && instituteDetails.approval === 1) {
      router.push("/merchant/dashboard");
    }
  }, [instituteDetails, mounted, loading, router]);

  const [copied, setCopied] = useState(false);

  return (
    <main className="bg-white">
      <Navbar />
      <main className="flex justify-center flex-col items-center  w-screen h-screen m-0 p-0 font-dm-sans">
        <div className="flex flex-col  h-fit bg-[#F4EBFF] rounded-2xl w-full lg:w-4/6 px-6 lg:px-12 py-2 lg:py-12 ">
          <div className="flex flex-col items-center justify-center w-full font-dm-sans">
            <div className="mb-6 w-36 h-36 flex justify-center items-center rounded-full bg-primary">
              <BsCheck2 className="text-8xl text-white" />
            </div>
            <h1 className="my-2 text-2xl text-center w-max font-bold ">
              Entrance Exam Submitted
            </h1>
            {examRefCode ? (
              <div className="bg-primary/20 p-2 my-3 flex justify-between items-center border-dashed border-2 border-white rounded">
                <p className="text-lg mr-2">
                  Your Referral Code : {examRefCode}
                </p>
                <button
                  className="bg-primary/80 p-1 text-white rounded flex items-center text-lg"
                  onClick={() => {
                    navigator.clipboard.writeText(examRefCode);
                    if (navigator.clipboard.writeText(examRefCode)) {
                      setCopied(true);
                    }
                  }}
                >
                  <MdContentCopy className="mr-1" />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            ) : (
              ""
            )}
            <h2 className="text-[#000000] text-center  text-lg">
              {approval === 4
                ? "Our team will verify the details and update once you are approved by the admin panel"
                : approval === 2
                ? "Your request has been rejected,Please refill the form again."
                : approval === 3 &&
                  "Your application is on hold. Please connect with our support team for more details"}
            </h2>

            <div className="flex">
              <div
                onClick={() => {
                  router.push("/profile");
                }}
                className="bg-primary text-white uppercase px-12 py-2 mt-10 mr-2 rounded-full"
              >
                Profile{" "}
              </div>
              <div
                onClick={() => {
                  localStorage.clear();
                  router.push("/");
                  router.reload();
                }}
                className="bg-primary text-white uppercase px-12 py-2 mt-10 mr-2 rounded-full"
              >
                Log Out{" "}
              </div>
              <div
                onClick={() => {
                  router.push("/institute/aryabhatta-classes");
                }}
                className="bg-primary text-white uppercase px-12 py-2 mt-10 rounded-full"
              >
                Go to{" "}
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="bg-[#F4EBFF] px-6 mt-10 py-10 lg:pt-16 mx-auto">
        <div className="md:max-w-[1200px]">
          <div className="md:flex justify-between md:ml-12">
            <div className="">
              <p className="text-xl font-semibold">Join our newsletter</p>
              <p className="text-base">
                We’ll send you a nice letter once per week. No spam.
              </p>
            </div>

            <div className="my-3 ml-5">
              <input
                type="text"
                placeholder="Enter your email"
                className="py-4 px-2 join w-full md:w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl"
              />
              <button className="px-6 w-full md:w-[120px] py-3 shadow-md my-1 rounded-lg bg-primary">
                <p className="font-medium text-base text-white">Subscribe</p>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Finished;
