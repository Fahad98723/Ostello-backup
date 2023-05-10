import { Container } from "@mui/material";
import React, { useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
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
import { Button, Rate } from "antd";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NoData from "./NoData";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setEditReview, updatePercentage,
} from "../../../redux/slices/authSlice";
import Modal from "../../UI/Modal/Modal";
import { isEmpty, FileUploader } from "../../../utils/utils";
import imgProto from "../../../assets/images/icons/img.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../../../utils/constant";
import { useEffect } from "react";

const CourseReviews = ({ api }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event, d) => {
    setAnchorEl(event.currentTarget);
    setData(d);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [data, setData] = useState({});
  const { userData } = useSelector(authSelector);
  const [isSelected, setIsSelected] = useState();

  const course = userData?.reviews;

  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const fileInputRef = useRef(null);
  const [imageFiles, setImages] = useState([]);
  const [imageUpload, setImageUpload] = useState([]);
  const [videoUpload, setVideoUpload] = useState([]);
  const [videoFiles, setVideos] = useState([]);
  const [reviewText, setReviewText] = useState();
  const [loading, setLoading] = useState(false);
  const [reviewTextError, setReviewTextError] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [videos, setVideos1] = useState([]);
  const dispatch = useDispatch();
  let [contents, setContents] = useState([]);

  

  const [id, setId] = useState();

  useEffect(() => {
    if (data) {
      setReviewText(data?.reviewtext);
      setIsSelected(data?.rating);

      if (data?.images?.length) {
        setExistingImages(data?.images);
        setImages(data?.images);
      }
      setVideos(data?.videos);
      setExistingVideos(data?.videos);
      setId(data?.id);
      setContents(
        []
          .concat(
            data?.images?.map((item) => {
              return { ...item, type: "image" };
            })
          )
          .concat(
            data?.videos?.map((item) => {
              return { ...item, type: "video" };
            }) || []
          )
      );
    }
  }, [data]);

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

  const handleDelete = async () => {
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
      const  datas  = await axios.delete(
        `${host}/review?id=${data?.id}`,
        config
      );

      
      toast.success("Deleted successfully");
      dispatch(getUser());
      handleClose();
    } catch (err) {
      
      toast.error(`${err.message}`);
    }
  };

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

    let image = await FileUploader(imageUpload,(percent) => dispatch(updatePercentage(percent)));
    let video = await FileUploader(videoUpload,(percent) => dispatch(updatePercentage(percent)));

    try {
      const updatedData = {
        id: id,
        updates: {
          reviewtext: reviewText,
          rating: isSelected,
          images: [...image, ...imageFiles],
          videos:   [...video, ...videoFiles],
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
      setActiveModal(2);
      setReviewText("");
      setImages([]);
      setVideos([]);
      dispatch(setEditReview(false));
      toast.success("Review Edited");
      setOpenModal(false);
    } catch (err) {
      
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
      toast.remove(imageUploadStarted);
    }
  };
  return (
    <Container className="py-5 pb-8">
      {course?.length > 0 ? (
        <div className="w-full  grid lg:grid-cols-2 gap-4  lg:py-6 lg:m-0">
          {course.map((a, idx) => (
            <div
              key={idx}
              className="bg-white w-12/12 rounded-[10px] shadow-lg p-5 md:max-w-[408px]  m-auto lg:m-0"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  {userData?.avatar?.key ? (
                    <img
                      src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                      alt=""
                      className="w-[60px] h-[60px] rounded-[10px]"
                    />
                  ) : (
                    <div className="bg-primary h-[60px] w-[60px] mx-auto text-2xl  rounded-[10px] flex items-center justify-center p-1 text-white cursor-pointer ">
                      {userData?.name?.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-[20px] font-semibold">
                      {userData?.name}
                    </p>
                    {a.images.length ? (
                      <div className="flex items-center space-x-2 flex-wrap">
                        {a.images?.map((item, idx) => (
                          <div key={idx} className=" ">
                            <img
                              className="w-[50px] h-[50px]"
                              src={`https://cdn.ostello.co.in/${item.key}`}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                    <p className="text-[15px] ">{a.reviewtext}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <IoIosArrowDown
                      className="text-[15px]"
                      onClick={(e) => {
                        handleMenu(e, a);
                      }}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={() => {
                        handleClose();
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOpenModal(true);
                          setActiveModal(1);
                        }}
                      >
                        {" "}
                        <FiEdit className="mr-2" /> Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDelete();
                        }}
                      >
                        <RiDeleteBin5Line className="mr-2" /> Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="">
                  <div className="flex items-center mt-3">
                    <div
                      className="flex items-center rounded-[10px]  text-white  px-2 lg:mr-2"
                      style={{ backgroundColor: "#FFD130" }}
                    >
                      <p className="lg:text-[15px]">{a?.ratings}</p>
                      <AiFillStar />
                    </div>
                    <p className=" ml-2 text-[15px]">{a?.date}</p>
                  </div>

                  <p className="mt-2 text-[15px]">{a?.reviews}</p>
                </div>
                {/* <div
                className=" rounded-full  shadow-lg  ml-auto p-2 cursor-pointer "
                style={{ backgroundColor: "white" }}
              >
                <AiOutlineShareAlt onClick={() => handleOpen()} className='text-2xl' />
              </div> */}
              </div>

              <div className="pb-5 flex items-center justify-between">
                <div className=" flex justify-center items-center">
                  <AiOutlineShareAlt className="text-[15px] mr-3 items-center" />{" "}
                  Share
                </div>
                <p className="">{a?.upvotes} people upvoted</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData text={`You haven’t reviewed anything yet.`}></NoData>
      )}

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
                    w-[100%] h-[184px] overflow-y-scroll  border border-gray-400  rounded-md 
                    "
              >
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
                                  !item.url
                                    ? item
                                    : `https://cdn.ostello.co.in/${item.key}`
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
                            <div key={idx} className="relative ">
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
                            </div>
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
              loading={loading}
              onClick={handleUpdateReview}
              className="font-lg px-2 py-1 ml-auto  text-white bg-[#7D23E0] rounded-sm active:opacity-75"
            >
              Update Review
            </Button>
          </div>
        ) : activeModal === 2 ? (
          <div className="bg-white  flex flex-col items-center md:gap-10 space-y-5 md:space-y-0 md:w-[400px] mx-auto  p-8 rounded-xl">
            <p className="md:text-3xl text-xl text-center">
              <span className="text-[#7D23E0]">Updated</span> successfully
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
    </Container>
  );
};

export default CourseReviews;
