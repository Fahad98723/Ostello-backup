import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SidebarItems } from "./Data";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../../../../redux/slices/authSlice";
import LogoWhiteWhiteBG from "../../../../assets/images/logoWhiteBG.svg";
import logo from "../../../../assets/logo.svg";

import Link from "next/link";
import { useRouter } from "next/router";
import { Affix } from "antd";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("overview");
  const router = useRouter();
  let currentRoute = router.pathname.split("/")[2];
  const dispatch = useDispatch();
 
  return (
    <>
      <Affix offsetTop={0}>
        <section className="hidden lg:block  ">

          <div className=" h-fit   bg-white w-full ">

            <div className=" flex justify-center items-center py-5 lg:px-2 xl:px-4 md:px-4">
              <img src={LogoWhiteWhiteBG.src} className="w-24" alt="" />
            </div>

            {/* <div className="lg:h-[450px] xl:h-screen  lg:overflow-y-scroll xl:overflow-y-hidden ">
                {SidebarItems?.map((data, index) => (
                  <Link
                    prefetch={false}
                    key={index}
                    href={`/admin-dashboard/${data.route}`} */}

            <div className="lg:h-[500px] overflow-y-scroll">

              {SidebarItems?.map((data, index) => (
                <Link
                  prefetch={false}
                  key={index}
                  href={`/admin-dashboard/${data.route}`}
                >
                  <p
                    className={
                      data.route === currentRoute
                        ? "text-[#7D23E0]  bg-gradient-to-r from-[#f3e8ff] fill-[#7D23E0] via-[#fff] to-[#fff] flex items-center cursor-pointer gap-x-3 py-1 "
                        : "flex items-center text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] space-x-3 py-1 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff] mr-3"
                    }

                  >

                    <div className="group">
                      <div className="flex items-center space-x-3 py-1 sm:pl-[15px] lg:pl-[30px]">
                        {data.icon}
                        <p className="font-semibold text-xs">{data.title}</p>

                      </div>

                    </div>
                  </p>
                </Link>
              ))}

              <div className="flex w-full mt-3 items-center space-x-3 px-[25px] cursor-pointer">
                <LogoutIcon />
                <div
                  onClick={() => {
                    dispatch(logout());

                  }}
                >
                  <p className="font-semibold text-[#828095]">Logout</p>

                </div>
              </div>
            </div>
          </div>
        </section>
      </Affix>

      {/* Mobile Sidebar */}
      <section className="lg:hidden">
        <div className=" bg-[#fafafa] pb-5">
          <div className="md:hidden block bg-white py-5 px-10 shadow-md !mt-0">
            <div className="flex justify-start">
              <GiHamburgerMenu
                onClick={() => setOpen(true)}
                className="text-xl scale-150 text-[#232323]"
              />
            </div>
          </div>
          {open && (
            <div className="h-screen md:hidden block w-[70%] z-50 rounded-r-3xl scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-scroll shadow-[0_35px_800px_-10px_rgba(0,0,0,0.9)] fixed top-0 left-0 bg-white">
              <div className="flex justify-between items-center pt-12 px-4">
                <div className=" flex w-[80%] items-center">
                  <img src={LogoWhiteWhiteBG.src} className=" mr-4" alt="" />
                </div>
                <ImCross
                  onClick={() => setOpen(false)}
                  className="text-[#414141] cursor-pointer mr-3"
                />
              </div>

              <div className="flex py-5 justify-center items-center flex-col">
                <img src={logo.src} className="w-12" alt="" />
                <h3 className="pt-1">Super Admin</h3>
              </div>

              <div className="">
                {SidebarItems?.map((data, index) => (
                  <Link
                    prefetch={false}
                    key={index}
                    href={`/admin-dashboard/${data.route}`}
                  >
                    <p
                      className={
                        data.route === currentRoute
                          ? "text-[#7D23E0] pl-10 bg-gradient-to-r from-[#f3e8ff] fill-[#7D23E0] via-[#fff] to-[#fff] flex items-center cursor-pointer gap-x-3 py-2 "
                          : "flex items-center pl-10 text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] space-x-3 py-2 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff]"
                      }
                    >
                      <div className="group">
                        <div className="flex items-center space-x-3 py-1 sm:pl-[15px] lg:pl-[30px]">
                          {data.icon}
                          <p className="font-semibold">{data.title}</p>
                        </div>
                      </div>
                    </p>
                  </Link>
                ))}
              </div>

              <div className="flex items-center text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] space-x-3 py-2 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff]">
                <div className="flex w-full items-center space-x-3 pl-11 py-5 cursor-pointer">
                  <LogoutIcon />
                  <div>
                    <p
                      onClick={() => {
                        dispatch(logout());

                      }}
                      className="font-semibold"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Sidebar;

const LogoutIcon = () => {
  return (
    <svg
      width="23"
      height="20"
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.59973 5.34359V3.14763C7.59973 2.56522 7.84806 2.00667 8.2901 1.59484C8.73214 1.18302 9.33167 0.95166 9.9568 0.95166H19.3851C20.0102 0.95166 20.6097 1.18302 21.0518 1.59484C21.4938 2.00667 21.7421 2.56522 21.7421 3.14763V16.3234C21.7421 16.9058 21.4938 17.4644 21.0518 17.8762C20.6097 18.288 20.0102 18.5194 19.3851 18.5194H10.4282C9.12652 18.5194 7.59973 17.5362 7.59973 16.3234V14.1275"
        stroke="#9A9A9A"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2567 5.34375L15.6138 7.53972L17.9709 9.73568L13.2567 14.1276M1 9.73568H17.0281"
        stroke="#9A9A9A"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
