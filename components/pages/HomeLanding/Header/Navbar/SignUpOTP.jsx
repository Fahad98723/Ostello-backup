import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { TiWarningOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { setAuthModalState } from "../../../../../redux/slices/authSlice";
import { host } from "../../../../../utils/constant";
import { VioletParagrapgh } from "../../../../auth/student/sub-components/layout";
import { phoneNumberToNumber } from "../../../../utils";
const OTPInput = dynamic(
  () => {
    return import("otp-input-react");
  },
  { ssr: false }
);
const ResendOTP = dynamic(
  () => {
    return import("otp-input-react");
  },
  { ssr: false }
);

export default function SignUpOTP({ handleClose, mobilenumber, handleActive }) {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSec, setOtpSec] = useState(30);
  const [otpSentOnce, setOtpSentOnce] = useState(true);
  const [otpSent, setOtpSent] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer = null;
    if (otpSent) {
      timer = setTimeout(() => {
        setOtpSec((s) => s - 1);
        if (otpSec <= 1) {
          setOtpSent(true);
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  });
  const handleOTPSend = (e) => {
    e.preventDefault();
    setOtpSent(true);
    setOtpSec(30);
    axios({
      method: "get",
      url: `${host}/auth/otp/resend`,
      params: {
        phonenumber: phoneNumberToNumber(mobilenumber),
        retrytype: "string",
      },
    })
      .then((res) => {
        res && setOtpSentOnce(true);
      })
      .catch((err) => {});
  };
  const handleVerify = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: `${host}/auth/otp/verify`,
      params: {
        phonenumber: mobilenumber,
        otp: OTP,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.data.error) {
          setError(`Oops..wrong OTP, try again`);
        } else {
          handleActive("completedetails");
          setOtpSent(false);
          dispatch(setAuthModalState(7));
        }
      })
      .catch((err) => {});
  };
  return (
    <div className=" rounded-[10px] md:w-[370px] w-[300px]">
      <div className="flex text-white rounded-t-[5px] bg-primary h-[80px] justify-center items-center">
        <div className="text-center flex flex-col w-full">
          <div className="flex justify-between items-center mt-3">
            <LeftOutlined
              onClick={() => {
                dispatch(setAuthModalState(5));
              }}
              className="pl-3 text-[14px] font-bold"
            />
            <span className="text-[18px] font-bold">Sign Up</span>
            <p
              className="cursor-pointer text-[16px] font-bold pr-3"
              onClick={handleClose}
            >
              x
            </p>
          </div>
          <p className="text-[12px] pr-3 pl-3 ">
            You’re just one step away from signing up
          </p>
          <p className="text-[13px] pr-3 pl-3 pb-5 font-bold">
            Sign up and get Cashback!
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center bg-white pt-5 w-full">
        <h2 className="text-[#333232] font-bold text-center">
          OTP Verification
        </h2>
        <p className="text-[#333232] text-center mt-5">
          We have sent you an OTP on your mobile number XXXXXXXX
          {mobilenumber.slice(-4)}
        </p>
        <div className="flex justify-between items-center space-x-2 py-4 px-4 text-xl sm:max-w-[375px]">
          <OTPInput
            inputClassName="border-2 border-[#DFCBFB] text-[24px] md:text-[48px] md:w-[60px] md:h-[60px] rounded text-primary font-bold"
            className="items-center m-auto "
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={4}
            otpType="number"
            disabled={false}
          />
        </div>
        <div className="flex justify-center items-center font-dm-sans mb-5">
          <span style={{ color: "#F2747F" }}>
            {error ? <TiWarningOutline /> : ""}
          </span>
          <span style={{ color: "#F2747F" }}>{error}</span>
        </div>

        <VioletParagrapgh
          onClick={() => {
            dispatch(setAuthModalState(5));
            handleActive("changenumber");
          }}
          content="Change mobile number?"
        />
        <div className="flex flex-row items-center w-full">
          <button
            onClick={(e) => {
              handleVerify(e);
            }}
            className="font-lg w-full ml-3 mr-3 px-2 py-2 mt-5 text-white bg-primary border border-[#D0D5DD] rounded-[10px] active:opacity-75"
          >
            Verify OTP
          </button>
        </div>
        {otpSent && otpSec < 1 && (
          <button
            onClick={(e) => handleOTPSend(e)}
            className={`  w-full lg:py-2 m-auto py-1 pb-3 text-base flex justify-center items-center lg:space-x-2  `}
          >
            <p>Didn’t receive the OTP?</p>
            <p className=" font-bold text-primary">Click to resend</p>
          </button>
        )}

        {otpSec !== 30 && otpSec !== 0 && otpSec > 0 && (
          <p className="text-gray text-sm flex justify-center items-center mt-3  m-auto mb-3">
            Resend OTP in <span className="font-medium pl-2"> {otpSec}</span>s
          </p>
        )}
        <ResendOTP
          className="mb-5 border-primary text-primary"
          renderTime={renderTime}
          renderButton={renderButton}
          onResendClick={() => {}}
        />
      </div>
    </div>
  );
}
const renderButton = (buttonProps) => {
  return (
    <button {...buttonProps}>
      {buttonProps.remainingTime !== 0
        ? `Resend OTP in ${buttonProps.remainingTime}`
        : "Resend OTP"}
    </button>
  );
};

const renderTime = (remainingTime) => {
  return <span className="">{remainingTime} seconds remaining</span>;
};
