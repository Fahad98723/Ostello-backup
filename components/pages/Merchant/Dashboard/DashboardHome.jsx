import React, { useState, useEffect } from "react";
import img1 from "../../../../assets/merchantDashboard/Accountancy/defaultbg.png";
import {
  AiFillQuestionCircle,
  AiOutlineArrowDown,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import HeaderCard from "./DashboardHome/HeaderCard/HeaderCard";
// import Charts from './DashboardHome/Chart/Charts';
// import PieChart from './DashboardHome/Chart/PieChart';
import RecentOrder from "./DashboardHome/RecentOrder/RecentOrder";
import {
  Box,
  LinearProgress,
  Modal,
  Rating,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  getMerchantAnalytics,
  selectUserAnalytics,
} from "../../../../redux/slices/UserAnalytics";
import { host, INSTITUTE_ID } from "../../../../utils/constant";
import moment from "moment";
import UserStats from "./DashboardHome/Chart/UserStats";
import { authSelector } from "../../../../redux/slices/authSlice";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import LeadsPayment from "./LeadsPayment";
import coin from "../../../../assets/merchantDashboard/Accountancy/coin.png";
import logo from "../../../../assets/merchantDashboard/Accountancy/logoblack.png";

const PieChart = dynamic(() => import("./DashboardHome/Chart/PieChart"), {
  ssr: false,
});
const UpgardeModal = dynamic(() => import("./UpgradeModal/UpgardeModal"), {
  ssr: false,
});
const DashboardPayment = dynamic(() => import("./DashboardPayment"), {
  ssr: false,
});

const Charts = dynamic(() => import("./DashboardHome/Chart/Charts"), {
  ssr: false,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const optionList = [
  "2000 Monthly Active Users",
  "5000 Monthly Active Users",
  "10000 Monthly Active Users",
  "20000 Monthly Active Users",
  "30000 Monthly Active Users",
  "40000 Monthly Active Users",
  "50000 Monthly Active Users",
];

const DashboardHome = () => {
  const [slice, setSlice] = useState(2);
  const [dates, setDates] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [visitInstitute, setVisitInstitute] = useState([]);
  const [knowInstitute, setKnowInstitute] = useState([]);
  const [researchFaculty, setResearchFaculty] = useState([]);
  const [watchVideos, setWatchVideos] = useState([]);
  const [exploreCourses, setExploreCourses] = useState([]);
  const [openStats, setOpenStats] = useState(false);
  // const { merchantAnalytics } = useSelector(selectUserAnalytics);
  const [merchantAnalytics, setMerchantAnalytics] = useState([]);
  const [merchantAnalyticsData, setMerchantAnalyticsData] = useState([]);
  const dispatch = useDispatch();
  const data = [];

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleStats = () => {
    setOpenStats(!openStats);
  };
  const [revenueData, setRevenueData] = useState({});
  const getRevenue = async (id) => {
    try {
      const response = await axios.get(
        `${host}/course/purchased?instituteid=${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${
              typeof window !== "undefined" &&
              window.localStorage.getItem("ACCESS_TOKEN")
            }`,
          },
        }
      );

      let studentCount = 0;
      let revenueCount = 0;
      response?.data?.courses?.map((item) => {
        studentCount = studentCount + item?.studentsenrolled;
        revenueCount =
          revenueCount + item?.pricingdetails?.subscription?.amount;
      });
      const c = {
        totalStudent: studentCount,
        totalRevenue: revenueCount,
        coursesSold: response?.data?.courses?.length,
      };
      setRevenueData(c);
    } catch (err) {}
  };

  const { instituteDetails } = useSelector(authSelector);

  useEffect(() => {
    if (instituteDetails?.id?.length > 0) {
      getRevenue(instituteDetails?.id);
      // dispatch(getMerchantAnalytics(INSTITUTE_ID))

      const getMerchantAnalytics = async () => {
        try {
          const response = await axios.get(
            `${host}/analytics?instituteid=${instituteDetails?.id}&limit=1000`,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${
                  typeof window !== "undefined" &&
                  window.localStorage.getItem("ACCESS_TOKEN")
                }`,
              },
            }
          );
          setMerchantAnalytics(response.data.message);
        } catch (err) {}
      };
      getMerchantAnalytics();

      const getMerchantAnalyticsData = async () => {
        try {
          const response = await axios.get(
            `${host}/analytics/generate?instituteId=${instituteDetails?.id}&dateRange=10`,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${
                  typeof window !== "undefined" &&
                  window.localStorage.getItem("ACCESS_TOKEN")
                }`,
              },
            }
          );
          setMerchantAnalyticsData(response.data.analytics);
        } catch (err) {}
      };
      getMerchantAnalyticsData();
    }
  }, [dispatch, instituteDetails?.id]);

  const [city, setCity] = useState(instituteDetails?.locations?.[0].city);
  const [area, setArea] = useState(instituteDetails?.locations?.[0].area);
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState(instituteDetails?.locations?.[0].state);
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState(
    instituteDetails?.locations?.[0].pincode
  );
  const [pincodeError, setPincodeError] = useState("");

  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length) {
      if (pinCode.length !== 6) {
        toast.error("Enter a valid pincode");
        setPincodeError("Enter a valid pincode");
        setAreaOptions([]);
        setArea("");
        setCity("");
        setState("");
        setCountry("");
        return;
      }
      return;
    }
    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res?.data?.map((item) =>
          item?.PostOffice?.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );

        setCity(res?.data[0]?.PostOffice[0]?.District);
        setState(res?.data[0]?.PostOffice[0]?.State);
        setCountry(res?.data[0]?.PostOffice[0]?.Country);
        setPincodeError("");
      })
      .catch((err) => {});
  };

  const infoGenRef = useRef(null);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    let visit_institute = [];
    let know_institute = [];
    let research_faculties = [];
    let explore_courses = [];
    let watch_videos = [];

    let DataWithTime = (time = "", dataArray = []) => {
      const temp = new Set();
      let arr = [];
      dataArray?.map((u) => temp.add(u?.payload?.userid));
      arr = [...temp];
      return {
        date: time,
        data: dataArray,
        totalUsers: dataArray?.length,
        oldUsers: arr?.length,
        newUsers: dataArray?.length - arr?.length,
      };
    };

    const set_of_dates = new Set();
    const setOfType = new Set();
    const setOfLocations = new Set();
    merchantAnalytics?.map((items) => {
      set_of_dates?.add(
        moment(items?.timestamp?.split("T")[0])?.format("ll")?.split(",")[0]
      );
      setOfType.add(items?.activity_type);
      // setOfLocations.add(items?.area)
    });
    let allArea = [...setOfLocations];
    let allDates = [...set_of_dates];

    let dates_data = [];
    allDates?.map((date) => {
      let data_of_date = merchantAnalytics?.filter(
        (item) =>
          moment(item?.timestamp?.split("T")[0])
            ?.format("ll")
            ?.split(",")[0] === date
      );
      let visit_institute_dod = [];
      let know_institute_dod = [];
      let research_faculties_dod = [];
      let explore_courses_dod = [];
      let watch_videos_dod = [];

      dates_data.push({ date: date, data: data_of_date });

      data_of_date.forEach((data) => {
        if (data.activity_type === "visit_institute") {
          visit_institute_dod.push(data);
        }
        if (data.activity_type === "know_institute") {
          know_institute_dod.push(data);
        }
        if (data.activity_type === "explore_courses") {
          explore_courses_dod.push(data);
        }
        if (data.activity_type === "research_faculties") {
          research_faculties_dod.push(data);
        }
        if (data.activity_type === "watch_videos") {
          watch_videos_dod.push(data);
        }
      });
      visit_institute.push(DataWithTime(date, visit_institute_dod));
      know_institute.push(DataWithTime(date, know_institute_dod));
      explore_courses.push(DataWithTime(date, explore_courses_dod));
      research_faculties.push(DataWithTime(date, research_faculties_dod));
      watch_videos.push(DataWithTime(date, watch_videos_dod));
    });
    let dateCollect = [];
    const options = { month: "long", day: "numeric" };
    merchantAnalyticsData.forEach((a) => {
      dateCollect.push(new Date(a.date).toLocaleDateString("en-US", options));
    });

    setDates(dateCollect);
    // setDatesData(dates_data);
    setVisitInstitute(visit_institute);
    setKnowInstitute(know_institute);
    setExploreCourses(explore_courses);
    setResearchFaculty(research_faculties);
    setWatchVideos(watch_videos);
  }, [merchantAnalytics, merchantAnalyticsData]);

  const [wccShowSidebar, setWCCShowSidebar] = useState(false);
  const [planShowSidebar, setPlanShowSidebar] = useState(false);
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [amount, setAmount] = useState(3000);
  const [autoRechargeAmount, setAutoRechargeAmount] = useState(3000);
  const [select, setSelect] = useState("6 month");
  const [locationModal, setLocationModal] = useState(false);

  const handleLocationClose = () => setLocationModal(false);
  const handleLocationOpen = () => setLocationModal(true);

  const [billingArea, setBillingArea] = useState(
    instituteDetails?.locations?.[0].area
  );
  const [billingCity, setBillingCity] = useState(
    instituteDetails?.locations?.[0].city
  );
  const [billingPincode, setBillingPincode] = useState(
    instituteDetails?.locations?.[0].pincode
  );

  const [activeUsers, setActiveUsers] = useState("");

  useEffect(() => {
    if (instituteDetails?.locations) {
      setBillingArea(instituteDetails?.locations?.[0].area);
      setBillingCity(instituteDetails?.locations?.[0].city);
      setBillingPincode(instituteDetails?.locations?.[0].pincode);
    }
  }, [instituteDetails?.locations]);

  const changeHandle = () => {
    if (area) {
      setBillingArea(area);
    }
    if (city) {
      setBillingCity(city);
    }
    if (pincode) {
      setBillingPincode(pincode);
    }
  };
  const [pricing, setPricing] = useState("10999");
  const [totalPrice, setTotalPrice] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [leadOpenModal, setLeadOpenModal] = useState(false);

  const handleLeadModalClose = () => {
    setLeadOpenModal(false);
  };
  const handleLeadModalOpen = () => {
    setLeadOpenModal(true);
  };

  const [proceed, setProceed] = useState(false);
  const handleProceed = () => {
    setProceed(true);
  };

  const handlePayment = () => {
    setTotalPrice(pricing);
    handleModalOpen();
    setProceed(false);
  };

  const handleLeadPayment = () => {
    handleLeadModalOpen();
    setProceed(false);
  };

  const [progress, setProgress] = useState(10);

  const tooltipPlacement = progress > 50 ? "top-end" : "top-start";
  const tooltipOffset = `${progress}%`;

  return (
    <div className="p-5 ">
      <div className="heading mb-5 md:flex justify-between">
        <h1 className="text-2xl font-bold  ">Dashboard</h1>

        <div className="md:flex items-center">
          <p className="md:mr-4 mt-2 text-xl ">
            Ostello Business Account Status :{" "}
            <span className="text-[#239B56]">
              {" "}
              {instituteDetails?.accountplan?.toUpperCase().split("_")[0]}
            </span>
          </p>

          {instituteDetails?.accountplan === "free_plan" ? (
            <button
              onClick={() => {
                handleOpen();
              }}
              className=" py-3  px-4 mt-2 bg-primary rounded-3xl text-white"
            >
              Upgrade Now
            </button>
          ) : (
            <button
              onClick={() => {
                // handleOpen();
              }}
              className=" py-3  px-4 mt-2 bg-primary rounded-3xl text-white"
            >
              Upgraded
            </button>
          )}
        </div>
      </div>

      <HeaderCard revenueData={revenueData}></HeaderCard>

      <div className=" grid grid-cols-6 gap-6 ">
        <div className=" col-span-6 lg:col-span-4">
          <Charts
            {...{
              // datesData,
              merchantAnalyticsData,
              dates,
              visitInstitute,
              knowInstitute,
              exploreCourses,
              researchFaculty,
              watchVideos,
              handleStats,
            }}
          ></Charts>

          <RecentOrder revenueData={revenueData}></RecentOrder>
        </div>
        <div className=" col-span-6 lg:col-span-2 bg-white rounded-2xl  ">
          <div className="shadow-md p-4 rounded-md bg-primary text-white">
            <div className="flex justify-between mb-5 items-center">
              <div>
                <img className="w-[100px]" src={logo.src} alt="" />
              </div>
              <div className="text-[35px] flex items-center">
                {" "}
                <img className="w-20" src={coin.src} alt="" />{" "}
                {instituteDetails?.id === "cbf89210-7ed5-40cc-a5a9-63da6a5a0efc"
                  ? instituteDetails?.credits - 21310
                  : instituteDetails?.credits}
              </div>
            </div>
          </div>

          <div className="shadow-md p-4 rounded-md my-3">
            <div className="flex justify-between mb-5 items-center">
              <p>Free Tier Leads</p>
              <p>0 /3 used</p>
            </div>

            <Tooltip
              title={3}
              open={!wccShowSidebar && !planShowSidebar ? true : false}
              placement={tooltipPlacement}
              arrow={true}
              sx={{
                mt: 5,
                zIndex: 1,
              }}
            >
              <LinearProgress variant="determinate" value={3} />
            </Tooltip>
            <div className="flex my-1 justify-between">
              <p>0</p>
              <p>1000</p>
            </div>

            <div className="my-2">
              <p>Ostello Leads Credits (OLC)</p>
              <div className="flex justify-between items-center my-2">
                <p className="text-[20px]">
                  ₹{" "}
                  {instituteDetails?.id ===
                  "cbf89210-7ed5-40cc-a5a9-63da6a5a0efc"
                    ? instituteDetails?.credits - 21310
                    : instituteDetails?.credits}
                </p>
                <button
                  onClick={() => {
                    setWCCShowSidebar(true);
                  }}
                  className="p-2 bg-primary text-white rounded"
                >
                  Buy More
                </button>
              </div>

              <div
                className={`top-7 right-0 md:w-[700px] w-[90%] rounded-3xl  bg-[#fcfcfc] border-2 border-light-gray  fixed max-h-[90%]  my-auto overflow-y-scroll z-50  ease-in-out duration-[300ms] ${
                  wccShowSidebar ? "translate-x-0 " : "translate-x-full"
                }`}
              >
                <div className="   ">
                  <div className="flex justify-between p-5  bg-white items-center">
                    <p className="text-xl font-bold">
                      Purchase Ostello Leads Credits (OLC)
                    </p>

                    <button
                      className="flex text- items-center cursor-pointer"
                      style={{ color: "#414141" }}
                      onClick={() => setWCCShowSidebar(!wccShowSidebar)}
                    >
                      <ImCross className="" />
                    </button>
                  </div>

                  <div className="p-5 ">
                    {}
                    <div className=" p-5 rounded border-2 my-3 border-[#95A5A6] ">
                      <p className="text-xl  ">Enter OLC Amount</p>
                      <p className="text-md text-gray">
                        Minimum purchase of ₹3000 credits is allowed
                      </p>

                      <div>
                        <div
                          className={` shrink w-96 px-3 py-2 my-2 text-base font-normal text-slate  bg-clip-padding bg-no-repeat border-2 border-solid border-[#C4C4C4] rounded-[4px] bg-light-gray first-letter:transition ease-in-out flex items-center justify-between `}
                        >
                          <BiRupee
                            onClick={(e) => {}}
                            className="text-gray text-xl cursor-pointer"
                          />
                          <input
                            type="number"
                            placeholder="Enter credit amount here"
                            className="text-xl bg-light-gray  focus:outline-none w-full"
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-2 max-w-[350px]">
                        <button
                          onClick={() => {
                            setAmount(3000);
                          }}
                          className="border-2 border-[#C4C4C4] rounded p-2"
                        >
                          3000
                        </button>
                        <button
                          onClick={() => {
                            setAmount(5000);
                          }}
                          className="border-2 border-[#C4C4C4] rounded p-2"
                        >
                          5000
                        </button>
                        <button
                          onClick={() => {
                            setAmount(7000);
                          }}
                          className="border-2 border-[#C4C4C4] rounded p-2"
                        >
                          7000
                        </button>
                        <button
                          onClick={() => {
                            setAmount(10000);
                          }}
                          className="border-2 border-[#C4C4C4] rounded p-2"
                        >
                          10000
                        </button>
                      </div>

                      <div>
                        <button
                          disabled={amount >= 3000 ? false : true}
                          onClick={() => handleLeadPayment()}
                          className="bg-primary text-white p-2 rounded mt-3"
                        >
                          Purchase Now
                        </button>
                      </div>
                    </div>

                    {/* <div className=" p-5 rounded border-2 my-3 border-[#95A5A6] ">
                      <div className="flex justify-between items-center">
                        <p className="text-xl  ">Enable WCC auto-recharge</p>{" "}
                        <Switch
                          className="text-primary"
                          checked={autoRecharge}
                          onChange={(e) => {
                            setAutoRecharge(!autoRecharge);
                          }}
                          sx={{
                            "&.MuiSwitch-root .Mui-checked": {
                              color: "rgb(125, 35, 224)",
                            },
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <p className="text-md text-gray">
                          Enter minimum WCC amount
                        </p>
                        <div className="p-2">
                          <Tooltip
                            title="WCC auto-recharge will be initiated when the balance goes below the amount specified here"
                            placement="top"
                          >
                            <div className="cursor-pointer">
                              <AiFillQuestionCircle className="ml-2 text-gray" />
                            </div>
                          </Tooltip>
                        </div>
                      </div>

                      <div>
                        <div
                          className={` shrink w-96 px-3 py-2 my-2 text-base font-normal text-slate  bg-clip-padding bg-no-repeat border-2 border-solid border-[#C4C4C4] rounded-[4px] bg-light-gray first-letter:transition ease-in-out flex items-center justify-between `}
                        >
                          <BiRupee
                            onClick={(e) => {}}
                            className="text-gray text-xl cursor-pointer"
                          />
                          <input
                            type="number"
                            placeholder="Minimum WCC amount here"
                            className="text-xl bg-light-gray  focus:outline-none w-full"
                            value={autoRechargeAmount}
                            onChange={(e) => {
                              setAutoRechargeAmount(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center">
                          <p className="text-md text-gray">
                            Enter auto-recharge amount
                          </p>{" "}
                          <Tooltip
                            title="WCC auto-recharge will be done of amount specified here"
                            placement="top"
                            sx={{
                              background: "white",
                            }}
                          >
                            <div className="cursor-pointer">
                              <AiFillQuestionCircle className="ml-2 text-gray" />
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-md p-4 rounded-md my-3">
            <p>Current Plan</p>
            <div className="flex my-3 justify-between items-center">
              {instituteDetails?.accountplan === "pro_plan" ? (
                <p className="text-xl ">
                  Pro plan <small>(Yearly)</small>
                </p>
              ) : (
                <p className="text-xl ">
                  BASIC <small>(monthly)</small>
                </p>
              )}
              <p>renews on 12/05/23</p>
            </div>

            <div className="flex my-3 justify-between items-center">
              <p className="text-md ">Monthly Active Users Left</p>
              <p className="font-semibold">1939</p>
            </div>

            <div className="my-2">
              {/* <div className="flex justify-between items-center mb-5 ">
                <p className="text-[20px] ">MAU Usage</p>
              </div> */}

              <Tooltip
                title={progress}
                open={!wccShowSidebar && !planShowSidebar ? true : false}
                placement={tooltipPlacement}
                arrow={true}
                sx={{
                  mt: 5,
                  zIndex: 1,
                }}
              >
                <LinearProgress variant="determinate" value={progress} />
              </Tooltip>
              <div className="flex my-1 justify-between">
                <p>0</p>
                <p>2000</p>
              </div>
              {instituteDetails?.accountplan === "pro_plan" ? (
                <button
                  onClick={() => {
                    // setPlanShowSidebar(true);
                  }}
                  className="p-2 bg-primary w-full text-white rounded"
                >
                  Upgraded
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPlanShowSidebar(true);
                  }}
                  className="p-2 bg-primary w-full text-white rounded"
                >
                  Upgrade Now
                </button>
              )}

              <div
                className={`top-7 right-0 md:w-[700px] w-[90%] rounded-3xl  bg-[#fcfcfc] border-2 border-light-gray  fixed max-h-[90%]  my-auto overflow-y-scroll z-50  ease-in-out duration-[300ms] ${
                  planShowSidebar ? "translate-x-0 " : "translate-x-full"
                }`}
              >
                <div className="   ">
                  <div className="flex justify-between p-5  bg-white items-center">
                    <p className="text-3xl font-bold">Change Plan</p>

                    <button
                      className="flex text- items-center cursor-pointer"
                      style={{ color: "#414141" }}
                      onClick={() => setPlanShowSidebar(!planShowSidebar)}
                    >
                      <ImCross className="" />
                    </button>
                  </div>

                  <div className="p-5 ">
                    {}
                    <div className=" p-5 rounded border-2 border-[#95A5A6] ">
                      <div className="flex justify-between">
                        <p className="text-2xl font-semibold">Basic</p>
                        <div>
                          <p className="text-primary text-2xl font-bold">
                            ₹{pricing}/{select === "6 month" ? "mo" : "yr"}
                          </p>
                          <small>(Tax Excl,)</small>
                        </div>
                      </div>

                      <p className="text-xl my-3 ">Choose your billing</p>

                      <div className="flex justify-between">
                        <div className="flex">
                          <button
                            onClick={() => {
                              setSelect("6 month");
                              setPricing("10999");
                            }}
                            className={`${
                              select === "6 month"
                                ? "bg-primary text-white"
                                : "bg-[#F2E9FC]  text-black"
                            } p-1 px-6  text-[20px]  rounded cursor-pointer mr-2 flex items-center `}
                          >
                            <p className="">6 Month</p>
                          </button>
                          <button
                            onClick={() => {
                              setSelect("year");
                              setPricing("16999");
                            }}
                            className={`${
                              select === "yearly"
                                ? "bg-primary text-white"
                                : "bg-[#F2E9FC]  text-black"
                            } p-2 px-4  text-[17px]  rounded cursor-pointer items-center mr-2 text-center`}
                          >
                            <p>1 Year</p>
                            <small className="text-[12px]">
                              Flexible Usage | 10% off
                            </small>
                          </button>
                        </div>
                      </div>

                      {/* <div>
                        <p className="text-xl my-3">
                          Choose Monthly Active Users
                        </p>
                        <div className="flex justify-between">
                          <select
                            onChange={(e) => {
                              setActiveUsers(e.target.value);
                            }}
                            value={activeUsers}
                            className={` form-select   marker:block w-3/4 px-4 py-3   text-slate bg-[#F2E9FC] bg-clip-padding bg-no-repeat text-xl font-bold  rounded-md   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
                          >
                            {optionList.map((option, idx) => {
                              return (
                                <option key={idx} className="" value={option}>
                                  {option}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div> */}
                    </div>

                    <div className=" p-3  items-center justify-between mt-3 rounded border-2 border-[#95A5A6]">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="text-xl ">Billing Address </p>

                          <p className="text-md">
                            {" "}
                            {billingArea}, {billingCity} IN - {billingPincode}
                          </p>
                        </div>
                        <p
                          onClick={() => {
                            setLocationModal(true);
                            if (pincode) {
                              handleGenerateFromPincode(pincode);
                            }
                          }}
                          className=" cursor-pointer border-2 border-[#95A5A6] text-[#95A5A6] p-1 px-2"
                        >
                          Edit
                        </p>
                      </div>
                    </div>

                    <div className=" p-3  items-center justify-between mt-3 rounded border-2 border-[#95A5A6]">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="text-xl ">Payment Method </p>

                          <p className="text-md">
                            Credit Card ending with - ***110014
                          </p>
                        </div>
                        <p className=" cursor-pointer border-2 border-[#95A5A6] text-[#95A5A6] p-1 px-2">
                          Update
                        </p>
                      </div>
                    </div>

                    <div className=" p-3  items-center justify-between mt-3 ">
                      <div className="">
                        <p className="text-md">
                          Upgrade : This plan will be applied immediately, term
                          will end in 1 year from current biling start date on{" "}
                          {new Date().toJSON().slice(0, 10)}
                        </p>
                      </div>
                      <p
                        onClick={() => {
                          handlePayment();
                        }}
                        className=" cursor-pointer border-2 my-3 text-center text-2xl font-bold rounded border-2 bg-primary text-white p-1 px-2"
                      >
                        Place Order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PieChart revenueData={revenueData}></PieChart>
        </div>

        <div className=" col-span-6 lg:col-span-4"></div>
        <div
          style={{ height: "360px" }}
          className=" thin-scroll h-65  col-span-6 lg:col-span-2  bg-white p-4 rounded-2xl "
        >
          <div className="heading mb-1">
            <h1 style={{ fontWeight: "700", fontSize: "20px" }}>
              Top Selling Courses
            </h1>
          </div>
          <div className="sm:block hidden overflow-y-scroll h-60 ">
            {data
              .map((d, idx) => (
                <div key={idx} className="">
                  <div className=" flex justify-between items-center mt-5">
                    <div className="flex items-center">
                      <img
                        src={img1.src}
                        style={{
                          height: "95px",
                          width: "95px",
                          borderRadius: "8px",
                        }}
                        className="share-image"
                        alt=""
                      />
                      <div className="texts ml-4">
                        <h2 className="text-base mb-1">{d.name}</h2>
                        <Rating
                          className="text-2xl"
                          name="read-only"
                          value={d.rating}
                          readOnly
                        />
                        <h4 className="text-sm font-bold">₹{d.totalAmount}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, 4)}
          </div>
          <div className="sm:hidden block mb-2">
            {data
              .map((d, idx) => (
                <div key={idx} className="">
                  <div className=" flex justify-between items-center mt-5">
                    <div className="flex items-center">
                      <img
                        src={img1}
                        style={{
                          height: "95px",
                          width: "95px",
                          borderRadius: "8px",
                        }}
                        className="share-image"
                        alt=""
                      />
                      <div className="texts ml-4">
                        <h2 className="text-base mb-1">{d.name}</h2>
                        <Rating
                          className="text-orange/40"
                          emptySymbol="fa fa-star-o "
                          fullSymbol="fa fa-star "
                          initialRating={d?.rating}
                          readonly
                        />
                        <h4 className="text-sm font-bold">₹{d.totalAmount}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, slice)}
          </div>

          <div className="sm:hidden block">
            {slice === 2 ? (
              <div
                style={{
                  cursor: "pointer",
                  color: "#7D23E0",
                  fontWeight: "500",
                }}
                onClick={() => setSlice(4)}
                className="flex items-center justify-center  font-medium "
              >
                <p className="mr-2">View More</p>
                <AiOutlineArrowDown></AiOutlineArrowDown>
              </div>
            ) : (
              <div
                style={{
                  cursor: "pointer",
                  color: "#7D23E0",
                  fontWeight: "500",
                }}
                onClick={() => setSlice(2)}
                className="flex items-center justify-center  font-medium "
              >
                <p className="mr-2">View Less</p>
                <AiOutlineArrowUp></AiOutlineArrowUp>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={locationModal}
        onClose={handleLocationClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between ">
            <p className="text-xl font-bold">Change Billing Address</p>
            <GiCancel
              onClick={() => {
                handleLocationClose();
              }}
              className="text-right text-2xl text-primary cursor-pointer"
            ></GiCancel>
          </div>

          <div
            className={`shrink px-3 py-2   rounded-md  font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 flex`}
          >
            <input
              type="text"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              name="pincode"
              placeholder="Pincode"
              onChange={(e) => handleChange(e, setPincode)}
              value={pincode}
            />
            <button
              ref={infoGenRef}
              onClick={(e) => {
                e.preventDefault();
                handleGenerateFromPincode(pincode);
              }}
              className="text-xs p-1 bg-primary text-white m-1 rounded-md"
            >
              Generate
            </button>
          </div>

          <div className="shrink px-3 py-2  rounded-md font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              name="state"
              placeholder="State"
              onChange={(e) => handleChange(e, setState)}
              value={state}
            />
          </div>
          <div className="shrink px-3 py-2  rounded-md font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white   focus:outline-none w-full"
              name="city"
              placeholder="City"
              onChange={(e) => handleChange(e, setCity)}
              value={city}
            />
          </div>
          <div className={`w-full mt-2`}>
            {/* <select
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                  className={` form-select  marker:block w-full px-3 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid border-[#D0D5DD]  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
                >
                  <option className="w-full" selected value="" disabled>
                    Choose Area
                  </option>
                  {areaOptions.map((category, idx) => {
                    return (
                      <option
                        key={idx}
                        className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                      >
                        {category}
                      </option>
                    );
                  })}
                </select> */}
            <div className="shrink  w-full  px-3 py-2    text-[14px] font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
              <input
                list="area-option-list"
                id="area-choice"
                name="area-choice"
                type="text"
                autoFocus
                className="text-xl bg-white  focus:outline-none w-full cursor-pointer"
                onChange={(e) => handleChange(e, setArea)}
                value={area}
              />

              <datalist id="area-option-list">
                {areaOptions.map((category, idx) => {
                  return (
                    <option
                      key={idx}
                      value={category}
                      className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                    />
                  );
                })}
              </datalist>
            </div>
          </div>

          <button
            onClick={() => {
              changeHandle();
            }}
            className="   my-3 text-center text-xl font-bold rounded bg-primary text-white  p-2"
          >
            Change
          </button>
        </Box>
      </Modal>

      <DashboardPayment
        openModal={openModal}
        handleModalClose={handleModalClose}
        totalPrice={totalPrice}
        select={select}
        handleProceed={handleProceed}
        proceed={proceed}
      />

      <LeadsPayment
        openModal={leadOpenModal}
        handleModalClose={handleLeadModalClose}
        totalPrice={amount}
        handleProceed={handleProceed}
        proceed={proceed}
      />

      <UpgardeModal open={open} setOpen={setOpen} handleClose={handleClose} />
    </div>
  );
};

export default DashboardHome;
