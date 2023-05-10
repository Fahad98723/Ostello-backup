import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import planImg from "../../../assets/mentor/grad_women.svg";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";
import whoImg from "../../../assets/mentor/whoImg.svg";
import collegeImg from "../../../assets/mentor/college_stu.svg";
import { BsCheckCircleFill } from "react-icons/bs";

const WhoIsOstello = () => {
  const { isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="">
      <div className="w-[433px] md:w-full">
        <AuthModal handleClose={handleClose} open={open} />
        <section className="md:mt-[200px] mt-[100px]">
          <p className="md:text-[33px] text-[25px] font-bold text-black md:text-start md:ml-20 text-center mt-10">
            Who is{" "}
            <span className="text-primary font-bold text-[26px] md:text-[63px]">
              Ostello
            </span>{" "}
            for?
          </p>
          <div className="md:flex justify-center items-center hidden gap-20 bg-primary mt-[100px] md:w-full mb-[200px] md:h-[500px] ">
            <div className="hidden md:block mt-[-80px] md:w-[515px] md:h-[578px]">
              <img className="" src={whoImg.src} alt="" />
            </div>
            <div className="flex flex-col items-center gap-4 md:w-[688px]">
              <button className="px-3 py-2 w-[620px] md:mt-[-50px] bg-[#FFB01F] border-none my-3 text-black active:opacity-80 text-[33px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.3)]">
                High School Students & Parents
              </button>
              <div className="w-[688px]">
                <p className="md:text-[21px] text-white ml-7">
                  Are you a high school student (or an involved parent)? You are
                  a parent of a high schooler, and parents often don’t know how
                  to help their children to pick the right career path. Even
                  they may not be sure what educational degree the high
                  schoolers need to pursue their dream job.
                </p>
                <p className="md:text-[21px] text-white mt-3 ml-7">
                  Our online career management platform is the perfect solution
                </p>
                <p className="md:text-[21px] text-white flex justify-center mt-2 font-bold">
                  <span className="text-[#FFD600] mr-2 mt-1">
                    <BsCheckCircleFill />
                  </span>
                  A Data-driven approach with the goal of guiding you down the
                  road of your dreams.
                </p>
                <p className="md:text-[21px] text-white flex justify-center mt-2 font-bold">
                  <span className="text-[#FFD600] mr-2">
                    <BsCheckCircleFill />
                  </span>
                  We give you all the tools and resources so you can move
                  forward with assurance.
                </p>
              </div>
              <button
                onClick={(e) => {
                  if (!isAuthenticated) {
                    setOpen(true);
                    dispatch(setAuthModalState(4));
                  } else {
                    e.preventDefault();
                  }
                }}
                className="px-5 mx-5 md:py-2 border w-full border-white rounded-md my-3 text-white active:opacity-80 text-[18px]"
              >
                Register Now
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center md:hidden bg-primary mt-20 w-[433px]">
            <div className="flex flex-col items-center gap-4 mt-[-40px] ">
              <button className="py-3 w-full bg-[#FFB01F] border-none my-3 text-black active:opacity-80 text-[21px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.3)] font-bold">
                High School Students & Parents
              </button>
              <div className="w-[381px]">
                <p className="text-[14px] text-white">
                  Are you a high school student (or an involved parent)? You are
                  a parent of a high schooler, and parents often don’t know how
                  to help their children to pick the right career path. Even
                  they may not be sure what educational degree the high
                  schoolers need to pursue their dream job.
                </p>
                <p className="text-[14px] text-white mt-3 ml-7">
                  Our online career management platform is the perfect solution
                </p>
                <p className="text-[14px] text-white flex justify-center mt-2 font-bold">
                  <span className="text-[#FFD600] mr-2 mt-1">
                    <BsCheckCircleFill />
                  </span>
                  A Data-driven approach with the goal of guiding you down the
                  road of your dreams.
                </p>
                <p className="text-[14px] text-white flex justify-center mt-2 font-bold">
                  <span className="text-[#FFD600] mr-2">
                    <BsCheckCircleFill />
                  </span>
                  We give you all the tools and resources so you can move
                  forward with assurance.
                </p>
              </div>
              <button
                onClick={(e) => {
                  if (!isAuthenticated) {
                    setOpen(true);
                    dispatch(setAuthModalState(4));
                  } else {
                    e.preventDefault();
                  }
                }}
                className="px-5 mx-5 py-3 border w-full md:w-2/4 border-white rounded-md my-3 text-white active:opacity-80 text-[18px]"
              >
                Register Now
              </button>
            </div>
            <div className="">
              <img
                className="md:w-[497px] md:h-[541px]"
                src={whoImg.src}
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="mt-20 w-full bg-white md:w-full">
          <div className="flex items-center md:justify-center flex-col md:flex-row gap-20">
            <div className="flex flex-col items-start gap-4 px-5 md:w-[608px]">
              <p className="md:text-[33px] text-[28px] font-bold text-black text-start mt-5">
                For{" "}
                <span className="text-primary font-bold md:text-[63px]">
                  College
                </span>{" "}
                Students
              </p>
              <p className="md:text-[20px] text-[14px]">
                College students are stuck when it comes to evaluating what
                their options are for jobs after graduation. What are the first
                and subsequent jobs available with their education -and what
                career paths do they lead to.
              </p>
              <p className="md:text-[20px] text-[14px] mt-2">
                Our career analytics and management services can help you figure
                out what you want to do with your life. We'll help you find your
                dream path and provide additional resources to get started. So
                why not give us a try? We can help you put your mind at peace
                and figure out what you want to do with your future.
              </p>
              <button
                onClick={(e) => {
                  if (!isAuthenticated) {
                    setOpen(true);
                    dispatch(setAuthModalState(4));
                  } else {
                    e.preventDefault();
                  }
                }}
                className="px-5 py-2 border w-full md:w-3/4 bg-primary rounded-md mt-10 text-white active:opacity-80 text-[18px]"
              >
                Register Now
              </button>
            </div>
            <div className="px-5 md:px-0">
              <img
                className=" md:w-[533px] md:h-[521px] w-[292px] h-[296px] mt-10"
                src={collegeImg.src}
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="mt-20 md:w-full bg-white w-[433px]">
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center md:w-[565px] px-5">
              <p className="text-[33px] mt-5 font-bold">Our Vision</p>
              <p className="md:text-[23px] text-[15px] mt-5 text-center">
                We aim to be THE one-stop career and coaching management
                platform, where young individuals are empowered to take control
                of their career decisions and make informed choices about their
                future
              </p>
              <button
                onClick={(e) => {
                  if (!isAuthenticated) {
                    setOpen(true);
                    dispatch(setAuthModalState(4));
                  } else {
                    e.preventDefault();
                  }
                }}
                className="px-5 mx-5 py-2 border w-full mt-10 md:w-3/4 bg-primary rounded-md my-3 text-white active:opacity-80 text-[18px]"
              >
                Sign up to ostello now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhoIsOstello;
