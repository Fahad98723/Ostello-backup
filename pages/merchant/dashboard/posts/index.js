import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { RiArrowRightSLine, RiUserSettingsLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import DashboardSidebar from "../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import ToggleDashboard from "../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../redux/slices/authSlice";
import axios from "axios";
import { host } from "../../../../utils/constant";
import DeleteConfirmationModal from "../../../../components/pages/AdminDashboard/AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";
import { DeleteIcon } from "../../../../components/SVGIcons";
import { AiFillLike, AiOutlineLike, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Link from "next/link";
import LoadingSpinner from "../../../../components/layout/LoadingSpinner";
import { adminDeleteBlog } from "../../../../redux/slices/adminBlogSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoRocket } from "react-icons/io5";
import hash from "../../../../assets/post/hashtag.png";
import ReactPlayer from "react-player";
import useScreenWidth from "../../../../components/hooks/useScreenWidth";
import Carousel from "react-elastic-carousel";
import { isEmpty } from "../../../../utils/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const Posts = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { instituteDetails, loading, userData } = useSelector(authSelector);
  const [refetch, setRefetch] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("OWNER_ID") === null
    )
      router.push("/merchant/login");
    if (userData) {
      if (userData?.usertype !== 2) {
        router.push("/merchant/login");
      }
    } else if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("INSTITUTE_ID") === null
    )
      router.push("/merchant/details");
    dispatch(getInstituteDetails());
  }, [refetch, router]);

  useEffect(() => {

    if (
      !loading &&
      !isEmpty(instituteDetails) &&
      instituteDetails.approval !== 1
    ) {
      router.push("/merchant/details/success");
    } else {
      return;
    }
  }, [instituteDetails, loading, router]);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState(false);
  const [posts, setPosts] = useState([]);

  const [id, setId] = useState("");

  const { isDeleted } = useSelector((state) => state.adminBlogs);

  useEffect(() => {
    dispatch(getInstituteDetails());
  }, []);

  useEffect(() => {
    const run = async () => {
      if (deleteCoupon) {
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
            `${host}/blog?instituteBlogsOnly=true&id=${id}`,
            config
          );
          toast.success("Post Removed Successfull");
          setDeleteCoupon(false);
        } catch (err) {
          toast.error(err.message);
          setDeleteCoupon(false);
        }
      }
    };
    run();
  }, [id, deleteCoupon]);

  useEffect(() => {
    if (instituteDetails?.id) {
      const run = async () => {
        try {
          const { data } = await axios.get(
            `${host}/blog?instituteid=${instituteDetails?.id}`
          );
          setPosts(data?.message);
      
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [instituteDetails?.id, isDeleted]);

 

  const videoRef = useRef(null);
  const { screenWidth } = useScreenWidth();
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="dashboard">
        <ToggleDashboard
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></ToggleDashboard>
        <div className=" grid grid-cols-6 gap-0 bg-white ">
          <DashboardSidebar />
          <div
            style={{ background: " #FAFAFB" }}
            className="  col-span-6 px-5 lg:col-span-5  "
            onClick={() => setShowSidebar(false)}
          >
            <div className="heading p-5 mb-5 flex justify-between">
              <h1 className="text-2xl font-bold ">Posts</h1>

              <div className=" fixed lg:relative lg:mt-8 bottom-0 lg:right-0 mb-10 lg:mb-0 z-40 lg:flex items-center w-full">
                <button
                  className="flex items-center  ml-auto w-32 py-2 lg:py-1  mr-10 rounded-full text-white justify-center bg-primary"
                  onClick={(e) => {
                    router.push("/merchant/dashboard/posts/add");
                  }}
                >
                  <AiOutlinePlus className="text-white" />
                  <p className="">Add Posts</p>
                </button>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="py-8 mx-10 w-4/6 font-medium bg-white flex justify-center">
                No active Posts are available now
              </div>
            ) : (
              <>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="px-[30px] pt-4 pb-16">
                    <div className="grid gap-10 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
                      {posts?.map((data, index) => (
                        <div key={index} className="relative">
                          <BlogCard data={data} />
                          <div
                            onClick={() => {
                              setDeleteConfirmationModal(true);
                              setId(data.id);
                            }}
                            className="absolute top-8 right-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full"
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {deleteConfirmationModal && (
              <DeleteConfirmationModal
                setDeleteCoupon={setDeleteCoupon}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
              />
            )}

            {/* <Carousel
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
              breakPoints={breakPoints}
              showArrows={screenWidth > 768 && posts?.length > 3 ? true : false}
              autoPlaySpeed={1500}
              pagination={true}
            >
              {posts?.map((data, index) => (
                <div
                  key={index}
                  className="p-5 bg-white w-[370px] rounded-[20px] shadow-md my-3"
                >
                  {data?.videos?.length > 0 ? (
                    <div className="sm:mb-5 mb-4 ">
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
                        }}
                        controls={true}
                        url={
                          data?.videos[0]?.key
                            ? `https://cdn.ostello.co.in/${data?.videos[0]?.key}`
                            : data?.videos[0]?.url
                        }
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
                      <p className="text-[18px] font-[600]">
                        {data.title.slice(0, 25)}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-[12px] text-[#767676] font-[400]">
                          Best questions for JEE 2024...{" "}
                        </p>
                        <p className="text-[12px] text-[#767676] font-[500]">
                          {data?.views} Views{" "}
                        </p>
                      </div>
                    </div>

                    <div className="mr-0">
                      <BsThreeDotsVertical className="text-[25px] mr-0 text-right" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                 
                      {liked ? (
                        <AiFillLike className="cursor-pointer text-primary text-xl" />
                      ) : (
                        <AiOutlineLike
                          onClick={() => {
                            setLiked(true);
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
                        <img
                          className="w-[18px] h-[18px] mr-1"
                          src={hash.src}
                        />
                        <p className="text-[12px] text-primary font-[600]">
                          Trending
                        </p>
                      </div>
                      <div className="flex items-center p-2 rounded-[30px] border border-primary">
                        <img
                          className="w-[18px] h-[18px] mr-1"
                          src={hash.src}
                        />
                        <p className="text-[12px] text-primary font-[600]">
                          Popular
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;

const BlogCard = ({ data }) => {
  const { title, images, description, readtime, id } = data;

  // const blogDate = makeDateFormat(timestamp);

  return (
    <div className="p-4 bg-white min-h-full rounded-[2.5rem] shadow-md">
      <Link
        prefetch={false}
        href={`/merchant/dashboard/posts/edit/${id}`}
        // href={`/admin-dashboard/blogs/edit/${slugurl}`}
        className=""
      >
        <div className="flex flex-col  text-[22px] py-2 font-semibold leading-[30px] ">
          <img
            className="hover:scale-110 duration-300 cursor-pointer hover:rounded-t-[2.5rem] h-[200px] "
            src={`https://cdn.ostello.co.in/${images[0]?.key}`}
            alt=""
          />
          <p className="text-[14px] pt-3 text-[#A0A0A0]">
            <span className="mx-1">l</span> {readtime} read
          </p>

          {title}

          <p className="text-[#414141] text-[18px]">Description</p>
        </div>
      </Link>
    </div>
  );
};
