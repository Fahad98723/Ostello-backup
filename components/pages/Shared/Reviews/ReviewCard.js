import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeFilled,
  LikeOutlined,
  SendOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import moment from "moment";
import React, { useRef, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import reviewImg from "../../../../assets/images/reviewImg.png";
import playIcon from "../../../../assets/images/icons/playIcon.svg";
import { IoIosRocket } from "react-icons/io";
import MoreOption from "../../../MoreOption";
import { Button, CircularProgress } from "@mui/material";
import Modal from "../../../UI/Modal/Modal";
import imgProto from "../../../../assets/images/icons/img.svg";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setAuthModalState,
  setEditReview,
  updatePercentage,
} from "../../../../redux/slices/authSlice";
import { useRouter } from "next/router";
import { isEmpty, FileUploader } from "../../../../utils/utils";
import axios from "axios";
import { ACCESS_TOKEN, host } from "../../../../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../../../../redux/slices/courseSlice";
import AuthModal from "../../HomeLanding/Header/Navbar/AuthModal";
import { setCurrentInstitute } from "../../../../redux/slices/instituteSlice";
import SharePopup from "../../../UI/SharePopup";
import { AiFillCheckCircle } from "react-icons/ai";
import ShareReview from "./ShareReview";

export default function ReviewCard({
  videos,
  upvotes,
  publishedon,
  rating,
  reviewtext,
  images,
  id,
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewComment, setViewComment] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isSelected, setIsSelected] = useState(rating);
  const [activeContent, setActiveContent] = useState({});
  const router = useRouter();
  let [contents, setContents] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const reviewClassHandler = (item) => {
    let classes =
      "shadow-lg px-2  w-fit h-fit  flex items-center space-x-1 justify-center rounded-lg cursor-pointer border border-[#D7D7D7] ";
    if (item === 0) {
      classes += "text-white bg-[#FF3044]";
    } else if (isSelected === 1 && item === 1) {
      classes += "text-white  bg-red_deep";
    } else if (isSelected === 2 && item <= 2) {
      classes += " bg-light_red border-light_red";
      if (item < 2) {
        classes += " text-light_red";
      } else {
        classes += " text-white";
      }
    } else if (isSelected === 3 && item <= 3) {
      if (item < 3) {
        classes += " text-light_red";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_yellow border-light_yellow";
    } else if (isSelected === 4 && item <= 4) {
      if (item < 4) {
        classes += " text-light_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_green border-light_green";
    } else if (isSelected === 5 && item <= 5) {
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

  const [showMore, setShowMore] = useState(reviewtext?.length > 100);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const { isAuthenticated, userData, editReview, profileProgress } =
    useSelector(authSelector);

  const handleAddComment = async () => {
    const commentObject = {
      comment: text,
      createdAt: new Date().toISOString(),
      user: {
        image: {
          url: "",
        },
        name: userData?.name,
      },
    };

    const formData = new FormData();
    formData.append("reviewid", id);
    formData.append(
      "commenttext",
      JSON.stringify(comments.concat(commentObject))
    );

    try {
      await axios.post(`${host}/review/comment/`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      toast.success("you commented !");
      dispatch(fetchCourses());
      setText("");
      router.reload();
    } catch (err) {
      toast.error("something went wrong!");
    }
  };

  useEffect(() => {
    setContents(
      []
        .concat(
          images?.map((item) => {
            return { ...item, type: "image" };
          })
        )
        .concat(
          videos?.map((item) => {
            return { ...item, type: "video" };
          }) || []
        )
    );
  }, [images, videos]);

  const fileInputRef = useRef(null);
  const [imageFiles, setImages] = useState([]);
  const [imageUpload, setImageUpload] = useState([]);
  const [videoUpload, setVideoUpload] = useState([]);
  const [videoFiles, setVideos] = useState([]);
  const [reviewText, setReviewText] = useState(reviewtext);
  const [loading, setLoading] = useState(false);
  const [reviewTextError, setReviewTextError] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  useEffect(() => {
    if (reviewtext) {
      setReviewText(reviewText);
    }
    if (images) {
      setImages(images);
      setExistingImages(images);
    }
    if (videos) {
      setVideos(videos);
      setExistingVideos(videos);
    }
    if (rating) {
      setIsSelected(rating);
    }
  }, [images, rating, reviewText, reviewtext, videos]);

  const [reviewDetails, setReviewDetails] = useState(null);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    axios
      .get(`${host}/review?id=${id}`)
      .then(({ data }) => {
        setReviewDetails(data.message);
      })
      .catch((err) => {});
  }, [id]);

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (userData?.id === reviewDetails?.user?.id) {
      return setIsOwner(true);
    }
    setIsOwner(false);
  }, [reviewDetails, userData, dispatch]);

  useEffect(() => {
    if (profileProgress === 100) {
      setIsVerified(true);
    }
  }, [profileProgress]);

  const handleFiles = (e) => {
    const filesArray = Array.from(e.target.files);
    filesArray.forEach((item) => {
      if (item.type.includes("image")) {
        // setImages((prv) => prv.concat(item))
        setImageUpload((prv) => prv.concat(item));
        setExistingImages((prv) => prv.concat([URL.createObjectURL(item)]));
      }
      if (item.type.includes("video")) {
        setVideoUpload((prv) => prv.concat(item));
        setExistingVideos((prv) => prv.concat(item));
      }
    });
  };

  const handleUpdateReview = async () => {
    if (isEmpty(reviewText)) {
      setReviewTextError("Review is required");
      return;
    }
    setReviewTextError("");

    const imageUploadStarted = toast.loading("review updating please wait ...");

    let image = await FileUploader(imageUpload, (percent) =>
      dispatch(updatePercentage(percent))
    );
    let video = await FileUploader(videoUpload, (percent) =>
      dispatch(updatePercentage(percent))
    );

    try {
      const updatedData = {
        id,
        updates: {
          reviewtext: reviewText,
          rating: isSelected,
          images: [...image, ...imageFiles],
          videos: [...video, ...videoFiles],
        },
      };
      setLoading(true);

      const { data } = await axios.patch(`${host}/review/`, updatedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      dispatch(getUser());
      updateCurrentInstitute();
      setActiveModal(2);
      setReviewText("");
      setImages([]);
      setVideos([]);
      dispatch(setEditReview(false));
      toast.success("Review Edited");
      setOpenModal(false);
    } catch (err) {
      toast.error("Something wrong try again later");
    } finally {
      setLoading(false);
      toast.remove(imageUploadStarted);
    }
  };

  useEffect(() => {
    if (isOwner) {
      if (!editReview) {
        return setOpenModal(false);
      }

      setOpenModal(true);
      setActiveModal(1);
    }
  }, [editReview, isOwner]);

  const { instituteId } = router.query;

  const updateCurrentInstitute = async () => {
    const res = await axios.get(`${host}/institute?slug=${instituteId}`);
    const currentInstitute = res?.data?.message;
    if (!isEmpty(currentInstitute)) {
      dispatch(setCurrentInstitute(currentInstitute));
    } else {
      router.reload();
    }
  };

  const [openReviewShare, setOpenReviewShare] = useState(false);
  //
  return (
    <div
      className={` w-full border-b border-[#D0D5DD] my-3 bg-white rounded-[8px]`}
    >
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <Modal
        open={openReviewShare}
        onClose={() => {
          setOpenReviewShare(false);
        }}
      >
        <ShareReview
          fb_link={"https://fb.com/albi.tanvir"}
          twitter_link={"https://twitter.com"}
        />
      </Modal>
      <div
        className={`   md:px-6  px-4  py-4 flex flex-col md:space-y-5 space-y-3  `}
        // onClick={() => setViewComment(false)}
      >
        <div className="font-semibold flex md:hidden items-center  gap-1 ">
          {/* <Rate value={rating || 1} disabled className=" text-[18px]" /> */}
          <div className="rounded-full border border-gray/10">
            {reviewDetails?.user?.avatar?.url ? (
              <img
                className="w-10 h-10 rounded-full "
                src={
                  `https://cdn.ostello.co.in/${reviewDetails?.user?.avatar?.key}` ||
                  reviewImg.src
                }
                alt=""
              />
            ) : (
              <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                {reviewDetails?.user?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <p className="md:text-[18px] text-[16px] ml-2 text-[#414141]">
            {reviewDetails?.user?.name}
          </p>
        </div>

        <div className="flex  justify-between">
          <div className="">
            <div className="flex items-center md:space-x-5 space-x-2">
              {/* <img className='w-12 h-12' src={reviewImg.src} alt='' /> */}
              <div
                className={` bg-green-600 border text-white flex items-center h-fit w-fit justify-center space-x-1 md:px-2 px-1 rounded-md font-bold md:text-lg text-md`}
              >
                <p className="">{rating}.0</p>
                <StarFilled />
              </div>
              <div className="font-semibold md:flex hidden  items-center justify-center gap-1 ">
                {/* <Rate value={rating || 1} disabled className=" text-[18px]" /> */}
                <div className="rounded-full border border-gray/10">
                  {reviewDetails?.user?.avatar?.url ? (
                    <img
                      className="w-10 h-10 rounded-full "
                      src={
                        `https://cdn.ostello.co.in/${reviewDetails?.user?.avatar?.key}` ||
                        reviewImg.src
                      }
                      alt=""
                    />
                  ) : (
                    <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                      {reviewDetails?.user?.name?.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>

                <p className="md:text-[18px] ml-2  text-[16px] text-[#414141]">
                  {reviewDetails?.user?.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 ">
            <p className="text-[14px] text-gray mt-1.5 md:ml-5 ml-2">
              {moment(reviewDetails?.publishedon).format("MMMM DD, YYYY")}
            </p>

            {isOwner || userData?.usertype === 1 ? (
              <MoreOption className={""}>
                {isOwner ? (
                  <div
                    onClick={() => {
                      setOpenModal(true);
                      setActiveModal(1);
                    }}
                    className="flex space-x-2  items-center  hover:opacity-80 p-2 "
                  >
                    <EditOutlined className="flex items-center" />
                    <p>Edit</p>
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={async (e) => {
                    try {
                      const config = {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          Authorization: `Bearer ${
                            typeof window !== "undefined" &&
                            window.localStorage.getItem("ACCESS_TOKEN")
                          }`,
                        },
                      };
                      const { data } = await axios.delete(
                        `${host}/review?id=${id}`,
                        config
                      );

                      toast.success("Deleted successfully");
                      dispatch(getUser());
                      updateCurrentInstitute();
                    } catch (err) {
                      toast.error(err.message);
                    }
                  }}
                  className="flex space-x-2 items-center  hover:opacity-80 p-2"
                >
                  <DeleteOutlined className="flex items-center" />
                  <p>Delete</p>
                </div>
              </MoreOption>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex flex-col-1 overflow-y-scroll no-scrollbar my-2 text-gray font-medium ">
          <div>
            <p className=" text-lg text-black">{reviewtext}</p>
            {/* <p className=' text-lg text-black'>
              {showMore ? (
                <p>
                  {reviewtext.slice(0, 100)}
                  <span
                    onClick={() => setShowMore(false)}
                    className='  cursor-pointer ml-1   '
                  >
                    ...show more
                  </span>
                </p>
              ) : (
                <p>
                  {reviewtext}{' '}
                  {reviewtext.length > 100 && (
                    <span
                      onClick={() => setShowMore(true)}
                      className='  cursor-pointer  '
                    >
                      ...show less
                    </span>
                  )}
                </p>
              )}
            </p> */}
          </div>
        </div>
        {/* <div className="flex items-center justify-end gap-3 mt-3 mr-10 cursor-pointer">
            <button><LikeOutlined /></button>
            <button><DislikeOutlined /></button>
            <button><ShareAltOutlined /></button>
          </div> */}

        <section className="flex items-center no-scrollbar space-x-2 overflow-x-scroll">
          {contents?.slice(0, 5)?.map((item, i) => (
            <div key={i} className="relative cursor-pointer">
              {item?.type === "image" ? (
                <>
                  {item?.key ? (
                    <img
                      className="w-12 h-12"
                      onClick={() => {
                        setIsModalOpen(true);
                        setActiveContent(item);
                      }}
                      src={`https://cdn.ostello.co.in/${item?.key}`}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              {item?.type === "video" && (
                <>
                  <video
                    className="w-12 h-12"
                    style={{
                      objectFit: "cover ",
                    }}
                    // className="h-full "
                    controlsList="nodownload"
                    // poster={`https://cdn.ostello.co.in/${item?.key}`}
                    muted
                    controls
                    src={`https://cdn.ostello.co.in/${item?.key}`}
                  />
                  <div className="w-7 h-7 absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-full ">
                    <img
                      onClick={() => {
                        setIsModalOpen(true);
                        setActiveContent(item);
                      }}
                      src={playIcon.src}
                      className="hover:scale-110 cursor-pointer"
                      alt=""
                    />
                  </div>
                </>
              )}
              <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="relative m-10 bg-white">
                  {activeContent?.type === "image" ? (
                    <img
                      src={`https://cdn.ostello.co.in/${activeContent?.key}`}
                      alt=""
                      className="w-[300px] h-[300px]"
                    />
                  ) : (
                    ""
                  )}
                  {activeContent.type === "video" && (
                    <>
                      <video
                        className="w-[300px] h-[300px]"
                        style={{
                          objectFit: "cover ",
                        }}
                        // className="h-full "
                        controlsList="nodownload"
                        // poster={`https://cdn.ostello.co.in/${item?.key}`}
                        muted
                        controls
                        src={`https://cdn.ostello.co.in/${activeContent?.key}`}
                      />
                      {/* <div className="w-20 h-20 absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-full ">
                      <img
                        onClick={() => {
                          setIsModalOpen(true);
                          setActiveContent(item);
                        }}
                        src={playIcon.src}
                        className="h-10  ml-2 hover:scale-110 cursor-pointer"
                        alt=""
                      />
                    </div> */}
                    </>
                  )}

                  <CloseCircleOutlined
                    onClick={() => setIsModalOpen(false)}
                    className="text-xl text-white absolute -top-10 -right-10"
                  />
                </div>
              </Modal>
            </div>
          ))}
        </section>
        <SharePopup
          TextToCopy={typeof window !== "undefined" && window.location.href}
          open={openShare}
          onClose={() => setOpenShare(false)}
        />
        <div
          className={` flex sm:justify-center justify-between  sm:space-x-10 md:hidden text-gray-400 font-medium `}
        >
          <div
            onClick={() => {
              if (!isAuthenticated) {
                setOpen(true), dispatch(setAuthModalState(2));
              } else {
                setIsUpvoted((prev) => !prev);
              }
            }}
            className="flex space-x-2  items-center  cursor-pointer "
          >
            {isUpvoted ? (
              <LikeFilled className=" flex items-center text-[#7D23E0]" />
            ) : (
              <LikeOutlined className=" flex items-center" />
            )}
            <span className="">{isUpvoted ? upvotes + 1 : ""}</span>

            <p className="flex items-center">
              <AiFillCheckCircle className="text-gray" size={15} />
              <span className="ml-2"> verified user</span>{" "}
              {reviewDetails?.user.location?.city
                ? ` , ${reviewDetails?.user.location?.city}`
                : ""}
            </p>
          </div>
          <div className="flex space-x-2  items-center  cursor-pointer">
            <ShareAltOutlined
              onClick={() => setOpenReviewShare(true)}
              className=" flex items-center"
            />
            {/* <span className=''>Share</span> */}
          </div>
          <div
            onClick={() => setViewComment((prev) => !prev)}
            className="  flex space-x-2  items-center  cursor-pointer "
          >
            <BiCommentDetail className=" flex items-center" />
            <span className="">{comments.length}</span>
          </div>
        </div>

        <div className=" select-none hidden md:block mr-5">
          <div className="  text-gray font-medium flex  justify-between">
            <p>
              {/* {isVerified && (
                <> */}
              <div className="flex items-center">
                <span className="mr-2">{reviewDetails?.user.name}</span>
                <AiFillCheckCircle className="text-gray" size={20} />
                <span className="ml-1">verified user</span>{" "}
                {reviewDetails?.user.location?.city
                  ? ` , ${reviewDetails?.user.location?.city}`
                  : ""}
              </div>
              {/* </>
              )} */}
            </p>
            <div className=" flex flex-col-3 gap-5 justify-end self-end items-center">
              <div
                onClick={() => {
                  if (!isAuthenticated) {
                    setOpen(true), dispatch(setAuthModalState(2));
                  } else {
                    setIsUpvoted((prev) => !prev);
                  }
                }}
                className="flex space-x-2  items-center  cursor-pointer  "
              >
                {isUpvoted ? (
                  <LikeFilled className=" flex items-center text-[#7D23E0]" />
                ) : (
                  <LikeOutlined className=" flex items-center" />
                )}
                <span className="">{isUpvoted ? upvotes + 1 : ""}</span>
              </div>
              <div className="flex items-center  cursor-pointer">
                <ShareAltOutlined
                  onClick={() => setOpenReviewShare(true)}
                  className=" flex items-center"
                />
                {/* <span className=''>Share</span> */}
              </div>
              <div
                onClick={() => setViewComment((prev) => !prev)}
                className="  md:flex text-[#7D23E0]  items-center cursor-pointer "
              >
                <BiCommentDetail className="text-xl" />
                {/* <span className=''>
                  <span className='xl:inline hidden'>View </span>Comments
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {isViewComment && (
          <div
            className={`pb-5 space-y-5 md:w-[1110px] shadow-lg shadow-gray/90 px-6  rounded-lg flex flex-col bg-white z-[11] rounded-t-none md:absolute  justify-end`}
          >
            <p className="text-sm">Comments</p>
            {!isEmpty(comments) ? (
              <div className=" overflow-y-scroll no-scrollbar space-y-5 h-[150px]">
                {comments?.map((item, i) => (
                  <div
                    key={i}
                    className="space-x-5 flex items-start font-semibold text-[#414141]"
                  >
                    <img
                      className="xl:w-12 xl:h-12 w-8"
                      src={item.userPic || reviewImg.src}
                      alt=""
                    />

                    <div className="bg-gray/10  px-4 py-2 w-full rounded-lg">
                      <h1 className="xl:text-xl text-lg ">{item.userName}</h1>
                      <span className="text-gray sm:text-md text-xs">
                        {moment(item.date).format("DD MMM YYYY")}
                      </span>
                      <p className="pt-2 xl:text-lg font-medium text-sm">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-center">No comments</p>
              </div>
            )}
            <div className=" text-gray-400 text-lg font-semibold space-y-2">
              <div className="flex space-x-5">
                <div className="rounded-xl bg-gray/20 flex space-x-2 items-center justify-center px-2 py-1  h-fit ">
                  <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full ">
                    <IoIosRocket className="text-[#7D23E0]" />
                  </div>
                  <span>{upvotes}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <BiCommentDetail className="text-xl" />
                  <span>{comments.length}</span>
                </div>
              </div>
              <div className="flex sm:space-x-5 space-x-2 border border-1 border-gray/20 md:px-5 px-2 py-2 rounded-lg text-sm sm:text-md">
                <img
                  className="xl:w-12 xl:h-12 w-8 h-8"
                  src={comments?.[0]?.userPic || reviewImg.src}
                  alt=""
                />

                <input
                  type="text"
                  className="outline-none border-none focus:outline-none focus:border-none w-full"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your comment.."
                />
                <Button className="p-2 flex items-center  gap-1">
                  <SendOutlined
                    className="flex items-center cursor-pointer hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddComment();
                      toast.success("Saving the comment..");
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        closeOnOutsideClick={false}
        onClose={() => setOpenModal(false)}
        open={openModal}
      >
        {activeModal === 1 ? (
          <div className=" bg-white p-4 rounded-lg max-w-[300px] sm:max-w-[600px]">
            <div className="flex justify-between text-2xl items-center">
              <span className="">Edit Review</span>
              <CloseCircleOutlined
                className="cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                  dispatch(setEditReview(false));
                }}
              />
            </div>
            <div className="flex space-x-2 py-4 text-[#D7D7D7] select-none  justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map((item, i) => (
                <div
                  key={i}
                  className={reviewClassHandler(item)}
                  onClick={() => setIsSelected(item)}
                >
                  <p className="text-lg font-bold">{item}</p>
                  <StarFilled className="text-lg mb-1" />
                </div>
              ))}
            </div>

            {/* {!isEmpty(images) && ( */}
            <div className="flex flex-col space-y-1 ">
              <p>Photos/videos</p>
              <div
                className="
                    w-[100%] h-[184px] overflow-y-scroll border border-gray-400  rounded-md 
                    "
              >
                {/* {!isEmpty(images) && (
                    <div>
                      {images.map((item) => (
                        <img
                          className='w-[50px] h-[50px] '
                          src={item?.url}
                          alt=''
                        />
                      ))}
                    </div>
                  )} */}
                <div>
                  {isEmpty(existingImages) && isEmpty(existingVideos) ? (
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        onClick={() => fileInputRef.current.click()}
                        className="w-[30px] h-[30px] cursor-pointer "
                        src={imgProto.src}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="p-2">
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="flex flex-col items-center cursor-pointer border border-dashed "
                      >
                        <div className="flex items-center space-x-1 ">
                          <p className="text-center">Add more</p>
                          <img
                            className="w-[16px] h-[16px] "
                            src={imgProto.src}
                            alt=""
                          />
                        </div>
                      </div>
                      <section>
                        <p>Images:</p>
                        <div className="flex items-center space-x-2 flex-wrap">
                          {existingImages.map((item, idx) => (
                            <div key={idx} className="relative ">
                              <img
                                className="w-[50px] h-[50px]"
                                src={
                                  item.url
                                    ? `https://cdn.ostello.co.in/${item.key}`
                                    : item
                                }
                                alt=""
                              />
                              <CloseCircleOutlined
                                onClick={() => {
                                  setImages((prv) =>
                                    prv.filter((_, index) => idx !== index)
                                  );
                                  setImageUpload((prv) =>
                                    prv.filter((_, index) => idx !== index)
                                  );
                                  setExistingImages((prv) =>
                                    prv.filter((_, index) => idx !== index)
                                  );
                                }}
                                className="absolute right-0 top-0"
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                      <section>
                        <p>Videos:</p>
                        <div>
                          {existingVideos?.map((item, idx) => (
                            <>
                              <video
                                className="w-[100px] h-[100px]"
                                key={idx}
                                style={{
                                  objectFit: "cover ",
                                }}
                                controlsList="nodownload"
                                muted
                                controls
                                src={
                                  item.url
                                    ? `https://cdn.ostello.co.in/${item.key}`
                                    : URL.createObjectURL(item)
                                }
                                alt=""
                              />
                              <div key={idx} className="flex space-x-2">
                                <p className=" truncate">
                                  {idx + 1}. {item.name}
                                </p>
                                <CloseCircleOutlined
                                  onClick={() => {
                                    setVideos((prv) =>
                                      prv.filter((_, index) => idx !== index)
                                    );
                                    setVideoUpload((prv) =>
                                      prv.filter((_, index) => idx !== index)
                                    );
                                    setExistingVideos((prv) =>
                                      prv.filter((_, index) => idx !== index)
                                    );
                                  }}
                                  className="flex items-center text-xl text-[#FF0000]"
                                />
                              </div>
                            </>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}
                </div>

                <input
                  multiple
                  type="file"
                  hidden
                  onChange={handleFiles}
                  ref={fileInputRef}
                />
              </div>
            </div>
            {/* )} */}

            {reviewTextError?.length > 0 && (
              <span className="ml-auto text-[#FF0000]">{reviewTextError}</span>
            )}
            <div
              className={`flex h-[93px] p-2 space-x-2 border border-gray-400 rounded-md ${
                reviewTextError?.length && "border-red"
              }`}
            >
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your Review"
                className="border-none outline-none active:outline-none active:border-none w-full resize-none placeholder:text-sm"
              />
            </div>
            <Button
              disabled={loading}
              onClick={handleUpdateReview}
              className="font-lg px-2 py-1 ml-auto  text-white bg-[#7D23E0] rounded-sm active:opacity-75"
            >
              {loading && (
                <CircularProgress className="text-white mr-2" size={20} />
              )}
              Update Review
            </Button>
          </div>
        ) : activeModal === 2 ? (
          <div className="bg-white  flex flex-col items-center md:gap-10 space-y-5 md:space-y-0 md:w-[400px] mx-auto  p-8 rounded-xl">
            <p className="md:text-3xl text-xl text-center">
              <span className="text-[#7D23E0]">Thanks</span> for giving your
              opinion. It matters to us!
            </p>
            <button
              className="bg-[#7D23E0] text-white md:text-xl text-lg rounded-md px-5 py-1"
              onClick={() => {
                setOpenModal(false);
                setActiveModal(0);
              }}
            >
              Close
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
