import { useRouter } from "next/router";
import React from "react";
import { AiFillSetting, AiOutlineDatabase } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdDashboard, MdOutlineInsertChart, MdReviews } from "react-icons/md";
import { RiFileMarkLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import logo from "../../../../assets/merchantDashboard/Accountancy/logo.png";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../../../../redux/slices/authSlice";
import { FaCrown } from "react-icons/fa";

export default function DashboardSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  //   function logout() {
  //     router.push('/merchant/login');
  //     localStorage.clear();
  //     router.reload(window.location.pathname)
  // }

  const { instituteDetails } = useSelector(authSelector);

  return (
    <>
      <div className=" hidden  lg:block">
        <div>
          <div
            onClick={() => {
              router.push("/");
            }}
            className="logo flex items-center ml-4 mt-5 mb-12"
          >
            <img src={logo.src} alt="" />
          </div>

          <div className="menu dashboard justify-start">
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard" ? "active" : ""
                } menu-item flex items-center gap-3`}
              >
                {" "}
                <MdDashboard></MdDashboard> Dashboard{" "}
              </p>
            </Link>
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/courses"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/courses"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                {" "}
                <RiFileMarkLine></RiFileMarkLine> Courses{" "}
              </p>
            </Link>
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/accountancy"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/accountancy"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <MdOutlineInsertChart></MdOutlineInsertChart> Accounts{" "}
              </p>
            </Link>
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/profile"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/profile"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <CgProfile /> My Profile{" "}
              </p>
            </Link>
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/manage-locations"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/manage-locations"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <AiOutlineDatabase /> Locations{" "}
                {instituteDetails?.accountplan === "free_plan" ? (
                  <FaCrown className="text-[#FFD907] " />
                ) : (
                  ""
                )}
              </p>
            </Link>
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/students"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/students"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <FaUsers /> Our Students{" "}
                {instituteDetails?.accountplan === "free_plan" ? (
                  <FaCrown className="text-[#FFD907] " />
                ) : (
                  ""
                )}
              </p>
            </Link>

            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/posts"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/posts" ||
                  router.asPath === "/merchant/dashboard/posts/add" ||
                  router.pathname === "/merchant/dashboard/posts/edit/[id]"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <MdReviews /> Posts{" "}
                {instituteDetails?.accountplan === "free_plan" ? (
                  <FaCrown className="text-[#FFD907] " />
                ) : (
                  ""
                )}
              </p>
            </Link>

            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/leadenquiries"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/leadenquiries"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <AiOutlineDatabase /> Leads{" "}
                {instituteDetails?.accountplan === "free_plan" ? (
                  <FaCrown className="text-[#FFD907] " />
                ) : (
                  ""
                )}
              </p>
            </Link>

            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/reviews"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/reviews"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <MdReviews /> Review & Subscribe{" "}
                {instituteDetails?.accountplan === "free_plan" ? (
                  <FaCrown className="text-[#FFD907] " />
                ) : (
                  ""
                )}
              </p>
            </Link>

            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/notifications"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/notifications"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <IoIosNotificationsOutline></IoIosNotificationsOutline>
                Notification{" "}
                <span className="bg-[#E8ACC1] text-[#DC6563] p-1 rounded-full text-xs">
                  0
                </span>
              </p>
            </Link>
            <Link
              legacyBehavior
              prefetch={false}
              href="/merchant/dashboard/settings"
              activeClassName="active"
            >
              <p
                className={`${
                  router.asPath === "/merchant/dashboard/settings"
                    ? "active"
                    : ""
                } menu-item flex items-center gap-3`}
              >
                <AiFillSetting></AiFillSetting> Settings{" "}
              </p>
            </Link>
            <h3
              onClick={() => {
                dispatch(logout());
              }}
              className="menu-item flex items-center gap-3"
            >
              {" "}
              <FiLogOut></FiLogOut> Log Out{" "}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
