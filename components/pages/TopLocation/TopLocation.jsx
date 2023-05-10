import { Rating, Stack } from "@mui/material";
import { Tabs } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import {
  selectSearch,
  setFilteredInstitutes,
} from "../../../redux/slices/SearchSlice";
import { selectUserAnalytics } from "../../../redux/slices/UserAnalytics";
import { host } from "../../../utils/constant";
import InstituteCard from "../../UI/InstituteCard";
import Segments from "../HomeLanding/InstituteSection/Segments";
import { Pagination } from "@mui/material";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const TopLocation = ({ area, usingFor }) => {
  const [activeTab, setActiveTab] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [topLocationData, setTopLocationData] = useState();
  const { userLocation } = useSelector(selectUserAnalytics);
  const [state, setState] = useState(area || router?.query?.area || "Delhi");
  const router = useRouter();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(6);
  const { filteredInstitutes } = useSelector(selectSearch);
  

  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    if (router?.query?.area) {
      setState(router?.query?.area?.replaceAll("-", " "));
    }
    if (router?.query?.currentExam === "cuet") {
      const json = {
        "Competitive Exams": {
          examsPerFields: ["Common University Entrance Test (CUET)"],
        },
      };

      filterByCategory(json, "");
    }
  }, [router?.query?.area, router?.query?.currentExam]);

  useEffect(() => {
    try {
      axios.get(`${host}/locations?state=${state}`).then(function (response) {
        setTopLocationData(response.data.message);
        
      });
    } catch (err) {
      
    }
  }, [state, skip, limit]);

  const filterByCategory = async (cat, area) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?approval=1&services=${query}&location=${area}&&limit=50`
      );
      const sortInstitutes =
        data?.message
          ?.slice()
          .sort((a, b) => b?.images?.length - a?.images?.length)
          .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
          .sort((a, b) => b?.rating - a?.rating) || [];
      
      // const sortCourses = data.message?.filter((items) => "classtype" in items);
      dispatch(setFilteredInstitutes(sortInstitutes));
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

  const { institutes } = useSelector(institutesSelector);

  const [instituteShowing, setInstituteShowing] = useState(6);
  const [locationWay, setLocationWay] = useState();

  const getFilterInstitutes = async (place) => {
    await axios
      .get(`${host}/institute?approval=1&location=${place}&limit=100`)
      .then(function (response) {
        setLocationWay(response.data.message);
        
      });
  };

  const [locations, setLocations] = useState([]);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const run = async () => {
      await axios
        .get(`${host}/locations/city?state=${state}&nolimit=true`)
        .then(function (response) {
          
          setLocations(response?.data?.cities);
          let uniqueIds = [];
          response?.data?.cities.forEach((element) => {
            uniqueIds.push(...element.city);
          });
          setCities(uniqueIds);
        });
    };

    run();
  }, [state]);

  useEffect(() => {
    if (locations) {
      const data = locations?.filter(
        (a) => a.state.toLowerCase() === state.toLowerCase()
      )[0]?.city[0];
      if (data && !activeTab) {
        setActiveTab(data);
        getFilterInstitutes(data);
      }
    }
  }, [locations, state, activeTab]);

  // useEffect(() => {
  //   getFilterInstitutes(activeTab);
  //   
  // }, [activeTab]);

  const [type, setType] = useState("");
  const [ratingShow, setRatingShow] = useState(false);

  const [typeShow, setTypeShow] = useState(false);
  const [rating, setRating] = useState("");

  const [sortedInstitute, setSortedInstitute] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (locationWay) {
      setSortedInstitute(locationWay);
    }
  }, [locationWay]);

  const handleSearch = () => {
    if (searchText) {
      setSortedInstitute(
        locationWay?.filter((a) =>
          a.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    if (!searchText) {
      setSortedInstitute(locationWay);
    }
  };

  useEffect(() => {
    if (locationWay) {
      if (searchText) {
        setSortedInstitute(
          locationWay?.filter((a) =>
            a.name.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
      if (!searchText) {
        setSortedInstitute(locationWay);
      }
    }
  }, [searchText, locationWay]);

  useEffect(() => {
    if (locationWay) {
      if (type) {
        setSortedInstitute(locationWay?.filter((a) => a.classmode === type));
      }
      if (!type) {
        setSortedInstitute(locationWay);
      }
    }
  }, [type, locationWay]);

  useEffect(() => {
    if (locationWay) {
      if (rating) {
        setSortedInstitute(locationWay?.filter((a) => a.rating === rating));
      }
      if (!rating) {
        setSortedInstitute(locationWay);
      }
    }
  }, [rating, locationWay]);

  

  const [subLocationsData, setSubLocationsData] = useState([]);
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState(20);
  const [subLocationCount, setSubLocationCount] = useState(0);

  useEffect(() => {
    if (state) {
      try {
        axios
          .get(
            `${host}/locations?city=${activeTab}&skip=${
              skip * 50
            }&limit=${limit}`
          )
          .then(function (response) {
            setSubLocationsData(response.data.message);
            setSubLocationCount(response.data.count);
            setPaginationButton(Math.ceil(response.data.count / 50));
            
          });
      } catch (err) {
        
      }
    }
  }, [dispatch, state, activeTab, itemCount, skip, limit]);

  return (
    <div>
      <section className="container mx-auto p-5 lg:p-10 lg:py-5">
        <div className=" text-center my-5 space-y-5 ">
          <h1 className=" leading-none font-bold text-xl lg:text-5xl ">
            Top Locations in India
          </h1>
          <p className="lg:text-lg">
            Choose from the best and the most suitable locations near you.
          </p>

          <div className="bg-[#F1F1F1] border border-[#DADADA] rounded-[50px] w-fit py-3 px-2 mx-auto flex justify-between">
            <button
              onClick={() => {
                setState("uttar pradesh");

                setActiveTab(
                  locations?.filter(
                    (a) => a.state.toLowerCase() === "uttar pradesh"
                  )[0]?.city[0]
                );
                const json = {
                  "Competitive Exams": {
                    examsPerFields: ["Common University Entrance Test (CUET)"],
                  },
                };

                usingFor === "examPage"
                  ? filterByCategory(json, "uttar pradesh")
                  : getFilterInstitutes(
                      locations?.filter(
                        (a) => a.state.toLowerCase() === "uttar pradesh"
                      )[0]?.city[0]
                    );
              }}
              className={` py-2 md:text-lg   ${
                state === "uttar pradesh"
                  ? "bg-[#7D23E0] text-white font-semibold  px-6 mx-2"
                  : "text-[#454C5C]  px-3"
              } rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
            >
              Uttar Pradesh
            </button>
            <div className=" border-r-2 border-black "></div>
            <button
              onClick={() => {
                setState("delhi");
                setActiveTab(
                  locations?.filter((a) => a.state.toLowerCase() === "delhi")[0]
                    ?.city[0]
                );
                const json = {
                  "Competitive Exams": {
                    examsPerFields: ["Common University Entrance Test (CUET)"],
                  },
                };

                usingFor === "examPage"
                  ? filterByCategory(json, "delhi")
                  : getFilterInstitutes(
                      locations?.filter(
                        (a) => a.state.toLowerCase() === "delhi"
                      )[0]?.city[0]
                    );
              }}
              className={`  py-2 md:text-lg  ${
                state === "delhi"
                  ? "bg-[#7D23E0]  px-6 text-white font-semibold mx-2"
                  : "text-[#454C5C]  px-3"
              } rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
            >
              Delhi
            </button>
            <div className=" border-r-2 border-black "></div>
            <button
              onClick={() => {
                setState("haryana");
                setActiveTab(
                  locations?.filter(
                    (a) => a.state.toLowerCase() === "haryana"
                  )[0]?.city[0]
                );
                const json = {
                  "Competitive Exams": {
                    examsPerFields: ["Common University Entrance Test (CUET)"],
                  },
                };

                usingFor === "exaPage"
                  ? filterByCategory(json, "haryana")
                  : getFilterInstitutes(
                      locations?.filter(
                        (a) => a.state.toLowerCase() === "haryana"
                      )[0]?.city[0]
                    );
              }}
              className={`  py-2 md:text-lg  ${
                state === "haryana"
                  ? "bg-[#7D23E0] text-white font-semibold  px-6 mx-2"
                  : "text-[#454C5C]  px-3"
              }    rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
            >
              Haryana
            </button>
          </div>
        </div>

        <Tabs
          centered
          defaultActiveKey={activeTab}
          className="max-w-5xl mx-auto"
          onChange={(e) => {
            getFilterInstitutes(e);
            setActiveTab(e);
            //   
          }}
        >
          {cities.map((item, key) => (
            <>
              <Tabs.TabPane key={item} tab={item}>
                <Segments
                  className=" "
                  options={subLocationsData.slice(0, itemCount)}
                  // onChange={(value) => setActiveLocation(value)}
                />
              </Tabs.TabPane>
            </>
          ))}
        </Tabs>

        {subLocationsData.length > 20 ? (
          <div
            onClick={() => {
              const itemHandler = () => {
                if (!isViewMore) {
                  setItemCount(50);
                } else {
                  setItemCount(20);
                }
              };
              itemHandler();
              setIsViewMore(!isViewMore);
            }}
            className="text-md bg-black w-[120px] rounded-md mx-auto my-2 text-white p-2 flex items-center space-x-2 cursor-pointer justify-center"
          >
            <p>{isViewMore ? "View Less" : "View More"}</p>
            {isViewMore ? (
              <UpOutlined className="flex items-center text-xs" />
            ) : (
              <DownOutlined className="flex items-center text-xs" />
            )}
          </div>
        ) : (
          ""
        )}
        {/* pagination thing added in top location */}

        {subLocationCount >= 49 ? (
          <Stack
            alignItems="center"
            sx={{
              marginTop: "20px",
            }}
          >
            <Pagination
              onChange={(e, v) => {
                setSkip(v - 1);
                
              }}
              count={paginationButton}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        ) : (
          ""
        )}

        <div className="md:flex justify-between items-center">
          <div className="search">
            {" "}
            <div
              className={` shrink w-96 px-3 py-2 md:my-10 my-3  rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out flex items-center justify-between `}
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
                onClick={handleSearch}
                className="text-gray text-xl cursor-pointer"
              />
            </div>
          </div>
          <div className="filter px-3">
            <div className="md:flex items-center">
              <p className="text-[17px] ">Filter By</p>
              <div className="md:flex items-center">
                <div className="relative md:mx-2 my-1">
                  <p
                    onClick={() => {
                      setTypeShow(!typeShow);
                      setRatingShow(false);
                    }}
                    className="flex  justify-between w-44 items-center  cursor-pointer border-2 border-solid border-light-gray  p-3 "
                  >
                    <p className={` text-[#000000] text-[16px] `}>Type</p>
                    {typeShow ? (
                      <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                    ) : (
                      <GoChevronDown className="ml-1 text-[16px]" />
                    )}
                  </p>
                  {typeShow ? (
                    <>
                      {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                      <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                          className="py-1 divide-y divide-gray/20"
                          role="none"
                        >
                          <div
                            className={`flex ${
                              type === 3 ? "text-primary" : "text-[#000000]"
                            }   justify-between cursor-pointer  items-center`}
                            onClick={() => {
                              setType(3);
                            }}
                          >
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              Offline
                            </p>
                          </div>
                          <div
                            onClick={() => {
                              setType(2);
                            }}
                            className={`flex  ${
                              type === 2 ? "text-primary" : "text-[#000000]"
                            } justify-between cursor-pointer  items-center`}
                          >
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              Online
                            </p>
                          </div>
                          <div
                            className={`flex  ${
                              type === 1 ? "text-primary" : "text-[#000000]"
                            } justify-between cursor-pointer  items-center`}
                            onClick={() => {
                              setType(1);
                            }}
                          >
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              Hybrid (offline + online)
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="relative">
                  <p
                    onClick={() => {
                      setRatingShow(!ratingShow);
                      setTypeShow(false);
                    }}
                    className="flex  justify-between items-center w-44 cursor-pointer border-2 border-solid border-light-gray  p-3"
                  >
                    <p className={` text-[#000000] text-[16px] `}>Ratings</p>
                    {ratingShow ? (
                      <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                    ) : (
                      <GoChevronDown className="ml-1 text-[16px]" />
                    )}
                  </p>
                  {ratingShow ? (
                    <>
                      {/* <div className="arrow  absolute h-[20px]  w-[20px] bg-black rotate-45" id="arrow"/> */}
                      <div className="absolute left-0 z-10 mt-5 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                          className="py-1 divide-y divide-gray/20"
                          role="none"
                        >
                          <div
                            className={`flex  ${
                              rating === 5 ? "text-primary" : "text-[#000000]"
                            } justify-between cursor-pointer  items-center`}
                            onClick={() => {
                              setRating(5);
                            }}
                          >
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              5 star
                            </p>
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
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              4 star
                            </p>
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
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              3 star
                            </p>
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
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              2 star
                            </p>
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
                            <p className={`  text-[16px]  px-4 py-2 `}>
                              1 star
                            </p>
                            <Rating
                              className={`mr-2`}
                              name="read-only"
                              value={1}
                              size="small"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="  mx-auto  grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-[60px] ">
          {
            // filteredInstitutes?.length > 0 ? (
            //   filteredInstitutes?.map((item, key) => (
            //     <InstituteCard {...item} key={key} />
            // ))) : (
            sortedInstitute
              // ?.sort((a, b) => b?.images?.length - a?.images?.length)
              // ?.sort((a, b) => b?.reviews?.length - a?.reviews?.length)
              // ?.sort((a, b) => b?.rating - a?.rating)
              ?.slice(0, showMore)
              .map((item, key) => (
                <InstituteCard {...item} key={key} />
              ))
            // )
          }
        </div>
        <div className="flex justify-center my-10">
          {/* <button
          onClick={() => {
            // dispatch(setFields(""));
            // dispatch(setClass([]));
            // dispatch(setLocationQuery(state))
            // dispatch(
            //   setSearch({
            //     type: "institute",
            //     name: "",
            //   })
            // );
            // router.push(`/search/${state?.toLowerCase()?.replace(/ /g,"-")}`);

            setShowMore(30)
            // router.push(`/search`);
          }}
          className=" px-6 py-2 md:text-lg flex items-center bg-black text-white rounded-md hover:scale-105 duration-200 "
        > */}
          {/* See More */}
          {sortedInstitute?.length > 0 ? (
            <>
              {showMore === 50 ? (
                <button
                  onClick={() => {
                    setShowMore(6);
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
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};

export default TopLocation;
