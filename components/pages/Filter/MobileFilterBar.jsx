import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Data } from "../../../components/pages/Search/Data";
import DistanceSlider from "../../../components/pages/Search/Distance";
import PriceSlider from "../../../components/pages/Search/PriceSlider";
import RatingSlider from "../../../components/pages/Search/RatingSlider";
import SubjectGroupCheckbox from "../../../components/pages/Search/SubjectGroupCheckBox";
import { selectCourse, setFields } from "../../../redux/slices/courseSlice";
import {
  selectSearch,
  setCategory,
  setClass,
  setExam, setLocationQuery, setPrice,
  setRating, setSubjects
} from "../../../redux/slices/SearchSlice";
import GroupCheckbox from "../Search/GroupCheckbox";
import TopLocation from "./TopLocation";
const MobileFilterBar = ({filterByCategory}) => {
  const [classOpen, setClassOpen] = useState(true);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
 
  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
  } = useSelector(selectSearch);
  const { courses } = useSelector(selectCourse);
  const dispatch = useDispatch();
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
  const [academics, setAcademics] = useState(true)
  const [engineering, setEngineering] = useState(false)
  const [medical, setMedical] = useState(true)
  const [skillBase, setSkillBased] = useState(true)
  const [entranceExam, setEntranceExam] = useState(false);
  return (
    <div className="p-2">
      <div
        className={`flex border rounded-xl  items-center justify-center space-x-2 px-2 mb-1 border-primary w-full ml-auto
          }`}
      >
        <input
          className=" outline-none w-full p-2 "
          type="text"
          placeholder="Search"
        />

        <FiSearch
          onClick={() => {}}
          className={`bg-primary p-1 rounded-full text-white cursor-pointer`}
          size={26}
        />
      </div>
      <div className="pl-2 py-2 divide-y divide-gray/20">
        <div
          onClick={() => {
            setClassOpen(!classOpen);
            setSubjectOpen(false);
            setLocationOpen(false);
            setDistanceOpen(false);
            setRatingOpen(false);
            setPriceOpen(false);
          }}
          className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
        >
          <p className="text-[16px] font-[600px] p-2">Class</p>
          {
            classOpen ? <UpOutlined /> :  <DownOutlined />
          }
        </div>
        {classOpen && (
                     <div className="divide-y divide-gray/20 pl-3">
                      <div
                      onClick={() => {
                        setAcademics(!academics)
                        setEngineering(false)
                        setMedical(false)
                        setSkillBased(false)
                        setEntranceExam(false)
                      }}
                      className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                    >
                      <p className="text-[16px] font-[600px] p-2">Academics</p>
                      {
                        academics ? <UpOutlined /> :  <DownOutlined />
                      }
                    </div>
                      {
                       academics && <GroupCheckbox
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
                      }
                      <div
                      onClick={() => {
                        setAcademics(false);
                        setEngineering(false);
                        setMedical(false);
                        setSkillBased(false);
                        setEntranceExam(!entranceExam);
                      }}
                      className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                    >
                      <p className="text-[16px] font-[600px] p-2">Entrance Exam</p>
                      {
                        entranceExam ? <UpOutlined /> :  <DownOutlined />
                      }
                    </div>
                    {
                       entranceExam && <GroupCheckbox
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
                        options={Data.entranceExam
                        }
                      />
                      }
                      <div
                      onClick={() => {
                        setAcademics(false)
                        setEngineering(!engineering)
                        setMedical(false)
                        setEntranceExam(false)
                        setSkillBased(false)
                      }}
                      className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                    >
                      <p className="text-[16px] font-[600px] p-2">Engineering</p>
                      {
                        engineering ? <UpOutlined /> :  <DownOutlined />
                      }
                    </div>
                      {
                       engineering && <GroupCheckbox
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
                        options={Data.engineeringExam
                        }
                      />
                      }
                      <div
                      onClick={() => {
                        setAcademics(false)
                        setEngineering(false)
                        setMedical(!medical)
                        setEntranceExam(false)
                        setSkillBased(false)
                      }}
                      className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                    >
                      <p className="text-[16px] font-[600px] p-2">Medical</p>
                      {
                        medical ? <UpOutlined /> :  <DownOutlined />
                      }
                    </div>
                      {
                       medical && <GroupCheckbox
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
                        options={Data.medicalExam
                        }
                      />
                      }
                      <div
                      onClick={() => {
                        setAcademics(false)
                        setEngineering(false)
                        setEntranceExam(false)
                        setMedical(false)
                        setSkillBased(!skillBase)
                      }}
                      className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                    >
                      <p className="text-[16px] font-[600px] p-2">Skill Based</p>
                      {
                        skillBase ? <UpOutlined /> :  <DownOutlined />
                      }
                    </div>
                      {
                       skillBase && <GroupCheckbox
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
                        options={Data.skillBased
                        }
                      />
                      }
                      </div>
                    )}
        <div
          onClick={() => {
            setSubjectOpen(!subjectOpen);
            setClassOpen(false);
            setLocationOpen(false);
            setDistanceOpen(false);
            setRatingOpen(false);
            setPriceOpen(false);
          }}
          className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
        >
          <p className="text-[16px] font-[600px] p-2">Subject</p>
          {
            subjectOpen ? <UpOutlined /> :  <DownOutlined />
          }
        </div>
        {subjectOpen && (
                      <div className="py-4"><>
                      <div className=" p-4 grid grid-cols-6 rounded-md  ">
                        <div className="md:col-span-3 col-span-6 ">
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
                        {/* <Divider type="horizontal" /> */}
                        <div className="md:col-span-3 col-span-6 ">
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
                              }}
                            />
                          ))}
                        </div>
                        {/* <Divider className="" type="horizontal" /> */}
                        <div className="md:col-span-3 col-span-6 ">
                          {Data.subjects.slice(4, 6).map((item, i) => (
                            <SubjectGroupCheckbox
                              key={i}
                              groupTitle={item.subjectType}
                              dropdownEffect={false}
                              options={item.subjectList}
                              checkedState={subjects[0]}
                              onChange={(v) =>{ 
                                dispatch(setSubjects([]))
                                dispatch(setSubjects(v))
                                dispatch(setFields(v?.toString()));
                                const grp = v?.toString().split("/")[0];
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        { "subjectsForStreams": { [grp]: [sub] } },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </></div>
                    )}
        <div
          onClick={() => {
            setSubjectOpen(false);
            setClassOpen(false);
            setLocationOpen(false);
            setDistanceOpen(false);
            setPriceOpen(false);
            setRatingOpen(!ratingOpen);
          }}
          className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
          >
            <p className="text-[16px] font-[600px] p-2">Rating</p>
            {
              ratingOpen ? <UpOutlined /> :  <DownOutlined />
            }
        </div>
        {ratingOpen && (
          <div className="py-4">
                      <RatingSlider
                        onChange={(e) => {
                          dispatch(setRating(e));
                        }}
                      />
                      </div>
                    )}
        <div
          onClick={() => {
            setSubjectOpen(false);
            setClassOpen(false);
            setLocationOpen(false);
            setDistanceOpen(!distanceOpen);
            setRatingOpen(false);
            setPriceOpen(false);
          }}
          className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
        >
          <p className="text-[16px] font-[600px] p-2">Distance</p>
          {
            distanceOpen ? <UpOutlined /> :  <DownOutlined />
          }
        </div>
        {distanceOpen && (
          <div className="py-4">
                      <DistanceSlider
                      onChange={(e) => {
                        dispatch(setRating(e));
                      }}
                    />
            </div>
                    )}

        <div
          onClick={() => {
            setSubjectOpen(false);
            setClassOpen(false);
            setLocationOpen(false);
            setDistanceOpen(false);
            setRatingOpen(false);
            setPriceOpen(!priceOpen);
          }}
          className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
          >
            <p className="text-[16px] font-[600px] p-2">Price</p>
            {
              priceOpen ? <UpOutlined /> :  <DownOutlined />
            }
        </div>
        {priceOpen && (
          <div className="py-4">
                      <PriceSlider onChange={(e) => dispatch(setPrice(e))} />
            </div>
                    )}

        <div
          onClick={() => {
            setSubjectOpen(false);
            setClassOpen(false);
            setLocationOpen(!locationOpen);
            setDistanceOpen(false);
            setPriceOpen(false);
            setRatingOpen(false);
          }}
          className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
        >
          <p className="text-[16px] font-[600px] p-2">Location</p>
          {
            locationOpen ? <UpOutlined /> :  <DownOutlined />
          }
        </div>
        {locationOpen && (
          <div className="py-4">
                      <TopLocation></TopLocation>
            </div>
                    )}

        <div className=' flex justify-center  '>
      <div className='flex p-2 rounded-lg  border mt-5 border-b-0 border-l-0  border-r-0 border-gray/10  bg-white '>
        <button
          onClick={() => {
            // setRating(null)
            // onChange(rating)
          }}
          className='text-primary text-sm px-8 py-1 rounded-md border border-primary mr-2 font-medium'
        >
          Rest
        </button>

        <button
          onClick={() => {
            onChange(rating)
          }}
          className='bg-primary text-white px-8 py-1 rounded-md '
        >
          Apply
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default MobileFilterBar;
