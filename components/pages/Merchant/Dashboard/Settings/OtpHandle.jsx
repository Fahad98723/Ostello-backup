import * as axios from "axios";
import React, { useState } from "react";
import { host } from "../../../../../utils/constant";
import dynamic from 'next/dynamic'
const OTPInput = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)
const ResendOTP  = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)
const OtpHandle = ({
  phonenumber,
  setPasswordComponents,
  setVerifyPasswordChange,
}) => {
  
  const [otp, setOtp] = useState("");
  const [errorText, setErrorText] = useState("");

  async function resendOtp() {
    await axios.get(
      `${host}}/auth/otp/resend?phonenumber=${phonenumber}&retrytype=text`
    );
  }

  function verifyOtp() {
    axios({
      method: "get",
      url: `${host}/auth/otp/verify`,
      params: {
        phonenumber,
        otp: otp,
      },
    })
      .then((res) => {
        
        if (res.data.error) {
          setErrorText(res.data.error);
        } else {
          setErrorText("");
          setVerifyPasswordChange(true);
          setPasswordComponents(true);
        }
      })
      .catch((err) => {
        console.error(err);
        // setVerifyPasswordChange(false);
        // setPasswordComponents(false);
      });
  }

  return (
    <div>
      <div className="flex justify-between items-center space-x-2 py-4 px-4 text-xl">
        <OTPInput
          inputClassName="border-2 border-grey-border text-xl rounded "
          className="items-center m-auto "
          value={otp}
          onChange={setOtp}
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
        />
      </div>

      <button
        className={`  px-10 lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2  `}
        onClick={""}
      >
        <p
          onClick={resendOtp}
          className=" font-bold"
          style={{ color: "#A7A7A7" }}
        >
          Resend OTP
        </p>
      </button>

      {errorText && <p className="text-[#FF0000]/80 text-center">{errorText}</p>}
      <p className="text-gray text-sm flex justify-center items-center  m-auto mb-3">
        Resend OTP in <span className="font-medium pl-2"> 30</span>s
      </p>

      <button
        className="border-2 px-10 lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2 rounded-lg bg-primary border-primary text-white"
        onClick={verifyOtp}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpHandle;
