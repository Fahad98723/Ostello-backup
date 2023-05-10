import React, { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "react-use";

import copyIcon from "./blog-assets/copyIcon.svg";

import { useRouter } from "next/router";
import toast from "react-hot-toast";
import facebook from "../../../../assets/icons/facebook.svg";
import linkedin from "../../../../assets/icons/linkedin.svg";
import twitter from "../../../../assets/icons/twitter.svg";
import { isJsonParsable } from "../../../../utils/utils";

import MetaHelmet from "../../../MetaHelmet";
import Navbar from "../../HomeLanding/Header/Navbar";
import OstelloSubscribe from "../../HomeLanding/OstelloSubscribe";
import { ACCESS_TOKEN, host } from "../../../../utils/constant";
import axios from "axios";
import {
  AiFillDislike,
  AiFillEye,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";
import ReactPlayer from "react-player";
import useScreenWidth from "../../../hooks/useScreenWidth";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setAuthModalState,
} from "../../../../redux/slices/authSlice";
import AuthModal from "../../HomeLanding/Header/Navbar/AuthModal";
import { HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons";
import { FaComment, FaRegComment, FaShareAlt } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import SharePopup from "../../../UI/SharePopup";
import { MdVerified } from "react-icons/md";
import { selectUserAnalytics } from "../../../../redux/slices/UserAnalytics";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { Box, TextField } from "@mui/material";
import VideoPlayerSignIn from "../../../VideoPlayerSignIn";
import VideoPlayerOtp from "../../../VideoPlayerOtp";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";

// Tag Components ==>>
const Section = ({ children, className }) => (
  <section className={` space-y-2 mt-10 md:max-w-3xl md:mx-auto ${className}`}>
    {children}
  </section>
);
const Title = ({ children, className }) => (
  <h1
    className={`font-bold text-2xl mt-10
    ${className}`}
  >
    {children}
  </h1>
);
const Paragraph = ({ children, className }) => (
  <p className={`text-gray py-2 md:text-lg mt-2 ${className}`}>{children}</p>
);
const Image = ({ src, className }) => (
  <div className="w-full">
    <img className={`w-fit mx-auto ${className}`} src={src} alt="" />
  </div>
);

const Divider = ({ className }) => (
  <span
    className={`border-2 border-l-0 border-r-0 border-b-0 block w-full max-w-3xl mx-auto border-gray/10 ${className}`}
  />
);

const Quote = ({ caption, text }) => {
  return (
    <section className="border py-2 border-primary  border-l-2 border-r-0 border-t-0 border-b-0 pl-5 mt-10">
      <p className=" font-bold italic max-w-lg md:text-lg">" {text} "</p>
      <p className="mt-5 text-gray"> - {caption}</p>
    </section>
  );
};

const Tag = ({ type, children, className }) => {
  let red = ` text-[#FF0000]-600 bg-red-100 `;
  let green = ` text-green-600 bg-green-100 `;
  let blue = ` text-blue-600 bg-blue-100 `;

  return (
    <span
      className={` rounded-xl px-2 py-1 ${
        type == "red"
          ? red
          : type == "green"
          ? green
          : type == "blue"
          ? blue
          : null
      } ${className}`}
    >
      {children}
    </span>
  );
};

const LinkButton = ({ children, className, url, onClick, ...rest }) => {
  const router = useRouter();
  const handleClick = () => {
    if (url?.length) {
      router.push(url);
    }
  };

  return (
    <button
      onClick={() => {
        handleClick();
      }}
      className={`  border-2 border-gray/30 rounded-md  active:opacity-80 duration-300 transition-all p-2 h-8 flex items-center justify-center w-fit  ${className}`}
    >
      {children}
    </button>
  );
};

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};

export default function PostPage({
  id,
  category,
  title,
  images,
  videos,
  alt,
  description,
  authorSrc,
  authorAlt,
  authorName,
  postDate,
  read,
  metaDesc,
  slugUrl,
  isPreview,
  views,
  likedstudents,
  institute,
  onBack = () => {},
}) {
  const [state, copyToClipboard] = useCopyToClipboard();
  // const content =
  //   (isJsonParsable(description) && JSON.parse(description)) || null;

  const PostDate = () => {
    let formatted;

    let parts = Date(postDate).split(" ");
    formatted = parts[2] + "-" + parts[1] + "-" + parts[3];
    return formatted;
  };

  const parseTag = (block) => {
    const { type, data, id } = block;
    const renderTextOrHTML = () => {
      const sanitizedText = data?.text?.replaceAll("&nbsp;", " ");
      if (data?.text?.indexOf("<") !== -1) {
        return (
          <div key={id} dangerouslySetInnerHTML={{ __html: sanitizedText }} />
        );
      } else {
        return sanitizedText;
      }
    };
    if (type === "paragraph") {
      return <Paragraph key={id}>{renderTextOrHTML(data?.text)}</Paragraph>;
    } else if (type === "header") {
      return <Title key={id}>{renderTextOrHTML(data?.text)}</Title>;
    } else if (type === "quote") {
      return (
        <Quote
          key={id}
          text={renderTextOrHTML(data?.text)}
          caption={renderTextOrHTML(data?.caption)}
        />
      );
    } else if (type === "list") {
      const listType = data?.style === "ordered" ? "ol" : "ul";
      const childrens = data?.items?.reduce(
        (acc, item) => acc + `<li>${item}</li>`,
        ""
      );
      return (
        <div className="pl-6">
          {renderTextOrHTML(`<${listType} >${childrens}</${listType}>`)}
        </div>
      );
    } else if (type === "image") {
      return (
        <div className="" key={id}>
          <Image src={data?.file?.url} alt="" />
          <Paragraph>{data?.caption}</Paragraph>
        </div>
      );
    }
  };

  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const inputRef = useRef(null);
  const [refetch, setRefetch] = useState(false);

  const getComment = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${host}/blog/comment?blogId=${id}&limit=50`,
        config
      );
      setComments(data.message);
      setCommentCount(data.count);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRefetch(false);
    }
  };

  useEffect(() => {
    if (id) {
      getComment();
    }
  }, [id, refetch]);

  // useEffect(() => {
  //   const patchViews = async () => {
  //     const body = {
  //       id: id,
  //     };
  //     try {
  //       const response = await axios.patch(`${host}/blog/views`, body, {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       });
  //       
  //     } catch (err) {
  //       
  //     }
  //   };
  //   patchViews();
  // }, []);

  const { userData, isAuthenticated, authModalState } =
    useSelector(authSelector);
  const [userLiked, setUserLiked] = useState([]);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [type, setType] = useState("number");

  const handleOpen = () => {
    setOpen(true);
    setType("singup");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.usertype === 3) {
      if (userData?.id) {
        const run = async () => {
          try {
            const { data } = await axios.get(
              `${host}/blog?studentid=${userData?.id}`
            );
            setUserLiked(data?.message);
            setRefetch(false);
          } catch (err) {
            toast.error(err.message);
          }
        };
        run();
      }
    }
  }, [userData?.id, userData?.usertype, refetch]);

  const handleLike = async (id) => {
    if (!isAuthenticated) {
      setOpen(true);
      dispatch(setAuthModalState(2));
      return;
    }

    if (userLiked?.find((a) => a.id === id)) {
      toast.success("Already Liked");
      return;
    }

    const body = {
      id: id,
    };
    try {
      const response = await axios.patch(`${host}/blog/likes`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      toast.success("Successfully Liked");
      setRefetch(true);
    } catch (err) {
      toast.error(err.message);
      setRefetch(true);
    }
  };

  const { screenWidth } = useScreenWidth();

  const { visitCourseOffered, userLocation } = useSelector(selectUserAnalytics);

  const [disable, setDisable] = useState(false);

  const handleSubscribed = async () => {
    if (!isAuthenticated) {
      setOpen(true);
      dispatch(setAuthModalState(2));
      return;
    }

    if (
      userSubscribedData?.filter(
        (item) => item?.institute?.id === institute?.id
      ).length
    ) {
      toast.success("Already Subscribed");
      return;
    }

    setDisable(true);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const updatedData = {
      instituteId: institute?.id,
    };

    try {
      await axios.patch(`${host}/institute/subscribe`, updatedData, config);
      toast.success("Successfully Subscirbed");
      setRefetch(true);

      let t0 = moment().format();
      var t1 = moment().format();

      const timeSpent = moment(t1).diff(t0, "seconds");

      let data = {
        activity_type: "subscribe_institute",
        payload: {
          instituteid: id,
          total_time_in_seconds: timeSpent,
        },
      };
      if (isAuthenticated) {
        data.payload.userid = userData?.id;
      }
      if (userLocation?.latitude !== "") {
        data.location = {
          longitude: userLocation?.longitude?.toString(),
          latitude: userLocation?.latitude?.toString(),
        };
      } else {
        data.location = null;
      }

      try {
        const response = await axios.post(`${host}/analytics`, data, config);
      } catch (err) {
        toast.error(err.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(getUser());
      setRefetch(true);
      setDisable(false);
    }
  };

  // useEffect(() => {
  //   const run = async () => {
  //     if (userData?.id) {
  //       try {
  //         const res = await axios.get(
  //           `${host}/institute/subscriptions?studentid=${userData?.id}`
  //         );
  //         setUserSubscribedData(res?.data?.message);
  //         setRefetch(false);
  //       } catch (err) {
  //         toast.error(err.message);
  //       }
  //     }
  //   };
  //   run();
  // }, [userData?.id, refetch]);

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

  const [subscribers, setSubscribers] = useState([]);
  const [hoverLiked, setHoverLiked] = useState(false);
  const [hoverComment, setHoverComment] = useState(false);
  const [hoverShare, setHoverShare] = useState(false);
  const [hoverSubscribed, setHoverSubscribed] = useState(false);
  const [userSubscribedData, setUserSubscribedData] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (institute?.id) {
        try {
          const res = await axios.get(
            `${host}/institute/subscriptions?instituteid=${institute?.id}&limit=50`
          );
          setSubscribers(res?.data?.count);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [institute?.id, refetch]);

  const checkSubscriber = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };

      const res = await axios.get(
        `${host}/institute/subscriptions?instituteid=${institute?.id}&studentid=${userData?.id}`,
        config
      );
      setUserSubscribedData(res?.data?.message);
    } catch (err) {
      toast.error(err.message);
      // return an empty array in case of an error
    }
  };

  useEffect(() => {
    if (institute?.id && userData?.id) {
      checkSubscriber();
    }
  }, [institute?.id, userData?.id]);

  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!isAuthenticated) {
      setOpen(true);
      dispatch(setAuthModalState(2));

      return;
    }
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };

      const body = {
        id: id,
        text: comment,
      };

      const res = await axios.patch(`${host}/blog/comment`, body, config);
      toast.success("Comment Added");
      setRefetch(true);
      getComment();
      setComment("");
    } catch (err) {
      toast.error(err.message);
      getComment();
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [pauseHandle, setPauseHandle] = useState(true);

  useEffect(() => {
    if (videos?.length) {
      if (videos[0]?.video?.key) {
        setPlaying(false);
      } else {
        setPlaying(true);
      }
    }
  }, [videos?.length]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPlaying(true);
  };

  const [authOpen, setAuthOpen] = useState(false);
  const handleAuthClose = () => {
    setAuthOpen(false);
  };
  const handleAuthOpen = () => {
    setAuthOpen(true);
  };

  const [mobilenumber, setmobilenumber] = useState("");
  const handleMobileNumber = (val) => {
    setmobilenumber(val);
  };

  useEffect(() => {
    if (authModalState === 2 || authModalState === 0) {
      setType("number");
    }
    if (authModalState === 3) {
      setType("otp");
    }
    if (authModalState === 7) {
      handleOpen();
    }
  }, [authModalState]);

  const [isFocused, setIsFocused] = useState(null);

  const handleFileChange = (e) => {
    setIsFocused(e.target.value);
  };

  const [isToastDisplayed, setIsToastDisplayed] = useState(false);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
    if (progress.playedSeconds >= 30 && !isLoggedIn) {
      setPlaying(false);
      setPauseHandle(false);

      if (!isToastDisplayed) {
        toast.error("Please login our site to watch full video");
        handleAuthOpen();
        setIsToastDisplayed(true);
      }
      return;
    }
  };

  useEffect(() => {
    if (playedSeconds >= 30 && !isLoggedIn) {
      setPlaying(false);
      setPauseHandle(false);
    }
  }, [playedSeconds]);

  const handleSeek = (seconds) => {
    if (!isLoggedIn) {
      setPlaying(false);
      setPlayedSeconds(0);
    }
  };

  const playerStyle = {
    pointerEvents: pauseHandle ? "auto" : "none",
  };

  const [commentId, setCommentId] = useState();

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    setCommentId(null);
    e.stopPropagation();
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };

      const { data } = await axios.delete(
        `${host}/blog/comment?id=${id}`,
        config
      );
      // 

      toast.success("successfully Removed");
      setRefetch(true);
      getComment();
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setRefetch(true);
      getComment();
    }
  };

  function getDurationFromDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (diff < minute) {
      return "just now";
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diff < month) {
      const days = Math.floor(diff / day);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diff < year) {
      const months = Math.floor(diff / month);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diff / year);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  }

  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      // width: "50%",
      // overflowY: "scroll!important",
      // height: "80%",
      // [theme.breakpoints.down("sm")]: {
      //   width: "80%",
      //   height: "60%",
      //   overflowY: "scroll!important",
      // },
    },
  });

  const { modalBox } = useStyle();

  return (
    <>
      {!isPreview && (
        <>
          <MetaHelmet title={title} description={metaDesc} link={slugUrl} />
          <div className="md:mb-[100px]">
            <div className="fixed top-0 z-50 bg-white  md:max-w-[1350px] w-full mx-auto  shadow">
              <Navbar />
            </div>
          </div>
        </>
      )}
      <main
        onMouseOver={(e) => {
          setHoverLiked(false);
          setHoverSubscribed(false);
          setHoverComment(false);
          setHoverShare(false);
          e.stopPropagation();
        }}
        className="my-20 px-6 max-w-5xl mx-auto"
      >
        <div className="md:flex justify-between items-center">
          <p className={"md:text-[35px] text-[25px] font-[600] text-center "}>
            {title}
          </p>

          <div className="flex  items-center rounded-2xl bg-light-gray p-2 cursor-pointer views">
            <AiFillEye className="text-2xl views-hover:text-primary" />
            <span className="md:text-[15px] text-[13px]  text-[#434343] ml-1">
              {parseInt(views) > 1000 ? `${parseInt(views) / 1000} k` : views}{" "}
              views {postDate}
            </span>
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <div
            onClick={(e) => {
              handleSubscribed();
              e.stopPropagation();
            }}
            className="flex  items-center"
          >
            <div
              className={reviewClassHandler(institute?.rating)}
           
            >
              <p className="mr-1">{institute?.rating}</p>
              <StarFilled />
            </div>

            <div className="bg-light-gray md:py-2 py-1 px-1 rounded-tr-md rounded-br-md">
              <p className="text-[14px] text-[#5C5C5C] font-[500]">
                {subscribers} subscribers
              </p>
            </div>
          </div>
          <div
            onClick={(e) => {
              handleSubscribed();
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
            className={`rounded-2xl px-2 py-2 bg-light-gray text-xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
          >
            {userSubscribedData?.filter(
              (item) => item?.institute?.id === institute?.id
            ).length || hoverSubscribed ? (
              <HeartFilled className="text-primary flex items-center " />
            ) : (
              <HeartOutlined className="flex items-center" />
            )}

            <p className="text-sm ml-2">
              {userSubscribedData?.filter(
                (item) => item?.institute?.id === institute?.id
              ).length
                ? "Subscribed"
                : "Subscribe"}
            </p>
          </div>
          
        </div> */}

        <AuthModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
        />

        {/* Cover */}
        <section className=" space-y-4 my-10">
          {videos?.length ? (
            <>
              <div
                className=""
                style={{
                  position: "relative",
                  paddingTop: "56.25%",
                  borderRadius: "5px",
                }}
              >
                <ReactPlayer
                  controls={pauseHandle}
                  width="100%"
                  className="rounded-3xl mx-auto absolute md:top-0 top-[30px] left-0 overflow-hidden"
                  height={screenWidth > 768 ? "500px" : "100%"}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: playing ? 1 : 0,
                        controls: playing ? 1 : 0,
                        disablekb: playing ? 1 : 0,
                        // frameborder: 0,
                      },
                    },
                    attributes: {
                      poster: videos[0]?.thumbnail
                        ? `https://cdn.ostello.co.in/${videos[0]?.thumbnail?.key}`
                        : "",
                    },
                  }}
                  url={
                    videos[0]?.video?.key
                      ? `https://cdn.ostello.co.in/${videos[0]?.video?.key}`
                      : videos[0]?.video?.url
                  }
                  light={
                    videos[0]?.video?.key
                      ? ""
                      : videos[0]?.thumbnail
                      ? `https://cdn.ostello.co.in/${videos[0]?.thumbnail?.key}`
                      : ""
                  }
                  onProgress={handleProgress}
                  style={playerStyle}
                  onPlay={() => setPlaying(true)}
                  onSeek={handleSeek}
                  playing={playing}
                />

                {type !== "signup" ? (
                  <>
                    {authOpen ? (
                      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:max-h-[280px] max-h-[180px] overflow-y-scroll">
                        <Box sx={style} className={`${modalBox}  `}>
                          {type === "number" ? (
                            <VideoPlayerSignIn
                              handleClose={handleAuthClose}
                              handleNumber={handleMobileNumber}
                            />
                          ) : type === "otp" ? (
                            <VideoPlayerOtp
                              handleClose={handleAuthClose}
                              mobilenumber={mobilenumber}
                            />
                          ) : (
                            ""
                          )}
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* <Divider /> */}
            </>
          ) : (
            ""
          )}

          {/* <Image
            src={
              images?.url
                ? `https://cdn.ostello.co.in/${images?.key}`
                : images?.length
                ? `https://cdn.ostello.co.in/${images[0]?.key}`
                : images
            }
            className="w-full h-full rounded-3xl "
            alt={authorAlt}
          /> */}

          {/* <Divider /> */}
        </section>

        <div className="md:flex space-y-2 justify-between items-center">
          <div className="flex space-x-3 items-center">
            <div className="flex space-x-2 items-center">
              <img
                src={`https://cdn.ostello.co.in/${
                  institute?.instituteImage?.length
                    ? institute?.instituteImage[0]?.key
                    : institute?.images[0]?.key
                }`}
                alt=""
                className="rounded-full h-[50px] w-[50px]"
              />

              <div>
                <p className="text-[16px] text-[#5C5C5C] font-[700] flex items-center ">
                  {institute?.name}{" "}
                  {subscribers >= "100" ? <MdVerified className="ml-2" /> : ""}
                </p>
                <p className="text-[12px] text-[#5C5C5C] font-[500]">
                  {subscribers} subscribers
                </p>
              </div>
            </div>

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
              className={`rounded-2xl px-2 py-2 bg-light-gray text-xl shadow-xl text-gray flex items-center justify-center ${
                disable ? "cursor-not-allowed" : "cursor-pointer"
              }  p-1 `}
            >
              {userSubscribedData?.filter(
                (item) => item?.institute?.id === institute?.id
              ).length || hoverSubscribed ? (
                <HeartFilled className="text-primary flex items-center " />
              ) : (
                <HeartOutlined className="flex items-center" />
              )}

              <p className="text-sm ml-2">
                {userSubscribedData?.filter(
                  (item) => item?.institute?.id === institute?.id
                ).length
                  ? "Subscribed"
                  : "Subscribe"}
              </p>
            </div>
          </div>

          <div className="flex space-x-2 items-center">
            <div
              onClick={(e) => {
                // router.push(`/blogs/${data?.slugurl}`);
                handleLike(id);
                e.stopPropagation();
              }}
              onMouseOver={(e) => {
                setHoverLiked(true);
                e.stopPropagation();
              }}
              onMouseOut={(e) => {
                setHoverLiked(false);
                e.stopPropagation();
              }}
              className="flex items-center rounded-2xl bg-light-gray p-2 cursor-pointer"
            >
              {/* <IoRocket className="text-primary text-xl" /> */}
              {userLiked?.filter((a) => a.id === id).length || hoverLiked ? (
                <AiFillLike className="cursor-pointer text-primary text-2xl" />
              ) : (
                <AiOutlineLike className="cursor-pointer  text-2xl" />
              )}

              <p className="md:text-[15px] text-[13px] text-[#434343] ml-2">
                {likedstudents?.length} Likes
              </p>
            </div>

            <div
              onClick={(e) => {
                // router.push(`/blogs/${data?.slugurl}`);
                inputRef.current.focus();
                e.stopPropagation();
              }}
              onMouseOver={(e) => {
                setHoverComment(true);
                e.stopPropagation();
              }}
              onMouseOut={(e) => {
                setHoverComment(false);
                e.stopPropagation();
              }}
              className="flex items-center rounded-2xl bg-light-gray p-2 cursor-pointer"
            >
              {/* <IoRocket className="text-primary text-xl" /> */}
              {hoverComment ? (
                <FaComment className="cursor-pointer text-primary text-2xl" />
              ) : (
                <FaRegComment className="cursor-pointer text-2xl" />
              )}

              <p className="md:text-[15px] text-[13px] text-[#434343] ml-2">
                {commentCount} Comment
              </p>
            </div>

            <div
              onClick={(e) => {
                // router.push(`/blogs/${data?.slugurl}`);
                setShareOpen(true);
                e.stopPropagation();
              }}
              onMouseOver={(e) => {
                setHoverShare(true);
                e.stopPropagation();
              }}
              onMouseOut={(e) => {
                setHoverShare(false);
                e.stopPropagation();
              }}
              className="flex items-center rounded-2xl bg-light-gray p-2 cursor-pointer"
            >
              {/* <IoRocket className="text-primary text-xl" /> */}
              {hoverShare ? (
                <FaShareAlt className="cursor-pointer text-primary text-2xl" />
              ) : (
                <FiShare2 className="cursor-pointer text-2xl" />
              )}

              <p className="md:text-[15px] text-[13px] text-[#434343] ml-2">
                Share
              </p>
            </div>
          </div>

          {/* <div>
            <div className="flex w-[125px] items-center rounded-2xl bg-light-gray p-2 cursor-pointer views">
              <AiFillEye className="text-2xl views-hover:text-primary" />
              <span className="md:text-[15px] text-[13px]  text-[#434343] ml-2">
                {parseInt(views) > 1000 ? `${parseInt(views) / 1000} k` : views}{" "}
                views
              </span>
            </div>
          </div> */}
        </div>

        {/* <Section className="flex justify-center items-center flex-col -mt-6 ">
          <p className=" text-primary text-center  font-bold ">
            Published on {postDate}
          </p>
          <p className=" text-primary text-center  font-bold  md:block text-lg">
            {category?.charAt(0).toUpperCase() +
              category?.slice(1).toLowerCase()}
          </p>

      
          <Paragraph className="text-center max-w-xl">{metaDesc}</Paragraph>
     

         
          <div className="flex items-center justify-center space-x-2 pt-2  whitespace-nowrap">
            <Image src={authorSrc.src} className="w-full " alt={authorAlt} />
            <div>
              <h6 className="text-black font-bold whitespace-nowrap">
                {authorName}
              </h6>
              <p className="block text-gray text-xs">{postDate}</p>
            </div>
          </div>
        </Section> */}

        {/*  */}

        <div
          className="my-5"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* This is comment Part */}

        <div className="mb-8">
          <div className="flex items-center">
            <>
              {userData?.avatar?.key ? (
                <img
                  className="mr-3 h-[50px] w-[50px] rounded-full"
                  src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                  alt=""
                />
              ) : (
                <div className="bg-primary mr-3  h-[50px] w-[50px] rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
            </>

            <TextField
              onChange={(e) => {
                setComment(e.target.value);
                handleFileChange(e);
              }}
              value={comment}
              onFocus={(e) => setIsFocused("a")}
              ref={inputRef}
              variant="standard"
              sx={{
                width: "100%",
              }}
              placeholder="Add comment"
            ></TextField>
            {/* <textarea
              id="comment"
              name="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              ref={inputRef}
              rows="4"
              className="shadow-sm focus:ring-light-gray p-3 focus:border-light-gray block w-full sm:text-sm border-light-gray border-2 rounded-md"
            ></textarea> */}
          </div>

          {isFocused && (
            <div className="text-right block">
              <button
                onClick={() => {
                  setIsFocused(null);
                }}
                className=" items-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-black  hover:bg-primary hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleComment();
                }}
                disabled={true}
                className=" items-center ml-2 px-2 py-2 border border-transparent text-base font-medium rounded-md text-balck bg-[#F2E9FC] hover:bg-primary hover:text-white"
              >
                Comment
              </button>
            </div>
          )}
        </div>

        {comments.length ? (
          <>
            {/* <Divider className={" my-5"} /> */}

            {comments.map((comment, key) => {
              return (
                <div key={key} className="flex my-2">
                  {comment?.commentor?.avatar?.key ? (
                    <img
                      className="mr-3 h-10 w-10 rounded-full"
                      src={`https://cdn.ostello.co.in/${comment?.commentor?.avatar?.key}`}
                      alt=""
                    />
                  ) : (
                    <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                      {comment?.commentor?.name?.slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="border-light-gray border-[1px] md:p-3 p-2 rounded-md w-full">
                    <div className="flex justify-between">
                      <p className="md:font-[600] font-[400] md:text-[15px] text-[12px]">
                        {comment?.commentor?.name}{" "}
                        <span className="md:text-[12px] text-[11px]">
                          {getDurationFromDate(comment?.created_at)}
                        </span>
                      </p>
                      <div className="relative">
                        <BsThreeDots
                          onClick={(e) => {
                            if (commentId) {
                              setCommentId(null);
                            } else {
                              setCommentId(comment?.id);
                            }
                            e.stopPropagation();
                          }}
                          className="text-[20px] rotate-90 cursor-pointer   "
                        />

                        {commentId === comment.id ? (
                          <>
                            {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                            <div className="absolute right-0 z-10  w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div
                                className="py-1 divide-y divide-gray/20"
                                role="none"
                              >
                                {comment?.commentor?.id === userData?.id ||
                                userData?.usertype === 1 ? (
                                  <div
                                    className={`flex  text-[#000000]
    justify-between cursor-pointer  items-center`}
                                    onClick={(e) => {
                                      handleDelete(comment.id);
                                      e.stopPropagation();
                                    }}
                                  >
                                    <p className={`  text-[16px]  px-4 py-1 `}>
                                      Delete
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div
                                  className={`flex  text-[#000000]
    justify-between cursor-pointer  items-center`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <p className={`  text-[16px]  px-4 py-1 `}>
                                    Edit
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <p className="mb-1">{comment.text}</p>
                    <div className="flex items-center space-x-2">
                      <AiFillLike className="text-[16px]" />
                      <AiFillDislike className="text-[16px]" />
                    </div>
                  </div>
                </div>
              );
            })}

            <Divider className={" my-5"} />
          </>
        ) : (
          ""
        )}

        {/* {content?.blocks?.map((block) => parseTag(block))} */}

        {/* <Section>
          <Divider className={" my-5"} />
        </Section> */}
        {/* <Section className={"md:flex justify-between space-y-5 md:space-y-0"}>
          <div className=" space-x-2">
            <Tag type={"blue"}>Product</Tag>
            <Tag type={"red"}>Tools</Tag>
            <Tag type={"red"}>SaaS</Tag>
          </div>

          <div className="flex items-center space-x-2">
            <div
              onClick={(e) => {
                handleSubscribed();
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
              className={`rounded-full text-xl shadow-xl text-gray flex items-center justify-center cursor-pointer p-1 `}
            >
              {userSubscribedData?.filter(
                (item) => item?.institute?.id === institute?.id
              ).length || hoverSubscribed ? (
                <HeartFilled className="text-primary flex items-center " />
              ) : (
                <HeartOutlined className="flex items-center" />
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex  items-center space-x-2 px-2 text-[16px] text-[#7F56D9]">
              <AiFillEye />
              <span>
                {parseInt(views) > 1000 ? `${parseInt(views) / 1000} k` : views}{" "}
                views
              </span>
            </div>
            <LinkButton
              onClick={() => {
                copyToClipboard(location.href);
                toast.success("Link coppied !");
              }}
            >
              <div className="flex items-center  space-x-2 px-2">
                <img src={copyIcon.src} className="w-5 h-5" alt="" />
                <p className="text-gray">Copy link</p>
              </div>
            </LinkButton>
            <LinkButton>
              <img src={twitter.src} className="w-5 h-5" alt="" />
            </LinkButton>
            <LinkButton>
              <img src={facebook.src} className="w-5 h-5" alt="" />
            </LinkButton>
            <LinkButton>
              <img src={linkedin.src} className="w-5 h-5" alt="" />
            </LinkButton>
          </div>

         
        </Section> */}

        <SharePopup
          TextToCopy={typeof window !== "undefined" && window.location.href}
          open={shareOpen}
          onClose={() => setShareOpen(false)}
        />
      </main>
      {/* <OstelloSubscribe /> */}
    </>
  );
}
