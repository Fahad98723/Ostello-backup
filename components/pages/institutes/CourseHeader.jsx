import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import emiIcon from '../../../assets/images/icons/emi.png';
import modeIcon from '../../../assets/images/icons/mode_violet.svg';
import time from '../../../assets/images/icons/time.png';
import { authSelector, setAuthModalState } from "../../../redux/slices/authSlice";
import { selectOrder } from "../../../redux/slices/orderSlice";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";
const CourseHeader = ({recentCourse,handleModalOpen,reviewed,purchased, emiPrice, effPrice, priceRef}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();
  const {isAuthenticated } = useSelector(authSelector)
  const { getOrder} = useSelector(selectOrder)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

    const modeToType = (classtype, isLowerCase = false) => {
        if (classtype === 2) {
          return isLowerCase ? 'online' : 'Online'
        } else if (classtype === 3) {
          return isLowerCase ? 'offline' : 'Offline'
        } else if (classtype === 1) {
          return isLowerCase ? 'hybrid' : 'Hybrid'
        }
       
      }
    
      const course_url = typeof window !== 'undefined' && window.location.href
    return (
      <>
        <section className=' xl:max-w-[1100px]   flex justify-evenly text-[#414141]  p-10 md:p-5 rounded-3xl lg:flex-row flex-col  bg-white border-[#475467] border-2 mx-5   lg:space-x-5    xl:mx-auto md:mx-10'>
         
        <div className=' px-2 py-1 flex flex-col items-center font-medium justify-center  '>
          <p className='text-[18px] font-extrabold  mb-3'>
          {priceRef === "monthly" ? '1 Month' : `${recentCourse?.duration.split(',')[0]} ${recentCourse?.duration.split(',')[1]}`}  
          </p>
          <div className='flex items-center space-x-1'>
            <img className='w-4' src={time.src} alt='' />
            <p className='text-sm '>Duration</p>
          </div>
        </div>

        <div className=' lg:hidden border-2 my-3 border-[#7A81DC] lg:border-none border-dashed border-t-0 border-l-0 border-r-0  h-2 w-[100%] ' />

        <div className='px-2 py-1 flex flex-col items-center text-center font-medium   justify-center '>
       <div className="px-2 py-1 flex flex-col items-center text-center font-medium   justify-center ">
                    {/* <p className="text-[18px] font-bold  mb-3">
                            Authorized Certificate
                    </p>
                    <div className="flex items-center space-x-1">
                        <img className="w-6" src={badge.src} alt="" />
                        <p className="text-sm  ">Get Certified</p>
                    </div> */}

{ recentCourse?.category?.name === 'Academics' ? <div className="px-2 py-1 flex font-medium flex-col items-center   justify-center">
                    <p className="text-[18px] font-extrabold mb-3">
                        {recentCourse?.category?.classes.join(",")}
                    </p>
                    <div className="flex items-center space-x-1">
                        <img className="w-4" src={modeIcon.src} alt="" />
                        <p className="text-sm  ">Academics</p>
                    </div>
                    </div> : 
                    <div className="px-2 py-1 flex flex-col items-center text-center font-medium   justify-center ">
                    <p className="text-xl xl:text-2xl font-extrabold  mb-3">
                        {modeToType(recentCourse?.classtype)} Course
                    </p>
                    <div className="flex items-center space-x-1">
                        <img className="w-4" src={modeIcon.src} alt="" />
                        <p className="text-sm  ">Mode</p>
                    </div>
                    </div>
                }
                    </div> 
        </div>

        <div className=' lg:hidden border-2 my-3 border-[#7A81DC] lg:border-none border-dashed border-t-0 border-l-0 border-r-0  h-2 w-[100%] ' />

        <div className='px-2 py-1 flex font-medium flex-col items-center   justify-center '>
          <p className='text-[18px] font-extrabold  mb-3'>
            Rs.{emiPrice ||  0}
            {/* /month */}
          </p>
          <div className='flex items-center space-x-1'>
            <img className='w-4' src={emiIcon.src} alt='' />
            <p className='text-sm '>EMI Options</p>
          </div>

          <div className=' lg:hidden border-2 my-3 border-[#7A81DC] lg:border-none border-dashed border-t-0 border-l-0 border-r-0  h-2 w-[100%]  ' />
        </div>
        <div className='px-2 py-1 flex font-medium flex-col items-center   justify-center '>
          <p className='text-[18px] font-extrabold  mb-3'>
          Rs. {effPrice}
            {/* /month */}
          </p>
          <div className='flex items-center space-x-1'>
            <img className='w-4' src={emiIcon.src} alt='' />
            <p className='text-sm '>Annual Fee</p>
          </div>

          <div className=' lg:hidden border-2 my-3 border-[#7A81DC] lg:border-none border-dashed border-t-0 border-l-0 border-r-0  h-2 w-[100%]  ' />
        </div>

        <div className='flex flex-col justify-center mt-5'>
        {reviewed ? (
                    <button
                    onClick={async (e) => {
                      handleModalOpen();
                    }}
                    className=' px-5 py-2 bg-black rounded-md mb-3 text-white active:opacity-80 text-[18px] '
                  >
                    Reviewed
                  </button>
                  ) : purchased ? (
                    <button
                    // onClick={async (e) => {
                    //   if (!isAuthenticated) {
                    //     setOpen(true)
                    //     dispatch(setAuthModalState(1))
                    //   } else {
                    //     handlePayment(e)
                    //   }
                    // }}
                    className=' px-5 py-2 bg-primary rounded-md mb-3 text-white active:opacity-80 text-[18px] '
                  >
                    Enrolled
                  </button>
                  ) : (
                    <button
                    onClick={async (e) => {
                      if (!isAuthenticated) {
                        setOpen(true)
                        dispatch(setAuthModalState(2))
                      } else {
                        // handlePayment(e)
                        handleModalOpen()
                      }
                    }}
                    className=' px-5 py-2 bg-black rounded-md mb-3 text-white active:opacity-80 text-[18px] '
                  >
                    Reserve
                  </button>
                  )}
          <div className='text-sm text-center flex md-block justify-center space-x-2  w-3/4 mx-auto'>
            <p>
              <sup>*</sup>{recentCourse?.moneybackguaranteedate || '0-Day'} Money-Back Guarantee
            </p>
          </div>
        </div>

        
      </section>
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      </>
    );
};

export default CourseHeader;