import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAddBlog } from "../../../redux/slices/adminBlogSlice";

import {
  authSelector,
  getUser,
  updatePercentage,
} from "../../../redux/slices/authSlice";

import { Drawer } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddImageIcon, CrossIcon } from "../../../components/Icons";
import MetaHelmet from "../../../components/MetaHelmet";

import {
  isJsonParsable,
  readingTime,
  FileUploader,
  titleToUrl,
} from "../../../utils/utils";
import { useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";
import { RiDeleteBinLine } from "react-icons/ri";

const PageHeader = dynamic(
  () =>
    import("../../../components/pages/AdminDashboard/PageHeader/PageHeader"),
  {
    ssr: false,
  }
);
const AdminDashboard = dynamic(
  () => import("../../../components/pages/AdminDashboard/AdminDashboard"),
  {
    ssr: false,
  }
);
const BlogPage = dynamic(
  () => import("../../../components/pages/Blogs/Blog/BlogPage"),
  {
    ssr: false,
  }
);
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

const AddBlog = ({ meta }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const [desc, setDesc] = useState("");
  const [content, setContent] = useState();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("Super Admin");
  const [category, setCategory] = useState("programming");

  const [slugLink, setSlugLink] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const { instituteDetails, addUserData, userData } = useSelector(authSelector);
  const editor = useRef(null);
  const getValue = (value) => {
    setDesc(value);
  };

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

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
    setSelectedImage(URL.createObjectURL(selectedFiles));
  };

  const handleAddBlog = async () => {
    if (!title || !selectedImage || !desc) {
      setError("Please Fill The All Required Field");
      toast.error("Please Fill The All Required Field");
      return;
    }
    setError("");

    const readTime = readingTime(desc).toString();
    let images = await FileUploader([image], (percent) =>
      dispatch(updatePercentage(percent))
    );

    const data = {
      title: title,
      category: category,
      description: desc,
      readtime: `${readTime} minutes`,
      images: images[0],
      slugurl: slugLink,
      metadesc: shortDesc,
      faqs: addUnitDesc,
    };

    const saving = toast.loading("Saving...");

    try {
      dispatch(adminAddBlog(data));
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.remove(saving);
      setTimeout(() => {
        router.push("/admin-dashboard/blogs/");
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
      return core.plugins.image.register.call(core, info, response);
      // return uploadHandler(response);
    } catch (err) {
      
    }

    
    return undefined;
  };

  return (
    <AdminDashboard>
      <MetaHelmet title={meta.title} />
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
            title: title,
            images: selectedImage,
            alt: "alt",
            description: desc,
            authorSrc: "",
            authorAlt: "",
            authorName: "Ostello Admin",
            postDate: Date.now(),
            read: `${readingTime(desc).toString()} minutes`,
            metaDesc: shortDesc,
            slugUrl: slugLink,
          }}
        />
      </Drawer>
      <>
        <PageHeader
          title={"Create Blog"}
          actionName={"Preview"}
          onAction={() => {
            if (!title || !selectedImage || !desc) {
              setError("Please Fill The All Required Field");
              toast.error("Please Fill The All Required Field");
              return;
            } else {
              setIsPreview(true);
            }
          }}
        />
        <div className="px-[30px] pt-4 pb-16 ">
          <div className="flex flex-col space-y-3">
            {error && <div className="text-[#FF0000]-500">{error}</div>}
            <input
              onChange={(e) => {
                setTitle(e.target.value);
                setSlugLink(titleToUrl(e.target.value));
              }}
              type="text"
              className="w-full py-2 outline-none px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
              placeholder="Enter blog title*"
            />

            <textarea
              className="w-full px-6 bg-[#FAFAFA] py-1 outline-none border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
              placeholder="Meta Short Description Here*"
              onChange={(e) => setShortDesc(e.target.value)}
              rows="5"
            ></textarea>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-6 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg"
            >
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
                      className="w-full h-[252px] shadow-sm rounded-3xl object-cover"
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
                linkTargetNewWindow: true,
                linkProtocol: "",
                linkRel: ["noreferrer"],
                linkNoPrefix: true,
                defaultTag: "div",
                minHeight: "400px",
                imageWidth: "100%",
                imageHeight: 500,
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
                onClick={handleAddBlog}
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

export default AddBlog;

export const getStaticProps = async () => {
  const meta = {
    title: "Add Blog - Admin Dashboard - Ostello",
  };
  // 
  return {
    props: {
      meta,
    },
  };
};
