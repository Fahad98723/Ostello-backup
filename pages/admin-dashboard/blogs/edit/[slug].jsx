import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  adminUpdateBlog,
  blogPreviewData,
  fetchAdminBlogs,
} from "../../../../redux/slices/adminBlogSlice";

import { Drawer } from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddImageIcon, CrossIcon } from "../../../../components/Icons";
import AdminDashboard from "../../../../components/pages/AdminDashboard/AdminDashboard";
import PageHeader from "../../../../components/pages/AdminDashboard/PageHeader/PageHeader";
import BlogPage from "../../../../components/pages/Blogs/Blog/BlogPage";
import { titleToUrl } from "../../../../components/utils";
import { isEmpty, readingTime, FileUploader } from "../../../../utils/utils";
import "suneditor/dist/css/suneditor.min.css";
import { updatePercentage } from "../../../../redux/slices/authSlice";
import { RiDeleteBinLine } from "react-icons/ri";


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
  uploader: {
    url: "/api/upload",
  },
  filebrowser: {
    ajax: {
      url: "/api/file/files",
    },
    uploader: {
      url: "/api/upload",
    },
  },
};
const EditBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { adminBlog, adminBlogs } = useSelector((state) => state.adminBlogs);

  const [blogId, setBlogId] = useState("");

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

  const [desc, setDesc] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [category, setCategory] = useState("");
  const [slugLink, setSlugLink] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(true);

  const [addUnitDesc, setAddUnitDesc] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const addInputs = () => {
    setAddUnitDesc((prev) =>
      prev?.concat({
        question: "",
        answer: "",
      })
    );
  };

  const deleteInputs = (i) => {
    if (i > -1)
      setAddUnitDesc((prev) => {
        const temp = [];
        prev.forEach((box, idx) => {
          if (idx !== i) temp.push(box);
        });

        return temp;
      });
  };

  const handleUnitDescInputChange = (e, index) => {
    
    const { name, value } = e.target;
    
    const old = addUnitDesc[index];
    const updated = { ...old, [name]: value };
    
    var list = [...addUnitDesc];
    list[index] = updated;
    setAddUnitDesc(list);
    
  };

  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, [dispatch]);

  
  useEffect(() => {
    const blog = adminBlogs.find((b) => b?.slugurl === slug);
    if (blog) {
      
      setDesc(blog?.description);
      setNewDesc(blog?.description);
      setBlogTitle(blog?.title);
      setBlogImage(blog?.images);
      setCategory(blog?.category);
      setSlugLink(blog?.slugurl);
      setShortDesc(blog?.metadesc);
      setBlogId(blog?.id);
      setTimestamp(blog?.timestamp);
      setAddUnitDesc(blog?.faqs);
    }
    setLoading(false);
  }, [slug, adminBlogs]);

  const editor = useRef(null);

  const getValue = (value) => {
    setNewDesc(value);
  };

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0];
    setBlogImage(selectedFiles);
    setSelectedImage(URL.createObjectURL(selectedFiles));
    // setBlogImage(URL.createObjectURL(selectedFiles))
  };
  const itemsAvailable = (items = []) => {
    let allAvailable = true;
    for (let i = 0; i < items?.length; i++) {
      let element = items[i];
      if (isEmpty(element)) {
        allAvailable = false;
      }
    }
    return allAvailable;
  };

  const handleEditBlog = async () => {
    if (!itemsAvailable([blogTitle, newDesc])) {
      setError("No change were made or Some fields are missing");
      return;
    }
    setError("");
    const readTime = readingTime(newDesc).toString();
    const updates = JSON.stringify({
      title: blogTitle,
      description: newDesc,
      readtime: `${readTime} minutes`,
    });
    const saving = toast.loading("updating...");
    try {
      let image;

      if (blogImage?.url) {
        image = blogImage;
      }
      if (!blogImage?.url) {
        const images = await FileUploader([blogImage], (percent) =>
          dispatch(updatePercentage(percent))
        );
        image = images[0];
      }

      const data = {
        id: blogId,
        updates: {
          category: category,
          images: image,
          slugurl: slugLink,
          metadesc: shortDesc,
          title: blogTitle,
          description: newDesc,
          readtime: `${readTime} minutes`,
          faqs: addUnitDesc,
        },
      };
      dispatch(adminUpdateBlog(data));
    } catch (err) {
      
    } finally {
      toast.remove(saving);
      setTimeout(() => {
        router.push("/admin-dashboard/blogs/");
      }, 2000);
    }
  };
  // if (loading) <LoadingSpinner />
  // if (!loading && blogTitle?.length == 0) {
  //   router.push('/404')
  // }

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

  const [isPreview, setIsPreview] = useState(false);

  return (
    <AdminDashboard>
      <Head>
        <title>Edit Blog - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Drawer
        placement="right"
        title="Blog Preview"
        contentWrapperStyle={{ width: "90%" }}
        visible={isPreview}
        onClose={() => {
          setIsPreview(false);
        }}
      >
        <BlogPage
          isPreview={true}
          onBack={() => {
            setIsPreview(false);
          }}
          {...{
            category,
            title: blogTitle,
            images: blogImage,
            alt: "alt",
            description: newDesc,
            authorSrc: "",
            authorAlt: "",
            authorName: "Ostello Admin",
            postDate: timestamp,
            read: `${newDesc ? readingTime(newDesc).toString() : 0} minutes`,
            metaDesc: shortDesc,
            slugUrl: slugLink,
          }}
        />
      </Drawer>
      {/* <Modal
        open={isPreview}
        onClose={() => {
          setisPreview(false)
        }}
      >
       
      </Modal> */}

      <>
        <PageHeader
          title={"Edit Blog"}
          actionName={"Preview"}
          onAction={() => {
            setIsPreview(true);
            dispatch(
              blogPreviewData({
                title: blogTitle,
                images: blogImage,
                newDesc,
              })
            );
          }}
        />
        <div className="px-[30px] pt-4 pb-16 ">
          <div className="flex flex-col space-y-3">
            {error && <div className="text-[#FF0000]-500">{error}</div>}
            <input
              value={blogTitle}
              // key={blogTitle}
              onChange={(e) => {
                setBlogTitle(e.target.value);
                // setSlugLink(titleToUrl(e.target.value))
              }}
              type="text"
              className="w-full px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
              placeholder="Enter blog title*"
            />
            {/* <input
            // onChange={(e) => setSlugLink(e.target.value)}
            value={slugLink}
            type='text'
            className='w-full py-2 outline-none px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
            placeholder='Slugs Link*'
          /> */}
            <textarea
              defaultValue={shortDesc}
              className="w-full px-6 bg-[#FAFAFA] py-1 outline-none border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
              placeholder="Meta Short Description Here*"
              onChange={(e) => setShortDesc(e.target.value)}
              rows="5"
            ></textarea>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-6 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
            >
              <option value={category} selected disabled hidden>
                {category?.charAt(0).toUpperCase() + category?.slice(1)}
              </option>
              <option value="programming">Programming </option>
              <option value="education">Education </option>
              <option value="courses">Courses </option>
              <option value="behind the curtains">Behind the Curtains </option>
              <option value="engineering">Engineering </option>
              <option value="medical">Medical</option>
              <option value="marketing">Marketing</option>
              <option value="career">Career</option>
              <option value="trends">Trends</option>
            </select>
            <div className="relative w-full p-3 border-2 text-[#A8A8A8] h-[280px] overflow-hidden rounded-lg border-[#A4A4A4]">
              <label>
                {!blogImage && !selectedImage ? (
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
                      className="w-full h-[252px] shadow-sm rounded-3xl object-cover"
                      src={
                        selectedImage ||
                        `https://cdn.ostello.co.in/${blogImage?.key}`
                      }
                      alt=""
                    />
                  </div>
                )}
              </label>
              {selectedImage || blogImage ? (
                <button
                  className="absolute top-6 w-[30px] right-6 "
                  onClick={() => {
                    setSelectedImage(null);
                    setBlogImage(null);
                  }}
                >
                  <CrossIcon className="w-full" />
                </button>
              ) : (
                ""
              )}
            </div>

           

            <SunEditor
              onChange={(content) => {
                getValue(content);
                
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
                  ["paragraphStyle", "blockquote"],
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
                linkTargetNewWindow: true,
                linkProtocol: "",
                linkRel: ["noreferrer"],
                linkNoPrefix: true,
                defaultTag: "div",
                minHeight: "400px",
                imageWidth: 200,
                imageHeight: 200,
                showPathLabel: false,
                font: sortedFontOptions,
              }}
            />

            {addUnitDesc?.map((inputs, index) => (
              <div key={`${Math.floor(Math.random() * 1000)}-min`}>
                <RiDeleteBinLine
                  className=" w-7 h-7 p-1   rounded-full mr-5 ml-auto text-[#E46060] mt-2 cursor-pointer"
                  onClick={() => {
                    deleteInputs(index);
                  }}
                  style={{ backgroundColor: "rgba(228, 96, 96, 0.15)" }}
                />

                <div className=" items-center gap-4 pl-5 pr-5 pt-3">
                  <input
                    // onClick={() => setSearchShow(true)}
                    className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] w-full py-2 text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                    type="text"
                    // disabled={!edit && 'disabled'}
                    placeholder={`Question ${index + 1}`}
                    defaultValue={inputs.question}
                    name="question"
                    onBlur={(e) => {
                      handleUnitDescInputChange(e, index);
                    }}
                  />
                  <input
                    // onClick={() => setSearchShow(true)}
                    className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] w-full py-2 mt-5 border border-1 border-[#C4C4C4]"
                    type="text"
                    // disabled={!edit && 'disabled'}
                    placeholder={`Answer ${index + 1}`}
                    defaultValue={inputs.answer}
                    name="answer"
                    onBlur={(e) => {
                      handleUnitDescInputChange(e, index);
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="px-5">
              <button
                className="bg-[#0D293F] mr-5  text-white 
             p-3 rounded-[8px] my-6 ml-auto"
                onClick={(event) => {
                  addInputs();
                }}
              >
                + Add More
              </button>
            </div>

            <div className="flex justify-center mt-5 space-x-5">
              <button
                onClick={handleEditBlog}
                className="px-12 font-bold rounded-lg py-2 text-white bg-[#7D23E0]"
              >
                Confirm
              </button>
              <button
                onClick={() => router.push("/admin-dashboard/blogs")}
                className="px-12 font-bold rounded-lg py-2 text-white bg-[#E46060]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    </AdminDashboard>
  );
};

export default EditBlog;
