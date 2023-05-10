import React from 'react'
import google from '../../../../../assets/contact-us/google.svg'
import { useDispatch } from 'react-redux'
import { setAuthModalState } from '../../../../../redux/slices/authSlice'
export default function SignUpDefault({ handleClose,handleGoogleSignIn}) {
  const dispatch = useDispatch()
  return (
    <div className='  rounded-[10px] md:w-[370px] w-[300px]'>
                <div className='flex text-white rounded-t-[5px] bg-primary h-[80px] justify-center items-center'>
                  <div
                   className='text-center flex flex-col w-full'>
                    <div className="flex justify-between items-center mt-3">
                      <span></span>
                    <span className="text-[18px] font-bold">Join Ostello</span>
                    <p
                    className='cursor-pointer text-[16px] font-bold pr-3'
                    onClick={handleClose}
                    >x</p>
                    </div>
                    <p className="text-[12px] pr-3 pl-3 ">You’re just one step away from signing up</p>
                    <p className="text-[13px] pr-3 pl-3 pb-5 font-bold">
            Sign up and get Cashback!
          </p>
                  </div>
                </div>
                <div className="bg-white pt-5 rounded-b-[10px]">
                <div className="flex flex-row items-center ">
                <button
                    onClick={() => {
                        dispatch(setAuthModalState(5))
                    }}
                    className='font-lg w-full ml-3 mr-3 px-2 py-2 text-[#333232] bg-white border border-[#D0D5DD] rounded-[10px] active:opacity-75'
                  >
                    SIGN UP WITH MOBILE  NUMBER
                  </button>
                </div>
                <p className="text-[#333232] text-center mt-5">Have an account? <span onClick={() => {
                        dispatch(setAuthModalState(1))
                    }} className='text-primary cursor-pointer mr-3'>LOG IN</span></p>
                <div className="relative flex p-5 items-center">
                  <div className="flex-grow border-t border-[#D0D5DD]"></div>
                  <span className="flex-shrink mx-4 text-[#333232]">or</span>
                  <div className="flex-grow border-t border-[#D0D5DD]"></div>
              </div>
                    <div className="flex flex-row items-center pb-5">
                    <button
                    onClick={(e)=>{
                      e.preventDefault()
                      handleGoogleSignIn()
                    }
                     }
                    className='font-lg w-full ml-3 mr-3 px-2 py-2 text-[#333232] bg-white border border-[#D0D5DD] flex justify-start rounded-[10px] active:opacity-75'
                  >
                    <span className="text-left"><img className='w-[20px] mr-10' src={google.src} alt=''/></span><span className="ml-[80px]">GOOGLE</span>
                  </button>
                </div>
                </div>
                </div>
  )
}
