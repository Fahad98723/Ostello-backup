import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineSound,
  AiOutlineTeam,
  AiOutlineIdcard,
} from "react-icons/ai";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineLogin } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../../../redux/slices/authSlice";
import { capitalizeFirstLetter, isEmpty } from "../../../../utils";
import { assets } from "../../../../../utils/assets";
import dynamic from "next/dynamic";

const CourseBarMobileNavbar = dynamic(
  () => {
    return import("./CourseBarMobileNavbar");
  },
  { ssr: false }
);
const TopLocationBarMobileNavbar = dynamic(
  () => {
    return import("./TopLocationBarMobileNavbar");
  },
  { ssr: false }
);

const iconStyle = `flex items-center text-2xl `;
const text = `hover:text-primary`;
const MobileNavbar = ({ usingFor }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [topLocationBar, setTopLocationBar] = useState(false);
  const [courseBar, setCourseBar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userData } = useSelector(authSelector);
  const { usertype } = userData;
  let userName = userData?.name?.split(" ")[0] || userData?.name;
  const ostelloLogo = assets.images.ostello_titled_logo;
  // useEffect(() => {
  //   document.body.addEventListener("click", removeDropdown);
  //   document.addEventListener("scroll", removeDropdown);
  // }, []);

  // const removeDropdown = (e) => {
  //   setTopLocationBar(false);
  //   setCourseBar(false);
  //   e.stopPropagation();
  // };
  return (
    <div className="lg:hidden block">
      <div className=" flex z-10  items-center justify-between  px-4  py-2 space-x-2">
        <AiOutlineMenu
          className="hover:text-primary cursor-pointer"
          size={26}
          onClick={() => {
            setIsMenuOpen((prv) => !prv);
          }}
        />

        <>
          <div
            className={`transition-all duration 300 ${
              !isMenuOpen ? "-translate-x-full" : "translate-x-0"
            } w-[50vh] h-screen bg-white shadow-4xl absolute -left-2 top-0 p-5  rounded-r-xl `}
          >
            <div className="flex justify-between items-center">
              <Link legacyBehavior prefetch={false} href={"/"}>
                <Image
                  height={10}
                  width={100}
                  sizes="33vw"
                  src={ostelloLogo}
                  alt="logo-ostello"
                  className="w-30 h-10"
                />
              </Link>
              <GiCancel
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="text-xl text-[#FF0000]-500 cursor-pointer"
              />
            </div>
            <div className="mt-16 ">
              <div
                onClick={() => router.push("/about-us")}
                className="flex space-x-5 hover:text-primary my-3"
              >
                <AiOutlineTeam className={iconStyle} />
                <span className="text-xl">About Us</span>
              </div>
              <div className="relative flex space-x-5 hover:text-primary my-3">
                <AiOutlineIdcard className={iconStyle} />
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    setCourseBar(!courseBar);
                    setTopLocationBar(false);
                    e.stopPropagation();
                  }}
                  className="flex items-center mx-3 cursor-pointer"
                >
                  <p className={`${text} text-[#000000] text-xl `}>Courses</p>

                  {courseBar ? (
                    <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                  ) : (
                    <GoChevronDown className="ml-1 text-[16px]" />
                  )}
                </p>
                {courseBar ? <CourseBarMobileNavbar /> : ""}
              </div>

              <div className="relative flex space-x-5 hover:text-primary my-3">
                <AiOutlineIdcard className={iconStyle} />
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    setTopLocationBar(!topLocationBar);
                    setCourseBar(false);
                    e.stopPropagation();
                  }}
                  className="flex items-center mx-3 cursor-pointer"
                >
                  <p className={`${text} text-[#000000] text-xl `}>
                    Top Locations
                  </p>
                  {topLocationBar ? (
                    <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                  ) : (
                    <GoChevronDown className="ml-1 text-[16px]" />
                  )}
                </p>
                {topLocationBar ? <TopLocationBarMobileNavbar /> : ""}
              </div>
              <div
                onClick={() => router.push("/blogs")}
                className="flex space-x-5 hover:text-primary my-3"
              >
                <AiOutlineSound className={iconStyle} />
                <span className="text-xl">Blogs</span>
              </div>
              <div
                onClick={() => router.push("/mentor")}
                className="flex space-x-5 hover:text-primary my-3"
              >
                <AiOutlineTeam className={iconStyle} />
                <span className="text-xl">Mentor Zone</span>
              </div>

              {usingFor === "blog" ? (
                <button
                  onClick={() => {
                    setOpen(true);
                    dispatch(setAuthModalState(2));
                  }}
                  className="py-2 text-[16px] px-4 border hover:bg-primary hover:text-white rounded-2xl text-primary border-gray/20 "
                >
                  Get Started
                </button>
              ) : usingFor === "merchant" ? (
                !isAuthenticated ? (
                  <div className="flex space-x-4">
                    <MdOutlineLogin className={iconStyle} />
                    <button
                      onClick={() => {
                        router.push("/merchant/login");
                      }}
                      className="py-2 px-4 border text-xl border-primary bg-primary text-white rounded-md"
                    >
                      Log In
                    </button>
                  </div>
                ) : (
                  <div className="flex text-black space-x-2">
                    <div
                      className="flex justify-center items-center"
                      onClick={() =>
                        router.push(
                          usertype === 1
                            ? "/admin-dashboard/overview"
                            : usertype === 3
                            ? "/profile"
                            : "/merchant/dashboard"
                        )
                      }
                    >
                      <div className="bg-primary h-10 w-10 text-xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                        {userName?.slice(0, 1).toUpperCase()}
                      </div>
                      <p className="text-primary text-lg ml-2 cursor-pointer">
                        {!isEmpty(userName) && capitalizeFirstLetter(userName)}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="">
                  {!isAuthenticated ? (
                    <div className="flex text-black items-center space-x-5">
                      <button
                        onClick={() => {
                          setOpen(true);
                          dispatch(setAuthModalState(2));
                        }}
                        className="py-2 text-[16px] px-4 border border-gray/20 hover:bg-primary hover:text-white rounded-2xl text-primary"
                      >
                        Get Started
                      </button>
                    </div>
                  ) : (
                    <div className="flex text-black space-x-2">
                      <div
                        className="flex justify-center items-center"
                        onClick={() =>
                          router.push(
                            usertype === 1
                              ? "/admin-dashboard/overview"
                              : usertype === 3
                              ? "/profile"
                              : "/merchant/dashboard/profile"
                          )
                        }
                      >
                        {userData?.avatar?.url ? (
                          <Image
                            width="0"
                            height="0"
                            sizes="33vw"
                            src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                            className="h-10 w-10 cursor-pointer"
                            style={{
                              borderRadius: "50%",
                            }}
                            alt=""
                          />
                        ) : (
                          <div className="bg-primary h-10 text-xl w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                            {userName?.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <p className="text-primary text-xl ml-2 cursor-pointer">
                          {!isEmpty(userName) &&
                            capitalizeFirstLetter(userName)}
                        </p>
                      </div>
                    </div>
                  )}

                  <Link
                    legacyBehavior
                    prefetch={false}
                    href="/merchant-landing"
                  >
                    <a
                      className={`${
                        usertype === 1 || usertype === 2 ? "hidden" : "block"
                      } text-white text-[16px] w-full text-center bg-primary hover:text-primary border border-primary  hover:bg-white rounded-2xl px-4 mt-2 py-2 duration-300`}
                    >
                      List your institute
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto">
            <Link legacyBehavior prefetch={false} href={"/"}>
              <Image
                width="100"
                height="60"
                sizes="33vw"
                src={ostelloLogo}
                alt=""
                className=" my-1 "
              />
            </Link>
          </div>
          <div className=""></div>
        </>
      </div>
    </div>
  );
};

export default MobileNavbar;
