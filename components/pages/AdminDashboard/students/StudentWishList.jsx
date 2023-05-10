import React, { useEffect, useState } from "react";
import { RiHeart3Fill } from "react-icons/ri";
import axios from "axios";
import { host } from "../../../../utils/constant.js";
import { useRouter } from "next/router.js";
import Header from "../Header/Header.js";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { CourseCard } from "../../Profile/Wishlist.jsx";
import WishlistInstituteCard from "../../../UI/WishlistInstituteCard.jsx";
import {
  fetchInstitutes,
  institutesSelector,
} from "../../../../redux/slices/instituteSlice.jsx";
import {
  fetchCourses,
  selectCourse,
} from "../../../../redux/slices/courseSlice.js";
import { useDispatch, useSelector } from "react-redux";
const StudentWishlist = () => {
  const router = useRouter();
  const { studentId } = router.query;

  const [users, setUsers] = useState({});
  const [wishlists, setWishlists] = useState([]);
  const [wishlistsCourse, setWishlistsCourse] = useState([]);

  const [activeTab, setActiveTab] = useState("Institute Wishlist");
  const [dropDown, setDropDown] = useState(false);

  const dispatch = useDispatch();
  const { institutes } = useSelector(institutesSelector);
  const { courses } = useSelector(selectCourse);

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const run = async () => {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/users/student?id=${studentId}`, config);

        setUsers(data.message);
        // if (users) {
        //   setWishlists(users?.wishlist);
        //   setWishlistsCourse(users?.wishlist_courses);
        // }
      } catch (err) {
       
      }
    };
    run();
  }, [studentId, refetch]);

  useEffect(() => {
    dispatch(fetchInstitutes());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let wishlistLength = users?.wishlist?.length;

    if (wishlistLength && institutes?.length) {
      let filtered = users?.wishlist.map((item) => {
        return institutes.find((ins) => ins.id === item.id);
      });
      setWishlists(filtered);
    }
  }, [users, institutes]);

  useEffect(() => {
    let wishlistLength = users?.wishlist_courses?.length;

    if (wishlistLength && courses?.length) {
      let filtered = users?.wishlist_courses?.map((item) => {
        return courses.find((ins) => ins?.id === item?.id);
      });
      setWishlistsCourse(filtered);
    }
  }, [users, courses]);

  return (
    <div>
      <Header pageTitle={"Students"} />
      <div className="px-[30px] pt-4 pb-16">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">
          WishList
        </h2>
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-10 my-10 md:px-10 px-5">
              {wishlistsCourse?.map((course, idx) => (
                // <InstituteCard {...institute} key={idx}/>
                <CourseCard singleCourse={course} key={idx} users={users} setRefetch={setRefetch} />
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-[#FF0000]/80 mt-2">
              There are no wishlisted Course
            </p>
          )
        ) : wishlists?.length > 0 ? (
          <div className="w-full grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3     gap-10 my-10 md:px-10 px-5">
            {wishlists?.map((institute, idx) => (
              <WishlistInstituteCard {...institute} key={idx} users={users} setRefetch={setRefetch}/>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-[#FF0000]/80 mt-2">
            There are no wishlisted Insitute
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentWishlist;
