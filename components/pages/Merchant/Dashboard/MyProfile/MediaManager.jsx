import React, { useEffect, useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
  updatePercentage,
  uploadingEnded,
  uploadingStarted,
} from "../../../../../redux/slices/authSlice";
import { Box, LinearProgress } from "@mui/material";
import { Typography } from "antd";
import { FileUploader } from "../../../../../utils/utils";
import { isEmpty } from "../../../../utils";
import { host } from "../../../../../utils/constant";

export default function MediaManager({ afterSuccess = () => {} }) {
  const [pendingImages, setPendingImages] = useState([]);
  const [pendingVideos, setPendingVideos] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  const [videoFiles, setVideoFiles] = useState([]);
  const [imageFiles, setImageFile] = useState([]);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const imageInputRef = useRef({});
  const videoInputRef = useRef({});
  const thumbnailInputRef = useRef([]);

  const dispatch = useDispatch();
  const { instituteDetails, percentage, isUploading } =
    useSelector(authSelector);

  const refetch = () => {
    dispatch(getInstituteDetails());
  };

  useEffect(() => {
    setExistingImages(instituteDetails?.images);
    setExistingVideos(instituteDetails?.videos);
    // pending Requests ==>>
    setPendingImages(instituteDetails.updatedRequest?.images);
    setPendingVideos(instituteDetails.updatedRequest?.videos);
  }, [instituteDetails]);

  const uploadVideos = async () => {
    try {
      dispatch(uploadingStarted());

      const thumbnailsUploaded = await FileUploader(thumbnailFiles, (percent) => dispatch(updatePercentage(percent)));
      

      const videosUploaded = await FileUploader(videoFiles, (percent) => dispatch(updatePercentage(percent)));
      

      const videos = videosUploaded.map((item, index) => {
        return {
          thumbnail: thumbnailsUploaded[index],
          video: item,
        };
      });

      const data = {
        id:
          typeof window !== "undefined" &&
          window.localStorage.getItem("INSTITUTE_ID"),
        updates: {
          videos: existingVideos.concat(videos),
        },
      };

      await axios.patch(`${host}/institute/media`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });

      toast.success("Successfully Uploaded");
      afterSuccess();
      refetch();
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      // toast.remove(uploading);
      dispatch(uploadingEnded());
    }
  };

  const [videoUpload, setVideoUpload] = useState(true);
  const [imageUpload, setImageUpload] = useState(true);

  const [imageUploading, setImageUploading] = useState(false);

  const handleUploadImages = async () => {
    try {
      let images = await FileUploader(imageFiles, (percent) => dispatch(updatePercentage(percent)));

      

      const data = {
        id:
          typeof window !== "undefined" &&
          window.localStorage.getItem("INSTITUTE_ID"),
        updates: {
          images: existingImages.concat(images),
        },
      };

      await axios.patch(`${host}/institute/media`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      toast.success("successfully uploaded");
      refetch();
      afterSuccess();
    } catch (err) {
      
      toast.error("something went wrong !");
    } finally {
      // toast.remove(imageUploadStarted);
      setImageUploading(false);
      dispatch(uploadingEnded());
    }
  };

  useEffect(() => {
    if (imageFiles.length > 7) {
      setImageUpload(false);
      toast.error("You can't upload more than 8 images at a time !");
    } else {
      setImageUpload(true);
    }

    if (videoFiles.length > 5) {
      setVideoUpload(false);
      toast.error("You can't upload more than 5 video at a time !");
    } else {
      setVideoUpload(true);
    }
  }, [imageFiles, videoFiles]);

  

  return (
    <div>
      <div>
        {/* {isUploading && <>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quia culpa facere sapiente mollitia, esse illum architecto deserunt eaque eos obcaecati eum explicabo alias debitis quam beatae inventore, sit voluptas? {percentage}
                </p>
                 
                </>} */}
      </div>
      <section className="my-5">
        {!isEmpty(existingVideos) && (
          <>
            <p> Cover Video :</p>
            <div className="flex  items-center w-full space-x-4 flex-wrap my-2">
              <div className="border border-dashed w-fit m-2 relative">
                <CloseOutlined
                  onClick={async () => {
                    const data = {
                      id:
                        typeof window !== "undefined" &&
                        window.localStorage.getItem("INSTITUTE_ID"),
                      updates: {
                        videos: existingVideos?.filter(
                          (item) =>
                            item?.video?.key !== existingVideos[0]?.video?.key
                        ),
                      },
                    };
                    try {
                      await axios.patch(`${host}/institute/media`, data, {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          Authorization: `Bearer ${
                            typeof window !== "undefined" &&
                            window.localStorage.getItem("ACCESS_TOKEN")
                          }`,
                        },
                      });
                      toast.success("successfully Deleted !");
                      dispatch(getInstituteDetails());
                    } catch {
                      toast.error("got an error !");
                    } finally {
                    }
                  }}
                  className="text-[#FF0000] absolute right-1 top-1 hover:scale-125"
                />
                <div className="border border-dashed w-fit m-5 ">
                  <div className=" aspect-video w-[300px]">
                    <video
                      controlsList="nodownload"
                      poster={`https://cdn.ostello.co.in/${existingVideos[0].thumbnail.key}`}
                      style={{ width: "100%", marginTop: "0px" }}
                      muted
                      controls
                      src={`https://cdn.ostello.co.in/${existingVideos[0].video.key}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p> Other Videos :</p>
            {!isEmpty(existingVideos.slice(1, existingVideos.length)) ? (
              <>
                <div className="flex  items-center w-full  flex-wrap my-2">
                  {existingVideos
                    .slice(1, existingVideos.length)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="border border-dashed w-fit m-2 relative"
                      >
                        <CloseOutlined
                          onClick={async () => {
                            const data = {
                              id:
                                typeof window !== "undefined" &&
                                window.localStorage.getItem("INSTITUTE_ID"),
                              updates: {
                                videos: existingVideos?.filter(
                                  (video) => video?.video?.key !== item?.video?.key
                                ),
                              },
                            };
                            try {
                              await axios.patch(
                                `${host}/institute/media`,
                                data,
                                {
                                  headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    Authorization: `Bearer ${
                                      typeof window !== "undefined" &&
                                      window.localStorage.getItem(
                                        "ACCESS_TOKEN"
                                      )
                                    }`,
                                  },
                                }
                              );
                              toast.success("successfully Deleted !");
                              dispatch(getInstituteDetails());
                            } catch {
                              toast.error("got an error !");
                            } finally {
                            }
                          }}
                          className="text-[#FF0000] absolute right-1 top-1 hover:scale-125"
                        />
                        <div className="border border-dashed w-fit m-5 ">
                          <div className=" aspect-video w-[300px]">
                            <video
                              // onContextMenu={(e) => e.preventDefault()}
                              controlsList="nodownload"
                              poster={`https://cdn.ostello.co.in/${item?.thumbnail?.key}`}
                              // onClick={onVideoClick}
                              style={{ width: "100%", marginTop: "0px" }}
                              // playsInline
                              // webkit-playsInline
                              // loop
                              muted
                              // preload="true"
                              controls
                              // alt="Ostello"
                              src={`https://cdn.ostello.co.in/${item?.video?.key}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <p className="text-sm">No video found</p>
            )}
          </>
        )}
      </section>
      <section>
        {/* Video Section */}
        <div className="sm:w-5/12 w-full  px-6 py-2  mb-6      shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0">
          <p className="my-5 font-bold">Upload Video</p>

          <div>
            <div className="border h-28 w-full lg:my-3 relative rounded-lg flex items-center justify-center">
              <div>
                <MdAddPhotoAlternate
                  size={30}
                  onClick={() => videoInputRef.current.click()}
                />
                <input
                  multiple
                  accept="video/*"
                  ref={videoInputRef}
                  // onSelect={(e) => 
                  onChange={(e) => {
                    const filesArray = Array.from(e.target.files);
                    filesArray.forEach((item) => {
                      if (item?.type.includes("video")) {
                        setVideoFiles((prv) => prv.concat([item]));
                      }
                    });
                  }}
                  type="file"
                  name="video"
                  hidden
                />
              </div>
            </div>
            <p className="text-center my-2">
              This would be considered as <br /> Institute's video
            </p>
          </div>
        </div>

        {videoFiles?.length > 0 && (
          <div className=" px-6 py-2 w-full  mb-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray ">
            <>
              {videoFiles?.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="flex w-full items-center justify-between space-x-2 border border-dashed my-2 p-5 relative"
                  >
                    <CloseOutlined
                      onClick={() => {
                        setVideoFiles(
                          videoFiles.filter((item, index) => index !== key)
                        );

                        setThumbnail(
                          thumbnail.filter((item, index) => index !== key)
                        );

                        setThumbnailFiles(
                          thumbnailFiles.filter((item, index) => index !== key)
                        );
                      }}
                      className="text-[#FF0000] absolute right-2 top-2"
                    />

                    <div>
                      <p>Video no : {key + 1}</p>
                      <video
                        controls
                        src={URL.createObjectURL(item)}
                        key={key}
                        type="video/mp4"
                        className="w-[300px] h-[200px]"
                      />
                    </div>

                    {thumbnail?.[key]?.length > 0 ? (
                      <div className="h-full">
                        <p>Thumbnail:</p>
                        <img
                          className="w-[300px] h-[200px]"
                          src={thumbnail?.[key]}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="w-[300px] h-[200px]">
                        {/* Thumbnail Section */}
                        <div className="  px-6 py-2       shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out">
                          <p className="my-5 font-bold">Video Thumbnail</p>
                          <div>
                            <div className="border h-20 w-full lg:my-3 relative rounded-lg flex items-center justify-center">
                              <div>
                                <MdAddPhotoAlternate
                                  onClick={() => {
                                    thumbnailInputRef.current[key].click();
                                    
                                    if (
                                      key !== 0 &&
                                      key !== thumbnail?.length
                                    ) {
                                      
                                      alert(
                                        `Please choose ${
                                          thumbnail.length + 1
                                        } no. video thumbnail first !`
                                      );
                                    }
                                  }}
                                  size={30}
                                />
                                <input
                                  disabled={
                                    key !== 0 && key !== thumbnail?.length
                                  }
                                  ref={(element) => {
                                    thumbnailInputRef.current[key] = element;
                                  }}
                                  onChange={(e) => {
                                    const filesObj = e.target.files;
                                    Object.values(filesObj).forEach((item) => {
                                      if (item.type.includes("image")) {
                                        setThumbnailFiles((prv) =>
                                          prv.concat([item])
                                        );
                                        setThumbnail((prv) =>
                                          prv.concat([
                                            URL.createObjectURL(item),
                                          ])
                                        );
                                      }
                                    });
                                  }}
                                  type="file"
                                  name="thumbnail"
                                  hidden
                                  accept="image/*"
                                />
                              </div>
                            </div>
                            <p className="text-center my-2">
                              This image will be used as video thumbnail
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>

            {isUploading && !imageUploading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "50%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={percentage} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(percentage)}%`}</Typography>
                </Box>
              </Box>
            ) : (
              <div className=" w-full flex justify-center ">
                <button
                  disabled={!videoUpload}
                  onClick={() => {
                    uploadVideos();
                    setImageUploading(false);
                  }}
                  className=" px-5 py-2 my-5 text-white  bg-primary rounded-lg cursor-pointer select-none"
                >
                  Upload Videos
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        {!isEmpty(existingImages) && (
          <>
            <p>Cover Image :</p>
            <div className="flex  items-center space-x-4 flex-wrap">
              <div className="border border-dashed w-fit m-2 relative">
                <CloseOutlined
                  onClick={async () => {
                    const data = {
                      id:
                        typeof window !== "undefined" &&
                        window.localStorage.getItem("INSTITUTE_ID"),
                      updates: {
                        images: existingImages.filter(
                          (image) => image.key !== existingImages[0].key
                        ),
                      },
                    };
                    try {
                      await axios.patch(`${host}/institute/media`, data, {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          Authorization: `Bearer ${
                            typeof window !== "undefined" &&
                            window.localStorage.getItem("ACCESS_TOKEN")
                          }`,
                        },
                      });
                      toast.success("successfully Deleted!");
                      refetch();
                    } catch {
                      toast.error("got an error !");
                    } finally {
                    }
                  }}
                  className="text-[#FF0000] absolute right-1 top-1 hover:scale-125"
                />
                <div className="border border-dashed w-fit m-5 ">
                  <img
                    src={`https://cdn.ostello.co.in/${existingImages?.[0]?.key}`}
                    key={existingImages?.[0]?.key}
                    className="w-60 h-40  border-dashed "
                    alt=""
                  />
                </div>
              </div>
            </div>

            <p>Other Images :</p>
            <div className="flex  items-center space-x-4 flex-wrap">
              {existingImages
                .slice(1, existingImages.length)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-dashed w-fit m-2 relative"
                  >
                    <CloseOutlined
                      onClick={async () => {
                        const data = {
                          id:
                            typeof window !== "undefined" &&
                            window.localStorage.getItem("INSTITUTE_ID"),
                          updates: {
                            images: existingImages.filter(
                              (image) => image.key !== item?.key
                            ),
                          },
                        };

                        try {
                          await axios.patch(`${host}/institute/media`, data, {
                            headers: {
                              "Access-Control-Allow-Origin": "*",
                              Authorization: `Bearer ${
                                typeof window !== "undefined" &&
                                window.localStorage.getItem("ACCESS_TOKEN")
                              }`,
                            },
                          });

                          toast.success("Successfully Deleted");
                          refetch();
                        } catch {
                          toast.error("got an error !");
                        } finally {
                        }
                      }}
                      className="text-[#FF0000] absolute right-2 top-2 hover:scale-125"
                    />
                    <img
                      src={`https://cdn.ostello.co.in/${item?.key}`}
                      key={item?.key}
                      className="w-60 h-40  border-dashed "
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </section>

      <section>
        {/* Image Section */}
        <div className="sm:w-5/12 w-full  px-6 py-2  mb-6 lg:mb-0     shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0">
          <p className="my-5 font-bold">Upload Image</p>

          <div>
            <div className="border h-28 w-full lg:my-3 relative rounded-lg flex items-center justify-center">
              <div>
                <MdAddPhotoAlternate
                  size={30}
                  onClick={() => imageInputRef.current.click()}
                />
                <input
                  multiple
                  ref={imageInputRef}
                  name="image"
                  onChange={(e) => {
                    Array.from(e.target.files).forEach((item) => {
                      if (item.type.includes("image")) {
                        setImageFile((prv) => prv.concat([item]));
                      }
                    });
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </div>
            </div>
            <p className="text-center my-2">
              This would be considered as <br /> Institute's cover images
            </p>
          </div>
        </div>
        {imageFiles?.length > 0 && (
          <div className=" px-6 py-2 w-full  mb-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray">
            <div className="flex items-center flex-wrap">
              {imageFiles?.map((item, index) => (
                <div
                  key={index}
                  className="border border-dashed w-fit m-2 relative"
                >
                  <CloseOutlined
                    onClick={() => {
                      setImageFile(
                        imageFiles.filter((item, idx) => idx !== index)
                      );
                    }}
                    className="text-[#FF0000] absolute right-2 top-2 hover:scale-125"
                  />
                  <img
                    src={URL.createObjectURL(item)}
                    key={index}
                    className="w-60 h-40  border-dashed "
                    alt=""
                  />
                </div>
              ))}
            </div>
            {isUploading && imageUploading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "50%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={percentage} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(percentage)}%`}</Typography>
                </Box>
              </Box>
            ) : (
              <div className=" w-full flex justify-center ">
                <button
                  disabled={!imageUpload}
                  onClick={() => {
                    handleUploadImages();
                    setImageUploading(true);
                    !imageUpload &&
                      toast.error(
                        "You can't upload more than 8 image at a time ! please remove image.."
                      );
                  }}
                  className=" px-5 py-2 my-5 text-white active:bg-medium-violet bg-primary rounded-lg cursor-pointer select-none"
                >
                  Upload Images
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
