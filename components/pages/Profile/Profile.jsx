import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideBar } from "../../../redux/slices/UserProfileSidePopUp";
import ProfileNavbar from "./ProfileNavbar";
import ProfileToggleNavbar from "./ProfileToggleNavbar";

import { useRouter } from "next/router";
import ProfileHome from "../../../pages/profile/ProfileHome";

import { authSelector } from "../../../redux/slices/authSlice";
import { isEmpty } from "../../utils";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, userData } = useSelector(authSelector);

  useEffect(() => {
    if (!isAuthenticated && isEmpty(userData)) {
      router.push("/");
    }
  }, [isAuthenticated, userData]);

  return (
    <>
      <ProfileToggleNavbar />
      <div className=" grid grid-cols-8 gap-0 bg-white ">
        <div className=" hidden  lg:block col-span-2 ">
          <div>
            <ProfileNavbar />
          </div>
        </div>

        <div
          style={{
            height: "100%",
          }}
          className=" col-span-8 lg:col-span-6 mb-5 "
          onClick={() => dispatch(setShowSideBar(false))}
        >
          <div className=" lg:border border-ghost/60 border-0 rounded-2xl mt-5 lg:w-[95%] w-full ">
            <div className="">
              <ProfileHome />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
