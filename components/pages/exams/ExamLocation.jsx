import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import {
  selectSearch,
  setFilteredInstitutes,
  setLocationQuery,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import InstituteCard from "../../UI/InstituteCard";
import { capitalizeFirst } from "../../utils";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";
import ExamReviews from "./ExamReviews";
import ExamsMentor from "./ExamsMentor";

const ExamLocation = ({ examLocation, content }) => {
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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { filteredInstitutes } = useSelector(selectSearch);
  const { isAuthenticated, userData } = useSelector(authSelector);
  const handleClose = () => {
    setOpen(false);
  };
  const examArea = `${capitalizeFirst(examLocation)}`;

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
  const cards = [
    {
      title: "Online coaching",
      description:
        "Ostello has mastered the perfect recipe for you to crack CUET online, from live classes to 1:1 review sessions to  mock tests and reviews and in-depth analysis of past year paper's and more.",
    },
    {
      title: "Classroom",
      description:
        "Ostello's in-class sessions provides you with a holistic and rigorous training program from knowledge sessions by expert academician to group discussions and doubt solving sessions.",
    },
    {
      title: "Self Paced",
      description:
        "Ostello prides itself in being able to cater to all types of students for CUET Preparation, customize your own program with pre recorded lectures and clear your concepts and take a look whenever in doubt.",
    },
    {
      title: "Test Series",
      description:
        "Ostello has curated a test series like no other, Attempt mocks with past year questions and feedback to improve your answers and our in depth analysis tool to monitor your progress.",
    },
  ];

  useEffect(() => {
    if (router.query.metaSection?.length > 1) {
      dispatch(setLocationQuery(""));
      const json = {
        "Competitive Exams": {
          examsPerFields: ["Common University Entrance Test (CUET)"],
        },
      };

      if (examLocation === "jangpura") {
        filterByCategory(json, "jungpura");
      } else {
        filterByCategory(json, examLocation);
      }
    }
  }, [router.query.metaSection, examLocation]);

  const [institutesData, setInstitutesData] = useState([]);

  const filterByCategory = async (cat, area) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?approval=1&services=${query}&location=${area}`
      );
      const sortInstitutes =
        data?.message
          ?.slice()
          .sort((a, b) => b?.images?.length - a?.images?.length)
          .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
          .sort((a, b) => b?.rating - a?.rating) || [];

      // const sortCourses = data.message?.filter((items) => "classtype" in items);
      dispatch(setFilteredInstitutes(sortInstitutes));
      setInstitutesData(sortInstitutes);
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
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

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
      .catch((err) => {});
  };
  const programs = [
    { name: "Online Coaching" },
    { name: "Classroom Coaching" },
    { name: "Self Paced Learning" },
    { name: "Test Series" },
  ];
  const years = [{ name: "2023" }, { name: "2024" }, { name: "2025" }];
  return (
    <div>
      <AuthModal handleClose={handleClose} open={open} />
      <div className="container md:px-0 px-5 mx-auto  mt-20 md:mt-0">
        <div className="justify-center grid grid-cols-10 gap-4  items-center transition-all duration-300">
          <div className="flex md:col-span-7 col-span-10 md:mx-auto mx-5">
            <div className="">
              <h1 className=" leading-none font-bold text-2xl lg:text-4xl ">
                Where do you want to go?{" "}
              </h1>
              <div className=" flex flex-col gap-4 items-center mt-5">
                <div className="flex flex-col items-start  bg-gradient-to-r from-[#AF3C6D] to-[#EF7B73] border-none py-10 px-5 md:min-h-[233px] md:w-[680px] shadow text-white">
                  <h1 className="text-[32px] text-white">
                    Looking for CUET Exam institutes in Delhi
                  </h1>
                  <p className="text-[18px]">
                    Post an enquiry and get instant responses from our
                    instititutes in Delhi
                  </p>
                  <button
                    onClick={() => {}}
                    className=" text-white w-1/4 xl:mb-0 h-8 mt-20 py-1.5 border-solid border border-white"
                  >
                    Post Now
                  </button>
                </div>
                <div className="flex flex-col items-start px-5 bg-gradient-to-r from-[#169DB1] to-[#71dbcb] border-none py-10 px-5 md:min-h-[233px] md:w-[680px] shadow text-white">
                  <h1 className="text-[32px] text-white">
                    Looking for CUET Exam institutes in Delhi
                  </h1>
                  <p className="text-[18px]">
                    Get quotes from Best coaching Institutes and TRaining
                    Providers in Delhi...
                  </p>
                  <button
                    onClick={() => {}}
                    className="text-white w-2/4 xl:mb-0 h-8 mt-20 py-1.5 border-solid border border-white"
                  >
                    Post requirement
                  </button>
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
                  value={name}
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
                  value={email}
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
                  value={number}
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
                    className="block text-gray-500 md:text-[14px] font-bold"
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
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
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
      <div className="container mx-auto mt-20 ">
        <h1 className=" leading-none font-bold text-xl lg:text-5xl mb-10 text-center ">
          <span className="text-primary font-bold">CUET Coaching</span>{" "}
          institutes in {examArea}
        </h1>
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {institutesData?.length > 0 ? (
            institutesData?.map((item, key) => (
              <div className="px-5" key={key}>
                <InstituteCard {...item} />
              </div>
            ))
          ) : (
            <div>
              <p className="text-[#FF0000] text-3xl text-center">
                No Result Found{" "}
              </p>
            </div>
          )}
        </div>
        <Link legacyBehavior prefetch={false} href="/search/">
          <p className="text-center mt-10 mb-10 underline hover:text-primary cursor-pointer font-bold text-[18px]">
            ...view more institutes
          </p>
        </Link>
      </div>
      <div className="bg-[#F4EBFF] bg-no-repeat bg-bottom mt-20">
        <ExamReviews />
      </div>
      {/* <ExamsMentor /> */}
      <div className="mx-auto px-10 mt-20">
        <h1 className=" leading-none font-bold text-2xl lg:text-4xl mb-5">
          CUET Coaching in{" "}
          <span className="text-primary font-bold">{examArea}</span>
        </h1>
        {content?.length > 0 ? (
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        ) : (
          <>
            <p className="lg:text-lg pb-5">
              Since some of the top universities in India will fall under the
              purview of CUET, it will ratchet up the demand for the exam
              drastically.
            </p>
            <p className="lg:text-lg pb-5">
              Therefore, if you are looking for CUET Coaching, look no further
              than (Ostello). (Ostello) is a name synonymous with success in
              aptitude exam preparation and CUET will be no different. Our
              program for CUET coaching is handled by our team of experts and
              experienced faculty members who have spent many years training
              students for various entrance exams.
            </p>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 justify-center content-center gap-10 mt-5">
          {cards.map((item, index) => (
            <div
              key={index}
              className="flex bg-primary flex-col justify-between md:w-[300px] w-full  md:h-[344px] text-white text-start p-5 rounded"
            >
              <div>
                <h4 className="text-white md:text-[22px] font-bold pb-5">
                  <span className="border-b-[2px] border-white">CUET</span>{" "}
                  {item.title}
                </h4>
                <p className="md:text-[15px] md:mt-5">{item.description}</p>
              </div>
              <div className="flex justify-between gap-2 md:mb-[5px] text-[12px]">
                <Link href="#cuet-uni">
                  <p className="bg-white w-full text-black  mt-6 xl:mb-0 py-1.5 px-2 cursor-pointer">
                    View Details
                  </p>
                </Link>
                <Link href="#cuet-program">
                  <p className="bg-primary border border-white text-white w-full  mt-6 xl:mb-0 py-1.5 px-2 cursor-pointer">
                    Enroll Now
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamLocation;
