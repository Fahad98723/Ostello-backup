import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TiWarningOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccessToken,
  addRefreshToken,
  addUserData,
  setAuthModalState,
} from "../redux/slices/authSlice";
import {
  addRegisterData,
  removeRegisterData,
  selectSignUp,
} from "../redux/slices/signUpSlice";
import { ACCESS_TOKEN, host } from "../utils/constant";
import { phoneNumberToNumber } from "../utils/utils";

import { VioletParagrapgh } from "./auth/student/sub-components/layout";
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
export default function VideoPlayerOtp({ handleClose, mobilenumber }) {
  const [OTP, setOTP] = useState("");
  const [otpSec, setOtpSec] = useState(30);
  const [otpSent, setOtpSent] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  mobilenumber = mobilenumber?.toString();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [otpSentOnce, setOtpSentOnce] = useState(false);
  const { registerData } = useSelector(selectSignUp);
  useEffect(() => {
    let timer = null;
    if (otpSent || otpSentOnce) {
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
        phonenumber:
          phoneNumberToNumber(mobilenumber) || registerData?.phonenumber,
        retrytype: "string",
      },
    })
      .then((res) => {
        res && setOtpSentOnce(true);
      })
      .catch((err) => {});
  };

  const [otpError, setOtpError] = useState(false);

  return (
    <div className=" bg-white rounded-[10px] md:w-[370px] w-[250px]">
      <div className="flex text-white rounded-t-[5px] bg-primary h-[80px] justify-center items-center">
        <div className="text-center flex flex-col w-full">
          <div className="flex justify-between items-center mt-3">
            <LeftOutlined
              onClick={() => dispatch(setAuthModalState(2))}
              className="pl-3 text-[14px] font-bold"
            />
            <span className="md:text-[18px] text-[15px] font-bold">Verify</span>
            <p
              className="cursor-pointer text-[16px] font-bold pr-5"
              onClick={() => {
                handleClose();
                dispatch(removeRegisterData());
              }}
            >
              x
            </p>
          </div>
          <p className="md:text-[12px] text-[10px] pr-3 pl-3 ">
            You’re just one step away from signing in
          </p>
          <p className="md:text-[13px] text-[12px] pr-3 pl-3 pb-5 font-bold">
            Sign up and get Cashback!
          </p>
        </div>
      </div>
      <div className="bg-white pt-5 rounded-b-[10px]">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-[#333232] font-bold text-center mt-2">
            OTP Verification
          </h2>
          <p className="text-[#333232] text-center mt-2">
            We have sent you an OTP on your mobile number XXXXXXXX
            {mobilenumber.slice(-4)}
          </p>
          <div className="flex justify-center items-center mt-5 mb-4">
            <OTPInput
              className={otpError ? "OTP-input" : "OTP-input-2"}
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="any"
              disabled={false}
            />
          </div>
          <div className="flex justify-center items-center font-dm-sans mb-2">
            <span style={{ color: "#F2747F" }}>
              {otpError ? <TiWarningOutline /> : ""}
            </span>
            <span style={{ color: "#F2747F" }}>{otpError}</span>
          </div>

          <VioletParagrapgh
            onClick={() => {
              dispatch(setAuthModalState(2));
            }}
            content="Change mobile number?"
          />
          <div className="flex flex-row items-center w-full">
            <button
              onClick={() => {
                axios
                  .get(
                    `${host}/users?phonenumber=${
                      mobilenumber || registerData?.phonenumber
                    }`
                  )
                  .then(async (res) => {
                    if (res.data.message.usertype == 3) {
                      axios
                        .post(`${host}/users/login/phone`, {
                          otp: OTP,
                          phonenumber:
                            mobilenumber || registerData?.phonenumber,
                        })
                        .then(({ data }) => {
                          setIsVerified(true);
                          const { access_token, refresh_token } = data.message;
                          dispatch(addAccessToken(access_token));
                          dispatch(addRefreshToken(refresh_token));
                          axios
                            .get(
                              `${host}/users?phonenumber=${
                                mobilenumber || registerData?.phonenumber
                              }`,
                              {
                                headers: {
                                  "Access-Control-Allow-Origin": "*",
                                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                                },
                              }
                            )
                            .then((res) => {
                              dispatch(addUserData(res.data.message));
                              localStorage.setItem(
                                "OWNER_ID",
                                res.data.message.id
                              );
                              toast.success("Logged in Successfully");

                              window.location.reload();
                              // if (
                              //   res?.data?.message?.avatar === null ||
                              //   !res?.data?.message?.location?.pincode
                              //     ?.length ||
                              //   !res?.data?.message?.schoolname
                              // ) {
                              //   dispatch(setAuthModalState(8));
                              // } else {
                              handleClose();
                              dispatch(removeRegisterData());
                              // }
                            });
                        })
                        .catch((err) => {
                          if (err.response.status === 417) {
                            toast.error("OTP is wrong, Check your OTP");
                            setOtpError(true);
                            return;
                          }

                          toast.error(err.message);
                        });
                    }
                  })
                  .catch((err) => {
                    // toast.error(
                    //   "User not exists, Please complete sign up form !"
                    // );
                    // dispatch(addRegisterData({ otp: OTP }));
                    // dispatch(
                    //   addRegisterData({
                    //     phonenumber: phoneNumberToNumber(mobilenumber),
                    //   })
                    // );
                    // dispatch(setAuthModalState(7));
                  });
              }}
              className="font-lg w-full ml-3 mr-3 px-2 py-2 mt-2 text-white bg-primary border border-[#D0D5DD] rounded-[10px] active:opacity-75"
            >
              Verify OTP
            </button>
          </div>
          {otpSent && otpSec < 1 && (
            <button
              className={`  w-full lg:py-2 m-auto py-1 pb-3 text-base flex justify-center items-center lg:space-x-2  `}
            >
              <p>Didn’t receive the OTP?</p>
              <p
                onClick={(e) => handleOTPSend(e)}
                className=" font-bold text-primary"
              >
                Click to resend
              </p>
            </button>
          )}

          {otpSec !== 30 && otpSec !== 0 && otpSec > 0 && (
            <p className="text-gray text-sm flex justify-center items-center my-2  m-auto">
              Resend OTP in <span className="font-medium pl-2"> {otpSec}</span>s
            </p>
          )}
          <ResendOTP
            className="mb-2 border-primary text-primary"
            renderTime={renderTime}
            renderButton={renderButton}
            onResendClick={() => {}}
          />
        </div>
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
