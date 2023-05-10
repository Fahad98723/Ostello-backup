import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import axios from "axios";
import { host } from "../../../../utils/constant";
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
import "suneditor/dist/css/suneditor.min.css";

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
  placeholder: "Meta Content Here*",
  width: "100%",
  height: 150,
  maxHeight: 200,
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "20px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};
const EditMetaUrlModal = ({
  editOpen,
  setEditOpen,
  setReFetch,
  singleMeta,
}) => {
  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "60%",
        overflowY: "scroll!important",
      },
    },
  });

  const { modalBox } = useStyle();
  const [metaDesc, setMetaDesc] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [isDisable, setIsDisable] = useState(false);
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

  const getValue = (value) => {
    setDesc(value);
  };
  useEffect(() => {
    if (singleMeta) {
      setSlugUrl(singleMeta?.url);
      setMetaTitle(singleMeta?.title);
      setMetaDesc(singleMeta?.description);
      setDesc(singleMeta?.content);
    }
  }, [singleMeta]);

  const handleMetaUrl = async () => {
    setReFetch(false);
    const updateData = {
      id: singleMeta.id,
      updates: {
        url:
          slugUrl?.toLowerCase() ||
          metaTitle?.toLowerCase()?.replace(/ /g, "-"),
        title: metaTitle,
        description: metaDesc,
        content: desc,
      },
    };

    try {
      const { data } = await axios.patch(`${host}/meta`, updateData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });

      toast.success("successfully updated");
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setEditOpen(false);
      setReFetch(true);
    }
  };

  return (
    <Modal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={modalBox}>
        <div className="md:px-[30px] px-[5px]  w-full !mt-[0px]">
          <p className="text-4xl text-center font-bold mb-4">Edit Meta Url</p>

          <div
            className={` shrink w-full px-6 py-2 mb-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
          >
            <input
              type="text"
              placeholder="Slug Url"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={slugUrl}
              disabled={isDisable}
              onChange={(e) => {
                setSlugUrl(e.target.value);
              }}
            />
          </div>
          <div
            className={` shrink w-full px-6 py-2 mb-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
          >
            <input
              type="text"
              placeholder="Meta Title"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={metaTitle}
              disabled={isDisable}
              onChange={(e) => {
                setMetaTitle(e.target.value);
              }}
            />
          </div>

          <div
            className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
          >
            <textarea
              type="text"
              placeholder="Meta Desc"
              autoFocus
              rows={3}
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={metaDesc}
              disabled={isDisable}
              onChange={(e) => {
                setMetaDesc(e.target.value);
              }}
            />
          </div>
          <div>
            <SunEditor
              onChange={(content) => {
                getValue(content);

                // 
                //   content
                // );
              }}
              setContents={desc}
              placeholder="Meta Content"
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
                minHeight: "150px",
                showPathLabel: false,
                font: sortedFontOptions,
              }}
            />
          </div>
          <div className="bg-primary w-28  py-2 rounded-lg ">
            <button
              className="m-auto w-full text-lg font-bold z-50 text-white"
              onClick={handleMetaUrl}
            >
              Update
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EditMetaUrlModal;
