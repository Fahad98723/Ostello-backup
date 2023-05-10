import { CloseCircleOutlined, StarFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Modal from "../../../UI/Modal/Modal";
import {
  authSelector,
  getUser,
  setAuthModalState,
  setEditReview,
  updatePercentage,
  uploadingEnded,
  uploadingStarted,
} from "../../../../redux/slices/authSlice";
import imgProto from "../../../../assets/images/icons/img.svg";
import { isEmpty, FileUploader } from "../../../../utils/utils";
import axios from "axios";

import { ACCESS_TOKEN, host } from "../../../../utils/constant";
import {
  fetchInstitutes,
  setCurrentInstitute,
} from "../../../../redux/slices/instituteSlice";
import toast from "react-hot-toast";
import AuthModal from "../../HomeLanding/Header/Navbar/AuthModal";
import {
  Box,
  LinearProgress,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

export default function RatingBox({ isForInstitute, id }) {
  const [isSelected, setIsSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(0);
  const router = useRouter();
  const {
    isAuthenticated,
    percentage,
    userData,
    isUploading,
    activeReview,
    editReview,
  } = useSelector(authSelector);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const reviewClassHandler = (item) => {
    let classes =
      "shadow-lg px-2  w-fit h-fit  flex items-center space-x-1 justify-center rounded-lg cursor-pointer border border-[#D7D7D7] ";
    if (isSelected === 1 && item === 1) {
      classes += "text-white bg-deep_red";
    } else if (isSelected === 2 && item <= 2) {
      classes += " bg-light_red border-light_red";
      if (item < 2) {
        classes += " text-light_red";
      } else {
        classes += " text-white";
      }
    } else if (isSelected === 3 && item <= 3) {
      if (item < 3) {
        classes += " text-light_yellow";
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

  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewTextError, setReviewTextError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleFiles = (e) => {
    const filesArray = Array.from(e.target.files);
    filesArray.forEach((item) => {
      if (item.type.includes("image")) {
        setImages((prv) => prv.concat(item));
      }
      if (item.type.includes("video")) {
        setVideos((prv) => prv.concat(item));
      }
    });
  };
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

  const handleAddReview = async () => {
    setLoading(true);
    if (isEmpty(reviewText)) {
      alert("5");
      setReviewTextError("Review is required");
      return;
    }
    setReviewTextError("");

    // const imageUploadStarted = toast.loading('review uploading please wait ...')
    try {
      dispatch(uploadingStarted());

      let image = {};
      let video = {};
      if (images) {
        image = await FileUploader(images, (percent) =>
          dispatch(updatePercentage(percent))
        );
        setImageUploading(true);
      }
      if (videos) {
        video = await FileUploader(videos, (percent) =>
          dispatch(updatePercentage(percent))
        );
      }

      let is = isForInstitute ? "instituteid" : "courseid";

      

      const reviewData = {
        reviewtext: reviewText,
        rating: isSelected,
        userid:
          typeof window !== "undefined" &&
          window.localStorage.getItem("OWNER_ID"),
        images: image,
        videos: video,
        [is]: id,
      };
      

      const { data } = await axios.post(`${host}/review/`, reviewData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });

      dispatch(getUser());
      updateCurrentInstitute();
      setActiveModal(2);
      setReviewText("");
      setImages([]);
      setVideos([]);
      setOpenModal(false);
      toast.success("Review Added Successfully !");
    } catch (err) {
      
      toast.error(err.message);
    } finally {
      setIsSelected(0);
      setImageUploading(false);
      setLoading(false);
      dispatch(uploadingEnded());
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("reviewPopup");
      }
      updateCurrentInstitute();
      setTimeout(() => {
        if (!userData?.avatar?.url) {
          toast.error("Please complete you profile");
        }
      }, 2000);
    }

    // on success
  };
  let openPopup =
    typeof window !== "undefined" && window.localStorage.getItem("reviewPopup");

  useEffect(() => {
    if (!isEmpty(openPopup) && !isEmpty(ACCESS_TOKEN)) {
      setIsSelected(openPopup);
      setOpenModal(true);
      setActiveModal(1);
    }
  }, [openPopup]);

  let isReviewed = activeReview?.id?.length > 0;

  useEffect(() => {
    if (isReviewed) {
      setIsSelected(activeReview?.rating);
    }
  }, [isReviewed]);

  return (
    <>
      <div
        style={{ border: "1px solid #D0D5DD" }}
        className=" px-4 py-5 rounded-lg  flex flex-col  bg-white "
      >
        <AuthModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
        />
        {isReviewed ? (
          <p className="text-[18px] text-[#414141] font-medium">
            {activeReview?.reviewtext}
          </p>
        ) : (
          <p className="text-[18px] text-[#414141] font-medium">
            Rate your experience
          </p>
        )}
        <div className="flex justify-center space-x-2 py-5 text-[#D7D7D7] select-none">
          {[1, 2, 3, 4, 5].map((item, i) => (
            <button
              disabled={isReviewed && !editReview}
              key={i}
              className={reviewClassHandler(item)}
              onClick={() => {
                if (isAuthenticated) {
                  setIsSelected(item);
                  setOpenModal(true);
                  setActiveModal(1);
                  return;
                }
                typeof window !== "undefined" &&
                  window.localStorage.setItem("reviewPopup", item);
                setOpen(true);
                dispatch(setAuthModalState(2));
              }}
            >
              <p className="text-lg font-bold">{item}</p>
              <StarFilled className="text-lg mb-1" />
            </button>
          ))}
        </div>
        {isReviewed ? (
          <p
            className={`text-lg ml-4 font-medium text-[#7D23E0] cursor-pointer  `}
            onClick={() => {
              dispatch(setEditReview(true));
            }}
          >
            Edit Review
          </p>
        ) : (
          <p
            className={`text-lg ml-4 font-medium text-[#7D23E0] cursor-pointer  `}
            onClick={() => {
              if (isAuthenticated) {
                setOpenModal(true);
                setActiveModal(1);
                return;
              }
              typeof window !== "undefined" &&
                window.localStorage.setItem("reviewPopup", isSelected);
              setOpen(true);
              dispatch(setAuthModalState(2));
            }}
          >
            Write a Review
          </p>
        )}

        <div>
          <Modal
            closeOnOutsideClick={true}
            onClose={() => setOpenModal(false)}
            open={openModal}
          >
            {activeModal === 1 ? (
              <div className=" bg-white p-4 rounded-lg max-w-[300px] sm:max-w-[600px]">
                <div className="flex justify-between text-2xl items-center">
                  <span className="">Add Review</span>
                  <CloseCircleOutlined
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenModal(false);
                      if (typeof window !== "undefined") {
                        window.localStorage.removeItem("reviewPopup");
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-2 py-5 text-[#D7D7D7] select-none  justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((item, i) => (
                    <button
                      disabled={isReviewed && !editReview}
                      key={i}
                      className={reviewClassHandler(item)}
                      onClick={() => setIsSelected(item)}
                    >
                      <p className="text-lg font-bold">{item}</p>
                      <StarFilled className="text-lg mb-1" />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col space-y-2 ">
                  <p>Add Photos/videos</p>
                  <div
                    className="
                    w-[100%] h-[184px] border border-gray-400  rounded-md 
                    "
                  >
                    {isEmpty(images) && isEmpty(videos) ? (
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
                          {/* For Images */}
                          <p>Images:</p>
                          <div className="flex items-center space-x-2 flex-wrap">
                            {images?.map((item, idx) => (
                              <div key={idx} className="relative ">
                                <img
                                  className="w-20"
                                  src={URL.createObjectURL(item)}
                                  alt=""
                                />
                                <CloseCircleOutlined
                                  onClick={() => {
                                    setImages((prv) =>
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
                          {/* For Images */}
                          <p>Videos:</p>
                          <div>
                            {videos?.map((item, idx) => (
                              //   <video
                              //     className='w-full '
                              //     key={idx}
                              //     src={URL.createObjectURL(item)}
                              //     alt=''
                              //   />
                              <div key={idx} className="flex space-x-2">
                                <p className=" truncate">
                                  {idx + 1}. {item.name}
                                </p>
                                <CloseCircleOutlined
                                  onClick={() => {
                                    setVideos((prv) =>
                                      prv.filter((_, index) => idx !== index)
                                    );
                                  }}
                                  className="flex items-center text-xl text-[#FF0000]"
                                />
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                    )}

                    <input
                      multiple
                      type="file"
                      hidden
                      onChange={handleFiles}
                      ref={fileInputRef}
                    />
                  </div>
                  {reviewTextError?.length > 0 && (
                    <span className="ml-auto text-[#FF0000]">
                      {reviewTextError}
                    </span>
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
                  {isUploading && imageUploading && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <Box sx={{ width: "50%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >{`${Math.round(percentage)}%`}</Typography>
                      </Box>
                    </Box>
                  )}
                  {isUploading && !imageUploading && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Box sx={{ width: "50%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >{`${Math.round(percentage)}%`}</Typography>
                      </Box>
                    </Box>
                  )}
                  <Button
                    onClick={handleAddReview}
                    className="font-lg px-2 py-1 ml-auto  text-white bg-[#7D23E0] rounded-sm active:opacity-75"
                  >
                    {loading && <CircularProgress className="text-white mr-2" size={20} />}
                    Add Review
                  </Button>
                </div>
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
                    dispatch(fetchInstitutes());
                  }}
                >
                  Close
                </button>
              </div>
            ) : null}
          </Modal>
        </div>
      </div>
    </>
  );
}
