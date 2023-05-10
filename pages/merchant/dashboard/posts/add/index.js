import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddImageIcon, CrossIcon } from "../../../../../components/Icons";
import {
  isEmpty,
  isJsonParsable,
  readingTime,
  FileUploader,
  titleToUrl,
} from "../../../../../utils/utils";
import { useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";
import {
  authSelector,
  getInstituteDetails,
  getUser,
  updatePercentage,
  uploadingStarted,
} from "../../../../../redux/slices/authSlice";
import ToggleDashboard from "../../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import DashboardSidebar from "../../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import axios from "axios";
import { host } from "../../../../../utils/constant";
import { Box, LinearProgress, Typography } from "@mui/material";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const config = {
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "symbol",
    "fullsize",
    "print",
    "about",
  ],
  placeholder: "Blog Description Here*",
  width: "100%",
  height: 350,
  maxHeight: 500,
  toolbarStickyOffset: 100,
};

const lang = {
  code: "en",
  toolbar: {
    default: "Default",
    save: "Save",
    font: "Font",
    formats: "Formats",
    fontSize: "Size",
    bold: "Bold",
    underline: "Underline",
    italic: "Italic",
    strike: "Strike",
    subscript: "Subscript",
    superscript: "Superscript",
    removeFormat: "Remove Format",
    fontColor: "Font Color",
    hiliteColor: "Highlight Color",
    indent: "Indent",
    outdent: "Outdent",
    align: "Align",
    alignLeft: "Align left",
    alignRight: "Align right",
    alignCenter: "Align center",
    alignJustify: "Align justify",
    list: "List",
    orderList: "Ordered list",
    unorderList: "Unordered list",
    horizontalRule: "Horizontal line",
    hr_solid: "Solid",
    hr_dotted: "Dotted",
    hr_dashed: "Dashed",
    table: "Table",
    link: "Link",
    math: "Math",
    image: "Image",
    video: "Video",
    audio: "Audio",
    fullScreen: "Full screen",
    showBlocks: "Show blocks",
    codeView: "Code view",
    undo: "Undo",
    redo: "Redo",
    preview: "Preview",
    print: "print",
    tag_p: "Paragraph",
    tag_div: "Normal (DIV)",
    tag_h: "Header",
    tag_blockquote: "Quote",
    tag_pre: "Code",
    template: "Template",
    lineHeight: "Line height",
    paragraphStyle: "Paragraph style",
    textStyle: "Text style",
    imageGallery: "Image gallery",
    mention: "Mention",
  },
  dialogBox: {
    linkBox: {
      title: "Insert Link",
      url: "URL to link",
      text: "Text to display",
      newWindowCheck: "Open in new window",
      downloadLinkCheck: "Download link",
      bookmark: "Bookmark",
    },
    mathBox: {
      title: "Math",
      inputLabel: "Mathematical Notation",
      fontSizeLabel: "Font Size",
      previewLabel: "Preview",
    },
    imageBox: {
      title: "Insert image",
      file: "Select from files",
      url: "Image URL",
      altText: "Alternative text",
    },
    videoBox: {
      title: "Insert Video",
      file: "Select from files",
      url: "Media embed URL, YouTube/Vimeo",
    },
    audioBox: {
      title: "Insert Audio",
      file: "Select from files",
      url: "Audio URL",
    },
    browser: {
      tags: "Tags",
      search: "Search",
    },
    caption: "Insert description",
    close: "Close",
    submitButton: "Submit",
    revertButton: "Revert",
    proportion: "Constrain proportions",
    basic: "Basic",
    left: "Left",
    right: "Right",
    center: "Center",
    width: "Width",
    height: "Height",
    size: "Size",
    ratio: "Ratio",
  },
  controller: {
    edit: "Edit",
    unlink: "Unlink",
    remove: "Remove",
    insertRowAbove: "Insert row above",
    insertRowBelow: "Insert row below",
    deleteRow: "Delete row",
    insertColumnBefore: "Insert column before",
    insertColumnAfter: "Insert column after",
    deleteColumn: "Delete column",
    fixedColumnWidth: "Fixed column width",
    resize100: "Resize 100%",
    resize75: "Resize 75%",
    resize50: "Resize 50%",
    resize25: "Resize 25%",
    autoSize: "Auto size",
    mirrorHorizontal: "Mirror, Horizontal",
    mirrorVertical: "Mirror, Vertical",
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    maxSize: "Max size",
    minSize: "Min size",
    tableHeader: "Table header",
    mergeCells: "Merge cells",
    splitCells: "Split Cells",
    HorizontalSplit: "Horizontal split",
    VerticalSplit: "Vertical split",
  },
  menu: {
    spaced: "Spaced",
    bordered: "Bordered",
    neon: "Neon",
    translucent: "Translucent",
    shadow: "Shadow",
    code: "Code",
  },
};

const AddPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [desc, setDesc] = useState("");
  const [content, setContent] = useState();

  const [title, setTitle] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("programming");
  const [videoUpload, setVideoUpload] = useState("video");

  const [subTitle, setSubTitle] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [subImages, setSubImages] = useState("");

  const [slugLink, setSlugLink] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const { instituteDetails, addUserData, userData, loading, percentage } =
    useSelector(authSelector);

  const [uploading, setUploading] = useState(false);

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
  }, [router]);

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

  const editor = useRef(null);
  const getValue = (value) => {
    setDesc(value);
  };

  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
  ];

  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();

  useEffect(() => {
    dispatch(getUser());
    if (userData) {
      setAuthorName(userData?.name);
    }
  }, []);

  const [selectedSubImages, setSelectedSubImages] = useState([]);
  const [subImage, setSubImage] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);

  const onSubSelectFile = (e) => {
    const selectedFiles = e.target.files[0];
    setSubImage(selectedFiles);
    setSelectedSubImages(URL.createObjectURL(selectedFiles));
  };

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
    setSelectedImage(URL.createObjectURL(selectedFiles));
  };

  const onSelectVideoFile = (e) => {
    const selectedFiles = e.target.files[0];
    setYoutubeVideoLink("");
    setVideo(selectedFiles);
    setSelectedVideo(URL.createObjectURL(selectedFiles));
  };

  const onSelectedThumbnails = (e) => {
    const selectedFiles = e.target.files[0];
    setThumbnails(selectedFiles);
    setSelectedThumbnails(URL.createObjectURL(selectedFiles));
  };

  const handleAddBlog = async () => {
    if (!title) {
      setError("Please Fill Title");
      toast.error("Please Fill Title");
      return;
    }

    if (!image.name && !video?.name && !youtubeVideoLink) {
      setError("Please Add Image or Videos");
      toast.error("Please Add Image or Videos");
      return;
    }
    setError("");

    if (video.name || youtubeVideoLink) {
      if (!thumbnails.name) {
        toast.error("Please Add Thumbnail");
        return;
      }
    }

    const readTime = readingTime(desc).toString();
    const saving = toast.loading("Saving...");

    let images = null;
    if (image) {
      images = await FileUploader([image], (percent) =>
        dispatch(updatePercentage(percent))
      );
    }

    let videos = null;

    if (video) {
      videos = await FileUploader([video], (percent) =>
        dispatch(updatePercentage(percent))
      );
    }

    let thumbnail = null;
    if (thumbnails) {
      thumbnail = await FileUploader([thumbnails], (percent) =>
        dispatch(updatePercentage(percent))
      );
    }

    let postData = {
      readtime: `${readTime} minutes`,
      instituteid: instituteDetails?.id,
      slugurl: slugLink,
    };

    if (title) {
      postData.title = title;
    }
    if (category) {
      postData.category = category;
    }

    if (images) {
      postData.images = images;
    }
    if (videos) {
      postData.videos = {
        video: videos,
      };
    }
    if (thumbnail && videos) {
      postData.videos = [
        {
          video: videos[0],
          thumbnail: thumbnail[0],
        },
      ];
    }
    if (youtubeVideoLink) {
      postData.videos = [
        {
          video: {
            url: youtubeVideoLink,
          },
          thumbnail: thumbnail[0],
        },
      ];
    }
    if (desc) {
      postData.description = desc;
    }

    try {
      //   dispatch(adminAddBlog(data));
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };

      const { data } = await axios.post(`${host}/blog`, postData, config);
      toast.success("Successfully  post posted !");
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.remove(saving);
      setUploading(false);
      setTimeout(() => {
        router.push("/merchant/dashboard/posts/");
      }, 2000);
    }
  };

  const [isPreview, setIsPreview] = useState(false);

  const imageUploadHandle = async (files, info, core, uploadHandler) => {
    try {
      const src = await FileUploader(files, (percent) =>
        dispatch(updatePercentage(percent))
      );
      let response;

      if (src.length) {
        response = {
          result: [
            {
              url: `https://cdn.ostello.co.in/${src[0].key}`,
              name: files[0].name,
              size: files[0].size,
            },
          ],
        };
      }
      uploadHandler(response);
    } catch (err) {
      uploadHandler(err.toString());
    }

    return undefined;
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const [fileType, setFileType] = useState("image");

  return (
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
          <>
            <div className="md:px-[30px] px-2 pt-4 pb-16 ">
              <p className="mb-2 text-[20px]">Add Post</p>
              <div className="flex flex-col space-y-3">
                {error && <div className="text-[#FF0000]-500">{error}</div>}
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlugLink(titleToUrl(e.target.value));
                  }}
                  type="text"
                  className="w-full py-2 outline-none md:px-6 px-2 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                  placeholder="Enter Post title*"
                />

                {/* <textarea
                  className="w-full md:px-6 px-2 bg-[#FAFAFA] py-1 outline-none border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                  placeholder="Meta Short Description Here*"
                  onChange={(e) => setShortDesc(e.target.value)}
                  rows="5"
                ></textarea> */}
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full md:px-6 px-2 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                >
                  <option value="programming">Programming </option>
                  <option value="education">Education </option>
                  <option value="courses">Courses </option>
                  <option value="behind the curtains">
                    Behind the Curtains{" "}
                  </option>
                  <option value="engineering">Engineering </option>
                  <option value="medical">Medical</option>
                  <option value="marketing">Marketing</option>
                  <option value="career">Career</option>
                  <option value="trends">Trends</option>
                </select>

                <select
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full md:px-6 px-2 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                >
                  <option value="image">Image </option>
                  <option value="video">Video </option>
                </select>

                {fileType === "image" ? (
                  <div className="relative w-full p-3 border-2 text-[#A8A8A8] h-[200px] overflow-hidden rounded-lg border-[#A4A4A4]">
                    <label>
                      {!selectedImage ? (
                        <div className="h-full">
                          <p className="h-[10%]">Add cover image*</p>
                          <div className="h-[90%] flex justify-center items-center flex-col">
                            <AddImageIcon />
                            <p className="text-[20px]">Add Image</p>
                          </div>
                          <input
                            onChange={onSelectFile}
                            accept="image/*"
                            type="file"
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            className="w-full h-[180px] shadow-sm rounded-3xl object-cover"
                            src={selectedImage}
                            alt=""
                          />
                        </div>
                      )}
                    </label>
                    {selectedImage && (
                      <button
                        className="absolute top-6 w-[30px] right-6 "
                        onClick={() => setSelectedImage(null)}
                      >
                        <CrossIcon className="w-full" />
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <select
                      onChange={(e) => setVideoUpload(e.target.value)}
                      className="w-full md:px-6 px-2 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                    >
                      <option value="video">Video Upload </option>
                      <option value="youtube">Youtube Video Link </option>
                    </select>

                    {videoUpload === "video" ? (
                      <div className="relative  w-full p-3 border-2 text-[#A8A8A8] md:h-[200px] h-full overflow-hidden rounded-lg border-[#A4A4A4]">
                        {!selectedVideo ? (
                          <label>
                            <div className=" h-[200px]">
                              <p className="h-[10%]">Add Video*</p>
                              <div className="h-[90%] flex justify-center items-center flex-col">
                                <AddImageIcon />
                                <p className="text-[20px]">Add Video</p>
                              </div>
                              <input
                                onChange={onSelectVideoFile}
                                accept="video/*"
                                type="file"
                                className="hidden"
                              />
                            </div>
                          </label>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-2">
                            <div className="relative">
                              <video
                                className="w-full h-[180px] shadow-sm rounded-3xl object-cover"
                                src={selectedVideo}
                                alt=""
                              />

                              <button
                                className="absolute top-6 w-[30px] right-6 "
                                onClick={() => setSelectedVideo(null)}
                              >
                                <CrossIcon className="w-full" />
                              </button>
                            </div>

                            {!selectedThumbnails.length ? (
                              <label>
                                <div className="md-h-full h-[200px]">
                                  <p className="h-[10%]">Add Thumbnails*</p>
                                  <div className="h-[90%] flex justify-center items-center flex-col">
                                    <AddImageIcon />
                                    <p className="text-[20px]">
                                      Add Thumbnails
                                    </p>
                                  </div>
                                  <input
                                    onChange={onSelectedThumbnails}
                                    accept="image/*"
                                    type="file"
                                    className="hidden"
                                  />
                                </div>
                              </label>
                            ) : (
                              <div className="relative">
                                <img
                                  className="w-full h-[180px] shadow-sm rounded-3xl object-cover"
                                  src={selectedThumbnails}
                                  alt=""
                                />

                                <button
                                  className="absolute top-6 w-[30px] right-6 "
                                  onClick={() => setSelectedThumbnails([])}
                                >
                                  <CrossIcon className="w-full" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* {selectedVideo && (
                      <button
                        className="absolute top-6 w-[30px] right-6 "
                        onClick={() => setSelectedVideo(null)}
                      >
                        <CrossIcon className="w-full" />
                      </button>
                    )} */}
                      </div>
                    ) : (
                      <div>
                        <input
                          onChange={(e) => {
                            setYoutubeVideoLink(e.target.value);
                            setVideo("");
                          }}
                          type="text"
                          className="w-full py-2 outline-none md:px-6 px-2 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                          placeholder="Enter Youtube Video Link*"
                        />
                        <div className="relative w-full mt-3 p-3 border-2 text-[#A8A8A8] h-[200px] overflow-hidden rounded-lg border-[#A4A4A4]">
                          {!selectedThumbnails.length ? (
                            <label>
                              <div className="h-full">
                                <p className="h-[10%]">Add Thumbnails*</p>
                                <div className="h-[90%] flex justify-center items-center flex-col">
                                  <AddImageIcon />
                                  <p className="text-[20px]">Add Thumbnails</p>
                                </div>
                                <input
                                  onChange={onSelectedThumbnails}
                                  accept="image/*"
                                  type="file"
                                  className="hidden"
                                />
                              </div>
                            </label>
                          ) : (
                            <div className="relative">
                              <img
                                className="w-full h-[180px] shadow-sm rounded-3xl object-cover"
                                src={selectedThumbnails}
                                alt=""
                              />

                              <button
                                className="absolute top-6 w-[30px] right-6 "
                                onClick={() => setSelectedThumbnails([])}
                              >
                                <CrossIcon className="w-full" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

               
                <SunEditor
                  onChange={(content) => {
                    getValue(content);

                    // 
                    //   content
                    // );
                  }}
                  onImageUploadBefore={(files, info, core, uploadHandler) => {
                    imageUploadHandle(files, info, core, uploadHandler);
                  }}
                  setContents={desc}
                  placeholder="Post description"
                  setOptions={{
                    buttonList: [
                      ["undo", "redo"],
                      ["font", "fontSize"],
                      ["paragraphStyle", "blockquote", "formatBlock"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["fontColor", "hiliteColor"],
                      ["align", "list", "lineHeight"],
                      ["outdent", "indent"],

                      ["table", "horizontalRule", "link", "image", "video"],
                      ["fullScreen", "showBlocks", "codeView"],
                      ["preview", "print"],
                      ["removeFormat"],
                    ],
                    formats: ["p", "blockquote", "h1", "h2", "h3"],

                    defaultTag: "div",
                    minHeight: "400px",
                    showPathLabel: false,
                    font: sortedFontOptions,
                  }}
                />
                {/* 
                <input
                  onChange={(e) => {
                    setSubTitle(e.target.value);
                  }}
                  type="text"
                  className="w-full py-2 outline-none md:px-6 px-2 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                  placeholder="Enter Post Sub  title"
                />

                <SunEditor
                  onChange={(content) => {
                    setSubDescription(content);
                  }}
                  onImageUploadBefore={(files, info, uploadHandler) => {
                    imageUploadHandle(files, info, uploadHandler);
                  }}
                  setContents={subDescription}
                  placeholder="Sub description"
                  setOptions={{
                    buttonList: [
                      ["undo", "redo"],
                      ["font", "fontSize"],
                      ["paragraphStyle", "blockquote", "formatBlock"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["fontColor", "hiliteColor"],
                      ["align", "list", "lineHeight"],
                      ["outdent", "indent"],

                      ["table", "horizontalRule", "link", "image", "video"],
                      ["fullScreen", "showBlocks", "codeView"],
                      ["preview", "print"],
                      ["removeFormat"],
                    ],
                    formats: ["p", "blockquote", "h1", "h2", "h3"],

                    defaultTag: "div",
                    minHeight: "200px",
                    showPathLabel: false,
                    font: sortedFontOptions,
                  }}
                />

                <div className="relative w-full p-3 border-2 text-[#A8A8A8] h-[200px] overflow-hidden rounded-lg border-[#A4A4A4]">
                  <label>
                    <div className="h-full">
                      <p className="h-[10%]">Add Sub  Images</p>
                      <div className="h-[90%] flex justify-center items-center flex-col">
                        <AddImageIcon />
                        <p className="text-[20px]">Add Sub  Images</p>
                      </div>
                      <input
                        multiple
                        onChange={(e) => {
                          Array.from(e.target.files).forEach((item) => {
                            if (item.type.includes("image")) {
                              setSelectedSubImages((prv) => prv.concat([item]));
                            }
                          });
                        }}
                        accept="image/*"
                        type="file"
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>

                {selectedSubImages?.length > 0 && (
                  <div className=" md:px-6 px-2 py-2 w-full  mb-6 lg:mb-0  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray">
                    <div className="flex items-center flex-wrap">
                      {selectedSubImages?.map((item, index) => (
                        <div
                          key={index}
                          className="border border-dashed w-fit m-2 relative"
                        >
                          <CloseOutlined
                            onClick={() => {
                              setSelectedSubImages(
                                selectedSubImages.filter((item, idx) => idx !== index)
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
                   
                  </div>
                )} */}

                {uploading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                ) : (
                  <div className="md:flex justify-center mt-5 space-x-5">
                    <button
                      onClick={() => {
                        handleAddBlog();
                        setUploading(true);
                      }}
                      className="md:px-12 px-5 font-bold rounded-lg py-2 text-white bg-[#7D23E0]"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => router.push("/merchant/dashboard/posts")}
                      className="md:px-12 px-5 font-bold rounded-lg py-2 text-white bg-[#E46060]"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
