import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Box, Modal, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Data } from "../Search/Data";
import DistanceSlider from "../Search/Distance";
import Dropdown from "../Search/Dropdown";
import GroupCheckbox from "../Search/GroupCheckbox";
import GroupRadio from "../Search/GroupRadio";
import PriceSlider from "../Search/PriceSlider";
import RatingSlider from "../Search/RatingSlider";
import SubjectGroupCheckbox from "../Search/SubjectGroupCheckBox";
import instituteImage from "../../../assets/images/institute.png";
import ninetynineImage from "../../../assets/images/99rs.png";
import ninetynineMobileImage from "../../../assets/images/99Rsmobile.png";
import banner from "../../../assets/toplocationbanner.png";

import {
  selectCourse,
  setFields,
  setSearch,
} from "../../../redux/slices/courseSlice";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import {
  selectSearch,
  setCategory,
  setClass,
  setExam,
  setFilteredCourses,
  setFilteredInstitutes,
  setLocationQuery,
  setPrice,
  setRating,
  setSortBy,
  setSubjects,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import { useClickOutside } from "../../hooks/useClickOutside";
import { GoChevronDown } from "react-icons/go";
import CourseCard from "../Course/MetaCourseSection/CourseCard";
import InstituteCard from "../../UI/InstituteCard";
import EnquiryFormModal from "../EnquiryFormModal/EnquiryFormModal";
import { setEnquiryFormModal } from "../../../redux/slices/UserAnalytics";
import { InstiutesWith99 } from "../../CochingWith99/Data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",

  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};

const sortData = [
  {
    name: "Institutes",
  },
  {
    name: "Courses",
  },
];
const modeData = [
  {
    name: "Online",
    value: 1,
  },
  {
    name: "Offline",
    value: 2,
  },
  {
    name: "Hybrid",
    value: 3,
  },
  {
    name: "Clear All",
    value: "",
  },
];

const examsData = [
  {
    name: "NEET",
    instituteValue: "NEET",
    value: "NEET",
  },
  {
    name: "NEET-PG",
    instituteValue: "NEET-PG",
    value: "NEET PG",
  },
  {
    name: "AIIMS",
    instituteValue: "AIIMS",
    value: "AIIMS",
  },
  {
    name: "AIIMS-PG",
    instituteValue: "AIIMS-PG",
    value: "AIIMS PG",
  },
  {
    name: "PGIMER",
    instituteValue: "PGIMER",
    value: "PGIMER",
  },
  {
    name: "CMSE",
    instituteValue: "CMSE",
    value: "CMSE",
  },
  {
    name: "FPMT",
    instituteValue: "FPMT",
    value: "FPMT",
  },
  {
    name: "NPE-FET",
    instituteValue: "NPE-FET",
    value: "NPE FET",
  },

  {
    name: "IIT-JEE-MAIN",
    instituteValue: "IIT-JEE-MAIN",
    value: "JEE Mains",
  },
  {
    name: "IIT-JEE-ADVANCE",
    instituteValue: "IIT-JEE-ADVANCE",
    value: "JEE Advanced",
  },
  {
    name: "GATE",
    instituteValue: "GATE",
    value: "GATE",
  },
  {
    name: "NATA",
    instituteValue: "NATA",
    value: "NATA",
  },
  {
    name: "DUET",
    instituteValue: "DUET",
    value: "DUET",
  },
  {
    name: "AMET",
    instituteValue: "AMET",
    value: "AMET",
  },
  {
    name: "BITSAT",
    instituteValue: "BITSAT",
    value: "BITSAT",
  },
  {
    name: "VITEEE",
    instituteValue: "VITEEE",
    value: "VITEEE",
  },
  {
    name: "SRMJEE",
    instituteValue: "SRMJEE",
    value: "SRMJEE",
  },
  {
    name: "COMEDK",
    instituteValue: "COMEDK",
    value: "COMEDK",
  },
  {
    name: "KIITEE",
    instituteValue: "KIITEE",
    value: "KIITEE",
  },
  {
    name: "WBJEE",
    instituteValue: "WBJEE",
    value: "WBJEE",
  },
  {
    name: "MHTCET",
    instituteValue: "MHTCET",
    value: "MHTCET",
  },
  {
    name: "MET",
    instituteValue: "MET",
    value: "MET",
  },
  ,
  {
    name: "CUET",
    instituteValue: "Common University Entrance Test (CUET)",
    value: "Common University Entrance Test (CUET)",
  },
  {
    name: "Clear All",
    instituteValue: "",
    value: "",
  },
];

const classData = [
  {
    name: "Class 1",
    value: "Class 1",
  },
  {
    name: "Class 2",
    value: "Class 2",
  },
  {
    name: "Class 3",
    value: "Class 3",
  },
  {
    name: "Class 4",
    value: "Class 4",
  },
  {
    name: "Class 5",
    value: "Class 5",
  },
  {
    name: "Class 6",
    value: "Class 6",
  },
  {
    name: "Class 7",
    value: "Class 7",
  },
  {
    name: "Class 8",
    value: "Class 8",
  },
  {
    name: "Class 9",
    value: "Class 9",
  },
  {
    name: "Class 10",
    value: "Class 10",
  },
  {
    name: "Class 11",
    value: "Class 11",
  },
  {
    name: "Class 12",
    value: "Class 12",
  },
  {
    name: "Clear All",
    value: "",
  },
];

const subjectData = [
  {
    name: "English",
    value: "Upper Primary/English",
    streams: ["Upper Primary"],
  },
  {
    name: "Hindi",
    value: "Upper Primary/Hindi",
    streams: ["Upper Primary"],
  },

  {
    name: "Maths",
    value: "Upper Primary/Maths",
    streams: ["Upper Primary"],
  },
  {
    name: "Social Studies",
    value: "Upper Primary/Social Studies",
    streams: ["Upper Primary"],
  },
  {
    name: "Science",
    value: "Upper Primary/Science",
    streams: ["Upper Primary"],
  },
  {
    name: "Computer Science",
    value: "Upper Primary/Computer Science",
    streams: ["Upper Primary"],
  },
  {
    name: "English",
    value: "High School/English",
    streams: ["High School"],
  },
  {
    name: "Hindi",
    value: "High School/Hindi",
    streams: ["High School"],
  },
  {
    name: "Physics",
    value: "High School/Physics",
    streams: ["High School"],
  },
  {
    name: "Chemistry",
    value: "High School/Chemistry",
    streams: ["High School"],
  },
  {
    name: "Biology",
    value: "High School/Biology",
    streams: ["High School"],
  },
  {
    name: "Maths",
    value: "High School/Maths",
    streams: ["High School"],
  },
  {
    name: "Social Studies",
    value: "High School/Social Studies",
    streams: ["High School"],
  },
  {
    name: "Science",
    value: "High School/Science",
    streams: ["High School"],
  },

  {
    name: "Computer Science",
    value: "High School/Computer Science",
    streams: ["High School"],
  },

  {
    name: "English",
    value: "Science/English",
    streams: ["Science"],
  },
  {
    name: "Physics",
    value: "Science/Physics",
    streams: ["Science"],
  },
  {
    name: "Chemistry",
    value: "Science/Chemistry",
    streams: ["Science"],
  },
  {
    name: "Biology",
    value: "Science/Biology",
    streams: ["Science"],
  },
  {
    name: "Maths",
    value: "Science/Maths",
    streams: ["Science"],
  },
  {
    name: "Botany",
    value: "Science/Botany",
    streams: ["Science"],
  },
  {
    name: "Zoology",
    value: "Science/Zoology",
    streams: ["Science"],
  },
  {
    name: "IP",
    value: "Science/IP",
    streams: ["Science"],
  },
  {
    name: "Computer Science",
    value: "Science/Computer Science",
    streams: ["Science"],
  },
  {
    name: "Java",
    value: "Science/Java",
    streams: ["Science"],
  },
  {
    name: "English",
    value: "Commerce/English",
    streams: ["Commerce"],
  },
  {
    name: "Accounts",
    value: "Commerce/Accounts",
    streams: ["Commerce"],
  },
  {
    name: "Economics",
    value: "Commerce/Economics",
    streams: ["Commerce"],
  },
  {
    name: "Business Studies",
    value: "Commerce/Business Studies",
    streams: ["Commerce"],
  },
  {
    name: "Mathematics",
    value: "Commerce/Mathematics",
    streams: ["Commerce"],
  },
  {
    name: "Statistics",
    value: "Commerce/Statistics",
    streams: ["Commerce"],
  },
  {
    name: "IP",
    value: "Commerce/IP",
    streams: ["Commerce"],
  },
  {
    name: "Computer Science",
    value: "Commerce/Computer Science",
    streams: ["Commerce"],
  },
  {
    name: "Java",
    value: "Commerce/Java",
    streams: ["Commerce"],
  },
  {
    name: "Economics",
    value: "Humanities/Economics",
    streams: ["Humanities"],
  },
  {
    name: "History",
    value: "Humanities/History",
    streams: ["Humanities"],
  },
  {
    name: "Philosophy",
    value: "Humanities/Philosophy",
    streams: ["Humanities"],
  },
  {
    name: "Sociology",
    value: "Humanities/Sociology",
    streams: ["Humanities"],
  },
  {
    name: "Anthropology",
    value: "Humanities/Anthropology",
    streams: ["Humanities"],
  },
  {
    name: "Political Science",
    value: "Humanities/Political Science",
    streams: ["Humanities"],
  },
  {
    name: "Journalism",
    value: "Humanities/Journalism",
    streams: ["Humanities"],
  },
  {
    name: "Law",
    value: "Humanities/Law",
    streams: ["Humanities"],
  },
  {
    name: "English",
    value: "Humanities/English",
    streams: ["Humanities"],
  },
  {
    name: "Clear All",
    value: "",
    streams: [
      "Science",
      "Commerce",
      "Upper Primary",
      "High School",
      "Humanities",
    ],
  },
];

const OfferRecommended = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const router = useRouter();
  const [searchShow, setSearchShow] = useState(false);
  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
    areaLocation,
    searchByName,
  } = useSelector(selectSearch);
  const { courses, search, fields } = useSelector(selectCourse);
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();

  const [type, setType] = useState(null);
  const [sortBy, setSortBy] = useState("Institutes");
  const [locationBy, setLocationBy] = useState(null);

  // useEffect(() => {
  //   if (searchQuery?.length > 1) {
  //     filterBySearch(searchQuery, "");
  //   }
  //   if (selectedInstituteName?.length > 0) {
  //     const filterByName = courses.filter((course) => {
  //       return course.institute?.name
  //         .toLowerCase()
  //         .includes(selectedInstituteName.toLowerCase());
  //     });
  //
  //     dispatch(setFilteredCourses(filterByName));
  //   }
  // }, [selectedInstituteName, searchQuery, courses]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

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

  const [classOpen, setClassOpen] = useState(true);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  let {
    classType,
    category,
    duration,
    // sortBy,
    rating,
    price,
    classes,
    subjects,
    board,
    exam,
    skill,
  } = filters;

  const [institutes, setInstitutes] = useState([]);
  const [allInstitutes, setAllInstitutes] = useState([]);
  const [sort, setSort] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [academics, setAcademics] = useState(true);
  const [engineering, setEngineering] = useState(false);
  const [entranceExam, setEntranceExam] = useState(false);
  const [medical, setMedical] = useState(false);
  const [skillBase, setSkillBased] = useState(false);

  const [examBy, setExamBy] = useState(null);
  const [subjectBy, setSubjectBy] = useState(null);
  const [classBy, setClassBy] = useState(null);
  const [ratings, setRatings] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchInstitutes());
  // }, []);

  const [locationWiseIns, setLocationWiseIns] = useState([]);

  const [instituteData, setInstituteData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState([]);
  const [currentInstituteCourse, setCurrentInstituteCourse] = useState([]);

  useEffect(() => {
    //99 ta courses institutes lists add from here

    let institutesData = [];

    InstiutesWith99.forEach(async (e) => {
      const { data } = await axios.get(`${host}/institute?id=${e}`);

      if (data.message) {
        institutesData.push(data?.message);
      }

      if (institutesData.length === 38) {
        setAllInstitutes(institutesData);
        setInstitutes(institutesData);
      }
    });

    // setAllInstitutes(instituteData);
    // setInstitutes(instituteData);
  }, []);

  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const data = [];
    if (classes) {
      data.push(...data, ...classes);
    }
    if (subjects) {
      subjects.forEach((s) => {
        const subject = s.split("/")[1];
        data.push(...data, subject);
      });
    }
    // if (fields) {
    //   data.push(...data, fields);
    // }
    if (rating) {
      const rate = `${rating} Rated`;
      data.push(...data, rate);
    }
    if (category) {
      data.push(
        ...data,
        category.split("/")[1] ? category.split("/")[1] : category
      );
    }

    if (exam) {
      data.push(...data, ...exam);
    }

    let uniqueChars = [...new Set(data)];

    setSearchList(uniqueChars);
  }, [classes, subjects, category, exam, rating]);

  const [searchData, setSearchData] = useState([]);

  const removeHandle = (n) => {
    dispatch(setLocationQuery(""));

    // allInstitutes(10);

    if (classes) {
      const filterClasses = classes?.filter((c) => c !== n);
      dispatch(setClass(filterClasses));
    }
    if (subjects) {
      const filterSubject = subjects?.filter((c) => c.split("/")[1] !== n);

      dispatch(setSubjects(filterSubject));
    }
    if (exam) {
      const filterExam = exam?.filter((c) => c !== n);

      dispatch(setExam(filterExam));
    }
    if (fields) {
      dispatch(setFields(""));
    }

    if (rating) {
      dispatch(setRating(null));
    }
  };

  const [searchText, setSearchText] = useState("");
  const [ratingShow, setRatingShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);
  const [locationShow, setLocationShow] = useState(false);
  const [classShow, setClassShow] = useState(false);
  const [subjectShow, setSubjectShow] = useState(false);
  const [typeShow, setTypeShow] = useState(false);
  const [examShow, setExamShow] = useState(false);

  const [dropDownClose, setDropDownClose] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    setRatingShow(false);
    setSortShow(false);
    setLocationShow(false);
    setClassShow(false);
    setSubjectShow(false);
    setTypeShow(false);
    setExamShow(false);
    e.stopPropagation();
  };

  // useEffect(() => {
  //   if (dropDownClose) {

  //   }
  // }, [dropDownClose]);

  // useEffect(() => {
  //   if (locationQuery?.length) {
  //     setLocationBy(locationQuery);
  //   }
  //   else{
  //     setLocationBy(null)
  //   }
  // }, [locationQuery]);

  const handleSearch = () => {};

  useEffect(() => {
    if (search?.type === "institute") {
      setSortBy("Institutes");
    }
    if (search?.type === "course") {
      setSortBy("Courses");
    }
  }, [search?.type]);

  const metaSection = "ravi";

  const [totalCount, setTotalCount] = useState();
  const [streams, setStreams] = useState();
  const [subjectStreams, setSubjectStreams] = useState();
  const [examStreams, setExamStreams] = useState();

  useEffect(() => {
    const run = async () => {
      let category = {};
      if (classBy) {
        category.classes = [classBy];
      }
      // if (subjectBy) {
      //   category.subjects = [subjectBy];
      // }
      if (examBy?.name) {
        category.exams = [examBy?.value];
      }

      try {
        const res = await axios.get(
          `${host}/course?category=${JSON.stringify(
            category
          )}&name=${searchText}&limit=50`
        );

        dispatch(setFilteredCourses(res?.data?.message));
        setTotalCount(res?.data?.totalCount);
        setCourse(res?.data?.message);
        setCurrentInstituteCourse(res?.data?.message);
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (
      searchText?.length ||
      classBy?.length ||
      examBy?.name ||
      search === {} ||
      search?.name?.length === 0
    ) {
      run();
    }
  }, [searchText, classBy, examBy, search]);

  useEffect(() => {
    if (ratings) {
      setCurrentInstituteCourse(course.filter((a) => a.rating === ratings));
      setInstitutes(allInstitutes.filter((a) => a.rating === ratings));
    }
    if (ratings === "") {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, ratings, allInstitutes]);

  useEffect(() => {
    if (searchText) {
      setInstitutes(
        allInstitutes.filter((a) =>
          a.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    if (!searchText) {
      setInstitutes(allInstitutes);
    }
  }, [searchText, allInstitutes]);

  useEffect(() => {
    if (type) {
      setCurrentInstituteCourse(course.filter((a) => a.classtype === type));
      setInstitutes(allInstitutes.filter((a) => a.classmode === type));
    }
    if (type === "") {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, type, allInstitutes]);

  useEffect(() => {
    if (locationBy) {
      setCurrentInstituteCourse(
        course.filter((a) =>
          a.institute.area_tags.includes(locationBy.toLowerCase())
        )
      );
      setInstitutes(
        allInstitutes.filter((a) =>
          a.area_tags.includes(locationBy.toLowerCase())
        )
      );
    }
    if (locationBy === "") {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, locationBy, allInstitutes]);

  const [topLocationData, setTopLocationData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${host}/locations?limit=100`).then(function (response) {
        setTopLocationData(response.data.message);
      });
    } catch (err) {}
  }, []);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let uniqueIds = [];

    // const unique = topLocationData?.filter((element) => {
    //   const isDuplicate = uniqueIds.includes(element.name);

    //   if (!isDuplicate) {
    //     uniqueIds.push({
    //       name: element.name,
    //       value: element.name,
    //     });

    //     return true;
    //   }

    //   return false;
    // });

    uniqueIds.push({
      name: "Nizamuddin",
      value: "Nizamuddin",
    });
    uniqueIds.push({
      name: "Bhogal",
      value: "Bhogal",
    });
    uniqueIds.push({
      name: "Aashram",
      value: "Aashram",
    });
    uniqueIds.push({
      name: "Lajpat Nagar",
      value: "Lajpat Nagar",
    });
    uniqueIds.push({
      name: "Kaushambi",
      value: "Kaushambi",
    });
    uniqueIds.push({
      name: "Vaishali",
      value: "Vaishali",
    });
    uniqueIds.push({
      name: "Vasundhara",
      value: "Vasundhra",
    });
    uniqueIds.push({
      name: "Indirapuram",
      value: "Indirapuram",
    });
    uniqueIds.push({
      name: "Delhi",
      value: "Delhi",
    });
    uniqueIds.push({
      name: "Clear All",
      value: "",
    });

    setLocations(uniqueIds);
  }, [topLocationData]);

  const [showMore, setShowMore] = useState(12);

  let domNode = useClickOutside(() => {
    setSearchShow(false);
  });
  const { modalBox } = useStyle();
  return (
    <div className="p-5 sm:p-10 ">
      {/* <div className="  md:hidden block w-full">
        <img
          className="  cursor-pointer w-full h-[115px] rounded-md mb-2"
          src={ninetynineImage.src}
          onClick={() => router.push("/coaching-in-99")}
          alt=""
        />

        <p
          onClick={() => setOpen(true)}
          className="px-8 py-2 bg-primary w-full rounded-md text-[20px] text-center text-white cursor-pointer"
        >
          Join Now
        </p>
      </div> */}
      <div className="md:flex justify-between items-center my-3">
        <div className="search">
          {" "}
          <div
            className={` shrink md:w-96 px-3 py-2    rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out flex items-center justify-between `}
          >
            <input
              type="text"
              placeholder="Search Institute"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={searchText || ""}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <FiSearch
              onClick={(e) => {
                handleSearch();
                e.stopPropagation();
              }}
              className="text-gray text-xl cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className=" md:flex grid grid-cols-2 gap-2  items-center my-3">
        <div className="relative  my-1">
          <p
            onClick={(e) => {
              setSortShow(!sortShow);
              setRatingShow(false);
              setTypeShow(false);
              setLocationShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setExamShow(false);
              setClassShow(false);
              e.stopPropagation();
            }}
            className="flex w-full rounded-md justify-between md:w-44 items-center  cursor-pointer border-4 border-solid border-primary  md:p-3  p-2"
          >
            <p className={` text-primary text-[16px] font-bold `}>
              {sortBy ? sortBy : "Sort By"}
            </p>
            {sortShow ? (
              <GoChevronDown className="ml-1 text-primary text-[16px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-primary text-[16px]" />
            )}
          </p>
          {sortShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-40 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  {sortData?.map((element, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex ${
                          sortBy === element.name
                            ? "text-primary"
                            : "text-[#000000]"
                        }   justify-between cursor-pointer  items-center`}
                        onClick={() => {
                          setSortBy(element.name);
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
        <div className="relative  my-1">
          <p
            onClick={(e) => {
              setLocationShow(!locationShow);
              setSortShow(false);
              setRatingShow(false);
              setTypeShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setClassShow(false);
              e.stopPropagation();
            }}
            className="flex w-full justify-between rounded-md  items-center  cursor-pointer border-2 border-solid border-light-gray  md:p-3 p-2"
          >
            <p className={` text-[#000000] text-[16px] `}>
              {locationBy
                ? locationBy
                : locationQuery
                ? locationQuery
                : "Location"}
            </p>
            {locationShow ? (
              <GoChevronDown className="ml-1 text-[16px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[16px]" />
            )}
          </p>
          {locationShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-40 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1 divide-y divide-gray/20 h-[400px] overflow-y-scroll"
                  role="none"
                >
                  {locations?.map((element, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex ${
                          locationBy === element.value
                            ? "text-primary"
                            : "text-[#000000]"
                        }   justify-between cursor-pointer  items-center`}
                        onClick={() => {
                          setLocationBy(element.value);
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
        <div className="relative  my-1">
          <p
            onClick={(e) => {
              setTypeShow(!typeShow);
              setRatingShow(false);
              setLocationShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setExamShow(false);
              setClassShow(false);
              setSortShow(false);
              e.stopPropagation();
            }}
            className="flex w-full rounded-md justify-between md:w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  md:p-3 p-2 "
          >
            <p className={` text-[#000000] text-[16px] `}>
              {type
                ? type === 3
                  ? "Hybrid"
                  : type === 2
                  ? "Offline"
                  : "Online"
                : "Select Type"}
            </p>
            {typeShow ? (
              <GoChevronDown className="ml-1 text-[16px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[16px]" />
            )}
          </p>
          {typeShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-40 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  {modeData?.map((element, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex ${
                          type === element.value
                            ? "text-primary"
                            : "text-[#000000]"
                        }   justify-between cursor-pointer  items-center`}
                        onClick={() => {
                          setType(element.value);
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

        <div className="relative">
          <p
            onClick={(e) => {
              setRatingShow(!ratingShow);
              setTypeShow(false);
              setLocationShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setClassShow(false);
              setSortShow(false);
              e.stopPropagation();
            }}
            className="flex w-full rounded-md justify-between items-center md:w-44 cursor-pointer border-2 border-solid border-light-gray  md:p-3 p-2"
          >
            <p className={` text-[#000000] text-[16px] `}>
              {ratings ? `${ratings} Star` : "Ratings"}
            </p>
            {ratingShow ? (
              <GoChevronDown className="ml-1 text-[16px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[16px]" />
            )}
          </p>
          {ratingShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-40 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  <div
                    className={`flex  ${
                      ratings === 5 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      setRatings(5);
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>5 star</p>
                    <Rating
                      className={`mr-2`}
                      name="read-only"
                      value={5}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div
                    onClick={() => {
                      setRatings(4);
                    }}
                    className={`flex   ${
                      ratings === 4 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>4 star</p>
                    <Rating
                      className={`mr-2`}
                      name="read-only"
                      value={4}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div
                    onClick={() => {
                      setRatings(3);
                    }}
                    className={`flex   ${
                      ratings === 3 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>3 star</p>
                    <Rating
                      className={`mr-2`}
                      name="read-only"
                      value={3}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div
                    onClick={() => {
                      setRatings(2);
                    }}
                    className={`flex   ${
                      ratings === 2 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>2 star</p>
                    <Rating
                      className={`mr-2`}
                      name="read-only"
                      value={2}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div
                    onClick={() => {
                      setRatings(1);
                    }}
                    className={`flex   ${
                      ratings === 1 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>1 star</p>
                    <Rating
                      className={`mr-2`}
                      name="read-only"
                      value={1}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div
                    onClick={() => {
                      setRatings("");
                    }}
                    className={`flex   ${
                      ratings === "" ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Clear All</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* <div className="md:p-5 container mx-auto md:block hidden">
        <img
          className="md:w-full md:h-full  cursor-pointer "
          src={ninetynineImage.src}
          onClick={() => router.push("/coaching-in-99")}
          alt=""
        />
      </div> */}

      {/* Course Card */}

      {sortBy === "Courses" ? (
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {filteredCourses?.length > 0 &&
            filteredCourses
              ?.slice(0, 50)
              .map((item, key) => <CourseCard {...item} key={key} />)}
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {institutes?.length > 0 &&
            institutes
              ?.slice(0, showMore)
              .map((item, key) => <InstituteCard {...item} key={key} />)}
        </div>
      )}

      {institutes?.length > 0 ? (
        <div className="flex justify-center my-10">
          {showMore === 50 ? (
            <button
              onClick={() => {
                setShowMore(12);
                // router.push(`/search`);
              }}
              className=" px-6 py-2 md:text-lg flex items-center bg-black text-white rounded-md hover:scale-105 duration-200 "
            >
              See Less{" "}
              <GoChevronDown className={`ml-1 text-[20px]  rotate-180 `} />{" "}
            </button>
          ) : (
            <button
              onClick={() => {
                setShowMore(50);
                // router.push(`/search`);
              }}
              className=" px-6 py-2 md:text-lg flex items-center bg-black text-white rounded-md hover:scale-105 duration-200 "
            >
              {" "}
              See More <GoChevronDown className={`ml-1 text-[20px]`} />
            </button>
          )}
        </div>
      ) : (
        ""
      )}

      <EnquiryFormModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default OfferRecommended;
