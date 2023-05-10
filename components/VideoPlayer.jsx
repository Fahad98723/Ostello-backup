import { PlayCircleFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import useElementOnScreen from "./hooks/visibleHook";
import moment from "moment";
import {
  postUserAnalytics,
  selectUserAnalytics,
  setWatchingVideos,
} from "../redux/slices/UserAnalytics";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import VideoPlayerSignIn from "./VideoPlayerSignIn";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Box, useTheme } from "@mui/system";
import VideoPlayerOtp from "./VideoPlayerOtp";
import AuthModal from "./pages/HomeLanding/Header/Navbar/AuthModal";
import { removeRegisterData, selectSignUp } from "../redux/slices/signUpSlice";
import { addRegisterData } from "../redux/slices/signUpSlice";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 1,
  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};

export default function VideoPlayer({
  thumbnailURL,
  playing = true,
  videoURL,
  className,
  loop,
  item,
  id,
  ip,
  name,
  playIcon = (
    <PlayCircleFilled
      className="
                            text-black/90
                            md:text-6xl text-4xl cursor-pointer active:opacity-75 hover:scale-110 duration-300"
    />
  ),
}) {
  const theme = useTheme();

  const videoRef = useRef(null);
  const [played, setPlayed] = useState(false);
  const { watchingVideos, userLocation } = useSelector(selectUserAnalytics);
  const { userData, isAuthenticated, authModalState } =
    useSelector(authSelector);
  const dispatch = useDispatch();
  const isVisible = useElementOnScreen(options, videoRef);
  const [clickedVideo, setClickedVideo] = useState(false);

  const onVideoClick = () => {
    setClickedVideo(!clickedVideo);
    if (played) {
      videoRef.current.pause();
      setPlayed(!played);
    } else {
      videoRef.current.play();
      setPlayed(!played);
    }
  };
  useEffect(() => {
    if (isVisible) {
      let currentTime = moment().format();
      let previousTime = moment(watchingVideos?.timeStamps);
      let diff = moment(currentTime).diff(previousTime, "seconds");
      const data = {
        activity_type: "watch_videos",
        payload: {
          instituteid: id,
          ipaddress: ip,
          video: {
            ...item,
          },
          institute_name: name,
        },
      };
      if (isAuthenticated && !ip) {
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

      if (watchingVideos?.videoUrl === videoURL && diff > 10) {
        dispatch(
          setWatchingVideos({ videoUrl: videoURL, timeStamps: currentTime })
        );
        dispatch(postUserAnalytics(data));
      } else {
        dispatch(postUserAnalytics(data));
        dispatch(
          setWatchingVideos({ videoUrl: videoURL, timeStamps: currentTime })
        );
      }
      if (!played && clickedVideo) {
        videoRef.current.play();
        setPlayed(true);
      }
    } else {
      if (played) {
        videoRef.current.pause();
        setPlayed(false);
      }
    }
  }, [isVisible, played]);

  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [playings, setPlayings] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [pauseHandle, setPauseHandle] = useState(true);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [authOpen, setAuthOpen] = useState(false);
  const handleAuthClose = () => {
    setAuthOpen(false);
  };
  const handleAuthOpen = () => {
    setAuthOpen(true);
  };

  const handleProgress = (event) => {
    const currentTime = event.target.currentTime;
    if (currentTime >= 30 && !isLoggedIn) {
      setPlayings(false);
      setPauseHandle(false);
      toast.error("Please login our site to watch full video");
      handleOpen();
    }
    setPlayedSeconds(currentTime);
  };

  useEffect(() => {
    if (playedSeconds >= 30 && !isLoggedIn) {
      setPlayings(false);
      setPauseHandle(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [playedSeconds]);

  const handleSeek = (seconds) => {
    if (!isLoggedIn) {
      setPlayings(false);
      setPlayedSeconds(0);
    }
  };

  const playerStyle = {
    pointerEvents: pauseHandle ? "auto" : "none",
  };

  const [mobilenumber, setmobilenumber] = useState("");
  const handleMobileNumber = (val) => {
    setmobilenumber(val);
  };

  const [type, setType] = useState("number");

  useEffect(() => {
    if (authModalState === 2 || authModalState === 0) {
      setType("number");
      setPlayings(false);
    }
    if (authModalState === 3) {
      setType("otp");
      setPlayings(false);
    }
    if (authModalState === 7) {
      setType("signup");
      setPlayings(false);
      handleAuthOpen();
    }
  }, [authModalState]);

  const { registerData } = useSelector(selectSignUp);

  return (
    <div>
      <AuthModal
        handleClose={handleAuthClose}
        handleOpen={handleAuthOpen}
        open={authOpen}
      />
      <div className={`aspect-video ${className} relative`}>
        <video
          onContextMenu={(e) => e.preventDefault()}
          controlsList="nodownload"
          poster={thumbnailURL}
          onClick={onVideoClick}
          style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}
          playsInline
          loop
          muted
          preload="true"
          controls
          alt="Ostello"
          src={videoURL}
          ref={videoRef}
          type="video/mp4"
          onSeeked={handleSeek}
          onTimeUpdate={handleProgress}
        />

        {/* sign in popup will come here */}

        {/* <div className=" bg-white rounded-[10px] md:max-md:w-[370px] w-[300px] absolute left-0 top-0"> */}

        {type !== "signup" ? (
          <>
            {open && videoRef.current.src === videoURL ? (
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:max-h-[250px] max-h-[160px] overflow-y-scroll">
                <Box sx={style} className={`  `}>
                  {type === "number" ? (
                    <VideoPlayerSignIn
                      handleClose={handleClose}
                      handleNumber={handleMobileNumber}
                    />
                  ) : type === "otp" && !registerData?.name?.length ? (
                    <VideoPlayerOtp
                      handleClose={handleClose}
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

        {/* </div> */}
      </div>
    </div>
  );
}
