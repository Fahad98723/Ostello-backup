import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  addRegisterData,
  selectSignUp,
} from "../../../../../redux/slices/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccessToken,
  addRefreshToken,
  addUserData,
  setAuthModalState,
} from "../../../../../redux/slices/authSlice";
import { ACCESS_TOKEN, host } from "../../../../../utils/constant";
import axios from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import toast from "react-hot-toast";
import { phoneNumberToNumber } from "../../../../utils";
import { Check, Times } from "../../../../auth/student/sub-components/icons";
import { shadows } from "@mui/system";
const qualification = [
  {
    title: "Choose Qualification",
  },
  {
    title: "Student",
  },
  {
    title: "Parent",
  },

  {
    title: "Working Professional",
  },
  {
    title: "Self Employed",
  },
];
export default function SignUpComplete({
  handleClose,
  mobilenumber,
  handleOpen,
  OTP,
}) {
  const [isPassShown, setIsPassShown] = useState(true);
  const { registerData } = useSelector(selectSignUp);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const phonenumber = phoneNumberToNumber(mobilenumber);
  const [active, setActive] = useState(false);
  const [referral, setReferral] = useState(registerData.referral || "");
  const [referralError, setReferralError] = useState(false);
  const [classes, setClasses] = useState(registerData.classes || "Class 1");
  const [streams, setStreams] = useState(registerData.stream || "");
  const [customerType, setCustomerType] = useState("student");

  useEffect(() => {
    if (phonenumber) {
      dispatch(addRegisterData({ phonenumber: phonenumber }));
    }
  }, [phonenumber, dispatch]);

  const [studyingAt, setStudyingAt] = useState("");
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const infoGenRef = useRef(null);

  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length !== 6) {
      setPincodeError("Enter a valid pincode");
      setAreaOptions([]);
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      return;
    }
    setIsLoading(true);

    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res.data.map((item) =>
          item.PostOffice.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );

        setCity(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
        dispatch(
          addRegisterData({
            state: res.data[0].PostOffice[0].State,
          })
        );
        dispatch(
          addRegisterData({
            country: res.data[0].PostOffice[0].Country,
          })
        );
        dispatch(
          addRegisterData({
            city: res.data[0].PostOffice[0].District,
          })
        );
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => {});
  };

  const [schoolName, setSchoolName] = useState(registerData.schoolname);

  useEffect(() => {
    if (classes !== "Class 11" || classes !== "Class 12") {
      setStreams("");
    }
  }, [classes]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    if (
      !registerData.name ||
      // !registerData.email ||
      !registerData.phonenumber ||
      !registerData.area ||
      !customerType
    ) {
      toast.error("Please fill every data");
      return;
    }

    if (customerType === "student") {
      if (!classes || !schoolName) {
        toast.error("Please select Class  And fill School name");
        return;
      }
      if (
        registerData.classes === "Class 12" ||
        registerData.classes === "Class 11"
      ) {
        if (!streams) {
          toast.error("Please Select stream");
          return;
        }
      }
    }

    try {
      dispatch(addRegisterData({ customertype: customerType }));
      dispatch(addRegisterData({ stream: streams }));
      dispatch(addRegisterData({ schoolname: schoolName }));

      // const data = {
      //   name: `${registerData.name}`,
      //   // email: registerData.email,
      //   phonenumber: registerData.phonenumber,
      //   schoolname:
      //     registerData.customertype === "student" || customerType === "student"
      //       ? registerData.schoolname || schoolName
      //       : "",
      //   location: {
      //     area: registerData.area,
      //     pincode: registerData.pincode,
      //   },
      //   grade:
      //     registerData.customertype === "student" || customerType === "student"
      //       ? registerData.classes || classes
      //       : "",
      //   stream:
      //     registerData.customertype === "student" || customerType === "student"
      //       ? registerData.stream || streams
      //       : "",
      //   usertype: 3,
      //   customertype: registerData.customertype || customerType,
      //   referralCode: referral,
      // };
      //
      // const registerRes = await axios.post(
      //   `${host}/users/register`,
      //   data,
      //   config
      // );
      // toast.success("Signed Up Successfully");

      // axios
      //   .post(`${host}/users/login/phone`, {
      //     otp: registerData.otp,
      //     phonenumber: registerData.phonenumber,
      //   })

      //   .then(async ({ data }) => {
      //
      //     // setIsVerified(true)
      //     const { access_token, refresh_token } = data.message;
      //     // Refferel =>

      //     dispatch(addAccessToken(access_token));
      //     dispatch(addRefreshToken(refresh_token));

      //     axios
      //       .get(`${host}/users?phonenumber=${registerData.phonenumber}`, {
      //         headers: {
      //           "Access-Control-Allow-Origin": "*",
      //           Authorization: `Bearer ${window.localStorage.getItem(
      //             "ACCESS_TOKEN"
      //           )}`,
      //         },
      //       })
      //       .then(async (res) => {
      //         dispatch(addUserData(res.data.message));
      //         localStorage.setItem("OWNER_ID", res.data.message.id);

      //         if (referral?.length) {
      //           try {
      //             setReferralError(false);
      //             const res = await axios.patch(
      //               `${host}/wallet?referralcode=${referral}`,
      //               {},
      //               {
      //                 headers: {
      //                   "Access-Control-Allow-Origin": "*",
      //                   Authorization: `Bearer ${window.localStorage.getItem(
      //                     "ACCESS_TOKEN"
      //                   )}`,
      //                 },
      //               }
      //             );
      //
      //             toast.success("Successfully Sent referral");
      //           } catch (err) {
      //             setReferralError(true);
      //           }
      //         } else {
      //           continueReferral(false);
      //         }
      //         // dispatch(setAuthModalState(8));
      //         window.location.reload();
      //         handleClose();
      //       });
      //   });

      axios({
        method: "get",
        url: `${host}/auth/otp/generate`,
        params: {
          phonenumber: registerData.phonenumber,
          // email: emailRef.current.value,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then(() => {
        dispatch(setAuthModalState(3));
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error("Your number already exist");
      } else {
        toast.error(err.message);
      }
    }
  };

  const continueReferral = async (continueRef) => {
    if (!continueRef) {
      toast.success("Logged in Successfully");
      handleClose();
      // router.reload();
      // dispatch(setAuthModalState(8));
      // handleOpen(true);
      // router.push({
      //   pathname: router.pathname,
      //   query: { ...router.query },
      // });
    } else {
      if (referral?.length) {
        try {
          const res = await axios.patch(
            `${host}/wallet?referralcode=${referral}`,
            {},
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${window.localStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          toast.success("Logged in Successfully");
          handleClose();
          // router.reload();
          // dispatch(setAuthModalState(8));
          // router.push({
          //   pathname: router.pathname,
          //   query: { ...router.query },
          // });
          // handleOpen(true);
          setReferralError(false);
        } catch (err) {
          toast.error("Wrong referral !");
          setReferralError(true);
        } finally {
          window.location.reload();
        }
      } else {
        toast.error("Write valid referral code !");
      }
    }
  };
  return (
    <div className="  md:w-[370px] w-[300px] max-h-[500px] overflow-y-scroll">
      {!referralError ? (
        <section className="bg-white  rounded-[10px]">
          <div className="flex text-white rounded-t-[5px] bg-primary h-[100px] justify-center items-center">
            <div className="text-center flex flex-col w-full">
              <div className="flex justify-between items-center mt-3">
                <span></span>
                <span className="text-[18px] font-bold">Complete Details</span>
                <p
                  className="cursor-pointer text-[20px] w-[30px] h-[30px] font-bold pr-3"
                  onClick={() => {
                    handleClose();
                    dispatch(setAuthModalState(0));
                  }}
                >
                  x
                </p>
              </div>
              <p className="text-[12px] pr-3 pl-3 ">
                You’re just one step away from signing up
              </p>
              <p className="text-[13px] pr-3 pl-3 pb-5 font-bold">
                Receive an Instant Cashback of Rs.300 in your wallet!
              </p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className=" mt-5">
              <div className="form-group pl-5 pr-5">
                <input
                  required
                  onChange={(e) =>
                    dispatch(addRegisterData({ name: e.target.value }))
                  }
                  defaultValue={registerData?.name || name || ""}
                  type="text"
                  className="form-control
          block
          w-full
          px-3
          py-1.5
          text-[14px]
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                  placeholder="Name"
                />
              </div>
              {/* <div className="form-group pl-5 pr-5">
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    dispatch(addRegisterData({ last_name: e.target.value }))
                  }
                  className="form-control
          block
          w-full
          px-3
          py-1.5
          text-[14px]
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                  placeholder="Last name"
                />
              </div> */}
            </div>
            {/* <div className="form-group pl-5 pr-5 mt-3">
              <input
                required
                onChange={(e) =>
                  dispatch(addRegisterData({ email: e.target.value }))
                }
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-[14px]
          font-normal
          text-gray-700
          bg-white 
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="Email "
                defaultValue={registerData?.email || ""}
              />
            </div> */}
            <div className="form-group flex mt-3 pl-5 pr-5">
              <input
                required
                onChange={(e) =>
                  dispatch(
                    addRegisterData({
                      phonenumber: phoneNumberToNumber(e.target.value),
                    })
                  )
                }
                type="number"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding  
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder={"Mobile Number"}
                value={registerData?.phonenumber || phonenumber || ""}
              />
            </div>
            {/* <div className="form-group pl-3 pr-5 mt-3 flex justify-center items-center border-b border-[#D0D5DD] ml-5 mr-5">
              <input
                required
                onChange={(e) =>
                  dispatch(addRegisterData({ password: e.target.value }))
                }
                type={isPassShown ? "text" : "password"}
                className="form-control
          block
          w-full
          mx-auto
          py-1.5
          text-[14px]
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="Password"
              />
              <button
                className={`py-1 font-medium flex justify-center items-center lg:space-x-2 rounded-[10px] text-black`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsPassShown(!isPassShown);
                }}
              >
                {isPassShown ? (
                  <React.Fragment>
                    <BsEyeSlash className="text-slate text-2xl" />
         
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <BsEye className=" text-2xl text-slate" />
             
                  </React.Fragment>
                )}
              </button>
            </div> */}

            <div className="md:flex justify-between">
              <div className="shrink px-5   w-full   text-base font-normal text-gray-700  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
                <select
                  onChange={(e) => {
                    dispatch(addRegisterData({ customertype: e.target.value }));
                    setCustomerType(e.target.value);
                  }}
                  value={customerType}
                  className={` form-select   marker:block w-full  text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none border-b border-[#D0D5DD]`}
                >
                  <option className="w-full" value="parent">
                    Parent
                  </option>
                  <option className="w-full" value="student">
                    Student
                  </option>
                </select>
              </div>
            </div>

            {customerType === "student" ? (
              <>
                <div className="form-group flex mt-3 pl-5 pr-5">
                  <input
                    required
                    onChange={(e) => {
                      dispatch(
                        addRegisterData({
                          schoolname: e.target.value,
                        })
                      );

                      setSchoolName(e.target.value);
                    }}
                    type="text"
                    className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding  
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                    placeholder="School / College Name *"
                    defaultValue={registerData?.schoolname || ""}
                  />
                </div>
                <div className="shrink px-5 md:w-full w-full   text-base font-normal text-gray-700  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
                  <select
                    onChange={(e) => {
                      dispatch(addRegisterData({ classes: e.target.value }));
                      setClasses(e.target.value);
                    }}
                    value={classes}
                    className={` form-select   marker:block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat form-group flex  
                border-b border-[#D0D5DD]
                transition
                ease-in-out
                m-0   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD]  focus:outline-none`}
                  >
                    <option className="w-full" value="Class 1">
                      Class 1
                    </option>
                    <option className="w-full" value="Class 2">
                      Class 2
                    </option>
                    <option className="w-full" value="Class 3">
                      Class 3
                    </option>
                    <option className="w-full" value="Class 4">
                      Class 4
                    </option>
                    <option className="w-full" value="Class 5">
                      Class 5
                    </option>
                    <option className="w-full" value="Class 6">
                      Class 6
                    </option>
                    <option className="w-full" value="Class 7">
                      Class 7
                    </option>
                    <option className="w-full" value="Class 8">
                      Class 8
                    </option>
                    <option className="w-full" value="Class 9">
                      Class 9
                    </option>
                    <option className="w-full" value="Class 10">
                      Class 10
                    </option>
                    <option className="w-full" value="Class 11">
                      Class 11
                    </option>
                    <option className="w-full" value="Class 12">
                      Class 12
                    </option>
                    <option className="w-full" value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {classes === "Class 12" || classes === "Class 11" ? (
                  <div className="md:flex justify-between">
                    <div className="shrink px-5   w-full   text-base font-normal text-gray-700  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
                      <select
                        onChange={(e) => {
                          dispatch(addRegisterData({ stream: e.target.value }));
                          setStreams(e.target.value);
                        }}
                        value={streams}
                        className={` form-select   marker:block w-full  text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat px-2 py-1.5   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none border-b border-[#D0D5DD]`}
                      >
                        <option disabled hidden className="w-full" value="">
                          Select Your Stream
                        </option>
                        <option className="w-full" value="Science">
                          Science
                        </option>
                        <option className="w-full" value="Commerce">
                          Commerce
                        </option>
                        <option className="w-full" value="Arts/Humanities">
                          Arts/Humanities
                        </option>
                      </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            <div
              className="form-group flex mt-3 mx-5  
          bg-white bg-clip-padding  
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0"
            >
              <input
                required
                onChange={(e) => {
                  dispatch(
                    addRegisterData({
                      pincode: e.target.value,
                    })
                  );
                  setPincode(e.target.value);
                }}
                type="number"
                className="
          bg-white  focus:outline-none form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700"
                placeholder={"Pincode"}
                defaultValue={registerData?.pincode || ""}
              />
              {/* <button
                ref={infoGenRef}
                onClick={(e) => {
                  e.preventDefault();
                  handleGenerateFromPincode(pincode);
                }}
                className="text-xs p-1 bg-primary text-white m-1 rounded-md"
              >
                Generate
              </button> */}
            </div>
            {/* <div className="form-group flex mt-3 pl-5 pr-5">
              <input
                required
                onChange={(e) =>
                  dispatch(
                    addRegisterData({
                      state: e.target.value,
                    })
                  )
                }
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding  
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="State"
                defaultValue={registerData?.state || ""}
              />
            </div> */}
            {/* <div className="form-group flex mt-3 pl-5 pr-5">
              <input
                required
                onChange={(e) =>
                  dispatch(
                    addRegisterData({
                      city: e.target.value,
                    })
                  )
                }
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding  
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="City"
                defaultValue={registerData?.city || ""}
              />
            </div> */}
            <div className="form-group flex mt-3 pl-5 pr-5">
              <input
                required
                list="area-option-list"
                id="area-choice"
                name="area-choice"
                onChange={(e) =>
                  dispatch(
                    addRegisterData({
                      ...location,
                      area: e.target.value,
                    })
                  )
                }
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding  
          border-b border-[#D0D5DD]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="Area"
                defaultValue={registerData?.area || ""}
              />
              <datalist id="area-option-list">
                {areaOptions.map((category, idx) => {
                  return (
                    <option
                      key={idx}
                      value={category}
                      className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                    />
                  );
                })}
              </datalist>
            </div>

            <div className="flex justify-center mt-4 px-5">
              <p
                onClick={() => setActive(!active)}
                className={
                  active
                    ? "hidden"
                    : "block font-dm-sans text-primary font-medium text-base cursor-pointer"
                }
              >
                Have a Referral Code?
              </p>
              {active && (
                <div className="border border-gray px-4 h-10 w-full rounded-lg flex justify-between items-center">
                  <input
                    value={referral}
                    onChange={(e) => {
                      setReferral(e.target.value);
                      dispatch(
                        addRegisterData({
                          referral: e.target.value,
                        })
                      );
                    }}
                    type="text"
                    placeholder="Referral code"
                    className="w-full outline-none "
                  />
                  <span className="text">{referralError && <Times />}</span>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center pb-3 mt-3 w-full">
              <button
                type="submit"
                onClick={(e) => handleRegister(e)}
                className="font-lg w-full ml-3 mb-5 mr-3 px-2 py-2 mt-5 text-white bg-primary border border-[#D0D5DD] rounded-[10px] active:opacity-75"
              >
                Done
              </button>
            </div>
          </form>
        </section>
      ) : (
        <>
          <div className="p-6 ">
            <p className="text-[#FF0000]-500 text-center">
              You have entered wrong referral !
            </p>

            <div className="flex justify-center flex-col mt-4 px-5 my-10">
              <p
                className={
                  "block font-dm-sans text-primary font-medium text-sm cursor-pointer"
                }
              >
                Enter Referral
              </p>

              <div className="border border-gray px-4 h-10 w-full rounded-lg flex justify-between items-center">
                <input
                  value={referral}
                  onChange={(e) => {
                    setReferral(e.target.value);
                    dispatch(
                      addRegisterData({
                        referral: e.target.value,
                      })
                    );
                  }}
                  type="text"
                  placeholder="Referral code"
                  className="w-full outline-none "
                />
                <span className="text">{referralError && <Times />}</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 ">
              <button
                onClick={() => {
                  continueReferral(true);
                }}
                className="px-4 py-2 bg-green-400 rounded-md whitespace-nowrap"
              >
                Submit referral
              </button>

              <button
                onClick={() => {
                  continueReferral(false);
                }}
                className="px-4 py-2 bg-red-300 rounded-md whitespace-nowrap"
              >
                Cancel referral
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
