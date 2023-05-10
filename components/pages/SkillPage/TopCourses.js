import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { host } from "../../../utils/constant";
import InstituteCard from "../../UI/InstituteCard";
import CourseCard from "../Course/MetaCourseSection/CourseCard";

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
const categoryData = [
  {
    name: "Photography",
    value: "Photography",
  },
  {
    name: "Business",
    value: "Business",
  },
  {
    name: "IT",
    value: "IT",
  },
  {
    name: "Design",
    value: "Design",
  },
  {
    name: "Marketing",
    value: "Marketing",
  },
  {
    name: "Development",
    value: "Development",
  },
  {
    name: "Other Skill",
    value: "Other Skill",
  },
  {
    name: "Skills",
    value: "Skills",
  },
  {
    name: "Clear All",
    value: "",
  },
];

const TopCourses = () => {
  const [searchText, setSearchText] = useState("");
  const [categoryShow, setCategoryShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);
  const [locationShow, setLocationShow] = useState(false);
  const [classShow, setClassShow] = useState(false);
  const [subjectShow, setSubjectShow] = useState(false);
  const [typeShow, setTypeShow] = useState(false);
  const [examShow, setExamShow] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", removeDropdown);
  }, []);

  const removeDropdown = (e) => {
    setCategoryShow(false);
    setSortShow(false);
    setLocationShow(false);
    setTypeShow(false);
    e.stopPropagation();
  };

  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("Institute");
  const [locationBy, setLocationBy] = useState("");
  const [examBy, setExamBy] = useState("");
  const [subjectBy, setSubjectBy] = useState("");
  const [classBy, setClassBy] = useState("");
  const [category, setCategory] = useState("Skills");
  const [locations, setLocations] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [allInstitutes, setAllInstitutes] = useState([]);

  const [count, setCount] = useState(6);

  const handleSearch = () => {};

  const [currentInstituteCourse, setCurrentInstituteCourse] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    if (category) {
      const json = {
        name: category,
      };
      const run = async () => {
        try {
          const res = await axios.get(
            `${host}/course?category=
            ${JSON.stringify(json)}&name=${searchText}&limit=12`
          );

          setCurrentInstituteCourse(res?.data?.message);
          
        } catch (err) {
          toast.error(err.message);
        }
      };

      run();
    }
  }, [searchText, category]);

  useEffect(() => {
    if (category) {
      const json = {
        name: category,
      };
      const run = async () => {
        try {
          const res = await axios.get(
            `${host}/course?category=
            ${JSON.stringify(json)}&name=${searchText}&limit=12`
          );

          setCourse(res?.data?.message);
          
        } catch (err) {
          toast.error(err.message);
        }
      };

      run();
    }
  }, [searchText, category]);

  useEffect(() => {
    
    if (locationBy) {
      setCurrentInstituteCourse(
        course.filter((a) =>
          a.institute.area_tags.includes(locationBy.toLowerCase())
        )
      );
    }
    if (!locationBy) {
      setCurrentInstituteCourse(course);
    }
  }, [course, locationBy]);

  const [topLocationData, setTopLocationData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${host}/locations?limit=100`).then(function (response) {
        setTopLocationData(response.data.message);
        
      });
    } catch (err) {
      
    }
  }, []);

  

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
    const run = async () => {
      try {
        if (searchText) {
          const query = JSON.stringify({
            "Skill Based Courses": { domainName: "Skill Based Courses" },
          });
          const { data } = await axios.get(
            `${host}/institute?approval=1&services=${query}&name=${searchText}&location=${locationBy}&limit=50`
          );
          const sortInstitutes = data?.message?.slice();
          
          setAllInstitutes(data.message);
          setInstitutes(data.message);
        } else {
          const query = JSON.stringify({
            "Skill Based Courses": {"domainName": "Skill Based Courses"},
          });
          const { data } = await axios.get(
            `${host}/institute?approval=1&services=${query}&location=${locationBy}&limit=50`
          );
          const sortInstitutes = data?.message?.slice();
          
          setAllInstitutes(data.message);
          setInstitutes(data.message);
        }

        // const sortCourses = data.message?.filter((items) => "classtype" in items);
      } catch (error) {
        toast.error(error.toString());
      }
    };
    run();
  }, [locationBy, searchText]);

  return (
    <div className="p-5 sm:p-10">
      <p className="md:text-[45px] text-[25px] font-semibold text-center">
        Top <span className="text-primary font-bold ">6 Courses</span> We Offer
      </p>
      <div className="md:flex justify-between">
        <div className="flex justify-between items-center my-3">
          {" "}
          <div
            className={` shrink w-96 px-3 py-2  text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-[#C4C4C4] rounded-[4px]  first-letter:transition ease-in-out flex items-center justify-between `}
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
        <div>
          <div className=" md:flex grid md:grid-cols-3  grid-cols-2 gap-4  items-center my-5">
            <div className="relative  my-1">
              <p
                onClick={(e) => {
                  setSortShow(!sortShow);
                  setCategoryShow(false);
                  setTypeShow(false);
                  setLocationShow(false);
                  setSubjectShow(false);
                  setExamShow(false);
                  setExamShow(false);
                  setClassShow(false);
                  e.stopPropagation();
                }}
                className="flex w-full justify-between   items-center  cursor-pointer border-2 border-solid border-[#C4C4C4] rounded-[4px]  p-3 "
              >
                <p className={`  text-[16px] `}>
                  {sortBy ? sortBy : "Sort By"}
                </p>
                {sortShow ? (
                  <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                ) : (
                  <GoChevronDown className="ml-1  text-[16px]" />
                )}
              </p>
              {sortShow ? (
                <>
                  {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                  <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-[4px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  setCategoryShow(false);
                  setTypeShow(false);
                  setSubjectShow(false);
                  setExamShow(false);
                  setClassShow(false);
                  e.stopPropagation();
                }}
                className="flex w-full justify-between  items-center  cursor-pointer border-2 border-solid border-[#C4C4C4] rounded-[4px]   p-3 "
              >
                <p className={` text-[#000000] text-[16px] `}>
                  {locationBy ? locationBy : "Location"}
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
                  <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-[4px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  setCategoryShow(false);
                  setLocationShow(false);
                  setSubjectShow(false);
                  setExamShow(false);
                  setExamShow(false);
                  setClassShow(false);
                  setSortShow(false);
                  e.stopPropagation();
                }}
                className="flex w-full justify-between w-44 items-center  cursor-pointer border-2 border-solid border-[#C4C4C4] rounded-[4px]   p-3 "
              >
                <p className={` text-[#000000] text-[16px] `}>
                  {type
                    ? type === 3
                      ? "Hybrid"
                      : type === 2
                      ? "Offline"
                      : "Online"
                    : "Select Mode"}
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
                  <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-[4px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

            {sortBy !== "Institute" ? (
              <div className="relative">
                <p
                  onClick={(e) => {
                    setCategoryShow(!categoryShow);
                    setTypeShow(false);
                    setLocationShow(false);
                    setSubjectShow(false);
                    setExamShow(false);
                    setClassShow(false);
                    setSortShow(false);
                    e.stopPropagation();
                  }}
                  className="flex w-full justify-between items-center w-44 cursor-pointer border-2 border-solid border-[#C4C4C4] rounded-[4px]   p-3"
                >
                  <p className={` text-[#000000] text-[16px] `}>
                    {category ? `${category}` : "Select Category"}
                  </p>
                  {categoryShow ? (
                    <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                  ) : (
                    <GoChevronDown className="ml-1 text-[16px]" />
                  )}
                </p>
                {categoryShow ? (
                  <>
                    {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                    <div className="absolute left-0 z-10 mt-5 w-48 origin-top-right rounded-[4px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 divide-y divide-gray/20" role="none">
                        {categoryData?.map((element, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`flex ${
                                category === element.value
                                  ? "text-primary"
                                  : "text-[#000000]"
                              }   justify-between cursor-pointer  items-center`}
                              onClick={() => {
                                setCategory(element.value);
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
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Course Card */}

      {sortBy === "Courses" ? (
        <>
          {currentInstituteCourse?.length && (
            <>
              <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
                {currentInstituteCourse?.length > 0 &&
                  currentInstituteCourse
                    ?.slice(0, count)
                    .map((item, key) => <CourseCard {...item} key={key} />)}
              </div>
              <p
                onClick={() => {
                  if (count === 6) {
                    setCount(9);
                  }
                  if (count === 9) {
                    setCount(6);
                  }
                }}
                className="text-center w-[200px] mx-auto mt-10 underline hover:text-primary cursor-pointer font-bold text-[18px]"
              >
                view {count === 9 ? "less" : "more"}...
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {institutes?.length && (
            <>
              <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
                {institutes?.length > 0 &&
                  institutes
                    ?.slice(0, count)
                    .map((item, key) => <InstituteCard {...item} key={key} />)}
              </div>

              <p
                onClick={() => {
                  if (count === 6) {
                    setCount(9);
                  }
                  if (count === 9) {
                    setCount(6);
                  }
                }}
                className="text-center w-[200px] mx-auto mt-10 underline hover:text-primary cursor-pointer font-bold text-[18px]"
              >
                view {count === 9 ? "less" : "more"}...
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TopCourses;
