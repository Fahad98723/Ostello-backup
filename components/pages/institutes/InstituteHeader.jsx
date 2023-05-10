import React, { useEffect, useState } from "react";
import {
  HeartFilled,
  HeartOutlined,
  PlayCircleFilled,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import Carousel from "react-elastic-carousel";
import toast from "react-hot-toast";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import hybridIndicator from "../../../assets/images/icons/hybridIndicator.svg";
import imgProto from "../../../assets/images/icons/img.svg";
import offlineIndicator from "../../../assets/images/icons/offlineIndicator.svg";
import onlineIndicator from "../../../assets/images/icons/onlineIndicator.svg";
import videoImage from "../../../assets/images/videoImg.png";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import { ACCESS_TOKEN, host, OWNER_ID } from "../../../utils/constant";
import { isEmpty } from "../../../utils/utils";
import useScreenWidth from "../../hooks/useScreenWidth";

import { GoChevronDown } from "react-icons/go";
import { BiPhoneCall } from "react-icons/bi";

import { MdViewSidebar } from "react-icons/md";
import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";
import { selectUserAnalytics } from "../../../redux/slices/UserAnalytics";
import moment from "moment";
import { removeRegisterData } from "../../../redux/slices/signUpSlice";
import dynamic from "next/dynamic";

const EnquiryFormModal = dynamic(
  () => {
    return import("../EnquiryFormModal/EnquiryFormModal");
  },
  { ssr: false }
);
const VideoPlayer = dynamic(
  () => {
    return import("../../VideoPlayer");
  },
  { ssr: false }
);
const SharePopup = dynamic(
  () => {
    return import("../../UI/SharePopup");
  },
  { ssr: false }
);

export default function InstituteHeader({
  currentInstitute,
  ipAddress,
  instituteFaculty,
}) {
  const [contents, setContents] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [openEnquire, setOpenEnquire] = useState(false);
  const handleClose = () => {
    setOpenEnquire(false);
    dispatch(removeRegisterData());
  };

  const [subscribers, setSubscribers] = useState([]);

  const [subscribeData, setSubscribeData] = useState([]);
  const [subscribeHandle, setSubscribeHandle] = useState(0);

  const [wishListed, setWishListed] = useState(false);
  const { userData } = useSelector(authSelector);
  const [userSubscribedData, setUserSubscribedData] = useState([]);

  const [views, setViews] = useState(0);

  const viewsHandle = () => {
    const run = async () => {
      try {
        const res = await axios.get(
          `${host}/institute?id=${currentInstitute?.id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        setViews(res?.data?.message?.views);
      } catch (err) {
        toast.error(err.message);
      }
    };
    run();
  };

  const patchViews = async () => {
    const updatedData = {
      instituteId: currentInstitute?.id,
    };

    try {
      const { data } = await axios.patch(`${host}/institute/view`, updatedData);
      viewsHandle();
    } catch (err) {
      viewsHandle();
    }
  };

  useEffect(() => {
    patchViews();
  }, []);

  const getSubscriberData = async (userData, currentInstitute) => {
    if (currentInstitute?.id) {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        const res = await axios.get(
          `${host}/institute/subscriptions?instituteid=${currentInstitute?.id}&limit=50`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setSubscribers(res?.data?.count);
        setSubscribeHandle(res?.data?.count);

        setSubscribeData(res?.data?.message);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const checkSubscriber = async () => {
    if (currentInstitute?.id && userData?.id) {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };

        const res = await axios.get(
          `${host}/institute/subscriptions?instituteid=${currentInstitute?.id}&studentid=${userData?.id}`,
          config
        );
        setUserSubscribedData(res?.data?.message);
      } catch (err) {
        toast.error(err.message);
        // return an empty array in case of an error
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkSubscriber();
    }, 1000);
  }, [userData?.id, currentInstitute?.id]);

  useEffect(() => {
    if (userData?.id || currentInstitute?.id) {
      getSubscriberData(userData, currentInstitute);
    }
  }, [userData?.id, currentInstitute?.id]);

  const subscribeAnalytical = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${
          typeof window !== "undefined" &&
          window.localStorage.getItem("ACCESS_TOKEN")
        }`,
      },
    };
    let t0 = moment().format();
    var t1 = moment().format();

    const timeSpent = moment(t1).diff(t0, "seconds");

    //

    let analyticData = {
      activity_type: "subscribe_institute",
      payload: {
        instituteid: currentInstitute?.id,
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
      const response = await axios.post(`${host}/analytics`, analyticData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });
    } catch (err) {
      // toast.error(err.message);
    } finally {
      // getSubscriberData(userData, currentInstitute);
    }
  };

  const router = useRouter();
  const [loadInactive, setLoadInactive] = useState(false);
  const { screenWidth } = useScreenWidth();

  const { isAuthenticated, loading } = useSelector(authSelector);

  const reviewClassHandler = (item) => {
    let classes =
      "rating flex xl:space-x-2 justify-between items-center  px-2 py-1  md:text-xl text-sm rounded-tl-md rounded-bl-md font-bold ";
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

  useEffect(() => {
    if (!isEmpty(currentInstitute)) {
      let videos = currentInstitute.videos;
      let images = currentInstitute.images;
      setContents(
        []
          .concat(
            videos?.map((item) => {
              return { ...item, type: "video" };
            })
          )
          .concat(
            images?.map((item) => {
              return { ...item, type: "image" };
            })
          )
      );
      return;
    }

    if (!isEmpty(currentInstitute.updatedRequest.videos) && loadInactive) {
      let videos = currentInstitute.updatedRequest.videos;
      let images = currentInstitute.updatedRequest.images;
      setContents(
        []
          .concat(
            videos?.map((item) => {
              return { ...item, type: "video" };
            })
          )
          .concat(
            images?.map((item) => {
              return { ...item, type: "image" };
            })
          )
      );
    }
  }, [currentInstitute, loadInactive]);
  const { classmode, workinghours, locations, slug, short_description } =
    currentInstitute;

  let time = "14:15 to 17:15";

  const TwentyFourToTwelveHour = (textTime) => {
    let [starting, ending] = textTime?.split(" to ");
    const converter = (time) => {
      let prefix = "";
      let updatedHour = "";
      let [hour, min] = time.split(":");
      if (hour > 12) {
        prefix = "PM";
        updatedHour = (Number(hour) % 12).toString();
      } else {
        updatedHour = hour;
        prefix = "AM";
      }

      let convertedTime = `${updatedHour}:${min} ${prefix}`;
      return convertedTime;
    };

    let updatedTime = `${converter(starting)} to ${converter(ending)}`;

    return updatedTime;
  };

  const [timings, setTimings] = useState("");

  useEffect(() => {
    if (!isEmpty(workinghours)) {
      let time = TwentyFourToTwelveHour(workinghours);
      setTimings(time);
    }
  }, [workinghours]);

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

      let updatedWishlist = wishlistedData?.concat([currentInstitute?.id]);

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
      } catch (err) {}
    } else {
      let updatedWishlist = userData?.wishlist?.filter(
        (item) => item.id !== currentInstitute.id
      );

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
      } catch (err) {}
    }
  };
  useEffect(() => {
    if (userData?.wishlist?.length) {
      let found = userData?.wishlist.filter(
        (item) => item.id === currentInstitute.id
      ).length;
      if (found) {
        setWishListed(true);
      }
    }
  }, [currentInstitute, userData]);

  const [notified, setNotified] = useState(false);
  const [notify, setNotify] = useState();

  const [subscribed, setSubscribed] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const handleFormClose = () => {
    setOpenForm(false);
  };
  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const { visitCourseOffered, userLocation } = useSelector(selectUserAnalytics);

  const [disable, setDisable] = useState(false);

  const handleSubscribed = () => {
    if (!isAuthenticated) {
      setOpenForm(true);
      dispatch(setAuthModalState(2));
      return;
    }

    if (subscribed) {
      toast.success("Already Subscribed");
      return;
    }

    setDisable(true);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${window.localStorage.getItem("ACCESS_TOKEN")}`,
      },
    };

    const updatedData = {
      instituteId: currentInstitute?.id,
    };

    try {
      axios
        .patch(`${host}/institute/subscribe`, updatedData, config)
        .then(async ({ data }) => {
          setSubscribed(true);
          toast.success("Successfully Subscirbed");

          setSubscribeHandle(subscribeHandle + 1);
          subscribeAnalytical();
        });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDisable(false);
      // getSubscriberData(userData, currentInstitute);
      checkSubscriber();
    }
  };

  useEffect(() => {
    if (userSubscribedData?.length) {
      let found = userSubscribedData?.filter(
        (item) => item?.institute?.id === currentInstitute?.id
      ).length;
      if (found) {
        setSubscribed(true);
      }
    }
    if (userSubscribedData?.length) {
      let found = userSubscribedData?.find(
        (item) => item?.institute?.id === currentInstitute?.id
      );
      if (found) {
        setNotified(found?.notify);
        setNotify(found?.notify);
      }
    }
  }, [currentInstitute?.id, userSubscribedData, userData]);

  const handleNotify = async () => {
    if (!isAuthenticated) {
      setOpenForm(true);
      dispatch(setAuthModalState(2));
      return;
    }

    const updatedData = {
      instituteId: currentInstitute?.id,
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
      // dispatch(getUser());
    }
  };

  const getClassType = (num) => {
    if (num === 1) {
      return "Hybrid";
    }
    if (num === 2) {
      return "Online";
    }
    if (num === 3) {
      return "Offline";
    }
  };

  const [branchShow, setBranchShow] = useState(false);
  const [branch, setBranch] = useState(0);

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    setBranchShow(false);

    e.stopPropagation();
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
  }, [views, currentInstitute]);

  const [hoverNotified, setHoverNotified] = useState(false);
  const [hoverSubscribed, setHoverSubscribed] = useState(false);

  return (
    <div
      name="Header"
      className="mt-9"
      onMouseOver={(e) => {
        setHoverNotified(false);
        setHoverSubscribed(false);
        e.stopPropagation();
      }}
    >
      <AuthModal
        handleClose={handleFormClose}
        handleOpen={handleFormOpen}
        open={openForm}
      />
      <div className=" py-5 md:py-10 ">
        <div className=" px-3 sm:px-5 container  mx-auto  text-black lg:flex  flex-row-reverse justify-between ">
          <section className="lg:w-6/12 mx-auto">
            <div className="  flex flex-col md:hidden  font-bold mb-5 px-3">
              <p className=" flex md:mb-2 my-4 md:space-x-2 uppercase text-[14px] items-center ">
                {
                  <img
                    src={
                      currentInstitute?.classmode === 1
                        ? hybridIndicator?.src
                        : currentInstitute?.classmode === 2
                        ? onlineIndicator?.src
                        : offlineIndicator?.src
                    }
                    className="w-[10px] mr-2"
                    alt=""
                  />
                }
                <span>{getClassType(currentInstitute?.classmode)} Course</span>
              </p>
              <div className="flex justify-between">
                <p className="text-2xl xl:text-4xl md:w-3/4 lg:text-3xl font-bold">
                  {currentInstitute?.name}{" "}
                </p>
                <div className="flex space-x-2 items-center"></div>
              </div>
              <div className="my-4 md:hidden block ">
                <p className="text-[#5C5C5C] text-base">
                  {short_description?.slice(0, 150)}
                </p>
              </div>
            </div>
            <Carousel
              itemsToShow={1}
              showArrows={
                screenWidth > 768 && contents.length > 1 ? true : false
              }
              enableAutoPlay={false}
              autoPlaySpeed={2000}
              pagination={true}
              renderPagination={({ pages, activePage, onClick }) => {
                return (
                  <div className="flex items-center space-x-2 mt-3 ">
                    {pages?.map((page, i) => {
                      const isActivePage = activePage === page;
                      return (
                        <div
                          className={`cursor-pointer  h-2 rounded-lg my-5 transition-all duration-500 ease-in-out ${
                            isActivePage
                              ? "bg-primary md:w-28 w-16 "
                              : "bg-gray/20 md:w-6 w-2"
                          }`}
                          key={i}
                          onClick={() => onClick(page)}
                        />
                      );
                    })}
                  </div>
                );
              }}
            >
              {contents.map((item, i) => (
                <div key={i} className="video_container w-full ">
                  {item.type === "video" ? (
                    <div className="border relative border-white  rounded-xl overflow-hidden h-full aspect-video">
                      <VideoPlayer
                        thumbnailURL={`https://cdn.ostello.co.in/${item?.thumbnail?.key}`}
                        videoURL={`https://cdn.ostello.co.in/${item?.video?.key}`}
                        item={item}
                        id={currentInstitute?.id}
                        ip={ipAddress}
                        name={currentInstitute?.name}
                      />
                      <div
                        onClick={() => {}}
                        className=" group absolute top-2 right-2 md:top-5 md:right-5 p-3 bg-white border-solid border-primary border flex rounded-lg gap-2 transition-all ease-in-out duration-30 cursor-pointer"
                      >
                        <img
                          src={imgProto.src}
                          className="w-[10px] text-primary"
                          alt=""
                        />
                        <p className="text-[#414141] hidden group-hover:block   ">
                          See more
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="border relative border-white rounded-xl overflow-hidden ">
                      <img
                        src={`https://cdn.ostello.co.in/${item.key}`}
                        className="w-full md:max-h-[400px]"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
              {isEmpty(contents) && (
                <>
                  {[1].map((item, i) => (
                    <div key={i} className="video_container">
                      <div className="relative">
                        <img
                          src={videoImage.src}
                          className=" w-full  "
                          alt=""
                        />
                        <PlayCircleFilled
                          className="
                              text-black/90
                              absolute
                              text-6xl cursor-pointer active:opacity-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 duration-300"
                        />
                        <div
                          onClick={() => router.push(slug + "/gallery")}
                          className=" group absolute top-5 right-5 md:top-10 md:right-10 p-3 bg-white flex rounded-lg gap-2 transition-all ease-in-out duration-300  cursor-pointer"
                        >
                          <img
                            src={imgProto.src}
                            className="w-[10px] text-primary"
                            alt=""
                          />
                          <p className="text-[#414141] hidden group-hover:block   ">
                            See more
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Carousel>
            <div className="w-[320px] mx-auto mt-3 hidden md:flex">
              <p
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
                className="px-8 py-2 flex items-center bg-light-gray rounded-md text-[20px] mr-2 text-black cursor-pointer"
              >
                {subscribed || hoverSubscribed ? (
                  <HeartFilled className="flex mr-2  w-8 h-8 md:h-10 md:w-10   rounded-full shadow-sm  items-center justify-center cursor-pointer p-1  text-primary  text-lg " />
                ) : (
                  <HeartOutlined className="flex mr-2  w-8 h-8 md:h-10 md:w-10 p-1  rounded-full shadow-sm  items-center justify-center cursor-pointer  text-black text-md " />
                )}{" "}
                Subscribe
              </p>
              <a
                className="text-center    text-black text-[20px] flex items-center"
                href="tel:+91-82714-69630"
              >
                <div className="px-4 py-3 bg-light-gray rounded-md">
                  {" "}
                  <BiPhoneCall className=" text-[25px] " />
                </div>
              </a>
            </div>
          </section>
          <div className="lg:w-6/12">
            <div className="md:mr-10">
              <section className=" my-1 cursor-pointer  ">
                <div className="  flex flex-col md:block hidden font-bold ">
                  <p className="mr-auto px-2 flex mb-2 space-x-2 uppercase text-[14px] ">
                    {
                      <img
                        src={
                          currentInstitute.classmode === 1
                            ? hybridIndicator.src
                            : currentInstitute.classmode === 2
                            ? onlineIndicator.src
                            : offlineIndicator.src
                        }
                        alt=""
                      />
                    }
                    <span>
                      {getClassType(currentInstitute.classmode)} Course
                    </span>
                  </p>
                  <div className="xl:flex lg:block md:flex block  justify-between">
                    <p className="text-3xl xl:text-5xl md:w-3/4 lg:text-4xl font-bold">
                      {currentInstitute.name}{" "}
                    </p>

                    <div
                      onClick={(e) => {
                        if (!disable) {
                          handleSubscribed();
                        } else {
                          return;
                        }
                        e.stopPropagation();
                      }}
                      className={` items-center w-[160px] md:my-1  items-center flex   ${
                        disable ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`${reviewClassHandler(
                          currentInstitute.rating
                        )} w-[60px] flex space-x-2 items-center`}
                      >
                        <p className="">{currentInstitute.rating}</p>
                        <StarFilled />
                      </div>

                      <div className="bg-white py-2.5 px-1 w-full rounded-tr-md rounded-br-md">
                        <p className="text-[12px]  text-[#5C5C5C] font-[500]">
                          {subscribeHandle} subscribers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:block hidden">
                  <p className="text-[#5C5C5C] text-base">
                    {short_description?.slice(0, 150)}
                  </p>
                  {/* ))} */}
                </div>
              </section>
              <div className="border-b-0 border-l-0 border-[#BBBBBB] border-r-0 border-2 border-dashed w-full my-5 hidden md:block" />

              <section className="   text-black ">
                {/* <div className='border-b-0 border-l-0 border-r-0 border-2 border-dashed w-full my-2 border-[#BBBBBB]  md:hidden block' /> */}
                <div className="info flex items-center justify-between  md:hidden  space-x-5 ">
                  <div
                    onClick={(e) => {
                      if (!disable) {
                        handleSubscribed();
                      } else {
                        return;
                      }
                      e.stopPropagation();
                    }}
                    className={`flex  items-center  ${
                      disable ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={reviewClassHandler(currentInstitute.rating)}
                      //  className=" rating flex xl:space-x-2 justify-between items-center bg-[#FFD130] px-2 py-1  md:text-xl text-sm rounded-md font-bold"
                    >
                      <p className="mr-1">{currentInstitute.rating}</p>
                      <StarFilled />
                    </div>

                    <div className="bg-white py-2 px-1 rounded-tr-md rounded-br-md">
                      <p className="text-[14px] text-[#5C5C5C] font-[500]">
                        {subscribeHandle} subscribers
                      </p>
                    </div>
                  </div>
                  <div className=" flex   md:text-2xl">
                    {/* <div onClick={() => {}}>
                      {wishListed ? (
                        <HeartFilled
                          onClick={() => handleWishList()}
                          className={`flex   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm  items-center justify-center cursor-pointer  text-[#FF0000] md:ring-2 ring-1 ring-black text-sm md:text-2xl `}
                        />
                      ) : (
                        <HeartOutlined
                          onClick={() => {
                            handleWishList();
                          }}
                          className={`flex items-center text-sm   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black  md:text-2xl`}
                        />
                      )}
                    </div> */}

                    <div className="flex">
                      {subscribed ? (
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
                          className={` flex items-center  justify-center cursor-pointer mr-2`}
                        >
                          {notified || hoverNotified ? (
                            <AiFillBell className="flex  w-6 h-6 md:h-10 md:w-10  p-1  rounded-full shadow-sm  items-center justify-center cursor-pointer  text-primary md:ring-2 ring-1 ring-black text-sm md:text-md " />
                          ) : (
                            <AiOutlineBell className="flex   w-6 h-6 md:h-10 md:w-10  p-1 rounded-full shadow-sm  items-center justify-center cursor-pointer   md:ring-2 ring-1 ring-black text-sm md:text-md " />
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
                        className={`text-gray flex items-center justify-center  ${
                          disable ? "cursor-not-allowed" : "cursor-pointer"
                        } mr-2`}
                      >
                        {subscribed || hoverSubscribed ? (
                          <HeartFilled className="flex   w-8 h-8 md:h-10 md:w-10   rounded-full shadow-sm  items-center justify-center cursor-pointer p-1  text-primary md:ring-2 ring-1 ring-black text-lg " />
                        ) : (
                          <HeartOutlined className="flex   w-8 h-8 md:h-10 md:w-10 p-1  rounded-full shadow-sm  items-center justify-center cursor-pointer  text-black md:ring-2 ring-1 ring-black text-lg " />
                        )}
                      </div>
                    </div>

                    <ShareAltOutlined
                      onClick={() => setOpen(true)}
                      className="active:opacity-80 flex items-center text-md    w-8 h-8 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black md:text-2xl "
                    />
                  </div>
                </div>
                {currentInstitute?.id ===
                "c2ab2be5-772f-41e2-ac81-8ee6dcdca9e9" ? (
                  <div className="relative  my-1">
                    <p
                      onClick={(e) => {
                        setBranchShow(!branchShow);
                        e.stopPropagation();
                      }}
                      className="flex w-full justify-between md:w-44 items-center  cursor-pointer border-2 border-solid border-[#BBBBBB]   p-3 "
                    >
                      <p className={`  text-[16px]  font-bold `}>
                        {`Branch ${branch + 1}`}
                      </p>
                      {branchShow ? (
                        <GoChevronDown className="ml-1  text-[16px] rotate-180" />
                      ) : (
                        <GoChevronDown className="ml-1  text-[16px]" />
                      )}
                    </p>
                    {branchShow ? (
                      <>
                        {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                        <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div
                            className="py-1 divide-y divide-gray/20"
                            role="none"
                          >
                            {locations?.map((location, key) => {
                              return (
                                <div
                                  key={key}
                                  className={`flex ${
                                    branch === key
                                      ? "text-primary"
                                      : "text-[#000000]"
                                  }   justify-between cursor-pointer  items-center`}
                                  onClick={() => {
                                    setBranch(key);
                                    setBranchShow(false);
                                  }}
                                >
                                  <p
                                    key={key}
                                    className=" text-[16px]  px-4 py-2"
                                  >
                                    Branch {key + 1}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className="flex justify-between items-center">
                  <div className="">
                    <div className="flex  items-center ">
                      <HiLocationMarker className=" text-4xl  text-black" />
                      <p className=" text-[14px] font-[400px] mt-3 md:w-3/4 w-full ">
                        {locations[branch]?.line1} {locations[branch]?.line2}{" "}
                        {locations[branch]?.state} {locations[branch]?.country}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="    items-center md:flex hidden md:text-2xl">
                    {/* {wishListed ? (
                      <HeartFilled
                        onClick={() => handleWishList()}
                        className={`flex   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm  items-center justify-center cursor-pointer  text-[#FF0000] md:ring-2 ring-1 ring-black text-sm md:text-2xl `}
                      />
                    ) : (
                      <HeartOutlined
                        onClick={() => {
                          handleWishList();
                        }}
                        className={`flex items-center text-sm   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black  md:text-2xl`}
                      />
                    )} */}

                    <div className="flex">
                      {subscribed ? (
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
                          className={` flex items-center justify-center cursor-pointer mr-2`}
                        >
                          {notified || hoverNotified ? (
                            <AiFillBell className="flex  w-6 h-6 md:h-10 md:w-10  p-1  rounded-full shadow-sm  items-center justify-center cursor-pointer  text-primary md:ring-2 ring-1 ring-black text-sm md:text-md " />
                          ) : (
                            <AiOutlineBell className="flex   w-6 h-6 md:h-10 md:w-10  p-1 rounded-full shadow-sm  items-center justify-center cursor-pointer  text-black md:ring-2 ring-1 ring-black text-sm md:text-md " />
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
                        className={`text-gray flex items-center justify-center  ${
                          disable ? "cursor-not-allowed" : "cursor-pointer"
                        } mr-2`}
                      >
                        {subscribed || hoverSubscribed ? (
                          <HeartFilled className="flex text-2xl  w-8 h-8 md:h-10 md:w-10   rounded-full shadow-sm  items-center justify-center cursor-pointer p-1  text-primary md:ring-2 ring-1 ring-black  " />
                        ) : (
                          <HeartOutlined className="flex  text-2xl w-8 h-8 md:h-10 md:w-10 p-1  rounded-full shadow-sm  items-center justify-center cursor-pointer  text-black md:ring-2 ring-1 ring-black  " />
                        )}
                      </div>
                    </div>

                    <ShareAltOutlined
                      onClick={() => setOpen(true)}
                      className="active:opacity-80 flex items-center text-sm    w-8 h-8 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black md:text-2xl "
                    />
                  </div>
                </div>
              </section>
              <SharePopup
                TextToCopy={
                  typeof window !== "undefined" && window.location.href
                }
                open={open}
                onClose={() => setOpen(false)}
              />

              <div className="border-b-0 border-l-0 border-[#BBBBBB] border-r-0 border-2 border-dashed w-full my-5 k" />

              <section className="statistics mt-7 xl:mb-8 mb-4 ">
                <>
                  <div className="info flex items-center sm:justify-between  space-x-5 ">
                    <div className="border-2 md:w-[180px] w-[120px] bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px] font-bold">
                        {currentInstitute?.studentsenrolled || 0}
                      </p>
                      <p className="text-[14px] text-center">
                        Students Enrolled
                      </p>
                    </div>
                    <div className="border-2 md:w-[180px] w-[120px] bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px]  font-bold">
                        {currentInstitute?.establishedyear}
                      </p>
                      <p className="text-[14px] text-center">
                        Year of Establishment
                      </p>
                    </div>
                    <div className="border-2 md:w-[180px] w-[120px] bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px]  font-bold">
                        {count || 0}
                      </p>
                      <p className="text-[14px] text-center flex md:items-center justify-center">
                        <MdViewSidebar className="mr-1 text-primary" /> Profile
                        Visit
                      </p>
                    </div>
                    {/* <div onClick={() => setEnquiryOpen(true)} className="border-2 bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px]  font-bold">
                        Click
                      </p>
                      <p className="text-[14px] text-center">
                        Ravi
                      </p>
                    </div> */}
                  </div>
                </>
              </section>

              <div className="w-[250px] mx-auto mt-3 md:hidden flex">
                <p
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
                  className="px-8 py-2 flex items-center bg-light-gray rounded-md text-[20px] mr-2 text-black cursor-pointer"
                >
                  {subscribed || hoverSubscribed ? (
                    <HeartFilled className="flex mr-2  w-8 h-8 md:h-10 md:w-10   rounded-full shadow-sm  items-center justify-center cursor-pointer p-1  text-primary  text-lg " />
                  ) : (
                    <HeartOutlined className="flex mr-2  w-8 h-8 md:h-10 md:w-10 p-1  rounded-full shadow-sm  items-center justify-center cursor-pointer  text-black text-md " />
                  )}{" "}
                  Subscribe
                </p>
                <a
                  className="text-center    text-black text-[20px] flex items-center"
                  href="tel:+91-82714-69630"
                >
                  <div className="px-4 py-3 bg-light-gray rounded-md">
                    {" "}
                    <BiPhoneCall className=" text-[25px] " />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnquiryFormModal
        open={openEnquire}
        setOpen={setOpenEnquire}
        handleClose={handleClose}
      />
    </div>
  );
}
