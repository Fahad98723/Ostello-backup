import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  LikeFilled,
  LikeOutlined,
  MoreOutlined,
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
import { Rating } from "@mui/material";
import Modal from "../../../UI/Modal/Modal";
import imgProto from "../../../../assets/images/icons/img.svg";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setActiveReview,
  setAuthModalState,
  setEditReview,
  updatePercentage,
} from "../../../../redux/slices/authSlice";
import { useRouter } from "next/router";
import {
  extractISOString,
  extractTimestamp,
  headers,
  isEmpty,
  FileUploader,
} from "../../../../utils/utils";
import axios from "axios";
import { ACCESS_TOKEN, host } from "../../../../utils/constant";
import { useSet } from "react-use";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../../../../redux/slices/courseSlice";
import { fetchAdminInstitutes } from "../../../../redux/slices/adminInstitutesSlice";
import AuthModal from "../../HomeLanding/Header/Navbar/AuthModal";
import {
  fetchInstitutes,
  setCurrentInstitute,
} from "../../../../redux/slices/instituteSlice";
import SharePopup from "../../../UI/SharePopup";
import { AiFillCheckCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import ShareReview from "./ShareReview";
import { FaCrown } from "react-icons/fa";

export default function MerchantReviewCard({
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
      .catch((err) => {})
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
  const [newReviewText, setNewReviewText] = useState(null);
  const [newIsSelected, setNewIsSelected] = useState(null);

  

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

  const [paid, setPaid] = useState(false);
  const { instituteDetails } = useSelector(authSelector);

  useEffect(() => {
    if (instituteDetails?.accountplan === "pro_plan") {
      setPaid(true);
    } else {
      setPaid(false);
    }
  }, [instituteDetails?.accountplan]);

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

        <p className="md:text-[18px] ml-2 flex items-center  text-[16px] text-[#414141]">
          Phone Number :{" "}
          {paid
            ? reviewDetails?.user?.phonenumber
            : `${reviewDetails?.user?.phonenumber.slice(0, 3)}${"*".repeat(
                7
              )}`}{" "}
          {!paid ? (
            <div className="flex items-center">
              <FaCrown className="text-[#FFD907]  mx-1 text-[14px] " />
              <p className="text-primary mr-1  text-[14px]">Unlock</p>
              <AiOutlineQuestionCircle />
            </div>
          ) : (
            ""
          )}
        </p>
        <p className="md:text-[18px] ml-2  text-[16px] text-[#414141]">
          Location : {reviewDetails?.user?.location?.area}
        </p>

        {/* <div className="flex items-center justify-end gap-3 mt-3 mr-10 cursor-pointer">
              <button><LikeOutlined /></button>
              <button><DislikeOutlined /></button>
              <button><ShareAltOutlined /></button>
            </div> */}
      </div>
    </div>
  );
}
