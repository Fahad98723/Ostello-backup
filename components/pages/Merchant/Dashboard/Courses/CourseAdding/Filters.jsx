import React, { useEffect, useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
  getUser,
  updatePercentage,
  uploadingEnded,
  uploadingStarted,
} from "../../../../../../redux/slices/authSlice";
import VideoPlayer from "../../../../../VideoPlayer";
import {
  addCourseSelector,
  addSelectedImage,
  addSelectedVideo,
} from "../../../../../../redux/slices/AddCourseSlice";
import { Box, LinearProgress, Typography } from "@mui/material";
import { isEmpty } from "../../../../../utils";
import { FileUploader } from "../../../../../../utils/utils";
export default function Filters({
  proceedState2,
  courseData,
  setPage2 = () => {},
  setIsSyllabus = () => {},
  isSyllabus,
  setPage1 = () => {},
  setTrack1 = () => {},
}) {
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  const [, setProceed3] = proceedState2;

  const {
    basicDetails,
    additionalDescription,
    coursePrice,
    selectedImages,
    selectedVideos,
    syllabusDescription,
    thumbnails,
  } = useSelector(addCourseSelector);

  const [selectedImage, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideos] = useState([]);

  const [videoFiles, setVideoFiles] = useState([]);
  const [imageFiles, setImageFile] = useState([]);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const imageInputRef = useRef({});
  const videoInputRef = useRef({});
  const thumbnailInputRef = useRef([]);

  const dispatch = useDispatch();
  // const { instituteDetails } = useSelector(authSelector);

  const { userData, instituteDetails, percentage, isUploading } =
    useSelector(authSelector);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    if (userData?.usertype === 1) {
      setAdmin(true);
    }
  }, [dispatch]);

  const refetch = () => {
    // dispatch(addSelectedImage(selectedImage))
    // dispatch(addSelectedVideo(selectedVideo))
  };

  useEffect(() => {
    dispatch(addSelectedImage(existingImages));
  }, [existingImages, dispatch]);

  useEffect(() => {
    dispatch(addSelectedVideo(existingVideos));
  }, [existingVideos, dispatch]);

  useEffect(() => {
    setExistingImages(selectedImages);
    setExistingVideos(selectedVideos);
  }, [selectedVideo, selectedImage]);

  useEffect(() => {
    if (courseData && !selectedImages.length) {
      if (admin) {
        if (courseData.images && !courseData?.updatedRequest?.images) {
          setExistingImages(...[courseData?.images]);
        }
        if (courseData?.updatedRequest?.images) {
          setExistingImages(...[courseData?.updatedRequest?.images]);
        }
      }
      if (!admin) {
        setExistingImages(...[courseData?.images]);
      }
    }
    if (courseData && !selectedVideos.length) {
      if (admin) {
        if (courseData.videos && !courseData?.updatedRequest?.videos) {
          setExistingVideos(...[courseData?.videos]);
        }
        if (courseData?.updatedRequest?.videos) {
          setExistingVideos(...[courseData?.updatedRequest?.videos]);
        }
      }
      if (!admin) {
        setExistingVideos(...[courseData?.videos]);
      }
    }

    if (selectedImages.length) {
      if (!existingImages.length) {
        setExistingImages(selectedImages);
      }
    }
    if (selectedVideos.length) {
      if (!existingVideos.length) {
        setExistingVideos(selectedVideos);
      }
    }
  }, [courseData, admin]);

  useEffect(() => {
    if (courseData) {
      dispatch(addSelectedImage(existingImages));
      dispatch(addSelectedVideo(existingVideos));
    }
  }, [courseData, existingImages, existingVideos]);

  useEffect(() => {
    if (existingImages.length) {
      dispatch(addSelectedImage(existingImages));
    }
    if (existingVideos.length) {
      dispatch(addSelectedVideo(existingVideos));
    }
  }, [existingImages, existingVideos]);

  const uploadVideos = async () => {
    const uploading = toast.loading("Uploading Please wait ...");
    try {
      dispatch(uploadingStarted());

      const videosUploaded = await FileUploader(videoFiles,(percent) => dispatch(updatePercentage(percent)));
      const thumbnailsUploaded = await FileUploader(thumbnailFiles,(percent) => dispatch(updatePercentage(percent)));

      const videos = videosUploaded.map((item, index) => {
        return {
          thumbnail: thumbnailsUploaded[index],
          video: item,
        };
      });

      toast.success("Successfully Uploaded");
      setExistingVideos(existingVideos.concat(videos));
      setVideoFiles([]);
      setThumbnailFiles([]);
      setThumbnail([]);
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      toast.remove(uploading);
      setVideoFiles([]);
      dispatch(uploadingEnded());
    }
  };

  const [videoUpload, setVideoUpload] = useState(true);
  const [imageUpload, setImageUpload] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);

  const handleUploadImages = async () => {
    const imageUploadStarted = toast.loading("Uploading please wait ...");

    try {
      dispatch(uploadingStarted());

      const images = await FileUploader(imageFiles,(percent) => dispatch(updatePercentage(percent)));
      

      toast.success("successfully uploaded");
      setExistingImages(existingImages.concat(images));
      // dispatch(addSelectedImage(images))

      // refetch();
    } catch (err) {
      
      toast.error("something went wrong !");
    } finally {
      toast.remove(imageUploadStarted);
      setImageUploading(false);
      dispatch(uploadingEnded());
      setImageFile([]);
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
    <div className="py-5">
      <section>
        {!isEmpty(existingVideos) && (
          <>
            <p> Videos :</p>
            <div className="flex  items-center w-full space-x-4 flex-wrap my-2">
              {existingVideos?.map((item, i) => (
                <div
                  key={i}
                  className="border border-dashed w-fit m-2 relative"
                >
                  <CloseOutlined
                    onClick={async () => {
                      const videos = existingVideos.filter(
                        (video) => video.video.key !== item.video.key
                      );
                      try {
                        toast.success("Successfully Deleted");
                        // refetch();
                        
                        setExistingVideos(videos);
                        dispatch(addSelectedVideo(videos));
                      } catch {
                        toast.error("got an error !");
                      } finally {
                      }
                    }}
                    className="text-[#FF0000] absolute right-1 top-1 hover:scale-125"
                  />
                  <div className="border border-dashed w-fit m-5">
                    <div className=" aspect-video w-[300px]">
                      <video
                        // onContextMenu={(e) => e.preventDefault()}
                        controlsList="nodownload"
                        poster={`https://cdn.ostello.co.in/${item.thumbnail.key}`}
                        // onClick={onVideoClick}
                        style={{ width: "100%", marginTop: "0px" }}
                        // playsInline
                        // webkit-playsInline
                        // loop
                        muted
                        // preload="true"
                        controls
                        // alt="Ostello"
                        src={`https://cdn.ostello.co.in/${item.video.key}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                      if (item.type.includes("video")) {
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
          <div className=" px-6 py-2 w-full  my-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray ">
            <>
              {videoFiles?.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="flex w-full items-center justify-between space-x-2  border border-dashed my-2 p-5 relative"
                  >
                    <CloseOutlined
                      onClick={() => {
                        setVideoFiles(
                          videoFiles.filter((item, index) => index !== key)
                        );

                        setThumbnail(
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
                          src={thumbnail[key]}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="w-[300px] h-[200px] ">
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

      <section className="my-5">
        {!isEmpty(existingImages) && (
          <>
            <p>Images :</p>
            <div className="flex  items-center space-x-4 flex-wrap">
              {existingImages?.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-dashed w-fit m-2 relative"
                >
                  <CloseOutlined
                    onClick={async () => {
                      const images = existingImages.filter(
                        (image) => image.key !== item.key
                      );

                      try {
                        toast.success("Successfully Deleted");
                        // refetch();
                        
                        setExistingImages(images);
                        dispatch(addSelectedImage(images));
                      } catch {
                        toast.error("got an error !");
                      } finally {
                      }
                    }}
                    className="text-[#FF0000] absolute right-2 top-2 hover:scale-125"
                  />
                  <img
                    src={`https://cdn.ostello.co.in/${item.key}`}
                    key={item.key}
                    className="w-60 h-40  border-dashed "
                    alt=""
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="my-5">
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
          <div className=" px-6 py-2 w-full  my-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray">
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
        <button
          className="text-white bg-primary w-44 py-3 mt-5 rounded-lg  "
          onClick={() => {
            setProceed3(true);
            setPage2(true);
            setPage1(false);
            setTrack1(true);

            setIsSyllabus(true);
          }}
        >
          Save and Continue
        </button>
      </section>
    </div>
  );
}

// import React, { useState, useEffect, Fragment, useRef } from 'react'
// import { MdAddPhotoAlternate } from 'react-icons/md'
// import { IoIosClose } from 'react-icons/io'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   addCourseSelector,
//   addSelectedImage,
//   addSelectedVideo,
//   addThumbnails,
// } from '../../redux/slices/AddCourseSlice'
// import { CloseOutlined } from '@ant-design/icons'

// const Filters = ({ proceedState2, courseData , setPage2, setIsSyllabus,isSyllabus, setIsFilters, isFilters,
//   setPage1,
//   setTrack1}) => {
//   const dispatch = useDispatch()
//   const [, setProceed3] = proceedState2
//   const [selectedImage, setSelectedImages] = useState([])
//   const [selectedVideo, setSelectedVideos] = useState([])
//   const [thumbnail, setThumbnails] = useState([])

//   const imageInputRef = useRef({})
//   const videoInputRef = useRef({})
//   const thumbnailInputRef = useRef([])
//   const [previewFile, setPreviewFile] = useState('')
//   const [isDelete, setIsDelete] = useState(false)

//   const [viewAllPhoto, setViewAllPhoto] = useState(false)
//   const addCourseReduxState = useSelector(addCourseSelector)

//   const {thumbnails, selectedVideos, selectedImages} = useSelector(addCourseSelector)

//   useEffect(() => {
//     if(courseData){
//       setSelectedImages(...[courseData?.images])
//       setSelectedVideos(...[courseData?.videos])
//       setThumbnails(...[courseData?.videos?.map(t => t.thumbnail)])
//     }
//    if(!courseData){
//     if(selectedImages){
//       setSelectedImages(selectedImages)
//     }
//     if(selectedVideos){
//       setSelectedVideos(selectedVideos)
//     }
//     if(thumbnails){
//       setThumbnails(thumbnails)
//     }
//    }

//   },[courseData])

//   

//   useEffect(() => {
//     dispatch(addSelectedImage(selectedImage))
//   }, [selectedImage, dispatch])

//   useEffect(() => {
//     dispatch(addSelectedVideo(selectedVideo))
//   }, [selectedVideo, dispatch])

//   useEffect(() => {
//     dispatch(addThumbnails(thumbnail))
//   }, [thumbnail, dispatch])

//   const imageHandleChange = async (e) => {
//     if (e.target.files) {
//       const fileArray = Array.from(e.target.files)

//       setSelectedImages((prev) => {
//         const temp = []

//         prev?.forEach((img) => temp?.push(img))
//         fileArray.forEach((file) => temp.push(file))

//         return temp
//       })
//     }
//   }

//   const videoChangeHandle = (e) => {
//     if (e.target.files) {
//       const fileArray = Array?.from(e.target.files)
//       setSelectedVideos((prev) => prev?.concat(fileArray))
//     }
//   }
//   
//   return (
//     <Fragment>
//       {viewAllPhoto && (
//         <>
//           {selectedImage?.map((item, index) => (
//             <div
//               key={index}
//               className=' absolute z-50 w-screen h-screen  '
//               style={{ background: 'rgba(0, 0, 0, 0.3)' }}
//             >
//               <img
//                 src={URL.createObjectURL(item)}
//                 alt='Rendering Media Images'
//                 className=' w-max'
//                 style={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%,-50%)',
//                 }}
//               />
//               <div className='flex flex-wrap justify-center relative w-screen  h-max gap-10  p-20 pb-20 pt-20 lg:pl-10'>
//                 <IoIosClose
//                   className='text-white w-7 h-7 bg-black rounded-full absolute right-10 top-0 mr-20 mt-8 text-3xl'
//                   onClick={() => {
//                     setViewAllPhoto(!viewAllPhoto)
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//       <div className='flex flex-col lg:w-9/12 w-12/12 '>
//         <h1 className=' hidden lg:flex text-2xl  space-x-2  items-center mt-4  font-dm-sans font-bold'>
//           Images & Videos
//         </h1>

//         <div className='flex flex-col w-full  lg:flex-row lg:space-x-10 lg:mt-10'>
//           <div
//             className={`w-9/12   px-6 py-2  mb-6 lg:mb-0  rounded-xl text-base font-normal text-slate bg-white bg-clip-padding  border-2 border-solid ease-in-out m-0 `}
//           >
//             <h1 className='font-bold text-lg text-medium-white   py-4'>
//               Add images*
//             </h1>
//             <div className='border border-[#B9B9B9] z-0 h-28 w-full lg:my-3 relative rounded-lg'>
//               <MdAddPhotoAlternate
//                 className='text-3xl   mb-auto'
//                 style={{
//                   position: 'absolute',
//                   transform: 'translate(-50%,-50%)',
//                   top: '50%',
//                   left: '50%',
//                 }}
//                 onClick={() => {
//                   imageInputRef.current.click()
//                 }}
//               />
//               <input
//                 ref={imageInputRef}
//                 type='file'
//                 multiple
//                 id='myFile1'
//                 name='file'
//                 className='hidden'
//                 accept='image/*'
//                 onChange={imageHandleChange}
//               />
//             </div>
//           </div>

//           <div
//             className={`w-full h-auto px-6 py-4 lg:py-0   relative -z-0 rounded-xl text-base font-normal text-slate bg-white border-2 border-solid m-0 `}
//           >
//             <div className='grid grid-cols-4 gap-3 py-4'>
//               {selectedImage?.map((item, key) => {
//                 return (
//                   <div
//                     key={key}
//                     className={`relative ${isDelete ? 'hidden' : 'block'}`}
//                   >
//                     <img
//                       src={item.url || URL.createObjectURL(item)}
//                       key={key}
//                       alt='Media Preview '
//                       className='w-28 relative'
//                       onClick={(e) => {
//
//                         setPreviewFile(e.target.src)
//                         setViewAllPhoto(!viewAllPhoto)
//                       }}
//                     />

//                     <IoIosClose
//                       className='text-white w-4 h-4 bg-black rounded-full absolute right-0 mt-1 mr-1 top-0  text-lg'
//                       onClick={(e) => {
//                         setSelectedImages((prv) =>
//                           prv.filter((itx) => item !== itx)
//                         )
//                       }}
//                     />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         <Fragment>
//           <div className='flex flex-col  space-y-5  my-5 '>
//             <div
//               className={`w-9/12 h-auto px-6  py-2 lg:py-0  z-0 rounded-xl text-base font-normal text-slate bg-white border-2 border-solid m-0`}
//             >
//               <h1 className='font-bold text-lg text-medium-white  py-4'>
//                 Add videos*
//               </h1>
//               <div className='border border-[#B9B9B9] h-28 w-full lg:my-3 relative rounded-lg'>
//                 <MdAddPhotoAlternate
//                   className='text-3xl   mb-auto'
//                   style={{
//                     position: 'absolute',
//                     transform: 'translate(-50%,-50%)',
//                     top: '50%',
//                     left: '50%',
//                   }}
//                   onClick={() => {
//                     videoInputRef.current.click()
//                   }}
//                 />
//                 <input
//                   ref={videoInputRef}
//                   type='file'
//                   multiple
//                   id='myFile'
//                   name='filename'
//                   accept='video/*'
//                   hidden
//                   onChange={videoChangeHandle}
//                 />
//               </div>
//             </div>

//             <div
//               className={`w-full ${
//                 selectedVideo?.length > 0 ? 'h-max' : 'h-auto'
//               }  py-8 px-6   relative -z-0 rounded-xl text-base font-normal text-slate bg-white border-2 border-solid
//                m-0`}
//             >
//               <div className=' flex  gap-3 flex-col justify-center items-center'>
//                 {selectedVideo?.map((item, key) => {
//                   if (key < 2)
//                     return (
//                       <div className='flex w-full items-center justify-between space-x-2 border border-dashed my-2 p-5 relative'>
//                         <CloseOutlined
//                           onClick={() => {
//                             
//                             setSelectedVideos((prv) =>
//                               prv.filter((itm) => itm !== item)
//                             )

//                             setThumbnails((prv) =>
//                               prv.filter((item, index) => index !== key)
//                             )
//                           }}
//                           className='text-[#FF0000] absolute right-2 top-2'
//                         />

//                         <div>
//                           <p>Video no : {key + 1}</p>
//                           <video
//                             controlsList='nodownload'
//                             controls
//                             src={
//                               item?.video?.url || URL.createObjectURL(item)
//                             }
//                             key={key}
//                             type='video/mp4'
//                             className='w-[300px] h-[200px]'
//                           />
//                         </div>

//                         {thumbnail?.[key] || item?.thumbnail  ? (
//                           <div className='h-full'>
//                             <p>Thumbnail:</p>
//                             <img
//                               className='w-[300px] h-[200px]'
//                               src={item?.thumbnail?.url ||URL.createObjectURL(thumbnail[key])}
//                               alt=''
//                             />
//                           </div>
//                         ) : (
//                           <div className='w-[300px] '>
//                             {/* Thumbnail Section */}
//                             <div className='  px-6 py-2       shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out'>
//                               <p className='my-2 font-bold'>Video Thumbnail</p>
//                               <div>
//                                 <div className='border h-10 w-full lg:my-3 relative rounded-lg flex items-center justify-center'>
//                                   <div>
//                                     <MdAddPhotoAlternate
//                                       onClick={() => {
//                                         thumbnailInputRef.current[key].click()
//                                         
//                                         if (
//                                           key !== 0 &&
//                                           key !== thumbnail?.length
//                                         ) {
//                                           
//                                           alert(
//                                             `Please choose ${
//                                               thumbnail?.length + 1
//                                             } no. video thumbnail first !`
//                                           )
//                                         }
//                                       }}
//                                       size={30}
//                                     />
//                                     <input
//                                       disabled={
//                                         key !== 0 && key !== thumbnail?.length
//                                       }
//                                       ref={(element) => {
//                                         thumbnailInputRef.current[key] = element
//                                       }}
//                                       onChange={(e) => {
//                                         let filesArray = Array.from(
//                                           e.target.files
//                                         )
//                                         setThumbnails((prv) =>
//                                           prv.concat(filesArray)
//                                         )
//                                       }}
//                                       type='file'
//                                       name='thumbnail'
//                                       hidden
//                                       accept='image/*'
//                                     />
//                                   </div>
//                                 </div>
//                                 <p className='text-center text-xs my-2'>
//                                   This image will be used as video thumbnail
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                       // <div className='relative'>
//                       //   <video controlsList="nodownload"
//                       //     controls
//                       //     src={URL.createObjectURL(item)}
//                       //     key={key}
//                       //     type='video/mp4'
//                       //     className='relative mt-auto w-36 h-full'
//                       //   />
//                       //   <IoIosClose
//                       //     className='text-white w-4 h-4 bg-black rounded-full absolute right-0 mt-1 mr-1 top-0  text-lg'
//                       //     onClick={(e) => {
//                       //       setSelectedVideos((prv) =>
//                       //         prv.filter((itm) => itm !== item)
//                       //       )
//                       //     }}
//                       //   />
//                       // </div>
//                     )
//                 })}
//               </div>
//             </div>
//           </div>
//         </Fragment>

//         <div className=' flex justify-end'>
//           <button
//             className='text-white bg-primary w-44 py-3 rounded-lg  '
//             onClick={() => {
//               setProceed3(true)
//               setPage2(true);
//               setPage1(false);
//               setTrack1(true);
//               setIsFilters(!isFilters);
//               setIsSyllabus(!isSyllabus);
//             }}
//           >
//             Save and Continue
//           </button>
//         </div>
//       </div>
//     </Fragment>
//   )
// }

// export default Filters
