import React, { useEffect, useState } from "react";
import defaultImage from "../../../assets/images/courseImg.png";
import emiIcon from "../../../assets/icons/emi.svg";
import enrolledIcon from "../../../assets/icons/enrolled.svg";
import locationIcon from "../../../assets/icons/location.svg";
import ShareModal from "./ShareModal";
import NoData from "./NoData";
import Link from "next/link";
import { HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { titleToUrl } from "../../utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { authSelector, getUser } from "../../../redux/slices/authSlice";
import axios from "axios";
import { ACCESS_TOKEN, host, OWNER_ID } from "../../../utils/constant";
import { isEmpty } from "../../../utils/utils";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  fetchInstitutes,
  institutesSelector,
} from "../../../redux/slices/instituteSlice";
import InstituteCard from "../../UI/InstituteCard";
import { fetchCourses, selectCourse } from "../../../redux/slices/courseSlice";
import WishlistInstituteCard from "../../UI/WishlistInstituteCard";

const Wishlist = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { userData } = useSelector(authSelector);
  const router = useRouter();
  const userLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { institutes } = useSelector(institutesSelector);
  const { courses } = useSelector(selectCourse);

  const [activeTab, setActiveTab] = useState("Institute Wishlist");
  const [dropDown, setDropDown] = useState(false);

  const [wishlists, setWishlists] = useState([]);
  const [wishlistsCourse, setWishlistsCourse] = useState([]);

  useEffect(() => {
    if (!userLogin) return router.push("/");
  }, [userLogin, router]);
  useEffect(() => {
    dispatch(fetchInstitutes());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let wishlistLength = userData?.wishlist?.length;

    if (wishlistLength && institutes?.length) {
      let filtered = userData?.wishlist.map((item) => {
        return institutes.find((ins) => ins.id === item.id);
      });
      setWishlists(filtered);
    }
  }, [userData, institutes]);

  useEffect(() => {
    let wishlistLength = userData?.wishlist_courses?.length;

    if (wishlistLength && courses?.length) {
      let filtered = userData?.wishlist_courses?.map((item) => {
        return courses.find((ins) => ins?.id === item?.id);
      });
      
      setWishlistsCourse(userData?.wishlist_courses);
    }
  }, [userData, courses]);

  

  return (
    <div className="h-full mb-16 ">
      <div>
        <div className="heading my-2 ml-10 mt-5 flex justify-between items-center">
          <p className="text-2xl font-bold ">Wishlist</p>

          <div className="relative ">
            <div
              className="flex lg:hidden  justify-center items-center space-x-2 p-3 text-primary bg-white  "
              onClick={() => {
                setDropDown(!dropDown);
              }}
            >
              <p className="text-center">{activeTab}</p>
              {dropDown ? (
                <MdOutlineKeyboardArrowUp className="text-2xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-2xl" />
              )}
            </div>
            <div className="">
              {dropDown && (
                <div
                  className="lg:hidden absolute z-10 right-0 top-15 bg-white px-5 py-3"
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                >
                  <div
                    className={` cursor-pointer ${
                      activeTab === "Institute Wishlist" ? "text-primary" : ""
                    } lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab("Institute Wishlist");
                    }}
                  >
                    Institute Wishlist
                  </div>

                  <div
                    className={`cursor-pointer ${
                      activeTab === "Course Wishlist" ? "text-primary" : ""
                    }  lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab("Course Wishlist");
                    }}
                  >
                    Course Wishlist
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" flex  justify-between">
          <div className="flex flex-col lg:flex-row w-full items-end lg:items-center lg:gap-10 text-base ">
            <div
              className={`${
                activeTab === "Institute Wishlist"
                  ? "bg-ghost/10 text-primary"
                  : "bg-white text-black"
              }  hidden lg:inline-block w-full cursor-pointer  rounded-t-lg py-2 text-center`}
              onClick={() => {
                setActiveTab("Institute Wishlist");
              }}
            >
              <p className={`font-medium text-2xl`}>Institute Wishlist</p>
            </div>

            <div
              className={`${
                activeTab === "Course Wishlist"
                  ? "bg-ghost/10 text-primary"
                  : "bg-white text-black"
              }    hidden lg:inline-block w-full cursor-pointer rounded-t-lg py-2 text-center`}
              onClick={() => {
                setActiveTab("Course Wishlist");
              }}
            >
              <p className="font-medium text-2xl">Course Wishlist</p>
            </div>
          </div>
        </div>

        {activeTab === "Course Wishlist" ? (
          wishlistsCourse?.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2    gap-10 my-10 md:px-10 px-5">
              {wishlistsCourse?.map((course, idx) => (
                // <InstituteCard {...institute} key={idx}/>
                <CourseCard singleCourse={course} key={idx} />
              ))}
            </div>
          ) : (
            <NoData
              text={`You haven’t wishlisted anything course yet.`}
            ></NoData>
          )
        ) : wishlists?.length > 0 ? (
          <div className="w-full grid   grid-cols-1 md:grid-cols-2    gap-10 my-10 md:px-10 px-5">
            {wishlists?.map((institute, idx) => (
              <WishlistInstituteCard {...institute} key={idx} />
            ))}
          </div>
        ) : (
          <NoData
            text={`You haven’t wishlisted anything institute yet.`}
          ></NoData>
        )}

        <ShareModal open={open} setOpen={setOpen}></ShareModal>
      </div>
    </div>
  );
};

export default Wishlist;

export const CourseCard = ({ singleCourse, users, setRefetch }) => {
  // const { course, handleDelete, idx, handleOpen } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [selectCourses, setSelectCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const { userData } = useSelector(authSelector);
  const router = useRouter();

  const style = {
    color: "#767676",
    margin: "4px 0",
  };
  const { id, images, classmode, institute, name, rating, studentsenrolled } =
    singleCourse;

  const imageURL = images?.length
    ? `https://cdn.ostello.co.in/${images[0]?.key}`
    : defaultImage?.src;

  
  const getClassType = (num) => {
    if (num === 1) {
      return "Online";
    }
    if (num === 2) {
      return "Offline";
    }
    if (num === 3) {
      return "Hybrid";
    }
  };

  const dispatch = useDispatch();
  const [wishListed, setWishListed] = useState(false);

  useEffect(() => {
    setSelectCourses(singleCourse?.name);
  }, [singleCourse]);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    if (userData?.usertype === 1) {
      setAdmin(true);
    }
  }, [dispatch]);

  const handleWishList = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    if (!wishListed) {
      let updatedWishlist = wishlistedData?.concat([singleCourse.id]);

      const data = {
        id: window.localStorage.getItem("OWNER_ID"),
        updates: {
          wishlistcourseids: updatedWishlist,
        },
      };

      try {
        await axios.patch(`${host}/users/`, data, config);
        toast.success("Successfully Added to whitelist !");
        setWishListed(true);
      } catch (err) {
        
      } finally {
        dispatch(getUser());
        setRefetch(true);
      }
    } else {
      let updatedWishlist = userData?.wishlist_courses?.filter(
        (item) => item?.id !== singleCourse?.id
      );
      let wishlistedData = [];

      updatedWishlist?.forEach((e) => {
        wishlistedData.push(e?.id);
      });

      const data = {
        id: window.localStorage.getItem("OWNER_ID"),
        updates: {
          wishlistcourseids: wishlistedData,
        },
      };
      try {
        await axios.patch(`${host}/users/`, data, config);
        toast.success("Successfully Removed from whitelist !");
        setWishListed(false);
      } catch (err) {
        
      } finally {
        dispatch(getUser());
        setRefetch(true);
      }
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData?.wishlist_courses?.length) {
        let found = userData?.wishlist_courses.filter(
          (item) => item.id === id
        ).length;
        if (found) {
          setWishListed(true);
        }
      }
    }
    if (users) {
      if (users?.wishlist_courses?.length) {
        let found = users?.wishlist_courses.filter(
          (item) => item.id === id
        ).length;
        if (found) {
          setWishListed(true);
        }
      }
    }
  }, [id, userData, users]);

  const course_url = `/institute/${titleToUrl(singleCourse?.institute?.name)}`;

  const coupon = "50% off | Use WELCOME50";

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
    setError("");
  };
  return (
    <div
      style={{
        boxShadow: "0px 0px 38.7368px -7.74737px rgba(125, 35, 224, 0.15)",
      }}
      className=" mt-3 hover:scale-105  duration-300  relative rounded-xl  md:w-[380px] w-full   mx-auto   h-full "
    >
      <div className="select-none  ">
        <Link legacyBehavior prefetch={false} href={course_url}>
          <div className="flex items-center justify-center p-4 ">
            <img
              src={
                images?.length
                  ? `https://cdn.ostello.co.in/${images?.[0]?.key}`
                  : defaultImage?.src
              }
              className="w-full h-[116px]  rounded-[10px] relative"
              alt=""
            />
            <div className="bg-[#FDB022] absolute top-6 left-5 flex text-white items-center px-2 py-1 text-[12px] rounded-3xl ">
              <StarFilled />
              <p className="ml-2">Recommended</p>
            </div>

            {!admin ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleWishList();
                }}
                className={`rounded-full text-2xl shadow-xl bg-white absolute top-6 right-5 text-gray flex items-center justify-center cursor-pointer p-1 `}
              >
                {wishListed ? (
                  <HeartFilled className="text-[#FF0000] flex items-center " />
                ) : (
                  <HeartOutlined className="flex items-center" />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>

        <div
          onClick={() => {
            CopyToClipboard("WELCOME50");
          }}
          className=" bg-primary px-4 py-1 text-white cursor-pointer"
        >
          {coupon}
        </div>

        <div className="p-4 ">
          <div>
            <div className="flex justify-between items-center  ">
              {/* <Link legacyBehavior prefetch={false} href={slugUrl}> */}
              <a href="" className="text-[17px] font-bold">
                {singleCourse?.institute?.name}
              </a>
              {/* </Link> */}

              <div
                className={` bg-green-600 border text-white flex items-center h-fit w-fit justify-center space-x-1 px-2 rounded-md font-bold text-lg`}
              >
                <p className="">{rating}.0</p>
                <StarFilled />
              </div>
            </div>
          </div>

          <div>
            <select
              onChange={(e) => handleSelect(e)}
              value={selected}
              // className={`my-2 form-select   marker:block w-full px-4 pr-8 py-2 text-[12px] font-normal text-slate bg-white  bg-no-repeat border-2 border-solid ${
              //   error.length === 0 ? 'border-light-gray' : 'border-red'
              // } rounded-xl  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              className="form-select  marker:block w-full px-4 py-2 my-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid rounded-xl border-light-gray  shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none"
            >
              <option className="w-full" selected value="" disabled>
                {selectCourses}
              </option>
            </select>
          </div>

          <div className="text-gray text-[12px]">
            <div className="flex space-x-2 my-2">
              <img src={enrolledIcon.src} alt="" />
              <p>{studentsenrolled || 0} + Students joined recently</p>
            </div>
            <div className="flex space-x-2 my-2">
              <img src={emiIcon.src} alt="" />
              <p> Emi Available</p>
            </div>
            <div className="flex space-x-2 my-2">
              <img src={locationIcon.src} alt="" />
              <p>
                {institute?.locations?.[0]?.area} ,{" "}
                {institute?.locations?.[0]?.city}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-row md:flex-col items-center md:block ">
              {/* <p className='text-[#7F56D9] font-semibold text-[15px] mr-2 md:mr-0 '>
                Rs. {effectiveprice}
              </p> */}
            </div>
            <Link legacyBehavior prefetch={false} href={course_url}>
              <div
                className="items-center text-black text-[12px] space-x-2 md:flex active:opacity-75 hidden"
              >
                <span className="text-black">View details </span>
                <BsArrowRightCircle size={20} className="flex items-center" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
