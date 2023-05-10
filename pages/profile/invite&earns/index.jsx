import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../../assets/merchantDashboard/Accountancy/logo.png";
import Footer from "../../../components/layout/Footer";
import InviteAndEarns from "../../../components/pages/Profile/InviteAndEarns";
import ProfileNavbar from "../../../components/pages/Profile/ProfileNavbar";
import ProfileToggleNavbar from "../../../components/pages/Profile/ProfileToggleNavbar";
import { setShowSideBar } from "../../../redux/slices/UserProfileSidePopUp";

const TeamInvite = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Head>
        <title>Invite and Earns - Profile - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProfileToggleNavbar></ProfileToggleNavbar>

      <Link legacyBehavior prefetch={false} href={"/"}>
        <div className="logo lg:flex items-center ml-4 mt-5 mb-12 hidden ">
          <img src={logo.src} alt="" />
        </div>
      </Link>
      <div className=" grid grid-cols-8 gap-0 bg-white ">
        <div className=" hidden  lg:block col-span-2 ">
          <div>
            <ProfileNavbar></ProfileNavbar>
          </div>
        </div>

        <div
          style={{
            height: "100%",
          }}
          className=" col-span-8 lg:col-span-6 mb-5 "
          onClick={() => dispatch(setShowSideBar(false))}
        >
          <div className=" lg:border border-ghost/60 border-0 rounded-2xl lg:w-[95%] w-full ">
            <div className="">
              <InviteAndEarns />
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default TeamInvite;
