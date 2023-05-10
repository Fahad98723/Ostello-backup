import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { phoneNumberToNumber } from "../../..//utils/utils";
import image from "../../../assets/images/arya.jpeg";
import EntranceExamConfirmation from "../../../components/pages/AdminDashboard/EntranceExam/EntranceExamConfirmation";
import ProfileImageModal from "../../../components/pages/AdminDashboard/EntranceExam/ProfileImageModal";
import Navbar from "../../../components/pages/HomeLanding/Header/Navbar";
import OtpModal from "../../../components/pages/Merchant/Dashboard/Toppers/OtpModal";
import {
  addAccessToken,
  addRefreshToken,
  addUserData,
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import { setUserLocation } from "../../../redux/slices/UserAnalytics";
import { ACCESS_TOKEN, host } from "../../../utils/constant";
import dynamic from "next/dynamic";
const PhoneInput = dynamic(
  () => {
    return import("react-phone-number-input");
  },
  { ssr: false }
);
const EntranceExam = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [name, setName] = useState();
  const [profilePic, setProfilePic] = useState([]);
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [email, setEmail] = useState();

  const [school, setSchool] = useState();
  const [number, setNumber] = useState();
  const [fatherNumber, setFatherNumber] = useState();
  const [motherNumber, setMotherNumber] = useState();
  const [classes, setClasses] = useState("Class 12th");
  const [subject, setSubject] = useState([]);
  const subjectList = ["Physics", "Chemistry", "Maths", "Biology"];

  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [direction, setDirection] = useState("");
  const [areaError, setAreaError] = useState("");
  const [directionError, setDirectionError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const infoGenRef = useRef(null);
  const [line, setLine] = useState("");
  const [exam, setExam] = useState("");
  const [firstNumber, setFirstNumber] = useState("+91");

  const mobileNumRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const [reFetch, setReFetch] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        axios.get(`${host}/exam`, config).then(function (response) {
          setData(response.data.message);
        });
      } catch (err) {}
    };
    run();
  }, [reFetch]);

  const { isAuthenticated, userData } = useSelector(authSelector);
  const { usertype } = userData;

  const router = useRouter();

  useEffect(() => {
    if (userData?.formsreferralcode) {
      router.back();
      toast.success("You Already Filled The Form");
    }
  }, [userData?.formsreferralcode]);

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [physically, setPhysically] = useState("No");
  const [adharCard, setAdharCard] = useState();
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("");

  const { instituteId } = router.query;

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
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => {});
  };

  const handleAdding = async () => {
    if (
      !name ||
      !school ||
      !number ||
      !subject?.length ||
      !fatherName ||
      !motherName ||
      !classes ||
      !line ||
      !area ||
      !pincode ||
      !gender ||
      !birthDate ||
      !physically ||
      !email ||
      !exam
    ) {
      toast.error("Please add every fields");
      return;
    }

    if (!isVerified) {
      toast.error("Please verify applicant number");
      return;
    }
    if (!isAuthenticated) {
      axios
        .get(
          `${host}/users?phonenumber=${phoneNumberToNumber(
            mobileNumRef.current.value
          )}`
        )
        .then(async (res) => {
          if (res.data?.message !== "User not found!") {
            if (res?.data?.message?.usertype !== 3) {
              toast.error("You are not student. Login with this page !");
              return router.push("/merchant/login");
            }

            axios
              .post(`${host}/users/login/phone`, {
                otp: 2154,
                phonenumber: number,
              })
              .then(({ data }) => {
                // setIsVerified(true);
                const { access_token, refresh_token } = data.message;
                dispatch(addAccessToken(access_token));
                dispatch(addRefreshToken(refresh_token));
                axios
                  .get(`${host}/users?phonenumber=${number}`, {
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                  })
                  .then((res) => {
                    dispatch(addUserData(res.data.message));
                    localStorage.setItem("OWNER_ID", res.data.message.id);
                    toast.success("Logged in Successfully");
                    setOpen(true);
                    // handleClose();
                    // router.push({
                    //   pathname: router.pathname,
                    //   query: { ...router.query },
                    // });
                    // router.reload();
                  });
              })
              .catch((err) => {
                toast.error(err.message);
              });
          } else {
            const config = {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            };

            try {
              const registerRes = await axios.post(
                `${host}/users/register`,
                {
                  name: name,
                  email: email,
                  phonenumber: phoneNumberToNumber(number),
                  usertype: 3,
                },
                config
              );

              toast.success("Signed Up Successfully");
              axios
                .post(`${host}/users/login/phone`, {
                  otp: 2154,
                  phonenumber: number,
                })
                .then(async ({ data }) => {
                  // setIsVerified(true)
                  const { access_token, refresh_token } = data.message;
                  // Refferel =>

                  dispatch(addAccessToken(access_token));
                  dispatch(addRefreshToken(refresh_token));

                  axios
                    .get(
                      `${host}/users?phonenumber=${phoneNumberToNumber(
                        number
                      )}`,
                      {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          Authorization: `Bearer ${window.localStorage.getItem(
                            "ACCESS_TOKEN"
                          )}`,
                        },
                      }
                    )
                    .then(async (res) => {
                      dispatch(addUserData(res.data.message));
                      localStorage.setItem("OWNER_ID", res.data.message.id);
                      setOpen(true);
                    });
                });
            } catch (err) {
              toast.error("Error Signing Up!");
            }
          }
        })
        .catch(async (err) => {
          // toast.error("User not exists, Please sign up !");
          const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          };

          try {
            const registerRes = await axios.post(
              `${host}/users/register`,
              {
                name: name,
                email: email,
                phonenumber: phoneNumberToNumber(number),
                usertype: 3,
              },
              config
            );

            toast.success("Signed Up Successfully");
            axios
              .post(`${host}/users/login/phone`, {
                otp: 2154,
                phonenumber: number,
              })
              .then(async ({ data }) => {
                // setIsVerified(true)
                const { access_token, refresh_token } = data.message;
                // Refferel =>

                dispatch(addAccessToken(access_token));
                dispatch(addRefreshToken(refresh_token));

                axios
                  .get(
                    `${host}/users?phonenumber=${phoneNumberToNumber(number)}`,
                    {
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${window.localStorage.getItem(
                          "ACCESS_TOKEN"
                        )}`,
                      },
                    }
                  )
                  .then(async (res) => {
                    dispatch(addUserData(res.data.message));
                    localStorage.setItem("OWNER_ID", res.data.message.id);
                    setOpen(true);
                  });
              });
          } catch (err) {
            toast.error("Error Signing Up!");
          }
        });
    } else {
      setOpen(true);
    }
  };

  return (
    <main>
      <Head>
        <title>Scholarship Entrance Exam- Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-[#F9F5FF]">
        <div className=" md:max-w-[1350px] mx-auto">
          <Navbar text={"text-[#667085]"} />
        </div>
      </div>
      <div className="md:max-w-[1350px] mx-auto">
        <img
          className="w-full mx-auto mb-10 md:h-[550px]"
          src={image.src}
          alt=""
        />
        <p className="text-center text-2xl  md:text-3xl mt-10 font-bold ">
          Registration for Free Doubt Session & Scholarship{" "}
          <span className="text-primary font-bold"> - 2022</span>
        </p>
        <p className="text-center text-xl md:text-2xl mb-10 mt-2  ">
          Get your queries solved by IITian Umesh Jalan & Crack Boards +
          IIT/NEET
        </p>

        <div className="md:p-10 p-5">
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Applicant Name: *</p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Applicant Name"
                onChange={(e) => handleChange(e, setName)}
                value={name}
              />
            </div>
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1"> Date Of Birth: *</p>

              <input
                type="date"
                value={birthDate}
                className="text-xl bg-white uppercase p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Mobile No: *</p>
              <div
                className={`shrink px-2 py-1 text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none border-2 border-solid border-light-gray  w-full  flex`}
              >
                <PhoneInput
                  className="w-10"
                  placeholder="Enter your mobile number"
                  defaultCountry="IN"
                  value={firstNumber}
                  onChange={setFirstNumber}
                  international
                />
                <p className="py-2">{firstNumber}</p>
                <input
                  type="number"
                  autoFocus
                  className="text-xl px-1 bg-white  focus:outline-none w-full"
                  name="Number"
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  ref={mobileNumRef}
                  onChange={(e) => {
                    setNumber(e.target.value);
                    setIsVerified(false);
                  }}
                  value={number}
                />
                <button
                  ref={infoGenRef}
                  onClick={(e) => {
                    axios({
                      method: "get",
                      url: `${host}/auth/otp/generate`,
                      params: {
                        phonenumber: number,
                        // email: emailRef.current.value,
                        //   otp: 2154,
                      },
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                      },
                    })
                      .then((res) => {
                        setModalOpen(true);
                        dispatch(setAuthModalState(6));
                      })
                      .catch((err) => {});
                  }}
                  className="text-xs p-1 px-2 bg-primary text-white m-1 rounded-md"
                >
                  Verify
                </button>
              </div>
            </div>

            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Applicant Email: *</p>
              <input
                type="eamil"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Applicant Email"
                onChange={(e) => handleChange(e, setEmail)}
                value={email}
              />
            </div>
          </div>
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Father's Name: *</p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Father's Name"
                onChange={(e) => handleChange(e, setFatherName)}
                value={fatherName}
              />
            </div>
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Father's Mobile No: *</p>
              <input
                type="number"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Father's Number"
                onChange={(e) => handleChange(e, setFatherNumber)}
                value={fatherNumber}
              />
            </div>
          </div>
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Mother's Name: *</p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Mother's Name"
                onChange={(e) => handleChange(e, setMotherName)}
                value={motherName}
              />
            </div>

            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Mother's Mobile No: *</p>
              <input
                type="number"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Mother's Number"
                onChange={(e) => handleChange(e, setMotherNumber)}
                value={motherNumber}
              />
            </div>
          </div>
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">School Name: * </p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="School Name"
                onChange={(e) => handleChange(e, setSchool)}
                value={school}
              />
            </div>
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Classes Name: * </p>

              <select
                onChange={(e) => setClasses(e.target.value)}
                value={classes}
                className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
              >
                {/* <option className="w-full" selected value="Class 11th">
                  Class 11th
                </option> */}
                <option className="w-full" value="Class 12th">
                  Class 12th
                </option>
              </select>
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Physically Challenged: * </p>
              <select
                onChange={(e) => setPhysically(e.target.value)}
                value={physically}
                className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
              >
                <option className="w-full" selected value="No">
                  No
                </option>
                <option className="w-full" value="Yes">
                  Yes
                </option>
              </select>
            </div>

            {/* <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Adhar Card Number: * </p>
              <input
                type="number"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                disabled={isDisable ? true : false}
                name="Adhar Card Number"
                onChange={(e) => handleChange(e, setAdharCard)}
                value={adharCard}
              />
            </div> */}
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Gender: * </p>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
              >
                <option className="w-full" value="Male">
                  Male
                </option>
                <option className="w-full" value="Female">
                  Female
                </option>
              </select>
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Preparation For: * </p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  onChange={(e) => setExam(e.target.value)}
                  value="Boards"
                  control={<Radio />}
                  label="Boards"
                />
                <FormControlLabel
                  onChange={(e) => setExam(e.target.value)}
                  value="IIT"
                  control={<Radio />}
                  label="IIT"
                />
                <FormControlLabel
                  onChange={(e) => setExam(e.target.value)}
                  value="NEET"
                  control={<Radio />}
                  label="NEET"
                />
                <FormControlLabel
                  onChange={(e) => setExam(e.target.value)}
                  value="Boards + IIT/JEE"
                  control={<Radio />}
                  label="Boards + IIT/JEE"
                />

                <FormControlLabel
                  onChange={(e) => setExam(e.target.value)}
                  value="Boards + NEET"
                  control={<Radio />}
                  label="Boards + NEET"
                />
              </RadioGroup>
            </div>
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Subjects: * </p>
              <Autocomplete
                multiple
                id="tags-standard"
                onChange={(event, newValue) => {
                  setSubject(newValue);
                }}
                value={subject}
                options={subjectList}
                getOptionLabel={(tag) => tag}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    // hiddenLabel
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     setSubject([...subject, e.target.value]);
                    //   }
                    // }}
                    // style={{ backgroundColor:"white" , outline: 'none'}}
                    // className={classes.root}

                    {...params}
                    variant="standard"
                    // placeholder="Subjects"
                  />
                )}
              />
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Address : * </p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
                disabled={isDisable ? true : false}
                name="Address"
                onChange={(e) => handleChange(e, setLine)}
                value={line}
              />
            </div>

            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Pincode: * </p>
              <div
                className={`shrink px-6  py-1 w-full   text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none mt-1 flex`}
              >
                <input
                  type="text"
                  autoFocus
                  className="text-xl bg-white  focus:outline-none w-full"
                  name="Pincode"
                  onChange={(e) => handleChange(e, setPincode)}
                  value={pincode}
                  disabled={isDisable}
                />
                {/* <button
                  ref={infoGenRef}
                  disabled={isDisable}
                  onClick={(e) => {
                    e.preventDefault();
                    handleGenerateFromPincode(pincode);
                  }}
                  className="text-xs p-1 bg-primary text-white m-1 rounded-md"
                >
                  Generate
                </button> */}
              </div>
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">State : * </p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none w-full border-2 border-solid border-light-gray "
                disabled={isDisable ? true : false}
                name="state"
                onChange={(e) => handleChange(e, setState)}
                value={state}
              />
            </div>

            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">City : * </p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
                disabled={isDisable ? true : false}
                name="city"
                onChange={(e) => handleChange(e, setCity)}
                value={city}
              />
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Area : * </p>
              {/* <div className={`w-full flex-col space-y-0`}>
                <select
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                  className={` form-select  marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid border-[#D0D5DD]  shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
                >
                  <option className="w-full" selected value="" disabled>
                    Choose Area
                  </option>
                  {areaOptions.map((category, idx) => {
                    return (
                      <option
                        key={idx}
                        className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                      >
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div> */}
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2  w-full focus:outline-none  border-2 border-solid border-light-gray "
                disabled={isDisable ? true : false}
                name="area"
                onChange={(e) => handleChange(e, setArea)}
                value={area}
              />
            </div>

            <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <p className="text-base mb-1">Referral Code : </p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 w-full  focus:outline-none border-2 border-solid border-light-gray "
                disabled={isDisable ? true : false}
                name="code"
                onChange={(e) => handleChange(e, setCode)}
                value={code}
              />
            </div>
          </div>
          {/* <div className="md:flex justify-between">
            
          </div> */}

          <div className="">
            <div className="bg-primary sm:mb-5 mb-10  w-[100px] m-3 py-2 rounded-md ">
              <button
                // disabled={disable && "disable"}
                className="m-auto w-full bg-primary text-lg font-bold z-50 text-white"
                onClick={() => {
                  handleAdding();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <EntranceExamConfirmation
          open={open}
          setOpen={setOpen}
          data={[
            name,
            school,
            number,
            fatherNumber,
            motherNumber,
            classes,
            subject,
            exam,
            line,
            area,
            pincode,
            city,
            state,
            gender,
            adharCard,
            physically,
            fatherName,
            motherName,
            birthDate,
            profilePic,
            email,
            instituteId,
            code,
          ]}
        />

        <ProfileImageModal
          open={profileOpen}
          setOpen={setProfileOpen}
          name={name}
          setProfilePic={setProfilePic}
          profilePic={profilePic}
          setConfirmOpen={setOpen}
        />

        <OtpModal
          open={modalOpen}
          setOpen={setModalOpen}
          mobilenumber={number}
          setIsVerified={setIsVerified}
          isVerified={isVerified}
        ></OtpModal>
      </div>
    </main>
  );
};

export default EntranceExam;
