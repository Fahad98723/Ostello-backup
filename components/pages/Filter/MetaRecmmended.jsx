import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { Divider } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Data } from "../../../components/pages/Search/Data";
import DistanceSlider from "../../../components/pages/Search/Distance";
import Dropdown from "../../../components/pages/Search/Dropdown";
import GroupCheckbox from "../../../components/pages/Search/GroupCheckbox";
import GroupRadio from "../../../components/pages/Search/GroupRadio";
import PriceSlider from "../../../components/pages/Search/PriceSlider";
import RatingSlider from "../../../components/pages/Search/RatingSlider";
import SubjectGroupCheckbox from "../../../components/pages/Search/SubjectGroupCheckBox";
import {
  selectCourse,
  setFields,
  setSearch
} from "../../../redux/slices/courseSlice";
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
  setSubjects
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import { capitalizeFirst } from "../../utils";
import ExamCheckbox from "../Search/ExamCheckBox";
import MobileFilterBar from "./MobileFilterBar";
import RecommendedCard from "./RecommendedCard";
import TopLocation from "./TopLocation";
import ninetynineImage from "../../../assets/images/99rs.png";

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
const MetaRecommended = ({meta_course, name, content,meta_area }) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState("0");
  const router = useRouter();
  
  const dispatch = useDispatch();

const {
  selectedInstituteName,
  filteredCourses,
  filteredInstitutes,
  locationQuery,
  searchQuery,
  filters,
} = useSelector(selectSearch);
const { courses, search, fields } = useSelector(selectCourse);
const { metaSection } = router.query;


  useEffect(() => {
    if (router.query.metaSection?.length > 1) {
        
        let json ={};
      const url = [
        "class-10",
        "class-12",
        "law",
        "medical",
        "engineering",
        "arts/humanities",
        "skill-Based",
        "commerce",
        "cuet"
      ];

      if (metaSection?.includes("class-10")) {
        json = {
          "Junior Secondary School (Class 6-10th)": {
            classes: [
              "Class 10",
            ],
          },
        };
        dispatch(setClass(["Class 10"]));
        dispatch(setFields("Class 10"));
        filterByCategory(json, meta_area);
      
      
        dispatch(setExam([]));
      } else if (metaSection?.includes("class-12")) {
        
        json = {
          "Senior Secondary School (Class 11-12th)": {
            streams: ["Science"],
          },
        };
        dispatch(setClass(["Class 12"]));
        dispatch(setFields("Class 12"));
        filterByCategory(json, meta_area);
        
      
        dispatch(setExam([]));
      } else if (metaSection?.includes("law")) {
        json = {
          "Competitive Exams": {
            fields: ["Law"],
          },
        };
        dispatch(setFields("LAW"));
        dispatch(setExam(["LAW"]));
        filterByCategory(json, meta_area);
        
      
      } else if (metaSection?.includes("engineering")) {
        json = {
          "Competitive Exams": {
            fields: ["Engineering"],
          },
        };
        dispatch(setFields("Engineering"));
        dispatch(setExam(["Engineering"]));
        filterByCategory(json,meta_area);
        
      
      } else if (metaSection?.includes("medical")) {
        json = {
          "Competitive Exams": {
            fields: ["Medical"],
          },
        };
        dispatch(setFields("Medical"));
        dispatch(setExam(["Medical"]));
        filterByCategory(json, meta_area);
        
        
      }else if (metaSection?.includes("cuet")) {
        json = {
          "Competitive Exams": {
            examsPerFields: ["Common University Entrance Test (CUET)"],
          },
        };
        
        
        dispatch(setFields("CUET"));
        dispatch(setExam(["CUET"]));
        filterByCategory(json, meta_area);
        
      } else if (metaSection?.includes("humanities")) {
        json = {
          "Senior Secondary School (Class 11-12th)": {
            streams: ["Arts/Humanities"],
          },
        };
        filterByCategory(json, meta_area);
        
      
        dispatch(setCategory("Arts/Humanities"));
        dispatch(setFields("Arts/Humanities"));
      } else if (metaSection?.includes("skill-based")) {3
        json = {
          "Skill Based Courses": {
            skills: ["Skill Based"],
          },
        };
        dispatch(setFields("Skill Based"));
        dispatch(setCategory("Skill Based"));
        filterByCategory(json, meta_area);
        
      
        dispatch(setExam([]));
      } else if (metaSection?.includes("commerce")) {
        json = {
          "Senior Secondary School (Class 11-12th)": {
            streams: ["Arts/Humanities"],
          },
        };
        dispatch(setFields("Commerce"));
        dispatch(setCategory("Commerce"));
        filterByCategory(json, meta_area);
        
      
        dispatch(setExam([]));
      } else if (!url.find((a) => metaSection?.includes(a))) {
        

      // setArea(meta_area?.toString().toUpperCase());
      
      filterBySearch(meta_course, meta_area);
          
      }
      
    }
    // if (locationQuery?.length > 1) {
    //   // if (!locationQuery.includes(",")) {
    //   filterByLocation(locationQuery);
    // }
    if (searchQuery?.length > 1) {
      filterBySearch(searchQuery,"");
    }
    
  }, [router.query.metaSection,searchQuery,dispatch]);

  const filterByArea = async (areaName, sortedInstitutes) =>{
    try{
    const res = await sortedInstitutes?.filter(item => {
      
       return item?.locations[0]?.area_tags?.toLowerCase()?.includes(areaName === 'jangpura' ? 'jungpura'  : areaName?.toLowerCase());
     })
     
     dispatch(setFilteredInstitutes(res?.slice()
      .sort((a, b) => b?.images?.length - a?.images?.length)
      .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
      .sort((a, b) => b?.rating - a?.rating) || []))
    //  dispatch(setFilteredInstitutes(res?.length > 1 ? res : sortedInstitutes));
    } catch (error) {
      toast.error(error.toString());
    }
   }
   const filterByLocation = async (locName) => {
     try {
       const { data } = await axios.get(`${host}/institute?approval=1&location=${locName === 'Jangpura' ? 'Jungpura' : "Lajpat Nagar" ? "Lagpat Nagar" : locName}&nolimit=true`)
       setItemCount(data?.count)
       dispatch(setFilteredInstitutes(data.message))
     
     } catch (error) {
       toast.error(error.toString());
     }
  }
  
  const filterBySearch = async (text,area) => {
   // dispatch(setLocationQuery(""));
   try {
     const { data } = await axios.get(`${host}/institute/query?approval=1&name=${text}`)
     const sortInstitutes = data.message?.filter(items => 'classmode' in items)
  
     const sortCourses = data.message?.filter(items => 'classtype' in items)
     
     setItemCount(data?.count)
     filterByArea(area,sortInstitutes);
    //  dispatch(setFilteredInstitutes(sortInstitutes.slice()
    //  .sort((a, b) => b?.images?.length - a?.images?.length)
    //  .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
    //  .sort((a, b) => b?.rating - a?.rating) || []));
  
    //  dispatch(setFilteredCourses(sortCourses.slice()
    //  .sort((a, b) => b?.images?.length - a?.images?.length)
    //  .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
    //  .sort((a, b) => b?.rating - a?.rating) || []));

    //  if(area?.length > 1){
    //   filterByArea(area,sortInstitutes);
    // }
     
   } catch (error) {
     toast.error(error.toString())
   }
  }
  
  const filterByCategory = async (cat,area) => {
   try {
     const query = JSON.stringify(cat);
     const { data } = await axios.get(
       `${host}/institute?approval=1&services=${query}&location=${area}`
     );
     const sortInstitutes = data?.message?.slice()
     .sort((a, b) => b?.images?.length - a?.images?.length)
     .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
     .sort((a, b) => b?.rating - a?.rating) || []
     setItemCount(data?.count)
     
     // const sortCourses = data.message?.filter((items) => "classtype" in items);
     dispatch(
       setFilteredInstitutes(
        sortInstitutes
       )
     );
     // dispatch(
     //   setFilteredCourses(
     //     sortCourses
     //       .slice()
     //       .sort((a, b) => b?.images?.length - a?.images?.length)
     //       .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
     //       .sort((a, b) => b?.rating?.length - a?.rating?.length) || []
     //   )
     // );
    //  if(area?.length > 1){
    //    filterByArea(area,sortInstitutes);
    //  }
   } catch (error) {
     toast.error(error.toString());
   }
  };

  // useEffect(() => {
  //   if (searchQuery?.length > 1) {
  //     filterBySearch(searchQuery);
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
    sortBy,
    rating,
    price,
    classes,
    subjects,
    board,
    exam,
    skill,
  } = filters;

  const [sort, setSort] = useState(false);

  const [academics, setAcademics] = useState(true);
  const [engineering, setEngineering] = useState(false);
  const [entranceExam, setEntranceExam] = useState(false);
  const [medical, setMedical] = useState(false);
  const [skillBase, setSkillBased] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [cardType, setCardType] = useState("Institutes");
  

  // const [locationWiseIns, setLocationWiseIns] = useState([]);

  // const [instituteData, setInstituteData] = useState([]);
  // const [courseData, setCourseData] = useState([]);
  const allInstitutes = async (limit)=>{
    try {
      const { data } = await axios.get(
        `${host}/institute?approval=1&limit=${limit}`
      );
      setItemCount(data?.count)
      dispatch(
        setFilteredInstitutes(
          data?.message?.slice()
            .sort((a, b) => b?.images?.length - a?.images?.length)
            .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
            .sort((a, b) => b?.rating - a?.rating) || []
        )
      );
    } catch (error) {
      toast.error(error.toString());
    }
  }
  // useEffect(() => {
    
  // // else {
  // //   allInstitutes(300);
  // // }
  // }, [locationQuery, search]);

  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const run = async () => {
      if(skillName){
        const ravi = {
          name: skillName,
        };
  
        const rav = JSON.stringify(ravi);
        const { data } = await axios.get(`${host}/course?category=${rav}`);
        if (data) {
          dispatch(setFilteredCourses(data.message));
          // dispatch(setSearch({
          //   type: "course",
          //   name: "",
          // }))
        }
      }
    };
    run();
  }, [skillName, dispatch]);

  

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

    if (skillName) {
      data.push(...data, skillName);
    }

    let uniqueChars = [...new Set(data)];

    setSearchList(uniqueChars);
  }, [classes, subjects, fields, category, exam, rating, skillName]);

  const [searchField, setSearchField] = useState("");
  const [searchData, setSearchData] = useState([]);



  // useEffect(() => {
  //   let updatedData = filteredInstitutes;
  //   if (!isEmpty(sortBy)) {
  //     if (sortBy === "Newest") {
  //       updatedData = updatedData
  //         ?.map((item) => {
  //           return {
  //             ...item,
  //           };
  //         })
  //         .reverse();
  //     }
  //     if (sortBy === "Most Popular") {
  //       updatedData = updatedData
  //         ?.map((item) => {
  //           return {
  //             ...item,
  //           };
  //         })
  //         .reverse();
  //     }
  //   }
  //   
  //   dispatch(setFilteredInstitutes(updatedData));
  // }, [sortBy]);

  const removeHandle = (n) => {
    dispatch(setLocationQuery(""));
    allInstitutes(10);
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
    if (skillName) {
      setSkillName("");
      setSearchList(searchList.filter((a) => a === n));
    } else {
      if (category) {
        dispatch(setCategory(""));
      }
    }
  };
  // useEffect(() => {
  //   const institutesData = instituteData.map((item, idx) => {
  //     const { id, name, rating, images, locations, slug, services } = item;
  //     const { city, area, state, line1 } = locations[0];
  //     let exam;
  //     if (services.filter((a) => a.examsPerFields)) {
  //       exam = services
  //         .map((a) => a.examsPerFields)
  //         .filter((elm) => elm)[0]
  //         ?.join()
  //         .replaceAll(",", " ");
  //     }
  //     return {
  //       ...item,
  //       id,
  //       name,
  //       rating,
  //       type: "institute",
  //       url: `/institute/${slug}`,
  //       img: images,
  //       keywords: name + line1 + area + city + state + exam,
  //     };
  //   });
  //   if (!isEmpty(courseData) || !isEmpty(instituteData)) {
  //     setSearchData([...institutesData, ...courseData]);
  //   }
  // }, [instituteData]);

  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);

  useEffect(() => {
    let data = ["Delhi"];
    axios.get(`${host}/locations?city=Delhi&limit=1000`).then((res) => {
      res.data.message.forEach((e) => {
        data.push(e.name);
      });
    });
    setAreaOptions(data);
  }, []);

  // useEffect(() => {
  //   if (area) {
  //     dispatch(setLocationQuery(area));
  //   }
  // }, [area]);

  const skillBasedOption = [
    "Photography",
    "Business",
    "IT",
    "Design",
    "Marketing",
    "Development",
    "Other Skill",
  ];

  useEffect(() => {
   const run = async() => {

    
        const ravi = {
          name: 'skill',
        };
  
        const rav = JSON.stringify(ravi);
        const { data } = await axios.get(`${host}/course?category=${rav}`);
        if (data) {
          dispatch(setFilteredCourses(data.message));
          // dispatch(setSearch({
          //   type: "course",
          //   name: "",
          // }))
        }
      }
    
      if (cardType === "Courses") {
        run()
      }
  }, [cardType, dispatch]);

  const { modalBox } = useStyle();
  return (
    <div>
      <div className="divide-y divide-gray/20">
        <div className="md:px-24 px-5 md:py-10 py-5">
          <p className="text-[36px] text-[#101828] font-bold md:block hidden mb-10">
            Result for you
          </p>

          <div className="flex justify-between ">
            <div className="grid grid-cols-2 gap-1  md:grid-cols-5 md:gap-3 ">
              <button
                onClick={() => setOpen(true)}
                className="bg-primary py-2 px-5 rounded-md text-white"
              >
                FILTER
              </button>
              {category === "Skill Based" && cardType === "Courses" ? (
                <div className=" ">
                  <select
                    onChange={(e) => setSkillName(e.target.value)}
                    value={skillName}
                    className={` form-select   marker:block w-full px-4 pr-8 py-2 text-base font-normal text-primary bg-white  bg-no-repeat border-2 border-solid border-primary

rounded-md  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                  >
                    <option
                      className="md:w-9/12 w-full text-slate bg-white"
                      selected
                      value=""
                      disabled
                      hidden
                    >
                      Skill Based Courses
                    </option>
                    {skillBasedOption.map((a, idx) => {
                      return (
                        <option
                          key={idx}
                          className="w-full text-slate bg-white "
                        >
                          {a}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : (
                ""
              )}
              {searchList.map((s, i) => (
                <div
                  key={i}
                  onClick={() => {
                    removeHandle(s);
                  }}
                  className="border-primary border-2  py-2 px-3 md:ml-2 rounded-md text-primary flex items-center justify-between"
                >
                  <p className="mr-2"> {s}</p>
                  <CloseOutlined
                    // onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
              
            </div>
            <div>
              <Dropdown primaryVariant={true} placeholderText={"Sort By"}>
                <GroupRadio
                  onChange={(e) => dispatch(setSortBy(e))}
                  options={Data.sortBy}
                />
              </Dropdown>
            </div>
          </div>

          {router.query.metaSection ? (
            <div className="md:flex">
              <div className="md:w-1/4 w-3/4 md:mr-1">
                <select
                  onChange={(e) =>{ 
                    setArea(e.target.value)
                    if(fields?.length > 1 || exam?.length > 1){
                      dispatch(setLocationQuery(e.target.value))
                      // filterByArea(e.target.value);
                      router.push(`/${fields?.length > 1 ? fields?.toLowerCase() : exam?.toString().toLowerCase()}-coaching-institutes-in-${e.target.value.toLowerCase()?.replace(" ","-") || e.target.value.toLowerCase()}`)
                    }
                    else{
                      dispatch(setLocationQuery(e.target.value))
                      filterByLocation(e.target.value)
                    }
                  }
                }
                  value={area}
                  className={`my-1 form-select   marker:block w-full px-4 pr-8 py-2 text-base font-normal text-primary bg-white  bg-no-repeat border-2 border-solid border-primary

rounded-md  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                >
                  <option
                    className="md:w-9/12 w-full text-slate bg-white"
                    selected
                    value=""
                    disabled
                  >
                    {'Choose Delhi Area' || area}
                  </option>
                  {areaOptions.map((a, idx) => {
                    return (
                      <option key={idx} className="w-full text-slate bg-white ">
                        {a}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="md:w-1/5 w-3/4 md:mr-1">
                <select
                  onChange={(e) => {
                    setCardType(e.target.value);
                    
                    if (e.target.value === "Institutes") {
                      dispatch(
                        setSearch({
                          type: "institute",
                          name: "",
                        })
                      );
                      setSkillName("");
                    } else {
                      dispatch(
                        setSearch({
                          type: "course",
                          name: "",
                        })
                      );
                    }
                  }}
                  value={cardType}
                  className={`my-1 form-select   marker:block w-full px-4 pr-8 py-2 text-base font-normal text-primary bg-white  bg-no-repeat border-2 border-solid border-primary

rounded-md  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                >
                  <option
                    className="md:w-9/12 w-full text-slate bg-white"
                    value="Institutes"
                  >
                    Institutes
                  </option>
                  <option
                    className="md:w-9/12 w-full text-slate bg-white"
                    value="Courses"
                  >
                    Courses
                  </option>
                </select>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="md:px-24 md:pt-10 px-5 pt-5">
          <div>
            {router.query.metaSection ? (
              <p className="text-primary font-bold text-[36px]">
                {cardType === "Courses" ? "Skill Based Courses in Delhi" : `${fields || exam?.toString()} Coaching Institutes`}{" "}
                in{" "}
                <span className="text-primary font-bold">
                {locationQuery ? capitalizeFirst(locationQuery) : "all"}
                </span>{" "}
              </p>
            ) : (
              <p className="text-[ #101828] font-bold text-[36px]">
                {fields || exam?.toString() || ""}{" "}{" "}
                {search.type === "course" ? "Courses" : "Coaching Institutes"}{" "}
                in{" "}
                <span className="text-primary font-bold">
                  {locationQuery ? capitalizeFirst(locationQuery) : "all"}
                </span>{" "}
              </p>
            )}
            {search.type === "course" ? (
              <p className="md:w-[720px] text-[#667085] text-[18px] mt-3 mb-5">
                There are {filteredCourses?.length > 0} Courses in{" "}
                {locationQuery ? `${locationQuery} area` : "Our site"}
              </p>
            ) : (
              <p className="md:w-[720px] text-[#667085] text-[18px] mt-3 mb-5">
                There {itemCount} Institutes in{" "}
                {locationQuery ? `${capitalizeFirst(locationQuery)} area` : "Our site"}
              </p>
            )}
          </div>
          {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
          <div className="">
            <div className="">
              {/* <h1 className='text-2xl sm:text-4xl my-10'>Institutes near you</h1> */}
              <RecommendedCard />
              {/* <div
          onClick={() => {
            const itemHandler = () => {
              if (!isViewMore) {
                setItemCount(30)
              } else {
                setItemCount(15)
              }
            }
            itemHandler()

            setIsViewMore(!isViewMore)
          }}
          className='text-xl text-primary flex items-center space-x-2 cursor-pointer justify-center'
        >
          <p>{isViewMore ? 'View Less' : 'View More'}</p>
          {isViewMore ? (
            <UpOutlined className='flex items-center text-sm' />
          ) : (
            <DownOutlined className='flex items-center text-sm' />
          )}
        </div> */}
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={modalBox}>
            <div className="divide-y divide-gray/20">
              <div className="flex justify-between px-5 py-3 items-center">
                <p className="text-[27px] text-[#333333] font-semibold">
                  Filters
                </p>
                <CloseOutlined
                  onClick={() => setOpen(false)}
                  className="text-[20px]"
                />
              </div>
              <div className="p-3 md:block hidden">
                <div className="grid grid-cols-9 gap-x-5">
                  <div className="col-span-2 bg-[#F4EBFF] ">
                    <div className="pl-2 py-2">
                      <div
                        onClick={() => {
                          setClassOpen(true);
                          setSubjectOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setRatingOpen(false);
                          setPriceOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          classOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Class</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(true);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setRatingOpen(false);
                          setPriceOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          subjectOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Subject</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setPriceOpen(false);
                          setRatingOpen(true);
                        }}
                        className={`pl-2 mb-2 ${
                          ratingOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Ratings</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(true);
                          setRatingOpen(false);
                          setPriceOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          distanceOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Distance</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setRatingOpen(false);
                          setPriceOpen(true);
                        }}
                        className={`pl-2 mb-2 ${
                          priceOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Price</p>
                      </div>

                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(true);
                          setDistanceOpen(false);
                          setPriceOpen(false);
                          setRatingOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          locationOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Locations</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <div
                      className={`flex border rounded-xl  items-center justify-center space-x-2 px-2 mb-1 border-primary w-2/4 ml-auto
        }`}
                    >
                      <input
                        className=" outline-none w-full p-2 "
                        type="text"
                        defaultValue={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                        placeholder="Search"
                      />

                      <FiSearch
                        onClick={() => {}}
                        className={`bg-primary p-1 rounded-full text-white cursor-pointer`}
                        size={26}
                      />
                    </div>
                    <div className="p-3 overflow-y-scroll h-[200px]">
                      {classOpen && (
                        <div className="divide-y divide-gray/20">
                          <div
                            onClick={() => {
                              setAcademics(!academics);
                              setEngineering(false);
                              setMedical(false);
                              setSkillBased(false);
                              setEntranceExam(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Academics
                            </p>
                            {academics ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {academics && (
                            <GroupCheckbox
                              checkedState={classes[0]}
                              onChange={(v) => {
                                dispatch(setClass([]));
                                dispatch(setExam([]));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setClass(v));
                                let json = {};
                                if (
                                  v?.toString() == "Class-11" ||
                                  v?.toString() == "Class-12"
                                ) {
                                  json = {
                                    "Senior Secondary School (Class 11-12th)": {
                                      streams: ["Science"],
                                    },
                                  };
                                } else {
                                  json = {
                                    "Junior Secondary School (Class 6-10th)": {
                                      classes: [
                                        v?.toString().replace("-", " "),
                                      ],
                                    },
                                  };
                                }
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.classNames}
                            />
                          )}
                          <div
                            onClick={() => {
                              setEntranceExam(!entranceExam);
                              setAcademics(false);
                              setEngineering(false);
                              setMedical(false);
                              setSkillBased(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Entrance Exams
                            </p>
                            {entranceExam ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {entranceExam && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setClass([]));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setExam(v));
                                let json = {};
                                if(v?.toString() === "CUET"){
                                  json = {
                                    "Competitive Exams": {
                                      examsPerFields: ["Common University Entrance Test (CUET)"],
                                    },
                                  };
                                }
                                else{
                                  json = {
                                    "Competitive Exams": {
                                      examsPerFields: [v?.toString()],
                                    },
                                  };
                                }
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.entranceExam}
                            />
                          )}
                          <div
                            onClick={() => {
                              setAcademics(false);
                              setEngineering(!engineering);
                              setMedical(false);
                              setSkillBased(false);
                              setEntranceExam(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Engineering
                            </p>
                            {engineering ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {engineering && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setClass([]));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setExam(v));
                                const json = {
                                  "Competitive Exams": {
                                    examsPerFields: [v?.toString()],
                                  },
                                };
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.engineeringExam}
                            />
                          )}
                          <div
                            onClick={() => {
                              setAcademics(false);
                              setEngineering(false);
                              setMedical(!medical);
                              setSkillBased(false);
                              setEntranceExam(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Medical
                            </p>
                            {medical ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {medical && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setExam(v));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setClass([]));
                                const json = {
                                  "Competitive Exams": {
                                    examsPerFields: [v?.toString()],
                                  },
                                };
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.medicalExam}
                            />
                          )}
                          <div
                            onClick={() => {
                              setAcademics(false);
                              setEngineering(false);
                              setMedical(false);
                              setEntranceExam(false);
                              setSkillBased(!skillBase);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Skill Based
                            </p>
                            {skillBase ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {skillBase && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setExam(v));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setClass([]));
                                const json = {
                                  "Skill Based Courses": {
                                    skills: [v?.toString()],
                                  },
                                };
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.skillBased}
                            />
                          )}
                        </div>
                      )}
                      {subjectOpen && (
                        <>
                          <div className=" p-4 rounded-md mb-5 ">
                            <div className="flex ">
                              {Data.subjects.slice(0, 2).map((item, i) => (
                                <SubjectGroupCheckbox
                                  key={i}
                                  groupTitle={item.subjectType}
                                  dropdownEffect={false}
                                  options={item.subjectList}
                                  checkedState={subjects[0]}
                                  onChange={(v) => {
                                    dispatch(setSubjects([]));
                                    dispatch(setFields(v?.toString()));
                                    dispatch(setSubjects(v));
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Junior Secondary School (Class 6-10th)":
                                        {
                                          subjects: [
                                            sub?.replace("-", " "),
                                          ],
                                        },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                                    // locationQuery?.length > 0 ? router.push(
                                    //   `/${v}-Coaching-Institutes-in-${locationQuery?.replace(/ /g,"-")}`
                                    // ): router.push(
                                    //   `/${v}-Coaching-Institutes-in-Delhi`
                                    // );
                                  }}
                                />
                              ))}
                            </div>
                            <Divider type="horizontal" />
                            <div className="flex ">
                              {Data.subjects.slice(2, 4).map((item, i) => (
                                <SubjectGroupCheckbox
                                  key={i}
                                  groupTitle={item.subjectType}
                                  dropdownEffect={false}
                                  options={item.subjectList}
                                  checkedState={subjects[0]}
                                  onChange={(v) => {
                                    dispatch(setSubjects([]));
                                    dispatch(setFields(v?.toString()));
                                    dispatch(setSubjects(v));
                                    const grp = v?.toString().split("/")[0];
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        { "subjectsForStreams": { [grp]: [sub] } },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                                    // locationQuery?.length > 0
                                    //   ? router.push(
                                    //       `/${v
                                    //         ?.toString()
                                    //         ?.toLowerCase()
                                    //         ?.replace(
                                    //           / /g,
                                    //           "-"
                                    //         )}-coaching-institutes-in-${locationQuery
                                    //         ?.toLowerCase()
                                    //         ?.replace(/ /g, "-")}`
                                    //     )
                                    //   : router.push(
                                    //       `/${v
                                    //         ?.toString()
                                    //         ?.toLowerCase()
                                    //         ?.replace(
                                    //           / /g,
                                    //           "-"
                                    //         )}-coaching-institutes-in-delhi`
                                    //     );
                                  }}
                                />
                              ))}
                            </div>
                            <Divider type="horizontal" />
                            <div className="flex ">
                              {Data.subjects.slice(4, 6).map((item, i) => (
                                <SubjectGroupCheckbox
                                  key={i}
                                  groupTitle={item.subjectType}
                                  dropdownEffect={false}
                                  options={item.subjectList}
                                  checkedState={subjects[0]}
                                  onChange={(v) => {
                                    dispatch(setSubjects([]));
                                    dispatch(setFields(v?.toString()));
                                    dispatch(setSubjects(v));
                                    const grp = v?.toString().split("/")[0];
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        { "subjectsForStreams": { [grp]: [sub] } },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                                    // locationQuery?.length > 0 ? router.push(
                                    //   `/${v}-Coaching-Institutes-in-${locationQuery?.replace(/ /g,"-")}`
                                    // ): router.push(
                                    //   `/${v}-Coaching-Institutes-in-Delhi`
                                    // );
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      {ratingOpen && (
                        <RatingSlider
                          ratings={rating}
                          onChange={(e) => {
                            dispatch(setRating(e));
                          }}
                        />
                      )}
                      {priceOpen && (
                        <PriceSlider onChange={(e) => dispatch(setPrice(e))} />
                      )}
                      {distanceOpen && (
                        <DistanceSlider
                          onChange={(e) => {
                            dispatch(setRating(e));
                          }}
                        />
                      )}
                      {locationOpen && <TopLocation></TopLocation>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 block md:hidden">
                <MobileFilterBar filterByCategory={filterByCategory}/>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MetaRecommended;
