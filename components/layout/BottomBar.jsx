import {
  HeartOutlined,
  HomeOutlined,
  ImportOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setAuthModalState,
} from "../../redux/slices/authSlice";
import {
  setLogoForBottomMenu,
  setShowSideBar,
} from "../../redux/slices/UserProfileSidePopUp";
import AuthModal from "../pages/HomeLanding/Header/Navbar/AuthModal";

export default function BottomBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();

  const [activeUrl, setActiveUrl] = useState("/");
  const navIconClasses = `
   text-xl
  `;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { isAuthenticated, userData, instituteDetails } =
    useSelector(authSelector);
  let userName = userData?.name;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleBar, setVisibleBar] = useState(true);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition((prev) => {
      if (prev <= position) {
        setVisibleBar(false);
      }
      if (prev >= position) {
        setVisibleBar(true);
      }

      return position;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 

  const bottomNavs = [
    {
      title: "Home",
      url: "/",
      icon: <HomeOutlined className={navIconClasses} />,
    },
    // {
    //   title: "Wishlist",
    //   url: "/profile/wishlist",
    //   icon: <HeartOutlined className={navIconClasses} />,
    //   sidebar: false,
    //   logoBottomMenu: true,
    // },
    {
      title: "Invite & Earn",
      url: "/profile/invite&earns",
      icon: <UserAddOutlined className={navIconClasses} />,
      sidebar: false,
      logoBottomMenu: true,
    },
    // {
    //   title: "Account",
    //   url: "/profile",
    //   sidebar: true,
    //   logoBottomMenu: false,
    //   icon: (
    //     <UserOutlined
    //       className={navIconClasses}
    //       // onClick={() => setIsLoggedIn(false)}
    //     />
    //   ),
    // },
    // {
    //   title: "Login",
    //   url: "/login",
    //   icon: (
    //     <ImportOutlined
    //       className={navIconClasses}
    //       // onClick={() => setIsLoggedIn(true)}
    //     />
    //   ),
    // },
  ];

  const router = useRouter();
  return (
    <div className={`md:hidden ${visibleBar ? "" : "hidden"}`}>
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <div className=" fixed bottom-0 w-full">
        <div className="bg-white  flex justify-around py-1  rounded-xl rounded-b-none w-full ">
          {bottomNavs.map((item, i) => (
            <div
              onClick={() => {
                if (item.url === "/profile/invite&earns") {
                  if (!isAuthenticated) {
                    setOpen(true);
                    dispatch(setAuthModalState(2));
                    return;
                  }
                  if (userData.usertype !== 3) {
                    return;
                  }
                }
                router.push(item?.url);
                setActiveUrl(item.url);

                dispatch(setShowSideBar(item?.sidebar));
                dispatch(setLogoForBottomMenu(item?.logoBottomMenu));
              }}
              key={i}
              className={` flex items-center justify-center flex-col mx-2 font-medium cursor-pointer  ${
                activeUrl === item.url ? "text-[#7D23E0]" : "text-gray-400"
              }`}
            >
              <span>{item.icon}</span>
              <p>{item.title}</p>
            </div>
          ))}
          {isAuthenticated ? (
            <div
              onClick={() => {
                router.push(
                  `${
                    userData.usertype === 3
                      ? "/profile"
                      : userData.usertype === 1
                      ? "/admin-dashboard/overview"
                      : "merchant/dashboard/profile"
                  }`
                );
                setActiveUrl(
                  `${
                    userData.usertype === 3
                      ? "/profile"
                      : userData.usertype === 1
                      ? "/admin-dashboard/overview"
                      : "merchant/dashboard/profile"
                  }`
                );
                dispatch(setShowSideBar(true));
                dispatch(setLogoForBottomMenu(false));
              }}
              className={` flex items-center justify-center flex-col mx-2 font-medium cursor-pointer  ${
                activeUrl ===
                `${
                  userData.usertype === 3
                    ? "/profile"
                    : userData.usertype === 1
                    ? "/admin-dashboard"
                    : "merchant/dashboard/profile"
                }`
                  ? "text-[#7D23E0]"
                  : "text-gray-400"
              }`}
            >
              <UserOutlined className={navIconClasses} />

              <p>Account</p>
            </div>
          ) : (
            <div
              onClick={() => {
                setOpen(true);
                dispatch(setAuthModalState(2));
              }}
              className={` flex items-center justify-center flex-col mx-2 font-medium cursor-pointer  ${
                activeUrl === "/login" ? "text-[#7D23E0]" : "text-gray-400"
              } `}
            >
              <ImportOutlined className={navIconClasses} />
              <p>Login</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
