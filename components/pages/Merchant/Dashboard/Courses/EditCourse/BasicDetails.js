import React, { useState, Fragment, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasicDetails,
  addCourseSelector,
  addCourseSlugDescription,
  addCourseSlugLink,
  addCourseSlugTitle,
  setSubCategories,
} from "../../../../../../redux/slices/AddCourseSlice";
import { CategorySideNav } from "./Dropdowns/CourseCategory";
import Acadamics from "./Acadamics";
import Engineering from "./Engineering";
import Medical from "./Medical";
import {
  authSelector,
  getUser,
} from "../../../../../../redux/slices/authSlice";
import LoadingSpinner from "../../../../../layout/LoadingSpinner";
import { isJsonParsable } from "../../../../../../utils/utils";

import dynamic from "next/dynamic";
import { useRef } from "react";
import useScreenWidth from "../../../../../hooks/useScreenWidth";
import { toast } from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";

const JoditEditor = dynamic(
  () => {
    return import("jodit-react");
  },
  { ssr: false }
);

const courseTypeData = [
  {
    name: "Regular Course",
    value: "regular_course",
  },
  {
    name: "Crash Course",
    value: "crash_course",
  },
  // {
  //   name: "Hybrid",
  //   value: 3,
  // },
  // {
  //   name: "Clear All",
  //   value: "",
  // },
];

export const BasicDetails = ({
  courseData,
  proceedState,
  categoryState,
  setDetails = () => {},
  setIsBasicDetails11,
  setIsAdditionaDetails,
}) => {
  const [proceed, setProceed] = proceedState;

  const [isDropDown1, setIsDropDown1] = useState(false);
  const [isDropDown2, setIsDropDown2] = useState(false);
  const [isDropDown3, setIsDropDown3] = useState(false);

  const [duration, setDuration] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [isDropDownValue1, setIsDropDownValue1] = useState("");
  const [isDropDownValue2, setIsDropDownValue2] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [category, setCategory] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [photographyCheckValue, setPhotographyCheckValue] = useState();
  const [businessCheckValues, setBusinessCheckValues] = useState();
  const [designCheckValues, setDesignCheckValues] = useState();
  const [itCheckValues, setItCheckValues] = useState();
  const [marketCheckValues, setMarketCheckValues] = useState();
  const [developmentCheckValues, setDevelopmentCheckValues] = useState();
  const [otherSkillsCheckValues, setOtherSkillsCheckValues] = useState();
  const [courseNameEroor, setCourseNameEroor] = useState("");
  const [modeCourseError, setModeCourseError] = useState("");
  const [courseDurationError, setCourseDurationError] = useState("");
  const [selectError, setSelectError] = useState("");
  const [courseCategoryError, setCourseCategoryError] = useState("");
  const [courseDescriptionError, setCourseDescriptionError] = useState("");

  const [selectClassValues, setSelectClassValues] = useState([]);
  const [selectBoardValues, setSelectBoardValues] = useState([]);
  const [selectEnggExam, setSelectEnggExam] = useState([]);
  const [selectMedicalExam, setSelectMedicalExam] = useState([]);

  const [isDropDown10, setIsDropDown10] = useState(false);
  const [isDropDown20, setIsDropDown20] = useState(false);
  const [isDropDown30, setIsDropDown30] = useState(false);
  const [isDropDown12, setIsDropDown12] = useState(false);
  const [isDropDown21, setIsDropDown21] = useState(false);
  const dispatch = useDispatch();

  const {
    basicDetails,
    courseSlugDescription,
    courseSlugTitle,
    courseSlugLink,
  } = useSelector(addCourseSelector);

  const [courseClass, setCourseClass] = useState([]);
  const [subject, setSubject] = useState([]);
  const [board, setBoard] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [exam, setExams] = useState([]);
  const [slug, setSlug] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [title, setTitle] = useState("");

  const {
    subCategories,
    categorySelected,
    exams,
    classes,
    subjects,
    boards,
    division,
  } = useSelector(addCourseSelector);

  

  const { instituteDetails, addUserData, userData } = useSelector(authSelector);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    if (userData?.usertype === 1) {
      setAdmin(true);
    }
  }, [userData?.usertype]);

  const [subCategory, setSubCategory] = useState([]);

  const [courseTypeShow, setCourseTypeShow] = useState(false);
  const [courseType, setCourseType] = useState("regular_course");

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    setCourseTypeShow(false);
    e.stopPropagation();
  };

  const durationFunction = (d, data) => {
    let courseDurationValue = d;
    if (data === "Days") {
      courseDurationValue = courseDurationValue * 86400;
    } else if (data === "Weeks") {
      courseDurationValue = courseDurationValue * 604800;
    } else if (data === "Months") {
      courseDurationValue = courseDurationValue * 2630000;
    }
    setCourseDuration(courseDurationValue);
  };

  const { screenWidth } = useScreenWidth();

  useEffect(() => {
    let courseCategoryValue = window.localStorage.getItem("Course_Category");
    let photographyCheckValues = window.localStorage.getItem(
      "Photography_Checked"
    );
    let BusinessCheckValues = window.localStorage.getItem("Business_Checked");
    let ItCheckValues = window.localStorage.getItem("It_Checked");
    let DesignCheckValues = window.localStorage.getItem("Design_Checked");
    let MarketCheckValues = window.localStorage.getItem("Market_Checked");
    let DevelopmentCheckValues = window.localStorage.getItem(
      "Development_Checked"
    );
    let OtherSkillsCheckValues = window.localStorage.getItem(
      "OtherSkills_Checked"
    );

    if (courseData && !Object.entries(basicDetails).length) {
      // for admin course update and edit showing
      if (admin) {
        if (courseData?.classtype && !courseData?.updatedRequest?.classtype) {
          if (courseData?.classtype === 1) {
            setIsDropDownValue1("Hybrid");
          }
          if (courseData?.classtype === 2) {
            setIsDropDownValue1("Online");
          }
          if (courseData?.classtype === 3) {
            setIsDropDownValue1("Offline");
          }
        }
        if (courseData?.updatedRequest?.classtype) {
          if (courseData?.updatedRequest?.classtype === 1) {
            setIsDropDownValue1("Hybrid");
          }
          if (courseData?.updatedRequest?.classtype === 2) {
            setIsDropDownValue1("Online");
          }
          if (courseData?.updatedRequest?.classtype === 3) {
            setIsDropDownValue1("Offline");
          }
        }

        if (courseData?.category && !courseData?.updatedRequest?.category) {
          setCategory(courseData?.category);
        }
        if (courseData?.updatedRequest?.category) {
          setCategory(courseData?.updatedRequest?.category);
        }

        if (courseData?.duration && !courseData?.updatedRequest?.duration) {
          setDuration(courseData?.duration?.split(",")[0]);
          setIsDropDownValue2(courseData?.duration?.split(",")[1]);
        }
        if (courseData?.updatedRequest?.duration) {
          setDuration(courseData?.updatedRequest?.duration?.split(",")[0]);
          setIsDropDownValue2(
            courseData?.updatedRequest?.duration?.split(",")[1]
          );
        }

        if (
          courseData.description &&
          !courseData?.updatedRequest?.description
        ) {
          setCourseDescription(courseData?.description);
        }
        if (courseData?.updatedRequest?.description) {
          setCourseDescription(courseData?.updatedRequest?.description);
        }

        if (courseData?.name && !courseData?.updatedRequest?.name) {
          setCourseName(courseData?.name);
        }

        if (courseData?.updatedRequest?.name) {
          setCourseName(courseData?.updatedRequest?.name);
        }

        if (courseData?.coursetype && !courseData?.updatedRequest?.coursetype) {
          setCourseType(courseData?.coursetype);
        }

        if (courseData?.updatedRequest?.coursetype) {
          setCourseType(courseData?.updatedRequest?.coursetype);
        }

        if (courseData?.slugurl) {
          setSlug(courseData?.slugurl);
        }
        if (courseData?.metadesc) {
          setMetaDesc(courseData?.metadesc);
        }
        if (courseData?.metatitle) {
          setTitle(courseData?.metatitle);
        }
      }

      //for merchant course edit showing
      else {
        setCategory(courseData?.category);
        setCourseDescription(courseData?.description);
        setCourseName(courseData?.name);
        setCourseType(courseData?.coursetype);
        setDuration(courseData?.duration?.split(",")[0]);
        setIsDropDownValue2(courseData?.duration?.split(",")[1]);
        if (courseData?.classtype === 1) {
          setIsDropDownValue1("Hybrid");
        }
        if (courseData?.classtype === 2) {
          setIsDropDownValue1("Online");
        }
        if (courseData?.classtype === 3) {
          setIsDropDownValue1("Offline");
        }
      }
    }

    if (Object.entries(basicDetails).length) {
      setCourseDescription(basicDetails.courseDescription);
      setCourseName(basicDetails.courseName);
      setCourseType(basicDetails.courseType);
      setDuration(basicDetails?.courseDuration?.split(",")[0]);
      setIsDropDownValue2(basicDetails?.courseDuration?.split(",")[1]);
      setIsDropDownValue1(basicDetails.courseMode);
      if (!categorySelect) {
        if (courseData?.category && !courseData?.updatedRequest?.category) {
          setCategory(courseData?.category);
        }
        if (courseData?.updatedRequest?.category) {
          setCategory(courseData?.updatedRequest?.category);
        }
      }
    }
    if (courseSlugDescription) {
      setMetaDesc(courseSlugDescription);
    }
    if (courseSlugLink) {
      setSlug(courseSlugLink);
    }
    if (courseSlugTitle) {
      setTitle(courseSlugTitle);
    }

    if (courseCategoryValue) {
      setCategorySelect(courseCategoryValue);
    }
    setPhotographyCheckValue(JSON.parse(photographyCheckValues));
    setBusinessCheckValues(JSON.parse(BusinessCheckValues));
    setDesignCheckValues(JSON.parse(DesignCheckValues));
    setItCheckValues(JSON.parse(ItCheckValues));
    setMarketCheckValues(JSON.parse(MarketCheckValues));
    setDevelopmentCheckValues(JSON.parse(DevelopmentCheckValues));
    setOtherSkillsCheckValues(JSON.parse(OtherSkillsCheckValues));
    // setCourseDuration(courseData?.duration?.split(' ')[0])

    if (isDropDownValue2 === "Days") {
      setDurationCount(duration * 1);
    } else if (isDropDownValue2 === "Weeks") {
      setDurationCount(duration * 7);
    } else if (isDropDownValue2 === "Months") {
      setDurationCount(duration * 30);
    }
  }, [courseData, category, proceed]);

  const editor = useRef(null);

  const getValue = (value) => {
    setCourseDescription(value);
    // 
  };

  useEffect(() => {
    if (category) {
      if (!categorySelected.length) {
        setCategorySelect(category?.name);
      }
      if (categorySelected) {
        setCategorySelect(categorySelected);
      }
      if (!subCategories?.length) {
        setSubCategory(category?.subcategory);
        // dispatch(setSubCategories(category?.subcategory));
      }
      if (subCategories?.length) {
        setSubCategory(subCategories);
      }
      if (!exams?.length) {
        setExams(category.exams);
      }
      if (exams?.length) {
        setExams(exams);
      }
    }
  }, [courseData, category, admin, categorySelected, subCategories, exams]);

  useEffect(() => {
    if (category && !basicDetails?.category) {
      setCourseClass(category?.classes);
      setSubject(category?.subjects);
      setBoard(category?.boards);
      setDivisions(category?.division);
    }
    if (basicDetails?.category) {
      setCourseClass(basicDetails?.category?.classes);
      setSubject(basicDetails?.category?.subjects);
      setBoard(basicDetails?.category?.boards);
      setDivisions(basicDetails?.category?.division);
    }
  }, [category, basicDetails?.category]);

  const [durationCount, setDurationCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    let courseNameValue = event.target[0].value;
    let courseModeValue = event.target[1].value;
    let courseDurationValue = event.target[3].value;
    let courseSelectValue = isDropDownValue2;
    let courseDescriptionValue = courseDescription;
    let courseCategoryValue = event.target[6].value;

    if (courseNameValue === "") {
      setCourseNameEroor("Course Name is required");
    }

    if (courseModeValue === "") {
      setModeCourseError("Course Mode is required");
    }
    if (courseDurationValue === "") {
      setCourseDurationError("Course Duration  is required");
    }
    if (courseSelectValue === "") {
      setSelectError("Select is required");
    }
    if (courseDescriptionValue === "") {
      setCourseDescriptionError("Course Description is required");
    }
    if (categorySelect === "") {
      setCourseCategoryError("Course Category is required");
    }

    if (
      categorySelect === "" ||
      courseDescriptionValue === "" ||
      courseSelectValue === "" ||
      courseDurationValue === "" ||
      courseModeValue === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let category = {
        name: categorySelect,
        classes: categorySelect === "Academics" ? courseClass : [],
        subjects: categorySelect === "Academics" ? subject : [],
        boards: categorySelect === "Academics" ? board : [],
        exams:
          categorySelect === "Medical" || categorySelect === "Engineering"
            ? exam
            : [],
        subcategory:
          categorySelect !== "Academics" &&
          categorySelect !== "Medical" &&
          categorySelect !== "Engineering"
            ? subCategory
            : [],
        division,
      };
      
      dispatch(
        addBasicDetails({
          courseName,
          courseDescription,
          courseMode: courseModeValue,
          courseDuration: `${duration},${isDropDownValue2},${durationCount}`,
          category,
          courseType
        })
      );
      dispatch(addCourseSlugDescription(metaDesc));
      dispatch(addCourseSlugLink(slug));
      dispatch(addCourseSlugTitle(title));

      if (categorySelect === "Academics") {
        if (!classes?.length) {
          toast.error("Please select any classes");
          setProceed(false);
          setDetails(false);
          setIsBasicDetails11(true);
          setIsAdditionaDetails(false);
        } else {
          setProceed(true);
          setDetails(true);
          setIsBasicDetails11(false);
          setIsAdditionaDetails(true);
        }
      } else {
        setProceed(true);
        setDetails(true);
        setIsBasicDetails11(false);
        setIsAdditionaDetails(true);
      }
    }
  };

  

  return (
    <>
      {/* {loading ? (
                <LoadingSpinner />
            ) : ( */}
      <form
        action=""
        onSubmit={handleSubmit}
        className="bg-white rounded-lg  lg:p-8 w-full lg:w-max my-5"
      >
        <h1 className=" hidden lg:flex text-2xl w-full space-x-2  items-center  py-4 pb-7  font-dm-sans font-bold">
          Basic Details
        </h1>

        {courseNameEroor.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {courseNameEroor}
          </p>
        ) : (
          ""
        )}

        <div
          className={`px-2 lg:px-4 py-3 flex flex-wrap w-full  rounded-lg text-base font-normal text-slate   border-2 border-solid ${
            courseNameEroor.length > 0 ? "border-red" : "border-[#A4A4A4] "
          }  first-letter:transition ease-in-out `}
        >
          <input
            type="text"
            className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
            defaultValue={courseName}
            // key={courseName}
            placeholder="Course Name *"
            name="Course Name"
            onBlur={(e) => {
              setCourseName(e.target.value);
            }}
          />
        </div>

        {modeCourseError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {modeCourseError}
          </p>
        ) : (
          ""
        )}
        <div
          className={` px-4 py-3 w-full rounded-lg  text-base font-normal text-slate flex items-center bg-clip-padding bg-no-repeat border-2 border-solid ${
            modeCourseError.length > 0
              ? "border-red "
              : "border-[#A4A4A4] my-5 "
          }  first-letter:transition ease-in-out m-0`}
          onClick={() => {
            setIsDropDown1(!isDropDown1);
          }}
        >
          <input
            type="text"
            className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
            disabled
            defaultValue={isDropDownValue1}
            placeholder="Mode of course *"
          />

          <MdKeyboardArrowDown
            className={`text-2xl ${isDropDown1 ? "hidden" : "flex"}`}
          />
          <MdKeyboardArrowUp
            className={`text-2xl ${isDropDown1 ? "flex" : "hidden"}`}
          />
        </div>
        {isDropDown1 && (
          <div className="w-full bg-white cursor-pointer shadow rounded-lg">
            <div
              className="flex items-center px-10  space-x-2"
              onClick={() => {
                setIsDropDownValue1("Online");
                setIsDropDown1(false);
              }}
            >
              <input type="radio" />
              <p className="text-solid ">Online</p>
            </div>
            <hr className="text-[#E3E3E3] " />

            <div
              className="flex items-center px-10  space-x-2"
              onClick={() => {
                setIsDropDownValue1("Offline");
                setIsDropDown1(false);
              }}
            >
              <input type="radio" />

              <p className="text-solid">Offline</p>
            </div>
            <hr className="text-[#E3E3E3]" />

            <div
              className="flex items-center px-10  space-x-2"
              onClick={() => {
                setIsDropDownValue1("Hybrid");
                setIsDropDown1(false);
              }}
            >
              <input type="radio" />
              <p className="text-solid ">Hybrid</p>
            </div>
          </div>
        )}

        {courseDurationError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {courseDurationError}
          </p>
        ) : (
          ""
        )}
        {selectError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {selectError}
          </p>
        ) : (
          ""
        )}
        <div
          className={` px-4 py-1 w-full rounded-lg  text-base font-normal text-slate flex flex-col lg:flex-row items-center bg-clip-padding bg-no-repeat border-2 border-solid ${
            courseDurationError.length > 0
              ? "border-red "
              : "border-[#A4A4A4]  "
          } ${
            selectError.length > 0 ? "border-red " : "border-[#A4A4A4] my-5 "
          }  first-letter:transition ease-in-out m-0`}
        >
          <input
            type="text"
            className="text-slate w-full lg:w-80 text-center lg:text-left text-lg px-3 bg-transparent  placeholder-ghost  focus:outline-none"
            disabled
            placeholder="Course duration *"
          />
          <div className="flex-1"></div>
          <div className="flex py-3 lg:py-0 ">
            <input
              type="text"
              className="text-slate w-20 text-lg rounded-lg px-3 py-2 bg-transparent text-center placeholder-ghost h-fit bg-[#F0F4F9] focus:outline-none"
              defaultValue={duration}
              placeholder="0"
              onChange={(event) => {
                setDuration(event.target.value);
                durationFunction(event.target.value, isDropDownValue2);
              }}
            />
            <div className="mx-4">
              <div
                className="flex items-center lg:w-full  rounded-lg text-lg px-3 py-2 bg-transparent  placeholder-ghost  bg-[#F0F4F9] "
                onClick={() => {
                  setIsDropDown2(!isDropDown2);
                  // durationFunction(durationTime)
                }}
              >
                <input
                  type="text"
                  className="text-slate  w-32 lg:w-full focus:outline-none h-fit"
                  value={isDropDownValue2}
                  placeholder="Select"
                  disabled
                />
                <MdKeyboardArrowDown
                  className={`text-2xl ${isDropDown2 ? "hidden" : "flex"}`}
                />
                <MdKeyboardArrowUp
                  className={`text-2xl ${isDropDown2 ? "flex" : "hidden"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {isDropDown2 && (
          <div className="flex cursor-pointer  justify-end lg:mr-8">
            <div className="w-60 bg-white shadow rounded-lg">
              <p
                className="text-solid px-10"
                onClick={() => {
                  setIsDropDownValue2("Days");
                  setIsDropDown2(false);
                }}
              >
                Days
              </p>
              <hr className="text-[#E3E3E3] " />

              <p
                className="text-solid px-10"
                onClick={() => {
                  setIsDropDownValue2("Months");
                  setIsDropDown2(false);
                }}
              >
                Months
              </p>

              <hr className="text-[#E3E3E3]" />

              <p
                className="text-solid px-10"
                onClick={() => {
                  setIsDropDownValue2("Years");
                  setIsDropDown2(false);
                }}
              >
                Years
              </p>
            </div>
          </div>
        )}

        <div className="relative  my-1">
          <p
            onClick={(e) => {
              setCourseTypeShow(!courseTypeShow);
              e.stopPropagation();
            }}
            className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-[#A4A4A4]  p-3 rounded-lg"
          >
            <p className={` text-[#000000] text-[16px] `}>
              {courseType
                ? courseType === "crash_course"
                  ? "Crash Course"
                  : "Regular Course"
                : "Select Type"}
            </p>
            {courseTypeShow ? (
              <GoChevronDown className="ml-1 text-[16px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[16px]" />
            )}
          </p>
          {courseTypeShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  {courseTypeData?.map((element, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex ${
                          courseType === element.value
                            ? "text-primary"
                            : "text-[#000000]"
                        }   justify-between cursor-pointer  items-center`}
                        onClick={() => {
                          setCourseType(element.value);
                        }}
                      >
                        <p className={`  text-[16px]  px-4 py-2 `}>
                          {element.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {courseDescriptionError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {courseDescriptionError}
          </p>
        ) : (
          ""
        )}
        <div
          className={` px-4 py-3 w-full rounded-lg  text-base font-normal text-slate flex items-center bg-clip-padding bg-no-repeat border-2 border-solid  ${
            courseDescriptionError.length > 0
              ? "border-red "
              : "border-[#A4A4A4] my-5 "
          } first-letter:transition ease-in-out m-0`}
        >
        
          <JoditEditor
            className="text-slate text-lg px-3 bg-transparent  placeholder-ghost focus:outline-none"
            ref={editor}
            value={courseDescription}
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
              maxWidth: 600,
              width: "100%",
              maxHeight: 300,
              toolbarStickyOffset: 100,
              readonly: false,
              toolbarAdaptive: false,
              placeholder: "Course Description Here*",
            }}
            tabIndex={2}
            //   onBlur={(newContent) => getValue(newContent)}
            onBlur={(newContent) => getValue(newContent)}
          />
        </div>

        {courseCategoryError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {courseCategoryError}
          </p>
        ) : (
          ""
        )}
        <div
          className={` px-4 py-3 w-full rounded-lg  text-base font-normal text-slate flex items-center bg-clip-padding bg-no-repeat border-2 border-solid ${
            courseCategoryError.length > 0
              ? "border-red "
              : "border-[#A4A4A4] my-5 "
          }  first-letter:transition ease-in-out m-0`}
          onClick={() => {
            setIsDropDown3(!isDropDown3);
          }}
        >
          <input
            type="text"
            className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
            disabled
            value={
              categorySelect?.charAt(0)?.toUpperCase() +
              categorySelect?.slice(1)
            }
            placeholder="Course category*"
          />

          <MdKeyboardArrowDown
            className={`text-2xl ${isDropDown3 ? "hidden" : "flex"}`}
          />
          <MdKeyboardArrowUp
            className={`text-2xl ${isDropDown3 ? "flex" : "hidden"}`}
          />
        </div>
        {isDropDown3 ? (
          <CategorySideNav
            dropDownClose={[isDropDown3, setIsDropDown3]}
            categorySelected={categorySelect}
            setCategorySelect={setCategorySelect}
            subCategoryState={[subCategories, setSubCategories]}
            subCategory={subCategory}
          />
        ) : (
          <div className=""></div>
        )}

        <Fragment>
          <form
            action=""
            className="relative w-full lg:mr-10 mb-10 lg:mb-0 bg-white rounded-lg   "
          >
            {categorySelect == "Academics" ||
            categorySelect == "Medical" ||
            categorySelect == "Engineering" ? (
              <h1 className="text-2xl w-full space-x-2 hidden lg:flex items-center  pt-4   font-dm-sans font-bold">
                Sub-Category
              </h1>
            ) : (
              ""
            )}

            {/*====================== If Course Category is Acadamics  =========================== */}

            {categorySelect?.charAt(0).toUpperCase() +
              categorySelect?.slice(1) ===
              "Academics" && (
              <div className="">
                <Acadamics
                  // classState={[classes, setClass]}
                  // subjectState={[subjects, setSubject]}
                  // boardState={[boards, setBoard]}
                  // data={[classes, subjects, boards]}
                  selectedClass={courseClass}
                  selectedSubject={subject}
                  selectedBoard={board}
                  selectedDivision={divisions}
                  setClass={setCourseClass}
                  setSubject={setSubject}
                  setBoard={setBoard}
                  setDivisions={setDivisions}
                  admin={admin}
                />
              </div>
            )}

            {/*======================== If Course Category is Engineering ======================  */}
            {categorySelect?.charAt(0).toUpperCase() +
              categorySelect?.slice(1) ===
              "Engineering" && (
              <div className="">
                <Engineering
                  // examState={[exams, setExams]}
                  selectedExam={exam}
                  setExam={setExams}
                />
              </div>
            )}

            {/*========================= if Course Category is Medical ======================== */}
            {categorySelect?.charAt(0).toUpperCase() +
              categorySelect?.slice(1) ===
              "Medical" && (
              <div className="">
                <Medical
                  selectedExam={exam}
                  setExam={setExams}
                  // examState={[exams, setExams]}
                />
              </div>
            )}
          </form>
        </Fragment>

        <div className={`flex justify-end mb-5 `}>
          <button className="text-white bg-primary w-44 py-3 rounded-lg mt-5  ">
            Save and Continue
          </button>
        </div>
      </form>
      {/* )} */}
    </>
  );
};
