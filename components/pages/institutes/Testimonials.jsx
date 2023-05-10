import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import {
  institutesSelector,
  setSingleTopper,
} from "../../../redux/slices/instituteSlice";
import useScreenWidth from "../../hooks/useScreenWidth";
import VideoPlayer from "../../VideoPlayer";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";

// const data = [
//   {
//     id: 1,
//     image:
//       "https://media.istockphoto.com/photos/african-student-sitting-in-classroom-picture-id1351445530?b=1&k=20&m=1351445530&s=170667a&w=0&h=9Lmy0oy3tqoFgvuIPhEKPhbNQrLR12Ym518Zjs-KpF4=",
//     name: "Ravi",
//     subject: "Mechanical Engineering",
//     link: "",
//   },
//   {
//     id: 2,
//     image:
//       "https://media.istockphoto.com/photos/african-student-sitting-in-classroom-picture-id1351445530?b=1&k=20&m=1351445530&s=170667a&w=0&h=9Lmy0oy3tqoFgvuIPhEKPhbNQrLR12Ym518Zjs-KpF4=",
//     name: "Pulok",
//     subject: "Mechanical Engineering",
//     link: "",
//   },
//   {
//     id: 3,
//     image:
//       "https://media.istockphoto.com/photos/african-student-sitting-in-classroom-picture-id1351445530?b=1&k=20&m=1351445530&s=170667a&w=0&h=9Lmy0oy3tqoFgvuIPhEKPhbNQrLR12Ym518Zjs-KpF4=",
//     name: "Kibria",
//     subject: "Mechanical Engineering",
//     link: "",
//   },
//   {
//     id: 4,
//     image:
//       "https://media.istockphoto.com/photos/african-student-sitting-in-classroom-picture-id1351445530?b=1&k=20&m=1351445530&s=170667a&w=0&h=9Lmy0oy3tqoFgvuIPhEKPhbNQrLR12Ym518Zjs-KpF4=",
//     name: "Fahad",
//     subject: "Mechanical Engineering",
//     link: "",
//   },
// ];
const Testimonials = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];
  const router = useRouter();
  const { screenWidth } = useScreenWidth();
  const { isAuthenticated, userData } = useSelector(authSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const { currentInstitute } = useSelector(institutesSelector);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentInstitute?.testimonials?.length) {
      setData(currentInstitute?.testimonials);
    }
  }, [currentInstitute]);

  return (
    <div>
      {currentInstitute?.testimonials?.length ? (
        <>
          <div className="py-5 ">
            <AuthModal
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
            />
            <p className="px-5 text-[35px] text-[#414141] md:text-center font-bold">
              Testimonials
            </p>
            <p className="px-5 md:w-3/4 my-5 md:text-center mx-auto text-[18px] text-[#888888]">
              The passion for learning yields better results and our students
              have proved this yet again! From achieving top ranks in school
              board exams to acing various competitive exams, we have been
              setting benchmarks in every exam with the students passing with
              flying colors.
            </p>

            <div className={""}>
              <div className="md:max-w-[1400px] md:mx-auto md:py-10 px-1">
                <Carousel
                  renderPagination={({ pages, activePage, onClick }) => {
                    return (
                      <div className="flex items-center space-x-2 mt-3 ">
                        {pages?.map((page, i) => {
                          const isActivePage = activePage === page;
                          return (
                            <div
                              className={`cursor-pointer  h-2 rounded-md my-5 transition-all duration-500 ease-in-out ${
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
                  showArrows={
                    screenWidth > 768 && data?.length > 3 ? true : false
                  }
                  // enableAutoPlay
                  autoPlaySpeed={1500}
                  pagination={true}
                >
                  {data?.map((item, i) => (
                    <div key={i} className="  ">
                      <div
                        key={item.id}
                        style={{
                          border: "1px solid #D0D5DD",
                          boxShadow: "0px 1px 10px rgba(85, 85, 85, 0.14)",
                        }}
                        className="   w-full  lg:w-[380px] h-fit    lg:mx-5 my-5  rounded-[15px]  "
                      >
                        <div className="mb-3 text-center ">
                          {/* <img
                                          className="  
                                          w-full min-h-[240px] max-h-[244px]  rounded-t-xl mb-2"
                                          src={item.image}
                                          alt=""
                                      /> */}

                          {/* <video
                            controls
                            className="w-full rounded-t-md"
                            key={i}
                            src={item?.video?.video[0]?.url}
                            alt=""
                          /> */}

                          {item?.video?.video?.length ? (
                            // <VideoPlayer
                            //   thumbnailURL={`https://cdn.ostello.co.in/${item?.video?.thumbnail[0]?.key}`}
                            //   videoURL={`https://cdn.ostello.co.in/${item?.video?.video[0]?.key}`}
                            //   playing={false}
                            //   loop={false}
                            // />
                            <video
                             
                              // className="h-full "
                              controlsList="nodownload"
                              poster={`https://cdn.ostello.co.in/${item?.video?.thumbnail[0]?.key}`}
                              className="rounded-t-[15px] md:h-[250px] h-[200px] md:object-fill object-cover md:w-full"
                              muted
                              controls
                              src={`https://cdn.ostello.co.in/${item?.video?.video[0]?.key}`}
                            />
                          ) : (
                            <img
                              className="  
                          w-full min-h-[230px] max-h-[244px]  rounded-t-xl mb-2"
                              src={
                                item?.image?.length
                                  ? `https://cdn.ostello.co.in/${item?.image[0]?.key}`
                                  : "https://i.ibb.co/yPpnkpH/user.png"
                              }
                              alt=""
                            />
                          )}
                        </div>

                        <div className=" px-5 my-4 ">
                          <p className="font-bold text-[22px]">{item.name}</p>
                          <p className="text-base text-[#A4A4A4]">
                            {item?.subject}
                          </p>
                          <p className="text-base text-[#A4A4A4]">
                            {item?.rank}
                          </p>

                          <p className="text-base text-[#A4A4A4]">
                            {item?.description?.slice(0, 100)}
                          </p>

                          <p
                            onClick={async (e) => {
                              if (!isAuthenticated) {
                                setOpen(true);
                                dispatch(setAuthModalState(2));
                              } else {
                                router.push("/scheduleSession");
                                dispatch(setSingleTopper(item));
                              }
                            }}
                            // onClick={() => {
                            //     router.push('/scheduleSession')
                            // }}
                            className={`font-medium text-sm xl:text-base w-max  p-1 px-2 text-primary border-2 rounded  border-primary transition-transform duration-500 ease-in-out hover:shadow-3xl hover:scale-[1.1] mt-7`}
                          >
                            Schedule a session
                          </p>
                        </div>

                        {/* <p className="text-lg text-center md:w-full  w-3/4 mx-auto">
                                      {item.description}
                                  </p> */}
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Testimonials;
