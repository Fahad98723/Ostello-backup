import Link from "next/link";
import React, { useState } from "react";
import logo from "../../assets/aboutus/Logo.png";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

import {
  AppstoreOutlined,
  CloseOutlined,
  GiftOutlined,
  IdcardOutlined,
  MergeCellsOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BsAward } from "react-icons/bs";
import { useDispatch } from "react-redux";
import AuthModal from "../pages/HomeLanding/Header/Navbar/AuthModal";
import { setAuthModalState } from "../../redux/slices/authSlice";
import { useRouter } from "next/router";
const iconStyle = `flex items-center text-2xl `;
const links = [
  {
    title: "About Us",
    url: "/about-us",
    icon: <TeamOutlined className={iconStyle} />,
  },
  {
    title: "Courses",
    url: "/search",
    icon: <AppstoreOutlined className={iconStyle} />,
  },
  // {
  //   title: 'Achievements',
  //   url: '/achievements',
  //   icon: <BsAward className={iconStyle} />,
  // },
  {
    title: "Institutes",
    url: "/search",
    icon: <IdcardOutlined className={iconStyle} />,
  },
  {
    title: "Career",
    url: "/careers",
    icon: <UserOutlined className={iconStyle} />,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: <NotificationOutlined className={iconStyle} />,
  },
];

export default function AboutNavBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  return (
    <div className="bg-[#7F56D9] ">
      <AuthModal handleClose={handleClose} open={open} />
      <section className=" lg:container mx-auto ">
        {/* Mobile AboutNavBar */}
        <div className="relative flex z-10 lg:hidden items-center justify-between px-4 py-2 space-x-2">
          <AiOutlineMenu
            className="hover:text-primary cursor-pointer"
            size={26}
            onClick={() => {
              setIsMenuOpen((prv) => !prv);
              setIsSearching(false);
            }}
          />
          {!isSearching && (
            <>
              <div
                className={`transition-all duration 300 ${
                  !isMenuOpen ? "-translate-x-full" : "translate-x-0"
                } w-[50vh] h-screen bg-[#7F56D9]  shadow-4xl absolute -left-2 top-0 p-5  rounded-r-xl `}
              >
                <div className="flex justify-between items-center">
                  <Link legacyBehavior prefetch={false} href={"/"}>
                    <img src={logo.src} alt="" className="w-32" />
                  </Link>
                  <CloseOutlined
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="text-xl text-white cursor-pointer"
                  />
                </div>
                <div className="mt-16 space-y-5">
                  {links.map((item, key) => (
                    <div
                      key={key}
                      onClick={() => router.push(item.url)}
                      className="flex space-x-5 text-white hover:text-primary"
                    >
                      {item.icon}
                      <span className="text-xl text-white">{item.title}</span>
                    </div>
                  ))}
                  <div className="mt-5">
                 
                    <button className="text-white text-[16px] bg-primary hover:text-primary border border-primary  hover:bg-white rounded-2xl px-4 py-2 duration-300">
                      Log in 
                    </button>
                  <Link legacyBehavior prefetch={false} href="/merchantLanding">
                    <p className="text-primary text-[16px] bg-white hover:text-primary border border-white  hover:bg-primary rounded-2xl px-4 py-2 duration-300">
                      List your institute
                    </p>
                  </Link>
                  </div>
                </div>
              </div>
              {!isMenuOpen && !isSearching && (
                <Link legacyBehavior prefetch={false} href={"/"}>
                  <img src={logo.src} alt="" className="w-40 h-10 my-1" />
                </Link>
              )}
            </>
          )}
          <div
            className={`flex border rounded-xl  items-center justify-center space-x-2 px-2  ${
              isSearching ? " border-primary w-full" : "border-white"
            }`}
          >
            {isSearching && (
              <input
                className=" outline-none w-full p-2 placeholder:text-center"
                type="text"
                placeholder="Search for courses, institutes, exams..."
              />
            )}
            <FiSearch
              onClick={() => {
                setIsSearching((prv) => !prv);
                setIsMenuOpen(false);
              }}
              className={`${
                isSearching && "text-white"
              } text-white cursor-pointer`}
              size={26}
            />
          </div>
        </div>

        {/* Desktop AboutNavBar */}
        <div className="hidden lg:flex justify-between items-center p-2 py-4 ">
          <Link legacyBehavior prefetch={false} href={"/"}>
            <img src={logo.src} alt="" className="w-40 h-[45px]" />
          </Link>

          <nav className="text-white">
            <Link legacyBehavior prefetch={false} href="/about-us">
              <p className="link_button text-white text-[16px] mx-3">
                About Us
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/search">
              <p className="link_button text-white text-[16px] mx-3">Courses</p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/search">
              <p className="link_button text-white text-[16px] mx-3">
                Institutes
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/careers">
              <p className="link_button text-white text-[16px] mx-3">Career</p>
            </Link>
            <Link legacyBehavior prefetch={false} href="/blogs">
              <p className="link_button text-white text-[16px] mx-3">Blogs</p>
            </Link>
            <Link legacyBehavior prefetch={false} href={'/entrance-exam'}>
              <p className='font-medium text-sm xl:text-base text-medium-slate'>
                Register
              </p>
            </Link>
          </nav>

          <div className="flex justify-center items-center space-x-5">
            <div className="flex justify-center text-white space-x-2">
              <button
                onClick={() => {
                  setOpen(true);
                  dispatch(setAuthModalState(2));
                }}
                className="rounded-xl border border-white text-white px-4 py-2 text-[16px]"
              >
                Login
              </button>
              {/* <span>/</span> */}
              <button
                onClick={() => {
                  setOpen(true);
                  dispatch(setAuthModalState(4));
                }}
                className="bg-white text-primary rounded-xl px-4 py-2  text-[16px]"
              >
                Sign up
              </button>
            </div>
            {/* <Link legacyBehavior prefetch={false} href='/merchant'>
            <a className='text-white bg-primary hover:text-primary border border-primary  hover:bg-white rounded-2xl px-4 py-2 duration-300'>
              List your institute
            </a>
          </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
