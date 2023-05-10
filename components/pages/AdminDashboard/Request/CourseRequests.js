import { Menu, MenuItem, Pagination, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../../../assets/images/institute.png";
import {
  AllCourseApprove,
  CourseApprove,
} from "../../../../redux/slices/adminCourseSlice";

import { host } from "../../../../utils/constant";
import Loader from "../../../Loader";
import { HybridIcon } from "../../../SVGIcons";
import CourseDetailsModal from "../AdminModal/CourseDetailsModal/CourseDetailsModal";
const CourseRequests = () => {
  const [open, setOpen] = useState(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [course, setCourse] = useState({});
  const [courseId, setCourseId] = useState({});

  const [data, setData] = useState([]);
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    let valid = [];
    let invalid = [];
    data?.forEach((item) => {
      if (item.courses?.length) {
        item.courses.map((course) => {
          if (course.approval === 3) {
            valid.push(item);
          } else if (course.approval === 4) {
            valid.push(item);
          } else {
            invalid.push(item);
          }
        });
      } else {
        invalid.push(item);
      }
    });

    let setValid = [...new Set(valid)].map((item) => {
      return {
        ...item,
        sorted: true,
      };
    });
    let setInValid = [...new Set(invalid)];

    let allData = [].concat(setValid).concat(setInValid);

    setInstitutes(allData);
  }, [data]);

  const dispatch = useDispatch();

  const { error, isUpdatedData, isUpdated } = useSelector(
    (state) => state.adminCourses
  );

  const router = useRouter();

  const [adminInstitutes, setAdminInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const run = async () => {
      // if (search) {
      //   setLoading(false);
      // } else {
      //   setLoading(true);
      // }
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(
          `${host}/institute?approval=1&name=${search}&skip=${
            skip * 50
          }&limit=${limit}`,
          config
        );

        setAdminInstitutes(data?.message);

        if (skip === 0) {
          setPaginationButton(Math.ceil(data.count / 50));
        }

        if (skip !== 0) {
          setPaginationButton(Math.ceil(data.count / 50));
        }
      } catch (error) {
      } finally {
        // setLoading(false);
      }
    };

    run();
  }, [limit, search, skip]);

  useEffect(() => {
    if (adminInstitutes) {
      setData(adminInstitutes);
    }
  }, [adminInstitutes]);

 

  const showCourse = (index) => {
    if (open === index) {
      if (!show) {
        setShow(true);
      } else {
        setShow(false);
      }
      return;
    }
    setOpen(index);
    setShow(true);
  };

  const handleAccept = (id) => {
    const updatedData = {
      id,
      approve: 1,
    };

    dispatch(CourseApprove(updatedData));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const typeOpen = Boolean(anchorEl);

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const filterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleByDate = () => {
    const sortedDates = adminInstitutes
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.registeredon) };
      })
      .sort((a, b) => b.date - a.date);
    setData(sortedDates);
    handleClose();
  };

  const handleByType = () => {
    const sortedType = adminInstitutes
      ?.map((obj) => {
        return { ...obj };
      })
      .sort((a, b) => a.classmode - b.classmode);


    setData(sortedType);
    handleClose();
  };

  const handleByCourse = () => {
    const sortedType = adminInstitutes
      ?.map((obj) => {
        return { ...obj };
      })
      .sort((a, b) => b?.courses?.length - a?.courses?.length);

    
    setData(sortedType);
    handleClose();
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [type, setType] = React.useState(null);

  useEffect(() => {
    if (!type) {
      setData(adminInstitutes);
    }

    if (type) {
      setData(adminInstitutes.filter((a) => a.classmode === type));
    }
  }, [type, adminInstitutes]);

  const [newInstituteData, setNewInstituteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = institutes.map(async (e) => {
        const res = await axios.get(
          `${host}/course?instituteId=${e.id}&limit=50`
        );
        return Promise.resolve({
          ...e,
          courses: res?.data?.message,
        });
      });

      const data = await Promise.all(promises);
      setNewInstituteData(data); // an array of resolved values

      // do something with the resolved values
    };

    fetchData();
  }, [institutes]);

  var sorted_meetings = newInstituteData
    .filter((a) => a?.courses?.length > 0)
    .map((a) => a?.courses);

  const res = [];
  sorted_meetings?.forEach((element) => {
    element?.forEach((el) => {
      res.push(el);
    });
  });

  const recentAddedCourse = res
    .sort((a, b) => {
      return (
        new Date(a.publishedon).getTime() - new Date(b.publishedon).getTime()
      );
    })
    .reverse();

  const handleAcceptAll = async (courses = []) => {
    let unapprovedCourses = courses.filter(
      (course) => course.approval !== 1 && course.approval !== 2
    );
   

    dispatch(AllCourseApprove(unapprovedCourses));
  };

  let uniqueData = [];

  const removeDuplicatesData = newInstituteData
    ?.filter((a) => a?.courses?.length > 0)
    ?.filter((element) => {
      let isDuplicate;
      if (element?.category?.name)
        isDuplicate = uniqueData.filter((a) => a.id === element.id);
      if (!isDuplicate) {
        uniqueData.push(element);

        return true;
      }

      return false;
    });



  // useEffect(() => {
  //   let institutesData = [];

  //   const data = institutes.map(async (e) => {
  //     const res = await axios.get(
  //       `${host}/course?instituteId=${e.id}&limit=10`
  //     );
  //     return Promise.resolve({
  //       ...e,
  //       courses: res?.data?.message,
  //     });
  //   });

  //   
  // }, [institutes]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white mb-12 shadow-lg md:shadow-none border-light-gray rounded-lg md:border border-0 py-5">
            <div className="flex space-x-1 px-5  justify-between">
              <h3 className="font-bold text-[19px] text-[#252733]">
                Institutes with new courses
              </h3>
              <div className="flex md:gap-x-8 gap-x-5 items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name"
                  className="outline-none border border-gray/20 px-2 "
                />
                <div
                  id="basic-button"
                  aria-controls={typeOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={typeOpen ? "true" : undefined}
                  onClick={handleClick}
                  className="flex items-center"
                >
                  <FaSortAmountUp className="text-[#C5C7CD]" />
                  <span className=" cursor-pointer font-bold md:block hidden ml-2">
                    Sort
                  </span>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={typeOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleByDate()}>By Date</MenuItem>
                  <MenuItem onClick={() => handleByType()}>By Type</MenuItem>
                  <MenuItem onClick={() => handleByCourse()}>
                    By Course
                  </MenuItem>
                </Menu>
                <div
                  onClick={handleFilterClick}
                  id="basic-button"
                  aria-controls={filterOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={filterOpen ? "true" : undefined}
                  className="flex items-center cursor-pointer"
                >
                  <FaFilter className="text-[#C5C7CD]" />
                  <span className="font-bold md:block hidden ml-2">Filter</span>
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
                  <Box sx={{ minWidth: 200, padding: "10px 10px" }}>
                    <FormControl sx={{ marginBottom: "10px" }} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChange}
                      >
                        <MenuItem value={null}>All</MenuItem>
                        <MenuItem value={1}>Hybrid</MenuItem>
                        <MenuItem value={2}>Online</MenuItem>
                        <MenuItem value={3}>Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Menu>
              </div>
            </div>
            <div className="pt-12">
              <div className="md:border-b-[1.5px] border-light-gray md:border-[#DFE0EB] pb-2">
                <p className="font-bold text-[16px] text-[#9FA2B4] mx-5 ">
                  Name of Institute
                </p>
              </div>
              <div className="md:grid md:grid-cols-1 border-light-gray divide-light-gray md:border-b md:divide-y">
                {uniqueData?.map((d, index) => (
                  <div
                    key={index}
                    className={`
                    cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray 
                  `}
                  >
                    <div
                      className={`flex justify-between items-center md:px-8 px-4 py-6 md:py-6 my-1 ${
                        d?.sorted === true && " border-2 border-red-300"
                      }`}
                    >
                      <div className="flex space-x-3 items-center w-[50%]">
                        <img
                          className="h-[50px] w-[50px] rounded-full "
                          src={
                            d?.images?.length > 0
                              ? `https://cdn.ostello.co.in/${d?.images[0]?.key}`
                              : defaultImage.src
                          }
                          alt=""
                        />
                        <div>
                          <h4
                            className={`uppercase text-[13px] font-semibold ${
                              d?.courses?.find(
                                (a) => a?.id === recentAddedCourse[0]?.id
                              ) && "text-[#FF0000]"
                            }`}
                          >
                            {d.name}
                          </h4>
                          <p className="text-[12px] text-[#7D23E0]">
                            {d?.courses?.length} new courses
                          </p>
                        </div>
                      </div>
                      <div className="flex md:space-x-5 space-x-2 items-center">
                        <button
                          onClick={() => handleAcceptAll(d.courses)}
                          className="bg-[#F0F0F0] border-2 cursor-pointer px-5 rounded-lg text-[#868686] font-medium  hover:opacity-70 py-2"
                        >
                          Accept all
                        </button>
                        {open === index && show ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => showCourse(index)}
                            className="text-[26px] cursor-pointer text-[#7D23E0] bg-[#F0F0F0] rounded-full"
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown
                            onClick={() => showCourse(index)}
                            className="text-[26px] cursor-pointer text-[#7D23E0] bg-[#F0F0F0] rounded-full"
                          />
                        )}
                      </div>
                    </div>
                    {open === index &&
                      show &&
                      (d.courses.length ? (
                        <div className="border border-light-gray mt-6 rounded-lg">
                          <div className="grid grid-cols-1 divide-light-gray divide-y">
                            {d.courses.map((course, index) => (
                              <div key={index} className="md:p-5 p-2 ">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center w-full space-x-3 md:space-x-5">
                                    <img
                                      className="h-[100px]"
                                      src={course.images[0]?.url}
                                      alt=""
                                    />
                                    <div className="flex md:justify-between justify-center md:flex-row flex-col md:items-center w-full">
                                      <div>
                                        <h3
                                          className={`capitalize font-bold md:text-[24px] text-[18px] ${
                                            course.id ===
                                              recentAddedCourse[0]?.id &&
                                            "text-[#FF0000]"
                                          }`}
                                        >
                                          {course.name}
                                        </h3>
                                        <p className="capitalize text-[#767676]">
                                          {d.name}
                                        </p>
                                        <div className="flex md:mt-1 mb-2 mt-[-4px] items-center">
                                          {course.classtype === 1 ? (
                                            <HybridIcon />
                                          ) : (
                                            <BsFillCircleFill
                                              className={`text-[6px] ${
                                                course.classtype === 2
                                                  ? "text-[#3AC817]"
                                                  : "text-[#FF0000]-600"
                                              }`}
                                            />
                                          )}
                                          <span className="ml-2 text-[14px] text-[#414141]">
                                            {course.classtype === 1
                                              ? "Hybrid"
                                              : course.classtype === 2
                                              ? "Online"
                                              : "Offline"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center md:space-x-3 space-x-2">
                                        <button
                                          onClick={() => {
                                            setShowModal(true);
                                            setCourseId(course.id);
                                          }}
                                          className="bg-[#7D23E0] cursor-pointer md:px-5 px-[0.8rem]  rounded-lg text-[#ffffff] font-medium py-1"
                                        >
                                          Review
                                        </button>

                                        {course.approval === 1 ? (
                                          <button className="bg-[#F0F0F0] cursor-pointer border-2 md:px-5 px-[0.8rem] rounded-lg text-[#868686] font-medium py-1">
                                            Accepted
                                          </button>
                                        ) : course.approval === 2 ? (
                                          <button className="bg-[#F0F0F0] cursor-pointer border-2 md:px-5 px-[0.8rem] rounded-lg text-[#868686] font-medium py-1">
                                            Rejected
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() =>
                                              handleAccept(course.id)
                                            }
                                            className="bg-[#F0F0F0] cursor-pointer border-2 md:px-5 px-[0.8rem] rounded-lg text-[#868686] font-medium py-1"
                                          >
                                            Accept
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[#868686] mt-2 ml-3">
                          No course available
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Pagination
            onChange={(e, v) => {
              setSkip(v - 1);
          
            }}
            count={paginationButton}
            variant="outlined"
            shape="rounded"
          />
        </>
      )}

      {showModal && (
        <CourseDetailsModal courseId={courseId} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default CourseRequests;
