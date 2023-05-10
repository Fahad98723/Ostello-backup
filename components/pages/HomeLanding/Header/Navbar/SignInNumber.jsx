import React, { useRef, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-number-input";
import google from "../../../../../assets/contact-us/google.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../../../../../utils/constant";
import { phoneNumberToNumber } from "../../../../../utils/utils";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuthModalState } from "../../../../../redux/slices/authSlice";
export default function SignInNumber({
  handleClose,
  handleActive,
  handleNumber,
  loading,
  handleLoading,
  handleGoogleSignIn,
}) {
  const [value, setValue] = useState("+91");
  const mobileNumRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className=" rounded-[10px] md:w-[370px] w-[300px]">
      <div className="flex text-white rounded-t-[5px] bg-primary h-[80px] justify-center items-center">
        <div className="text-center flex flex-col w-full">
          <div className="flex justify-around mt-3">
            {/* <LeftOutlined
              onClick={() => {
                dispatch(setAuthModalState(1));
              }}
              className="pl-3 text-[14px] font-bold"
            /> */}
            <span className="text-[18px] pl-3 font-bold"></span>
            <span className="text-[18px] pl-3 font-bold ml-20">Sign In</span>
            <p
              className="cursor-pointer text-[16px] font-bold ml-[100px]"
              onClick={handleClose}
            >
              x
            </p>
          </div>
          <p className="text-[12px] pr-3 pl-3">
            You’re just one step away from signing in
          </p>
          <p className="text-[13px] pr-3 pl-3 pb-5 font-bold">
            Sign up and get Cashback!
          </p>
        </div>
      </div>
      <div className="bg-white pt-5 rounded-b-[10px]">
        <div className="flex flex-col gap-4 p-3 items-center ">
          <div className="h-10 px-4 border-b border-[#D0D5DD] lg:w-5/5 flex items-center text-lg w-full">
            <PhoneInput
              className="w-10"
              placeholder="Enter your mobile number"
              defaultCountry="IN"
              value={value}
              onChange={setValue}
              international
            />
            <p className="py-2">{value}</p>
            <p className="px-2 text-3xl text-gray">|</p>
            <input
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              ref={mobileNumRef}
              type="text"
              className="form-control
          block
          w-full
          py-1.5
          text-lg
          font-normal
          text-gray-700
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
              placeholder="Mobile No."
            />
          </div>
          <button
            onClick={() => {
              handleNumber(mobileNumRef.current.value);
              axios
                .get(
                  `${host}/users?phonenumber=${phoneNumberToNumber(
                    mobileNumRef.current.value
                  )}`
                )
                .then(async (res) => {
                  if (res.data.message.usertype !== 3) {
                    toast.error("You are not student. Login with this page !");
                    handleClose();
                    return router.push("/merchant/login");
                  }
                  axios({
                    method: "get",
                    url: `${host}/auth/otp/generate`,
                    params: {
                      phonenumber: phoneNumberToNumber(
                        mobileNumRef.current.value
                      ),
                      // email: emailRef.current.value,
                    },
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                    },
                  }).then(() => {
                    handleActive("otp");
                    dispatch(setAuthModalState(3));
                  });
                })
                .catch((err) => {
                  // axios({
                  //   method: "get",
                  //   url: `${host}/auth/otp/generate`,
                  //   params: {
                  //     phonenumber: phoneNumberToNumber(
                  //       mobileNumRef.current.value
                  //     ),
                  //     // email: emailRef.current.value,
                  //   },
                  //   headers: {
                  //     "Access-Control-Allow-Origin": "*",
                  //   },
                  // }).then(() => {
                  //   handleActive("otp");
                  //   dispatch(setAuthModalState(3));
                  // });
                  dispatch(setAuthModalState(7));
                });
            }}
            className="font-lg w-full ml-3 mr-3 px-2 py-2 text-white bg-primary border border-[#D0D5DD] rounded-[10px] active:opacity-75"
          >
            Continue
          </button>
        </div>
        {/* <p className="text-[#333232] text-center mt-5">New to Ostello? <span className='text-primary cursor-pointer' onClick={() => {
                        dispatch(setAuthModalState(4))
                    }}>SIGN UP</span></p>
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
                    <span className="text-left"><img className='w-[20px] md:mr-10' src={google.src} alt=''/></span><span className="ml-[80px]">GOOGLE</span>
                  </button>
                </div> */}
      </div>
    </div>
  );
}
