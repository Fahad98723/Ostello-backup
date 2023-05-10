import React, { useEffect, useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { host } from "../../../../../../utils/constant";
import {
  authSelector,
  getInstituteDetails, updatePercentage,
} from "../../../../../../redux/slices/authSlice";
import {
  isEmpty,
  fileToDataURL,
  handleFile,
  FileUploader,
} from "../../../../../../utils/utils";
import VideoPlayer from "../../../../../VideoPlayer";

export default function AdminMediaManager({
  afterSuccess = () => {},
  data,
  all,
}) {
  const [pendingImages, setPendingImages] = useState([]);
  const [pendingVideos, setPendingVideos] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  const [setAllVideos, setAllImages] = all;

  const [videos, setVideos] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFile] = useState([]);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  setAllImages(images);
  setAllVideos(videos);

 

  const imageInputRef = useRef({});
  const videoInputRef = useRef({});
  const thumbnailInputRef = useRef([]);

  const dispatch = useDispatch();
  const { instituteDetails } = useSelector(authSelector);

  const refetch = () => {
    dispatch(getInstituteDetails());
  };

  useEffect(() => {
    if (instituteDetails) {
      setExistingImages(instituteDetails?.images);
      setExistingVideos(instituteDetails?.videos);
      // pending Requests ==>>
      setPendingImages(instituteDetails.updatedRequest?.images);
      setPendingVideos(instituteDetails.updatedRequest?.videos);
    }
  }, [instituteDetails]);

  useEffect(() => {
    if (data) {
      if (data?.updatedRequest?.images) {
        setImages(data?.updatedRequest?.images);
      }
      if (data?.updatedRequest?.videos) {
        setVideos(data?.updatedRequest?.videos);
      }
      if (data?.videos && !data?.updatedRequest?.videos) {
        setVideos(data?.videos);
        var sorted_meetings = data?.videos.map((a) => a.thumbnail);
        setThumbnails(sorted_meetings);
     
      }

      if (data.images && !data?.updatedRequest?.images) {
        setImages(data?.images);
      }
    }
  }, [data]);



  const uploadVideos = async () => {
    const uploading = toast.loading("Uploading Please wait ...");
    try {
      let videosUploaded = await FileUploader(videoFiles,(percent) => dispatch(updatePercentage(percent)));
      let thumbnailsUploaded = await FileUploader(thumbnailFiles,(percent) => dispatch(updatePercentage(percent)));

      const videos = videosUploaded.map((item, index) => {
        return {
          thumbnail: thumbnailsUploaded[index],
          video: item,
        };
      });
      const formBody = new FormData();
      formBody.append(
        "id",

        typeof window !== "undefined" &&
          window.localStorage.getItem("INSTITUTE_ID")
      );
      formBody.append(
        "updates",
        JSON.stringify({
          videos,
        })
      );

      await axios.patch(`${host}/institute/update`, formBody, {
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
      toast.remove(uploading);
    }
  };

  const [videoUpload, setVideoUpload] = useState(true);
  const [imageUpload, setImageUpload] = useState(true);

  const handleUploadImages = async () => {
    const imageUploadStarted = toast.loading("Uploading please wait ...");
    let images = await FileUploader(imageFiles,(percent) => dispatch(updatePercentage(percent)));


    const formBody = new FormData();
    formBody.append(
      "id",
      typeof window !== "undefined" &&
        window.localStorage.getItem("INSTITUTE_ID")
    );
    formBody.append(
      "updates",
      JSON.stringify({
        images,
      })
    );

    try {
      await axios.patch(`${host}/institute/update`, formBody, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      toast.success("successfully uploaded. wait for admin approval.");
      refetch();
      afterSuccess();
    } catch (err) {
  
      toast.error("something went wrong !");
    } finally {
      toast.remove(imageUploadStarted);
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
      <section>
        {!isEmpty(existingVideos) && (
          <>
            <p> Existing Videos :</p>
            <div className="flex  items-center w-full space-x-4 flex-wrap my-2">
              {existingVideos.map((item, i) => (
                <div key={i} className=" aspect-video w-[300px]">
                  <video
                    // onContextMenu={(e) => e.preventDefault()}
                    controlsList="nodownload"
                    poster={`https://cdn.ostello.co.in/${item?.thumbnail?.url}`}
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
              ))}
            </div>
          </>
        )}
      </section>
      <section>
        {/* Video Section */}
        <div className="sm:w-5/12 w-full  px-6 py-2  mb-6      shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0">
          <p className="my-5 font-bold">Cover Video</p>

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
                      if (item.type.includes("video")) {
                        setVideoFiles((prv) => prv.concat([item]));
                        setVideos((prv) =>
                          prv.concat([URL.createObjectURL(item)])
                        );
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
              This would be considered as <br /> Institute's demo video
            </p>
          </div>
        </div>

        {videos.length > 0 && (
          <div className=" px-6 py-2 w-full  mb-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray ">
            <>
              {videos?.map((item, key) => {
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
                        setVideos(
                          videos.filter((item, index) => index !== key)
                        );
                        setThumbnails(
                          thumbnails.filter((item, index) => index !== key)
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
                        src={
                          !item?.video?.url
                            ? typeof item === "string"
                              ? item
                              : URL.createObjectURL(item)
                            : `https://cdn.ostello.co.in/${item?.video?.key}`
                        }
                        key={key}
                        type="video/mp4"
                        className="w-[300px] h-[200px]"
                      />
                    </div>

                    {thumbnails?.[key]?.length > 0 || item?.thumbnail ? (
                      <div className="h-full">
                        <p>Thumbnail: </p>
                        <img
                          className="w-[300px] h-[200px]"
                          src={
                            !item?.thumbnail?.url
                              ? thumbnails[key]
                              : `https://cdn.ostello.co.in/${item?.thumbnail?.key}`
                          }
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
                                      key !== thumbnails?.length
                                    ) {
                               
                                      alert(
                                        `Please choose ${
                                          thumbnails.length + 1
                                        } no. video thumbnail first !`
                                      );
                                    }
                                  }}
                                  size={30}
                                />
                                <input
                                  disabled={
                                    key !== 0 && key !== thumbnails?.length
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
                                        setThumbnails((prv) =>
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
            <div className=" w-full flex justify-center ">
              <button
                disabled={!videoUpload}
                onClick={() => {
                  uploadVideos();
                }}
                className=" px-5 py-2 my-5 text-white  bg-primary rounded-lg cursor-pointer select-none"
              >
                Upload Videos
              </button>
            </div>
          </div>
        )}
      </section>

      <section>
        {!isEmpty(existingImages) && (
          <>
            <p>Existing Images :</p>
            <div className="flex  items-center space-x-4 flex-wrap">
              {existingImages.map((item, i) => (
                <img
                  key={i}
                  className="w-20 lg:w-40"
                  src={item?.url}
                  alt={item?.key}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        {/* Image Section */}
        <div className="sm:w-5/12 w-full  px-6 py-2  my-6 lg:mb-0     shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0">
          <p className="my-5 font-bold">Cover Image</p>

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
                    const filesArray = Array.from(e.target.files);
                    filesArray.forEach((item) => {
                      if (item.type.includes("image")) {
                        setImageFile((prv) => prv.concat([item]));
                        setImages((prv) =>
                          prv.concat([URL.createObjectURL(item)])
                        );
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
        {images.length > 0 && (
          <div className=" px-6 py-2 w-full  my-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray">
            <div className="flex items-center flex-wrap">
              {images?.map((item, index) => (
                <div
                  key={index}
                  className="border border-dashed w-fit m-2 relative"
                >
                  <CloseOutlined
                    onClick={() => {
                      setImages(images.filter((item, idx) => idx !== index));
                      setImageFile(images.filter((item, idx) => idx !== index));
                    }}
                    className="text-[#FF0000] absolute right-2 top-2 hover:scale-125"
                  />

                  <img
                    src={
                      !item?.url
                        ? item
                        : `https://cdn.ostello.co.in/${item?.key}`
                    }
                    key={index}
                    className="w-60 h-40  border-dashed "
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className=" w-full flex justify-center ">
              <button
                disabled={!imageUpload}
                onClick={() => {
                  handleUploadImages();
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
          </div>
        )}
      </section>
    </div>
  );
}
