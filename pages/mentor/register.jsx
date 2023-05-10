import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import topResBg from "../../assets/mentor/resBg.svg";
import Feedback from "../../components/pages/Mentor/Feedback";
import OstelloFAQ from "../../components/pages/HomeLanding/OstelloFAQ";
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AuthModal from "../../components/pages/HomeLanding/Header/Navbar/AuthModal";
import { toast } from "react-hot-toast";
import {
  authSelector,
  setAuthModalState,
  updatePercentage,
} from "../../redux/slices/authSlice";
import axios from "axios";
import { host } from "../../utils/constant";
import { AiFillFilePdf, AiFillFileText } from "react-icons/ai";
import { TiDelete, TiDeleteOutline } from "react-icons/ti";
import PropTypes from "prop-types";
import { FileUploader } from "../../utils/utils";
import { GrFormClose } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { Autocomplete, TextField } from "@mui/material";
const MentorRegister = () => {
  const [isWork, setIsWork] = useState("");
  const [field, setField] = useState("");
  const [selectField, setSelectField] = useState("");
  const [selectInterests, setSelectInterests] = useState([]);
  const [interest, setInterest] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [openFieldSubgroup, setOpenFieldSubgroup] = useState(false);
  const [openInterestSubgroup, setOpenInterestSubgroup] = useState(false);
  const [yes, setYes] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mentorInstitute, setMentorInstitute] = useState("");
  const { isAuthenticated, userData } = useSelector(authSelector);
  const [mentorsFields, setMentorsFields] = useState([]);
  const [mentorsInterests, setMentorsInterests] = useState([]);
  const [optionSelected, setOptionSelected] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  // const inputFile = useRef(null)
  const works = [{ name: "Yes" }, { name: "No" }];
  const fields = [
    { name: "Engineering" },
    { name: "Medical" },
    { name: "Commerce" },
    { name: "Humanities" },
    { name: "Others" },
  ];
  const interests = [
    { name: "Engineering" },
    { name: "Medical" },
    { name: "Commerce" },
    ,
    { name: "Humanities" },
    { name: "Others" },
  ];

  const fieldsForEngineering = [
    "IIT/JEE",
    "Computer Science",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil",
    "Structural",
    "Mechanical",
    "Aerospace",
    "Programming",
    "Petroleum",
    "Artificial intelligence and machine learning",
    "Others",
  ];

  const fieldsForHumanities = [
    "History",
    "Economics",
    "Political Science",
    "Sociology",
    "UPSC (Civil Services)",
    "English Literature",
    "Journalism",
    "Psychology",
    "Others",
  ];

  const fieldsForMedical = [
    "NEET",
    "Biotechnology",
    "Bachelor of Medicine, Bachelor of Surgery - MBBS",
    "Nurse Practitioner",
    "Dentist",
    "Neurology",
    "Others",
  ];

  const fieldsForCommerce = [
    "Accountancy",
    "Business studies",
    "Entrepreneurship",
    "Finance",
    "Management",
    "Data analytics",
    "B.COM",
    "BBA",
    "CA/CS",
    "CFA",
    "Actuarial Science",
    "BBA - IB",
    "Others",
  ];

  useEffect(() => {
    if (field === "Engineering") {
      setOpenFieldSubgroup(true);
      setMentorsFields(fieldsForEngineering);
    } else if (field === "Medical") {
      setOpenFieldSubgroup(true);
      setMentorsFields(fieldsForMedical);
    } else if (field === "Commerce") {
      setOpenFieldSubgroup(true);
      setMentorsFields(fieldsForCommerce);
    } else if (field === "Humanities") {
      setOpenFieldSubgroup(true);
      setMentorsFields(fieldsForHumanities);
    } else if (field === "Others" || selectField === "Others") {
      setOpenFieldSubgroup(true);
    }
    if (interest === "Engineering") {
      setOpenInterestSubgroup(true);
      setMentorsInterests(fieldsForEngineering);
    } else if (interest === "Medical") {
      setOpenInterestSubgroup(true);
      setMentorsInterests(fieldsForMedical);
    } else if (interest === "Commerce") {
      setOpenInterestSubgroup(true);
      setMentorsInterests(fieldsForCommerce);
    } else if (interest === "Humanities") {
      setOpenInterestSubgroup(true);
      setMentorsInterests(fieldsForHumanities);
    } else if (interest === "Others") {
      setOpenInterestSubgroup(true);
    }
  }, [field, interest]);
  const wrapperRef = useRef(null);

  const onFileChange = (files) => {};

  const [fileList, setFileList] = useState([]);

  const onDragEnter = (e) => {
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = (e) => {
    wrapperRef.current.classList.remove("dragover");
  };

  const imageInputRef = React.useRef({});

  const onDrop = (e) => {
    wrapperRef.current.classList.remove("dragover");
  };

  const uploadFiles1 = () => {
    const myFile = document.getElementById("myFile1");
    myFile.click();
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const [addUnitDesc, setAddUnitDesc] = useState([
    {
      name: "",
      position: "",
      period: "",
    },
  ]);
  const [addUnitDesc2, setAddUnitDesc2] = useState([
    {
      timeslot: "",
      date: "",
    },
  ]);

  const addInputs = () => {
    setAddUnitDesc((prev) =>
      prev?.concat({
        name: "",
        position: "",
        period: "",
      })
    );
  };
  const addInputs2 = () => {
    setAddUnitDesc2((prev) =>
      prev?.concat({
        timeslot: "",
        date: "",
      })
    );
  };

  const deleteInputs = (i) => {
    if (i > -1)
      setAddUnitDesc((prev) => {
        const temp = [];
        prev.forEach((box, idx) => {
          if (idx !== i) temp.push(box);
        });

        return temp;
      });
  };
  const deleteInputs2 = (i) => {
    if (i > -1)
      setAddUnitDesc2((prev) => {
        const temp = [];
        prev.forEach((box, idx) => {
          if (idx !== i) temp.push(box);
        });

        return temp;
      });
  };

  const handleUnitDescInputChange = (e, index) => {
    if (e?.target) {
      const { name, value } = e.target;

      const old = addUnitDesc[index];
      const updated = { ...old, [name]: value };

      var list = [...addUnitDesc];
      list[index] = updated;
      setAddUnitDesc(list);
    } else {
      const old = addUnitDesc[index];
      const updated = { ...old, description: e };

      var list = [...addUnitDesc];
      list[index] = updated;
      setAddUnitDesc(list);
    }
  };

  const handleUnitDescInputChange2 = (e, index) => {
    if (e?.target) {
      const { name, value } = e.target;
      const old = addUnitDesc2[index];
      const updated = { ...old, [name]: value };

      var list = [...addUnitDesc2];
      list[index] = updated;
      setAddUnitDesc2(list);
    } else {
      const old = addUnitDesc2[index];
      const updated = { ...old, description: e };

      var list = [...addUnitDesc2];
      list[index] = updated;
      setAddUnitDesc2(list);
    }
  };

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const handleSubmit = async () => {
    if (
      !selectField?.length ||
      !interest?.length ||
      !name?.length ||
      !number?.length ||
      !email?.length ||
      !description?.length ||
      !experience?.length ||
      !qualification?.length
    ) {
      toast.error("Please fill the fields");
      return;
    }
    const imageUploadStarted = toast.loading("Uploading please wait ...");
    let images = await FileUploader([fileList[0]], (percent) =>
      dispatch(updatePercentage(percent))
    );

    if (images) {
      toast.remove(imageUploadStarted);
      toast.success("successfully uploaded.");
    }
    const d = {
      name: name,
      email: email,
      phonenumber: number,
      field: field,
      field_options: selectField,
      interests: interest,
      qualification: qualification,
      avatar: images[0],
      description: description,
      total_experience: experience,
      experience: addUnitDesc,
      availability: addUnitDesc2,
      specialization: specialization,
    };
    if (mentorInstitute?.length > 0) {
      d.institute = mentorInstitute;
    }
    if (linkedin?.length > 0) {
      d.linkedin = linkedin;
    }

    try {
      const data = await axios.post(`${host}/mentor/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });

      toast.success(
        "Thank you, We have received your submission successfully."
      );
      setName("");
      setNumber("");
      setEmail("");
      setField("");
      setInterest("");
      setLinkedin("");
      setQualification("");
      setDescription("");
      setFileList([]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      // window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <section className="">
      <AuthModal handleClose={handleClose} open={open} />
      <div className=" md:max-w-[1350px]  mx-auto ">
        <div className="">
          <Navbar text={"text-[#667085]"} />
        </div>
        <div className="w-[433px] md:w-full md:h-[672px] h-[664px] flex items-center justify-center bg-gradient-to-r from-[#7D23E0] to-[#FF9A3C] bg-cover py-10 px-5">
          <div className="flex flex-col items-center md:mt-20">
            <p className="text-[45px] text-white md:text-center text-start md:mt-5 mt-20 md:ml-0 ml-8">
              Become a <span className="text-[56px]">OSTELLO</span> Mentor
            </p>
            <img
              src={topResBg.src}
              alt=""
              className="md:w-[600px] md:h-[450px] w-[334px] h-[250px] md:mt-0 mt-20 mb-[-33px]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-[433px] md:w-full mt-20">
          <p className="md:text-[46px] text-[25px] font-bold text-center">
            Apply to be a mentor
          </p>
          <p className="md:text-[33px] text-[16px] text-center mt-1">
            How would you like to mentor the community?
          </p>
          <p className="md:text-[33px] text-[20px] font-bold text-center mt-10">
            Fill these basic details to continue
          </p>
          <div className="flex flex-col items-center mt-5">
            <form
              // onSubmit={() => {
              //   dispatch(setSearchQuery(searchField));
              //   router.push(`/search`);
              // }}
              // ref={domNode}
              // style={style}
              className="flex items-center flex-col"
            >
              <input
                // onClick={() => setSearchShow(true)}
                className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                type="text"
                onChange={(e) => handleChange(e, setName)}
                defaultValue={name || ""}
                placeholder="Name"
              />
              <input
                // onClick={() => setSearchShow(true)}
                className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                type="email"
                onChange={(e) => handleChange(e, setEmail)}
                defaultValue={email || ""}
                placeholder="Email"
              />
              <input
                // onClick={() => setSearchShow(true)}
                className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                type="number"
                onChange={(e) => handleChange(e, setNumber)}
                defaultValue={number || ""}
                placeholder="Number"
              />
              {/* <div className="form-group">
                <select
                  id="large"
                  onChange={(e) => e.target.value === "Yes" ? setYes(true) : (setYes(false), setIsWork(e.target.value))}
                  value={isWork}
                  className="md:w-[700px] w-[252px] md:py-7 py-3 px-5 md:text-[20px] search md:placeholder:text-[25px] placeholder:text-[12px] placeholder:text-[#252525] rounded text-[14px] text-[#252525] mt-5 border border-1 border-[#C4C4C4] gap-10"
                >
                  <option
                    className="md:w-9/12 w-[252px] placeholder:text-[12px] placeholder:text-[#252525] text-[#252525] bg-white"
                    selected
                    value=""
                    disabled
                    hidden
                  >
                    Do you work in any institute
                  </option>
                  {works.map((a, idx) => {
                    return (
                      <option
                        key={idx}
                        className="w-full md:text-[20px] leading-6 font-normal text-black rounded cursor-pointer md:h-[83px] h-[44px] z-50 absolute py-10"
                      >
                        {a?.name}
                      </option>
                    );
                  })}
                </select>
              </div> */}
              {yes && (
                <input
                  // onClick={() => setSearchShow(true)}
                  className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                  type="text"
                  onChange={(e) => handleChange(e, setMentorInstitute)}
                  defaultValue={mentorInstitute || ""}
                  placeholder="Type your Institute Name"
                />
              )}
              <div className="form-group">
                <select
                  onChange={(e) => handleChange(e, setField)}
                  value={field}
                  className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text-[25px] placeholder:text-[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                >
                  <option
                    className="md:w-9/12 w-[252px] text-[#252525] bg-white py-10"
                    selected
                    value=""
                    disabled
                    hidden
                  >
                    Choose your Field
                  </option>
                  {fields?.map((a, idx) => {
                    return (
                      <option
                        key={idx}
                        className="md:w-full w-[252px] md:text-[20px] font-normal text-[#252525] rounded cursor-pointer md:h-[400px] z-50 absolute py-10"
                      >
                        {a?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {openFieldSubgroup &&
                (field === "Others" || selectField === "Others" ? (
                  <input
                    // onClick={() => setSearchShow(true)}
                    className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                    type="text"
                    onChange={(e) => handleChange(e, setSelectField)}
                    defaultValue={""}
                    placeholder="Type your field option"
                  />
                ) : (
                  <div className="form-group">
                    <select
                      onChange={(e) => handleChange(e, setSelectField)}
                      value={selectField || ""}
                      className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text-[25px] placeholder:text-[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                    >
                      <option
                        className="md:w-9/12 w-[252px] text-[#252525] bg-white py-10"
                        selected
                        value=""
                        disabled
                        hidden
                      >
                        Choose your field option
                      </option>
                      {mentorsFields?.map((a, idx) => {
                        return (
                          <option
                            key={idx}
                            className="md:w-full w-[252px] md:text-[20px] font-normal text-[#252525] rounded cursor-pointer md:h-[400px] z-50 absolute py-10"
                          >
                            {a}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ))}

              <input
                // onClick={() => setSearchShow(true)}
                className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                type="text"
                onChange={(e) => handleChange(e, setSpecialization)}
                defaultValue={specialization || ""}
                placeholder="Your Specialization"
              />
              <div className="form-group">
                <input
                  // onClick={() => setSearchShow(true)}
                  className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                  type="text"
                  onChange={(e) => handleChange(e, setQualification)}
                  defaultValue={qualification || ""}
                  placeholder="Highest Qualification"
                />
              </div>
              <div className="form-group">
                <input
                  // onClick={() => setSearchShow(true)}
                  className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                  type="text"
                  onChange={(e) => handleChange(e, setExperience)}
                  defaultValue={experience || ""}
                  placeholder="Total Experience"
                />
              </div>
              <div className="form-group border border-1 mt-5 border-[#C4C4C4] md:w-[700px] w-[252px] rounded-[5px] ">
                <p className="text-[20px] px-5 py-3">Experiences</p>
                {addUnitDesc?.map((inputs, index) => (
                  <div key={`${Math.floor(Math.random() * 1000)}-min`}>
                    <RiDeleteBinLine
                      className=" w-7 h-7 p-1   rounded-full mr-5 ml-auto text-[#E46060] mt-2 cursor-pointer"
                      onClick={() => {
                        deleteInputs(index);
                      }}
                      style={{ backgroundColor: "rgba(228, 96, 96, 0.15)" }}
                    />

                    <div className=" items-center gap-4 pl-5 pr-5 pt-3">
                      <input
                        // onClick={() => setSearchShow(true)}
                        className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] w-full py-2 text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                        type="text"
                        // disabled={!edit && 'disabled'}
                        placeholder="Name"
                        defaultValue={inputs.name}
                        name="name"
                        onBlur={(e) => {
                          handleUnitDescInputChange(e, index);
                        }}
                      />
                      <input
                        // onClick={() => setSearchShow(true)}
                        className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] w-full py-2 mt-5 border border-1 border-[#C4C4C4]"
                        type="text"
                        // disabled={!edit && 'disabled'}
                        placeholder="Position"
                        defaultValue={inputs.position}
                        name="position"
                        onBlur={(e) => {
                          handleUnitDescInputChange(e, index);
                        }}
                      />
                      <input
                        // onClick={() => setSearchShow(true)}
                        className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] w-full py-2 text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                        type="text"
                        // disabled={!edit && 'disabled'}
                        placeholder="Period"
                        defaultValue={inputs.period}
                        name="period"
                        onBlur={(e) => {
                          handleUnitDescInputChange(e, index);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="px-5">
                  <button
                    className="bg-[#0D293F] mr-5  text-white 
             p-3 rounded-[8px] my-6 ml-auto"
                    onClick={(event) => {
                      addInputs();
                    }}
                  >
                    + Add More
                  </button>
                </div>
              </div>
              <div className="form-group border border-1 mt-5 border-[#C4C4C4] md:w-[700px] w-[252px] rounded-[5px] ">
                <p className="text-[20px] px-5 py-3">Availability</p>
                {addUnitDesc2?.map((inputs, index) => (
                  <div key={`${Math.floor(Math.random() * 1000)}-min`}>
                    <RiDeleteBinLine
                      className=" w-7 h-7 p-1   rounded-full mr-5 ml-auto text-[#E46060] mt-2 cursor-pointer"
                      onClick={() => {
                        deleteInputs2(index);
                      }}
                      style={{ backgroundColor: "rgba(228, 96, 96, 0.15)" }}
                    />

                    <div className=" items-center gap-4 pl-5 pr-5 pt-3">
                      <input
                        className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] w-full py-2 text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                        type="text"
                        placeholder="Times Slot"
                        defaultValue={inputs.timeslot}
                        name="timeslot"
                        onBlur={(e) => {
                          handleUnitDescInputChange2(e, index);
                        }}
                      />
                      <input
                        className=" px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] w-full py-2 mt-5 select-none form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat   border border-1 border-[#C4C4C4]"
                        type="text"
                        placeholder="Date"
                        defaultValue={inputs.date}
                        name="date"
                        onBlur={(e) => {
                          handleUnitDescInputChange2(e, index);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="px-5">
                  <button
                    className="bg-[#0D293F] mr-5  text-white 
             p-3 rounded-[8px] my-6 ml-auto"
                    onClick={(event) => {
                      addInputs2();
                    }}
                  >
                    + Add More
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className=" mt-10">
            <p className="md:text-[33px] text-[20px] font-bold text-start mt-10">
              Interests
            </p>
            <div className="form-group mt-3">
              <Autocomplete
                multiple
                id="tags-standard"
                onChange={(event, newValue) => {
                  setInterest(newValue);
                }}
                value={interest}
                options={interest}
                getOptionLabel={(tag) => tag}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    hiddenLabel
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setInterest([...interest, e.target.value]);
                      }
                    }}
                    // style={{ backgroundColor:"white" , outline: 'none'}}
                    // className={classes.root}
                    {...params}
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select You Interest"
                  />
                )}
              />
            </div>
            {/* {openInterestSubgroup && (
              interest === "Others" ? 
              <input
                // onClick={() => setSearchShow(true)}
                className="md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                type="text"
                onChange={(e) => handleChange(e, setOptionSelected)}
                defaultValue={""}
                placeholder="Type your Interests"
              />
              :
              <div className="form-group">
              <div className="form-group flex items-center justify-center">
                
              <select
                value={optionSelected}
                onChange={(e) => handleSelect(e)}
                className=" form-multiselect md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text-[25px] placeholder:text-[12px] placeholder:text-[#252525] rounded-[5px] text-[#252525] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
              >
                <option
                  className="md:w-9/12 w-[252px] text-[#252525] bg-white py-10"
                  selected
                  value=""
                  disabled
                  hidden
                >
                  Choose your Interests
                </option>
                {mentorsInterests?.map((a, idx) => {
                  return (
                    <option
                      key={idx}
                      className="md:w-full w-[252px] md:text-[20px] font-normal text-[#252525] rounded cursor-pointer md:h-[400px] z-50 absolute py-10"
                    >
                      {a}
                    </option>
                  );
                })}
              </select>
              </div>
              <div className='flex flex-wrap mt-2 md:w-[700px] w-[252px] justify-start md:ml-0 ml-10'>
        {selectInterests?.map((item, idx) => (
          <CategoryTag
            key={idx}
            categoryName={item}
            removeSelected={removeSelected}
          />
        ))}
      </div>
            </div>
              )
              }  */}
            <p className="md:text-[33px] text-[20px] font-bold text-start mt-10">
              About you
            </p>
            <textarea
              // onClick={() => setSearchShow(true)}
              className="md:w-[700px] w-[329px] md:h-[248px] p-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text-[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
              rows={4}
              onChange={(e) => handleChange(e, setDescription)}
              defaultValue={description || ""}
            ></textarea>
            <p className="md:text-[33px] text-[20px] font-bold text-start mt-10">
              Linkedin
            </p>
            <div className="form-group  flex items-center justify-center">
              <input
                // onClick={() => setSearchShow(true)}
                className=" md:w-[700px] w-[252px] md:h-[83px] h-[44px] px-5 md:text-[20px] search md:placeholder:text[25px] placeholder:text[12px] placeholder:text-[#252525] rounded-[5px] text-[14px] mt-5 border border-1 border-[#C4C4C4]"
                type="text"
                onChange={(e) => handleChange(e, setLinkedin)}
                defaultValue={linkedin || ""}
                placeholder="Enter your Linkedin Profile"
              />
            </div>
            <p className="md:text-[33px] text-[20px] font-bold text-start mt-10">
              Avatar
            </p>
            <div className="flex items-center justify-center">
              <div
                ref={wrapperRef}
                className="drop-file-input border border-1 border-[#C4C4C4] md:w-[700px] w-[252px] md:h-[83px] h-[44px] mt-5"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="drop-file-input__label">
                  {/* <img src={uploadImg} alt="" /> */}
                  <p className="md:text-[20px] text-[12px] ml-5 text-[#252525]">
                    Drag{" "}
                    <span
                      onClick={uploadFiles1}
                      className="md:text-[#009EF6] underline cursor-pointer"
                    ></span>{" "}
                    your Avatar (.png/.jpeg/.img)
                  </p>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  id="myFile1"
                  value=""
                  onChange={onFileDrop}
                />
              </div>
            </div>
            {fileList.length > 0 && (
              <div className="flex justify-center items-center">
                <div className="flex items-center justify-between gap-5 border border-1 border-[#C4C4C4] md:w-[700px] w-[252px] md:h-[83px] h-[44px] mt-2">
                  <p className="flex justify-between mx-5 items-center md:text-[21px] text-[12px] my-3 text-wrap">
                    {fileList[0]?.name}{" "}
                    <span className="text-primary md:text-[50px] text-[21px]">
                      <AiFillFileText />
                    </span>
                  </p>
                  <p
                    onClick={fileRemove}
                    className="text-red-700 md:text-[25px] text-[12px] cursor-pointer pr-3"
                  >
                    <TiDeleteOutline />
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="px-5 py-2 w-5/6 md:w-1/4 rounded-md my-3 hover:bg-white hover:text-black text-white active:opacity-80 md:text-[18px] text-[14px] bg-primary hover:border hover:border-black mt-20"
          >
            Register now
          </button>
        </div>
      </div>
      <div className="mt-20">
        <Feedback />
      </div>
      <div className="mt-10 px-5 md:w-full w-[433px]">
        <OstelloFAQ usingFor={"mentorPage"} />
        <OstelloSubscribe />
        <Footer />
      </div>
    </section>
  );
};
const CategoryTag = ({ categoryName, removeSelected, disabled }) => {
  return (
    <div className="mr-4 mb-2 w-fit px-4 py-2  font-dm-sans space-x-2 flex border border-light-gray rounded-xl shadow-md bg-primary/10">
      <p className="">{categoryName}</p>

      {disabled ? null : (
        <button
          className="text-lg text-primary"
          onClick={() => removeSelected(categoryName)}
        >
          <GrFormClose color="#7D23E0" className="text-primary" />
        </button>
      )}
    </div>
  );
};

export default MentorRegister;
