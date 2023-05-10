import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/authSlice";
import { host } from "../../../utils/constant";
import NoData from "./NoData";
import PurchaseDetailsModal from "./PurchaseDetailsModal";


const PurchaseCourse = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [singleCourseDetails, setSinglCourseDetails] = useState({});
  const {userData} = useSelector(authSelector)
  const [purchasedCourses,setPurchasedCourses] = useState([])
  const [purchased,setPurchased] = useState([])
  const router = useRouter()
  const userLogin = useSelector((state) => state.auth.isAuthenticated)
  
  useEffect(() => {
    if (!userLogin) return router.push('/')
  }, [userLogin, router])

  useEffect(()=>{
    const fetchData = async () => {
      const res = await axios.get(
        `${host}/course/purchased`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
                    'ACCESS_TOKEN'
                )}`,
            },
        }
    );
    
    setPurchasedCourses(res?.data?.courses);
      }

    fetchData()
    .catch(console.error);
  },[])

  useEffect(()=>{
    let arr = [];
    purchasedCourses?.map(async (course)=>{
        const {data} = await axios.get(`${host}/Course?id=${course?.course?.id}`);
      if (data) {
        const result = {...data?.message,paymentmethod:course?.paymentmethod,purchaseddate:course?.purchaseddate};
        arr.push(result);
        
      }
      
      setPurchased(arr);
      })
  
  },[userData?.wishlist,purchasedCourses])

  const singleProjectHandle = (id) => {
    handleOpen();
    
    const singleCourse = purchased?.find((p) => p?.id === id);
    setSinglCourseDetails(singleCourse);
  };
  return (
    <div className="h-full p-5 mb-16">
      <div className="heading my-2 ">
        <p className="text-2xl font-bold ">Purchased Courses</p>
      </div>
      {purchased?.length > 0 ? (
        <div className="w-full  grid lg:grid-cols-3 gap-4  lg:py-6   lg:m-0">
          {purchased?.map((course,idx) => (
            <div key={idx} className="bg-white w-12/12 rounded-2xl shadow-lg p-4   m-auto lg:m-0 ">
              <div className="flex items-center">
                <img
                  src={`https://cdn.ostello.co.in/${course?.institute?.images[0]?.key}`}
                  alt=""
                  className="w-20 h-20 rounded-xl"
                />
                <div className="ml-3">
                  <p className="text-lg text-ghost/90 ">{course?.category?.name}</p>
                  <p className="text-lg">{course?.name}</p>
                </div>
              </div>
              <div>
                <div className="mt-3">
                  <p className="uppercase">Total Price</p>
                  <p className="font-semibold">₹{course?.effectiveprice}</p>
                </div>
                <div className="mt-3">
                  <p className="uppercase">Purchase Date</p>
                  <p className="font-semibold">{course?.purchaseddate?.split('T')[0]} at {course?.purchaseddate?.split('T')[1].split('.')[0]}</p>
                </div>

                <div
                  className="flex items-center mt-3 text-primary justify-end cursor-pointer"
                  onClick={() => singleProjectHandle(course?.id)}
                >
                  <p className="mr-2 text-lg">View Details </p>{" "}
                  <BsArrowRightCircle className="text-xl" />
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      ) : (
        <NoData text={`You haven’t purchased anything yet.`}></NoData>
      )}
      <PurchaseDetailsModal
        open={open}
        setOpen={setOpen}
        details={singleCourseDetails}
      ></PurchaseDetailsModal>
    </div>
  );
};

export default PurchaseCourse;
