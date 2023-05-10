import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import useScreenWidth from "../../../components/hooks/useScreenWidth";
import { isEmpty } from "../../../utils/utils";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../../redux/slices/authSlice";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";

import { useRouter } from "next/router";
import {
  postUserAnalytics,
  selectUserAnalytics,
  setResearchFaculty,
} from "../../../redux/slices/UserAnalytics";
import moment from "moment";
import useElementOnScreen from "../../hooks/visibleHook";
import VideoPlayer from "../../VideoPlayer";
const data = [];
const Faculty = ({ currentInstitute, instituteFaculty }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  let data = [];

  instituteFaculty.forEach((element) => {
    if (element?.position === "Founder") {
      data.push({...element, positionNumber : 3 });
    }
    if (element?.position === "Co-Founder") {
      data.push({...element, positionNumber : 2 });
    }
    if (element?.position === "Teacher") {
      data.push({...element, positionNumber : 1 });
    }
    if (element?.position !== "Teacher" && element?.position !== "Co-Founder" && element?.position !== "Founder") {
      data.push({...element, positionNumber : 0});
    }

  });

  

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    // { width: 1200, itemsToShow: 3 },
  ];
  if (!isEmpty(instituteFaculty)) <></>;
  const { screenWidth } = useScreenWidth();

  return (
    <div className="py-5  ">
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <p className=" px-5 text-[35px] text-[#414141] md:text-center font-bold">
        Faculty
      </p>
      <p className=" px-5 md:w-2/4 my-5 md:text-center mx-auto text-[18px] text-[#888888]">
        The teachers working as full-time professionals in the institutes
        partnered with us are very well qualified, and distinguished. and come
        from a strong educational background with years of experience in this
        field.
      </p>

      <div className={""}>
        <div className="md:max-w-[1400px] md:mx-auto md:py-8 md:px-2">
          <Carousel
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
                        // active={isActivePage}
                      />
                    );
                  })}
                </div>
              );
            }}
            breakPoints={breakPoints}
            showArrows={screenWidth > 768 ? true : false}
            // enableAutoPlay
            autoPlaySpeed={1500}
            pagination={true}
          >
            {data.sort((a, b ) => b.positionNumber - a.positionNumber)?.map((item, i) => (
              <>
                <div key={item?.id}>
                  <FacultyCard
                    item={item}
                    currentInstitute={currentInstitute}
                  />
                </div>
              </>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Faculty;

export const FacultyCard = ({ item, currentInstitute, ipAddress }) => {
  // 
  const facultyRef = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, userData } = useSelector(authSelector);
  const { researchFaculty, userLocation } = useSelector(selectUserAnalytics);
  const isVisible = useElementOnScreen(options, facultyRef);
  useEffect(() => {
    if (isVisible) {
      // 
      let currentTime = moment().format();
      let previousTime = moment(researchFaculty?.timeStamps);
      let diff = moment(currentTime).diff(previousTime, "seconds");
      // 
      const data = {
        activity_type: "research_faculties",
        payload: {
          instituteid: currentInstitute?.id,
          ipaddress: ipAddress,
          facultyid: item?.id,
          institute_name: currentInstitute?.name,
          faculty_name: item?.name,
        },
      };
      if (isAuthenticated && !ipAddress) {
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
      // 
      if (researchFaculty?.facultyId !== item?.id) {
        // 
        dispatch(postUserAnalytics(data));
      }
      // if (researchFaculty?.facultyId === item?.id && diff > 5) {
      //   
      //     dispatch(postUserAnalytics(data))
      // }
      // else {
      //   
      //   dispatch(postUserAnalytics(data))
      //   dispatch(
      //     setResearchFaculty({ facultyId: item?.id, timeStamps: currentTime })
      //   )
      // }
    }
  });
  const videoRef = useRef(null);
  const image = `https://cdn.ostello.co.in/${item?.images?.[0]?.key}`;
  const video = `https://cdn.ostello.co.in/${item?.videos?.[0]?.video?.key}`;
  const thumbnail = `https://cdn.ostello.co.in/${item?.videos?.[0]?.thumbnail?.key}`;

  

  return (
    <div ref={facultyRef} className="  ">
      <div
        style={{
          border: "1px solid #D0D5DD",
          boxShadow: "0px 1px 10px rgba(85, 85, 85, 0.14)",
        }}
        className="   w-full  lg:w-[850px] md:flex md:p-5 p-2 lg:min-h-[270px] h-full lg:mx-5 my-5    rounded-2xl  "
      >
        <div className="text-center md:w-5/12  md:relative md:flex md:items-center">
          {item?.videos?.length > 0 ? (
            <div className="sm:mb-5 mb-4 ">
              <video
                className="h-full"
                controlsList="nodownload"
                poster={thumbnail}
                style={{ width: "100%" }}
                muted
                controls
                src={video}
                ref={videoRef}
              />
            </div>
          ) : (
            <img
              className="rounded-xl mb-2 max-w-full  md:h-full max-h-[250px] mx-auto"
              src={image}
              alt=""
            />
          )}
          {!video?.length > 0 ? (
            <div className="w-10 md:absolute bottom-[-4px] right-[-4px] h-10 rounded-full bg-white items-center justify-center md:flex">
              <AiOutlinePlayCircle className="text-[#6941C6] text-2xl " />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" md:w-8/12  md:px-5 px-2 md:relative">
          <p className="font-bold md:text-[24px]  text-[18px] ">{item?.name} <small>({item?.position})</small></p>
          <p className="md:text-[20px]  text-15px]  ">{item?.qualification
}</p>
          <p className="md:text-base text-[15px] md:mt-3 text-[#A4A4A4]">
            {item?.description}
          </p>

          <div className="flex  justify-between md:justify-start	md:mt-3">
            <div className="md:mx-2">
              <p className="md:text-[24px] md:text-center text-[15px] font-semibold">
                {item?.students_coached || 0}
              </p>
              <p className="md:text-[18px] text-[14px]">Enrolled Students</p>
            </div>

            <div className="md:mx-2">
              <p className="md:text-[24px] md:text-center text-[15px] font-semibold">
                {item?.view_hours || 0}
              </p>
              <p className="md:text-[18px]  text-[14px]">Watch hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
