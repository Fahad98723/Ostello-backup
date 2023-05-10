import React, { useState, Fragment, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasicDetails,
  addCourseSelector,
  setBoards,
  setClasses,
  setExams,
  setSubCategories,
  setSubjects,
} from "../../../../../../redux/slices/AddCourseSlice";
import CourseSubject from "./DropDowns/CourseSubject";
import { CategorySideNav } from "./DropDowns/CourseCategory";
import Acadamics from "../CourseCategory/Acadamics";
import Engineering from "../CourseCategory/Engineering";
import Medical from "../CourseCategory/Medical";

import dynamic from "next/dynamic";
import useScreenWidth from "../../../../../hooks/useScreenWidth";
import { toast } from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";

const JoditEditor = dynamic(
  () => {
    return import("jodit-react");
  },
  { ssr: false }
);

const config = {};

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
  proceedState,
  setIsAdditionaDetails,
  isAdditionaDetails,
  setDetails,
  setIsBasicDetails,
  isBasicDetails,
  d,
}) => {
  const [proceed, setProceed] = proceedState;

  const [isDropDown1, setIsDropDown1] = useState(false);
  const [isDropDown2, setIsDropDown2] = useState(false);
  const [isDropDown3, setIsDropDown3] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [isDropDownValue1, setIsDropDownValue1] = useState("");
  const [isDropDownValue2, setIsDropDownValue2] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [courseNameEroor, setCourseNameEroor] = useState("");
  const [modeCourseError, setModeCourseError] = useState("");
  const [courseDurationError, setCourseDurationError] = useState("");
  const [selectError, setSelectError] = useState("");
  const [courseCategoryError, setCourseCategoryError] = useState("");
  const [courseDescriptionError, setCourseDescriptionError] = useState("");
  const [durationTime, setDurationTime] = useState("");

  const [duration, setDuration] = useState("");
  const dispatch = useDispatch();

  const [courseTypeShow, setCourseTypeShow] = useState(false);
  const [courseType, setCourseType] = useState("regular_course");

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    setCourseTypeShow(false);
    e.stopPropagation();
  };

  const { basicDetails, categorySelected } = useSelector(addCourseSelector);

  const { classes, subjects, boards, exams, subCategories, division } =
    useSelector(addCourseSelector);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    let courseNameValue = event.target[0].value;
    let courseModeValue = event.target[1].value;
    let courseDurationValue = event.target[2].value;

    let duration = event.target[3].value;

    if (isDropDownValue2 === "Days") {
      setCourseDuration(courseDurationValue * 1);
    } else if (isDropDownValue2 === "Weeks") {
      setCourseDuration(courseDurationValue * 7);
    } else if (isDropDownValue2 === "Months") {
      setCourseDuration(courseDurationValue * 30);
    }

    
    let courseSelectValue = isDropDownValue2;
    let courseDescriptionValue = courseDescription;
    let courseCategoryValue = event.target[6].value || event.preventDefault();

    if (courseNameValue === "") {
      setCourseNameEroor("Course Name is required");
    } else {
      setCourseNameEroor("");
      setCourseName(courseNameValue);
    }

    if (courseModeValue === "") {
      setModeCourseError("Course Mode is required");
    } else {
      setModeCourseError("");
      window.localStorage.setItem("Course_Mode", courseModeValue);
    }
    if (courseDurationValue === "") {
      setCourseDurationError("Course Duration  is required");
    } else {
      setCourseDurationError("");
      window.localStorage.setItem("Course_Duration", courseDurationValue);
      window.localStorage.setItem("Duration", duration);
    }
    if (courseSelectValue === "") {
      setSelectError("Select is required");
    } else {
      setSelectError("");
      window.localStorage.setItem("Select", courseSelectValue);
    }
    if (courseDescriptionValue === "") {
      setCourseDescriptionError("Course Description is required");
    } else {
      setCourseDescriptionError("");
      window.localStorage.setItem("Course_Description", courseDescriptionValue);
    }
    if (courseCategoryValue === "") {
      setCourseCategoryError("Course Category is required");
    } else {
      setCourseCategoryError("");
      window.localStorage.setItem("Course_Category", courseCategoryValue);
    }

    if (
      categorySelected === "" ||
      courseDescriptionValue === "" ||
      courseSelectValue === "" ||
      courseDurationValue === "" ||
      courseModeValue === ""
    ) {
      alert("Please fill all the fields");
    } else {
      let category = {
        name: categorySelected,
        classes,
        subjects,
        boards,
        exams,
        subCategories,
        division,
      };
      

      dispatch(
        addBasicDetails({
          courseName,
          courseDescription,
          courseMode: courseModeValue,
          courseDuration: `${courseDurationValue},${duration},${courseDuration}`,
          category,
          courseType
        })
      );

      if (categorySelected === "Academics") {
        if (!classes?.length) {
          toast.error("Please select any classes");
          setProceed(false);
          if (!d) {
            setDetails(false);
          }
        } else {
          setProceed(true);
          if (!d) {
            setDetails(true);
          }
        }
      } else {
        setProceed(true);
        if (!d) {
          setDetails(true);
        }
      }
    }
  };

  const durationFunction = (d, data) => {
    

    let courseDurationValue = d;
    if (data === "Days") {
      courseDurationValue = courseDurationValue * 1;
    } else if (data === "Weeks") {
      courseDurationValue = courseDurationValue * 7;
    } else if (data === "Months") {
      courseDurationValue = courseDurationValue * 30;
    }
    setCourseDuration(courseDurationValue);
  };

  

  useEffect(() => {
    if (basicDetails) {
      setCourseDescription(basicDetails.courseDescription);
      setCourseName(basicDetails.courseName);
      if(basicDetails.courseType){
        setCourseType(basicDetails.courseType);
      }
      else{
        setCourseType('regular_course');
      }
      setDurationTime(basicDetails?.courseDuration?.split(",")[0]);
      setDuration(basicDetails?.courseDuration?.split(",")[0]);
      setIsDropDownValue2(basicDetails?.courseDuration?.split(",")[1]);
      setIsDropDownValue1(basicDetails.courseMode);
    }
  }, [basicDetails]);

  const editor = useRef(null);

  const getValue = (value) => {
    setCourseDescription(value);
    // 
  };

  

  const { screenWidth } = useScreenWidth();

  return (
    <>
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
            placeholder="Course Name *"
            name="Course Name"
            onChange={(e) => {
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
          <div className="flex-1"></div>
          <div className="flex py-3 lg:py-0 ">
            <input
              type="text"
              className="text-slate w-20 text-lg rounded-lg px-3 py-2 bg-transparent text-center placeholder-ghost h-fit bg-[#F0F4F9] focus:outline-none"
              defaultValue={duration}
              placeholder="0"
              onChange={(event) => {
                durationFunction(event.target.value, isDropDownValue2);
                setDurationTime(event.target.value);
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
              {isDropDown2 && (
                <div className="flex cursor-pointer  justify-end ">
                  <div className="w-full bg-white shadow rounded-lg">
                    <p
                      className="text-solid px-10"
                      onClick={() => {
                        setIsDropDownValue2("Days");
                        setIsDropDown2(false);
                        durationFunction(durationTime, "Days");
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
                        durationFunction(durationTime, "Months");
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
                        durationFunction(durationTime, "Years");
                      }}
                    >
                      Years
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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
          className={` px-4 py-3  rounded-lg  text-base font-normal text-slate flex items-center bg-clip-padding bg-no-repeat border-2 border-solid  ${
            courseDescriptionError.length > 0
              ? "border-red "
              : "border-[#A4A4A4] my-5 "
          } first-letter:transition ease-in-out m-0`}
        >
          {/* <textarea
            type="text"
            className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
            rows="6"
            cols="50"
            placeholder="Course description *"
            defaultValue={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          /> */}
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
            tabIndex={1}
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
            value={categorySelected}
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
            subCategoryState={[subCategories, setSubCategories]}
          />
        ) : (
          <div className=""></div>
        )}
        <Fragment>
          <form
            action=""
            className="relative w-full lg:mr-10 mb-10 lg:mb-0 bg-white rounded-lg   "
          >
            {categorySelected === "Academics" ||
            categorySelected === "Medical" ||
            categorySelected === "Engineering" ? (
              <h1 className="text-2xl w-full space-x-2 hidden lg:flex items-center  pt-4   font-dm-sans font-bold">
                Sub-Category
              </h1>
            ) : (
              ""
            )}

            {/*====================== If Course Category is Acadamics  =========================== */}

            {categorySelected === "Academics" && (
              <div className="">
                <Acadamics />
              </div>
            )}

            {/*======================== If Course Category is Engineering ======================  */}
            {categorySelected === "Engineering" && (
              <div className="">
                <Engineering />
              </div>
            )}

            {/*========================= if Course Category is Medical ======================== */}
            {categorySelected === "Medical" && (
              <div className="">
                <Medical />
              </div>
            )}
          </form>
        </Fragment>
        <div className={`flex justify-end mb-5`}>
          <button className="text-white bg-primary w-44 py-3 rounded-lg mt-5 ">
            Save and Continue
          </button>
        </div>
      </form>
    </>
  );
};
