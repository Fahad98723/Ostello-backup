import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setAuthModalState,
} from "../../../../../redux/slices/authSlice";
import { useRouter } from "next/router";
import { assets } from "../../../../../utils/assets";
import { capitalizeFirstLetter, isEmpty } from "../../../../../utils/utils";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

const DescTopNavbar = ({ usingFor, bg }) => {
  const text = `hover:text-primary`;
  const ostelloLogo = assets.images.ostello_titled_logo;
  const { isAuthenticated, userData } = useSelector(authSelector);
  const { usertype } = userData;
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  let userName = userData?.name?.split(" ")[0] || userData?.name;

  const [topLocationBar, setTopLocationBar] = useState(false);
  const [courseBar, setCourseBar] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
    document.addEventListener("scroll", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    e.preventDefault();
    setTopLocationBar(false);
    setCourseBar(false);
    e.stopPropagation();
  };
  
  return (
    <div>
      <div
        className={`hidden lg:flex justify-between items-center md:px-10 py-3  ${text} ${bg}`}
      >
        <Link legacyBehavior prefetch={false} href={"/"}>
          <Image
            width="0"
            height="0"
            sizes="100vw"
            src={ostelloLogo}
            alt=""
            className="w-40 h-[45px]"
          />
        </Link>

        <nav className="flex">
          <Link legacyBehavior prefetch={false} href="/about-us">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>
              About Us
            </a>
          </Link>
          <div className="relative ">
            <p
              onClick={(e) => {
                e.preventDefault();
                setCourseBar(!courseBar);
                setTopLocationBar(false);
                e.stopPropagation();
              }}
              className="flex items-center mx-3 cursor-pointer"
            >
              <p
                className={`${text} text-[#000000] text-[#000000] text-[16px]  `}
              >
                Courses
              </p>
              {courseBar ? (
                <GoChevronDown className="ml-1 text-[16px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[16px]" />
              )}
            </p>
            {courseBar ? (
              <div className="absolute left-0 z-10 mt-6 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/academics-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>
                      K12 (Academics)
                    </p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      router.push("/medical-coaching-institutes-in-delhi");
                    }}
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Medical</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/engineering-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Engineering</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/humanities-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Humanities</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/law-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Law</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/commerce-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Commerce</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/skillbased");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Skill Based</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/exams/cuet");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Boards + CUET</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="relative">
            <p
              onClick={(e) => {
                e.preventDefault();
                setTopLocationBar(!topLocationBar);
                setCourseBar(false);
                e.stopPropagation();
              }}
              className="flex items-center mx-3 cursor-pointer"
            >
              <p className={`${text} text-[#000000] text-[16px] `}>
                Top Locations
              </p>
              {topLocationBar ? (
                <GoChevronDown className="ml-1 text-[16px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[16px]" />
              )}
            </p>
            {topLocationBar ? (
              <div className="absolute left-0 z-10 mt-6 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/toplocation/delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Delhi</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      router.push("/toplocation/haryana");
                    }}
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Haryana</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/toplocation/uttar-pradesh");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Uttar Pradesh</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <Link legacyBehavior prefetch={false} href="/blogs">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>Blogs</a>
          </Link>
          <Link legacyBehavior prefetch={false} href="/mentor">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>
              Mentor Zone
            </a>
          </Link>
        </nav>

        {usingFor === "blog" ? (
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setOpen(true);
                dispatch(setAuthModalState(2));
              }}
              className="py-2 px-4 border border-gray/20 rounded-md"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setOpen(true);
                dispatch(setAuthModalState(4));
              }}
              className="py-2 px-4 border border-primary rounded-md bg-primary text-white"
            >
              Sign up
            </button>
          </div>
        ) : usingFor === "merchant" ? (
          !isAuthenticated ? (
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  router.push("/merchant/login");
                }}
                className="py-2 px-4 border border-primary bg-primary text-white rounded-md"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="flex justify-center text-black space-x-2">
              <div
                className="flex items-center"
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
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                  {userName?.slice(0, 1).toUpperCase()}
                </div>
                <p className="text-primary text-lg ml-2 cursor-pointer">
                  {!isEmpty(userName) && capitalizeFirstLetter(userName)}
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center space-x-5">
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setOpen(true);
                  dispatch(setAuthModalState(2));
                }}
                className="py-2 text-[16px] hover:bg-primary hover:text-white rounded-2xl text-primary px-4 border border-gray/20 rounded-md"
              >
                Get Started
              </button>
            ) : (
              <div className="flex justify-center text-black space-x-2">
                <div
                  className="flex items-center"
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
                    <img
                      src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                      className="mx-auto h-10 w-10 cursor-pointer"
                      style={{
                        // height: "200px",
                        // width: "200px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  ) : (
                    <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                      {userName?.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <p className="text-primary text-lg ml-2 cursor-pointer">
                    {!isEmpty(userName) && capitalizeFirstLetter(userName)}
                  </p>
                </div>
              </div>
            )}

            <Link legacyBehavior prefetch={false} href="/merchant-landing">
              <a
                className={`${
                  usertype === 1 || usertype === 2 ? "hidden" : "block"
                } text-white text-[16px] bg-primary hover:text-primary border border-primary  hover:bg-white rounded-2xl px-4 py-2 duration-300`}
              >
                List your institute
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescTopNavbar;
