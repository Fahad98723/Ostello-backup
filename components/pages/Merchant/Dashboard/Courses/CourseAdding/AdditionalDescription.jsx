import { Autocomplete, Chip, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdditionalDescription,
  addCourseSelector,
} from "../../../../../../redux/slices/AddCourseSlice";
import {
  fetchAdminInstitutes,
  fetchAdminSingleInstitute,
} from "../../../../../../redux/slices/adminInstitutesSlice";
import {
  authSelector,
  getInstituteDetails,
  getUser,
} from "../../../../../../redux/slices/authSlice";
import {
  fetchSingleInstitute,
  institutesSelector,
} from "../../../../../../redux/slices/instituteSlice";
import { host } from "../../../../../../utils/constant";
import { isEmpty } from "../../../../../utils";
import FacultyPopup from "../../MyProfile/FacultyPopup";
import AddFaculty from "./DropDowns/AddFaculty";

const AdditionalDescription = ({
  isAdmin,
  proceedState1,
  courseData,
  setDetails = () => {},
}) => {
  const [faculty, setFaculty] = useState(courseData?.faculties);

  const [showPopUp1, setShowPopUp1] = useState(false);
  const [facultyData, setFacultyData] = useState(courseData?.faculties);
  const [facultyValue, setFacultyValue] = useState(courseData?.faculties);
  const [fileSrcFaculty, setFileSrcFaculty] = useState("");
  const [activeFaculty, setActiveFaculty] = useState(null);

  const [proceed, setProceed, setIsAdditionaDetails, setIsFilters] =
    proceedState1;

  const { additionalDescription } = useSelector(addCourseSelector);

  const { singleInstitute } = useSelector(institutesSelector);
  const { instituteDetails } = useSelector(authSelector);

  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInstituteDetails());
  }, [dispatch, courseData]);

  useEffect(() => {
    dispatch(fetchSingleInstitute(courseData?.institute?.id));
  }, [courseData, dispatch]);

  const [facultyError, setFacultyError] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [shortDescriptionError, setShortDescriptioError] = useState("");

  const { userData } = useSelector(authSelector);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.usertype === 1) {
      setAdmin(true);
    }
  }, [userData]);

  const [facultyValues, setFacultyValues] = useState([]);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (instituteDetails?.id || courseData?.institute?.id) {
        try {
          const res = await axios.get(
            `${host}/institute/faculty?instituteId=${
              instituteDetails?.id || courseData?.institute?.id
            }&limit=20`
          );
          setFacultyValues(res?.data?.message);
          setRefetch(false);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [instituteDetails?.id, courseData?.institute?.id, refetch]);

  

  useEffect(() => {
    if (Object.entries(additionalDescription).length) {
      setShortDescription(additionalDescription?.shortDescription);
      setFaculty(additionalDescription?.faculty);
    }

    if (courseData && !Object.entries(additionalDescription).length) {
      //merchant site course editing showing
      if (!admin) {
        setShortDescription(courseData?.shortdescription);
        setFaculty(courseData.faculties);
      } else {
        // super admin course update and  update approved
        if (courseData?.updatedRequest?.shortdescription?.length) {
          setShortDescription(courseData?.updatedRequest?.shortdescription);
        }
        if (courseData?.updatedRequest?.faculties?.length) {
          let faculty = courseData.updatedRequest.faculties;
          if (faculty?.length) {
            setFaculty(faculty);
          }
        }
      }
    }
  }, [admin, courseData, additionalDescription, facultyValues]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!faculty.length) {
      setFacultyError("Add Faculty is required");
    } else {
      setFacultyError("");
    }

    if (shortDescription === "") {
      setShortDescriptioError("Short Description is required");
    }

    if (shortDescription.trim().length > 400) {
      toast.error("Make Short Description  Under 400 Characters ");
      return;
    }

    if (isEmpty(faculty) || shortDescription === "") {
      alert("Please fill all the fields");
    } else {
      dispatch(
        addAdditionalDescription({
          faculty: faculty,
          shortDescription: shortDescription,
        })
      );
      setProceed(true);
      setDetails(false);
      setIsAdditionaDetails(false);
      setIsFilters(true);
    }
  };

  const [isDropDown, setIsDropDown] = useState(false);
  return (
    <>
      {showPopUp1 && (
        <FacultyPopup
          facultyData={facultyData}
          activeFaculty={activeFaculty}
          showPopUpState1={[showPopUp1, setShowPopUp1]}
          valuesState={[facultyValue, setFacultyValue]}
          fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
          title="Add faculty"
          setRefetch={setRefetch}
        />
      )}

      <form
        action=""
        onSubmit={handleSubmit}
        className="bg-white rounded-lg lg:w-[850px] lg:p-8 my-5"
      >
        <h1 className=" text-2xl w-full space-x-2 hidden  lg:flex items-center  py-4 pb-7  font-dm-sans font-bold">
          Additional Description
        </h1>
        <h1 className="text-primary mt-5">*Add Faculty</h1>
        {facultyError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000]">
            {facultyError}
          </p>
        ) : (
          ""
        )}
        {/* <div
          className={` px-4 py-3 w-full rounded-lg mt-5 text-base font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid ${
            facultyError.length > 0 ? "border-red " : "border-[#A4A4A4]  "
          }   first-letter:transition ease-in-out m-0`}
          onClick={(e) => {
            e.preventDefault();
            setIsDropDown(!isDropDown);
          }}
        >
          <p className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none select-none">
            {!isEmpty(faculty) ? faculty?.name : "Add faculty *"}
          </p>

          <MdKeyboardArrowDown
            className={`text-2xl ${isDropDown ? "hidden" : "flex"}`}
          />
          <MdKeyboardArrowUp
            className={`text-2xl ${isDropDown ? "flex" : "hidden"}`}
          />
        </div> */}

        <Autocomplete
          multiple
          id="tags-standard"
          onChange={(event, newValue) => {
            event.preventDefault()
            setFaculty(newValue);
          }}
          value={faculty}
          options={facultyValues}
          getOptionLabel={(tag) => (
            <div className="flex items-center py-1">
              <img
                src={`https://cdn.ostello.co.in/${tag?.images?.[0]?.key}`}
                alt=""
                className="h-[35px] w-[35px] rounded-full"
              />
              <p className="font-bold ml-2 text-[17px]">{tag?.name}</p>
            </div>
          )}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              hiddenLabel
              id="outlined-bare"
              style={{
                backgroundColor: "white",
                outline: "none",
                padding: "10px 0px",
              }}
              {...params}
              variant="outlined"
            />
          )}
        />

        {/* <Autocomplete
          multiple
          id="tags-filled"
          options={facultyValues.map((option) => option.name)}
          defaultValue={faculty}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
        /> */}

        <button
          className="bg-primary text-white px-3 mt-2 rounded-md py-2 lg:ml-auto"
          onClick={(e) => {
            e.preventDefault();
            setShowPopUp1(!showPopUp1);
            // setIsDropDown1(false);
            // setIsDropDown2(false);
            // setIsDropDown3(false);
            // setIsDropDown4(false);
            // setIsDropDown5(false);
            // setIsDropDown6(false);
            // setIsDropDown7(false);
          }}
        >
          + Add New Faculty
        </button>
        {isDropDown && (
          <AddFaculty
            afterSelect={(e) => {
              setIsDropDown(false);
            }}
            facultyState={[faculty, setFaculty]}
          />
        )}
        <h1 className="text-primary mt-5">*Short Description</h1>

        {shortDescriptionError.length > 0 ? (
          <p className="w-full text-xs text-right text-[#FF0000] py-2">
            {shortDescriptionError}
          </p>
        ) : (
          ""
        )}
        <div
          className={` px-4 py-3 mt-4 mb-6 lg:mb-0 w-full rounded-lg text-base font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid ${
            shortDescriptionError.length > 0
              ? "border-red"
              : "border-[#A4A4A4] "
          }  first-letter:transition ease-in-out m-0`}
        >
          <input
            type="text"
            className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
            placeholder="Short Description (1-2 lines)"
            defaultValue={shortDescription}
            onChange={(e) => {
              setShortDescription(e.target.value);
            }}
          />{" "}
        </div>
        <div className="flex justify-end py-5">
          <button className="text-white bg-primary w-44 py-3 rounded-lg ">
            Save and Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default AdditionalDescription;
