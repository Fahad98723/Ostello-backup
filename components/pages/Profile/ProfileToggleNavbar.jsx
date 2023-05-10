import React, { useEffect, useState } from "react";
import { MdDashboard, MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineInsertChart } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogoForBottomMenu,
  setShowSideBar,
} from "../../../redux/slices/UserProfileSidePopUp";
import { Container } from "@mui/material";
import { FiUser } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import ProfileImageModal from "./ProfileImageModal";
import LogAndDeleteModal from "./LogAndDeleteModal";
import logo from "../../../assets/merchantDashboard/Accountancy/logo.png";
import BottomBar from "../../layout/BottomBar";
import { authSelector, getUser } from "../../../redux/slices/authSlice";

import { useRouter } from "next/router";
import { CloseOutlined, WalletOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { Progress } from "antd";

const ProfileToggleNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [finished, setFinished] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [selectImage, setSelectedImage] = useState(false);
  const handleOpen = () => setOpen(true);

  const logoForBottomMenu = useSelector(
    (state) => state.userProfileSideBar.logoForBottomMenu
  );

  const userLogin = useSelector((state) => state.auth.isAuthenticated);

  const [modalType, setModalType] = useState("");
  const [deleteAndLogopen, seDeleteAndLogOpen] = React.useState(false);
  const handleDeleteAndLogOpen = (type) => {
    seDeleteAndLogOpen(true);
    setModalType(type);
  };

  const imageUpload = () => {
    handleOpen();
    setSelectedImage(true);
    setFinished(false);
  };

  const { userData, profileProgress, loading } = useSelector(authSelector);

  const [user, setUser] = useState([]);

  const handleWallet = async () => {
    if (profileProgress !== 100) {
      toast.error("Complete your profile to active wallet !");
    } else {
      router.push("/profile/wallet");
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className="flex bg-ghost/10 items-center cursor-pointer   lg:hidden mb-3  bg-white">
        <div className=" w-full">
          {!userLogin || logoForBottomMenu ? (
            <div className="py-3 px-5">
              <img src={logo.src} alt="" />
            </div>
          ) : (
            <div>
              {showSidebar ? (
                ""
              ) : (
                <svg
                  onClick={() => setShowSidebar(true)}
                  className="flex  items-center cursor-pointer ml-4 my-3 lg:hidden "
                  fill="
            #414141"
                  viewBox="0 0 100 80"
                  width="30"
                  height="30"
                >
                  <rect width="100" height="10"></rect>
                  <rect y="30" width="100" height="10"></rect>
                  <rect y="60" width="100" height="10"></rect>
                </svg>
              )}
            </div>
          )}
        </div>

        <div
          className={`top-0 left-0  bg-white w-full  fixed h-full overflow-y-scroll z-40  ease-in-out duration-300 ${
            showSidebar ? "-translate-x-0 " : "-translate-x-full"
          }`}
        >
          <Container>
            <CloseOutlined
              onClick={() => setShowSidebar(false)}
              className="top-5 right-5 absolute text-xl hover:text-2xl"
            />
            <div className="menu profile text-sm p-2 pl-5  font-bold  justify-start mt-5 ">
              <div className="image-section flex items-center justify-center mb-5">
                <div>
                  {userData?.avatar?.url ? (
                    <img
                      className="w-20 h-20 rounded-full mx-auto"
                      src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                      alt=""
                    />
                  ) : (
                    <div className="bg-primary h-[100px] w-[100px] mx-auto text-5xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                      {userData?.name?.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <p
                    onClick={imageUpload}
                    className="text-xs mt-2 text-[#7D23E0] underline underline-offset-2"
                  >
                    Change Profile Picture
                  </p>
                </div>

                <div className="details ml-2 mb-5">
                  <p className="text-lg font-bold">{user?.name}</p>
                  <p className="text-base">{user?.email}</p>
                </div>
              </div>
              <Progress percent={Math.round(profileProgress)} />

              <hr className="my-3 text-ghost/60" />

              <div>
                <p
                  className="mt-5 mb-2"
                  style={{
                    paddingLeft: "20px",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  Activity
                </p>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/profile");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <FiUser></FiUser> Profile{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/profile/reviews");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <AiOutlineStar></AiOutlineStar> Review{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>
                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    handleWallet();
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <WalletOutlined /> Wallet{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("subscribed-institutes");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <MdOutlineSubscriptions></MdOutlineSubscriptions> Subscribed
                    Institutes{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>
              </div>
              <hr className="my-3 text-ghost/60" />
              <div>
                <p
                  className="mt-5 mb-2"
                  style={{
                    paddingLeft: "20px",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  Courses
                </p>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/profile/recentlyViewed");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <AiOutlineEye></AiOutlineEye> Recently Viewed{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/profile/purchaseCourse");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <BsBag></BsBag> Purchase Courses{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/profile/ongoingCourse");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <MdOutlineInsertChart></MdOutlineInsertChart> Ongoing
                    Courses{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>
              </div>

              <hr className="my-3 text-ghost/60" />

              <div>
                <p
                  className="mt-5 mb-2"
                  style={{
                    paddingLeft: "20px",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  Payment
                </p>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/profile/manageCards");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <AiOutlineCreditCard></AiOutlineCreditCard> Manage Cards{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>
              </div>

              <hr className="my-3 text-ghost/60 " />

              <div>
                <p
                  className="mt-5 mb-2"
                  style={{
                    paddingLeft: "20px",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  Others
                </p>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/blogs");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <MdDashboard></MdDashboard> Blogs{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/events");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <RiCalendarEventFill></RiCalendarEventFill> Events{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/faq");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <AiOutlineQuestionCircle></AiOutlineQuestionCircle> FAQs{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>

                <div
                  className="menu-item flex items-center justify-between gap-3"
                  onClick={() => {
                    dispatch(setShowSideBar(!showSidebar));
                    dispatch(setLogoForBottomMenu(false));
                    router.push("/contact-us");
                  }}
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <BiMessageDots></BiMessageDots> Need Help?{" "}
                  </div>
                  <div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>
              </div>

              <hr className="my-3 text-ghost/60" />

              {/* <h3
                onClick={() => handleDeleteAndLogOpen("delete")}
                className="menu-item flex items-center gap-3 "
              >
                {" "}
                Delete Account{" "}
              </h3> */}
              <h3
                onClick={() => handleDeleteAndLogOpen("logout")}
                className="menu-item flex items-center gap-3 text-[#FF0000]/80 mb-20"
              >
                {" "}
                <FiLogOut></FiLogOut> Log Out{" "}
              </h3>
            </div>
            <ProfileImageModal
              open={open}
              handleOpen={handleOpen}
              setOpen={setOpen}
              setSelectedImage={setSelectedImage}
              selectImage={selectImage}
              image={userData?.avatar?.key}
              name={userData?.name}
              setFinished={setFinished}
            ></ProfileImageModal>

            <LogAndDeleteModal
              open={deleteAndLogopen}
              handleOpen={handleDeleteAndLogOpen}
              setOpen={seDeleteAndLogOpen}
              modalType={modalType}
            ></LogAndDeleteModal>
          </Container>
        </div>
      </div>

      {/*
       profile bottom navbar 
      */}

      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white block shadow-4xl rounded-t-2xl py-2 lg:hidden">
        <Container>
          <BottomBar></BottomBar>
        </Container>
      </div>
    </>
  );
};

export default ProfileToggleNavbar;
