import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NoData from "./NoData";
import { CourseCard } from "./RecentlyViewed";
import ShareModal from "./ShareModal";

const OnGoingCourse = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const router = useRouter()
  const userLogin = useSelector((state) => state.auth.isAuthenticated)
  useEffect(() => {
    if (!userLogin) return router.push('/')
  }, [userLogin, router])
  const data = [];

  function handleAddToWishlist(idx) {}

  return (
    <div className="h-full p-5 mb-16">
      <div className="heading my-2 ">
        <p className="text-2xl font-bold ">On Going Course</p>
      </div>

      {data.length > 0 ? (
        <div className="w-full  grid lg:grid-cols-4 gap-4  lg:py-6   lg:m-0">
          {data.map((course, idx) => (
            <CourseCard
              handleOpen={handleOpen}
              course={course}
              handleAddToWishlist={handleAddToWishlist}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <NoData text={`don't have any ongoing course`}></NoData>
      )}

      <ShareModal open={open} setOpen={setOpen}></ShareModal>
    </div>
  );
};

export default OnGoingCourse;
