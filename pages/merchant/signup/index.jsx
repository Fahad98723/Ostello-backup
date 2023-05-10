import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import google from "../../../assets/contact-us/google.svg";
import otpicon from "../../../assets/merchant-details/otpicon.svg";
import signupbg from "../../../assets/merchant-details/signup-bg.png";
import MetaHelmet from "../../../components/MetaHelmet";
import OstelloSubscribe from "../../../components/pages/HomeLanding/OstelloSubscribe";
import {
  addAccessToken,
  addRefreshToken,
  authSelector,
} from "../../../redux/slices/authSlice";
import {
  addRegisterData,
  selectSignUp,
} from "../../../redux/slices/signUpSlice";
import { host } from "../../../utils/constant";
import { phoneNumberToNumber } from "../../../utils/utils";

const OTPInput = dynamic(
  () => {
    return import("otp-input-react");
  },
  { ssr: false }
);
const Footer = dynamic(
  () => {
    return import("../../../components/layout/Footer");
  },
  { ssr: false }
);
const Navbar = dynamic(
  () => {
    return import("../../../components/pages/Payment/components/navabr/Navbar");
  },
  { ssr: false }
);
const PhoneInput = dynamic(
  () => {
    return import("react-phone-number-input");
  },
  { ssr: false }
);

const initialErrorText = {
  color: "",
  phone: "",
  email: "",
  otp: "",
  password: "",
};

export const hasMin8 = (value) => value.length >= 8;
export const hasUppercase = (value) => /[A-Z]/.test(value);
export const hasSpecialChar = (value) =>
  // eslint-disable-next-line no-useless-escape
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
export const hasNumber = (value) => /[0-9]/.test(value);

const MerchantSignUp = ({ meta }) => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [errorText, setErrorText] = useState(initialErrorText);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const { isAuthenticated, userData, instituteDetails } =
    useSelector(authSelector);
  const { registerData } = useSelector(selectSignUp);

  useEffect(() => {
    if (registerData?.email) {
      setEmail(registerData?.email);
    }
  }, [registerData.email]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return typeof window !== "undefined" &&
    window.localStorage.getItem("ACCESS_TOKEN") !== null ? (
    router.push("/")
  ) : (
    <>
      <MetaHelmet title={meta.title} link={meta.link} />
      <div className="fixed w-full bg-white z-50 top-0 shadow">
        <Navbar />
      </div>
      <main className=" md:max-w-[1350px] mx-auto h-screen  font-dm-sans md:mt-[70px] mt-[80px]">
        <section className="md:grid md:grid-cols-2 mx-auto w-full gap-4 items-center justify-center bg-white mb-10 md:mb-0 md:px-10">
          <div className=" justify-center mx-auto  ">
            <div className="text-center">
              <div className="transition-all">
                <div className=" w-full ">
                  {!otpSent ? (
                    <>
                      {" "}
                      <h1 className="font-bold text-2xl  mt-3">Sign Up</h1>
                      <h2 className="font-medium text-base ">
                        Start your 30-day free trial.
                      </h2>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-col items-center">
                        <img
                          src={otpicon.src}
                          alt=""
                          className="w-[60px] mb-5"
                        />
                        <h1 className="font-bold text-xl md:text-2xl text-center lg:w-max ">
                          OTP Verification
                        </h1>
                        <p>We sent a verification link to</p>
                        <p>XXXXXX{phoneNumber.slice(-4)}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <form className="">
                <VerifyPhoneNumber
                  phoneVerifyState={[isPhoneVerified, setIsPhoneVerified]}
                  errorState={[errorText, setErrorText]}
                  phoneNumberState={[phoneNumber, setPhoneNumber]}
                  proceed={[otpSent, setOtpSent]}
                  phoneVerifiedState={[phoneVerified, setPhoneVerified]}
                  emailState={[email, setEmail]}
                  passwordState={[password, setPassword]}
                />
              </form>
            </div>
          </div>
          <div>
            <img
              src={signupbg.src}
              alt=""
              className=" h-[800px]  md:block hidden  "
            />
          </div>
        </section>
        <OstelloSubscribe />
        <Footer />
      </main>
    </>
  );
};
export const VerifyPhoneNumber = ({
  phoneVerifyState,
  errorState,
  phoneNumberState,
  phoneVerifiedState,
  proceed,
  passwordState,
  emailState,
}) => {
  const [phoneNumber, setPhoneNumber] = phoneNumberState;
  const [, setIsPhoneVerified] = phoneVerifyState;
  const [errorText, setErrorText] = errorState;
  const [, setShowError] = useState(false);
  const [value, setValue] = useState("+91");
  const [phoneVerified, setPhoneVerified] = phoneVerifiedState;
  const [otpSent, setOtpSent] = proceed;
  const [email, setEmail] = emailState;
  const [name, setName] = useState("");
  const [password, setPassword] = passwordState;

  const dispatch = useDispatch();

  const serverLogin = async (postBody) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await axios.post(
        `${host}/auth/google`,
        {
          access_token: JSON.stringify(postBody),
        },
        config
      );
      const email = response?.data?.user?.email;
      typeof window !== "undefined" && window.localStorage.clear();

      // getting the user data.. and saving it to localStorage ..
      axios
        .get(`${host}/users?email=${email}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((userRes) => {
          const tokens = axios.post(
            `${host}/users/login/google`,
            {
              access_token: JSON.stringify(postBody),
              email: email,
            },
            config
          );
          const { access_token, refresh_token } = tokens.message;
          dispatch(addAccessToken(access_token));
          dispatch(addRefreshToken(refresh_token));

          const { usertype, institute } = userRes.data.message;
          typeof window !== "undefined" &&
            window.localStorage.setItem("OWNER_ID", userRes.data.message.id);

          // redirecting user after successfully logged in...
          if (usertype === 1) router.push("/admin-dashboard/overview");
          else if (usertype === 2) {
            if (institute === null) router.push("/merchant/details");
            else {
              typeof window !== "undefined" &&
                window.localStorage.setItem("INSTITUTE_ID", institute?.id);
              typeof window !== "undefined" &&
                window.localStorage.setItem(
                  "OWNER_PHONE",
                  institute?.phonenumber
                );

              router.push("/merchant/dashboard");
            }
          } else {
            router.push({
              pathname: router.pathname,
              query: { ...router.query },
            });
          }
        })
        .catch((err) => {
          toast.success("Please Complete details to Sign Up");
          dispatch(addRegisterData({ email: email }));
          setPhoneVerified(true);
        });
    } catch (err) {
      console.error(err);
    }
  };
  const handleGoogleSignIn = useGoogleLogin({
    flow: "implicit",

    onSuccess: (response) => {
      // 
      // setOpen(true);
      // dispatch(googleLoginSuccess(response.tokenObj));
      serverLogin(response.access_token);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handlePhoneNumber = (e) => {
    const normalizedPhoneNumber = (value, previousValue) => {
      if (!value) return value;
      const currentValue = value.replace(/[^\d]/g, "");
      const cvLength = currentValue.length;

      if (!previousValue || value.length !== previousValue.length) {
        setErrorText(initialErrorText);
        if (cvLength < 4) return currentValue;
        else if (cvLength <= 7)
          return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`;
        else return `${currentValue.slice(0, 5)} ${currentValue.slice(5, 10)}`;
      }
    };

    e.preventDefault();
    setPhoneNumber(normalizedPhoneNumber(e.target.value, phoneNumber));
  };

  const [otp, setOtp] = useState("");
  const [otpSec, setOtpSec] = useState(30);
  const [otpSentOnce, setOtpSentOnce] = useState(false);
  const router = useRouter();

  const handleOTPSend = (e) => {
    e.preventDefault();
    if (`${phoneNumberToNumber(phoneNumber)}`.length < 10) {
      setErrorText({
        ...errorText,
        color: "red",
        phone: "Enter a valid Phone Number",
      });
      return;
    }

    typeof window !== "undefined" &&
      window.localStorage.setItem("OWNER_PHONE", phoneNumber);

    axios
      .get(`${host}/users?phonenumber=${phoneNumberToNumber(phoneNumber)}`)
      .then((res) => {
        if (res.data.message.id) {
          toast.error("User already exist. Please login");
          typeof window !== "undefined" &&
            window.localStorage.setItem("OWNER_ID", res.data.message.id);
          router.push("/merchant/login");
        }
      })
      .catch(() => {
        setOtpSent(true);
        setOtpSec(30);
        if (!otpSentOnce) {
          axios({
            method: "get",
            url: `${host}/auth/otp/generate`,
            params: {
              phonenumber: phoneNumberToNumber(phoneNumber),
              // email: '',
            },
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((res) => {
              setErrorText({
                ...errorText,
                color: "green",
                otp: res.data.message,
              });
              setOtpSentOnce(false);
            })
            .catch((err) => {
              console.error(err);
              setErrorText({ ...errorText, color: "red", otp: err.data.error });
            });
        } else {
          axios({
            method: "get",
            url: `${host}/auth/otp/resend`,
            params: {
              phonenumber: phoneNumberToNumber(phoneNumber),
              retrytype: "string",
            },
          })
            .then((res) => {
              res && setOtpSentOnce(true);
            })
            .catch((err) => {
              console.error(err);
              setErrorText({
                ...errorText,
                color: "red",
                otp: err.data.error,
              });
            });
        }
      });
  };

  const handleOTPVerify = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: `${host}/auth/otp/verify`,
      params: {
        phonenumber: phoneNumberToNumber(phoneNumber),
        otp: otp,
      },
    })
      .then((res) => {
        if (res) {
          setIsPhoneVerified(true);
          setPhoneVerified(true);
          setOtpSent(false);
        }

        // axios
        //   .get(`${host}/users?phonenumber=${phoneNumberToNumber(phoneNumber)}`)
        //   .then((res) => {
        //     
        //     if (res.data.message.id) {
        //       typeof window !== 'undefined' && window.localStorage.setItem('OWNER_ID', res.data.message.id)
        //       router.push('/merchant/login')
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err)

        //     router.push('/merchant/signup')
        //   })
      })
      .catch((err) => {
        setErrorText({
          ...errorText,
          color: "red",
          otp: err.data.message,
        });
        setShowError(true);
      });
  };

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
  const handleLogin = async (e) => {
    try {
      const res = await axios.post(
        `${host}/users/login/`,
        {
          email: email,
          password: password,
        },
        {
          "Access-Control-Allow-Origin": "*",
        }
      );

      typeof window !== "undefined" &&
        window.localStorage.setItem(
          "ACCESS_TOKEN",
          res.data.message["access_token"]
        );
      typeof window !== "undefined" &&
        window.localStorage.setItem(
          "REFRESH_TOKEN",
          res.data.message["refresh_token"]
        );

      const userDetails = await axios.get(`${host}/users?email=${email}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      toast.success("Logged in Successfully");
      if (userDetails.data.message.institute === null) {
        typeof window !== "undefined" &&
          window.localStorage.setItem("OWNER_ID", userDetails.data.message.id);
        router.push("/merchant/details");
      }
    } catch (err) {
      setErrorText(err.message);
      toast.error(err.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name.length <= 0) {
      setErrorText({
        ...initialErrorText,
        color: "red",
        name: "Name is required",
      });
      return;
    } else if (
      email.length <= 0 ||
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setErrorText({
        ...initialErrorText,
        color: "red",
        email: "Enter valid email",
      });
      return;
    } else if (
      !hasMin8(password) ||
      !hasNumber(password) ||
      !hasSpecialChar(password) ||
      !hasUppercase(password)
    ) {
      setErrorText({
        ...initialErrorText,
        color: "red",
        password: "Enter valid password",
      });
    } else {
      axios
        .get(`${host}/users?email=${email}`, {
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined" &&
              window.localStorage.getItem("ACCESS_TOKEN")
            }`,
          },
        })
        .then((res) => {
          if (res.data.id) {
            handleLogin(e);
          }
        })
        .catch((err) => {
          axios
            .post(
              `${host}/users/register`,
              {
                email: email,
                password: password,
                phonenumber: phoneNumberToNumber(phoneNumber),
                usertype: 2,
              },
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
              }
            )
            .then((res) => {
              toast.success("Signed Up Successfully");
              handleLogin();
            })
            .catch((err) => {
              setErrorText({ ...errorText, color: "red", email: err.message });
              toast.error("Error Signing Up!");
            });
        });
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setErrorText(initialErrorText);
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setErrorText(initialErrorText);
    setEmail(e.target.value);
  };
  const handleName = (e) => {
    e.preventDefault();
    setErrorText(initialErrorText);
    setName(e.target.value);
  };

  const [isPassShown, setIsPassShown] = useState(false);

  return !phoneVerified ? (
    <div className="space-y-4 mt-6 sm:max-w-[375px]">
      <div className="">
        <div className="flex">
          <div className="flex-1"></div>
          <p className={`text-${errorText.color}`}>{errorText.phone}</p>
        </div>

        <div
          className={`${
            otpSent && "hidden"
          } h-10 px-4 border rounded-[10px] mb-5 border-[#D0D5DD] lg:w-5/5 flex items-center text-lg w-full`}
        >
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
            type="text"
            placeholder="Enter your Phone No "
            className="flex-1 focus:outline-none focus:border-0 text-base "
            onChange={(e) => handlePhoneNumber(e)}
            value={phoneNumber}
          />
        </div>

        <div className="">
          <div className="flex-1"></div>
          <p
            className={`text-${errorText.color} flex justify-center items-center m-auto`}
          >
            {errorText.otp}
          </p>
        </div>

        {otpSent ? (
          <div className="flex justify-between items-center space-x-2 py-4 px-4 text-xl sm:max-w-[375px]">
            <OTPInput
              inputClassName="border-2 border-[#DFCBFB] text-[24px] md:text-[48px] md:w-[60px] md:h-[60px] rounded text-primary font-bold"
              className="items-center m-auto "
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
            />
          </div>
        ) : (
          ""
        )}

        {otpSent ? (
          <div className="flex justify-center ">
            <button
              onClick={(e) => handleOTPVerify(e)}
              className="border border-[#D0D5DD] hover:text-[#344054] w-[360px] hover:font-bold px-10 
            lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary  text-white "
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={(e) => handleOTPSend(e)}
              className="border border-[#D0D5DD] w-[360px] hover:text-[#344054] hover:font-bold px-10 
          lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary hover:text-#344054  text-white "
            >
              Proceed
            </button>
          </div>
        )}

        {otpSent && otpSec < 1 && (
          <button
            onClick={(e) => handleOTPSend(e)}
            className={`  w-full lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2  `}
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
        <div
          className={`${otpSent && "hidden"} relative flex p-5 items-center`}
        >
          <div className="flex-grow border-t border-[#D0D5DD]"></div>
          <span className="flex-shrink mx-4 text-[#333232]">or</span>
          <div className="flex-grow border-t border-[#D0D5DD]"></div>
        </div>
        <div className={`${otpSent && "hidden"} flex justify-center mt-5`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGoogleSignIn();
            }}
            className="border px-10 
          lg:w-full lg:py-2 font-bold transition-all hover:-translate-y-1 w-[360px] m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-white  border-[#D0D5DD] flex justify-center items-center text-#344054 "
          >
            <span>
              <img className="w-[20px] mr-5" src={google.src} alt="" />
            </span>
            Sign up with Google
          </button>
        </div>
      </div>

      <div
        className={`${
          otpSent && "hidden"
        } flex lg:flex-row flex-col items-center  space-x-2  lg:w-max  `}
      >
        <p className="font-medium text-sm text-gray">
          Already have an account ?
        </p>

        <button onClick={() => router.push("/merchant/login")}>
          <div className="px-12 lg:px-0 lg:py-0 rounded-full text-sm text-primary">
            Login to your Merchant Account
          </div>
        </button>
      </div>
      {otpSent && (
        <div className="flex justify-center items-center  space-x-2  lg:w-max  ">
          <div>
            <p className="font-medium flex justify-center items-center text-sm text-[#344054]">
              <ArrowLeftOutlined />
            </p>
          </div>
          <div
            onClick={() => router.replace(-1)}
            className="flex justify-center items-center lg:px-0 font-medium rounded-full text-sm text-primary"
          >
            <p>Back to Sign Up</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className=" space-y-6 mt-5 sm:max-w-[375px]">
      <div className="">
        <div className="flex">
          <div className="text-base text-#344054 ">Name*</div>
          <div className="flex-1"></div>
          <p className={`text-${errorText.color}`}>{errorText.name}</p>
        </div>
        <div className=" flex  items-center lg:mx-0 text-xl">
          <input
            type="text"
            placeholder="Enter your name"
            className="flex-1 rounded-[10px] shadow focus:outline-none w-full px-3
            border border-[#D0D5DD]
            py-2
            text-[14px]
            font-normal
            text-gray-700 focus:border-0"
            onChange={(e) => handleName(e)}
            value={name}
          />
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="text-base text-#344054  ">Email*</div>
          <div className="flex-1"></div>
          <p className={`text-${errorText.color}`}>{errorText.email}</p>
        </div>
        <div className=" flex  items-center lg:mx-0 text-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-[10px] shadow focus:outline-none w-full px-3
            border border-[#D0D5DD]
            py-2
            text-[14px]
            font-normal
            text-gray-700 focus:border-0"
            onChange={(e) => handleEmail(e)}
            value={email}
          />
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="text-base text-#344054 ">Password*</div>
          <div className="flex-1"></div>
          <p className={`text-${errorText.color}`}>{errorText.password}</p>
        </div>
        <div
          className="flex justify-center rounded-[10px] shadow
            border border-[#D0D5DD]  items-center
            py-1.5
            "
        >
          <input
            type={isPassShown ? "text" : "password"}
            placeholder="Create new password"
            className="w-full px-3
            mx-auto
            text-[14px]
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:outline-none
            "
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <button
            className={` px-2 py-1 font-medium flex justify-center items-center lg:space-x-2 rounded-2xl `}
            onClick={(e) => {
              e.preventDefault();
              setIsPassShown(!isPassShown);
            }}
          >
            {isPassShown ? (
              <React.Fragment>
                <BsEyeSlash className="text-slate text-2xl" />
                {/* <span className="text-slate hidden lg:block">Hide</span> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <BsEye className=" text-2xl text-slate" />
                {/* <span className="text-white hidden lg:block">Show</span> */}
              </React.Fragment>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex space-x-1 items-center text-lavender">
          <div className="text-primary">
            {hasMin8(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className="text-slate text-sm">Minimum 8 characters</p>
        </div>
        <div className="flex space-x-1 items-center text-lavender">
          <div className="text-primary">
            {hasUppercase(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className="text-slate text-sm flex-1 min-w-48">An Uppercase</p>
        </div>
        <div className="flex space-x-1 items-center text-lavender">
          <div className="text-primary">
            {hasSpecialChar(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className="text-slate text-sm">Special char(&$%#)</p>
        </div>
        <div className="flex space-x-1 items-center text-lavender">
          <div className="text-primary">
            {hasNumber(password) ? <AiFillCheckCircle /> : <BiCircle />}
          </div>
          <p className="text-slate text-sm">A Number</p>
        </div>
      </div>
      <div className="flex justify-center ">
        <button
          onClick={(e) => handleSignup(e)}
          className="border border-[#D0D5DD] hover:font-bold px-10 
          lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base w-[360px] lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary hover:text-[#344054] text-white "
        >
          Sign up
        </button>
      </div>
      <div
        className="hidden 
            
      "
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            handleGoogleSignIn();
          }}
          className="border px-10 
          lg:w-full lg:py-2 font-bold transition-all hover:-translate-y-1 m-auto py-1 w-[360px] text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-white  border-[#D0D5DD] flex justify-center items-center text-#344054 "
        >
          <span>
            <img className="w-[20px] mr-5" src={google.src} alt="" />
          </span>
          Sign up with Google
        </button>
      </div>
      <h2 className="font-medium text-[14px] text-center">
        Already have an account?{" "}
        <span className="text-primary">
          {" "}
          <Link legacyBehavior prefetch={false} href="/merchant/login">
            <a href=""> Login </a>
          </Link>
        </span>
      </h2>
    </div>
  );
};

export default MerchantSignUp;

export const getStaticProps = async () => {
  const meta = {
    title: "Merchant Sign Up - ostello.co.in",
    link: "https://www.ostello.co.in/merchant/signup",
  };

  return {
    props: {
      meta,
    },
  };
};
