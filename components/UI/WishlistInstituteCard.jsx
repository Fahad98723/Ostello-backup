import {
    ArrowRightOutlined,
    HeartFilled,
    HeartOutlined,
    StarFilled,
  } from "@ant-design/icons";
  import axios from "axios";
  import moment from "moment";
  import { useRouter } from "next/router";
  import React, { useEffect, useState } from "react";
  import { toast } from "react-hot-toast";
  import { useDispatch, useSelector } from "react-redux";
  import { useCopyToClipboard } from "react-use";
  import emiIcon from "../../assets/icons/emi.svg";
  import enrolledIcon from "../../assets/icons/enrolled.svg";
  import locationIcon from "../../assets/icons/location.svg";
  import instituteImage from "../../assets/images/institute.png";
  import { authSelector, getUser } from "../../redux/slices/authSlice";
  import {
    postUserAnalytics,
    selectUserAnalytics,
    setVisitInstitute,
  } from "../../redux/slices/UserAnalytics";
  import { ACCESS_TOKEN, host, OWNER_ID } from "../../utils/constant";
  import { isEmpty } from "../../utils/utils";
  
  export default function WishlistInstituteCard({
    id,
    name,
    studentsenrolled,
    rating,
    locations,
    courses,
    slug,
    images,
    coupons,
    users,
    setRefetch
  }) {
    const colors = ["green-400", "yellow-500", "red-500", "blue-600"];
    const [activeColor, setActiveColor] = useState();
    const { userData, isAuthenticated } = useSelector(authSelector);
    const { visitInstitute, userLocation } = useSelector(selectUserAnalytics);
    const [state, copyToClipboard] = useCopyToClipboard();
    const imageKey = images?.[0]?.key;
    const coupon = coupons?.[0] || "50% off | Use WELCOME50";
    const router = useRouter();
    const [courseNames, setCourseNames] = useState([]);
    const slugUrl = `/institute/${slug}`;
    useEffect(() => {
      const names = courses?.map((item) => item.name);
      setCourseNames([...new Set(names)].slice(0, 5));
      setActiveColor(colors[Math.floor(Math.random() * colors.length)]);
    }, []);
  
    useEffect(() => {
      if (state.value?.length) {
        toast.success(`"${state.value}" is copied !`);
      }
    }, []);
  
    const { area, city } = locations?.[0];
  
    const dispatch = useDispatch();
    const [wishListed, setWishListed] = useState(false);

    const [admin, setAdmin] = useState(false)

    useEffect(() => {
      dispatch(getUser())
      if (userData?.usertype === 1) {
        setAdmin(true)
      }
    }, [dispatch])
  
    const handleWishList = async () => {
      if (!isAuthenticated) {
        return toast.error("Please login to add in wishlist !");
      }
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };
  
      if (!wishListed) {
        let wishlistedData = [];
  
        userData?.wishlist?.forEach((e) => {
          wishlistedData.push(e?.id);
        });
  
        let updatedWishlist = wishlistedData?.concat([id]);
  
        const data = {
          id: OWNER_ID,
          updates: {
            wishlistinstituteids: updatedWishlist,
          },
        };
        
  
        try {
          await axios.patch(`${host}/users/`, data, config);
          toast.success("Successfully Added to whitelist !");
          setWishListed(true);
        } catch (err) {
          
        } finally {
          dispatch(getUser());
          setRefetch(true)
        }
      } else {
        let updatedWishlist = userData?.wishlist?.filter((item) => item.id !== id);
  
        let wishlistedData = [];
  
        updatedWishlist?.forEach((e) => {
          wishlistedData.push(e?.id);
        });
  
        const data = {
          id: OWNER_ID,
          updates: {
            wishlistinstituteids: wishlistedData,
          },
        };
        try {
          await axios.patch(`${host}/users/`, data, config);
          toast.success("Successfully Removed from whitelist !");
          setWishListed(false);
        } catch (err) {
          
        } finally {
          dispatch(getUser());
          setRefetch(true)
        }
      }
    };
    useEffect(() => {
      if(userData){
        if (userData?.wishlist?.length) {
          let found = userData?.wishlist.filter((item) => item.id === id).length;
          if (found) {
            setWishListed(true);
          }
        }
      }
      if(users){
        if (users?.wishlist?.length) {
          let found = users?.wishlist.filter((item) => item.id === id).length;
          if (found) {
            setWishListed(true);
          }
        }
      }
    }, [id, userData, users]);
  
    const singlePageRedirect = () => {
      let currentTime = moment().format();
      let previousTime = moment(visitInstitute?.timeStamps);
      let diff = moment(currentTime).diff(previousTime, "seconds");
      const data = {
        activity_type: "visit_institute",
        payload: {
          instituteid: id,
          institute_name: name,
        },
      };
      if (isAuthenticated) {
        data.payload.userid = userData?.id;
        data.payload.user_name = userData?.name;
      }
      if (userLocation?.latitude !== "") {
        data.location = {
          longitude: userLocation?.longitude?.toString(),
          latitude: userLocation?.latitude?.toString(),
        };
      } else {
        data.location = null;
      }
      if (visitInstitute?.instituteId === id && diff > 10) {
        dispatch(setVisitInstitute({ instituteId: id, timeStamps: currentTime }));
        dispatch(postUserAnalytics(data));
      } else {
        dispatch(postUserAnalytics(data));
        dispatch(setVisitInstitute({ instituteId: id, timeStamps: currentTime }));
      }
      router.push(slugUrl);
    };
  
    const reviewClassHandler = (item) => {
      let classes =
        "shadow-lg px-2  w-fit h-fit  flex items-center space-x-1 justify-center rounded-lg cursor-pointer border border-[#D7D7D7] ";
      if (item === 0) {
        classes += "text-white bg-[#FF3044]";
      } else if (item === 1) {
        classes += "text-white bg-deep_red";
      } else if (item <= 2) {
        classes += " bg-light_red border-light_red";
        if (item < 2) {
          classes += " text-light_red";
        } else {
          classes += " text-white";
        }
      } else if (item <= 3) {
        if (item < 3) {
          classes += " text-light_yellow";
        } else {
          classes += " text-white";
        }
        classes += " bg-light_yellow border-light_yellow";
      } else if (item <= 4) {
        if (item < 4) {
          classes += " text-light_green";
        } else {
          classes += " text-white";
        }
        classes += " bg-light_green border-light_green";
      } else if (item <= 5) {
        if (item < 5) {
          classes += " text-deep_green";
        } else {
          classes += " text-white";
        }
        classes += " bg-deep_green border-deep_green";
      } else {
        return classes;
      }
      return classes;
    };
  
    return (
      <>
        <div className="">
          <div
            style={{
              boxShadow: "0px 0px 38.7368px -7.74737px rgba(125, 35, 224, 0.15)",
            }}
            className=" hover:scale-105 group  duration-300 md:w-[380px] mx-auto  relative rounded-xl  w-full shadow-xl max-h-[540px] h-fit"
          >
            {/* <div
            onClick={() => {
              copyToClipboard('WELCOME50')
            }}
            className='absolute top-10 right-0 bg-primary px-4 py-1 text-white cursor-pointer'
          >
            {coupon}
          </div> */}
  
            <div className="p-4 select-none  ">
              <div
                onClick={singlePageRedirect}
                className="flex items-center justify-center cursor-pointer"
              >
                <img
                  src={
                    imageKey
                      ? `https://cdn.ostello.co.in/${imageKey}`
                      : instituteImage?.src
                  }
                  className="w-full h-[180px] md:h-[200px] md:max-h-[220px]  rounded-xl"
                  alt=""
                />
              </div>
  
              <div className="divide-y divide-gray/60">
                <div>
                  <div className="flex justify-between items-center  ">
                    <div className="cursor-pointer" onClick={singlePageRedirect}>
                      <h1 className="text-2xl font-bold my-2 hidden group-hover:block transition delay-150 duration-[5000ms] ">
                        {name}
                      </h1>
                      <h1 className="text-2xl font-bold my-2 block group-hover:hidden transition delay-150 duration-[5000ms] ">
                        {name.slice(0, 20)}
                        {name.length > 20 ? "..." : ""}
                      </h1>
                    </div>
  
                    <div
                      className={` ${reviewClassHandler(
                        rating
                      )} border text-white flex items-center h-fit w-fit justify-center space-x-1 px-2 rounded-md font-bold text-lg`}
                    >
                      <p className="">{rating}.0</p>
                      <StarFilled />
                    </div>
                  </div>
                  <div className=" hidden group-hover:flex  justify-between items-center pb-2 text-gray  font-normal  ">
                    <div className="">
                      {!isEmpty(courseNames) ? (
                        <>
                          {courseNames.slice(0, 3).map((item, key, arr) => (
                            <span key={key}>
                              {key + 1 === arr.length ? (
                                <span className="text-[18px] font-normal  ">
                                  {item}
                                </span>
                              ) : (
                                <span className="text-[18px] font-normal leading-[24px]">
                                  {item},{" "}
                                </span>
                              )}
                            </span>
                          ))}
                        </>
                      ) : (
                        <span>Currently No course available .</span>
                      )}
                    </div>
                    {
                      !admin ? <div
                      onClick={() => {
                        handleWishList();
                      }}
                      className={`rounded-full text-2xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                    >
                      {wishListed ? (
                        <HeartFilled className="text-[#FF0000] flex items-center " />
                      ) : (
                        <HeartOutlined className="flex items-center" />
                      )}
                    </div> : ''
                    }
                  </div>
                  <div className="flex  group-hover:hidden  justify-between items-center pb-2 text-gray  font-normal  ">
                    <div className="">
                      {!isEmpty(courseNames) ? (
                        <>
                          {courseNames.slice(0, 2).map((item, key, arr) => (
                            <span key={key}>
                              {key + 1 === arr.length ? (
                                <span className="text-[18px] font-normal  ">
                                  {item}
                                </span>
                              ) : (
                                <span className="text-[18px] font-normal leading-[24px]">
                                  {item},{" "}
                                </span>
                              )}
                            </span>
                          ))}
                        </>
                      ) : (
                        <span>Currently No course available .</span>
                      )}
                    </div>
                    {
                      !admin ?  <div
                      onClick={() => {
                        handleWishList();
                      }}
                      className={`rounded-full text-2xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                    >
                      {wishListed ? (
                        <HeartFilled className="text-[#FF0000] flex items-center " />
                      ) : (
                        <HeartOutlined className="flex items-center" />
                      )}
                    </div> : ''
                    }
                    
                  </div>
                </div>
  
                <div className="text-gray text-[16px]">
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
                      {area || ""}, {city || ""}
                    </p>
                  </div>
                </div>
  
                <div className="flex justify-between pt-4">
                  <button
                    onClick={singlePageRedirect}
                    className="text-gray underline cursor-pointer"
                  >
                    {courses?.length || 0} courses
                  </button>
  
                  <div onClick={singlePageRedirect}>
                    <a className="items-center text-black  space-x-1 flex active:opacity-75   ">
                      <span className="">View details</span>
                      <div className=" border rounded-full  ">
                        <ArrowRightOutlined className="flex items-center p-1 text-sm  " />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  