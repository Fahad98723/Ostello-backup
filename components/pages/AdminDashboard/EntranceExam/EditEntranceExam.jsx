import {
  Autocomplete,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { CustomInputField } from "../../Merchant/Dashboard/MyProfile/CustomInputField";
import axios from "axios";
import { host } from "../../../../utils/constant";
import toast from "react-hot-toast";
import Dropdown from "../../../Dropdown";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "10px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};
const EditEntranceExam = ({ open, setOpen, setReFetch, singleEntrance }) => {
  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "50%",
      overflowY: "scroll!important",
      height: "80%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "60%",
        overflowY: "scroll!important",
      },
    },
  });
  const { modalBox } = useStyle();

  const [isDisable, setIsDisable] = useState(false);
  const [name, setName] = useState();
  const [school, setSchool] = useState();
  const [number, setNumber] = useState();
  const [fatherNumber, setFatherNumber] = useState();
  const [motherNumber, setMotherNumber] = useState();
  const [classes, setClasses] = useState();
  const [subject, setSubject] = useState([]);
  const subjectList = ["Physics", "Chemistry", "Maths", "Biology"];
  const [address, setAddress] = useState();
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
  const [profilePic, setProfilePic] = useState([]);
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [physically, setPhysically] = useState("No");
  const [adharCard, setAdharCard] = useState();
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    if (singleEntrance) {
      setName(singleEntrance?.name);
      setSchool(singleEntrance?.school);
      setNumber(singleEntrance?.phonenumber);
      setSchool(singleEntrance?.school);
      setClasses(singleEntrance?.class);
      setFatherNumber(singleEntrance?.fatherphonenumber);
      setMotherNumber(singleEntrance?.motherphonenumber);
      setSubject(singleEntrance?.subjects);
      setPincode(singleEntrance?.address?.pincode);
      setArea(singleEntrance?.address?.area);
      setLine(singleEntrance?.address?.line);
      setState(singleEntrance?.address?.state);
      setCity(singleEntrance?.address?.city);
      setExam(singleEntrance?.exam);
      setFatherName(singleEntrance?.fathersname);
      setMotherName(singleEntrance?.mothersname);
      setBirthDate(singleEntrance?.dob);
      setGender(singleEntrance?.gender);
      setCode(singleEntrance?.code);
    }
  }, [singleEntrance]);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

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
  }, []);

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

  // useEffect(() => {
  //   
  //   if (singleEntrance?.address?.pincode) {
  //     handleGenerateFromPincode(singleEntrance?.address?.pincode);
  //   }
  // }, [singleEntrance?.address?.pincode]);

  // useEffect(() => {
  //   if (singleEntrance?.address?.area) {
  //     setArea(singleEntrance?.address?.area);
  //   }
  // }, [singleEntrance?.address?.area]);

  const handleUpdate = async () => {
    if (
      !name ||
      !school ||
      !number ||
      !subject?.length ||
      !fatherNumber ||
      !motherNumber ||
      !classes ||
      !line ||
      !area ||
      !pincode
    ) {
      toast.error("Please add every fields");
      return;
    }
    const d = {
      instituteid: "af9b0466-c9ba-4ddf-a2ce-4a848745f944",
      id: singleEntrance?.id,
      updates: {
        name,
        school,
        phonenumber: number,
        fatherphonenumber: fatherNumber,
        motherphonenumber: motherNumber,
        class: classes,
        subjects: subject,
        exam,
        gender: gender,
        // adhaarno: parseInt(adharCard),
        physicallychallenged: physically,
        fathersname: fatherName,
        mothersname: motherName,
        dob: birthDate,
        address: {
          line,
          area,
          pincode,
          city,
          state,
        },
        // profilepic: profilePic,
        code: code || null,
      },
    };
    try {
      const { data } = await axios.patch(`${host}/exam/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });

      toast.success("successfully added");
      setOpen(false);
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setPincode("");
      setName("");
      setCity("");
      setState("");
      setArea("");
      setReFetch(true);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={modalBox}>
          <div className="">
            <div className="md:flex justify-between">
              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Applicant Name: *</p>
                <input
                  type="text"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
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
                  className="md:text-xl bg-white uppercase p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Mobile No: *</p>
                <input
                  type="number"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  disabled={isDisable ? true : false}
                  name="Mobile No"
                  onChange={(e) => handleChange(e, setNumber)}
                  value={number}
                />
              </div>

              {/* <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
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
              </div> */}
              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Father's Name: *</p>
                <input
                  type="text"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  disabled={isDisable ? true : false}
                  name="Father's Name"
                  onChange={(e) => handleChange(e, setFatherName)}
                  value={fatherName}
                />
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Father's Mobile No: *</p>
                <input
                  type="number"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  disabled={isDisable ? true : false}
                  name="Father's Number"
                  onChange={(e) => handleChange(e, setFatherNumber)}
                  value={fatherNumber}
                />
              </div>
              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Mother's Name: *</p>
                <input
                  type="text"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  disabled={isDisable ? true : false}
                  name="Mother's Name"
                  onChange={(e) => handleChange(e, setMotherName)}
                  value={motherName}
                />
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">School Name: * </p>
                <input
                  type="text"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  disabled={isDisable ? true : false}
                  name="School Name"
                  onChange={(e) => handleChange(e, setSchool)}
                  value={school}
                />
              </div>

              <div className="shrink px-2  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Mother's Mobile No: *</p>
                <input
                  type="number"
                  autoFocus
                  className="md:text-xl bg-white p-2 focus:outline-none border-2 border-solid border-light-gray  w-full"
                  disabled={isDisable ? true : false}
                  name="Mother's Number"
                  onChange={(e) => handleChange(e, setMotherNumber)}
                  value={motherNumber}
                />
              </div>
            </div>
            <div className="md:flex justify-between">
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
            </div>

            <div className="md:flex justify-between">
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
              <div className="shrink px-2   w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Preparation For: * </p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={exam}
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
            </div>

            <div className="md:flex justify-between">
              <div className="shrink px-2  w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
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
                  className="md:text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
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
                    className="md:text-xl bg-white  focus:outline-none w-full"
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
                  className="md:text-xl bg-white p-2 focus:outline-none w-full border-2 border-solid border-light-gray "
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
                  className="md:text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
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
                  className="md:text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
                  disabled={isDisable ? true : false}
                  name="area"
                  onChange={(e) => handleChange(e, setArea)}
                  value={area}
                />
              </div>
              <div className="shrink px-2  md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <p className="text-base mb-1">Referral Code : </p>
                <input
                  type="text"
                  autoFocus
                  className="md:text-xl bg-white p-2 w-full  focus:outline-none w-full border-2 border-solid border-light-gray "
                  disabled={isDisable ? true : false}
                  name="code"
                  onChange={(e) => handleChange(e, setCode)}
                  value={code}
                />
              </div>
            </div>
          </div>

          <div className="bg-primary  w-[100px] my-3 py-2 rounded-lg ">
            <button
              // disabled={disable && "disable"}
              className="m-auto w-full bg-primary text-lg font-bold z-50 text-white"
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditEntranceExam;
