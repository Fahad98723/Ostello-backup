import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/pages/HomeLanding/Header/Navbar";
import OstelloSubscribe from "../../../components/pages/HomeLanding/OstelloSubscribe";
import {
  addAccessToken,
  addRefreshToken,
  addUserData,
} from "../../../redux/slices/authSlice";
import {
  addRegisterData,
  selectSignUp,
} from "../../../redux/slices/signUpSlice";
import { host } from "../../../utils/constant";
import { phoneNumberToNumber } from "../../../utils/utils";

const ReferralCodeLink = () => {
  const [isPassShown, setIsPassShown] = useState(true);
  const { registerData } = useSelector(selectSignUp);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [referral, setReferral] = useState("");
  const [referralError, setReferralError] = useState(false);
  const [classes, setClasses] = useState(registerData.classes || "Class 1");
  const [streams, setStreams] = useState(registerData.stream || "Science");
  const [customerType, setCustomerType] = useState("student");

  useEffect(() => {
    if (router?.query?.referrallId) {
      dispatch(
        addRegisterData({
          referralcode: router?.query?.referrallId,
        })
      );
    }
  }, [router?.query?.referrallId]);

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

  const [schoolName, setSchoolName] = useState(registerData.schoolname);

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
      const data = {
        schoolname:
          registerData.customertype === "student" || customerType === "student"
            ? registerData.schoolname || schoolName
            : "",
        location: {
          area: registerData.area,
          pincode: registerData.pincode,
        },
        grade:
          registerData.customertype === "student" || customerType === "student"
            ? registerData.classes || classes
            : "",
        stream:
          registerData.customertype === "student" || customerType === "student"
            ? registerData.stream || streams
            : "",
        usertype: 3,
        customertype: registerData.customertype || customerType,
        referralCode: registerData.referralcode,
      };

      const registerRes = await axios.post(
        `${host}/users/register`,
        data,
        config
      );
      toast.success("Signed Up Successfully");

      axios
        .post(`${host}/users/login/phone`, {
          otp: 2000,
          phonenumber: registerData.phonenumber,
        })

        .then(async ({ data }) => {
          // setIsVerified(true)
          const { access_token, refresh_token } = data.message;
          // Refferel =>

          dispatch(addAccessToken(access_token));
          dispatch(addRefreshToken(refresh_token));

          axios
            .get(`${host}/users?phonenumber=${registerData.phonenumber}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${
                  typeof window !== "undefined" &&
                  window.localStorage.getItem("ACCESS_TOKEN")
                }`,
              },
            })
            .then(async (res) => {
              dispatch(addUserData(res.data.message));
              localStorage.setItem("OWNER_ID", res.data.message.id);

              // dispatch(setAuthModalState(8));
              router.push("/");
              typeof window !== "undefined" && window.location.reload();
            });
        });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error("Your email already exist");
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <main className="md:max-w-[1350px] mx-auto ">
      <div className="md:fixed md:top-0 md:z-50 md:bg-white md:max-w-[1350px] w-full mx-auto md:shadow md:rounded-xl">
        <Navbar />
      </div>

      <div className="  md:w-[370px] w-[300px] mx-auto md:mt-[100px]">
        <section className="bg-white  rounded-[10px]">
          <div className="flex text-white rounded-t-[5px] bg-primary h-[80px] justify-center items-center">
            <div className="text-center flex flex-col w-full">
              <div className="flex justify-center items-center mt-3">
                <span className="text-[18px] font-bold">Complete Details</span>
                {/* <p
                  className="cursor-pointer text-[16px] font-bold pr-3"
                  onClick={handleClose}
                >
                  x
                </p> */}
              </div>
              <p className="text-[12px] pr-3 pl-3 ">
                You’re just one step away from signing up
              </p>
              <p className="text-[13px] pr-3 pl-3 pb-5 font-bold">
                Sign up and get Cashback!
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
            </div>
            <div className="form-group pl-5 pr-5 mt-3">
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
            </div>
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
                value={registerData?.phonenumber || ""}
              />
            </div>

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
                    onChange={(e) =>
                      dispatch(
                        addRegisterData({
                          schoolname: e.target.value,
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
                    placeholder="School / College"
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
            </div>

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
                      referralcode: e.target.value,
                    })
                  );
                }}
                type="text"
                className="
          bg-white  focus:outline-none form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700"
                placeholder={"Referral Code"}
                defaultValue={registerData?.referralcode || ""}
              />
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
      </div>

      <div className="md:mt-[50px]">
        {/* <CoursesAndInstitutes /> */}
        <OstelloSubscribe />
        <Footer />
      </div>
    </main>
  );
};

export default ReferralCodeLink;
