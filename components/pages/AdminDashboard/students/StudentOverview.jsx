import React, { useEffect, useRef, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
import { host } from "../../../../utils/constant";
import DropDown from "../Institutes/AdminInstituteDetails/AdminInstituteOverview/DropDown";
import InputField from "../Institutes/AdminInstituteDetails/AdminInstituteOverview/InputField";
import Dropdown from "../../../Dropdown";
import { isEmpty } from "../../../../utils/utils";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdContentCopy } from "react-icons/md";

const StudentOverview = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [studyingAt, setStudyingAt] = useState("");
  const [finished, setFinished] = useState(false);
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [customerType, setCustomerType] = useState("");

  const [stream, setStream] = useState("");
  const [classes, setClasses] = useState("");

  const infoGenRef = useRef(null);

  const [users, setUsers] = useState({});

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

  const [refetch, setRefetch] = useState(false);

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
        const { data } = await axios.get(
          `${host}/users/student?id=${studentId}`,
          config
        );

        setUsers(data.message);
      } catch (err) {}
    };
    run();
  }, [studentId, refetch]);

  useEffect(() => {
    if (!isEmpty(users)) {
      setUserName(users?.name);
      setPhoneNumber(users?.phonenumber);
      setUserEmail(users?.email);
      setStudyingAt(users?.schoolname);
      setState(users?.location?.state);
      setArea(users?.location?.area);
      setAreas(users?.location?.area);
      setCity(users?.location?.city);
      setPincode(users?.location?.pincode);
      setStream(users?.stream);
      setClasses(users?.grade);
      if (users?.customertype === null) {
        setCustomerType("student");
      } else {
        setCustomerType(users?.customertype);
      }

      if (users?.grade !== "Class 11" && users?.grade !== "Class 12") {
        setStream("");
      }
    }
  }, [users]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      id: users.id,
      updates: {
        name: userName,
        phonenumber: phoneNumber,
        email: userEmail,
        location: {
          state: state,
          city: city,
          area: areas,
          pincode: pincode,
        },
        schoolname: studyingAt,
        grade: classes,
        stream: stream,
        customertype: customerType,
      },
    };

    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };

      const { data } = await axios.patch(`${host}/users/`, updateData, config);

      toast.success("Successfully Updated");
      setIsDisable(true);
      setRefetch(true);
      setEdit(false);
    } catch (err) {
      toast.error(err.message);
      setIsDisable(true);
      setEdit(false);
    }
  };

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   
  // };

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (edit) {
      setIsDisable(false);
      handleGenerateFromPincode(pincode);
      setArea(users?.location?.area);
    }
    if (!edit) {
      setRefetch(false);
    }
  }, [edit]);

  return (
    <div>
      <DropDown edit={edit} setEdit={setEdit} title={"Student Basic Details"}>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <div className="">
              <div className="md:flex justify-between">
                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${
                    !userName && !isDisable && "border-red"
                  }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Student Name
                  </p>

                  <input
                    type="text"
                    placeholder={userName}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={userName || ""}
                    disabled={isDisable}
                    name="name"
                    onChange={(e) => handleChange(e, setUserName)}
                  />
                </div>

                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2   ${
                    !phoneNumber && !isDisable && "border-red"
                  }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Student Contact No.
                  </p>

                  <input
                    type="text"
                    placeholder={phoneNumber}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={phoneNumber || ""}
                    disabled={isDisable}
                    name="phonenumber"
                    onChange={(e) => handleChange(e, setPhoneNumber)}
                  />
                </div>
              </div>

              <div className="md:flex justify-between">
                <div
                  className={` shrink md:w-2/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  `}
                >
                  <select
                    onChange={(e) => {
                      setCustomerType(e.target.value);
                    }}
                    disabled={isDisable}
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

              <div className="md:flex justify-between">
                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${
                    !userEmail?.length && !isDisable && "border-red"
                  }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Student Email
                  </p>

                  <input
                    type="text"
                    placeholder={userEmail}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={userEmail || ""}
                    disabled={isDisable}
                    name="email"
                    onChange={(e) => handleChange(e, setUserEmail)}
                  />
                </div>

                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2   ${
                    !studyingAt?.length && !isDisable && "border-red"
                  }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    School / College
                  </p>

                  <input
                    type="text"
                    placeholder={studyingAt}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    value={studyingAt || ""}
                    disabled={isDisable}
                    name="studyingat"
                    onChange={(e) => handleChange(e, setStudyingAt)}
                  />
                </div>
              </div>
            </div>

            <div className="md:flex justify-between">
              <div
                className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${
                  !classes?.length && !isDisable && "border-red"
                }`}
              >
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Classes
                </p>
                {isDisable ? (
                  <input
                    type="text"
                    placeholder={classes}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={classes || ""}
                    disabled={isDisable}
                    name="email"
                    onChange={(e) => handleChange(e, setClasses)}
                  />
                ) : (
                  <select
                    onChange={(e) => handleChange(e, setClasses)}
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
                )}
              </div>

              <div
                className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2   ${
                  !stream?.length && !isDisable && "border-red"
                }`}
              >
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Stream
                </p>

                {isDisable ? (
                  <input
                    type="text"
                    placeholder={stream}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    value={stream || ""}
                    disabled={isDisable}
                    name="stream"
                    onChange={(e) => handleChange(e, setStream)}
                  />
                ) : (
                  <select
                    onChange={(e) => handleChange(e, setStream)}
                    value={stream}
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
                )}
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className=" shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Pincode
                </p>

                <div
                  className={`shrink  py-1 w-full   text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat first-letter:transition ease-in-out m-0 focus:outline-none mt-1 flex`}
                >
                  <input
                    type="text"
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    name="pincode"
                    onChange={(e) => {
                      setPincode(e.target.value);
                    }}
                    value={pincode}
                    disabled={isDisable}
                  />
                  <button
                    ref={infoGenRef}
                    disabled={isDisable}
                    onClick={(e) => {
                      e.preventDefault();
                      handleGenerateFromPincode(pincode);
                    }}
                    className="text-xs p-1 bg-primary text-white m-1 rounded-md"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className=" shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  State{" "}
                </p>
                <input
                  type="text"
                  autoFocus
                  className="text-xl bg-white focus:outline-none w-full  "
                  disabled={isDisable ? true : false}
                  name="state"
                  onChange={(e) => handleChange(e, setState)}
                  value={state}
                />
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  City
                </p>
                <input
                  type="text"
                  autoFocus
                  className="text-xl bg-white   focus:outline-none w-full"
                  disabled={isDisable ? true : false}
                  name="city"
                  onChange={(e) => handleChange(e, setCity)}
                  value={city}
                />
              </div>
              {!isDisable ? (
                <div className=" shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Area{" "}
                  </p>
                  <div className={`w-full flex-col space-y-0`}>
                    {/* <select
                      onChange={(e) => {
                        setArea(e.target.value);
                        setAreas(e.target.value);
                      }}
                      className={` form-select  marker:block w-full  py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
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
                    </select> */}
                    <div className="shrink md:w-3/4 w-full  px-1 py-2   rounded-md text-[14px] font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                      <input
                        list="area-option-list"
                        id="area-choice"
                        name="area-choice"
                        type="text"
                        autoFocus
                        className="text-xl bg-white  focus:outline-none w-full cursor-pointer"
                        onChange={(e) => handleChange(e, setAreas)}
                        value={areas}
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
                  </div>
                </div>
              ) : (
                <div className="shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Area
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    disabled={isDisable ? true : false}
                    name="area"
                    // onChange={(e) => handleChange(e, setCity)}
                    value={area}
                  />
                </div>
              )}
            </div>
          </div>
          {/* <div className="my-5">
            <div className="flex flex-col md:flex-row gap-x-8 justify-between">
              <InputField
                defaultValue={users?.name}
                label={"Student Name"}
                setOnchange={handleChange}
                title="studentNo"
                isReadOnly={edit ? false : true}
              />
              <InputField
                defaultValue={users?.phonenumber}
                label={"Contact No."}
                setOnchange={handleChange}
                title="contactNo"
                type="number"
                isReadOnly={edit ? false : true}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-x-8 justify-between">
              <InputField
                defaultValue={users?.email}
                label={"Email"}
                setOnchange={handleChange}
                title="ifscCode"
                type="email"
                isReadOnly={edit ? false : true}
              />
              <InputField
                defaultValue={users?.studyingat}
                label={"Location"}
                setOnchange={handleChange}
                title="Student School / College"
                isReadOnly={edit ? false : true}
              />
            </div>
          </div> */}
          {users?.formsreferralcode ? (
            <div className="bg-primary/20 p-2 my-3 flex justify-between items-center border-dashed border-2 border-white rounded">
              <p className="text-lg mr-2 ">
                {users?.name}'s Entrance Exam Referral Code :{" "}
                <span>{users?.formsreferralcode}</span>
              </p>
              <p
                className="bg-primary/80 cursor-pointer p-1 text-white rounded flex items-center text-lg"
                onClick={() => {
                  navigator.clipboard.writeText(users?.formsreferralcode);
                  if (navigator.clipboard.writeText(users?.formsreferralcode)) {
                    setCopied(true);
                  }
                }}
              >
                <MdContentCopy className="mr-1" />
                {copied ? "Copied" : "Copy"}
              </p>
            </div>
          ) : (
            ""
          )}

          {edit ? (
            <div className="mb-12 flex flex-col md:flex-row px-3  gap-x-8 justify-end mt-6">
              <button
                className="bg-[#7D23E0] text-white mb-3 rounded-lg md:py-2 py-3 px-5"
                type="submit"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  setIsDisable(true);
                }}
                className="bg-[#E46060] text-white mb-3 rounded-lg md:py-2 py-3 px-5"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="md:hidden block">
              {!edit && (
                <div className="flex justify-center mb-3">
                  <button
                    onClick={() => setEdit(true)}
                    className="text-[14px] flex justify-center items-center px-5 py-1 rounded-full text-white bg-[#4C4C4C]"
                  >
                    <BiEditAlt className="scale-125 mr-2" /> Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </DropDown>
    </div>
  );
};

export default StudentOverview;
