import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../../assets/exams/exam-banner.svg";
import banner2 from "../../../assets/toplocationbanner.png";
import Footer from "../../../components/layout/Footer";
import MetaHelmet from "../../../components/MetaHelmet";
import AboutExam from "../../../components/pages/exams/AboutExam";
import ExamPreparation from "../../../components/pages/exams/ExamPreparation";
import ExamReviews from "../../../components/pages/exams/ExamReviews";
import Navbar from "../../../components/pages/HomeLanding/Header/Navbar";
import AuthModal from "../../../components/pages/HomeLanding/Header/Navbar/AuthModal";
import Segments from "../../../components/pages/HomeLanding/InstituteSection/Segments";
import OstelloFAQ from "../../../components/pages/HomeLanding/OstelloFAQ";
import OstelloSubscribe from "../../../components/pages/HomeLanding/OstelloSubscribe";
import InstituteCard from "../../../components/UI/InstituteCard";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import {
  selectSearch,
  setFilteredInstitutes,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import OstelloCuetExplore from "../../../components/pages/HomeLanding/OstelloExplore/OstelloCuetExplore";
import { Autocomplete, Rating, TextField } from "@mui/material";
import { GoChevronDown } from "react-icons/go";
import dynamic from "next/dynamic";
const Carousel = dynamic(
  () => {
    return import("react-elastic-carousel");
  },
  { ssr: false }
);
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
    name: "Clear All",
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
    value: 2,
  },
  {
    name: "Offline",
    value: 3,
  },
  {
    name: "Hybrid",
    value: 1,
  },
  {
    name: "Clear All",
    value: "",
  },
];

const Exams = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const infoGenRef = useRef(null);
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const { filteredInstitutes } = useSelector(selectSearch);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, userData } = useSelector(authSelector);
  const [locations, setLocations] = useState([]);

  const [topLocationData, setTopLocationData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [ratingShow, setRatingShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);
  const [locationShow, setLocationShow] = useState(false);
  const [stateShow, setStateShow] = useState(false);
  const [classShow, setClassShow] = useState(false);
  const [subjectShow, setSubjectShow] = useState(false);
  const [typeShow, setTypeShow] = useState(false);
  const [examShow, setExamShow] = useState(false);

  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("Institutes");
  const [locationBy, setLocationBy] = useState("");
  const [locationName, setLocationName] = useState("");
  const [examBy, setExamBy] = useState("");
  const [subjectBy, setSubjectBy] = useState("");
  const [classBy, setClassBy] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`${host}/locations?state=${state}&name=${locationName}&limit=100`)
        .then(function (response) {
          setTopLocationData(response.data.message);
        });
    } catch (err) {
      console.error(err);
    }
  }, [state, locationName]);

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
      name: "Clear All",
      value: "",
    });

    setLocations(uniqueIds);
  }, [topLocationData]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      dispatch(setAuthModalState(2));
      setOpen(true);
      return;
    }

    if (
      !name?.length ||
      !area?.length ||
      !email?.length ||
      !number?.length ||
      !program?.length ||
      !year?.length
    ) {
      toast.error("Please fill the fields");
      return;
    }

    const d = {
      name: userData?.name || name,
      email: userData?.email || email,
      phonenumber: userData?.phonenumber || number,
      address: `${area},${city},${state}`,
      program: program,
      year: year,
    };

    try {
      const data = await axios.post(`${host}/forms/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });

      toast.success(
        "Thank you, We have received your submission successfully."
      );
      setEmail("");
      setName("");
      setCity("");
      setArea("");
      setState("");
      setNumber("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      // window.location.reload();
    }
  };
  const [institutes, setInstitutes] = useState([]);
  const [allInstitutes, setAllInstitutes] = useState([]);

  useEffect(() => {
    if (router?.query?.currentExam === "cuet") {
      const json = {
        "Competitive Exams": {
          examsPerFields: ["Common University Entrance Test (CUET)"],
        },
      };

      filterByCategory(json, locationBy);
    }
  }, [router?.query?.currentExam, locationBy]);

  const filterByCategory = async (cat, area) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?approval=1&services=${query}&location=${area}&limit=50`
      );
      const sortInstitutes = data?.message?.slice();

      // const sortCourses = data.message?.filter((items) => "classtype" in items);
      setAllInstitutes(sortInstitutes);
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

  useEffect(() => {
    if (rating) {
      setInstitutes(allInstitutes.filter((a) => a.rating === rating));
      dispatch(
        setFilteredInstitutes(allInstitutes.filter((a) => a.rating === rating))
      );
    }
    if (rating === "") {
      setInstitutes(allInstitutes);
      dispatch(setFilteredInstitutes(allInstitutes));
    }
  }, [rating, allInstitutes]);

  useEffect(() => {
    if (type) {
      setInstitutes(allInstitutes.filter((a) => a.classmode === type));
    }
    if (!type) {
      setInstitutes(allInstitutes);
    }
  }, [type, allInstitutes]);

  useEffect(() => {
    if (state) {
      setInstitutes(
        allInstitutes.filter((a) => a.area_tags.includes(state.toLowerCase()))
      );
    }
    if (!state) {
      setInstitutes(allInstitutes);
    }
  }, [state, allInstitutes]);

  useEffect(() => {
    if (locationBy) {
      setInstitutes(
        allInstitutes.filter((a) =>
          a.area_tags.includes(locationBy.toLowerCase())
        )
      );
    }
    if (!locationBy) {
      setInstitutes(allInstitutes);
    }
  }, [locationBy, allInstitutes]);

  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length !== 6) {
      setPincodeError("Enter a valid pincode");
      setAreaOptions([]);
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      return;
    }
    setIsLoading(true);

    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res.data.map((item) =>
          item.PostOffice.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );

        setCity(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => console.error(err));
  };
  const programs = [
    { name: "Online Coaching" },
    { name: "Classroom Coaching" },
    { name: "Self Paced Learning" },
    { name: "Test Series" },
  ];
  const years = [{ name: "2023" }, { name: "2024" }, { name: "2025" }];

  const examOptions = [
    { name: "Jangpura" },
    { name: "Mayur Vihar" },
    { name: "South Ext-II" },
    { name: "Kalka Ji" },
    { name: "Dilshad Garden" },
    { name: "Shalimar Garden" },
    { name: "Shahdara" },
    { name: "Karkardooma" },
    { name: "Lajpat Nagar" },
    { name: "Laxmi Nagar" },
    { name: "Sahibabad" },
  ];

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
    setStateShow(false);
    setExamShow(false);
    e.stopPropagation();
  };

  return (
    <section>
      <MetaHelmet
        title="CUET Exam Preparation Coaching Institutes | Delhi | Uttar Pradesh | Haryana | Ostello"
        description="CUET Exam preparation Coaching Institutes in Delhi, Haryana, Faridabad, Uttar Pradesh at Ostello. Get best CUET Coaching Centres/Classes at Ostello."
        link="https://www.ostello.co.in/exams/cuet"
      />
      <div className=" mx-auto max-w-[1350px]">
        <AuthModal handleClose={handleClose} open={open} />

        <div className="">
          <Navbar text={"text-[#667085]"} />
        </div>

        <div className="container max-w-[1350px] mx-auto mt-20">
          <div className="justify-center grid grid-cols-10 gap-4  items-center transition-all duration-300">
            <div className="flex md:col-span-7 col-span-10 md:mx-auto mx-5">
              <div className="">
                <h1 className=" leading-none font-bold text-2xl lg:text-4xl ">
                  Crack CUET with{" "}
                  <span className="text-primary font-bold">OSTELLO</span>
                </h1>
                <p className="lg:text-lg mb-5">
                  Choose from the best and the most suitable locations near you.
                </p>
                <div className="mb-5 px-5">
                  <Carousel
                    enableMouseSwipe={true}
                    showArrows={false}
                    itemsToShow={1}
                    className=""
                    // enableAutoPlay={true}
                    // autoPlaySpeed={1000}
                    // onNextEnd={({ index }) => {
                    //   if (index === items.length - 1) {
                    //     clearTimeout(resetTimeout);
                    //     resetTimeout = setTimeout(() => {
                    //       carouselRef?.current?.goTo(0);
                    //     }, 1000); // same time
                    //   }
                    // }}
                    pagination={true}
                    breakPoints={[
                      { width: 1, itemsToShow: 1 },
                      { width: 600, itemsToShow: 1 },
                      { width: 900, itemsToShow: 1 },
                    ]}
                  >
                    <div>
                      <img className="w-full" src={banner.src} alt="" />
                    </div>
                    <div>
                      <img className="w-full" src={banner2.src} alt="" />
                    </div>
                  </Carousel>
                </div>
                <div className=" flex justify-center items-center gap-4 mt-10">
                  <div className="py-2 md:w-[350px] text-center bg-[#F6F2FC] px-2">
                    <h1 className="md:text-4xl text-sm lg:text-6xl my-2 font-bold text-primary ">
                      431
                    </h1>
                    <h2 className=" mt-2 lg:text-lg text-xs whitespace-nowrap font-bold">
                      100%-lies in CUET
                    </h2>
                    <h2 className="lg:text-lg text-xs whitespace-nowrap font-bold">
                      2022 & counting
                    </h2>
                  </div>
                  <div className=" grid grid-cols-2 gap-2">
                    <div className="p-2 md:w-[212px] text-center bg-[#E2D0F6] rounded-md">
                      <h1 className="md:text-2xl text-sm lg:text-xl  font-bold ">
                        123
                      </h1>
                      <h2 className=" md:text-lg text-xs  md:font-bold">
                        In Commerce
                      </h2>
                    </div>
                    <div className="p-2 md:w-[212px] text-center bg-primary  rounded-md ">
                      <h1 className="md:text-2xl text-sm lg:text-xl font-bold text-white">
                        140
                      </h1>
                      <h2 className=" md:text-lg text-xs  md:font-bold text-white">
                        In Humanities
                      </h2>
                    </div>
                    <div className="p-2 md:w-[212px] text-center  bg-primary rounded-md ">
                      <h1 className="md:text-2xl text-sm lg:text-xl  font-bold text-white">
                        5
                      </h1>
                      <h2 className="md:text-lg text-xs  md:font-bold text-white">
                        in Science
                      </h2>
                    </div>
                    <div className="p-2 md:w-[212px] text-center bg-[#E2D0F6] rounded-md">
                      <h1 className="md:text-2xl text-sm lg:text-xl font-bold ">
                        163
                      </h1>
                      <h2 className="md:text-lg text-xs  md:font-bold">
                        in English + GT
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:col-span-3 col-span-10 mx-3 md:mx-10 rounded-[10px] px-5 py-3 bg-white border border-[#B0B0B0]">
              <form
                action="
              "
              >
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 md:text-[14px] font-bold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="First name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none h-10"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="number"
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Mobile Number"
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
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
                <div className="flex justify-between gap-2">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 md:text-[14px] font-bold"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      autoFocus
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      name="state"
                      placeholder="State"
                      onChange={(e) => handleChange(e, setState)}
                      value={state}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      autoFocus
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      name="city"
                      placeholder="City"
                      onChange={(e) => handleChange(e, setCity)}
                      value={city}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 md:text-[14px] font-bold"
                    >
                      Area Options
                    </label>
                    <input
                      list="area-option-list"
                      id="area-choice"
                      name="area-choice"
                      type="text"
                      autoFocus
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      placeholder="Area"
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
                <div className="">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                    >
                      Preferred Program
                    </label>
                    <select
                      onChange={(e) => handleChange(e, setProgram)}
                      value={program}
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    >
                      <option
                        className="md:w-9/12 w-full text-slate bg-white"
                        selected
                        value=""
                        disabled
                        hidden
                      >
                        Preferred Program
                      </option>
                      {programs?.map((a, idx) => {
                        return (
                          <option
                            key={idx}
                            className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                          >
                            {a?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                    >
                      Year of appearing XII boards exam
                    </label>
                    <select
                      onChange={(e) => handleChange(e, setYear)}
                      value={year}
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    >
                      <option
                        className="md:w-9/12 w-full text-slate bg-white"
                        selected
                        value=""
                        disabled
                        hidden
                      >
                        Year of appearing XII boards exam
                      </option>
                      {years.map((a, idx) => {
                        return (
                          <option
                            key={idx}
                            className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                          >
                            {a?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="bg-primary text-white w-full rounded-lg mt-3 pb-2 py-1.5 xl:mb-0"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
        <AboutExam />
        <div className="container mx-auto mt-20 ">
          <h1 className=" leading-none font-bold text-center text-xl lg:text-4xl ">
            Institutes Offering{" "}
            <span className="text-primary font-bold"> CUET Coaching</span>
          </h1>
          <div className="mt-10 md:px-0 px-5">
            {/* <Segments
              className=" "
              options={examOptions}
              onChange={(value) => 
              usingFor="examPage"
            /> */}

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
                {locationShow ? (
                  <input
                    className="border-2 border-solid border-light-gray outline-none md:p-2 p-2"
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
                    className="flex w-full justify-between  items-center  cursor-pointer border-2 border-solid border-light-gray  md:p-2 p-2"
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
                )}

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
                              onClick={(e) => {
                                e.preventDefault();
                                setLocationBy(element.value);

                                setLocationShow(false);
                                const json = {};
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

              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={locations}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField hiddenLabel {...params} placeholder="location" />
                )}
              /> */}
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
                          <p className={`  text-[14px]  px-4 py-2 `}>
                            Clear All
                          </p>
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
          <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
            {institutes?.length > 0 ? (
              institutes?.map((item, key) => (
                <div className="px-5" key={key}>
                  <InstituteCard {...item} />
                </div>
              ))
            ) : (
              <div>
                <p className="text-[#FF0000] text-3xl ">No Result Found </p>
              </div>
            )}
          </div>
          <Link legacyBehavior prefetch={false} href="/search/">
            <p className="text-center mt-10 mb-20 underline hover:text-primary cursor-pointer font-bold text-[18px]">
              ...view more institutes
            </p>
          </Link>
        </div>
        <div className="bg-[#F4EBFF] mt-10">
          <ExamReviews />
        </div>
        {/* <ExamsMentor /> */}
        <ExamPreparation />
        <div className="bg-[#F4EBFF] md:py-0 py-1">
          <OstelloCuetExplore
            header={"CUET ka king kaun?"}
            usingFor={"examPage"}
          />
        </div>
        <OstelloFAQ usingFor={"examPage"} />
      </div>

      <div className="md:p-10 p-5 container mx-auto">
        <OstelloSubscribe />
        <Footer />
      </div>
    </section>
  );
};

export default Exams;
