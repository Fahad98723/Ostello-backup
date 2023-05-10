import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import { host } from "../../../utils/constant";
import useScreenWidth from "../../hooks/useScreenWidth";
import hash from "../../../assets/post/hashtag.png";
import { toast } from "react-hot-toast";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";

const PostCard = ({ data, index, setRefetch, refetch }) => {
  const { userData, isAuthenticated } = useSelector(authSelector);

  

  const [userLiked, setUserLiked] = useState([]);

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

  
  const videoRef = useRef(null);
  const { screenWidth } = useScreenWidth();
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleViews = async (id) => {
    const body = {
      id: id,
    };

    try {
      const response = await axios.patch(`${host}/blog/views`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      
    } catch (err) {
      
    }
  };
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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

  const [hoverLiked, setHoverLiked] = useState(false);

  return (
    <div
      key={index}
      className="p-5 bg-white w-[370px] rounded-[20px] shadow-md my-3 cursor-pointer"
      onClick={(e) => {
        router.push(`/posts/${data?.slugurl}`);
        e.stopPropagation();
        handleViews(data?.id);
      }}
      onMouseOver={(e) => {
        setHoverLiked(false);
        e.stopPropagation();
      }}
    >
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      {data?.videos?.length > 0 ? (
        <div className="sm:mb-5 mb-4 ">
          {/* <video
                      className="h-full"
                      controlsList="nodownload"
                      poster={""}
                      style={{ width: "100%" }}
                      muted
                      controls
                      ref={videoRef}
                      src={data?.videos[0]?.key ? `https://cdn.ostello.co.in/${
                        data?.videos[0]?.key}` : data?.videos[0]?.url
                      }
                    /> */}
          <ReactPlayer
            width="100%"
            height={"220px"}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  controls: 1,
                  // frameborder: 0,
                },
              },
              attributes: {
                poster: data?.videos[0]?.thumbnail
                  ? `https://cdn.ostello.co.in/${data?.videos[0]?.thumbnail?.key}`
                  : "",
              },
            }}
            url={
              data?.videos[0]?.video?.key
                ? `https://cdn.ostello.co.in/${data?.videos[0]?.video?.key}`
                : data?.videos[0]?.video?.url
            }
            light={
              data?.videos[0]?.video?.key
                ? ""
                : data?.videos[0]?.thumbnail
                ? `https://cdn.ostello.co.in/${data?.videos[0]?.thumbnail?.key}`
                : ""
            }
            playing={data?.videos[0]?.video?.key ? false : true}
            // controls={true}
          />
        </div>
      ) : (
        <div className="sm:mb-5 mb-4 ">
          <img
            className="rounded-[20px] h-[220px]"
            src={`https://cdn.ostello.co.in/${data?.images[0]?.key}`}
            alt=""
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="icons bg-primary rounded-[50%] p-3 ">
          <RiUserSettingsLine className="text-white text-xl" />
        </div>

        <div className=" ">
          <p className="md:text-[18px] text-[16px] font-[600]">
            {data.title.slice(0, 25)}
          </p>
          <div className="flex justify-between">
            <p className="md:text-[12px] text-[11px] text-[#767676] font-[400]">
              Best questions for JEE 2024...{" "}
            </p>
            <p className="md:text-[12px] text-[11px] text-[#767676] font-[500]">
              {parseInt(data?.views) > 1000
                ? `${parseInt(data?.views) / 1000} k`
                : data?.views}{" "}
              views
            </p>
          </div>
        </div>

        <div className="mr-0">
          <BsThreeDotsVertical className="md:text-[25px] text-[20px] mr-0 text-right" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          {/* <IoRocket className="text-primary text-xl" /> */}
          {userLiked?.filter((a) => a.id === data.id).length || hoverLiked ? (
            <AiFillLike
              onClick={(e) => {
                // router.push(`/blogs/${data?.slugurl}`);
                handleLike(data?.id);
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
              className="cursor-pointer text-primary text-xl"
            />
          ) : (
            <AiOutlineLike
              onClick={(e) => {
                // router.push(`/blogs/${data?.slugurl}`);
                handleLike(data?.id);
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
              className="cursor-pointer  text-xl"
            />
          )}

          <p className="text-[12px] text-[#434343] ml-2">
            {data?.likedstudents?.length} Likes
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center p-2 mr-2 rounded-[30px] border border-primary">
            <img className="w-[18px] h-[18px] mr-1" src={hash.src} />
            <p className="text-[12px] text-primary font-[600]">Trending</p>
          </div>
          <div className="flex items-center p-2 rounded-[30px] border border-primary">
            <img className="w-[18px] h-[18px] mr-1" src={hash.src} />
            <p className="text-[12px] text-primary font-[600]">Popular</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
