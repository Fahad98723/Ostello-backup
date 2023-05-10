import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { ACCESS_TOKEN, host } from "../../utils/constant";
import OtpModal from "../pages/Merchant/Dashboard/Toppers/OtpModal";
import {
  addAccessToken,
  addRefreshToken,
  addUserData,
  authSelector,
} from "../../redux/slices/authSlice";
import { phoneNumberToNumber } from "../utils";
import FreeRegisterPayment from "./FreeRegisterPayment";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { InstiutesWith99 } from "../CochingWith99/Data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};

const FreeRegistrationForm = () => {
  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "25%",
     
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "50%",
        overflowY: "scroll!important",
      },
    },
  });
  const { modalBox } = useStyle();

  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [classes, setClasses] = useState("");
  const [streams, setStreams] = useState("");
  const [gender, setGender] = useState("");
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [email, setEmail] = useState();

  const [school, setSchool] = useState();
  const [number, setNumber] = useState();
  const [fatherNumber, setFatherNumber] = useState();
  const [motherNumber, setMotherNumber] = useState();
  const [subject, setSubject] = useState([]);
  const subjectList = ["Physics", "Chemistry", "Maths", "Biology"];
  const [referralCode, setReferralCode] = useState(null);
  const [awareOfOstello, setAwareOfOstello] = useState("");

  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [direction, setDirection] = useState("");
  const [areaError, setAreaError] = useState("");
  const [directionError, setDirectionError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [institutes, setInstitutes] = useState();
  const [allInstitutes, setAllInstutes] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
   

    //99 ta courses institutes lists add from here

    let institutesData = [];

    InstiutesWith99.forEach(async (e) => {
      const { data } = await axios.get(`${host}/institute?id=${e}`);

      if (data.message) {
        institutesData.push(data?.message);
      }

      if (institutesData.length === 38) {
        setAllInstutes(institutesData);
      }
    });

    // setAllInstitutes(instituteData);
    // setInstitutes(instituteData);
  }, []);

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const infoGenRef = useRef(null);
  const [line, setLine] = useState("");
  const [exam, setExam] = useState("");
  const [firstNumber, setFirstNumber] = useState("+91");
  const mobileNumRef = useRef(null);

  const { isAuthenticated, userData } = useSelector(authSelector);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };



  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/coaching-in-99");
    }
  }, [isAuthenticated]);

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
      .catch((err) => {

      });
  };

  const [isVerified, setIsVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

 

  const [success, setSuccess] = useState(false);
  const handleSuccess = () => {
    setSuccess(true);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = async () => {
    setOpenModal(false);
    if(success){
      router.push('/free-registration-form/success')
    }
  };

  

  // const handleRegister = async () => {
  //   const config = {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };

  //   

  //   if (!isAuthenticated) {
  //     
  //     if (!name || !email || !number || !pincode || !city || !area || !institutes) {
  //       toast.error("Please fill every data");
  //       return;
  //     }
  //     axios
  //       .get(
  //         `${host}/users?phonenumber=${phoneNumberToNumber(
  //           mobileNumRef.current.value
  //         )}`
  //       )
  //       .then(async (res) => {
  //         if (res.data?.message !== "User not found!") {
  //           if (res?.data?.message?.usertype !== 3) {
  //             toast.error("You are not student. Login with this page !");
  //             return router.push("/merchant/login");
  //           }

  //           axios
  //             .post(`${host}/users/login/phone`, {
  //               otp: 2154,
  //               phonenumber: number,
  //             })
  //             .then(({ data }) => {
  //               
  //               // setIsVerified(true);
  //               const { access_token, refresh_token } = data.message;
  //               dispatch(addAccessToken(access_token));
  //               dispatch(addRefreshToken(refresh_token));
  //               axios
  //                 .get(`${host}/users?phonenumber=${number}`, {
  //                   headers: {
  //                     "Access-Control-Allow-Origin": "*",
  //                     Authorization: `Bearer ${ACCESS_TOKEN}`,
  //                   },
  //                 })
  //                 .then((res) => {
  //                   
  //                   dispatch(addUserData(res.data.message));
  //                   localStorage.setItem("OWNER_ID", res.data.message.id);
  //                   toast.success("Logged in Successfully");
  //                   handleModalOpen();
  //                 });
  //             })
  //             .catch((err) => {
  //               
  //               toast.error("Error logging in!");
  //             });
  //         } else {
  //           // if (!isVerified) {
  //           //   toast.error("Please verify your phone number");
  //           //   return;
  //           // }

  //           try {
  //             const data = {
  //               name: name,
  //               email: email,
  //               phonenumber: phoneNumberToNumber(number),
  //               schoolname: schoolName,
  //               location: {
  //                 city: city,
  //                 state: state,
  //                 area: area,
  //                 pincode: pincode,
  //               },

  //               usertype: 3,
  //               registrationtype: "class_at_99_form",
  //               stream: streams || null,
  //             };
  //             
  //             await axios.post(
  //               `${host}/users/register`,
  //               data,
  //               config
  //             )
  //             .then(() => {
  //               toast.success("Signed Up Successfully");
  //             axios
  //               .post(`${host}/users/login/phone`, {
  //                 otp: 2355,
  //                 phonenumber: number,
  //               })

  //               .then(async ({ data }) => {
  //                 
  //                 // setIsVerified(true)
  //                 const { access_token, refresh_token } = data.message;
  //                 // Refferel =>

  //                 dispatch(addAccessToken(access_token));
  //                 dispatch(addRefreshToken(refresh_token));

  //                 axios
  //                   .get(`${host}/users?phonenumber=${number}`, {
  //                     headers: {
  //                       "Access-Control-Allow-Origin": "*",
  //                       Authorization: `Bearer ${window.localStorage.getItem(
  //                         "ACCESS_TOKEN"
  //                       )}`,
  //                     },
  //                   })
  //                   .then(async (res) => {
  //                     dispatch(addUserData(res.data.message));
  //                     localStorage.setItem("OWNER_ID", res.data.message.id);
  //                     // dispatch(setAuthModalState(8));
  //                   });
  //               });
  //             })
  //           } catch (err) {
  //             
  //             if (err.response.status === 409) {
  //               toast.error("Your email already exist");
  //             } else {
  //               toast.error(err.message);
  //             }
  //           }
  //         }
  //       })
  //       .catch(async (err) => {
  //         // toast.error("User not exists, Please sign up !");
  //         const config = {
  //           headers: {
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //         };

  //         try {
  //           const data = {
  //             name: name,
  //             email: email,
  //             phonenumber: phoneNumberToNumber(number),
  //             usertype: 3,
  //             schoolname: schoolName,
  //             location: {
  //               city: city,
  //               state: state,
  //               area: area,
  //               pincode: pincode,
  //             },

  //             usertype: 3,
  //             registrationtype: "class_at_99_form",
  //             stream: streams || null,
  //           }

  //           
  //           await axios
  //             .post(
  //               `${host}/users/register`,
  //               data,
  //               config
  //             )
  //             .then(() => {

  //               toast.success("Signed Up Successfully");

  //               axios
  //                 .post(`${host}/users/login/phone`, {
  //                   otp: 2154,
  //                   phonenumber: number,
  //                 })
  //                 .then(async ({ data }) => {
  //                   
  //                   // setIsVerified(true)
  //                   const { access_token, refresh_token } = data.message;
  //                   // Refferel =>

  //                   dispatch(addAccessToken(access_token));
  //                   dispatch(addRefreshToken(refresh_token));

  //                   axios
  //                     .get(
  //                       `${host}/users?phonenumber=${phoneNumberToNumber(
  //                         number
  //                       )}`,
  //                       {
  //                         headers: {
  //                           "Access-Control-Allow-Origin": "*",
  //                           Authorization: `Bearer ${window.localStorage.getItem(
  //                             "ACCESS_TOKEN"
  //                           )}`,
  //                         },
  //                       }
  //                     )
  //                     .then(async (res) => {
  //                       dispatch(addUserData(res.data.message));
  //                       localStorage.setItem("OWNER_ID", res.data.message.id);
  //                       handleModalOpen();
  //                     });
  //                 });
  //             });
  //         } catch (err) {
  //           
  //           toast.error(err.message);
  //         }
  //       });
  //   }
  // };

  const handleRegister = () => {
    if (isAuthenticated && userData.usertype === 3) {
      if (
        !name ||
        !fatherName ||
        !number ||
        !schoolName ||
        !awareOfOstello ||
        !institutes
      ) {
        toast.error("Please fill every data");
        return;
      }
      handleModalOpen();
    } else {
      toast.error("You are not student");
      return router.push("/");
    }
  };



  return (
    <div>
      <main className="md:max-w-[1350px] mx-auto my-10">
        <h1> Registration Form</h1>
        <p>
          Get your desired coaching in your local area at Just Rs.99 for one
          month register for free and get an instant call from our experts.
        </p>

        <div className="my-5">
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
              <p className="text-base mb-1">Name: *</p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                name="Name"
                onChange={(e) => handleChange(e, setName)}
                value={name}
              />
            </div>
            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1">
              <p className="text-base mb-1">Father's Name: *</p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                name="Father's Name"
                onChange={(e) => handleChange(e, setFatherName)}
                value={fatherName}
              />
            </div>
          </div>
          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
              <p className="text-base mb-1">Class: * </p>

              <select
                onChange={(e) => setClasses(e.target.value)}
                value={classes}
                className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
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

            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
              <p className="text-base mb-1">School Name: *</p>
              <input
                type="text"
                autoFocus
                className="text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                name="School Name"
                onChange={(e) => handleChange(e, setSchoolName)}
                value={schoolName}
              />
            </div>
          </div>
          {classes === "Class 12" || classes === "Class 11" ? (
            <div className="md:flex justify-between">
              <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
                <p className="text-base mb-1">Streams Name: * </p>

                <select
                  onChange={(e) => setStreams(e.target.value)}
                  value={streams}
                  className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
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

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
              <p className="text-base mb-1">Father's Mobile No: *</p>
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
                {/* <button
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
                      .catch((err) => {
                        
                      });
                  }}
                  className="text-xs p-1 px-2 bg-primary text-white m-1 rounded-md"
                >
                  Verify
                </button> */}
              </div>
            </div>

            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
              <p className="text-base mb-1">Institutes Name: * </p>

              <select
                onChange={(e) => setInstitutes(e.target.value)}
                value={institutes}
                className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
              >
                <option
                  className="w-full text-xs sm:text-sm"
                  selected
                  value=""
                  disabled
                  hidden
                >
                  Select Institute
                </option>
                {allInstitutes.map((a) => {
                  return (
                    <option key={a.id} className="w-full" value={a.id}>
                      {a.name}
                    </option>
                  );
                })}
                <option className="w-full" value="Others">
                  Others
                </option>
              </select>
            </div>
          </div>

          <div className="md:flex justify-between">
            <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 ">
              <p className="text-base mb-1">
                How were you made aware of Ostello?
              </p>

              <select
                onChange={(e) => setAwareOfOstello(e.target.value)}
                value={awareOfOstello}
                className={` form-select   marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
              >
                <option
                  className="w-full text-xs sm:text-sm"
                  selected
                  value=""
                  disabled
                  hidden
                >
                  Aware of ostello
                </option>
                <option className="w-full" value="Friend">
                  Friend
                </option>
                <option className="w-full" value="Social Media">
                  Social Media
                </option>
                <option className="w-full" value="Pamphlets">
                  Pamphlets
                </option>
                <option className="w-full" value="Coaching Institutes ">
                  Coaching Institutes
                </option>
              </select>
            </div>
            {awareOfOstello === "Friend" ? (
              <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Referral Code : * </p>
                <input
                  type="text"
                  autoFocus
                  className="text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
                  name="referal code"
                  onChange={(e) => handleChange(e, setReferralCode)}
                  value={referralCode}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <div className="bg-primary mb-10  w-[100px] m-3 py-2 rounded-md ">
              <button
                // disabled={disable && "disable"}
                className="m-auto w-full bg-primary text-lg font-bold z-50 text-white"
                onClick={() => {
                  handleRegister();
                  // handleModalOpen();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={modalBox}>
          <FreeRegisterPayment
            handleModalClose={handleModalClose}
            handleSuccess={handleSuccess}
            success={success}
            name={name}
            email={email}
            phonenumber={number}
            institutes={institutes}
            setOpenModal={setOpenModal}
            referralCode={referralCode}
            schoolName={schoolName}
            classes={classes}
            fathersname={fatherName}
            referrealtype={awareOfOstello}
            stream={streams}
          />
        </Box>
      </Modal>

      <OtpModal
        open={modalOpen}
        setOpen={setModalOpen}
        mobilenumber={number}
        setIsVerified={setIsVerified}
        isVerified={isVerified}
      ></OtpModal>
    </div>
  );
};

export default FreeRegistrationForm;
