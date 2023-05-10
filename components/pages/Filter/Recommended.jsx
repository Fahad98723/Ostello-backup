import { Rating } from "@mui/material";
import { useTheme } from "@mui/system";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import instituteImage from "../../../assets/images/institute.png";
import banner from "../../../assets/toplocationbanner.png";

import {
  selectCourse,
  setFields,
  setSearch,
} from "../../../redux/slices/courseSlice";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import {
  selectSearch,
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
import { isEmpty } from "../../../utils/utils";
import { useClickOutside } from "../../hooks/useClickOutside";

import { GoChevronDown } from "react-icons/go";
import CourseCard from "../Course/MetaCourseSection/CourseCard";
import InstituteCard from "../../UI/InstituteCard";
import ninetynineImage from "../../../assets/images/99rs.png";
import axios from "axios";

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

const states = [
  {
    name: "Delhi",
    value: "Delhi",
  },
  {
    name: "Haryana",
    value: "Haryana",
  },
  {
    name: "Uttar Pradesh",
    value: "Uttar Pradesh",
  },
  {
    name: "Clear",
    value: "",
  },
];

const categoryData = [
  {
    name: "Academics",
    value: "Academics",
  },
  {
    name: "Medical",
    value: "Medical",
  },
  {
    name: "Engineering",
    value: "Engineering",
  },
  {
    name: "Humanities",
    value: "Humanities",
  },
  {
    name: "Law",
    value: "Law",
  },
  {
    name: "Commerce",
    value: "Commerce",
  },
  {
    name: "Skill Based",
    value: "Skill",
  },
  {
    name: "Clear All",
    value: "",
  },
];

const Recommended = ({ name }) => {
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

  const filterByLocation = async (locName) => {
    try {
      const { data } = await axios.get(
        `${host}/institute?approval=1&location=${
          locName === "Jangpura" ? "Jungpura" : locName
        }&nolimit=true`
      );
      
      setItemCount(data?.count);
      dispatch(setFilteredInstitutes(data.message));
    } catch (error) {
      toast.error(error.toString());
    }
  };

  // useEffect(() => {

  // },[])

  

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

  const theme = useTheme();

  const [classOpen, setClassOpen] = useState(true);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  let {
    classType,
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
  const [state, setState] = useState("");
  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchInstitutes());
  // }, []);

  const [locationWiseIns, setLocationWiseIns] = useState([]);

  const [instituteData, setInstituteData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState([]);
  const [currentInstituteCourse, setCurrentInstituteCourse] = useState([]);

  // useEffect(() => {
  //   if (searchField?.length > 1) {
  //     getCourses();
  //   }
  // }, [searchField]);

  const filterBySearch = async (text, area) => {
    // dispatch(setLocationQuery(""));
    try {
      const { data } = await axios.get(
        `${host}/institute/query?approval=1&name=${text?.replaceAll(
          "+",
          "%2B"
        )}&location=${area}&limit=50`
      );
      const sortInstitutes = data.message?.filter(
        (items) => "classmode" in items
      );

      const sortCourses = data.message?.filter((items) => "classtype" in items);
      
      setItemCount(data?.count);
      dispatch(setFilteredInstitutes(sortInstitutes));

      setAllInstitutes(sortInstitutes);

      dispatch(setFilteredCourses(sortCourses));

      setCourse(sortCourses);
      setCurrentInstituteCourse(sortCourses);
      //  if(area?.length > 1){
      //   filterByArea(area,sortInstitutes);
      // }
      
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const [type, setType] = useState(null);
  const [sortBy, setSortBy] = useState("Institutes");
  const [locationBy, setLocationBy] = useState(locationQuery);
  const [locationName, setLocationName] = useState("");

  const filterByCategory = async (cat) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?approval=1&services=${query}${
          locationBy ? `&location=${locationBy}` : ""
        }&limit=50`
      );
      const sortInstitutes = data?.message;
      setItemCount(data?.count);
      
      dispatch(setFilteredInstitutes(sortInstitutes));
      setAllInstitutes(sortInstitutes);
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const allInstitutesResult = async () => {
    try {
      const { data } = await axios.get(`${host}/institute?approval=1&limit=50`);
      setItemCount(data?.count);
      dispatch(setFilteredInstitutes(data?.message));
      
      setAllInstitutes(data?.message);
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    if (!search?.name?.length || search === {}) {
      allInstitutesResult();
      
    }
    
  }, [search]);

  useEffect(() => {
    if (search?.name?.length) {
      
      if (classBy?.length) {
        
        if (classBy === "Class 11" || classBy === "Class 12") {
          const sortInstitutes = allInstitutes?.filter(
            (a) => a?.services["Senior Secondary School (Class 11-12th)"]
          );
          dispatch(setFilteredInstitutes(sortInstitutes));
          // setInstitutes(sortInstitutes);

          
        } else {
          const sortInstitutes = allInstitutes?.filter((a) =>
            a?.services[
              "Junior Secondary School (Class 6-10th)"
            ]?.classes?.includes(classBy)
          );
          dispatch(setFilteredInstitutes(sortInstitutes));
          // setInstitutes(sortInstitutes);

          
        }
      }
      if (!classBy?.length) {
        dispatch(setFilteredInstitutes(allInstitutes));
        setInstitutes(allInstitutes);
        
      }
    }
  }, [allInstitutes, classBy, search]);

  useEffect(() => {
    if (!isEmpty(search)) {
      if (
        search?.type === "institute" ||
        search?.type === null ||
        search?.type === "course"
      ) {
        if (search?.name?.length > 1) {
          filterBySearch(search?.name, "");
        }
      }
      if (search?.type === "exam") {
        let json = {};
        if (search?.name?.toUpperCase() === "CUET") {
          json = {
            "Competitive Exams": {
              examsPerFields: ["Common University Entrance Test (CUET)"],
            },
          };
        } else {
          json = {
            "Competitive Exams": {
              examsPerFields: [search?.name],
            },
          };
          setExamBy({
            name: search?.name.toUpperCase(),
            value: search?.name.toUpperCase(),
          });
        }
        

        filterByCategory(json);
      }
    }
    if (locationQuery?.length > 1) {
      // if (!locationQuery.includes(",")) {
      filterByLocation(locationQuery);
    }
    // else {
    //   allInstitutes(10);
    // }
  }, [locationQuery, search?.type, search]);

  

  

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
  const [stateShow, setStateShow] = useState(false);
  const [classShow, setClassShow] = useState(false);
  const [subjectShow, setSubjectShow] = useState(false);
  const [typeShow, setTypeShow] = useState(false);
  const [examShow, setExamShow] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);

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
    setStateShow(false);
    e.stopPropagation();
  };

  // useEffect(() => {
  //   if (dropDownClose) {

  //   }
  // }, [dropDownClose]);

  

  useEffect(() => {
    if (locationQuery?.length) {
      setLocationBy(locationQuery);
    } else {
      setLocationBy(null);
    }
  }, [locationQuery]);

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

  useEffect(() => {
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
      dispatch(
        setFilteredInstitutes(allInstitutes.filter((a) => a.rating === ratings))
      );
      dispatch(setFilteredCourses(course.filter((a) => a.rating === ratings)));
    }
    if (ratings === "") {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
      dispatch(setFilteredInstitutes(allInstitutes));
      dispatch(setFilteredCourses(course));
    }
  }, [course, ratings, allInstitutes]);

  useEffect(() => {
    if (searchText) {
      setInstitutes(
        allInstitutes.filter((a) =>
          a.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      dispatch(
        setFilteredInstitutes(
          allInstitutes.filter((a) =>
            a.name.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    }
    if (searchText === "") {
      setInstitutes(allInstitutes);
      dispatch(setFilteredInstitutes(allInstitutes));
    }
  }, [course, allInstitutes, searchText]);

  

  useEffect(() => {
    if (locationBy) {
      setCurrentInstituteCourse(
        course.filter((a) =>
          a?.institute?.area_tags?.includes(locationBy.toLowerCase())
        )
      );
      setInstitutes(
        allInstitutes.filter((a) =>
          a?.area_tags?.includes(locationBy.toLowerCase())
        )
      );
      dispatch(
        setFilteredInstitutes(
          allInstitutes.filter((a) =>
            a?.area_tags?.includes(locationBy.toLowerCase())
          )
        )
      );
      dispatch(
        setFilteredCourses(
          course.filter((a) =>
            a?.institute?.area_tags?.includes(locationBy.toLowerCase())
          )
        )
      );
    }
    if (locationBy === "") {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
      dispatch(setFilteredInstitutes(allInstitutes));
      dispatch(setFilteredCourses(course));
    }
  }, [course, locationBy, allInstitutes]);

  useEffect(() => {
    
    if (type) {
      setCurrentInstituteCourse(course.filter((a) => a.classtype === type));
      setInstitutes(allInstitutes.filter((a) => a.classmode === type));
      dispatch(
        setFilteredInstitutes(allInstitutes.filter((a) => a.classmode === type))
      );
      dispatch(setFilteredCourses(course.filter((a) => a.classtype === type)));
    }
    if (type === "") {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
      dispatch(setFilteredInstitutes(allInstitutes));
      dispatch(setFilteredCourses(course));
    }
  }, [course, type, allInstitutes]);

  // useEffect(() => {
  //   
  //   if (locationBy) {
  //     setCurrentInstituteCourse(
  //       course.filter((a) =>
  //         a.institute.area_tags.includes(locationBy.toLowerCase())
  //       )
  //     );
  //     setInstitutes(allInstitutes.filter((a) =>
  //     a.area_tags.includes(locationBy.toLowerCase())
  //   ))
  //   }
  //   if (!locationBy) {
  //     setCurrentInstituteCourse(course);
  //     setInstitutes(allInstitutes);
  //   }
  // }, [course, locationBy, allInstitutes]);

  // useEffect(() => {
  //   
  //   if (locationBy) {
  //     setCurrentInstituteCourse(
  //       course.filter((a) =>
  //         a.institute.area_tags.includes(locationBy.toLowerCase())
  //       )
  //     );
  //   }
  //   if (!locationBy) {
  //     setCurrentInstituteCourse(course);
  //     // setInstitutes(allInstitutes);
  //   }
  // }, [course, locationBy, allInstitutes]);

  const [topLocationData, setTopLocationData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${host}/locations?state=${state}&name=${locationName}&limit=100`)
        .then(function (response) {
          setTopLocationData(response.data.message);
          
        });
    } catch (err) {
      
    }
  }, [state, locationName]);

  const [locations, setLocations] = useState([]);

  

  useEffect(() => {
    let uniqueIds = [];

    const unique = topLocationData?.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.name);

      if (!isDuplicate) {
        uniqueIds.push({
          name: element.name,
          value: element.name,
        });

        return true;
      }

      return false;
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

  
  let domNode = useClickOutside(() => {
    setSearchShow(false);
  });

  const [searchData, setSearchData] = useState([])


  useEffect(() => {
    if (searchText.length) {
      const run = async () => {
        try {
          const res = await axios.get(
            `${host}/institute?name=${searchText}&limit=20`
          );
          setSearchData(res?.data?.message);
          
        } catch (err) {
          toast.error(err.message);
        }
      }
      run()
    }
  }, [searchText])

  return (
    <div className="p-5 sm:p-10 ">
      <div className="md:flex justify-between items-center my-5">
        <p className=" md:text-[38px] text-[28px] text-[#1D2939]">
          Search Result of{" "}
          <span className="text-primary">{search?.name || locationQuery}</span>
        </p>
        <div className="search relative">
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
          {searchText.length > 0 ? (
            <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
              <div
                className="p-1 divide-y divide-gray/20 max-h-[300px] overflow-y-scroll"
                role="none"
              >
                {searchData?.map((element, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`flex text-[#000000]
                         cursor-pointer  items-center`}
                      onClick={() => {
                        router.push(`/institute/${element.slug}`)
                      }}
                    >
                      <img
                        src={
                          element?.images?.length
                            ? `https://cdn.ostello.co.in/${element?.images[0]?.key}`
                            : instituteImage.src
                        }
                        className="w-[40px] h-[40px]"
                        alt=""
                      />
                      <p className={`  text-[15px]  px-4 py-2 `}>
                        {element.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" md:flex grid grid-cols-2 gap-4  items-center my-5">
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
            className="flex  justify-between md:w-36 items-center  cursor-pointer border-4 border-solid border-primary  p-2 "
          >
            <p className={` text-primary text-[13px] font-bold `}>
              {sortBy ? sortBy : "Sort By"}
            </p>
            {sortShow ? (
              <GoChevronDown className="ml-1 text-primary text-[13px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-primary text-[13px]" />
            )}
          </p>
          {sortShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <p className={`  text-[13px]  px-4 py-2 `}>
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
              setStateShow(!stateShow);
              setLocationShow(false);
              setSortShow(false);
              setRatingShow(false);
              setTypeShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setClassShow(false);
              e.stopPropagation();
            }}
            className="flex w-full justify-between  items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
          >
            <p className={` text-[#000000] text-[13px] `}>
              {state ? state : "States"}
            </p>
            {stateShow ? (
              <GoChevronDown className="ml-1 text-[13px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[13px]" />
            )}
          </p>
          {stateShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1 divide-y divide-gray/20 -max-h-[400px] overflow-y-scroll"
                  role="none"
                >
                  {states?.map((element, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex ${
                          state === element.value
                            ? "text-primary"
                            : "text-[#000000]"
                        }   justify-between cursor-pointer  items-center`}
                        onClick={() => {
                          setState(element.value);
                          setStateShow(false);
                          if (
                            (element?.value &&
                              element?.value?.toLowerCase() === "delhi") ||
                            element?.value?.toLowerCase() === "haryana" ||
                            element?.value?.toLowerCase() === "uttar-pradesh"
                          ) {
                          }
                          const json = {};
                          // filterByCategory(json, element.value);
                        }}
                      >
                        <p className={`  text-[13px]  px-4 py-2 `}>
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
          {locationShow ? (
            <input
              className="border-2 border-solid border-light-gray outline-none  p-2"
              onChange={(e) => setLocationName(e.target.value)}
              autoFocus
              type="text"
            />
          ) : (
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
              className="flex w-full justify-between  items-center  cursor-pointer border-2 border-solid border-light-gray   p-2"
            >
              <p className={` text-[#000000] text-[13px] `}>
                {locationBy ? locationBy : "Location"}
              </p>
              {locationShow ? (
                <GoChevronDown className="ml-1 text-[13px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[13px]" />
              )}
            </p>
          )}
          {locationShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          const json = {};
                          // filterByCategory(json, element.value);
                        }}
                      >
                        <p className={`  text-[13px]  px-4 py-2 `}>
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
            className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
          >
            <p className={` text-[#000000] text-[13px] `}>
              {type
                ? type === 3
                  ? "Hybrid"
                  : type === 2
                  ? "Offline"
                  : "Online"
                : "Select Type"}
            </p>
            {typeShow ? (
              <GoChevronDown className="ml-1 text-[13px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[13px]" />
            )}
          </p>
          {typeShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <p className={`  text-[13px]  px-4 py-2 `}>
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
              setCategoryShow(!categoryShow);
              e.stopPropagation();
            }}
            className="flex w-full justify-between md:w-36 items-center  cursor-pointer border-2 border-solid border-light-gray   p-2 "
          >
            <p className={` text-[#000000] text-[13px] `}>
              {category ? category : "Select Category"}
            </p>
            {categoryShow ? (
              <GoChevronDown className="ml-1 text-[13px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[13px]" />
            )}
          </p>
          {categoryShow ? (
            <>
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  {categoryData?.map((element, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex ${
                          type === element.value
                            ? "text-primary"
                            : "text-[#000000]"
                        }   justify-between cursor-pointer  items-center`}
                        onClick={() => {
                          setCategory(element.value);
                          let json = {};
                          if (element.value === "Academics") {
                            json = {
                              "Junior Secondary School (Class 6-8th)": {
                                domainName:
                                  "Junior Secondary School (Class 6-8th)",
                              },
                              "Higher Secondary School (Class 9-10th)": {
                                domainName:
                                  "Higher Secondary School (Class 9-10th)",
                              },
                              "Senior Secondary School (Class 11-12th)": {
                                domainName:
                                  "Senior Secondary School (Class 11-12th)",
                              },
                            };
                          } else if (element.value === "Humanities") {
                            json = {
                              "Senior Secondary School (Class 11-12th)": {
                                streams: ["Arts/Humanities"],
                              },
                            };
                          } else if (element.value === "Commerce") {
                            json = {
                              "Senior Secondary School (Class 11-12th)": {
                                streams: ["Commerce"],
                              },
                            };
                          } else if (element.value === "Medical") {
                            json = {
                              "Competitive Exams": {
                                fields: ["Medical"],
                              },
                            };
                          } else if (element.value === "Engineering") {
                            json = {
                              "Competitive Exams": {
                                fields: ["Engineering"],
                              },
                            };
                          } else if (element.value === "Law") {
                            json = {
                              "Competitive Exams": {
                                fields: ["Law"],
                              },
                            };
                          } else if (element.value === "Skill") {
                            3;
                            json = {
                              "Skill Based Courses": {
                                skills: ["Skill Based"],
                              },
                            };
                          } else {
                            json = {};
                          }

                          filterByCategory(json);
                          setCategoryShow(false);
                        }}
                      >
                        <p className={`  text-[13px]  px-4 py-2 `}>
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

        {search?.type !== "exam" ? (
          <>
            <div className="relative  my-1">
              <p
                onClick={(e) => {
                  setClassShow(!classShow);
                  setTypeShow(false);
                  setRatingShow(false);
                  setLocationShow(false);
                  setSubjectShow(false);
                  setExamShow(false);
                  setExamShow(false);
                  setSortShow(false);
                  e.stopPropagation();
                }}
                className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
              >
                <p className={` text-[#000000] text-[13px] `}>
                  {classBy ? classBy : "Select Class"}
                </p>
                {classShow ? (
                  <GoChevronDown className="ml-1 text-[13px] rotate-180" />
                ) : (
                  <GoChevronDown className="ml-1 text-[13px]" />
                )}
              </p>
              {classShow ? (
                <>
                  {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                  <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="py-1 divide-y divide-gray/20 max-h-[400px] overflow-y-scroll"
                      role="none"
                    >
                      {classData?.map((element, idx) => {
                        return (
                          <div
                            key={idx}
                            className={`flex ${
                              classBy === element.value
                                ? "text-primary"
                                : "text-[#000000]"
                            }   justify-between cursor-pointer  items-center`}
                            onClick={() => {
                              setClassBy(element.value);

                              if (!search?.name?.length || search === {}) {
                                let json = {};
                                if (element.value.length) {
                                  if (
                                    element?.value?.toString() == "Class 11" ||
                                    element?.value?.toString() == "Class 12"
                                  ) {
                                    json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        {
                                          streams: [
                                            "Science",
                                            "Commerce",
                                            "Arts/Humanities",
                                          ],
                                        },
                                    };
                                  } else {
                                    json = {
                                      "Junior Secondary School (Class 6-10th)":
                                        {
                                          classes: [element?.value?.toString()],
                                        },
                                    };
                                  }
                                }
                                filterByCategory(json);
                              }
                            }}
                          >
                            <p className={`  text-[13px]  px-4 py-2 `}>
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
              {subjectShow ? (
                <>
                  {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                  <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="py-1 divide-y divide-gray/20 max-h-[400px] overflow-y-scroll"
                      role="none"
                    >
                      {subjectData
                        .filter((a) => a?.streams?.includes(subjectStreams))
                        ?.map((element, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`flex ${
                                subjectBy === element.value
                                  ? "text-primary"
                                  : "text-[#000000]"
                              }   justify-between cursor-pointer  items-center`}
                              onClick={() => {
                                setSubjectBy(element.value);

                                if (
                                  streams === "Humanities" ||
                                  streams === "Commerce"
                                ) {
                                  let json;
                                  if (element.value.length) {
                                    json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        {
                                          subjectsForStreams: {
                                            [element.streams]: [element.name],
                                          },
                                        },
                                    };
                                  }
                                  if (!element.value.length) {
                                    
                                    json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        {
                                          streams: [streams],
                                        },
                                    };
                                  }
                                  filterByCategory(json);
                                }
                              }}
                            >
                              <p className={`  text-[13px]  px-4 py-2 `}>
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
          </>
        ) : (
          ""
        )}

        {search?.type === "exam" ? (
          <div className="relative  my-1">
            <p
              onClick={(e) => {
                setSubjectShow(false);
                setExamShow(!examShow);
                setTypeShow(false);
                setRatingShow(false);
                setLocationShow(false);
                setClassShow(false);
                setSortShow(false);
                e.stopPropagation();
              }}
              className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
            >
              <p className={` text-[#000000] text-[13px] `}>
                {examBy.name ? examBy.name : "Select Exams"}
              </p>
              {examShow ? (
                <GoChevronDown className="ml-1 text-[13px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[13px]" />
              )}
            </p>
            {examShow ? (
              <>
                {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-1 divide-y divide-gray/20 max-h-[400px] overflow-y-scroll"
                    role="none"
                  >
                    {examsData?.map((element, idx) => {
                      return (
                        <div
                          key={idx}
                          className={`flex ${
                            examBy.name === element.value
                              ? "text-primary"
                              : "text-[#000000]"
                          }   justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            setExamBy(element);
                            const json = {
                              "Competitive Exams": {
                                examsPerFields: [
                                  element.instituteValue?.toString(),
                                ],
                              },
                            };

                            filterByCategory(json);
                          }}
                        >
                          <p className={`  text-[13px]  px-4 py-2 `}>
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
        ) : (
          ""
        )}
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
            className="flex w-full justify-between items-center w-44 cursor-pointer border-2 border-solid border-light-gray  p-2"
          >
            <p className={` text-[#000000] text-[13px] `}>
              {ratings ? `${ratings} Star` : "Ratings"}
            </p>
            {ratingShow ? (
              <GoChevronDown className="ml-1 text-[13px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[13px]" />
            )}
          </p>
          {ratingShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  <div
                    className={`flex  ${
                      ratings === 5 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      setRatings(5);
                    }}
                  >
                    <p className={`  text-[13px]  px-4 py-2 `}>5 star</p>
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
                    <p className={`  text-[13px]  px-4 py-2 `}>4 star</p>
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
                    <p className={`  text-[13px]  px-4 py-2 `}>3 star</p>
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
                    <p className={`  text-[13px]  px-4 py-2 `}>2 star</p>
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
                    <p className={`  text-[13px]  px-4 py-2 `}>1 star</p>
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
                    <p className={`  text-[13px]  px-4 py-2 `}>Clear All</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="p-5 container mx-auto">
        <img
          className="md:w-full md:h-full h-[120px] cursor-pointer"
          src={ninetynineImage.src}
          onClick={() => router.push("/coaching-in-99")}
          alt=""
        />
      </div>

      {/* Course Card */}

      {sortBy === "Courses" ? (
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {filteredCourses?.length > 0 &&
            filteredCourses
              ?.slice(0, 12)
              .map((item, key) => <CourseCard {...item} key={key} />)}
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {filteredInstitutes?.length > 0 &&
            filteredInstitutes
              ?.slice(0, 12)
              .map((item, key) => <InstituteCard {...item} key={key} />)}
        </div>
      )}
    </div>
  );
};

export default Recommended;
