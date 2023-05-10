import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";

import { EditOutlined } from "@ant-design/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CategorySelect from "../../../../components/CategorySelect";
import {
  getExamsFromFields,
  getSubjectsFromStreams,
  subjectsForStreams,
  getPostGraduationFromStreams,
  getGraduationFromStreams,
} from "../../../../components/pages/AdminDashboard/Institutes/AdminInstituteDetails/AdminInstituteOverview/Data";
import AddAchievementPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/AddAchievementPopup";
import AdminLocationPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/AdminLocationPopup";
import { CustomInputField } from "../../../../components/pages/Merchant/Dashboard/MyProfile/CustomInputField";
import DropdownSelector from "../../../../components/pages/Merchant/Dashboard/MyProfile/DropdownSelector";
import FacultyEditPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/FacultyEditPopup";
import FacultyPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/FacultyPopup";
import { LogoIcon } from "../../../../components/SVGIcons";
import {
  fetchAdminInstitutes,
  instituteApprove,
} from "../../../../redux/slices/adminInstitutesSlice";
import { host } from "../../../../utils/constant";
import { isEmpty, isJsonParsable } from "../../../../utils/utils";
import toast from "react-hot-toast";

const EditInstitute = () => {
  const router = useRouter();
  const { instituteId } = router.query;

  const [id, setId] = useState(instituteId);
  const [reFetch, setRefetch] = useState(false);

  const [editBankDetails, setEditBankDetails] = useState(false);
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
  const navigate = (link) => router.push(link);
  const [instituteDetails, setInstituteDetails] = useState({});
  const [locationValues, setLocationValues] = useState(
    instituteDetails?.locations
  );
  const [activeFaculty, setActiveFaculty] = useState(null);
  const [facultyValues, setFacultyValues] = useState([]);
  const [achievementValues, setAchievementValues] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `${host}/institute/faculty?instituteId=${id}&limit=20`
          );
          setFacultyValues(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [id]);

  const [instituteDomain, setInstituteDomain] = useState([]);
  const [instituteDomainError, setInstituteDomainError] = useState("");

  const [classMode, setClassMode] = useState();
  const [imageCounter, setImageCounter] = useState(0);
  const [videoCounter, setVideoCounter] = useState(0);
  const [instituteName, setInstituteName] = useState(instituteDetails?.name);

  const [ownerName, setOwnerName] = useState(instituteDetails?.owner?.name);
  const [ownerEmail, setOwnerEmail] = useState(instituteDetails?.owner?.email);
  const [ownerPhone, setOwnerPhone] = useState(
    instituteDetails?.owner?.phonenumber
  );

  const [instituteMobile, setInstituteMobile] = useState(
    instituteDetails?.phonenumber
  );
  const [instituteDescription, setInstituteDescription] = useState();

  const [descriptionError, setDescriptionError] = useState();

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [instituteEmail, setInstituteEmail] = useState(instituteDetails?.email);
  const [singleInstitute, setSingleInstitute] = useState({});
  const dispatch = useDispatch();
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
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [branch, setBranch] = useState("");

  const [fieldsCompetitiveExamsError, setFieldsCompetitiveExamsError] =
    useState("");
  const [examsCompetitiveExamsError, setExamsCompetitiveExamsError] =
    useState("");
  const [skillsError, setSkillsError] = useState("");
  const [testPrepError, setTestPrepError] = useState("");

  useEffect(() => {
    const run = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `${host}/institute?id=${id}&relations=owner,courses,faculties,achievements,reviews`
          );
          setInstituteDetails(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [id]);

  useEffect(() => {
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

    if (instituteDetails?.name) {
      setInstituteName(instituteDetails?.name);
    }

    if (instituteDetails?.phonenumber) {
      setInstituteMobile(instituteDetails?.phonenumber);
    }

    if (instituteDetails?.email) {
      setInstituteEmail(instituteDetails?.email);
    }

    if (instituteDetails?.owner?.name) {
      setOwnerName(instituteDetails?.owner?.name);
    }

    if (instituteDetails?.owner?.email) {
      setOwnerEmail(instituteDetails?.owner?.email);
    }

    if (instituteDetails?.owner?.phonenumber) {
      setOwnerPhone(instituteDetails?.owner?.phonenumber);
    }

    if (instituteDetails?.workingtime) {
      setOpeningTime(instituteDetails?.workingtime?.split("to")[0].trim());
      setClosingTime(instituteDetails?.workingtime?.split("to")[1].trim());
    }

    // if (instituteDetails?.faculties) {
    //   setFacultyValues(instituteDetails?.faculties);
    // }
    if (instituteDetails?.bank) {
      setAccountHolderName(instituteDetails?.bank?.accHolderName);
      setBankAccountNo(instituteDetails?.bank?.bankAccNo);
      setBankName(instituteDetails?.bank?.bankName);
      setBranch(instituteDetails?.bank?.branch);
      setGstNo(instituteDetails?.bank?.gstNo);
      setIfscCode(instituteDetails?.bank?.ifscNo);
    }

    if (instituteDetails?.classmode) {
      if (instituteDetails.updatedRequest.classmode == 1) {
        setClassMode("Hybrid");
      } else if (instituteDetails.updatedRequest.classmode == 2) {
        setClassMode("Online");
      } else if (instituteDetails.updatedRequest.classmode == 3) {
        setClassMode("Offline");
      }
    }

    if (instituteDetails) {
      if (instituteDetails?.achievements) {
        setAchievementValues([...instituteDetails?.achievements]);
      }
    }

    setLocationValues(instituteDetails?.locations);

    if (instituteDetails?.services) {
      saveServicesToState(instituteDetails.services);
    }

    if (instituteDetails?.short_description) {
      setInstituteShortDescription(instituteDetails?.short_description);
    }
  }, [instituteDetails, instituteId]);

  const [subjectsForStreams, setSubjectsForStreams] = useState([]);

  const saveServicesToState = (services) => {
    if (services["Junior Secondary School (Class 6-10th)"]) {
      setInstituteDomain((prv) =>
        prv.concat("Junior Secondary School (Class 6-8th)")
      );
      setBoardsJrSchool(
        services["Junior Secondary School (Class 6-10th)"].boards
      );
      setClassesJrSchool(
        services["Junior Secondary School (Class 6-10th)"].classes?.filter(
          (className) => className !== "Class 9" && className !== "Class 10"
        )
      );
      setSubjectsJrSchool(
        services["Junior Secondary School (Class 6-10th)"].subjects
      );
    }
    if (services["Junior Secondary School (Class 6-10th)"]) {
      if (
        services["Junior Secondary School (Class 6-10th)"].classes.includes(
          "Class 9"
        ) ||
        services["Junior Secondary School (Class 6-10th)"].classes.includes(
          "Class 10"
        )
      ) {
        setInstituteDomain((prv) =>
          prv.concat("Higher Secondary School (Class 9-10th)")
        );
        setBoardsHrSchool(
          services["Junior Secondary School (Class 6-10th)"].boards
        );
        setClassesHrSchool(
          services["Junior Secondary School (Class 6-10th)"].classes?.filter(
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
      setInstituteDomain((prv) =>
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
      setInstituteDomain((prv) =>
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
      setInstituteDomain((prv) => prv.concat("Language Courses"));
      setLanguage(services["Language Courses"].language);
    }

    if (services["Computer"]) {
      setInstituteDomain((prv) => prv.concat("Computer"));
      setComputer(services["Computer"].computer);
    }

    if (services["Senior Secondary School (Class 11-12th)"]) {
      setInstituteDomain((prv) =>
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
      setInstituteDomain((prv) => prv.concat("Competitive Exams"));
      setFieldsCompetitiveExams(services["Competitive Exams"].fields);
      setExamsCompetitiveExams(services["Competitive Exams"].examsPerFields);
    }
    if (services["Skill Based Courses"]) {
      setInstituteDomain((prv) => prv.concat("Skill Based Courses"));
      setSkills(services["Skill Based Courses"].skills);
    }
    if (services["Test Prep"]) {
      setInstituteDomain((prv) => prv.concat("Test Prep"));
      setTestPrep(services["Test Prep"].courses);
    }
    if (services["Graduation"]) {
      setInstituteDomain((prv) => prv.concat("Graduation"));
      setGraduationStreams(services["Graduation"].grstreams);
      setGraduationCourses(services["Graduation"].courses);
    }
    if (services["Post Graduation"]) {
      setInstituteDomain((prv) => prv.concat("Post Graduation"));
      setPostGraduationStreams(services["Post Graduation"].grstreams);
      setPostGraduationCourses(services["Post Graduation"].courses);
    }
  };

  const formattedDomain = () => {
    const temp = {};

    instituteDomain.forEach((item) => {
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
  }, [showPopUp]);

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
    return source?.map((video, index) => {
      return (
        <div className="flex" key={index}>
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
  const [instituteShortDescription, setInstituteShortDescription] =
    useState("");

  const updateData = () => {
    const temp = [];

    instituteDomain.forEach((item) => {
      if (item === "Junior Secondary School (Class 6-10th)") {
        let tempObj = {
          domainName: "Junior Secondary School (Class 6-10th)",
          boards: boardsJrSchool,
          classes: classesJrSchool,
          subjects: subjectsJrSchool,
        };

        temp.push(tempObj);
      }

      if (item === "Senior Secondary School (Class 11-12th)") {
        let tempObj = {
          domainName: "Senior Secondary School (Class 11-12th)",
          boards: boardsSrSchool,
          streams: streamsSrSchool,
          subjectsForStreams,
          subjects: subjectsSrSchool,
        };
        temp.push(tempObj);
      }
      if (item === "Competitive Exams") {
        let tempObj = {
          domainName: "Competitive Exams",
          fields: fieldsCompetitiveExams,
          examsPerFields: examsCompetitiveExams,
        };
        temp.push(tempObj);
      }
      if (item === "Skill Based Courses") {
        let tempObj = {
          domainName: "Skill Based Courses",
          skills,
        };
        temp.push(tempObj);
      }
      if (item === "Test Prep") {
        let tempObj = {
          domainName: "Test Prep",
          courses: testPrep,
        };
        temp.push(tempObj);
      }
      if (item === "Graduation") {
        let tempObj = {
          domainName: "Graduation",
          grstreams: graduationStreams,
          courses: graduationCourses,
        };
        temp.push(tempObj);
      }
      if (item === "Post Graduation") {
        let tempObj = {
          domainName: "Post Graduation",
          grstreams: postGraduationStreams,
          courses: postGraduationCourses,
        };
        temp.push(tempObj);
      }
    });

    let formData = new FormData();
    formData.append(
      "id",
      typeof window !== "undefined" &&
        window.localStorage.getItem("INSTITUTE_ID")
    );
    formData.append(
      "updates",
      JSON.stringify({
        name: instituteName,
        description: instituteDescription,
        coursecategories: instituteDomain,
        phonenumber: instituteMobile,
        email: instituteEmail,
        classmode: mode,
        workingtime:
          openingTime && closingTime
            ? `${openingTime} to ${closingTime}`
            : null,
        owner: [
          { name: ownerName },
          { email: ownerEmail },
          { phonenumber: ownerPhone },
        ],
        services: temp,
        location: [],
        documents: [
          { address: addressFile },
          { adhaar: aadharFile },
          { registration: registrationFile },
        ],

        bank: [
          { accountno: bankAccountNo },
          { bankname: bankName },
          { branch: branch },
          { accountholdername: accountHolderName },
          { gstno: gstNo },
          { ifsccode: ifscCode },
        ],
      })
    );
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", videos[i]);
    }

    axios
      .patch(`${host}/institute/update`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      })

      .then(({ data }) => {
        Swal.fire({
          icon: "info",
          title: "Wait For Admin Approval Please",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setUpdateReqSent(true);

        setIsDisable(true);
      })
      .catch((err) => {
        console.error(err);
        setUpdateReqSent(false);
      })
      .finally(() => handleOpen());
  };

  const [locationOpen, setLocationOpen] = React.useState(false);
  const handleLocationOpen = () => setLocationOpen(true);

  const [facultyOpen, setFacultyOpen] = React.useState(false);
  const handleFacultyOpen = () => setFacultyOpen(true);

  const [achievementOpen, setAchievementOpen] = React.useState(false);
  const handleAchievementOpen = () => setAchievementOpen(true);

  const [editOpen, setEditOpen] = React.useState(false);

  // const handleSubmit = () => {
  //   if (instituteName) {
  //     const temp = []

  //     instituteDomain.forEach((item) => {
  //       if (item === 'Junior Secondary School (Class 6-10th)') {
  //         let tempObj = {
  //           domainName: 'Junior Secondary School (Class 6-10th)',
  //           boards: boardsJrSchool,
  //           classes: classesJrSchool,
  //           subjects: subjectsJrSchool,
  //         }

  //         temp.push(tempObj)
  //       }

  //       if (item === 'Senior Secondary School (Class 11-12th)') {
  //         let tempObj = {
  //           domainName: 'Senior Secondary School (Class 11-12th)',
  //           boards: boardsSrSchool,
  //           streams: streamsSrSchool,
  //           subjectsForStreams,
  //           subjects: subjectsSrSchool,
  //         }
  //         temp.push(tempObj)
  //       }
  //       if (item === 'Competitive Exams') {
  //         let tempObj = {
  //           domainName: 'Competitive Exams',
  //           fields: fieldsCompetitiveExams,
  //           examsPerFields: examsCompetitiveExams,
  //         }
  //         temp.push(tempObj)
  //       }
  //       if (item === 'Skill Based Courses') {
  //         let tempObj = {
  //           domainName: 'Skill Based Courses',
  //           skills,
  //         }
  //         temp.push(tempObj)
  //       }
  //       if (item === 'Graduation') {
  //         let tempObj = {
  //           domainName: 'Graduation',
  //           majors,
  //           fields: graduationFields,
  //         }
  //         temp.push(tempObj)
  //       }
  //       if (item === 'Post Graduation') {
  //         let tempObj = {
  //           domainName: 'Post Graduation',
  //           majors: postMajors,
  //           fields: postGraduationFields,
  //         }
  //         temp.push(tempObj)
  //       }
  //     })

  //     let updatedArea = []

  //     if (instituteDetails?.updatedRequest?.locations) {
  //       instituteDetails?.updatedRequest?.locations.forEach((item) => {
  //         Object.values(item).forEach((keywords) => {
  //           updatedArea.push(
  //             keywords
  //               .toString()
  //               .replace(/\s*\,\s*/g, ',')
  //               .trim()
  //               .replace(/,(?=[^,]*$)/, '')
  //               .toLowerCase()
  //           )
  //         })
  //       })
  //     }

  //     if (!instituteDetails?.updatedRequest?.locations) {
  //       updatedArea.push(
  //         instituteDetails?.updatedRequest?.areas || instituteDetails?.areas
  //       )
  //     }
  //
  //     const updatedData = {
  //       id,
  //       updates: {
  //         name: instituteName,
  //         description: JSON.stringify(instituteDescription),
  //         coursecategories: instituteDomain,
  //         phonenumber: instituteMobile,
  //         email: instituteEmail,
  //         workinghours:
  //           openingTime && closingTime
  //             ? `${openingTime} to ${closingTime}`
  //             : null,
  //         services: temp,
  //         achievements: [],
  //         bank: {
  //           accHolderName: accountHolderName,
  //           bankAccNo: bankAccountNo,
  //           bankName: bankName,
  //           branch: branch,
  //           gstNo: gstNo,
  //           ifscNo: ifscCode,
  //         },
  //         classmode: mode,
  //         areas: updatedArea,
  //         documents: {
  //           adhaar:
  //             instituteDetails?.documents?.adhaar ||
  //             instituteDetails?.updatedRequest?.documents?.adhaar,
  //           address:
  //             instituteDetails?.documents?.address ||
  //             instituteDetails?.updatedRequest?.documents?.address,
  //           registration:
  //             instituteDetails?.documents?.registration ||
  //             instituteDetails?.updatedRequest?.documents?.registration,
  //         },

  //         establishedyear: instituteDetails?.establishedyear,

  //         images: allImages,
  //         videos: allVideos,
  //         locations: locationValues,
  //         studentsenrolled: enrolledStudent,
  //         toppers:
  //           instituteDetails?.updatedRequest?.toppers ||
  //           instituteDetails?.toppers,
  //       },
  //     }
  //

  //     dispatch(adminUpdateInstitute(updatedData))
  //     navigate('/admin-dashboard/requests/institute-requests')
  //   }
  // }

  const handleSubmit = () => {
    const updatedData = {
      id,
      approve: 1,
    };

    dispatch(instituteApprove(updatedData));
    navigate("/admin-dashboard/requests/institute-requests");
  };

  const handleReject = () => {
    const updatedData = {
      id,
      approve: 2,
    };

    dispatch(instituteApprove(updatedData));
    navigate("/admin-dashboard/requests/institute-requests");
    // if (isUpdated) {
    //   Swal.fire({
    //     icon: "danger",
    //     title: "Institute approval rejected",
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   navigate("/admin-dashboard/requests/institute-requests");
    // }
  };

  return (
    <div className="flex bg-[#fafafa] min-h-screen md:flex-row flex-col">
      <Head>
        <title>Institute Overview - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-[220px] md:block hidden  px-5 ">
        <div
          className="heading mb-5 flex items-center text-2xl cursor-pointer "
          onClick={() => router.back()}
        >
          <AiOutlineArrowLeft />
          <h1 className="font-bold ml-2 ">Back</h1>
        </div>
      </div>

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
              }}
            />
          )}
          {showPopUp1 && (
            <FacultyPopup
              activeFaculty={activeFaculty}
              showPopUpState1={[showPopUp1, setShowPopUp1]}
              valuesState={[facultyValues, setFacultyValues]}
              fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
              title="Add faculty"
            />
          )}

          {showEditPopUp && (
            <FacultyEditPopup
              activeFaculty={activeFaculty}
              showPopUpState1={[showEditPopUp, setShowEditPopUp]}
              valuesState={[facultyValues, setFacultyValues]}
              fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
              title="Edit"
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
              <div className="md:block hidden">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-2xl w-full font-bold">Institute</h3>
                  <div className="flex md:justify-end justify-between w-full items-center">
                    <div className="flex items-center">
                      <p className="pr-3 font-semibold">Super Admin</p>
                      <LogoIcon className={"w-16 h-fit"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <DropdownSelector
                  title="Basic Details"
                  isDropDown1State={[isDropDown1, setIsDropDown1]}
                  className=""
                />

                {/* {isDisable ? (
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
                )} */}
              </div>

              {isDropDown1 && (
                <Fragment>
                  <div className="flex flex-col    lg:flex-row lg:space-x-10">
                    <CustomInputField
                      inputState={[instituteName, setInstituteName]}
                      description={instituteName}
                      className=" lg:w-96 shrink  mb-4 lg:mb-0"
                      disableState={[isDisable, setIsDisable]}
                      name="Institute Name"
                    />
                    <CustomInputField
                      inputState={[instituteMobile, setInstituteMobile]}
                      description={instituteDetails?.phonenumber}
                      className="lg:w-96 shrink"
                      disableState={[isDisable, setIsDisable]}
                      name="Contact No."
                    />
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
                  <div className="flex flex-col  lg:flex-row lg:space-x-10">
                    <CustomInputField
                      inputState={[instituteEmail, setInstituteEmail]}
                      description={instituteDetails?.email}
                      className=" lg:w-96 shrink mb-4 lg:mb-0"
                      disableState={[isDisable, setIsDisable]}
                      name="Institute email"
                    />
                  </div>

                  <div>
                    <div className="shrink w-full  md:w-1/4 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 mb-2">
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
            <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
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
                    setIsDropDown1(false);
                    setIsDropDown2(false);
                    setIsDropDown3(false);
                    setIsDropDown4(false);
                    setIsDropDown5(false);
                    setIsDropDown6(false);
                    setIsDropDown7(false);
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
                        <p className="font-bold text-xl">
                          Location {index + 1}
                        </p>
                        <p className=" font-bold">
                          Line1:{" "}
                          <span className="font-normal">{element.line1}</span>
                        </p>
                        <p className=" font-bold flex">
                          Line2:{" "}
                          <input
                            defaultValue={element?.line2}
                            disabled={isDisable ? true : false}
                            type="text"
                            autoFocus
                            className="ml-2 border-0 bg-white outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full font-normal"
                          />
                        </p>
                        <p className=" font-bold">
                          Pincode:{" "}
                          <span className="font-normal">{element.pincode}</span>
                        </p>
                        <p className=" font-bold">
                          Country:{" "}
                          <span className="font-normal">{element.country}</span>
                        </p>
                        <p className=" font-bold flex">
                          State:{" "}
                          <input
                            defaultValue={element?.state}
                            disabled={isDisable ? true : false}
                            type="text"
                            autoFocus
                            className="ml-2 border-0 bg-white outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full font-normal"
                          />
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
                      "Junior Secondary School (Class 6-88th)",
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
                        errorState={[
                          boardsJrSchoolError,
                          setBoardsJrSchoolError,
                        ]}
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
                        errorState={[
                          boardsHrSchoolError,
                          setBoardsHrSchoolError,
                        ]}
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
                        errorState={[
                          boardsSrSchoolError,
                          setBoardsSrSchoolError,
                        ]}
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
                          "Leadership & Management Training ",
                          "Spoken English",
                          "Personality Development",
                          "Interview Skill Training",
                          "Public Speaking ",
                          "Computer Science",
                          "Digital Marketing ",
                          "Other",
                        ]}
                        selectedState={[skills, setSkills]}
                        placeholderText="Please enter the skills you provide classes for "
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
                        placeholderText="Please enter the courses you provide classes  "
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
                        selectedState={[
                          graduationStreams,
                          setGraduationStreams,
                        ]}
                        placeholderText="Select Streams "
                        errorState={[majorsError, setMajorsError]}
                      />
                      <CategorySelect
                        categories={getGraduationFromStreams(graduationStreams)}
                        selectedState={[
                          graduationCourses,
                          setGraduationCourses,
                        ]}
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

            <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
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
                    <CustomInputField
                      inputState={[ownerName, setOwnerName]}
                      description={instituteDetails?.owner?.name}
                      className=" lg:w-96 shrink  mb-4 lg:mb-0 "
                      disableState={[isDisable, setIsDisable]}
                      name="Owner Name"
                    />
                    <CustomInputField
                      inputState={[ownerPhone, setOwnerPhone]}
                      description={instituteDetails?.owner?.phonenumber}
                      className="lg:w-96 shrink"
                      disableState={[isDisable, setIsDisable]}
                      name="Contact No."
                    />
                  </div>
                  <CustomInputField
                    inputState={[ownerEmail, setOwnerEmail]}
                    description={instituteDetails?.owner?.email}
                    className="lg:w-96 shrink"
                    disableState={[isDisable, setIsDisable]}
                    name="Owner email"
                  />
                </Fragment>
              )}
            </section>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleSubmit()}
              className="my-2 transition-all bg-primary hover:-translate-y-1 shadow-md hover:shadow-lg rounded px-16 py-3 text-white font-medium"
            >
              Accept Changes
            </button>
            <button
              onClick={() => handleReject()}
              className=" ml-3 my-2 transition-all bg-red-500/80 hover:-translate-y-1 shadow-md hover:shadow-lg rounded px-16 py-3 text-white font-medium"
            >
              Reject
            </button>
            <button
              className="ml-3 bg-red-500/60 my-2 transition-all  hover:-translate-y-1 shadow-md hover:shadow-lg rounded px-16 py-3 text-white font-medium "
              onClick={() => {
                setIsDisable(true);
                navigate("/admin-dashboard/requests/institute-requests");
              }}
            >
              Cancel Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditInstitute;
