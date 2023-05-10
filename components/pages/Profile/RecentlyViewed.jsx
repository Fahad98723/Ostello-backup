import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useSelector } from "react-redux";
import image from "../../../assets/merchantDashboard/Accountancy/defaultbg.png";
import { authSelector } from "../../../redux/slices/authSlice";
import NoData from "./NoData";

import ShareModal from "./ShareModal";


const RecentlyViewed = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const data = [];
  const {userData} = useSelector(authSelector)
  function handleAddToWishlist(idx) {}
  const router = useRouter()
  const userLogin = useSelector((state) => state.auth.isAuthenticated)
  useEffect(() => {
    if (!userLogin) return router.push('/')
  }, [userLogin, router])
  return (
    <div className="h-full p-5 mb-16">
      <div className="heading my-2 ">
        <p className="text-2xl font-bold ">Recently Viewed</p>
      </div>

      {userData?.recentlyviewedcourses?.length > 0 ? (
        <div className="w-full  grid lg:grid-cols-4 gap-4  lg:py-6   lg:m-0">
          {userData?.recentlyviewedcourses?.map((course, idx) => (
            <CourseCard
              handleOpen={handleOpen}
              course={course}
              handleAddToWishlist={handleAddToWishlist}
              idx={idx}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <NoData text={`You haven’t viewed anything yet.`}></NoData>
      )}

      <ShareModal open={open} setOpen={setOpen}></ShareModal>
    </div>
  );
};

export default RecentlyViewed;

export const CourseCard = (props) => {
  const { course, handleAddToWishlist, idx, handleOpen } = props;

  return (
    <div className="bg-white w-12/12 rounded-3xl shadow-lg   m-auto lg:m-0">
      <div className="relative z-0">
        <AiOutlineHeart
          className="absolute cursor-pointer w-7 h-7 z-10 p-1 bg-white mr-2 lg:mr-4 lg:top-4 top-2 right-0 rounded-full "
          onClick={() => {
            handleAddToWishlist(idx);
          }}
        />
        <img src={course?.images[0]?.url} alt="" className="w-full rounded-t-3xl " />
      </div>

      <div className="flex items-center px-3 py-3">
        <div className="">
          <p className=" text-base">{course?.name}</p>
          <p className="text-sm font-bold">{course?.category?.name}</p>

          <div className="flex items-center mt-3">
            <div
              className="flex items-center rounded-lg  text-white  px-2 lg:mr-2"
              style={{ backgroundColor: "#FFD130" }}
            >
              <p className="lg:text-xl">{course?.rating}</p>
              <AiFillStar />
            </div>
            {/* <p className="text-ghost/80 ml-2">{`(${course?.totalRating})`}</p> */}
          </div>
        </div>
        <div
          className=" rounded-full  shadow-lg  ml-auto p-2 cursor-pointer "
          style={{ backgroundColor: "white" }}
        >
          <AiOutlineShareAlt
            onClick={() => handleOpen()}
            className="text-2xl"
          />
        </div>
      </div>

      <div className="pb-3 px-3 flex items-center">
        <p className="text-2xl font-bold">Rs. {course?.effectiveprice}</p>
        <p
          className="line-through ml-3"
          style={{ color: "#E46060", textDecorationLine: "line-through" }}
        >
          Rs.{course?.grossprice}
        </p>
      </div>
    </div>
  );
};
