import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { host } from "../../../../utils/constant";
import CourseCard from "./CourseCard";
import banner from "../../../../assets/toplocationbanner.png";
import toast from "react-hot-toast";
import {
  selectSearch,
  setFilteredInstitutes,
} from "../../../../redux/slices/SearchSlice";
import { useDispatch, useSelector } from "react-redux";
import RecommendedCard from "../../Filter/RecommendedCard";
import InstituteCard from "../../../UI/InstituteCard";
import ninetynineImage from "../../../../assets/images/99rs.png";
import { useRouter } from "next/router";
import instituteImage from "../../../../assets/images/institute.png";

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
    streams: ["Medical"],
  },
  {
    name: "NEET-PG",
    instituteValue: "NEET-PG",
    value: "NEET PG",
    streams: ["Medical"],
  },
  {
    name: "AIIMS",
    instituteValue: "AIIMS",
    value: "AIIMS",
    streams: ["Medical"],
  },
  {
    name: "AIIMS-PG",
    instituteValue: "AIIMS-PG",
    value: "AIIMS PG",
    streams: ["Medical"],
  },
  {
    name: "PGIMER",
    instituteValue: "PGIMER",
    value: "PGIMER",
    streams: ["Medical"],
  },
  {
    name: "CMSE",
    instituteValue: "CMSE",
    value: "CMSE",
    streams: ["Medical"],
  },
  {
    name: "FPMT",
    instituteValue: "FPMT",
    value: "FPMT",
    streams: ["Medical"],
  },
  {
    name: "NPE-FET",
    instituteValue: "NPE-FET",
    value: "NPE FET",
    streams: ["Medical"],
  },

  {
    name: "IIT-JEE-MAIN",
    instituteValue: "IIT-JEE-MAIN",
    value: "JEE Mains",
    streams: ["Engineering"],
  },
  {
    name: "IIT-JEE-ADVANCE",
    instituteValue: "IIT-JEE-ADVANCE",
    value: "JEE Advanced",
    streams: ["Engineering"],
  },
  {
    name: "GATE",
    instituteValue: "GATE",
    value: "GATE",
    streams: ["Engineering"],
  },
  {
    name: "NATA",
    instituteValue: "NATA",
    value: "NATA",
    streams: ["Engineering"],
  },
  {
    name: "DUET",
    instituteValue: "DUET",
    value: "DUET",
    streams: ["Engineering"],
  },
  {
    name: "AMET",
    instituteValue: "AMET",
    value: "AMET",
    streams: ["Engineering"],
  },
  {
    name: "BITSAT",
    instituteValue: "BITSAT",
    value: "BITSAT",
    streams: ["Engineering"],
  },
  {
    name: "VITEEE",
    instituteValue: "VITEEE",
    value: "VITEEE",
    streams: ["Engineering"],
  },
  {
    name: "SRMJEE",
    instituteValue: "SRMJEE",
    value: "SRMJEE",
    streams: ["Engineering"],
  },
  {
    name: "COMEDK",
    instituteValue: "COMEDK",
    value: "COMEDK",
    streams: ["Engineering"],
  },
  {
    name: "KIITEE",
    instituteValue: "KIITEE",
    value: "KIITEE",
    streams: ["Engineering"],
  },
  {
    name: "WBJEE",
    instituteValue: "WBJEE",
    value: "WBJEE",
    streams: ["Engineering"],
  },
  {
    name: "MHTCET",
    instituteValue: "MHTCET",
    value: "MHTCET",
    streams: ["Engineering"],
  },
  {
    name: "MET",
    instituteValue: "MET",
    value: "MET",
    streams: ["Engineering"],
  },

  {
    name: "Clear All",
    instituteValue: "",
    value: "",
    streams: ["Engineering", "Medical"],
  },
];

const classData = [
  {
    name: "Class 1",
    value: "Class 1",
    streams: ["Academics"],
  },
  {
    name: "Class 2",
    value: "Class 2",
    streams: ["Academics"],
  },
  {
    name: "Class 3",
    value: "Class 3",
    streams: ["Academics"],
  },
  {
    name: "Class 4",
    value: "Class 4",
    streams: ["Academics"],
  },
  {
    name: "Class 5",
    value: "Class 5",
    streams: ["Academics"],
  },
  {
    name: "Class 6",
    value: "Class 6",
    streams: ["Academics"],
  },
  {
    name: "Class 7",
    value: "Class 7",
    streams: ["Academics"],
  },
  {
    name: "Class 8",
    value: "Class 8",
    streams: ["Academics"],
  },
  {
    name: "Class 9",
    value: "Class 9",
    streams: ["Academics"],
  },
  {
    name: "Class 10",
    value: "Class 10",
    streams: ["Academics"],
  },
  {
    name: "Class 11",
    value: "Class 11",
    streams: ["Science", "Commerce", "Humanities"],
  },
  {
    name: "Class 12",
    value: "Class 12",
    streams: ["Science", "Commerce", "Humanities"],
  },
  {
    name: "Clear All",
    value: "",
    streams: ["Science", "Commerce", "Humanities", "Academics"],
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
    value: "Uttar-Pradesh",
  },
];

const CardSection = ({ metaSection, meta_area, content }) => {
  const [searchText, setSearchText] = useState("");
  const [ratingShow, setRatingShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);
  const [locationShow, setLocationShow] = useState(false);
  const [stateShow, setStateShow] = useState(false);
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
    setStateShow(false);
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

  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
  } = useSelector(selectSearch);

  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("Institutes");
  const [locationBy, setLocationBy] = useState("");
  const [examBy, setExamBy] = useState("");
  const [subjectBy, setSubjectBy] = useState("");
  const [classBy, setClassBy] = useState("");
  const [state, setState] = useState("");
  const [rating, setRating] = useState("");
  const handleSearch = () => {};

  useEffect(() => {
    if (
      meta_area.toLowerCase() === "delhi" ||
      meta_area.toLowerCase() === "haryana"
    ) {
      setState(meta_area);
    }
  }, [meta_area]);

  const [currentInstituteCourse, setCurrentInstituteCourse] = useState([]);
  const [course, setCourse] = useState([]);

  const [totalCount, setTotalCount] = useState();
  const [streams, setStreams] = useState();
  const [subjectStreams, setSubjectStreams] = useState();
  const [examStreams, setExamStreams] = useState();

  useEffect(() => {
    const run = async () => {
      let category = {};
      if (metaSection === "Science") {
        category.division = [metaSection];
        setStreams("Science");
        category.name = "Academics";
      } else if (metaSection === "Commerce") {
        setStreams("Commerce");
        category.division = [metaSection];
        category.name = "Academics";
      } else if (metaSection === "Humanities") {
        category.division = [metaSection];
        category.name = "Academics";
        setStreams("Humanities");
      } else if (metaSection === "Academics") {
        setStreams("Academics");
        category.name = metaSection;
      } else {
        category.name = metaSection;
      }
      if (classBy) {
        category.classes = [classBy];
      }
      if (subjectBy) {
        category.subjects = [subjectBy];
      }
      if (examBy) {
        category.exams = [examBy];
      }

      if (sortBy === "Courses") {
        if (
          metaSection !== "Science" &&
          metaSection !== "Academics" &&
          metaSection !== "Medical" &&
          metaSection !== "Engineering" &&
          metaSection !== "Law" &&
          metaSection !== "Skill Based" &&
          metaSection !== "Commerce" &&
          metaSection !== "Humanities"
        ) {
          setSearchText(metaSection);

          category = {};
        }
      } else {
        setSearchText("");
      }

      try {
        const res = await axios.get(
          `${host}/course?category=${JSON.stringify(
            category
          )}&name=${searchText}&limit=12`
        );

        setCurrentInstituteCourse(res?.data?.message);
        setTotalCount(res?.data?.totalCount);
      } catch (err) {
        toast.error(err.message);
      }
    };

    run();
  }, [metaSection, searchText, classBy, subjectBy, examBy, sortBy]);

  useEffect(() => {
    let json = {};
    if (metaSection === "Academics") {
      json = {
        "Junior Secondary School (Class 6-10th)": {
          classes: ["Class 10"],
        },
        "Senior Secondary School (Class 11-12th)": {
          streams: ["Science"],
        },
      };
      filterByCategory(json, "");
    }
    if (metaSection === "Humanities") {
      json = {
        "Senior Secondary School (Class 11-12th)": {
          streams: ["Arts/Humanities"],
        },
      };
      filterByCategory(json, "");
    }
    if (metaSection === "Commerce") {
      json = {
        "Senior Secondary School (Class 11-12th)": {
          streams: ["Commerce"],
        },
      };
      filterByCategory(json, "");
    }
    if (metaSection?.includes("Medical")) {
      json = {
        "Competitive Exams": {
          fields: ["Medical"],
        },
      };

      filterByCategory(json, "");
    }
    if (metaSection?.includes("Engineering")) {
      json = {
        "Competitive Exams": {
          fields: ["Engineering"],
        },
      };

      filterByCategory(json, "");
    }
    if (metaSection?.includes("Law")) {
      json = {
        "Competitive Exams": {
          fields: ["Law"],
        },
      };

      filterByCategory(json, "");
    }
    if (metaSection?.includes("Skill Based")) {
      3;
      json = {
        "Skill Based Courses": {
          skills: ["Skill Based"],
        },
      };

      filterByCategory(json, "");
    }
    if (
      metaSection !== "Engineering" &&
      metaSection !== "Medical" &&
      metaSection !== "Academics" &&
      metaSection !== "Humanities" &&
      metaSection !== "Science" &&
      metaSection !== "Commerce" &&
      metaSection !== "Law" &&
      metaSection !== "Skill Based"
    ) {
      json = {
        "Competitive Exams": {
          examsPerFields: [metaSection?.toUpperCase()?.replaceAll(" ", "-")],
        },
      };

      filterByCategory(json, "");
    }
  }, [metaSection]);

  useEffect(() => {
    if (metaSection === "Engineering") {
      setExamStreams("Engineering");
    }
    if (metaSection === "Medical") {
      setExamStreams("Medical");
    }
  }, [metaSection]);

  useEffect(() => {
    if (totalCount) {
      const run = async () => {
        let category = {};

        if (metaSection === "Science") {
          category.division = [metaSection];
          setStreams("Science");
          setSubjectStreams("Science");
          category.name = "Academics";
        } else if (metaSection === "Commerce") {
          setStreams("Commerce");
          setSubjectStreams("Commerce");
          category.division = [metaSection];
          category.name = "Academics";
        } else if (metaSection === "Humanities") {
          category.division = [metaSection];
          category.name = "Academics";
          setStreams("Humanities");
          setSubjectStreams("Humanities");
        } else if (metaSection === "Academics") {
          setStreams("Academics");
          setSubjectStreams("High School");
          category.name = metaSection;
        } else {
          category.name = metaSection;
        }
        if (classBy) {
          category.classes = [classBy];
        }
        if (subjectBy) {
          category.subjects = [subjectBy];
        }
        if (examBy) {
          category.exams = [examBy];
        }

        if (sortBy === "Courses") {
          if (
            metaSection !== "Science" &&
            metaSection !== "Academics" &&
            metaSection !== "Medical" &&
            metaSection !== "Engineering" &&
            metaSection !== "Law" &&
            metaSection !== "Skill Based" &&
            metaSection !== "Commerce" &&
            metaSection !== "Humanities"
          ) {
            setSearchText(metaSection);

            category = {};
          }
        } else {
          setSearchText("");
        }

        try {
          const res = await axios.get(
            `${host}/course?category=${JSON.stringify(
              category
            )}&name=${searchText}&nolimit=true`
          );
          // const res = await axios.get(
          //   `${host}/course?category=${JSON.stringify(
          //     category
          //   )}&limit=${totalCount}`
          // );

          setCourse(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [metaSection, classBy, totalCount, subjectBy, searchText, examBy, sortBy]);

  const dispatch = useDispatch();
  const router = useRouter();

  const [institutes, setInstitutes] = useState([]);
  const [allInstitutes, setAllInstitutes] = useState([]);

  const filterByCategory = async (cat, area) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?approval=1&name=${searchText}&accountplan=pro_plan&services=${query}&location=${area}&limit=50`
      );
      const sortInstitutes = data?.message?.slice();
      // .sort((a, b) => b?.images?.length - a?.images?.length)
      // .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
      // .sort((a, b) => b?.rating - a?.rating) || [];
      // setItemCount(data?.count);

      setAllInstitutes(data.message);
      dispatch(setFilteredInstitutes(sortInstitutes));
      // const sortCourses = data.message?.filter((items) => "classtype" in items);
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    const run = async () => {
      let json = {};
      if (metaSection === "Academics") {
        json = {
          "Junior Secondary School (Class 6-10th)": {
            classes: ["Class 10"],
          },
          "Senior Secondary School (Class 11-12th)": {
            streams: ["Science"],
          },
        };
      } else if (metaSection === "Humanities") {
        json = {
          "Senior Secondary School (Class 11-12th)": {
            streams: ["Arts/Humanities"],
          },
        };
      } else if (metaSection === "Commerce") {
        json = {
          "Senior Secondary School (Class 11-12th)": {
            streams: ["Commerce"],
          },
        };
      } else if (metaSection?.includes("Medical")) {
        json = {
          "Competitive Exams": {
            fields: ["Medical"],
          },
        };
      } else if (metaSection?.includes("Engineering")) {
        json = {
          "Competitive Exams": {
            fields: ["Engineering"],
          },
        };
      } else if (metaSection?.includes("Law")) {
        json = {
          "Competitive Exams": {
            fields: ["Law"],
          },
        };
      } else if (metaSection?.includes("Skill Based")) {
        3;
        json = {
          "Skill Based Courses": {
            skills: ["Skill Based"],
          },
        };
      } else {
        json = {
          // "Junior Secondary School (Class 6-10th)": {
          //   subjects: [metaSection],
          // },
          "Senior Secondary School (Class 11-12th)": {
            subjects: [metaSection],
          },
        };
      }
      try {
        const query = JSON.stringify(json);

        const { data } = await axios.get(
          `${host}/institute?approval=1&name=${searchText}&accountplan=pro_plan&services=${query}&limit=50`
        );
        const sortInstitutes = data?.message?.slice();
        // .sort((a, b) => b?.images?.length - a?.images?.length)
        // .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
        // .sort((a, b) => b?.rating - a?.rating) || [];
        // setItemCount(data?.count);

        setAllInstitutes(data.message);
        // const sortCourses = data.message?.filter((items) => "classtype" in items);
      } catch (error) {
        toast.error(error.toString());
      }
    };

    run();
  }, [searchText, metaSection]);

  useEffect(() => {
    if (institutes.length) {
      dispatch(setFilteredInstitutes(institutes));
    }
  }, [institutes]);

  useEffect(() => {
    if (rating) {
      setCurrentInstituteCourse(course.filter((a) => a.rating === rating));
      setInstitutes(allInstitutes.filter((a) => a.rating === rating));
    }
    if (!rating) {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, rating, allInstitutes]);

  useEffect(() => {
    if (type) {
      setCurrentInstituteCourse(course.filter((a) => a.classtype === type));
      setInstitutes(allInstitutes.filter((a) => a.classmode === type));
    }
    if (!type) {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, type, allInstitutes]);

  useEffect(() => {
    if (locationBy) {
      setCurrentInstituteCourse(
        course?.filter((a) =>
          a?.institute?.area_tags.includes(locationBy.toLowerCase())
        )
      );
      setInstitutes(
        allInstitutes.filter((a) =>
          a.area_tags.includes(locationBy.toLowerCase())
        )
      );
    }
    if (!locationBy) {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, locationBy, allInstitutes]);

  useEffect(() => {
    if (state) {
      setCurrentInstituteCourse(
        course?.filter((a) =>
          a?.institute?.area_tags.includes(state.toLowerCase())
        )
      );
      setInstitutes(
        allInstitutes.filter((a) => a.area_tags.includes(state.toLowerCase()))
      );
    }
    if (!state) {
      setCurrentInstituteCourse(course);
      setInstitutes(allInstitutes);
    }
  }, [course, state, allInstitutes]);

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
        .get(`${host}/locations?state=${state}&limit=100`)
        .then(function (response) {
          setTopLocationData(response.data.message);
        });
    } catch (err) {}
  }, [state]);

  useEffect(() => {
    if (
      classBy === "Class 1" ||
      classBy === "Class 2" ||
      classBy === "Class 3" ||
      classBy === "Class 4" ||
      classBy === "Class 5"
    ) {
      setSubjectStreams("Upper Primary");
    }
    if (
      classBy === "Class 6" ||
      classBy === "Class 7" ||
      classBy === "Class 8" ||
      classBy === "Class 9" ||
      classBy === "Class 10"
    ) {
      setSubjectStreams("High School");
    }
  }, [classBy]);

  useEffect(() => {
    if (classBy) {
      setExamBy("");
    }
    if (subjectBy) {
      setExamBy("");
    }
    if (examBy) {
      setClassBy("");
      setClassBy("");
    }
  }, [classBy, subjectBy, examBy]);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // let location = [];

    // topLocationData?.forEach((element) => {
    //   location.push(elment);
    // });

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

    if (
      meta_area.toLowerCase() !== "delhi" &&
      meta_area.toLowerCase() !== "haryana"
    ) {
      uniqueIds.push({
        name: meta_area,
        value: meta_area,
      });
    }

    // uniqueIds.push({
    //   name: "Delhi",
    //   value: "Delhi",
    // });
    uniqueIds.push({
      name: "Clear All",
      value: "",
    });

    setLocations(uniqueIds);
  }, [topLocationData, meta_area]);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchText.length) {
      const run = async () => {
        try {
          const res = await axios.get(
            `${host}/institute?name=${searchText}&accountplan=pro_plan&limit=20`
          );
          setSearchData(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [searchText]);

  return (
    <div className="px-5 sm:px-10">
      <div className="md:flex justify-between items-center my-3">
        <p className=" text-[48px] text-[#1D2939]">
          {metaSection?.toUpperCase()}
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
                        router.push(`/institute/${element.slug}`);
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
              setStateShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setExamShow(false);
              setClassShow(false);
              e.stopPropagation();
            }}
            className="flex w-full justify-between w-44 items-center  cursor-pointer border-4 border-solid border-primary  p-2 "
          >
            <p className={` text-primary text-[14px] font-bold `}>
              {sortBy ? sortBy : "Sort By"}
            </p>
            {sortShow ? (
              <GoChevronDown className="ml-1 text-primary text-[14px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-primary text-[14px]" />
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
                        <p className={`  text-[14px]  px-4 py-2 `}>
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
            <p className={` text-[#000000] text-[14px] `}>
              {state ? state : "States"}
            </p>
            {stateShow ? (
              <GoChevronDown className="ml-1 text-[14px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[14px]" />
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
                          if (
                            (element?.value &&
                              element?.value?.toLowerCase() === "delhi") ||
                            element?.value?.toLowerCase() === "haryana" ||
                            element?.value?.toLowerCase() === "uttar-pradesh"
                          ) {
                            router.push(
                              `/${metaSection
                                .toLowerCase()
                                .replaceAll(
                                  " ",
                                  "-"
                                )}-coaching-institutes-in-${element.value
                                ?.toLowerCase()
                                .replaceAll(" ", "-")}`
                            );
                          }
                          const json = {};
                          // filterByCategory(json, element.value);
                        }}
                      >
                        <p className={`  text-[14px]  px-4 py-2 `}>
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
              setStateShow(false);
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
            <p className={` text-[#000000] text-[14px] `}>
              {locationBy ? locationBy : "Location"}
            </p>
            {locationShow ? (
              <GoChevronDown className="ml-1 text-[14px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[14px]" />
            )}
          </p>
          {locationShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1 divide-y divide-gray/20 max-h-[400px] overflow-y-scroll"
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
                          if (
                            element?.value &&
                            element?.value?.toLowerCase() === "delhi"
                          ) {
                            router.push(
                              `/${metaSection
                                .toLowerCase()
                                .replaceAll(
                                  " ",
                                  "-"
                                )}-coaching-institutes-in-${element.value
                                ?.toLowerCase()
                                .replaceAll(" ", "-")}`
                            );
                          }
                          const json = {};
                          // filterByCategory(json, element.value);
                        }}
                      >
                        <p className={`  text-[14px]  px-4 py-2 `}>
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
              setStateShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setExamShow(false);
              setClassShow(false);
              setSortShow(false);
              e.stopPropagation();
            }}
            className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
          >
            <p className={` text-[#000000] text-[14px] `}>
              {type
                ? type === 3
                  ? "Hybrid"
                  : type === 2
                  ? "Offline"
                  : "Online"
                : "Select Type"}
            </p>
            {typeShow ? (
              <GoChevronDown className="ml-1 text-[14px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[14px]" />
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
                        <p className={`  text-[14px]  px-4 py-2 `}>
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
        {metaSection === "Academics" ||
        metaSection === "Humanities" ||
        metaSection === "Commerce" ? (
          <>
            <div className="relative  my-1">
              <p
                onClick={(e) => {
                  setClassShow(!classShow);
                  setTypeShow(false);
                  setRatingShow(false);
                  setLocationShow(false);
                  setStateShow(false);
                  setSubjectShow(false);
                  setExamShow(false);
                  setExamShow(false);
                  setSortShow(false);
                  e.stopPropagation();
                }}
                className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
              >
                <p className={` text-[#000000] text-[14px] `}>
                  {classBy ? classBy : "Select Class"}
                </p>
                {classShow ? (
                  <GoChevronDown className="ml-1 text-[14px] rotate-180" />
                ) : (
                  <GoChevronDown className="ml-1 text-[14px]" />
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
                      {classData
                        .filter((a) => a?.streams?.includes(streams))
                        ?.map((element, idx) => {
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
                                let json = {};
                                if (
                                  element?.value?.toString() == "Class 11" ||
                                  element?.value?.toString() == "Class 12"
                                ) {
                                  json = {
                                    "Senior Secondary School (Class 11-12th)": {
                                      streams: [streams],
                                    },
                                  };
                                } else {
                                  json = {
                                    "Junior Secondary School (Class 6-10th)": {
                                      classes: [element?.value?.toString()],
                                    },
                                  };
                                }
                                filterByCategory(json, "");
                              }}
                            >
                              <p className={`  text-[14px]  px-4 py-2 `}>
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
                  setSubjectShow(!subjectShow);
                  setExamShow(false);
                  setTypeShow(false);
                  setExamShow(false);
                  setRatingShow(false);
                  setLocationShow(false);
                  setStateShow(false);
                  setClassShow(false);
                  setSortShow(false);
                  e.stopPropagation();
                }}
                className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
              >
                <p className={` text-[#000000] text-[14px] `}>
                  {" "}
                  {subjectBy ? subjectBy.split("/")[1] : "Select Subject"}
                </p>
                {subjectShow ? (
                  <GoChevronDown className="ml-1 text-[14px] rotate-180" />
                ) : (
                  <GoChevronDown className="ml-1 text-[14px]" />
                )}
              </p>
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
                                  filterByCategory(json, "");
                                }
                              }}
                            >
                              <p className={`  text-[14px]  px-4 py-2 `}>
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
        {metaSection === "Engineering" || metaSection === "Medical" ? (
          <div className="relative  my-1">
            <p
              onClick={(e) => {
                setSubjectShow(false);
                setExamShow(!examShow);
                setTypeShow(false);
                setRatingShow(false);
                setLocationShow(false);
                setStateShow(false);
                setClassShow(false);
                setSortShow(false);
                e.stopPropagation();
              }}
              className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-2 "
            >
              <p className={` text-[#000000] text-[14px] `}>
                {examBy ? examBy : "Select Exams"}
              </p>
              {examShow ? (
                <GoChevronDown className="ml-1 text-[14px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[14px]" />
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
                    {examsData
                      .filter((a) => a?.streams?.includes(examStreams))
                      ?.map((element, idx) => {
                        return (
                          <div
                            key={idx}
                            className={`flex ${
                              examBy === element.value
                                ? "text-primary"
                                : "text-[#000000]"
                            }   justify-between cursor-pointer  items-center`}
                            onClick={() => {
                              setExamBy(element.value);
                              const json = {
                                "Competitive Exams": {
                                  examsPerFields: [
                                    element.instituteValue?.toString(),
                                  ],
                                },
                              };
                              filterByCategory(json, "");
                            }}
                          >
                            <p className={`  text-[14px]  px-4 py-2 `}>
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
              setStateShow(false);
              setSubjectShow(false);
              setExamShow(false);
              setClassShow(false);
              setSortShow(false);
              e.stopPropagation();
            }}
            className="flex w-full justify-between items-center w-44 cursor-pointer border-2 border-solid border-light-gray  p-2"
          >
            <p className={` text-[#000000] text-[14px] `}>
              {rating ? `${rating} Star` : "Ratings"}
            </p>
            {ratingShow ? (
              <GoChevronDown className="ml-1 text-[14px] rotate-180" />
            ) : (
              <GoChevronDown className="ml-1 text-[14px]" />
            )}
          </p>
          {ratingShow ? (
            <>
              {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
              <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray/20" role="none">
                  <div
                    className={`flex  ${
                      rating === 5 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      setRating(5);
                    }}
                  >
                    <p className={`  text-[14px]  px-4 py-2 `}>5 star</p>
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
                      setRating(4);
                    }}
                    className={`flex   ${
                      rating === 4 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[14px]  px-4 py-2 `}>4 star</p>
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
                      setRating(3);
                    }}
                    className={`flex   ${
                      rating === 3 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[14px]  px-4 py-2 `}>3 star</p>
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
                      setRating(2);
                    }}
                    className={`flex   ${
                      rating === 2 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[14px]  px-4 py-2 `}>2 star</p>
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
                      setRating(1);
                    }}
                    className={`flex   ${
                      rating === 1 ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[14px]  px-4 py-2 `}>1 star</p>
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
                      setRating("");
                    }}
                    className={`flex   ${
                      rating === "" ? "text-primary" : "text-[#000000]"
                    } justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[14px]  px-4 py-2 `}>Clear All</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {content?.length &&
      metaSection !== "Engineering" &&
      metaSection !== "Medical" &&
      metaSection !== "Academics" &&
      metaSection !== "Humanities" &&
      metaSection !== "Science" &&
      metaSection !== "Commerce" &&
      metaSection !== "Law" &&
      metaSection !== "Skill Based" > 0 ? (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      ) : (
        ""
      )}

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
          {currentInstituteCourse?.length > 0 &&
            currentInstituteCourse
              ?.slice(0, 12)
              .map((item, key) => <CourseCard {...item} key={key} />)}
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {institutes?.length > 0 &&
            institutes
              ?.slice(0, 12)
              .map((item, key) => <InstituteCard {...item} key={key} />)}
        </div>
      )}
    </div>
  );
};

export default CardSection;
