import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import EmailChange from "./EmailChange";
import OtpHandle from "./OtpHandle";
import PasswordChange from "./PasswordChange";
import axios from "axios";
import { host } from "../../../../../utils/constant";

const Setting = () => {
  const [emailComponents, setEmailComponents] = useState(false);
  const [passwordComponents, setPasswordComponents] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userDataFunction = async () => {
      const ID = typeof window !== 'undefined' && window.localStorage.getItem("OWNER_ID");
      
      try {
        axios
          .get(`${host}/users?id=${ID}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
                "ACCESS_TOKEN"
              )}`,
            },
          })
          .then((res) => {
            
            setUserData(res.data.message);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        
      }
    };
    userDataFunction();
  }, []);

  const emailChanging = () => {
    setEmailComponents(true);
    setPasswordComponents(false);
  };

  const passChanging = () => {
    setEmailComponents(false);
    setPasswordComponents(true);
  };

  async function handleOtp() {
    setMobileCode(true);

    await axios.get(
      `${host}/auth/otp/generate?phonenumber=${userData.phonenumber}`
    );
  }

  const [passwordChange, setPasswordChange] = useState(false);
  const [verifyPasswordChange, setVerifyPasswordChange] = useState(false);
  const [mobileCode, setMobileCode] = useState(false);
  const [emailCode, setEmailCode] = useState(false);

  return (
    <div className="p-5 " style={{ height: "100vh" }}>
      <div className="heading mb-5">
        <h1 className="text-2xl font-bold ">Setting</h1>
      </div>
      <div className="email-pass ml-10 ">
        {/* Setting Home Page 
         if you didn't click any button it will show setting home page components
         */}

        {!emailComponents && !passwordComponents ? (
          <>
            <div
              className="email bg-white pl-5 p-3 rounded-xl sm:w-6/12 w-11/12  flex justify-between items-center cursor-pointer"
              onClick={emailChanging}
            >
              <div>
                <p>Email Id</p>
                <p>{userData.email}</p>
              </div>
              <AiOutlineArrowRight className="text-2xl font-bold"></AiOutlineArrowRight>
            </div>

            <div
              className="pass bg-white pl-5 p-3 rounded-xl w-6/12 flex justify-between items-center mt-2 cursor-pointer"
              onClick={passChanging}
            >
              <div>
                <p>Password</p>
                <p itemType="password text-xl">{"*".repeat(12)}</p>
              </div>
              <AiOutlineArrowRight className="text-2xl font-bold"></AiOutlineArrowRight>
            </div>

            {/* 
          forget password modal will show after clicking on forget password
           */}

            <div>
              <p
                onClick={() => {
                  setPasswordChange(true);
                  handleOtp();
                }}
                className="text-primary font-bold ml-10 mt-4 cursor-pointer"
              >
                Forgot Password ?
              </p>
            </div>
            <div className="relative lg:w-full  ">
              {passwordChange && (
                <>
                  {" "}
                  <div
                    className="bg-white z-30 rounded-2xl w-80 h-auto p-6  shadow-2xl "
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "43%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="float-right ">
                      <GiCancel
                        onClick={() => {
                          setPasswordChange(false);
                          setEmailCode(false);
                          setMobileCode(false);
                        }}
                        className="text-right text-2xl text-primary cursor-pointer"
                      ></GiCancel>
                    </div>

                    {/* 
                    after clicking for mobile code it will show mobile code details and
                    clicking for email code it will show email code details
                     */}
                    {/* {!mobileCode && !emailCode ? (
                      <>
                        <p className="text-black text-center mt-4 py-6 font-medium">
                          Choose from the bottom two options to reset your
                          password
                        </p>

                        <div className="">
                          <button
                            className="border mb-3 bg-primary rounded-lg text-white py-2   w-full"
                            onClick={handleOtp}
                          >
                            Sent a OTP to your mobile no.
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )} */}

                    {mobileCode || emailCode ? (
                      <>
                        {/* 
                      heading changing for email code and mobile code
                       */}

                        {mobileCode ? (
                          <p className="text-black text-center mt-4 py-6 font-medium">
                            An OTP has been sent to your mobile number.
                          </p>
                        ) : (
                          <p className="text-black text-center mt-4 py-6 font-medium">
                            An OTP has been sent to your Email.
                          </p>
                        )}
                        <div className="">
                          <OtpHandle
                            phonenumber={userData.phonenumber}
                            setVerifyPasswordChange={setVerifyPasswordChange}
                            setPasswordComponents={setPasswordComponents}
                          ></OtpHandle>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="absolute opacity-30 lg:hidden z-20 w-full h-full bg-solid"></div>
                </>
              )}
            </div>
          </>
        ) : (
          ""
        )}

        {/* 
        clicking on home email id it will show email change components
         */}

        {emailComponents && (
          <EmailChange
            setEmailComponents={setEmailComponents}
            emailId={userData.email}
          ></EmailChange>
        )}

        {/* 
        clicking on home password id it will show password change components
         */}

        {passwordComponents && (
          <PasswordChange
            id={userData.id}
            email={userData.email}
            setPasswordComponents={setPasswordComponents}
            verifyPasswordChange={verifyPasswordChange}
            setVerifyPasswordChange={setVerifyPasswordChange}
            setPasswordChange={setPasswordChange}
          ></PasswordChange>
        )}
      </div>
    </div>
  );
};

export default Setting;
