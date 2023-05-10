import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TiMessage } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";
import { AiFillCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { MdAddPhotoAlternate } from "react-icons/md";
import React, { useState, useEffect, Fragment } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import axios from "axios";

import AdminMediaManager from "./AdminMediaManager";
import { Autocomplete, TextField } from "@mui/material";
import {
  adminDeleteInstitute,
  adminUpdateInstitute,
  fetchAdminInstitutes,
  fetchAdminSingleInstitute,
} from "../../../../../../redux/slices/adminInstitutesSlice";
import DropdownSelector from "../../../../Merchant/Dashboard/MyProfile/DropdownSelector";
import AddAchievementPopup from "../../../../Merchant/Dashboard/MyProfile/AddAchievementPopup";
import { CustomInputField } from "../../../../Merchant/Dashboard/MyProfile/CustomInputField";
import { LogoIcon } from "../../../../../SVGIcons";
import FacultyEditPopup from "../../../../Merchant/Dashboard/MyProfile/FacultyEditPopup";
import FacultyPopup from "../../../../Merchant/Dashboard/MyProfile/FacultyPopup";
import Modal from "../../../../../UI/Modal/Modal";
import LocationPopup from "../../../../Merchant/Dashboard/MyProfile/LocationPopup";
import DocumentSubmission from "../../../../Merchant/Dashboard/MyProfile/DocumentSubmission";
import { host } from "../../../../../../utils/constant";
import { isJsonParsable, titleToUrl } from "../../../../../../utils/utils";
import AdminLocationPopup from "../../../../Merchant/Dashboard/MyProfile/AdminLocationPopup";
import CategorySelect from "../../../../../CategorySelect";
import { useRouter } from "next/router";
import {
  getSubjectsFromStreams,
  getExamsFromFields,
  subjectsForStreams,
  examsFromFields,
  getPostGraduationFromStreams,
  getGraduationFromStreams,
} from "./Data";
import { isEmpty } from "../../../../../utils";

const AdminInstituteOverview = () => {
  const router = useRouter();
  const { instituteId } = router.query;

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

 

  // const data = {
  //   "Junior Secondary School (Class 6-10th)": {
  //     boards: ["CBSE"],
  //     classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  //     subjects: ["English", "Hindi", "Maths", "Science", "Social Studies"],
  //   },
  //   "Junior Secondary School (Class 6-10th)": {
  //     boards: ["CBSE"],
  //     classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  //     subjects: ["English", "Hindi", "Maths", "Science", "Social Studies"],
  //   },
  //   "Senior Secondary School (Class 6-10th)": {
  //     boards: ["CBSE"],
  //     classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  //     subjects: ["English", "Hindi", "Maths", "Science", "Social Studies"],
  //   },
  // };

  // 

  const [descriptionError, setDescriptionError] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goBack = () => {
    router.push("/admin-dashboard/requests/");
  };

  const [reFetch, setRefetch] = useState(false);

  const [courseCategories, setCourseCategories] = useState([]);

  const [isEditLocation, setIsEditLocation] = useState(false);
  const [editLocationValues, setEditLocationValues] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const [boardsJrSchool, setBoardsJrSchool] = useState([]);
  const [classesJrSchool, setClassesJrSchool] = useState([]);
  const [subjectsJrSchool, setSubjectsJrSchool] = useState([]);

  const [boardsHrSchool, setBoardsHrSchool] = useState([]);
  const [classesHrSchool, setClassesHrSchool] = useState([]);
  const [subjectsHrSchool, setSubjectsHrSchool] = useState([]);

  const [boardsSrSchool, setBoardsSrSchool] = useState([]);
  const [streamsSrSchool, setStreamsSrSchool] = useState([]);
  const [subjectsSrSchool, setSubjectsSrSchool] = useState([]);

  const [language, setLanguage] = useState([]);
  const [languageError, setLanguageError] = useState("");

  const [computer, setComputer] = useState([]);
  const [computerError, setComputerError] = useState("");

  const [graduationStreams, setGraduationStreams] = useState([]);
  const [graduationCourses, setGraduationCourses] = useState([]);

  const [postGraduationStreams, setPostGraduationStreams] = useState([]);
  const [postGraduationCourses, setPostGraduationCourses] = useState([]);

  const [fieldsCompetitiveExams, setFieldsCompetitiveExams] = useState([]);
  const [examsCompetitiveExams, setExamsCompetitiveExams] = useState([]);
  const [skills, setSkills] = useState([]);
  const [testPrep, setTestPrep] = useState([]);

  const [instituteDetails, setInstituteDetails] = useState({});
  const [locationValues, setLocationValues] = useState(
    instituteDetails?.locations
  );
  const [activeFaculty, setActiveFaculty] = useState(null);
  const [facultyValues, setFacultyValues] = useState([]);
  const [achievementValues, setAchievementValues] = useState([]);

  const [instituteDomain, setInstituteDomain] = useState([]);
  const [instituteDomainError, setInstituteDomainError] = useState("");

  const [classMode, setClassMode] = useState();
  const [imageCounter, setImageCounter] = useState(0);
  const [videoCounter, setVideoCounter] = useState(0);
  const [instituteName, setInstituteName] = useState();
  const [toppers, setToppers] = useState([]);
  const [instituteShortDescription, setInstituteShortDescription] =
    useState("");

  const [ownerName, setOwnerName] = useState();
  const [ownerEmail, setOwnerEmail] = useState();
  const [ownerPhone, setOwnerPhone] = useState();

  const [instituteMobile, setInstituteMobile] = useState();
  const [instituteDescription, setInstituteDescription] = useState([]);

  const [instituteEmail, setInstituteEmail] = useState();
  const [enrolledStudent, setEnrolledStudent] = useState();
  const [totalFaculties, setTotalFaculties] = useState(
    instituteDetails?.faculties?.length
  );
  const [singleInstitute, setSingleInstitute] = useState({});
  const { loading, adminInstitutes, error, isUpdated } = useSelector(
    (state) => state.adminInstitutes
  );

  const [openingTime, setOpeningTime] = useState("");
  const [openingTimeError, setOpeningTimeError] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [closingTimeError, setClosingTimeError] = useState("");
  const [boardsJrSchoolError, setBoardsJrSchoolError] = useState("");
  const [classesJrSchoolError, setClassesJrSchoolError] = useState("");
  const [subjectsJrSchoolError, setSubjectsJrSchoolError] = useState("");

  const [boardsHrSchoolError, setBoardsHrSchoolError] = useState("");
  const [classesHrSchoolError, setClassesHrSchoolError] = useState("");
  const [subjectsHrSchoolError, setSubjectsHrSchoolError] = useState("");

  const [boardsSrSchoolError, setBoardsSrSchoolError] = useState("");
  const [streamsSrSchoolError, setStreamsSrSchoolError] = useState("");
  const [subjectsSrSchoolError, setSubjectsSrSchoolError] = useState("");

  const [majorsError, setMajorsError] = useState("");
  const [graduationFieldsError, setGraduationFieldsError] = useState("");

  const [postMajorsError, setPostMajorsError] = useState("");
  const [postGraduationFieldsError, setPostGraduationFieldsError] =
    useState("");

  const [fieldsCompetitiveExamsError, setFieldsCompetitiveExamsError] =
    useState("");
  const [examsCompetitiveExamsError, setExamsCompetitiveExamsError] =
    useState("");
  const [skillsError, setSkillsError] = useState("");
  const [testPrepError, setTestPrepError] = useState("");

  const [descriptionParagraph1, setDescriptionParagraph1] = useState("");
  const [descriptionParagraph2, setDescriptionParagraph2] = useState("");
  const [descriptionParagraph3, setDescriptionParagraph3] = useState("");

  useEffect(() => {
    if (
      !isEmpty(descriptionParagraph1) ||
      !isEmpty(descriptionParagraph2) ||
      !isEmpty(descriptionParagraph3)
    ) {
      setInstituteDescription(
        []
          .concat(descriptionParagraph1)
          .concat(descriptionParagraph2)
          .concat(descriptionParagraph3)
      );
    }
  }, [descriptionParagraph1, descriptionParagraph2, descriptionParagraph3]);

  const removeHandleFaculty = (id) => {
    axios
      .delete(`${host}/institute/faculty?id=${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      })
      .then((res) => {
        toast.success("Successfully removed faculty !");
        setRefetch(true);
        dispatch(fetchAdminInstitutes());
      })
      .catch((e) => {
        toast.error(e.message);
        console.error(e);
      })
      .finally(() => {});
  };

  // useEffect(() => {
  //   dispatch(fetchAdminInstitutes());
  // }, [reFetch]);

  // useEffect(() => {
  //   const single = adminInstitutes?.find((a) => a?.id === instituteId);
  //   setSingleInstitute(single);
  //   setInstituteDetails(single);
  //   saveServicesToState(single?.services);
  // }, [adminInstitutes,instituteId]);

  useEffect(() => {
    const run = async () => {
      if (instituteId) {
        try {
          const res = await axios.get(
            `${host}/institute?id=${instituteId}&relations=owner,achievements`
          );
          setInstituteDetails(res?.data?.message);
          saveServicesToState(res?.data?.message?.services);
          setRefetch(false);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [instituteId, reFetch]);

  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (instituteId) {
        try {
          const res = await axios.get(
            `${host}/institute/faculty?instituteId=${instituteId}&limit=20`
          );
          setFacultyValues(res?.data?.message);
          setFacultyData(res?.data?.message);
          setRefetch(false);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [instituteId, reFetch]);

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (instituteDetails?.owner) {
      setOwnerName(instituteDetails?.owner?.name);
      setOwnerEmail(instituteDetails?.owner?.email);
      setOwnerPhone(instituteDetails?.owner?.phonenumber);
    }

    if (instituteDetails?.area_tags) {
      setAreas(instituteDetails?.area_tags);
    }

    if (instituteDetails?.description) {
      const desc = instituteDetails?.description;
      if (isJsonParsable(desc)) {
        let parsed = JSON.parse(desc);
        if (parsed) {
          setInstituteDescription(parsed);
          setDescriptionParagraph1(parsed[0]);
          setDescriptionParagraph2(parsed[1]);
          setDescriptionParagraph3(parsed[2]);
        }
      } else {
        setInstituteDescription([desc]);
        setDescriptionParagraph1(desc);
      }
    }

    if (instituteDetails?.short_description) {
      setInstituteShortDescription(instituteDetails?.short_description);
    }

    if (instituteDetails?.classmode) {
      setMode(instituteDetails?.classmode);
    }

    if (instituteDetails?.classmode) {
      if (instituteDetails?.classmode === 1) {
        setClassMode("Hybrid");
      }
      if (instituteDetails?.classmode === 2) {
        setClassMode("Online");
      }
      if (instituteDetails?.classmode === 3) {
        setClassMode("Offline");
      }
    }

    if (instituteDetails?.bank && instituteDetails?.bank?.accHolderName) {
      setAccountHolderName(instituteDetails?.bank?.accHolderName);
      setBankAccountNo(instituteDetails?.bank?.bankAccNo);
      setBankName(instituteDetails?.bank?.bankName);
      setBranch(instituteDetails?.bank?.branch);
      setGstNo(instituteDetails?.bank?.gstNo);
      setIfscCode(instituteDetails?.bank?.ifscNo);
    }

    if (instituteDetails?.slugurl) {
      setSlug(instituteDetails?.slugurl);
    }
    if (instituteDetails?.metatitle) {
      setTitle(instituteDetails?.metatitle);
    }
    if (instituteDetails?.metadesc) {
      setMetaDesc(instituteDetails?.metadesc);
    }

    // if (instituteDetails?.coursecategories) {
    //   setInstituteDomain([...instituteDetails.coursecategories]);
    // }

    setLocationValues(instituteDetails?.locations);

    if (instituteDetails) {
      if (instituteDetails?.workinghours) {
        setClosingTime(instituteDetails?.workinghours?.split("to")[1].trim());
        setOpeningTime(instituteDetails?.workinghours?.split("to")[0].trim());
      }
    }

    if (instituteDetails) {
      if (instituteDetails?.achievements) {
        setAchievementValues([...instituteDetails?.achievements]);
      }
    }

    if (instituteDetails) {
      // if (instituteDetails?.faculties) {
      //   setFacultyValues(instituteDetails?.faculties);
      // }
    }

    setInstituteName(instituteDetails?.name);
    setInstituteEmail(instituteDetails?.email);
    setEnrolledStudent(instituteDetails?.studentsenrolled);
    setTotalFaculties(
      instituteDetails?.totalfaculties || instituteDetails?.faculties?.length
    );
    setInstituteMobile(instituteDetails?.phonenumber);
    // if (instituteDetails?.updatedRequest?.toppers) {
    //   setToppers(instituteDetails?.updatedRequest?.toppers);
    // } else {
    setToppers(instituteDetails?.toppers);
    // }
  }, [instituteDetails, instituteId, instituteDetails?.faculties]);



  const [subjectsForStreams, setSubjectsForStreams] = useState([]);

  const [instituteDomainName, setInstituteDomainName] = useState([]);

  const saveServicesToState = (services) => {
    if (services) {
      if (Object.entries(services).length) {
        if (!instituteDomain.length) {
          if (services["Junior Secondary School (Class 6-10th)"]) {
            setInstituteDomainName((prv) =>
              prv.concat("Junior Secondary School (Class 6-8th)")
            );
            setBoardsJrSchool(
              services["Junior Secondary School (Class 6-10th)"].boards
            );
            setClassesJrSchool(
              services[
                "Junior Secondary School (Class 6-10th)"
              ].classes?.filter(
                (className) =>
                  className !== "Class 9" && className !== "Class 10"
              )
            );
            setSubjectsJrSchool(
              services["Junior Secondary School (Class 6-10th)"].subjects
            );
          }

          if (services["Junior Secondary School (Class 6-10th)"]) {
            if (
              services[
                "Junior Secondary School (Class 6-10th)"
              ].classes.includes("Class 9") ||
              services[
                "Junior Secondary School (Class 6-10th)"
              ].classes.includes("Class 10")
            ) {
              setInstituteDomainName((prv) =>
                prv.concat("Higher Secondary School (Class 9-10th)")
              );
              setBoardsHrSchool(
                services["Junior Secondary School (Class 6-10th)"].boards
              );
              setClassesHrSchool(
                services[
                  "Junior Secondary School (Class 6-10th)"
                ].classes?.filter(
                  (className) =>
                    className !== "Class 6" &&
                    className !== "Class 7" &&
                    className !== "Class 8"
                )
              );
              setSubjectsHrSchool(
                services["Junior Secondary School (Class 6-10th)"].subjects
              );
            }
          }

          if (services["Junior Secondary School (Class 6-8th)"]) {
            setInstituteDomainName((prv) =>
              prv.concat("Junior Secondary School (Class 6-8th)")
            );
            setBoardsJrSchool(
              services["Junior Secondary School (Class 6-8th)"].boards
            );
            setClassesJrSchool(
              services["Junior Secondary School (Class 6-8th)"].classes
            );
            setSubjectsJrSchool(
              services["Junior Secondary School (Class 6-8th)"].subjects
            );
          }
          if (services["Higher Secondary School (Class 9-10th)"]) {
            setInstituteDomainName((prv) =>
              prv.concat("Higher Secondary School (Class 9-10th)")
            );
            setBoardsHrSchool(
              services["Higher Secondary School (Class 9-10th)"].boards
            );
            setClassesHrSchool(
              services["Higher Secondary School (Class 9-10th)"].classes
            );
            setSubjectsHrSchool(
              services["Higher Secondary School (Class 9-10th)"].subjects
            );
          }

          if (services["Language Courses"]) {
            setInstituteDomainName((prv) => prv.concat("Language Courses"));
            setLanguage(services["Language Courses"].language);
          }

          if (services["Computer"]) {
            setInstituteDomainName((prv) => prv.concat("Computer"));
            setComputer(services["Computer"].computer);
          }

          if (services["Senior Secondary School (Class 11-12th)"]) {
            setInstituteDomainName((prv) =>
              prv.concat("Senior Secondary School (Class 11-12th)")
            );
            setBoardsSrSchool(
              services["Senior Secondary School (Class 11-12th)"].boards
            );
            setStreamsSrSchool(
              services["Senior Secondary School (Class 11-12th)"].streams
            );
            setSubjectsSrSchool(
              services["Senior Secondary School (Class 11-12th)"].subjects
            );
            setSubjectsForStreams(subjectsForStreams);
          }
          if (services["Competitive Exams"]) {
            setInstituteDomainName((prv) => prv.concat("Competitive Exams"));
            setFieldsCompetitiveExams(services["Competitive Exams"].fields);
            setExamsCompetitiveExams(
              services["Competitive Exams"].examsPerFields
            );
          }
          if (services["Skill Based Courses"]) {
            setInstituteDomainName((prv) => prv.concat("Skill Based Courses"));
            setSkills(services["Skill Based Courses"].skills);
          }
          if (services["Test Prep"]) {
            setInstituteDomainName((prv) => prv.concat("Test Prep"));
            setTestPrep(services["Test Prep"].courses);
          }
          if (services["Graduation"]) {
            setInstituteDomainName((prv) => prv.concat("Graduation"));
            setGraduationStreams(services["Graduation"].grstreams);
            setGraduationCourses(services["Graduation"].courses);
          }
          if (services["Post Graduation"]) {
            setInstituteDomainName((prv) => prv.concat("Post Graduation"));
            setPostGraduationStreams(services["Post Graduation"].grstreams);
            setPostGraduationCourses(services["Post Graduation"].courses);
          }
        }
      }
    }
  };



  const formattedDomain = () => {
    const temp = {};

    instituteDomain.forEach((item) => {
      if (item === "Junior Secondary School (Class 6-10th)") {
        let tempObj = {
          domainName: "Junior Secondary School (Class 6-8th)",
          boards: boardsJrSchool,
          classes: classesJrSchool,
          subjects: subjectsJrSchool,
        };

        temp["Junior Secondary School (Class 6-8th)"] = tempObj;
      }
      if (item === "Junior Secondary School (Class 6-8th)") {
        let tempObj = {
          domainName: "Junior Secondary School (Class 6-8th)",
          boards: boardsJrSchool,
          classes: classesJrSchool,
          subjects: subjectsJrSchool,
        };

        temp["Junior Secondary School (Class 6-8th)"] = tempObj;
      }
      if (item === "Higher Secondary School (Class 9-10th)") {
        let tempObj = {
          domainName: "Higher Secondary School (Class 9-10th)",
          boards: boardsHrSchool,
          classes: classesHrSchool,
          subjects: subjectsHrSchool,
        };

        temp["Higher Secondary School (Class 9-10th)"] = tempObj;
      }

      if (item === "Language Courses") {
        let tempObj = {
          domainName: "Language Courses",
          language: language,
        };

        temp["Language Courses"] = tempObj;
      }

      if (item === "Computer") {
        let tempObj = {
          domainName: "Computer",
          computer: computer,
        };

        temp["Computer"] = tempObj;
      }

      if (item === "Senior Secondary School (Class 11-12th)") {
        let tempObj = {
          domainName: "Senior Secondary School (Class 11-12th)",
          boards: boardsSrSchool,
          streams: streamsSrSchool,
          subjectsForStreams,
          subjects: subjectsSrSchool,
        };
        temp["Senior Secondary School (Class 11-12th)"] = tempObj;
      }
      if (item === "Competitive Exams") {
        let tempObj = {
          domainName: "Competitive Exams",
          fields: fieldsCompetitiveExams,
          examsPerFields: examsCompetitiveExams,
        };
        temp["Competitive Exams"] = tempObj;
      }
      if (item === "Skill Based Courses") {
        let tempObj = {
          domainName: "Skill Based Courses",
          skills,
        };
        temp["Skill Based Courses"] = tempObj;
      }
      if (item === "Test Prep") {
        let tempObj = {
          domainName: "Test Prep",
          courses: testPrep,
        };
        temp["Test Prep"] = tempObj;
      }
      if (item === "Graduation") {
        let tempObj = {
          domainName: "Graduation",
          grstreams: graduationStreams,
          courses: graduationCourses,
        };
        temp["Graduation"] = tempObj;
      }
      if (item === "Post Graduation") {
        let tempObj = {
          domainName: "Post Graduation",
          grstreams: postGraduationStreams,
          courses: postGraduationCourses,
        };
        temp["Post Graduation"] = tempObj;
      }
    });



    return temp;
  };

  useEffect(() => {
    if (instituteDomainName) {
      setInstituteDomain([...new Set(instituteDomainName)]);
    }
  }, [instituteDomainName]);



  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [fileSrcAchievment, setFileSrcAchievment] = useState("");
  const [fileSrcFaculty, setFileSrcFaculty] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [isDropDown1, setIsDropDown1] = useState(true);
  const [isDropDown2, setIsDropDown2] = useState(true);
  const [isDropDown3, setIsDropDown3] = useState(true);
  const [isDropDown4, setIsDropDown4] = useState(true);
  const [isDropDown5, setIsDropDown5] = useState(true);
  const [isDropDown6, setIsDropDown6] = useState(true);
  const [isDropDown7, setIsDropDown7] = useState(true);
  const [isDropDown8, setIsDropDown8] = useState(true);
  const [isDropDown9, setIsDropDown9] = useState(true);

  const [showPopUp, setShowPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [viewAllPhoto, setViewAllPhoto] = useState(false);
  const [viewAllVideo, setViewAllVideo] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isDisable1, setIsDisable1] = useState(true);
  const [isDisable2, setIsDisable2] = useState(true);
  const [isDisable3, setIsDisable3] = useState(true);
  const [isDisable4, setIsDisable4] = useState(true);
  const [isDisable5, setIsDisable5] = useState(true);
  const [isDisable6, setIsDisable6] = useState(true);

  let initialLocation = locationValues?.[0] || {};


  const [mode, setMode] = useState(null);

  useEffect(() => {
    setRefetch(!reFetch);
  }, [showPopUp, instituteId]);

  const [merchantProfile, setMerchantProfile] = useState(false);

  const uploadFiles = () => {
    const myFile = document.getElementById("myFile");
    myFile.click();
  };

  const uploadFiles1 = () => {
    const myFile = document.getElementById("myFile1");
    myFile.click();
  };

  const imageHandleChange = (e) => {
    setImages([]);
    if (e.target.files) {
      let filesArray = e.target.files;
      Object.values(filesArray).forEach((item) => {
        if (item.type.toLowerCase().includes("video")) {
         
          setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
        }
        if (item.type.toLowerCase().includes("image")) {
      
          setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
        }
      });

      const fileArray = Array.from(e.target.files)?.map((file) =>
        URL.createObjectURL(file)
      );
      setImageCounter((prev) => prev + fileArray.length);
      Array.from(e.target.files)?.map((file) => URL.revokeObjectURL(file));
    }
  };

  const videoChangeHandle = (e) => {
    setVideos([]);
    if (e.target.files) {
      let filesArray = e.target.files;
      Object.values(filesArray).forEach((item) => {
        if (item.type.toLowerCase().includes("video")) {
      
          setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
        }
        if (item.type.toLowerCase().includes("image")) {
          
          setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
        }
      });
      FilterImagesAndVideos(filesArray, setImages, setVideos);
      const fileArray = Array.from(e.target.files)?.map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedVideos((prevVideos) => prevVideos.concat(fileArray));
      setVideoCounter((prev) => prev + fileArray.length);
      Array.from(e.target.files)?.map((file) => URL.revokeObjectURL(file));
    }
  };



  const renderVideos = (source) => {
    return source?.map((video, idx) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <div className="flex" key={idx}>
          <video
            controls
            src={video}
            key={video}
            type="video/mp4"
            className="flex"
          />
        </div>
      );
    });
  };

  const renderPhotos = (source) => {
    return source?.map((photo) => {
      return (
        <img
          src={photo}
          key={photo}
          alt="Rendering Media Images"
          width="150px"
          className=" "
        />
      );
    });
  };

  const [updateReqSent, setUpdateReqSent] = useState(false);
  const [aadharFile, setaadharFile] = useState();
  const [addressFile, setaddressFile] = useState();
  const [registrationFile, setregistrationFile] = useState([]);

  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [branch, setBranch] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [title, setTitle] = useState("");



  const [allVideos, setAllVideos] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [allThumbnail, setAllThumbnail] = useState([]);

  const handleSubmit = async () => {
    if (instituteName) {
      let updatedArea = [];

  
      const updatedData = {
        id: instituteDetails?.id,
        updates: {
          name: instituteName,
          phonenumber: instituteMobile,
          email: instituteEmail,
          description: JSON.stringify(instituteDescription),
          short_description: instituteShortDescription,
          email: instituteEmail,
          workinghours:
            openingTime && closingTime
              ? `${openingTime} to ${closingTime}`
              : null,
          services: formattedDomain(),
          bank: {
            accHolderName: accountHolderName,
            bankAccNo: bankAccountNo,
            bankName: bankName,
            branch: branch,
            gstNo: gstNo,
            ifscNo: ifscCode,
          },
          classmode: mode,
          documents: {
            adhaar:
              instituteDetails?.documents?.adhaar ||
              instituteDetails?.updatedRequest?.documents?.adhaar,
            address:
              instituteDetails?.documents?.address ||
              instituteDetails?.updatedRequest?.documents?.address,
            registration:
              instituteDetails?.documents?.registration ||
              instituteDetails?.updatedRequest?.documents?.registration,
          },
          establishedyear: instituteDetails?.establishedyear,
          images: allImages,
          videos: allVideos,
          slug: slug || `${titleToUrl(instituteDetails?.name)}`,
          // slugurl: slug || instituteDetails?.slugurl,
          metadesc: metaDesc || instituteDetails?.metadesc,
          metatitle: title || instituteDetails?.metatitle,
          studentsenrolled: enrolledStudent,
          // area_tags: updatedArea,
          totalfaculties: totalFaculties,
          
          toppers:
            instituteDetails?.updatedRequest?.toppers ||
            instituteDetails?.toppers,
        },
      };
 

      const updateAreas = await axios.patch(
        `${host}/institute/refresh/areas?id=${instituteDetails?.id}`
      );

      dispatch(adminUpdateInstitute(updatedData));

      setTimeout(() => {
        router.push("/admin-dashboard/requests/institute-requests");
      }, 3000);
    }
  };

  const deleteHandle = () => {
    dispatch(adminDeleteInstitute(instituteId));
    router.push("/admin-dashboard/institutes");
  };


  return (
    <div className="w-full">
      <section className=" w-full h-screen font-dm-sans overflow-x-hidden overflow-y-scroll relative space-y-4">
        {showLocationPopup && (
          <AdminLocationPopup
            editValues={editLocationValues}
            isEdit={isEditLocation}
            data={instituteDetails}
            afterSuccess={() => {
              setShowLocationPopup(false);
              setEditLocationValues({});
              setIsEditLocation(false);
              setRefetch(true);
            }}
          />
        )}
        {showPopUp1 && (
          <FacultyPopup
            facultyData={facultyData}
            activeFaculty={activeFaculty}
            showPopUpState1={[showPopUp1, setShowPopUp1]}
            valuesState={[facultyValues, setFacultyValues]}
            fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
            title="Add faculty"
            instituteId={instituteDetails?.id}
            setRefetch={setRefetch}
          />
        )}

        {showEditPopUp && (
          <FacultyEditPopup
            facultyData={facultyData}
            activeFaculty={activeFaculty}
            showPopUpState1={[showEditPopUp, setShowEditPopUp]}
            valuesState={[facultyValues, setFacultyValues]}
            fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
            title="Edit"
            setRefetch={setRefetch}
          />
        )}
        {showPopUp2 && (
          <AddAchievementPopup
            showDropDown={[isDropDown6, setIsDropDown6]}
            showPopUpState1={[showPopUp2, setShowPopUp2]}
            valuesState={[achievementValues, setAchievementValues]}
            fileSrcState={[fileSrcAchievment, setFileSrcAchievment]}
            title="Add achievement"
            name3="Describe your achievement"
            className="hidden"
          />
        )}

        {viewAllPhoto && (
          <div
            className=" absolute   h-max  "
            style={{ background: "rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex flex-wrap justify-center relative w-screen overflow-x-scroll  h-max gap-10  p-20 pb-20 pt-20 lg:pl-10">
              <AiFillCloseCircle
                className="text-violet absolute right-10 top-0 mr-16 mt-8 text-3xl"
                onClick={() => {
                  setViewAllPhoto(!viewAllPhoto);
                  setIsDropDown4(!isDropDown4);
                }}
              />
              {renderPhotos(selectedImages)}{" "}
            </div>
          </div>
        )}
        {viewAllVideo && (
          <div
            className=" absolute w-screen  h-max   "
            style={{ background: "rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex flex-wrap justify-center  h-max gap-10 p-20  pt-20 lg:pl-10">
              <AiFillCloseCircle
                className="text-violet absolute right-10 top-0 mr-16 mt-8 text-3xl"
                onClick={() => {
                  setViewAllVideo(!viewAllVideo);
                  setIsDropDown4(!isDropDown4);
                }}
              />
              {renderVideos(selectedVideos)}{" "}
            </div>
          </div>
        )}

        <div className="py-5">
          {/* section-1 */}
          <section className="  w-full px-5 space-y-4 lg:space-y-0 lg:px-12 mb-6">
            {/* <div className="md:block hidden">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl w-full font-bold">Institute</h3>
                <div className="flex md:justify-end justify-between w-full items-center">
                  <div className="flex items-center">
                    <p className="pr-3 font-semibold">Super Admin</p>
                    <LogoIcon className={"w-16 h-fit"} />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex">
              <DropdownSelector
                title="Basic Details"
                isDropDown1State={[isDropDown1, setIsDropDown1]}
                className=""
              />

              {isDisable ? (
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setIsDisable(false);
                  }}
                >
                  {" "}
                  Edit{" "}
                </button>
              ) : (
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setIsDisable(true);
                  }}
                >
                  {" "}
                  Cancel{" "}
                </button>
              )}
            </div>

            {isDropDown1 && (
              <Fragment>
                <div className="flex flex-col    lg:flex-row lg:space-x-10">
                  <div
                    className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !instituteName && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Institute Name
                    </h2>

                    <input
                      type="text"
                      placeholder={instituteName}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={instituteName || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setInstituteName(e.target.value);
                      }}
                    />
                  </div>

                  <div
                    className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !instituteMobile && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Contact No.
                    </h2>

                    <input
                      type="text"
                      placeholder={instituteMobile}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={instituteMobile || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setInstituteMobile(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <CustomInputField
                  type="textarea"
                  defaultValue={instituteDescription?.[0]}
                  onChange={(e) => setDescriptionParagraph1(e)}
                  className=" lg:w-9/12 shrink"
                  disableState={[isDisable, setIsDisable]}
                  name="Description (Paragraph1)"
                  required
                  errorState={(err) => setDescriptionError(err)}
                />
                <CustomInputField
                  type="textarea"
                  defaultValue={instituteDescription?.[1]}
                  onChange={(e) => setDescriptionParagraph2(e)}
                  className=" lg:w-9/12 shrink"
                  disableState={[isDisable, setIsDisable]}
                  name="Description (Paragraph2)"
                />
                <CustomInputField
                  type="textarea"
                  defaultValue={instituteDescription?.[2]}
                  onChange={(e) => setDescriptionParagraph3(e)}
                  className=" lg:w-9/12 shrink"
                  disableState={[isDisable, setIsDisable]}
                  name="Description (Paragraph3)"
                />

                <CustomInputField
                  type="textarea"
                  defaultValue={instituteShortDescription}
                  onChange={(e) => setInstituteShortDescription(e)}
                  className=" lg:w-9/12 shrink"
                  disableState={[isDisable, setIsDisable]}
                  name="Institute Short Description"
                />

                <div className="flex flex-col  lg:flex-row lg:space-x-10 ">
                  <div
                    className={` shrink w-96 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !instituteEmail && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Institute Email
                    </h2>

                    <input
                      type="text"
                      placeholder={instituteEmail}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={instituteEmail || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setInstituteEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={` shrink w-96 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 `}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Enrolled Students
                    </h2>

                    <input
                      type="number"
                      placeholder={enrolledStudent}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={enrolledStudent || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setEnrolledStudent(parseInt(e.target.value));
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="shrink w-full  md:w-1/4 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 my-2">
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Type of Institute
                    </h2>
                    <select
                      className="shrink w-full  text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat first-letter:transition ease-in-out m-0 focus:outline-none text-xl"
                      disabled={isDisable ? true : false}
                      onChange={(e) => {
                        setMode(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        {classMode}
                      </option>
                      <option
                        className="text-xl bg-white  focus:outline-none w-full"
                        value="1"
                      >
                        Hybrid
                      </option>
                      <option
                        className="text-xl bg-white  focus:outline-none w-full"
                        value="2"
                      >
                        {" "}
                        Online
                      </option>
                      <option
                        className="text-xl bg-white  focus:outline-none w-full"
                        value="3"
                      >
                        Offline
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className={` shrink w-96 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  `}
                >
                  <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                    Total Faculties
                  </h2>

                  <input
                    type="number"
                    placeholder={totalFaculties}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={totalFaculties || ""}
                    disabled={isDisable}
                    onChange={(e) => {
                      setTotalFaculties(parseInt(e.target.value));
                    }}
                  />
                </div>

                <div className="flex items-center flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                  <div className=" flex w-full flex-col space-y-2 ">
                    <p className="w-fit">Opening Time</p>
                    {openingTimeError.length > 0 && (
                      <p className="w-full text-right text-xs text-[#FF0000]">
                        {openingTimeError}
                      </p>
                    )}
                    <input
                      type="time"
                      value={openingTime}
                      onChange={(e) => {
                        e.preventDefault();
                        setOpeningTime(e.target.value);
                   
                        setOpeningTimeError("");
                      }}
                      className={`select-none form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid ${
                        openingTimeError.length === 0
                          ? "border-light-gray"
                          : "border-red"
                      } rounded-xl shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                    />
                  </div>
                  <div className=" flex w-full flex-col space-y-2">
                    <p className="w-fit">Closing Time</p>
                    {closingTimeError.length > 0 && (
                      <p className="w-full text-right text-xs text-[#FF0000]">
                        {closingTimeError}
                      </p>
                    )}
                    <input
                      type="time"
                      value={closingTime}
                      onChange={(e) => {
                        e.preventDefault();
                        setClosingTime(e.target.value);
                        setClosingTimeError("");
                      }}
                      className={`select-none form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid ${
                        closingTimeError.length === 0
                          ? "border-light-gray"
                          : "border-red"
                      } rounded-xl shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                    />
                  </div>
                </div>
              </Fragment>
            )}
          </section>

          {/* section-2 */}
          <section className="  w-full px-6 space-y-4 lg:space-y-2 lg:px-12   mb-6">
            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0">
              <DropdownSelector
                title="Manage locations"
                isDropDown1State={[isDropDown2, setIsDropDown2]}
              />
              <button
                className="bg-primary text-white w-32  rounded-full p-1 lg:ml-auto"
                onClick={() => {
                  // setShowPopUp(!showPopUp)
                  setShowLocationPopup(true);
                  // setIsDropDown1(false);
                  // setIsDropDown2(false);
                  // setIsDropDown3(false);
                  // setIsDropDown4(false);
                  // setIsDropDown5(false);
                  // setIsDropDown6(false);
                  // setIsDropDown7(false);
                }}
              >
                + Add location
              </button>
            </div>
            {isDropDown2 && (
              <Fragment>
                <div className="flex flex-col space-y-2   ">
                  {locationValues?.map((element, index) => (
                    <div
                      key={index}
                      className="shrink w-full lg:w-10/12 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0"
                    >
                      <>
                        <EditOutlined
                          onClick={() => {
                            setIsEditLocation(true);
                            setEditLocationValues({
                              ...element,
                              index,
                            });
                            setShowLocationPopup(true);
                          }}
                          className="text-violet border border-violet p-1 float-right cursor-pointer"
                        />
                      </>
                      <p className="font-bold text-xl">Location {index + 1}</p>
                      <p className=" font-bold">
                        Line1:{" "}
                        <span className="font-normal">{element.line1}</span>
                      </p>
                      <p className=" font-bold ">
                        Line2:{" "}
                        <span className="font-normal">{element.line2}</span>
                      </p>
                      <p className=" font-bold">
                        Pincode:{" "}
                        <span className="font-normal">{element.pincode}</span>
                      </p>
                      <p className=" font-bold">
                        Country:{" "}
                        <span className="font-normal">{element.country}</span>
                      </p>
                      <p className=" font-bold ">
                        State:{" "}
                       <span className="font-normal">{element.state}</span>
                      </p>
                      <p className=" font-bold">
                        City:{" "}
                        <span className="font-normal">{element.city}</span>
                      </p>
                      <p className=" font-bold">
                        Area:{" "}
                        <span className="font-normal">{element.area}</span>
                      </p>
                    </div>
                  ))}
                </div>{" "}
              </Fragment>
            )}

            {/* <div
              className={` w-full px-6 space-y-4 lg:space-y-0 lg:px-8   mb-6  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
            >
              <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                Set Areas
              </h2>

              <Autocomplete
                multiple
                id="tags-standard"
                onChange={(event, newValue) => {
                  setAreas(newValue);
                }}
                value={areas}
                options={areas}
                getOptionLabel={(tag) => tag}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    // hiddenLabel
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setAreas([...areas, e.target.value]);
                      }
                    }}
                    // style={{ backgroundColor:"white" , outline: 'none'}}
                    // className={classes.root}
                    {...params}
                    variant="standard"
                    placeholder="Areas"
                  />
                )}
              />
            </div> */}
          </section>

          {/* section-3  */}

          <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
            <div className="flex">
              <DropdownSelector
                title="Your Services"
                isDropDown1State={[isDropDown8, setIsDropDown8]}
                className=""
              />
            </div>
            {isDropDown8 && (
              <>
                <CategorySelect
                  categories={[
                    "Junior Secondary School (Class 6-8th)",
                    "Higher Secondary School (Class 9-10th)",
                    "Senior Secondary School (Class 11-12th)",
                    "Competitive Exams",
                    "Skill Based Courses",
                    "Test Prep",

                    "Graduation",
                    "Post Graduation",
                    "Language Courses",
                    "Computer",
                  ]}
                  selectedState={[instituteDomain, setInstituteDomain]}
                  placeholderText="Select your domain"
                  errorState={[instituteDomainError, setInstituteDomainError]}
                />

                {instituteDomain.includes(
                  "Junior Secondary School (Class 6-8th)"
                ) && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Junior Secondary School (Class 6-8th)
                    </h2>
                    <CategorySelect
                      placeholderText={"Select Board"}
                      categories={[
                        "CBSE",
                        "ICSE",
                        "NIOS",
                        "UP State Board",
                        "West Bengal State Board",
                        "International Board",
                        "Tamilnadu State Board",
                        "Maharashtra State Board",
                        "Other",
                      ]}
                      selectedState={[boardsJrSchool, setBoardsJrSchool]}
                      errorState={[boardsJrSchoolError, setBoardsJrSchoolError]}
                    />
                    <CategorySelect
                      categories={["Class 6", "Class 7", "Class 8"]}
                      selectedState={[classesJrSchool, setClassesJrSchool]}
                      placeholderText="Select class"
                      errorState={[
                        classesJrSchoolError,
                        setClassesJrSchoolError,
                      ]}
                    />
                    <CategorySelect
                      categories={[
                        "English ",
                        "Hindi ",
                        "Maths ",
                        "Science ",
                        "Social Studies ",
                        "Computer Science",
                        "Chemistry",
                        "Physics",
                        "Biology",
                        "Other ",
                      ]}
                      selectedState={[subjectsJrSchool, setSubjectsJrSchool]}
                      placeholderText="Select subjects as per classes"
                      errorState={[
                        subjectsJrSchoolError,
                        setSubjectsJrSchoolError,
                      ]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes(
                  "Higher Secondary School (Class 9-10th)"
                ) && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Higher Secondary School (Class 9-10th)
                    </h2>
                    <CategorySelect
                      placeholderText={"Select Board"}
                      categories={[
                        "CBSE",
                        "ICSE",
                        "NIOS",
                        "UP State Board",
                        "West Bengal State Board",
                        "International Board",
                        "Tamilnadu State Board",
                        "Maharashtra State Board",
                        "Other",
                      ]}
                      selectedState={[boardsHrSchool, setBoardsHrSchool]}
                      errorState={[boardsHrSchoolError, setBoardsHrSchoolError]}
                    />
                    <CategorySelect
                      categories={["Class 9", "Class 10"]}
                      selectedState={[classesHrSchool, setClassesHrSchool]}
                      placeholderText="Select class"
                      errorState={[
                        classesHrSchoolError,
                        setClassesHrSchoolError,
                      ]}
                    />
                    <CategorySelect
                      categories={[
                        "English ",
                        "Hindi ",
                        "Maths ",
                        "Science ",
                        "Social Studies ",
                        "Computer Science",
                        "Chemistry",
                        "Physics",
                        "Biology",
                        "Other ",
                      ]}
                      selectedState={[subjectsHrSchool, setSubjectsHrSchool]}
                      placeholderText="Select subjects as per classes"
                      errorState={[
                        subjectsHrSchoolError,
                        setSubjectsHrSchoolError,
                      ]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes(
                  "Senior Secondary School (Class 11-12th)"
                ) && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Senior Secondary School (Class 11-12th)
                    </h2>
                    <CategorySelect
                      placeholderText={"Select Board"}
                      categories={[
                        "CBSE",
                        "ICSE",
                        "NIOS",
                        "UP State Board",
                        "West Bengal State Board",
                        "International Board",
                        "Tamilnadu State Board",
                        "Maharashtra State Board",
                        "Other",
                      ]}
                      selectedState={[boardsSrSchool, setBoardsSrSchool]}
                      errorState={[boardsSrSchoolError, setBoardsSrSchoolError]}
                    />
                    <CategorySelect
                      categories={[
                        "Science",
                        "Commerce",
                        "Arts/Humanities",
                        "Vocational",
                      ]}
                      selectedState={[streamsSrSchool, setStreamsSrSchool]}
                      placeholderText="Select Streams"
                      errorState={[
                        streamsSrSchoolError,
                        setStreamsSrSchoolError,
                      ]}
                    />
                    <CategorySelect
                      categories={getSubjectsFromStreams(streamsSrSchool)}
                      selectedState={[subjectsSrSchool, setSubjectsSrSchool]}
                      placeholderText="Select subjects as per streams"
                      errorState={[
                        subjectsSrSchoolError,
                        setSubjectsSrSchoolError,
                      ]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes("Competitive Exams") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      For Competitive Exams
                    </h2>
                    <CategorySelect
                      categories={[
                        "UPSC",
                        "Defence Services",
                        "LAW",
                        "Fashion & Design",
                        "Medical",
                        "Engineering ",
                        // "Foreign English ",
                        "MBA",
                        "Banking",
                        "College Entrance Exams",
                        "Current Affairs",
                      ]}
                      selectedState={[
                        fieldsCompetitiveExams,
                        setFieldsCompetitiveExams,
                      ]}
                      placeholderText="Select your field"
                      errorState={[
                        fieldsCompetitiveExamsError,
                        setFieldsCompetitiveExamsError,
                      ]}
                    />
                    <CategorySelect
                      categories={getExamsFromFields(fieldsCompetitiveExams)}
                      selectedState={[
                        examsCompetitiveExams,
                        setExamsCompetitiveExams,
                      ]}
                      placeholderText="Select exams as per fields"
                      errorState={[
                        examsCompetitiveExamsError,
                        setExamsCompetitiveExamsError,
                      ]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes("Skill Based Courses") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Skill Based Courses
                    </h2>
                    <CategorySelect
                      categories={[
                        "Designing ",
                        "Marketing ",
                        "Photography ",
                        "Animation and VFX",
                        "Leadership & Management Training",
                        "Spoken English",
                        "Personality Development",
                        "Interview Skill Training",
                        "Public Speaking ",
                        "Computer Science",
                        "Digital Marketing ",
                        "Other",
                      ]}
                      selectedState={[skills, setSkills]}
                      placeholderText="Please enter the courses you provide classes "
                      errorState={[skillsError, setSkillsError]}
                    />
                  </React.Fragment>
                )}

                {instituteDomain?.includes("Test Prep") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Test Prep
                    </h2>

                    <CategorySelect
                      categories={[
                        "GMAT",
                        "GRE",
                        "SAT",
                        "IELTS",
                        "TOEFL",
                        "PTE",
                        "OET",
                      ]}
                      selectedState={[testPrep, setTestPrep]}
                      errorState={[testPrepError, setTestPrepError]}
                      placeholderText="Please enter the test prep's classes you provide"
                    />
                  </React.Fragment>
                )}

                {instituteDomain.includes("Language Courses") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Language Courses
                    </h2>
                    <CategorySelect
                      categories={[
                        "Spoken English",
                        "French",
                        "German",
                        "Spanish",
                        "Japanese",
                      ]}
                      selectedState={[language, setLanguage]}
                      placeholderText="Please enter the skills you provide classes  "
                      errorState={[languageError, setLanguageError]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes("Computer") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Computer
                    </h2>
                    <CategorySelect
                      categories={[
                        "Advance Excel",
                        "VBA Macro",
                        "Python",
                        "Machine Learning",
                        "SAS",
                        "R",
                        "Programming",
                        "SAP",
                        "Digital Marketing",
                      ]}
                      selectedState={[computer, setComputer]}
                      placeholderText="Please enter the courses you provide classes"
                      errorState={[computerError, setComputerError]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes("Graduation") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Graduation
                    </h2>
                    <CategorySelect
                      categories={["Science", "Commerce", "Humanities"]}
                      selectedState={[graduationStreams, setGraduationStreams]}
                      placeholderText="Select Streams "
                      errorState={[majorsError, setMajorsError]}
                    />
                    <CategorySelect
                      categories={getGraduationFromStreams(graduationStreams)}
                      selectedState={[graduationCourses, setGraduationCourses]}
                      placeholderText="Select Courses "
                      errorState={[
                        graduationFieldsError,
                        setGraduationFieldsError,
                      ]}
                    />
                  </React.Fragment>
                )}
                {instituteDomain.includes("Post Graduation") && (
                  <React.Fragment>
                    <h2 className="text-lg font-medium text-slate my-4">
                      Post Graduation
                    </h2>
                    <CategorySelect
                      categories={["Science", "Commerce", "Humanities"]}
                      selectedState={[
                        postGraduationStreams,
                        setPostGraduationStreams,
                      ]}
                      placeholderText="Select Streams"
                      errorState={[postMajorsError, setPostMajorsError]}
                    />
                    <CategorySelect
                      categories={getPostGraduationFromStreams(
                        postGraduationStreams
                      )}
                      selectedState={[
                        postGraduationCourses,
                        setPostGraduationCourses,
                      ]}
                      placeholderText="Select Courses "
                      errorState={[
                        postGraduationFieldsError,
                        setPostGraduationFieldsError,
                      ]}
                    />
                  </React.Fragment>
                )}
              </>
            )}
          </section>

          {/* section-8  */}

          <section className="  w-full px-6 space-y-4 lg:space-y-2 lg:px-12   mb-6">
            <div className="flex">
              <DropdownSelector
                title="Owner Details"
                isDropDown1State={[isDropDown3, setIsDropDown3]}
                className=""
              />
            </div>
            {isDropDown3 && (
              <Fragment>
                <div className="flex flex-col   lg:flex-row lg:space-x-10">
                  <div
                    className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !ownerName && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Owner Name
                    </h2>

                    <input
                      type="text"
                      placeholder={ownerName}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={ownerName || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setOwnerName(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !ownerPhone && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Contact No.
                    </h2>

                    <input
                      type="text"
                      placeholder={ownerPhone}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={ownerPhone || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setOwnerPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                    !instituteMobile && !isDisable && "border-red"
                  }`}
                >
                  <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                    Owner Email.
                  </h2>

                  <input
                    type="text"
                    placeholder={ownerEmail}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={ownerEmail || ""}
                    disabled={isDisable}
                    onChange={(e) => {
                      setOwnerEmail(e.target.value);
                    }}
                  />
                </div>
              </Fragment>
            )}
          </section>

          {/* section-4  */}
          <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
            <div className="flex lg:mb-6 ">
              <DropdownSelector
                title="Manage Media"
                isDropDown1State={[isDropDown4, setIsDropDown4]}
                className=""
              />
            </div>
            <div className="space-y-10">
              {isDropDown4 && (
                <AdminMediaManager
                  all={[setAllVideos, setAllImages, setAllThumbnail]}
                  data={instituteDetails}
                />
              )}
            </div>
          </section>

          {/* section-5  */}

          <section className="  w-full px-6 space-y-4 lg:space-y-5 lg:px-12   mb-6">
            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:mb-10">
              <DropdownSelector
                title="Faculty"
                isDropDown1State={[isDropDown5, setIsDropDown5]}
              />
              <button
                className="bg-primary text-white w-32  rounded-full p-1 lg:ml-auto"
                onClick={() => {
                  // handleFacultyOpen()
                  setShowPopUp1(!showPopUp);
                }}
              >
                + Add Faculty
              </button>
            </div>
            {isDropDown5 && (
              <>
                {facultyValues?.filter((a) => a.position === "Founder")
                  .length ? (
                  <div className="mt-3">
                    <p className="font-semibold">Founder :</p>
                    <div className="grid sm:grid-cols-2 gap-10 ">
                      {facultyValues
                        ?.filter((a) => a.position === "Founder")
                        .map((element, index) => (
                          <div
                            key={index}
                            className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 relative"
                          >
                            <CloseCircleTwoTone
                              className=" w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-0  p-1 text-lg rounded-full  cursor-pointer"
                              twoToneColor={"red"}
                              onClick={(e) => {
                                removeHandleFaculty(element?.id);
                              }}
                            />
                            <div className="flex items-center ">
                              <img
                                src={`https://cdn.ostello.co.in/${element?.images?.[0]?.key}`}
                                className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                                alt=""
                              />
                              <div className="flex flex-col ml-2 lg:ml-4 ">
                                <input
                                  type="text"
                                  className="text-sm lg:text-lg font-bold focus:outline-none"
                                  defaultValue={element?.name}
                                />
                                <p
                                  className="text-xs lg:text-sm"
                                  style={{ color: "#A4A4A4" }}
                                >
                                  {element?.qualification}
                                </p>
                              </div>
                              <button
                                className="  text-white w-20 rounded-full p-1  ml-auto"
                                style={{ background: "#4C4C4C" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowEditPopUp(true);
                                  setActiveFaculty(element);
                                }}
                              >
                                {" "}
                                Edit{" "}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {facultyValues?.filter((a) => a.position === "Co-Founder")
                  .length ? (
                  <div className="">
                    <p className="font-semibold">Co-Founder :</p>
                    <div className="grid sm:grid-cols-2 gap-10 ">
                      {facultyValues
                        ?.filter((a) => a.position === "Co-Founder")
                        .map((element, index) => (
                          <div
                            key={index}
                            className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 relative"
                          >
                            <CloseCircleTwoTone
                              className=" w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-0  p-1 text-lg rounded-full  cursor-pointer"
                              twoToneColor={"red"}
                              onClick={(e) => {
                                removeHandleFaculty(element?.id);
                              }}
                            />
                            <div className="flex items-center ">
                              <img
                                src={`https://cdn.ostello.co.in/${element?.images?.[0]?.key}`}
                                className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                                alt=""
                              />
                              <div className="flex flex-col ml-2 lg:ml-4 ">
                                <input
                                  type="text"
                                  className="text-sm lg:text-lg font-bold focus:outline-none"
                                  defaultValue={element?.name}
                                />
                                <p
                                  className="text-xs lg:text-sm"
                                  style={{ color: "#A4A4A4" }}
                                >
                                  {element?.qualification}
                                </p>
                              </div>
                              <button
                                className="  text-white w-20 rounded-full p-1  ml-auto"
                                style={{ background: "#4C4C4C" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowEditPopUp(true);
                                  setActiveFaculty(element);
                                }}
                              >
                                {" "}
                                Edit{" "}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {facultyValues?.filter((a) => a.position === "Teacher")
                  .length ? (
                  <div className="mt-3">
                    <p className="font-semibold">Teacher :</p>
                    <div className="grid sm:grid-cols-2 gap-10 ">
                      {facultyValues
                        ?.filter((a) => a.position === "Teacher")
                        .map((element, index) => (
                          <div
                            key={index}
                            className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 relative"
                          >
                            <CloseCircleTwoTone
                              className=" w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-0  p-1 text-lg rounded-full  cursor-pointer"
                              twoToneColor={"red"}
                              onClick={(e) => {
                                removeHandleFaculty(element?.id);
                              }}
                            />
                            <div className="flex items-center ">
                              <img
                                src={`https://cdn.ostello.co.in/${element?.images?.[0]?.key}`}
                                className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                                alt=""
                              />
                              <div className="flex flex-col ml-2 lg:ml-4 ">
                                <input
                                  type="text"
                                  className="text-sm lg:text-lg font-bold focus:outline-none"
                                  defaultValue={element?.name}
                                />
                                <p
                                  className="text-xs lg:text-sm"
                                  style={{ color: "#A4A4A4" }}
                                >
                                  {element?.qualification}
                                </p>
                              </div>
                              <button
                                className="  text-white w-20 rounded-full p-1  ml-auto"
                                style={{ background: "#4C4C4C" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowEditPopUp(true);
                                  setActiveFaculty(element);
                                }}
                              >
                                {" "}
                                Edit{" "}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}

            {facultyValues?.filter((a) => a.position === null).length ? (
              <div className="mt-3">
                {/* <p className="font-semibold">Teacher :</p> */}
                <div className="grid sm:grid-cols-2 gap-10 ">
                  {facultyValues
                    ?.filter((a) => a.position === null)
                    .map((element, index) => (
                      <div
                        key={index}
                        className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 relative"
                      >
                        <CloseCircleTwoTone
                          className=" w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-0  p-1 text-lg rounded-full  cursor-pointer"
                          twoToneColor={"red"}
                          onClick={(e) => {
                            removeHandleFaculty(element?.id);
                          }}
                        />
                        <div className="flex items-center ">
                          <img
                            src={`https://cdn.ostello.co.in/${element?.images?.[0]?.key}`}
                            className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                            alt=""
                          />
                          <div className="flex flex-col ml-2 lg:ml-4 ">
                            <input
                              type="text"
                              className="text-sm lg:text-lg font-bold focus:outline-none"
                              defaultValue={element?.name}
                            />
                            <p
                              className="text-xs lg:text-sm"
                              style={{ color: "#A4A4A4" }}
                            >
                              {element?.qualification}
                            </p>
                          </div>
                          <button
                            className="  text-white w-20 rounded-full p-1  ml-auto"
                            style={{ background: "#4C4C4C" }}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowEditPopUp(true);
                              setActiveFaculty(element);
                            }}
                          >
                            {" "}
                            Edit{" "}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </section>

          {toppers?.length ? (
            <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
              <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:mb-10">
                <DropdownSelector
                  title="Toppers"
                  isDropDown1State={[isDropDown9, setIsDropDown9]}
                />
              </div>
              {isDropDown9 && (
                <div className="grid sm:grid-cols-2 gap-10 ">
                  {toppers?.map((element, index) => (
                    <div
                      key={index}
                      className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 relative"
                    >
                      {/* <CloseCircleTwoTone
                        className=' w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-0  p-1 text-lg rounded-full  cursor-pointer'
                        twoToneColor={'red'}
                        onClick={(e) => {
                          removeHandleFaculty(element.id)
                        }}
                      /> */}
                      <div className="flex items-center ">
                        <img
                          src={
                            element?.image?.length
                              ? `https://cdn.ostello.co.in/${element?.image[0]?.key}`
                              : "https://i.ibb.co/yPpnkpH/user.png"
                          }
                          className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                          alt=""
                        />
                        <div className="flex flex-col ml-2 lg:ml-4 ">
                          <input
                            type="text"
                            className="text-sm lg:text-lg font-bold focus:outline-none"
                            defaultValue={element.name}
                          />
                          <p
                            className="text-xs lg:text-sm"
                            style={{
                              color: "#A4A4A4",
                            }}
                          >
                            {element.description}
                          </p>
                        </div>
                        {/* <button
                          className='  text-white w-20 rounded-full p-1  ml-auto'
                          style={{
                            background: '#4C4C4C',
                          }}
                          onClick={() => {
                            setShowEditPopUp(true)
                            setActiveFaculty(element)
                          }}
                        >
                          {' '}
                          Edit{' '}
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : (
            ""
          )}

          <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
            <div className="flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0 lg:mb-10 ">
              <DropdownSelector
                title="Achievements"
                isDropDown1State={[isDropDown6, setIsDropDown6]}
              />
              <button
                className="bg-primary text-white w-44  rounded-full p-1 "
                onClick={() => {
                  setShowPopUp2(!showPopUp);
                }}
              >
                + Add Achievement
              </button>
            </div>
            {isDropDown6 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 z-0 ">
                {achievementValues?.map((item, idx) => (
                  <div key={idx} className="relative w-fit">
                    <CloseCircleTwoTone
                      onClick={(e) => {
                        e.preventDefault();
                        axios
                          .delete(`${host}/achievements?id=${item.id}`, {
                            headers: {
                              "Access-Control-Allow-Origin": "*",
                              Authorization: `Bearer ${
                                typeof window !== "undefined" &&
                                window.localStorage.getItem("ACCESS_TOKEN")
                              }`,
                            },
                          })
                          .then((res) => {
                      
                            toast.success(res.data.message);
                            setAchievementValues(
                              achievementValues.filter((f) => f.id !== item.id)
                            );
                          })
                          .catch((err) => {
                            toast.error(
                              "Got an error. Could not delete the achievement"
                            );
                        
                          });
                      }}
                      twoToneColor={"red"}
                      className="absolute -top-4 -right-6 cursor-pointer text-xl"
                    />
                    <div
                      key={item.id}
                      className="border rounded-md w-fit p-2 e"
                    >
                      <div className="shadow-sm flex items-center space-x-2">
                        <img src={item.image.url} className="w-10" alt="" />
                        <div>
                          <p>
                            <span className="font-bold">Title:</span>{" "}
                            {item.title}
                          </p>
                          <p>
                            <span className="font-bold">Description:</span>{" "}
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="  w-full px-6 space-y-4 lg:space-y-2 lg:px-12   mb-6">
            <div className="flex">
              <DropdownSelector
                title="Banking details"
                isDropDown1State={[isDropDown7, setIsDropDown7]}
              />
            </div>
            {isDropDown7 && (
              <Fragment>
                <div className="flex flex-col   lg:flex-row lg:space-x-10">
                  <div
                    className={`lg:w-96 shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !bankAccountNo && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Bank Account No
                    </h2>

                    <input
                      type="text"
                      placeholder={bankAccountNo}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={bankAccountNo || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setBankAccountNo(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`lg:w-96 shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !bankName && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Name of the Bank
                    </h2>

                    <input
                      type="text"
                      placeholder={bankName}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={bankName || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setBankName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col   lg:flex-row lg:space-x-10">
                  <div
                    className={`lg:w-96 shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !ifscCode && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      IFSC Code
                    </h2>

                    <input
                      type="text"
                      placeholder={ifscCode}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={ifscCode || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setIfscCode(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`lg:w-96 shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !gstNo && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      GST No
                    </h2>

                    <input
                      type="text"
                      placeholder={gstNo}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={gstNo || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setGstNo(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col   lg:flex-row lg:space-x-10">
                  <div
                    className={`lg:w-96 shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !accountHolderName && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      setAccountHolderName
                    </h2>

                    <input
                      type="text"
                      placeholder={accountHolderName}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={accountHolderName || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setAccountHolderName(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`lg:w-96 shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                      !branch && !isDisable && "border-red"
                    }`}
                  >
                    <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                      Branch
                    </h2>

                    <input
                      type="text"
                      placeholder={branch}
                      autoFocus
                      className="text-xl bg-white  focus:outline-none w-full"
                      defaultValue={branch || ""}
                      disabled={isDisable}
                      onChange={(e) => {
                        setBranch(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </Fragment>
            )}

            {isDropDown8 && (
              <>{<DocumentSubmission instituteDetails={instituteDetails} />}</>
            )}
          </section>
          <section className="w-full px-6 space-y-4 lg:space-y-2 lg:px-12   mb-6">
            <div
              className={` shrink lg:w-9/12 w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                !title && !isDisable && "border-red"
              }`}
            >
              <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                Add Meta Title
              </h2>

              <input
                type="text"
                placeholder={title}
                autoFocus
                className="text-xl bg-white  focus:outline-none w-full"
                defaultValue={title || ""}
                disabled={isDisable}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div
              className={` shrink lg:w-9/12 w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                !slug && !isDisable && "border-red"
              }`}
            >
              <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                Add Slug
              </h2>

              <input
                type="text"
                placeholder={slug}
                autoFocus
                className="text-xl bg-white  focus:outline-none w-full"
                defaultValue={slug || ""}
                disabled={isDisable}
                onChange={(e) => {
                  setSlug(e.target.value);
                }}
              />
            </div>
            <div
              className={`lg:w-9/12  shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
                !metaDesc && !isDisable && "border-red"
              }`}
            >
              <h2 className=" mb-1" style={{ fontSize: "15px" }}>
                Add Meta Description
              </h2>

              <textarea
                type="text"
                placeholder={metaDesc}
                autoFocus
                rows={3}
                className="text-xl bg-white  focus:outline-none w-full"
                defaultValue={metaDesc || ""}
                disabled={isDisable}
                onChange={(e) => {
                  setMetaDesc(e.target.value);
                }}
              />
            </div>
          </section>
        </div>

        <div className="flex py-5 items-center justify-center">
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-3 text-[#525252] mr-2 text-lg font-medium rounded-lg bg-[#F0F0F0] border-0"
          >
            Delete Institute
          </button>
          {!isDisable && (
            <button
              onClick={() => handleSubmit()}
              className="px-8 py-3 text-[white] text-lg font-medium rounded-lg bg-[#7D23E0]  border-0"
            >
              Update Data
            </button>
          )}
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-5 bg-white">
            <div>
              <button
                className="px-12 font-bold text-lg rounded-lg py-2 text-white bg-[#E46060]  mb-2 "
                onClick={() => deleteHandle()}
              >
                Confirm Delete
              </button>
            </div>
            <div>
              <button
                className="px-12 font-bold rounded-lg py-2 text-white bg-ghost/80 text-lg w-full"
                onClick={() => setOpen(false)}
              >
                Cancel Delete
              </button>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default AdminInstituteOverview;
