import { WalletOutlined } from "@ant-design/icons";
import { Container } from "@mui/material";
import { Progress } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineCreditCard,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineQuestionCircle,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessageDots, BiUserPlus } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import {
  MdDashboard,
  MdOutlineInsertChart,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
  getUser,
} from "../../../redux/slices/authSlice";
import LogAndDeleteModal from "./LogAndDeleteModal";
import ProfileImageModal from "./ProfileImageModal";

const ProfileNavbar = ({ handleActive }) => {
  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = useState("");
  const [finished, setFinished] = useState(false);

  const [deleteAndLogopen, seDeleteAndLogOpen] = React.useState(false);
  const [selectImage, setSelectedImage] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleDeleteAndLogOpen = (type) => {
    seDeleteAndLogOpen(true);
    setModalType(type);
  };

  const imageUpload = () => {
    handleOpen();
    setSelectedImage(true);
    setFinished(false);
  };

  const imageHandleChange = (e) => {
    
  };

  const dispatch = useDispatch();
  const {
    instituteDetails,
    addUserData,
    userData,
    profileProgress,
    loading,
    message,
  } = useSelector(authSelector);
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    dispatch(getInstituteDetails());
  }, [dispatch, finished]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (message?.length) {
      toast.error(message);
    }
  }, [message]);

  const handleWallet = async () => {
    if (profileProgress !== 100) {
      toast.error("Complete your profile to active wallet !");
    } else {
      router.push("/profile/wallet");
    }
  };

  return (
    <div className="md:max-w-[400px] ">
      <Container className="mb-5 relative">
        <div className="userImage mb-5">
          <div className="relative">
            <div>
              {userData?.avatar?.url ? (
                <img
                  src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                  className="mx-auto "
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
              ) : (
                <>
                  <div className="bg-primary h-[200px] w-[200px] mx-auto text-8xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                    {userData?.name?.slice(0, 1).toUpperCase()}
                  </div>
                </>
              )}
              <FaRegEdit
                className="text-4xl shadow-lg text-[#7D23E0] bg-white rounded-full p-2 mb-auto"
                style={{
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                  top: "20%",
                  left: "75%",
                }}
                onClick={imageUpload}
              />
            </div>
          </div>
          <p className="text-3xl text-center font-medium mt-4">
            {instituteDetails?.owner?.name}
          </p>
          <Progress percent={Math.round(profileProgress)} />
        </div>
        <div className="menu profile justify-start mt-10">
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
            <Link legacyBehavior prefetch={false} href="/profile">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile" ? "active" : ""
                }`}
              >
                {" "}
                <FiUser></FiUser> Profile{" "}
              </p>
            </Link>
            <div onClick={handleWallet}>
              <>
                <p
                 
                  className={`menu-item flex items-center gap-3 ${
                    router.asPath === "/profile/wallet" ? "active" : ""
                  }`}
                >
                  <WalletOutlined /> Wallet
                </p>
              </>
            </div>
            <Link legacyBehavior prefetch={false} href="/profile/reviews">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/reviews" ? "active" : ""
                }`}
              >
                {" "}
                <AiOutlineStar></AiOutlineStar> Review{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/profile/wishlist">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/wishlist" ? "active" : ""
                }`}
              >
                <AiOutlineHeart></AiOutlineHeart> Wishlist{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/profile/invite&earns">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/invite&earns" ? "active" : ""
                }`}
              >
                <BiUserPlus></BiUserPlus> Invite & Earns{" "}
              </p>
            </Link>

            <Link legacyBehavior prefetch={false} href="/profile/subscribed-institutes">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/subscribed-institutes"
                    ? "active"
                    : ""
                }`}
              >
                <MdOutlineSubscriptions></MdOutlineSubscriptions> Subscribed
                Institutes{" "}
              </p>
            </Link>
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
            <Link legacyBehavior prefetch={false} href="/profile/recentlyViewed/">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/recentlyViewed" ? "active" : ""
                }`}
              >
                {" "}
                <AiOutlineEye></AiOutlineEye> Recently Viewed{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/profile/purchaseCourse">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/purchaseCourse" ? "active" : ""
                }`}
              >
                {" "}
                <BsBag></BsBag> Purchase Courses{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/profile/ongoingCourse">
              <p
                className={`menu-item flex items-center gap-3 ${
                  router.asPath === "/profile/ongoingCourse" ? "active" : ""
                }`}
              >
                <MdOutlineInsertChart></MdOutlineInsertChart> Ongoing Courses{" "}
              </p>
            </Link>
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
            <Link legacyBehavior prefetch={false} href="/profile/manageCards">
              <p className="menu-item flex items-center gap-3">
                {" "}
                <AiOutlineCreditCard></AiOutlineCreditCard> Manage Cards{" "}
              </p>
            </Link>
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

            <Link legacyBehavior prefetch={false} href="/blogs">
              <p className="menu-item flex items-center gap-3">
                {" "}
                <MdDashboard></MdDashboard> Blogs{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/events">
              <p className="menu-item flex items-center gap-3">
                {" "}
                <RiCalendarEventFill></RiCalendarEventFill> Events{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/faq">
              <p className="menu-item flex items-center gap-3">
                {" "}
                <AiOutlineQuestionCircle></AiOutlineQuestionCircle> FAQs{" "}
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/contact-us">
              <p className="menu-item flex items-center gap-3">
                <BiMessageDots></BiMessageDots> Need Help?{" "}
              </p>
            </Link>
          </div>

          <hr className="my-3 text-ghost/60 " />

          {/* <h3
            onClick={() => handleDeleteAndLogOpen('delete')}
            className="menu-item flex items-center gap-3 "
          >
            {" "}
            Delete Account{" "}
          </h3> */}
          <h3
            onClick={() => handleDeleteAndLogOpen("logout")}
            className="menu-item flex items-center gap-3 text-[#FF0000]/80"
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
        />

        <LogAndDeleteModal
          open={deleteAndLogopen}
          handleOpen={handleDeleteAndLogOpen}
          setOpen={seDeleteAndLogOpen}
          modalType={modalType}
        />
      </Container>
    </div>
  );
};

export default ProfileNavbar;
