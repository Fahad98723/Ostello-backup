import React, { useState, useEffect, useRef } from "react";
import { BiEdit, BiSearch } from "react-icons/bi";
import { RiDeleteBin5Line, RiDeleteBinLine } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseSelector,
  addFAQs,
  addSyllabus,
  addSyllabusDescription,
} from "../../../../../../redux/slices/AddCourseSlice";
import {
  authSelector,
  getUser,
} from "../../../../../../redux/slices/authSlice";
import {
  isJsonParsable,
  FileUploader,
} from "../../../../../../utils/utils";
import { Menu, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { FaSortAmountUp } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import useScreenWidth from "../../../../../hooks/useScreenWidth";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const JoditEditor = dynamic(
  () => {
    return import("jodit-react");
  },
  { ssr: false }
);

const SyllabusDescription = ({
  proceedState3,
  courseData,
  setPage3 = () => {},
  setPage2 = () => {},
  setPage1 = () => {},
  setTrack2 = () => {},
  setIsCoursePrice = () => {},
  isCoursePrice,
  setIsSyllabus = () => {},
}) => {
  const [syllabus, setSyllabus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [proceed4, setProceed4] = proceedState3;
  const [lectures, setLectures] = useState("");
  const [hours, setHours] = useState("");
  const [semester, setSemester] = useState("");
  const [units, setUnits] = useState("");

  const editor = useRef(null);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [lecturesError, setLecturesError] = useState("");
  const [hoursError, setHoursError] = useState("");
  const [semesterError, setSemesterError] = useState("");
  const [unitError, setUnitError] = useState("");
  const { syllabusDescription } = useSelector(addCourseSelector);

  const [addBoxes, setAddBoxes] = useState([]);

  const { userData } = useSelector(authSelector);
  const [admin, setAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    if (userData?.usertype === 1) {
      setAdmin(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (courseData && !syllabusDescription.length) {
      if (!admin) {
        setSyllabus(courseData?.syllabus);
      } else {
        if (courseData.syllabus && !courseData.updatedRequest?.syllabus) {
          setSyllabus(courseData?.syllabus);
        }
        if (courseData.updatedRequest) {
          setSyllabus(courseData.updatedRequest?.syllabus);
        }
      }
      if (syllabus?.length) {
        let data;
        if (isJsonParsable(syllabus)) {
          data = JSON.parse(syllabus);
          setAddBoxes(data);
        } else {
          setAddBoxes(syllabus);
        }
      }
    } else {
      if (syllabusDescription?.length) {
        setAddBoxes(syllabusDescription);
      }
    }
  }, [
    syllabusDescription.semester,
    syllabusDescription,
    syllabus,
    courseData,
    admin,
  ]);

  useEffect(() => {
    dispatch(addSyllabus(addBoxes));
  }, [addBoxes]);

  useEffect(() => {
    if (courseData && !syllabusDescription) {
      setSyllabus(courseData?.syllabus);
      if (syllabus) {
        let data = JSON.parse(syllabus);
        
        // setAddBoxes(data)
      }
    }
  }, [courseData, syllabus, syllabusDescription]);

  const deleteInput = (delTitle) => {
    if (semester.length > -1)
      setAddBoxes((addBoxes) => {
        const temp = [];
        addBoxes.forEach((box, idx) => {
          if (box.semester !== delTitle) temp.push(box);
        });

        return temp;
      });
  };

  const [addUnitDesc, setAddUnitDesc] = useState([
    {
      unit: "",
      description: "",
    },
  ]);

  const addInputs = () => {
    setAddUnitDesc((prev) =>
      prev?.concat({
        unit: "",
        description: "",
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
    
    if (e?.target) {
      const { name, value } = e.target;
      
      const old = addUnitDesc[index];
      const updated = { ...old, [name]: value };
      
      var list = [...addUnitDesc];
      list[index] = updated;
      setAddUnitDesc(list);
      
    } else {
      const old = addUnitDesc[index];
      const updated = { ...old, description: e };
      
      var list = [...addUnitDesc];
      list[index] = updated;
      setAddUnitDesc(list);
      
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let lectureValue = duration;
    let hoursValue = hours;
    let semesterValue = semester;
    let unitDescValue = addUnitDesc;

    

    if (lectureValue === "") {
      setLecturesError("Lecture is required");
    } else {
      setLecturesError("");
      typeof window !== "undefined" &&
        window.localStorage.setItem("lecture", lectureValue);
    }
    if (hoursValue === "") {
      setHoursError("Hours is required");
    } else {
      setHoursError("");
      typeof window !== "undefined" &&
        window.localStorage.setItem("hours", hoursValue);
    }
    if (semesterValue === "") {
      setSemesterError("Semester is required");
    } else {
      setSemesterError("");
      typeof window !== "undefined" &&
        window.localStorage.setItem("semester", semesterValue);
    }
    if (unitDescValue.length === 0) {
      setUnitError("Unit Desc is required");
    } else {
      setUnitError("");
      typeof window !== "undefined" &&
        window.localStorage.setItem("unitDesc", unitDescValue);
    }

    if (
      hoursValue === "" ||
      lectureValue === "" ||
      unitDescValue.length === 0 ||
      semesterValue === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newDesc = [...addBoxes];
      newDesc.push({
        lectures: lectureValue,
        hours: hoursValue,
        semester: semesterValue,
        unitDesc: unitDescValue,
      });
      dispatch(addSyllabusDescription(newDesc));
      // setProceed4(true)
      
      handleClose();
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [type, setType] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [editSemAnchorEl, setEditSemAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);
  const editSemOpen = Boolean(editSemAnchorEl);
  const [data, setData] = useState([]);
  const [newDescription, setNewDescription] = useState({});
  const handleByType = () => {
    // const sortedType = adminInstitutes?.map(obj => { return { ...obj} }).sort((a, b) => a.classmode - b.classmode)

    // 
    setData(sortedType);
    handleClose();
  };
  const handleChange = (event) => {
    setType(event.target.value);
    // setAddBoxes(
    //   addBoxes?.filter((item) => item.title === type)
    // )
  };
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAddUnitDesc([
      {
        unit: "",
        description: "",
      },
    ]);
  };
  const handleEditClick = (e, clickTitle) => {
    setEditSemAnchorEl(e.currentTarget);
    setNewDescription(addBoxes?.find((t) => t.semester === clickTitle));
  };

  

  useEffect(() => {
    setAddUnitDesc(newDescription?.unitDesc);
  }, [newDescription]);

  const handleInputChange = (e, editTitle) => {
    
    const { name, value } = e.target;
    const old = addBoxes?.find((t) => t.semester === editTitle);
    const updated = { ...old, [name]: value, unitDesc: addUnitDesc };
    
    var list = [...addBoxes];
    //Find index of specific object using findIndex method.
    const index = addBoxes.findIndex((obj) => obj.semester == editTitle);
    list[index] = updated;
    setAddBoxes(list);
    addInputs;
    
    dispatch(addSyllabusDescription(list));
  };

  

  

  const handleUnitEditInputChange = (e, editTitle) => {
    const { name, value } = e.target;
    const old = addBoxes?.find((t) => t.semester === editTitle);
    const updated = { ...old, [name]: value };
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditSemAnchorEl(null);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // const [edit, setEdit] = useState(false);

  return (
    <div
      // action=''
      // onSubmit={handleSubmit}
      className="bg-white rounded-lg lg:p-8 my-5"
    >
      <h3 className="font-bold text-[36px] text-[#252733] pb-10">
        Add Syllabus Description
      </h3>
      <div className="flex gap-x-5 md:px-5 px-3  justify-between">
        <div className="flex md:gap-x-8 gap-x-5 items-center">
          <TextField
            onBlur={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            size="small"
            label="Search"
            fullWidth
            variant="outlined"
          />
          <div
            onClick={handleFilterClick}
            id="basic-button"
            aria-controls={filterOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={filterOpen ? "true" : undefined}
            className="flex items-center cursor-pointer rounded-[10px] w-[102px] border border-light-gray p-2"
          >
            <FaFilter className="text-[#C5C7CD]" />
            <span className="font-bold md:block hidden ml-2 text-[14px]">
              Filter
            </span>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={filterAnchorEl}
            open={filterOpen}
            onClose={handleFilterClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleByType()}>By Type</MenuItem>

            <Box sx={{ minWidth: 200, padding: "10px 10px" }}>
              <FormControl sx={{ marginBottom: "10px" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={null}>All</MenuItem>
                  <MenuItem value={1}>Semester</MenuItem>
                  <MenuItem value={2}>Duration</MenuItem>
                  <MenuItem value={3}>Topic</MenuItem>
                  <MenuItem value={4}>Topic Description</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Menu>
        </div>
        <div
          aria-controls={
            open
              ? "basic-add-menu"
              : editSemOpen
              ? "basic-edit-menu"
              : undefined
          }
          aria-haspopup="true"
          aria-expanded={open ? "true" : editSemOpen ? "true" : undefined}
        >
          <button
            className="flex items-center  ml-auto w-32 h-10 lg:py-1 rounded-[10px] text-white justify-center bg-[#0D293F]"
            onClick={(e) => {
              e.preventDefault();
              handleAddClick(e);
            }}
          >
            <AiOutlinePlus className="text-white" />
            <p className="">Add topic</p>
          </button>
          {open && (
            <Menu
              id="basic-add-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <AddDescription
                {...{
                  handleClose,
                  setTitle,
                  setDescription,
                  setHours,
                  setDuration,
                  handleSubmit,
                  setSemester,
                  setUnits,
                  addUnitDesc,
                  setAddUnitDesc,
                  addInputs,
                  deleteInputs,
                  handleUnitDescInputChange,
                }}
              />
              {/* ))} */}
            </Menu>
          )}
          {editSemOpen && (
            <Menu
              id="basic-edit-menu"
              anchorEl={editSemAnchorEl}
              open={editSemOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <EditDescription
                {...{
                  handleClose,
                  newDescription,
                  handleInputChange,
                  addUnitDesc,
                  setAddUnitDesc,
                  handleUnitDescInputChange,
                  addInputs,
                  deleteInputs,
                }}
              />
              {/* ))} */}
            </Menu>
          )}
        </div>
      </div>
      <div className="bg-white md:mt-5 mt-0 rounded-[10px] border border-light-gray shadow ">
        <h1 className="text-[18px] w-full space-x-2 hidden lg:flex items-center  py-4 ml-5 font-dm-sans font-bold">
          List of topics offered
        </h1>
        <table className="mt-10 md:block hidden table-auto">
          <thead className="bg-[#FBF5F4] table w-full table-fixed border-b border-light-gray">
            <tr>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              >
                Duration
              </th>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              >
                Total Topic
              </th>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              >
                Topic
              </th>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              >
                Topic Description
              </th>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              ></th>
            </tr>
          </thead>
          <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
            {addBoxes?.map((d, index) => (
              <tr
                key={index}
                className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
              >
                <td className="px-6 py-4  font-medium text-[#252733]">
                  <div className="flex items-center space-x-3">
                    <div className="w-full ">
                      <p className="font-bold ">{d?.hours}</p>
                    </div>
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 ">
                  <div className="flex flex-col">
                    <p className="font-bold">{d?.lectures}</p>
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 ">
                  <div className="flex flex-col">
                    <p className="font-bold">{d?.semester}</p>
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 ">
                  <div className="flex flex-col">
                    <p className="font-bold">
                      {/* {`${d?.description?.slice(0, 25)}...`} */}
                    </p>
                  </div>
                </td>
                <td
                  //   onClick={() => handleOnclick(d.id)}
                  className="text-[#252733] font-medium px-6 py-4"
                >
                  <div className="flex item-center justify-center gap-3">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditClick(e, d.semester);
                      }}
                      className=" w-[40px] block p-2.5 cursor-pointer"
                    >
                      <GrEdit className="text-2xl text-blue" />
                    </div>
                    <div
                      onClick={() => {
                        deleteInput(d.semester);
                      }}
                      className=" w-[40px] block p-2.5 cursor-pointer"
                    >
                      <RiDeleteBin5Line className="text-2xl text-blue" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="flex py-5  "
        onClick={(e) => {
          e.preventDefault();
          setPage3(true);
          setPage1(false);
          setPage2(false);
          setTrack2(true);
          setProceed4(true);
          setIsCoursePrice(true);
          setIsSyllabus(false);
          dispatch(addSyllabusDescription(addBoxes));
          
        }}
      >
        <button className="text-white ml-auto bg-primary w-44 py-3 rounded-lg ">
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default SyllabusDescription;

export const AddDescription = ({
  handleClose,
  setTitle,
  setDescription,
  setHours,
  setDuration,
  handleSubmit,
  setSemester,
  setUnits,
  addUnitDesc,
  setAddUnitDesc,
  addInputs,
  deleteInputs,
  handleUnitDescInputChange,
}) => {
  const editor = useRef(null);

  const { screenWidth } = useScreenWidth();

  return (
    <Box
      sx={{
        maxWidth: 1030,
        maxHeight: 661,
        fontSize: 14,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="pl-5">
          <h3>Syllabus Description</h3>
          <p>Update your syllabus description here.</p>
        </div>
        <div className="flex justify-center items-center gap-2 pr-5">
          <button
            onClick={() => {
              handleClose();
            }}
            className="bg-white border border-light-gray text-[#0D293F]  w-32 py-3 rounded-[8px] my-6 mr-auto"
            // onClick={handleSave}
          >
            Cancel
          </button>
          <button
            className="bg-[#0D293F]   text-white  w-32 py-3 rounded-[8px] my-6 mr-auto"
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex-grow w-full border-b border-[#D0D5DD]"></div>
      <FormControl sx={{ marginBottom: "10px" }} fullWidth>
        <div className="flex justify-between items-center gap-4 pl-5 pr-5 pt-3">
          <div>
            <h3>Semester/Term</h3>
          </div>
          <TextField
            id="outlined-basic"
            size="small"
            label="Semester/Term"
            style={{ width: 512 }}
            variant="outlined"
            // disabled={!edit && 'disabled'}
            name="semester"
            onBlur={(e) => {
              setSemester(e.target.value);
            }}
          />
        </div>

        {addUnitDesc?.map((inputs, index) => (
          <div key={`${Math.floor(Math.random() * 1000)}-min`}>
            <RiDeleteBinLine
              className=" w-7 h-7 p-1   rounded-full mr-5 ml-auto text-[#E46060] mt-2 cursor-pointer"
              onClick={() => {
                deleteInputs(index);
              }}
              style={{ backgroundColor: "rgba(228, 96, 96, 0.15)" }}
            />

            <div className="flex justify-between items-center gap-4 pl-5 pr-5 pt-3">
              <div>
                <h3>Chapters/Units {index + 1}</h3>
                {/* <p>Update your company photo and details here.</p> */}
              </div>
              <TextField
                id="outlined-basic"
                size="small"
                label="Chapters/Units"
                style={{ width: 512 }}
                variant="outlined"
                // disabled={!edit && 'disabled'}
                defaultValue={inputs.unit}
                name="unit"
                onBlur={(e) => {
                  handleUnitDescInputChange(e, index);
                }}
              />
            </div>

            <div className="flex justify-between items-center gap-2 pl-5 pr-5 pt-3 pb-3">
              <div>
                <h3>Sub Topic Description {index + 1}</h3>
              </div>

              <JoditEditor
                className="text-slate text-lg px-3 bg-transparent  placeholder-ghost focus:outline-none"
                ref={editor}
                value={inputs.description}
                config={{
                  buttons: [
                    "bold",
                    "strikethrough",
                    "font",
                    "fontsize",
                    "paragraph",
                    "link",
                    "align",
                    "copyformat",
                    "fullsize",
                  ],
                  minWidth: screenWidth > 768 ? 600 : "100%",
                  maxWidth: 800,
                  width: "100%",
                  maxHeight: 300,
                  toolbarStickyOffset: 100,
                  readonly: false,
                  toolbarAdaptive: false,
                  placeholder: "Course Description Here*",
                  askBeforePasteHTML: false,
                  askBeforePasteFromWord: false,
                  defaultActionOnPaste: "insert_clear_html",
                }}
                tabIndex={2}
                //   onBlur={(newContent) => getValue(newContent)}
                onBlur={(newContent) =>
                  handleUnitDescInputChange(newContent, index)
                }
              />

              {/* <SunEditor
                onBlur={(newContent, data) =>
                  handleUnitDescInputChange(data, index)
                }
                setContents={inputs?.description}
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

                    // ["table", "horizontalRule", "link", "image", "video"],
                    // ["fullScreen", "showBlocks", "codeView"],
                    // ["preview", "print"],
                    // ["removeFormat"],
                  ],
                  formats: ["p", "blockquote", "h1", "h2", "h3"],

                  defaultTag: "div",
                  minHeight: "150px",
                  showPathLabel: false,
                  // font: sortedFontOptions,
                }}
              /> */}
            </div>
          </div>
        ))}

        <button
          className="bg-[#0D293F] mr-5  text-white 
             p-3 rounded-[8px] my-6 ml-auto"
          onClick={(event) => {
            addInputs();
          }}
        >
          + Add More
        </button>
        <div className="flex-grow w-full border-b border-[#D0D5DD]"></div>
        <div className="flex justify-between items-center pl-5 pr-5 pt-3">
          <div>
            <h3>Lectures:</h3>
            <p>This will be displayed on your profile.</p>
          </div>
          <TextField
            id="outlined-basic"
            size="small"
            label="No. of lectures'"
            style={{ width: 512 }}
            variant="outlined"
            onBlur={(e) => {
              setDuration(e.target.value);
            }}
            // disabled={addBoxes[index].lectures && 'disabled'}
            name="lectures"
            type="number"
          />
        </div>
        <div className="flex justify-between items-center pl-5 pr-5 pt-3">
          <div>
            <h3>Duration:</h3>
            <p>This will be displayed on your profile.</p>
          </div>
          <TextField
            // onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            size="small"
            label="Duration in hours"
            style={{ width: 512 }}
            variant="outlined"
            type="number"
            onBlur={(e) => {
              setHours(e.target.value);
            }}
            // disabled={addBoxes[index].hours && 'disabled'}
            name="hours"
          />
        </div>
      </FormControl>
    </Box>
  );
};
export const EditDescription = ({
  handleClose,
  handleInputChange,
  newDescription,
  addUnitDesc,
  setAddUnitDesc,
  handleUnitDescInputChange,
  addInputs,
  deleteInputs,
}) => {
  const { lectures, hours, semester, unitDesc } = newDescription;

  

  const editor = useRef(null);

  const { screenWidth } = useScreenWidth();
  return (
    <Box
      sx={{
        maxWidth: 1030,
        maxHeight: 661,
        fontSize: 14,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="pl-5">
          <h3>Edit Syllabus Description</h3>
          <p>Update your syllabus description here.</p>
        </div>
        <div className="flex justify-center items-center gap-2 pr-5">
          <button
            onClick={() => {
              handleClose();
            }}
            className="bg-white border border-light-gray text-[#0D293F]  w-32 py-3 rounded-[8px] my-6 mr-auto"
            // onClick={handleSave}
          >
            Cancel
          </button>
          <button
            className="bg-[#0D293F]   text-white  w-32 py-3 rounded-[8px] my-6 mr-auto"
            onClick={(event) => {
              handleInputChange(event, semester);
              handleClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex-grow w-full border-b border-[#D0D5DD]"></div>
      <FormControl sx={{ marginBottom: "10px" }} fullWidth>
        <div className="flex justify-between items-center gap-4 pl-5 pr-5 pt-3">
          <div>
            <h3>Semester/Term</h3>
          </div>
          <TextField
            id="outlined-basic"
            size="small"
            label="Semester/Term"
            style={{ width: 512 }}
            variant="outlined"
            // disabled={!edit && 'disabled'}
            defaultValue={semester}
            name="semester"
            onBlur={(e) => {
              handleInputChange(e, semester);
            }}
          />
        </div>

        {addUnitDesc?.map((inputs, index) => (
          <div key={`${Math.floor(Math.random() * 1000)}-min`}>
            <RiDeleteBinLine
              className=" w-7 h-7 p-1   rounded-full mr-5 ml-auto text-[#E46060] mt-2 cursor-pointer"
              onClick={() => {
                deleteInputs(index);
              }}
              style={{ backgroundColor: "rgba(228, 96, 96, 0.15)" }}
            />

            <div className="flex justify-between items-center gap-4 pl-5 pr-5 pt-3">
              <div>
                <h3>Chapters/Units {index + 1}</h3>
                {/* <p>Update your company photo and details here.</p> */}
              </div>
              <TextField
                id="outlined-basic"
                size="small"
                label="Chapters/Units"
                style={{ width: 512 }}
                variant="outlined"
                // disabled={!edit && 'disabled'}
                defaultValue={inputs.unit}
                name="unit"
                onBlur={(e) => {
                  handleUnitDescInputChange(e, index);
                }}
              />
            </div>

            <div className="flex justify-between items-center gap-2 pl-5 pr-5 pt-3 pb-3">
              <div>
                <h3>Sub Topic Description {index + 1}</h3>
              </div>
              {/* <TextareaAutosize
                aria-label="maximum height"
                minRows={4}
                placeholder="  Write your description text here in this space.
                    "
                style={{
                  width: 512,
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                }}
                defaultValue={inputs.description}
                // disabled={!edit && 'disabled'}
                onBlur={(e) => {
                  handleUnitDescInputChange(e, index);
                }}
                name="description"
              /> */}
              <JoditEditor
                className="text-slate text-lg px-3 bg-transparent  placeholder-ghost focus:outline-none"
                ref={editor}
                value={inputs.description}
                config={{
                  buttons: [
                    "bold",
                    "strikethrough",
                    "font",
                    "fontsize",
                    "paragraph",
                    "link",
                    "align",
                    "copyformat",
                    "fullsize",
                  ],
                  minWidth: screenWidth > 768 ? 600 : "100%",
                  maxWidth: 800,
                  width: "100%",
                  maxHeight: 300,
                  toolbarStickyOffset: 100,
                  readonly: false,
                  toolbarAdaptive: false,
                  placeholder: "Course Description Here*",
                  askBeforePasteHTML: false,
                  askBeforePasteFromWord: false,
                  defaultActionOnPaste: "insert_clear_html",
                }}
                tabIndex={1}
                //   onBlur={(newContent) => getValue(newContent)}
                onBlur={(newContent) =>
                  handleUnitDescInputChange(newContent, index)
                }
              />
              {/* <SunEditor
                onBlur={(newContent, data) =>
                 { handleUnitDescInputChange(data, index)
                  
                }
                setContents={inputs?.description}
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

                    // ["table", "horizontalRule", "link", "image", "video"],
                    // ["fullScreen", "showBlocks", "codeView"],
                    // ["preview", "print"],
                    // ["removeFormat"],
                  ],
                  formats: ["p", "blockquote", "h1", "h2", "h3"],

                  defaultTag: "div",
                  minHeight: "150px",
                  showPathLabel: false,
                  // font: sortedFontOptions,
                }}
              /> */}
            </div>
          </div>
        ))}

        <button
          className="bg-[#0D293F] mr-5  text-white 
             p-3 rounded-[8px] my-6 ml-auto"
          onClick={(event) => {
            addInputs();
          }}
        >
          + Add More
        </button>

        <div className="flex-grow w-full border-b border-[#D0D5DD]"></div>
        <div className="flex justify-between items-center pl-5 pr-5 pt-3">
          <div>
            <h3>Lectures:</h3>
            <p>This will be displayed on your profile.</p>
          </div>
          <TextField
            // onChange={(e) => setDuration(e.target.value)}
            id="outlined-basic"
            size="small"
            label="No. of lectures'"
            style={{ width: 512 }}
            variant="outlined"
            onBlur={(e) => {
              handleInputChange(e, semester);
            }}
            // disabled={addBoxes[index].lectures && 'disabled'}
            defaultValue={lectures}
            placeholder={lectures}
            name="lectures"
            type="number"
          />
        </div>
        <div className="flex justify-between items-center pl-5 pr-5 pt-3">
          <div>
            <h3>Duration:</h3>
            <p>This will be displayed on your profile.</p>
          </div>
          <TextField
            id="outlined-basic"
            size="small"
            label="Duration in hours"
            style={{ width: 512 }}
            variant="outlined"
            type="number"
            onBlur={(e) => {
              handleInputChange(e, semester);
            }}
            // disabled={addBoxes[index].hours && 'disabled'}
            placeholder={hours}
            defaultValue={hours}
            name="hours"
          />
        </div>
      </FormControl>
    </Box>
  );
};
