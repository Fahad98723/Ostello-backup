import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiFillBell,
  AiOutlineBell,
  AiFillHeart,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { MdViewSidebar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import emiIcon from "../../assets/icons/emi.svg";
import enrolledIcon from "../../assets/icons/enrolled.svg";
import locationIcon from "../../assets/icons/location.svg";
import instituteImage from "../../assets/images/institute.webp";
import {
  authSelector,
  getUser,
  setAuthModalState,
} from "../../redux/slices/authSlice";
import {
  postUserAnalytics,
  selectUserAnalytics,
  setVisitInstitute,
} from "../../redux/slices/UserAnalytics";
import { host } from "../../utils/constant";
import { isEmpty } from "../../utils/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
import moment from "moment";
const AuthModal = dynamic(
  () => {
    return import("../pages/HomeLanding/Header/Navbar/AuthModal");
  },
  { ssr: false }
);
export default function InstituteCard({
  id,
  name,
  studentsenrolled,
  rating,
  locations,
  slug,
  images,
  views,
  notifications,
  services,
}) {
  const colors = ["green-400", "yellow-500", "red-500", "blue-600"];

  const { userData, isAuthenticated } = useSelector(authSelector);
  const { visitInstitute, userLocation } = useSelector(selectUserAnalytics);
  const imageKey = images?.[0]?.key;
  const router = useRouter();
  const [courseNames, setCourseNames] = useState([]);
  const slugUrl = `/institute/${slug}`;

  const [userSubscribedData, setUserSubscribedData] = useState([]);

  const checkSubscriber = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };

      const res = await axios.get(
        `${host}/institute/subscriptions?instituteid=${id}&studentid=${userData?.id}`,
        config
      );
      setUserSubscribedData(res?.data?.message);
      // return the value directly
    } catch (err) {
      toast.error(err.message);
      // return an empty array in case of an error
    }
  };

  useEffect(() => {
    if (id && userData?.id) {
      checkSubscriber();
    }
  }, [id, userData?.id]);

  useEffect(() => {
    const temp = [];

    if (services["Junior Secondary School (Class 6-10th)"]) {
      temp.push("Class 6-10th");
    }
    if (services["Junior Secondary School (Class 6-8th)"]) {
      temp.push("Class 6-8th");
    }
    if (services["Junior Secondary School (Class 9-10th)"]) {
      temp.push("Class 9-10th");
    }

    if (services["Language Courses"]) {
      temp.push("Language Courses");
    }

    if (services["Computer"]) {
      temp.push("Computer");
    }
    if (services["Senior Secondary School (Class 11-12th)"]) {
      temp.push("Class 11-12th");
    }
    if (services["Competitive Exams"]) {
      temp.push("Competitive Exams");
    }
    if (services["Skill Based Courses"]) {
      temp.push("Skill Based Courses");
    }
    if (services["Graduation"]) {
      temp.push("Graduation");
    }
    if (services["Post Graduation"]) {
      temp.push("Post Graduation");
    }

    if (temp) {
      setCourseNames(temp);
    }
  }, [services]);

  const dispatch = useDispatch();
  const [wishListed, setWishListed] = useState(false);

  // const handleWishList = async () => {
  //   if (!isAuthenticated) {
  //     return toast.error("Please login to add in wishlist !");
  //   }
  //   const config = {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       Authorization: `Bearer ${ACCESS_TOKEN}`,
  //     },
  //   };

  //   if (!wishListed) {
  //     let wishlistedData = [];

  //     userData?.wishlist?.forEach((e) => {
  //       wishlistedData.push(e?.id);
  //     });

  //     let updatedWishlist = wishlistedData?.concat([id]);

  //     const data = {
  //       id: OWNER_ID,
  //       updates: {
  //         wishlistinstituteids: updatedWishlist,
  //       },
  //     };

  //     try {
  //       await axios.patch(`${host}/users/`, data, config);
  //       toast.success("Successfully Added to whitelist !");
  //       setWishListed(true);
  //     } catch (err) {
  //       
  //     } finally {
  //       dispatch(getUser());
  //     }
  //   } else {
  //     let updatedWishlist = userData?.wishlist?.filter(
  //       (item) => item.id !== id
  //     );

  //     let wishlistedData = [];

  //     updatedWishlist?.forEach((e) => {
  //       wishlistedData.push(e?.id);
  //     });

  //     const data = {
  //       id: OWNER_ID,
  //       updates: {
  //         wishlistinstituteids: wishlistedData,
  //       },
  //     };
  //     try {
  //       await axios.patch(`${host}/users/`, data, config);
  //       toast.success("Successfully Removed from whitelist !");
  //       setWishListed(false);
  //     } catch (err) {
  //       
  //     } finally {
  //       dispatch(getUser());
  //     }
  //   }
  // };

  const [notified, setNotified] = useState(false);

  const [subscribed, setSubscribed] = useState("");
  const [subscribedId, setSubscribedId] = useState("");

  useEffect(() => {
    if (subscribedId) {
      setSubscribed(subscribedId);
    }
  }, [subscribedId]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [disable, setDisable] = useState(false);

  const handleSubscribed = async () => {
    setDisable(true);
    if (!isAuthenticated) {
      setOpen(true);
      dispatch(setAuthModalState(2));
      return;
    }

    if (
      userSubscribedData?.filter((item) => item?.institute?.id === id).length
    ) {
      toast.success("Already Subscribed");
      return;
    }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${window.localStorage.getItem("ACCESS_TOKEN")}`,
      },
    };

    const updatedData = {
      instituteId: id,
    };

    try {
      await axios
        .patch(`${host}/institute/subscribe`, updatedData, config)
        .then(async ({ data }) => {
          toast.success("Successfully Subscirbed");
          setSubscribedId(id);

          let t0 = moment().format();
          var t1 = moment().format();

          const timeSpent = moment(t1).diff(t0, "seconds");

          let analyticData = {
            activity_type: "subscribe_institute",
            payload: {
              instituteid: id,
              total_time_in_seconds: timeSpent,
            },
          };
          if (isAuthenticated) {
            analyticData.payload.userid = userData?.id;
          }
          if (userLocation?.latitude !== "") {
            analyticData.location = {
              longitude: userLocation?.longitude?.toString(),
              latitude: userLocation?.latitude?.toString(),
            };
          } else {
            analyticData.location = null;
          }

          try {
            const response = axios.post(`${host}/analytics`, analyticData, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${window.localStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            });
            
          } catch (err) {
            // toast.error(err.message);
            
          }

          checkSubscriber();
        });
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(getUser());
      setDisable(false);
    }
  };

  const [notify, setNotify] = useState();

  useEffect(() => {
    // if (userData?.wishlist?.length) {
    //   let found = userData?.wishlist.filter((item) => item.id === id).length;
    //   if (found) {
    //     setWishListed(true);
    //   }
    // }
    if (userSubscribedData?.length) {
      let found = userSubscribedData?.filter(
        (item) => item?.institute?.id === id
      ).length;
      if (found) {
        // setSubscribed(found.id);
      }
    }
    if (userSubscribedData?.length) {
      let found = userSubscribedData?.find(
        (item) => item?.institute?.id === id
      );
      if (found) {
        setNotified(found.notify);
        setNotify(found?.notify);
      }
    }
  }, [id, userData, userSubscribedData]);

  const singlePageRedirect = async () => {
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

    return router.push(slugUrl);
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

  const handleNotify = async () => {
    if (!isAuthenticated) {
      setOpen(true);
      dispatch(setAuthModalState(2));
      return;
    }

    const updatedData = {
      instituteId: id,
      notify: !notify,
    };

    try {
      const { data } = await axios.patch(
        `${host}/institute/notify`,
        updatedData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        }
      );
      if (notify) {
        toast.success("Successfully UnNotified");
      }
      if (!notify) {
        toast.success("Successfully Notified");
      }

      setNotified(true);
    } catch (err) {
      
      toast.error(err.message);
    } finally {
      dispatch(getUser());
    }
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => {
        const nextCount = count + Math.ceil(views / 50); // increase the count by 1/50th of the difference between the current count and the target number
        return nextCount >= views ? views : nextCount; // stop the counter when we reach the target number
      });
    }, 100); // 10 milliseconds interval

    return () => clearInterval(interval);
  }, [views]);

  const [hoverNotified, setHoverNotified] = useState(false);
  const [hoverSubscribed, setHoverSubscribed] = useState(false);

  return (
    <>
      <div
        className=""
        onMouseOver={(e) => {
          setHoverNotified(false);
          setHoverSubscribed(false);
          e.stopPropagation();
        }}
      >
        <div
          style={{
            boxShadow: "0px 0px 38.7368px -7.74737px rgba(125, 35, 224, 0.15)",
          }}
          className=" hover:scale-105 group  duration-300  relative rounded-xl  w-full max-w-[400px] shadow-xl md:max-h-[900px] md:min-h-[500px] h-full"
        >
          <AuthModal
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
          />

          <div className="p-4 select-none  ">
            <div
              onClick={() => singlePageRedirect()}
              className="flex items-center justify-center cursor-pointer"
            >
              <Image
                width={380}
                height={380}
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                unoptimized
                src={
                  imageKey
                    ? `https://cdn.ostello.co.in/${imageKey}`
                    : instituteImage?.src
                }
                className="w-full h-[180px] md:h-fit md:min-h-[220px]  rounded-xl"
                alt=""
              />
            </div>

            <div className="divide-y divide-gray/60">
              <div>
                <div className="flex justify-between items-center  ">
                  <div
                    className="cursor-pointer"
                    onClick={() => singlePageRedirect()}
                  >
                    <h1 className="text-2xl font-bold my-2 hidden group-hover:block transition delay-150 duration-[5000ms] ">
                      {name}
                    </h1>
                    <h1 className="text-2xl font-bold my-2 block group-hover:hidden transition delay-150 duration-[5000ms] ">
                      {name?.slice(0, 18)}
                      {name?.length > 18 ? "..." : ""}
                    </h1>
                  </div>

                  <div
                    className={` ${reviewClassHandler(
                      rating
                    )} border text-white flex items-center h-fit w-fit justify-center space-x-1 px-2 rounded-md font-bold text-lg`}
                  >
                    <p className="">{rating}.0</p>
                    <AiFillStar />
                  </div>
                </div>
                <div className=" hidden group-hover:flex  justify-between items-center pb-2 text-gray  font-normal  ">
                  <div className="">
                    {!isEmpty(courseNames) ? (
                      <>
                        {courseNames.slice(0, 3).map((item, key, arr) => (
                          <span key={key}>
                            {key + 1 === arr.length ? (
                              <span className="text-[14px] font-normal  ">
                                {item.toUpperCase()}
                              </span>
                            ) : (
                              <span className="text-[14px] font-normal leading-[24px]">
                                {item.toUpperCase()},{" "}
                              </span>
                            )}
                          </span>
                        ))}
                      </>
                    ) : (
                      <span>Currently No course available .</span>
                    )}
                  </div>
                  <div className="flex">
                    {userSubscribedData?.filter(
                      (item) => item?.institute?.id === id
                    ).length ? (
                      <div
                        onClick={(e) => {
                          handleNotify();
                          e.stopPropagation();
                        }}
                        onMouseOver={(e) => {
                          setHoverNotified(true);
                          e.stopPropagation();
                        }}
                        onMouseOut={(e) => {
                          setHoverNotified(false);
                          e.stopPropagation();
                        }}
                        className={`rounded-full text-xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                      >
                        {userSubscribedData?.find(
                          (item) => item?.institute?.id === id
                        ).notify || hoverNotified ? (
                          <AiFillBell className="text-primary flex items-center " />
                        ) : (
                          <AiOutlineBell className="flex items-center" />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      onClick={(e) => {
                        if (!disable) {
                          handleSubscribed();
                        } else {
                          return;
                        }

                        e.stopPropagation();
                      }}
                      onMouseOver={(e) => {
                        setHoverSubscribed(true);
                        e.stopPropagation();
                      }}
                      onMouseOut={(e) => {
                        setHoverSubscribed(false);
                        e.stopPropagation();
                      }}
                      className={`rounded-full text-xl shadow-xl text-gray flex items-center justify-center  ${
                        disable ? "cursor-not-allowed" : "cursor-pointer"
                      } p-1 `}
                    >
                      {userSubscribedData?.filter(
                        (item) => item?.institute?.id === id
                      ).length ||
                      hoverSubscribed ||
                      id === subscribed ? (
                        <AiFillHeart className="text-primary flex items-center " />
                      ) : (
                        <AiOutlineHeart className="flex items-center" />
                      )}
                    </div>
                    {/* <div
                      onClick={() => {
                        handleWishList();
                      }}
                      className={`rounded-full text-2xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                    >
                      {wishListed ? (
                        <AiFillHeart className="text-[#FF0000] flex items-center " />
                      ) : (
                        <AiOutlineHeart className="flex items-center" />
                      )}
                    </div> */}
                  </div>
                </div>
                <div className="flex  group-hover:hidden  justify-between items-center pb-2 text-gray  font-normal  ">
                  <div className="">
                    {!isEmpty(courseNames) ? (
                      <>
                        {courseNames.slice(0, 2).map((item, key, arr) => (
                          <span key={key}>
                            {key + 1 === arr.length ? (
                              <span className="text-[14px] font-normal  ">
                                {item.toUpperCase()}
                              </span>
                            ) : (
                              <span className="text-[14px] font-normal leading-[24px]">
                                {item.toUpperCase()},{" "}
                              </span>
                            )}
                          </span>
                        ))}
                      </>
                    ) : (
                      <span>Currently No course available .</span>
                    )}
                  </div>
                  <div className="flex">
                    {userSubscribedData?.filter(
                      (item) => item?.institute?.id === id
                    ).length ? (
                      <div
                        onClick={(e) => {
                          handleNotify();
                          e.stopPropagation();
                        }}
                        onMouseOver={(e) => {
                          setHoverNotified(true);
                          e.stopPropagation();
                        }}
                        onMouseOut={(e) => {
                          setHoverNotified(false);
                          e.stopPropagation();
                        }}
                        className={`rounded-full text-xl  shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                      >
                        {userSubscribedData?.find(
                          (item) => item?.institute?.id === id
                        ).notify || hoverNotified ? (
                          <AiFillBell className="text-primary flex items-center " />
                        ) : (
                          <AiOutlineBell className="flex items-center" />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      onClick={(e) => {
                        if (!disable) {
                          handleSubscribed();
                        } else {
                          return;
                        }
                        e.stopPropagation();
                      }}
                      onMouseOver={(e) => {
                        setHoverSubscribed(true);
                        e.stopPropagation();
                      }}
                      onMouseOut={(e) => {
                        setHoverSubscribed(false);
                        e.stopPropagation();
                      }}
                      className={`rounded-full text-xl shadow-xl text-gray flex items-center justify-center  ${
                        disable ? "cursor-not-allowed" : "cursor-pointer"
                      } p-1 `}
                    >
                      {userSubscribedData?.filter(
                        (item) => item?.institute?.id === id
                      ).length ||
                      hoverSubscribed ||
                      id === subscribed ? (
                        <AiFillHeart className="text-primary flex items-center " />
                      ) : (
                        <AiOutlineHeart className="flex items-center" />
                      )}
                    </div>
                    {/* <div
                      onClick={() => {
                        handleWishList();
                      }}
                      className={`rounded-full text-2xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
                    >
                      {wishListed ? (
                        <AiFillHeart className="text-[#FF0000] flex items-center " />
                      ) : (
                        <AiOutlineHeart className="flex items-center" />
                      )}
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="text-gray text-[16px]">
                <div className="flex space-x-2 my-2">
                  <Image height={10} width={15} src={enrolledIcon.src} alt="" />
                  <p>{studentsenrolled || 0} + Students joined recently</p>
                </div>
                <div className="flex space-x-2 my-2">
                  <Image height={10} width={15} src={emiIcon.src} alt="" />
                  <p> 7+ Local Offers Available</p>
                </div>
                <div className="flex space-x-2 my-2">
                  <Image height={10} width={15} src={locationIcon.src} alt="" />
                  <p>
                    {locations?.[0]?.area || ""}, {locations?.[0]?.city || ""}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => singlePageRedirect()}
                  className="text-gray  cursor-pointer flex items-center"
                >
                  <MdViewSidebar className="mr-1 text-primary" /> {count || 0}{" "}
                  Views
                </button>

                <div onClick={() => singlePageRedirect()}>
                  <a className="items-center text-black  space-x-1 flex active:opacity-75   ">
                    <span className="">View details</span>
                    <div className=" border rounded-full  ">
                      <AiOutlineArrowRight className="flex items-center p-1 text-lg  " />
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
