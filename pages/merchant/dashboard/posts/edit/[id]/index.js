import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddImageIcon, CrossIcon } from "../../../../../../components/Icons";
import {
  isEmpty,
  isJsonParsable,
  readingTime,
  FileUploader,
  titleToUrl,
} from "../../../../../../utils/utils";
import { useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";
import {
  authSelector,
  getInstituteDetails,
  getUser,
  updatePercentage,
  uploadingEnded,
  uploadingStarted,
} from "../../../../../../redux/slices/authSlice";
import ToggleDashboard from "../../../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import DashboardSidebar from "../../../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import axios from "axios";
import { host } from "../../../../../../utils/constant";
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

const EditPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { instituteDetails, addUserData, userData, loading } =
    useSelector(authSelector);
  const [post, setPost] = useState({});

  useEffect(() => {
    if (router.query.id) {
      const run = async () => {
        try {
          const { data } = await axios.get(
            `${host}/blog?id=${router.query.id}`
          );
          setPost(data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [router.query.id]);

  const [desc, setDesc] = useState("");
  const [content, setContent] = useState();

  const [title, setTitle] = useState("");
  const [postImages, setPostImages] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("programming");
  const [timestamp, setTimestamp] = useState("");
  const [videoUpload, setVideoUpload] = useState("");

  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);

  const onSelectedThumbnails = (e) => {
    const selectedFiles = e.target.files[0];
    setThumbnails(selectedFiles);
    setSelectedThumbnails(URL.createObjectURL(selectedFiles));
  };

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

  useEffect(() => {
    dispatch(getInstituteDetails());
  }, []);

  const editor = useRef(null);
  const getValue = (value) => {
    setDesc(value);
  };

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setCategory(post?.category);
      setPostImages(post?.images);

      setDesc(post?.description);
      setTimestamp(post?.timestamp);

      if (post?.videos?.length) {
        if (post?.videos[0]?.video?.key) {
          setVideoUpload("video");
          setVideo([post?.videos[0]?.video]);
          setThumbnails([post?.videos[0]?.thumbnail]);
        } else {
          setVideoUpload("youtube");
          setYoutubeVideoLink(post?.videos[0]?.video?.url);
          setThumbnails([post?.videos[0]?.thumbnail]);
        }
      }
    }
  }, [post]);

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

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0];
    setPostImages(selectedFiles);
    setSelectedImage(URL.createObjectURL(selectedFiles));
  };

  const onSelectVideoFile = (e) => {
    const selectedFiles = e.target.files[0];
    setYoutubeVideoLink("");
    setVideo(selectedFiles);
    setSelectedVideo(URL.createObjectURL(selectedFiles));
  };

  const [uploading, setUploading] = useState(false);

  const handleAddBlog = async () => {
    if (!title) {
      setError("Please Fill Title");
      toast.error("Please Fill Title");
      return;
    }

    if (!postImages.name && !video?.name && !youtubeVideoLink) {
      toast.error("Please Add Image or Videos");
      return;
    }

    if (video.name || youtubeVideoLink) {
      if (!thumbnails.name) {
        toast.error("Please Add Thumbnail");
        return;
      }
    }

    const readTime = readingTime(desc).toString();
    const saving = toast.loading("Saving...");

    let images = null;
    if (postImages && selectedImage) {
      images = await FileUploader([postImages], (percent) =>
        dispatch(updatePercentage(percent))
      );
    }

    let videos = null;

    if (video && selectedVideo) {
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

    let updates = {
      readtime: `${readTime} minutes`,
      // instituteid: instituteDetails?.id,
    };

    if (title) {
      updates.title = title;
    }
    if (category) {
      updates.category = category;
    }
    if (images) {
      updates.images = images;
    }
    if (videos) {
      updates.videos = videos;
    }
    if (desc) {
      updates.description = desc;
    }

    const updateData = {
      id: post.id,
      updates: {
        category: category,
        images: images || post.images,
        videos: videos
          ? [
              {
                video: videos[0],
                thumbnail: thumbnail[0],
              },
            ]
          : [
              {
                video: {
                  url: youtubeVideoLink,
                },
                thumbnail: thumbnail[0],
              },
            ] || post.videos,
        title: title,
        description: desc,
        readtime: `${readTime} minutes`,
      },
    };

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

      const { data } = await axios.patch(`${host}/blog`, updateData, config);
      toast.success("Successfully post updated !");
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
            <div className="px-[30px] pt-4 pb-16 ">
              <p className="mb-2 text-[20px]">Edit Post</p>
              <div className="flex flex-col space-y-3">
                {error && <div className="text-[#FF0000]-500">{error}</div>}
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  defaultValue={title}
                  type="text"
                  className="w-full py-2 outline-none px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                  placeholder="Enter Post title*"
                />

                {/* <textarea
                  className="w-full px-6 bg-[#FAFAFA] py-1 outline-none border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                  placeholder="Meta Short Description Here*"
                  onChange={(e) => setShortDesc(e.target.value)}
                  rows="5"
                ></textarea> */}
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category}
                  className="w-full px-6 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
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
                <div className="relative w-full p-3 border-2 text-[#A8A8A8] h-[200px] overflow-hidden rounded-lg border-[#A4A4A4]">
                  <label>
                    {!selectedImage && !postImages?.length ? (
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
                          src={
                            selectedImage ||
                            `https://cdn.ostello.co.in/${postImages[0]?.key}`
                          }
                          alt=""
                        />
                      </div>
                    )}
                  </label>
                  {selectedImage || postImages?.length ? (
                    <button
                      className="absolute top-6 w-[30px] right-6 "
                      onClick={() => {
                        setSelectedImage(null);
                        setPostImages(null);
                      }}
                    >
                      <CrossIcon className="w-full" />
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                <select
                  onChange={(e) => setVideoUpload(e.target.value)}
                  value={videoUpload}
                  className="w-full px-6 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                >
                  <option value="video">Video Upload </option>
                  <option value="youtube">Youtube Video Link </option>
                </select>

                {videoUpload === "video" ? (
                  <div className="relative w-full p-3 border-2 text-[#A8A8A8] h-[200px] overflow-hidden rounded-lg border-[#A4A4A4]">
                    {!selectedVideo && !video?.length ? (
                      <label>
                        <div className="h-full">
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
                            src={
                              selectedVideo?.length
                                ? selectedVideo
                                : video?.length
                                ? `https://cdn.ostello.co.in/${video[0]?.key}`
                                : ""
                            }
                            controls
                            alt=""
                          />

                          <button
                            className="absolute top-6 w-[30px] right-6 "
                            onClick={() => {
                              setSelectedVideo(null);
                              setVideo(null);
                            }}
                          >
                            <CrossIcon className="w-full" />
                          </button>
                        </div>

                        {!selectedThumbnails?.length && !thumbnails[0]?.key ? (
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
                              src={
                                selectedThumbnails.length
                                  ? selectedThumbnails
                                  : `https://cdn.ostello.co.in/${thumbnails[0]?.key}`
                              }
                              alt=""
                            />

                            <button
                              className="absolute top-6 w-[30px] right-6 "
                              onClick={() => {
                                setSelectedThumbnails([]);
                                setThumbnails([]);
                              }}
                            >
                              <CrossIcon className="w-full" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      onChange={(e) => {
                        setYoutubeVideoLink(e.target.value);
                        setVideo("");
                      }}
                      defaultValue={youtubeVideoLink}
                      type="text"
                      className="w-full py-2 outline-none px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
                      placeholder="Enter Youtube Video Link*"
                    />

                    <div className="relative w-full mt-3 p-3 border-2 text-[#A8A8A8] h-[200px] overflow-hidden rounded-lg border-[#A4A4A4]">
                      {!selectedThumbnails?.length && !thumbnails[0]?.key ? (
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
                            src={
                              selectedThumbnails.length
                                ? selectedThumbnails
                                : `https://cdn.ostello.co.in/${thumbnails[0]?.key}`
                            }
                            alt=""
                          />

                          <button
                            className="absolute top-6 w-[30px] right-6 "
                            onClick={() => {
                              setSelectedThumbnails([]);
                              setThumbnails([]);
                            }}
                          >
                            <CrossIcon className="w-full" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* <JoditEditor
              ref={editor}
              value={""}
              config={config}
              tabIndex={2}
              //   onBlur={(newContent) => getValue(newContent)}

              onChange={(newContent) => getValue(newContent)}
            /> */}

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
                  placeholder="Blog description"
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
                    imageWidth: 200,
                    imageHeight: 200,
                    defaultTag: "div",
                    minHeight: "400px",
                    showPathLabel: false,
                    font: sortedFontOptions,
                  }}
                />

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

export default EditPost;
