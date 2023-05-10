import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import planImg from "../../../assets/mentor/grad_women.svg";
import { authSelector, setAuthModalState } from '../../../redux/slices/authSlice';
import AuthModal from '../HomeLanding/Header/Navbar/AuthModal';


const MentorPlan = () => {
  const {
    isAuthenticated,
  } = useSelector(authSelector);
  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <section className="mt-[20px] bg-gradient-to-r from-[#7C46FF] to-[#FF449B] md:w-full md:h-[520px] h-[663px] w-[433px]">
      <AuthModal handleClose={handleClose} open={open} />
      <div className="md:flex justify-center hidden">
        <div className="md:w-[407px] md:h-[553px] mt-[-20px] ml-[-100px]" style={{ backgroundImage: `url(${planImg.src})`, overflow:"hidden", background:"cover"}}>
        </div>
        <div className="flex flex-col justify-center items-start gap-2 mr-20">
        <button
          className="w-[272px] bg-white border-none my-3 text-black active:opacity-80 text-[22px] rounded-[3px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.4)]"
        >
          High School Student
        </button>
        <button
          className="w-[298px] bg-white border-none my-3 text-black active:opacity-80 text-[22px] rounded-[3px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.4)]"
        >
          Intermediate Students
        </button>
        <button
          className="w-[272px] bg-white border-none my-3 text-black active:opacity-80 text-[22px] rounded-[3px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.4)]"
        >
          College Students
        </button>
        </div>
        <div className="md:flex items-center justify-center hidden gap-5 py-5">
        <div className="flex flex-col justify-center items-start md:w-[482px]">
            <p className="md:text-[34px] font-bold text-white ml-3 w-full">
            Own your Career with Ostello
            </p>
            <p className="md:text-[16px] mx-5 flex-wrap my-3 text-white">Introducing Career Management for the Future : We strive to create a career that best suits you, by offering real-time mentor connectivity and with the help of our dynamic analytics which connects you to peers having similar career journeys and help you make informed decisions about your future.</p>
            <p className="md:text-[16px] mx-5 flex-wrap my-3 text-white">Career Our platform will help you map out your options and find the best path for you. The online marketplace include coaching institutes nearby, connect with mentor in 100 seconds, Ready to take control of your career?.</p>
            <button
          onClick={(e) => {
            if(!isAuthenticated){
              setOpen(true);
            dispatch(setAuthModalState(4));
            }
            else{
              e.preventDefault();
            }
          }}
          className="px-5 mx-5 md:py-2 border w-3/4 border-white rounded-md my-3 text-white active:opacity-80 text-[18px] hover:bg-white hover:text-black"
        >
          Register Ostello Student profile
        </button>
            </div>
      </div>
      </div>
      <div className="flex flex-col items-center md:hidden py-5 px-2">
      <div className="flex flex-col justify-center items-center">
            <p className="text-[25px] font-bold  text-white w-full whitespace-nowrap">
            Own your Career  with Ostello
            </p>
            <p className="text-[16px] flex-wrap text-white mt-3 px-3">Introducing Career Management for the Future : We strive to create a career that best suits you, by offering real-time mentor connectivity and with the help of our dynamic analytics which connects you to peers having similar career journeys and help you make informed decisions about your future.</p>
            <p className="text-[16px] flex-wrap text-white mt-3 px-3">Introducing Career Our platform will help you map out your options and find the best path for you. The online marketplace include coaching institutes nearby, connect with mentor in 100 seconds, Ready to take control of your career?</p>
            </div>
            <div className="flex justify-center items-center absolute left-5 mt-[350px]">
        <img
              className="w-[392px] h-[298px] ml-[-30px] absolute left-5 mt-[80px]"
              src={planImg.src}
              alt=""
            />
        <div className="flex flex-col justify-center items-start gap-2 w-[190px]  ml-[200px] mt-5">
        <button
          className="px-3 py-2 w-[174px] bg-white border-none my-3 text-black active:opacity-80 text-[12px] rounded-[3px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.4)]"
        >
          High School Student
        </button>
        <button
          className="px-3 py-2 w-[188px] bg-white border-none my-3 text-black active:opacity-80 text-[12px] rounded-[3px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.4)]"
        >
          Intermediate Students
        </button>
        <button
          className="px-3 py-2 w-[156px] bg-white border-none my-3 text-black active:opacity-80 text-[12px] rounded-[3px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.4)]"
        >
          College Students
        </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default MentorPlan;