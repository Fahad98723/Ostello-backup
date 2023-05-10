import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import college from "../../assets/mentor/college.svg";
import high from "../../assets/mentor/high.svg";
import searchIcon from "../../assets/mentor/icon_search.svg";
import bg_men1 from "../../assets/mentor/men_bg1.svg";
import topwomen from "../../assets/mentor/topwomen.png";
import prof from "../../assets/mentor/prof.svg";
import top_bg from "../../assets/mentor/top_bg.svg";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import AuthModal from "../../components/pages/HomeLanding/Header/Navbar/AuthModal";
import OstelloFAQ from "../../components/pages/HomeLanding/OstelloFAQ";
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import BestMentors from "../../components/pages/Mentor/BestMentors";
import DownloadApp from "../../components/pages/Mentor/DownloadApp";
import Feedback from "../../components/pages/Mentor/Feedback";
import MentorPlan from "../../components/pages/Mentor/MentorPlan";
import OstelloHelp from "../../components/pages/Mentor/OstelloHelp";
import OstelloLeader from "../../components/pages/Mentor/OstelloLeader";
import WhoIsOstello from "../../components/pages/Mentor/WhoIsOstello";
import { authSelector } from "../../redux/slices/authSlice";
import { useRouter } from "next/router";
import Image from "next/image";

const hoverStyle = {
  content: "",
  display: "block",
  position: "absolute",
  height: " 0%",
  width: "100%",
  bottom: "0",
  transition: "height 0.5s ease-out",
  background:
    "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
};
const Mentor = () => {
  const { isAuthenticated } = useSelector(authSelector);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <section className="">
      <AuthModal handleClose={handleClose} open={open} />
      {/* <MetaHelmet
        title="CUET Exam Preparation Coaching Institutes | Delhi | Uttar Pradesh | Haryana | Ostello"
        description="CUET Exam preparation Coaching Institutes in Delhi, Haryana, Faridabad, Uttar Pradesh at Ostello. Get best CUET Coaching Centres/Classes at Ostello."
        link="https://www.ostello.co.in/exams/cuet"
      /> */}
      <div className="md:max-w-[1350px] mx-auto ">
        <div className="fixed top-0 z-50 bg-white w-full md:max-w-[1350px] mx-auto  shadow">
          <Navbar text={"text-[#667085]"} />
        </div>
      </div>
      <div className="w-[433px] md:w-full md:h-[680px] h-[897px] flex items-center justify-center bg-gradient-to-r from-[#7D23E0] to-[#FF9A3C] bg-cover py-10 px-5">
        <div className="md:max-w-[1350px] mx-auto ">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-center md:w-[1180px] border border-white mt-[50px]">
            <div
              style={{ backgroundImage: `url(${top_bg.src})` }}
              className="flex flex-col md:w-[680px] h-[451px] md:top-[191px] md:left-[130px] py-20 px-10"
            >
              <div className="flex flex-col md:items-start items-center md:text-start text-center">
                <p className="md:text-[34px] font-bold text-black text-[24px]">
                  INDIA’s First{" "}
                  <span className="text-primary font-bold">REAL-TIME</span>{" "}
                  Career Management Platform
                </p>
                <p className="text-[17px] md:border-l-4 md:pl-2 md:w-[353px] md:border-black my-5 text-black">
                  From <span className=" font-bold ">Exam Selection</span> to{" "}
                  <span className=" font-bold ">Career Selection</span> And,
                  Everything in Between
                </p>
                <button
                  onClick={() => {
                    // changeHandle();
                    if (!isAuthenticated) {
                      router.push("/ostello-login/");
                    }
                  }}
                  className="px-5 py-2 border w-5/6 md:w-2/4  border-black rounded-md my-3 hover:bg-primary hover:text-white text-black active:opacity-80 md:text-[18px] text-[14px]"
                >
                  Create your Career Journey
                </button>
              </div>
            </div>
            <div className="md:w-[636px] md:h-[424px] md:mt-6 mt-[-70px]">
              <Image
                width="0"
                height="0"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                className="w-full h-full"
                src={topwomen.src}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <OstelloLeader />
      </div>
      <div className="mt-[120px] w-[433px] px-3  items-center md:w-full">
        <p className="text-center text-[#1B1B1B] md:px-0 px-10  md:text-[33px] text-[25px] mt-5 mb-5">
          Search for the{" "}
          <span className="font-bold md:text-[50px]">Best Mentor</span> near
          you!
        </p>
        <div className="flex justify-center items-center">
          <form
            // onSubmit={() => {
            //   dispatch(setSearchQuery(searchField));
            //   router.push(`/search`);
            // }}
            // ref={domNode}
            // style={style}
            className="flex items-center flex-row"
          >
            <input
              // onClick={() => setSearchShow(true)}
              className="md:w-[487px] w-[284px] mx-auto md:h-[72px] h-[42px] px-5 md:text-[20px] search md:placeholder:text-[16px] placeholder:text-[12px] z-10 rounded-[1000px]  drop-shadow-2xl text-[14px]"
              type="search"
              // onChange={handleChange}
              // defaultValue={search?.name || ""}
              placeholder={"Search for your mentor..."}
            />
            <img
              src={searchIcon.src}
              alt=""
              className="md:w-[72px] md:h-[72px] z-50  w-[42px] h-[42px] rounded-full outline-none cursor-pointer md:ml-[-70px] ml-[-40px]"
            />
            {/* {searchShow && (
        <Scroll
          style={{
            height: "30vh",
            boxShadow: "0px 4px 15px rgba(125, 35, 224, 0.2)",
          }}
          className="overflow-y-scroll "
        >
          {filteredItems.length > 0 ? (
            <>
              {filteredItems.map((item, index) => (
                <Card key={index} currentValue={item} />
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              No matched Courses or Institutions
            </div>
          )}
        </Scroll>
      )} */}
          </form>
        </div>
      </div>
      <div className="md:max-w-[1350px] mx-auto ">
        <BestMentors />
      </div>
      <MentorPlan />
      <div className="flex flex-col items-center mt-20 w-[433px] md:w-full">
        <p className="md:text-[33px] text-[25px] font-bold text-black text-center mt-5">
          Let Us Know{" "}
          <span className="text-primary font-bold md:text-[43px] text-[26px]">
            Who you are?
          </span>
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 items-center mt-20">
          <div className="flex flex-col items-center">
            <div className="w-full">
              <div
                className="w-[377px] h-[394px] relative  group"
                style={{ backgroundImage: `url(${high.src})` }}
              >
                <div style={hoverStyle} className="group-hover:h-full"></div>
              </div>
              <div className="flex-col  text-center font-bold mt-5">
                <p className="text-black md:text-[30px] text-[20px] font-bold">
                  High-School Student
                </p>
                <p className="text-[#2AA5FE] md:text-[26px] text-[16px]">
                  (or an involved parent)
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full">
              <div
                className="w-[377px] h-[394px] relative  group"
                style={{ backgroundImage: `url(${college.src})` }}
              >
                <div style={hoverStyle} className="group-hover:h-full"></div>
              </div>
              <div className="flex-col  text-center font-bold mt-5">
                <p className="text-black md:text-[30px] text-[20px] font-bold">
                  A College Student?
                </p>
                <p className="text-[#2AA5FE] md:text-[26px] text-[16px]">
                  (pretty overwhelmed)
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full">
              <div
                className="w-[377px] h-[394px] relative  group"
                style={{ backgroundImage: `url(${prof.src})` }}
              >
                <div style={hoverStyle} className="group-hover:h-full"></div>
              </div>
              <div className="flex-col  text-center font-bold mt-5">
                <p className="text-black md:text-[30px] text-[20px] font-bold">
                  A Professional?
                </p>
                <p className="text-[#2AA5FE] md:text-[26px] text-[16px]">
                  (looking for career guide)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhoIsOstello />
      <OstelloHelp />
      <div className="mt-20">
        <Feedback />
      </div>
      <div className="md:w-full  w-[433px]">
        <DownloadApp />
      </div>
      <div className="mt-10 md:max-w-[1350px] mx-auto  md:w-full w-[433px]">
        <OstelloFAQ usingFor={"mentorPage"} />
        <OstelloSubscribe />
        <Footer />
      </div>
    </section>
  );
};

export default Mentor;
