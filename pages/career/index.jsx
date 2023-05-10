import React, { useEffect, useState } from "react";
import { BiMap, BiTimeFive } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import carousalLeft from "../../assets/career/carousel-arrow-left.png";
import carousalRight from "../../assets/career/carousel-arrow-right.png";
import VisionVector from "../../assets/career/Contents.png";
import star from "../../assets/career/Star.png";
import team2pic from "../../assets/career/team-pic2.png";
import teamPic from "../../assets/career/team_pic.png";
import Footer from "../../components/layout/Footer";
import MetaHelmet from "../../components/MetaHelmet";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
const jobsData = [
  {
    id: "1",
    category: "Business Development",
    jobtype: "Customer Growth Associate",
    workingtime: "Full-time",
    location: "Remote",
  },
  {
    id: "2",
    category: "Content Writing",
    jobtype: "Content Copywriting",
    workingtime: "Full-time",
    location: "Remote",
  },
  {
    id: "3",
    category: "Marketing",
    jobtype: "Digital Marketing",
    workingtime: "Full-time",
    location: "Remote",
  },
  {
    id: "4",
    category: "Management",
    jobtype: "Product Manager",
    workingtime: "Full-time",
    location: "Remote",
  },
  {
    id: "5",
    category: "Research and Development",
    jobtype: "Research and Data Entry",
    workingtime: "Full-time",
    location: "Remote",
  },
  {
    id: "6",
    category: "Technology",
    jobtype: "Software Development Engineer 2",
    workingtime: "Full-time",
    location: "Remote",
  },
];
const jobTypes = [
  {
    title: "View all",
  },
  {
    title: "Business Development",
  },

  {
    title: "Content Writing",
  },
  {
    title: "Management",
  },
  {
    title: "Technology",
  },
  {
    title: "Marketing",
  },
  {
    title: "Research and Development",
  },
];
const stars = [1, 2, 3, 4, 5];

const Careers = ({ meta }) => {
  const [activeTab, setActiveTab] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [selected, setSelected] = useState("View all");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  const handleSelect = (e) => {
    setSelected(e.target.value);
    const res = jobsData.filter((job) => job.category === e.target.value);
    setJobs(res);
    setError("");
  };

  useEffect(() => {
    if (selected === "View all") {
      setActiveTab(true);
      setJobs(jobsData);
    } else {
      const res = jobsData.filter((job) => job.category === selected);
      setJobs(res);
      setActiveTab(true);
    }
  }, [selected]);

  // setLocationWay(locationWa)
  // },[activeTab, topLocationData])
  return (
    <>
      <MetaHelmet
        title={meta.title}
        description={meta.description}
        link={meta.link}
      />
      <div className="fixed w-full bg-white z-50 top-0 shadow">
      <Navbar />
      </div>
      <main className="mt-8">
        <section className=" lg:pl-24 lg:mb-28 p-3 pb-40 flex flex-col-reverse gap-8 lg:flex-row items-center bg-white md:max-w-[1280px] ">
          <div className="2xl:pl-10 lg:mb-0 pl-2 pr-2">
            <div className="flex flex-row items-center md:ml-0">
              {stars.map((item, index) => (
                <img
                  key={index}
                  src={star.src}
                  alt=""
                  className="w-[20px] lg:mt-12 lg:mb-0  "
                />
              ))}
            </div>
            <p className="text-[#101828] text-center md:text-start mt-10 font-bold text-[36px]">
              “I have been welcomed warmly into the team. I love the culture and
              environment here at Ostello and the challenges that have helped me
              to grow professionally”
            </p>
            <div className="flex flex-row justify-between pt-5">
              <div>
                <div>
                  <img
                    src={team2pic.src}
                    alt=""
                    className="w-[50px] pt-6 rounded-full ml-3 border border-gray-100"
                  />
                </div>
              </div>
              <div className="flex flex-row pt-5 items-center gap-3 pr-5">
                <img
                  className="w-[50px] rounded-full border border-gray-100 shadow-4xl cursor-pointer"
                  src={carousalLeft.src}
                  alt=""
                />
                <img
                  className="w-[50px] rounded-full border border-gray-100 shadow-4xl cursor-pointer"
                  src={carousalRight.src}
                  alt=""
                />
              </div>
            </div>
          </div>
          <img
            src={VisionVector.src}
            alt=""
            className="w-full lg:w-2/5 xl:w-2/4 ml-auto mb-10 md:mb-20 lg:mt-12 lg:mb-0  "
          />
        </section>

        <section className="p-3 md:mx-auto md:max-w-[1280px]">
          <h1 className="text-[#101828] text-center font-bold text-[28px] mb-6">
            Our mission is to bring world class passionate professionals
            together to push new boundaries and grow, to make quality education
            accessible to students making their lives easier.
          </h1>
          <p className=" text-center text-[20px] font-bold text-[#667085] lg:text-md md:mb-5">
            This is what unites us at Ostello
          </p>

          <div className="hidden md:block md:w-full">
            <div className="flex flex-row pt-[10px] justify-center items-center gap-[2px] md:max-w-[1280px]">
              {jobTypes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(true);
                    setSelected(item.title);
                  }}
                  className={
                    activeTab &&
                    `active active:bg-[#F9F5FF] active:text-primary` +
                      `ml-3 pl-5 pr-5 text-[#667085] border-transparent  focus:text-primary focus:bg-[#F9F5FF] text-[16px] font-bold rounded-[6px] h-[44px]`
                  }
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          {/* <div className="flex flex-row pt-[10px] pl-[14px] justify-center items-center gap-[8px] w-full"> */}

          <select
            onChange={(e) => handleSelect(e)}
            value={selected}
            className={`my-2 form-select block shadow md:hidden w-full py-2 text-bold font-normal text-slate bg-white border border-[#F9F5FF] rounded-[10px]  first-letter:transition ease-in-out m-0 focus:text-primary focus:bg-[#F9F5FF] focus:border-[#F9F5FF]focus:outline-none`}
          >
            {jobTypes?.map((item, idx) => {
              return (
                <option
                  key={idx}
                  className="w-full text-black rounded-[10px] cursor-pointer"
                >
                  {item.title}
                </option>
              );
            })}
          </select>
          {/* </div> */}
          <div className="flex flex-col mx-auto justify-center md:max-w-[768px] mt-10">
            {jobs?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="rounded-[10px] mb-10 p-5 shadow w-full bg-white"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-[14px] text-primary">
                        {item?.category}
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        typeof window !== "undefined" &&
                        (window.location =
                          "https://docs.google.com/forms/d/19hTepuqZqoNBO470OgMJvll6TLjEY2p81n6VSRqitRA/edit")
                      }
                      className="flex items-center space-x-3"
                    >
                      <button className="text-primary py-1 text-[16px] font-bold">
                        View Jobs
                      </button>
                      <p className="text-[16px] font-bolder text-primary">
                        <span>
                          <BsArrowUpRight />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 mb-5">
                    <div className="mb-3 text-[18px] font-bold">
                      {item?.jobtype}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-slate-500">
                        <div className="flex space-x-4 md:space-x-8 pt-5">
                          <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-1 text-[#667085] text-[16px]">
                            <p>
                              <span>
                                <BiMap />
                              </span>
                            </p>
                            <span>{item?.location}</span>
                          </div>
                          <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-1 text-[#667085] text-[16px]">
                            <p>
                              <span>
                                <BiTimeFive />
                              </span>
                            </p>
                            <span>{item?.workingtime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="pl-5 md:ml-5 pb-3 mb-5 ml-3 mr-3 md:max-w-[1280px] shadow-md rounded-[10px] text-[#414141] pt-5 bg-[#F9FAFB] mx-auto lg:space-x-5 xl:mx-auto md:mx-10">
          <p className="mt-3 text-primary font-bold text-center pt-5">
            From our team
          </p>
          <h1 className=" leading-[36px] text-[36px] text-center pt-5 pr-5 text-[#101828] font-bold">
            I have been able to maintain a work life balance while my time here
            at Ostello. As they say, work hard and play harder!
          </h1>
          <div className="text-center font-bold grid  mt-5 place-items-center">
            <img
              src={teamPic.src}
              alt=""
              className="w-[50px] object-center rounded-full border border-gray-100 shadow-sm"
            />
            <h2 className="text-[16px] pt-2 text-[#101828]">
              Rajbir Singh Rajpal
            </h2>
            <p className="text-[14px] text-[#667085] lg:text-md md:mb-10">
              C.E.O Ostello India Pvt. Limited
            </p>
          </div>
        </section>
        <section className="bg-[#53389E] shadow pb-5 md:max-w-[1280px] ml-3 mr-3 md:mx-auto rounded-[10px] pt-6 px-6 lg:pt-16 ">
          <div className="md:max-w-[1200px]">
            <div className="md:flex justify-between">
              <div className="text-white">
                <p className="text-[30px] font-semibol text-center">
                  Be the first to know about open roles
                </p>
                <p className="text-[20px] text-center">
                  Stay in the loop with everything you need to know.
                </p>
              </div>

              <div className="my-3 h-[140px] pb-5">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-4 px-2 join w-full md:w-80 my-1 border-1 border-[#D0D5DD] outline-none mx-auto md:mr-2 rounded-xl"
                />
                <button className="px-6 mt-2 shadow-md rounded-[10px] w-full h-[48px] md:w-[120px] bg-primary">
                  <p className="font-medium text-base text-white">Subscribe</p>
                </button>
                <p className="text-white text-[14px]">
                  We care about your data in our{" "}
                  <span className="underline">privacy policy</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#F4EBFF] px-6 mt-10 py-10 lg:pt-16 ">
          <div className="md:max-w-[1200px]">
            <div className="md:flex justify-between">
              <div className="">
                <p className="text-xl font-semibold">Join our newsletter</p>
                <p className="text-base">
                  We’ll send you a nice letter once per week. No spam.
                </p>
              </div>

              <div className="my-3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-4 px-2 join w-full md:w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl"
                />
                <button className="px-6 w-full md:w-[120px] py-3 shadow-md my-1 rounded-lg bg-primary">
                  <p className="font-medium text-base text-white">Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Careers;

export const getStaticProps = async () => {
  const meta = {
    title: "Career - ostello.co.in",
    description:
      "Let's revolutionize the Edu tech field together. Come join us and become a part of world's first marketplace for coaching institutes",
    link: "https://www.ostello.co.in/career",
  };

  return {
    props: {
      meta,
    },
  };
};
