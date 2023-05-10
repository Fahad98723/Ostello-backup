import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import google from "../../../assets/contact-us/google.svg";
import MetaHelmet from "../../../components/MetaHelmet";
import {
  addAccessToken,
  addRefreshToken,
  authSelector,
} from "../../../redux/slices/authSlice";
import { selectSignUp } from "../../../redux/slices/signUpSlice";
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
  color: "#FF1838",
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

const MerchantLogIn = ({ meta }) => {
  const [errorText, setErrorText] = useState(initialErrorText);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { registerData } = useSelector(selectSignUp);
  const { isAuthenticated, userData } = useSelector(authSelector);

  useEffect(() => {
    if (registerData?.email) {
      setEmail(registerData?.email);
    }
  }, [registerData.email]);

  useEffect(() => {
    if (isAuthenticated) {
      if (
        typeof window !== "undefined" &&
        window.localStorage.getItem("OWNER_ID") !== null
      ) {
        if (userData?.usertype === 2) {
          if (userData?.institute === null) router.push("/merchant/details");
          else {
            router.push("/merchant/dashboard");
          }
        }
        if (userData?.usertype === 1) {
          router.push("/admin-dashboard/overview");
        }
      }
    }
  }, [isAuthenticated, userData?.institute, userData?.usertype]);
  return (
    <>
      <MetaHelmet title={meta.title} link={meta.link} />
      <div className="fixed w-full bg-white z-50 top-0 shadow">
        <Navbar />
      </div>
      <main className="w-screen h-screen m-0 p-0 font-dm-sans mt-[130px]">
        <section className="p-3 flex flex-col-reverse gap-8 lg:flex-row items-center bg-white ">
          <div className="h-screen w-full flex flex-col items-center lg:px-24">
            <div className="flex flex-col lg:py-0 items-center  w-full lg:h-full ">
              <div className="flex items-center transition-all">
                <div className="flex flex-col items-center w-full ">
                  <>
                    {" "}
                    <h1 className="font-bold text-2xl text-left ">
                      Welcome Back
                    </h1>
                    <h2 className="font-medium text-base text-left mt-3">
                      Welcome back! Please enter your details.
                    </h2>
                  </>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="">
                <VerifyEmailPassword
                  emailState={[email, setEmail]}
                  passwordState={[password, setPassword]}
                  errorState={[errorText, setErrorText]}
                  phoneNumberState={[phoneNumber, setPhoneNumber]}
                />
              </form>
            </div>
          </div>
        </section>
        <section className="bg-[#F4EBFF] px-6 py-10 lg:pt-16 ">
          <div className="md:max-w-[1200px]">
            <div className="md:flex justify-between">
              <div className="">
                <p className="text-xl font-semibold">Join our newsletter</p>
                <p className="text-base">
                  We’ll send you a nice letter once per week. No spam.
                </p>
              </div>

              <div className="my-3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-4 px-2 join w-full md:w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl"
                />
                <button className="px-6 w-full md:w-[120px] py-3 shadow-md my-1 rounded-lg bg-primary">
                  <p className="font-medium text-base text-white">Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </section>
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
}) => {
  const [phoneNumber, setPhoneNumber] = phoneNumberState;
  const [, setIsPhoneVerified] = phoneVerifyState;
  const [errorText, setErrorText] = errorState;
  const [, setShowError] = useState(false);
  const [value, setValue] = useState("+91");
  const [phoneVerified, setPhoneVerified] = phoneVerifiedState;
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
                window.localStorage.setItem("INSTITUTE_ID", institute.id);
              typeof window !== "undefined" &&
                window.localStorage.setItem(
                  "OWNER_PHONE",
                  institute.phonenumber
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
          router.push("/merchant/signup");
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
    onError: (err) => {},
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
  const [otpSent, setOtpSent] = useState(false);
  const [otpSec, setOtpSec] = useState(30);
  const [otpSentOnce, setOtpSentOnce] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
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
          router.push("/merchant/signup");
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

  return (
    <div className="space-y-4 mt-10">
      <div className="">
        <div className="flex">
          <div className="flex-1"></div>
          <p className={`text-#FF1838`}>{errorText.phone}</p>
        </div>

        <div className="h-10 px-4 border rounded-[10px] mb-5 border-[#D0D5DD] lg:w-5/5 flex items-center text-lg w-full">
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
            className="flex-1 focus:outline-none focus:border-0  text-base "
            onChange={(e) => handlePhoneNumber(e)}
            value={phoneNumber}
          />
        </div>

        <div className="">
          <div className="flex-1"></div>
          <p className={`text-#FF1838 flex justify-center items-center m-auto`}>
            {errorText.otp}
          </p>
        </div>

        {otpSent ? (
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
        ) : (
          ""
        )}

        {otpSent && otpSec < 1 && (
          <button
            className={`  px-10 lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2  `}
            onClick={(e) => handleOTPSend(e)}
          >
            <p className=" font-bold" style={{ color: "#A7A7A7" }}>
              Resend OTP
            </p>
          </button>
        )}

        {otpSec !== 30 && otpSec !== 0 && otpSec > 0 && (
          <p className="text-gray text-sm flex justify-center items-center  m-auto mb-3">
            Resend OTP in <span className="font-medium pl-2"> {otpSec}</span>s
          </p>
        )}

        {otpSent ? (
          <div className="flex justify-center ">
            <button
              onClick={(e) => handleOTPVerify(e)}
              className="border-2 px-10 
            lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary  text-white "
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={(e) => handleOTPSend(e)}
              className="border-2 px-10 
          lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary  text-white "
            >
              Proceed
            </button>
          </div>
        )}
        <div className="relative flex p-5 items-center">
          <div className="flex-grow border-t border-[#D0D5DD]"></div>
          <span className="flex-shrink mx-4 text-#344054 ">OR</span>
          <div className="flex-grow border-t border-[#D0D5DD]"></div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGoogleSignIn();
            }}
            className="border px-10 
          lg:w-full lg:py-2 font-bold  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-white  border-[#D0D5DD] flex justify-center items-center text-#344054 "
          >
            <span>
              <img className="w-[20px] mr-5" src={google.src} alt="" />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col items-center  space-x-2  lg:w-max  ">
        <p className="font-medium text-sm text-gray">Create an account?</p>

        <button onClick={() => router.push("/merchant/login")}>
          <div className="px-12 lg:px-0 lg:py-0 rounded-full text-sm text-primary">
            Sign Up
          </div>
        </button>
      </div>
    </div>
  );
};

const VerifyEmailPassword = ({ emailState, passwordState, errorState }) => {
  const [email, setEmail] = emailState;
  const [password, setPassword] = passwordState;
  const [errorText, setErrorText] = errorState;
  const dispatch = useDispatch();
  const router = useRouter();

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
                window.localStorage.setItem("INSTITUTE_ID", institute.id);
              typeof window !== "undefined" &&
                window.localStorage.setItem(
                  "OWNER_PHONE",
                  institute.phonenumber
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
          toast.error("You're not a merchant, please sign up!");
          router.push("/merchant/signup");
        });
    } catch (err) {}
  };
  const handleGoogleSignIn = useGoogleLogin({
    flow: "implicit",

    onSuccess: (response) => {
      // 
      // setOpen(true);
      // dispatch(googleLoginSuccess(response.tokenObj));
      serverLogin(response.access_token);
    },
    onError: (err) => {},
  });

  const handleLogin = async (e) => {
    e.preventDefault();
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

      if (res) {
        toast.success("Logged in Successfully");
      }
      // clearing localstorage and saving new access_token and refresh token
      typeof window !== "undefined" && window.localStorage.clear();
      const { access_token, refresh_token } = res.data.message;
      typeof window !== "undefined" &&
        window.localStorage.setItem("ACCESS_TOKEN", access_token);
      typeof window !== "undefined" &&
        window.localStorage.setItem("REFRESH_TOKEN", refresh_token);

      // getting the user data.. and saving it to localStorage ..
      const userRes = await axios.get(`${host}/users?email=${email}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const { usertype, institute } = userRes?.data?.message;
      typeof window !== "undefined" &&
        window.localStorage.setItem("OWNER_ID", userRes?.data?.message?.id);

      // redirecting user after successfully logged in...
      if (usertype === 1) router.push("/admin-dashboard/overview");
      else if (usertype === 2) {
        if (institute === null) router.push("/merchant/details");
        else {
          typeof window !== "undefined" &&
            window.localStorage.setItem("INSTITUTE_ID", institute?.id);
          typeof window !== "undefined" &&
            window.localStorage.setItem("OWNER_PHONE", institute?.phonenumber);

          router.push("/merchant/dashboard");
        }
      }
      router.reload();
    } catch (err) {
      setErrorText(err.message);
      toast.error(err.message);
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

  const [isPassShown, setIsPassShown] = useState(false);

  return (
    <div className=" space-y-6 mt-10 flex flex-col items-center">
      <div className="">
        <div className="flex">
          <div className="text-base text-#344054  ">Email*</div>
          <div className="flex-1"></div>
          <p className={`text-#FF1838`}>{errorText.email}</p>
        </div>
        <div className=" flex  items-center lg:mx-0 text-xl w-[360px]">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-[10px] shadow focus:outline-none w-[360px] px-3
            border border-[#D0D5DD]
            py-2
            text-[14px]
            font-normal
            text-gray-700
            focus:bg-white"
            onChange={(e) => handleEmail(e)}
            value={email}
          />
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="text-base text-#344054 ">Password*</div>
          <div className="flex-1"></div>
          <p className={`text-#FF1838`}>{errorText.password}</p>
        </div>
        <div
          className="flex justify-center rounded-[10px] shadow
            border border-[#D0D5DD] w-[360px]  items-center
            py-1.5
            "
        >
          <input
            type={isPassShown ? "text" : "password"}
            placeholder="Enter your password"
            className=" px-3
            w-[360px]
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
            onClick={() => setIsPassShown(!isPassShown)}
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
      <div className="flex justify-center w-[360px]">
        <button
          onClick={(e) => handleLogin(e)}
          className="border border-[#D0D5DD]  px-10 
           w-[360px] lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender hover:text-[#344054] hover:font-bold bg-primary  text-white "
        >
          Log In
        </button>
      </div>
      <div className="flex justify-center w-[360px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleGoogleSignIn();
          }}
          className="border px-10 
          w-full lg:py-2 font-bold transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-white  border-[#D0D5DD] flex justify-center items-center text-#344054 "
        >
          <span>
            <img className="w-[20px] mr-5" src={google.src} alt="" />
          </span>
          Sign in with Google
        </button>
      </div>
      <div className="flex lg:flex-row flex-col items-center text-center w-[360px]  space-x-2  lg:w-max  ">
        <p className="font-medium text-sm text-gray">Create an account?</p>

        <button onClick={() => router.push("/merchant/signup")}>
          <div className="px-12 lg:px-0 lg:py-0 rounded-full text-sm text-primary">
            Sign Up
          </div>
        </button>
      </div>
      <button
        className="text-[#333333] text-md hover:underline"
        onClick={() => router.push("/merchant/login/forgot")}
      >
        Forgot your password ?
      </button>
    </div>
  );
};
export default MerchantLogIn;

export const getStaticProps = async () => {
  const meta = {
    title: "Merchant Log In - ostello.co.in",
    link: "https://www.ostello.co.in/merchant/login",
  };
  // 
  return {
    props: {
      meta,
    },
  };
};
