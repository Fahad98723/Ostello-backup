import axios from "axios";
import { TiMessage } from "react-icons/ti";
import { IoRocketSharp } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { toast } from "react-hot-toast";
import LocationPopup from "./LocationPopup";
import FacultyPopup from "./FacultyPopup";
import FacultyEditPopup from "./FacultyEditPopup";
import AddAchievementPopup from "./AddAchievementPopup";
import DropdownSelector from "./DropdownSelector";
import QRCodeFunction from "./QRCodeFunction";
import { CustomInputField } from "./CustomInputField";
import DocumentSubmission from "./DocumentSubmission";
import CategorySelect from "../../../../CategorySelect";
import MediaManager from "./MediaManager";
import Modal from "../../../../UI/Modal/Modal";
import {
  CloseCircleOutlined,
  CloseCircleTwoTone,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  authSelector,
  getInstituteDetails,
  updatePercentage,
  uploadingEnded,
  uploadingStarted,
} from "../../../../../redux/slices/authSlice";
import BankingDetails from "./BankingDetails";
import { isEmpty } from "../../../../utils";
import {
  ACCESS_TOKEN,
  host,
  INSTITUTE_ID,
} from "../../../../../utils/constant";
import { isJsonParsable, FileUploader } from "../../../../../utils/utils";
import imgProto from "../../../../../assets/images/icons/img.svg";
import { Box, LinearProgress, Typography } from "@mui/material";
import UpgardeModal from "../UpgradeModal/UpgardeModal";

const subjectsForStreams = {
  Science: [
    "English ",
    "Chemistry",
    "Biology",
    "Physics",
    "Maths",
    "Botany",
    "Zoology",
    "IP",
    "Computer Science ",
    "Java ",
    "Other",
  ],
  Commerce: [
    "Commerce ",
    "English ",
    "Accountancy",
    "Economics",
    "Business Studies",
    "Mathematics",
    "Statistics",
    "IP",
    "Computer Science",
    "Java ",
    "Other",
  ],
  "Arts/Humanities": [
    "Economics",
    "Psychology",
    "History",
    "Geography ",
    "Philosophy",
    "Sociology",
    "Anthropology ",
    "Political Science",
    "Journalism ",
    "English ",
    "Law",
    "Other ",
  ],
  Vocational: [
    "Banking ",
    "Accountancy & Auditing",
    "Fabrication Technology",
    "Marketing & Salesmanship",
    "Horticulture ",
    "Food Service & Management ",
    "Life Insurance ",
    "Financial Market Management",
    "Library Management",
    "Other ",
  ],
};

const examsFromFields = {
  UPSC: ["CSE", "SSC"],
  "Defence Services": [
    "NDA",
    "CDS",
    "Indian Air Force Recruitment",
    "Indian Naval Academy Recruitment",
    "AFCAT",
    "SSB",
  ],
  "Fashion & Design": ["NIFT", "NID", "DAT", "CEED", "UCEED", "SOFT "],
  Medical: [
    "NEET",
    "NEET PG",
    "AIIMS",
    "AIIMS PG",
    "PGIMER",
    "CMSE",
    "FPMT",
    "NPE FET",
  ],
  "Foreign English": [
    "OET",
    "IELTS",
    "PTE",
    "TOEFL",
    "CELPIP",
    "SPOKEN ENGLISH",
  ],
  Engineering: [
    "IIT-JEE-MAIN",
    "IIT-JEE-ADVANCE",
    "BITSAT",
    "VITEEE",
    "SRMJEE",
    "COMEDK",
    "KIITEE",
    "WBJEE",
    "MHTCET",
    "MET",
  ],
  Railways: ["RRB NTPC", "RRB GROUP D", "RRB JE", "RRB ALP"],
  MBA: [
    "CAT",
    "XAT",
    "MAT",
    "GMAT",
    "CMAT",
    "IIFT",
    "NMAT",
    "SNAP",
    "TISSNET",
    "IBSAT",
  ],
  "College Entrance Exams": [
    "Delhi University Entrance Exam (DUET)",
    "Common University Entrance Test (CUET)",
    "Central Universities Common Entrance Test (CUCET)",
    "Common Entrance Test (CET)",
    "IIMC Entrance Exam",
    "Jamia Milia Islamia Entrance",
    "NMAT",
    "SNAP",
    "TISSNET",
    "IBSAT",
  ],
  LAW: [
    "CLAT",
    "DUET",
    "DU LLB",
    "CLAT PG",
    "AIBE",
    "DU LLM",
    "LSAT INDIA",
    "HPNET",
  ],
  Banking: [
    "SBI PO",
    "SBI SO",
    "SBI Clerk",
    "IBPS PO (CWE PO/MT)",
    "IBPS SO (CWE SO)",
    "IBPS Clerk (CWE Clerical)",
    " IBPS RRB (CWE RRB)",
    "RBI Officer Grade B",
    " RBI Officer Grade C",
    " RBI Office Assistant",
    "NABARD",
  ],
};

const graduationCourseFields = {
  Science: [
    "BE/B.Tech- Bachelor of Technology",
    "B.Arch- Bachelor of Architecture",
    "BCA- Bachelor of Computer Applications",
    "B.Sc.- Information Technology",
    "B.Sc- Nursing",
    "BPharma- Bachelor of Pharmacy",
    "B.Sc- Interior Design",
    "BDS- Bachelor of Dental Surgery",
    "Animation, Graphics and Multimedia",
    "B.Sc. – Nutrition & Dietetics",
    "BPT- Bachelor of Physiotherapy",
    "B.Sc- Applied Geology",
    "BA/B.Sc. Liberal Arts",
    "B.Sc.- Physics",
    "B.Sc. Chemistry",
    "B.Sc. Mathematics",
  ],

  Commerce: [
    "B.Com- Bachelor of Commerce",
    "BBA- Bachelor of Business Administration",
    "B.Com (Hons.)",
    "BA (Hons.) in Economics",
    "Integrated Law Program- B.Com LL.B.",
    "Integarted Law Program- BBA LL.B",
  ],
  Humanities: [
    "BBA- Bachelor of Business Administration",
    "BMS- Bachelor of Management Science",
    "BFA- Bachelor of Fine Arts",
    "BEM- Bachelor of Event Management",
    "Integrated Law Course- BA + LL.B",
    "BJMC- Bachelor of Journalism and Mass Communication",
    "BFD- Bachelor of Fashion Designing",
    "BSW- Bachelor of Social Work",
    "BBS- Bachelor of Business Studies",
    "BTTM- Bachelor of Travel and Tourism Management",
    "Aviation Courses",
    "B.Sc- Interior Design",
    "B.Sc.- Hospitality and Hotel Administration",
    "Bachelor of Design (B. Design)",
    "Bachelor of Performing Arts",
    "BA in History",
  ],
};

const postGraduationCourseFields = {
  Science: [
    "Master of Science (MS/MSc)",
    "Master of Technology (MTech)/Master of Engineering (MEng)",
    "Master of Computer Applications (MCA)",
    "Master in Computer Science",
    "PG Diploma in Business Analytics",
    "Paramedical Courses",
    "PG Diploma in Hospital Management/Hospital Administration",
    "MBA (Master of Business Administration)",
    "Financial Engineering Courses",
    "Mobile App Development Courses",
    "Robotics Engineering Courses",
  ],

  Commerce: [
    "Chartered Accountancy (CA)",
    "M.Com",
    "MBA",
    "MCA",
    "PGDCA (Post Graduate Diploma in Computer Applications)",
    "Chartered Financial Analyst (CFA)",
    "Business Accounting and Taxation (BAT)",
    "Tally Course",
    "Masters in Digital Marketing",
    "PGDM in Finance",
    "PGDEMA",
    "Certification Courses for Commerce Students",
    "Certificate in E-commerce",
    "Certificate in Banking",
    "Certificate in Accounting",
  ],
  Humanities: [
    "Master of Arts (MA) or Master of Fine Arts (MFA)",
    "PG Diploma/Masters in Journalism and Communication",
    "Bachelor of Education (BEd)",
    "Bachelor of Library Science",
    "Masters/PG Diploma in Digital Marketing",
    "LLB",
    "Foreign Language Courses",
    "PG Diploma in Management (PGDM)",
    "PG Diploma in Business Analytics (PGDBA)",
    "PG Diploma in Digital Marketing",
    "PGDEMA",
    "Master of Business Administration (MBA)",
  ],
};

const getSubjectsFromStreams = (streams) => {
  let subjects = [];
  streams?.forEach((stream) => {
    subjects = subjects.concat(subjectsForStreams[stream]);
  });
  return subjects.filter(
    (subject, index, self) => self.indexOf(subject) === index
  );
};

const getExamsFromFields = (fields) => {
  let exams = [];
  fields?.forEach((field) => {
    exams = exams.concat(examsFromFields[field]);
  });
  return exams.filter((exam, index, self) => self.indexOf(exam) === index);
};

const getGraduationFromStreams = (fields) => {
  let course = [];
  fields?.forEach((field) => {
    course = course.concat(graduationCourseFields[field]);
  });
  return course.filter((course, index, self) => self.indexOf(course) === index);
};

const getPostGraduationFromStreams = (fields) => {
  let course = [];
  fields?.forEach((field) => {
    course = course.concat(postGraduationCourseFields[field]);
  });
  return course.filter((course, index, self) => self.indexOf(course) === index);
};

const MyProfile = () => {
  const [reFetch, setRefetch] = useState(false);
  const [openingTime, setOpeningTime] = useState("");
  const [openingTimeError, setOpeningTimeError] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [closingTimeError, setClosingTimeError] = useState("");
  const [boardsJrSchool, setBoardsJrSchool] = useState([]);
  const [classesJrSchool, setClassesJrSchool] = useState([]);
  const [subjectsJrSchool, setSubjectsJrSchool] = useState([]);

  const [boardsHrSchool, setBoardsHrSchool] = useState([]);
  const [classesHrSchool, setClassesHrSchool] = useState([]);
  const [subjectsHrSchool, setSubjectsHrSchool] = useState([]);

  const [boardsSrSchool, setBoardsSrSchool] = useState([]);
  const [streamsSrSchool, setStreamsSrSchool] = useState([]);
  const [subjectsSrSchool, setSubjectsSrSchool] = useState([]);

  const [graduationStreams, setGraduationStreams] = useState([]);
  const [graduationCourses, setGraduationCourses] = useState([]);

  const [postGraduationStreams, setPostGraduationStreams] = useState([]);
  const [postGraduationCourses, setPostGraduationCourses] = useState([]);

  const [fieldsCompetitiveExams, setFieldsCompetitiveExams] = useState([]);
  const [examsCompetitiveExams, setExamsCompetitiveExams] = useState([]);
  const [skills, setSkills] = useState([]);
  const [testPrep, setTestPrep] = useState([]);
  const [language, setLanguage] = useState([]);
  const [computer, setComputer] = useState([]);
  const { instituteDetails, percentage, isUploading } =
    useSelector(authSelector);

  const [locationValues, setLocationValues] = useState(
    instituteDetails.locations
  );

  const [activeFaculty, setActiveFaculty] = useState(null);
  const [facultyValues, setFacultyValues] = useState([]);
  const [achievementValues, setAchievementValues] = useState([]);

  const [instituteDomain, setInstituteDomain] = useState([]);
  const [instituteDomainError, setInstituteDomainError] = useState("");

  const [classMode, setClassMode] = useState();
  const [instituteName, setInstituteName] = useState(instituteDetails?.name);

  const [instituteMobile, setInstituteMobile] = useState(
    instituteDetails.phonenumber
  );
  const [enrolledStudent, setEnrolledStudent] = useState(
    instituteDetails.studentsenrolled
  );
  const [totalFaculties, setTotalFaculties] = useState(
    instituteDetails?.faculties?.length
  );

  const [establishedYear, setEstablishedYear] = useState(
    instituteDetails.establishedyear
  );

  const [facultyData, setFacultyData] = useState([]);

  const facultyRun = async (id) => {
    if (id) {
      try {
        const res = await axios.get(
          `${host}/institute/faculty?instituteId=${id}&limit=20`
        );
        setFacultyValues(res?.data?.message);
        setFacultyData(res?.data?.message);
        
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    facultyRun(instituteDetails?.id);
  }, [instituteDetails?.id]);

  const [instituteDescription, setInstituteDescription] = useState([]);
  const [instituteShortDescription, setInstituteShortDescription] =
    useState("");

  const [instituteEmail, setInstituteEmail] = useState(instituteDetails.email);
  const imageInputRef = useRef({});
  const [instituteImage, setInstituteImage] = useState([]);

  useEffect(() => {
    setInstituteName(instituteDetails.name);
    setInstituteMobile(instituteDetails?.phonenumber);
    setEnrolledStudent(instituteDetails?.studentsenrolled);
    setTotalFaculties(
      instituteDetails?.totalfaculties || instituteDetails?.faculties?.length
    );

    setEstablishedYear(instituteDetails?.establishedyear);
    setInstituteShortDescription(instituteDetails?.short_description);

    setInstituteEmail(instituteDetails.email);
    // setFacultyValues(instituteDetails.faculties);

    if (isJsonParsable(instituteDetails.description)) {
      setInstituteDescription(JSON.parse(instituteDetails.description));
    } else {
      setInstituteDescription([instituteDetails.description]);
    }

    if (instituteDetails.classmode === 1) {
      setClassMode("hybrid");
    }
    if (instituteDetails.classmode === 2) {
      setClassMode("online");
    }
    if (instituteDetails.classmode === 3) {
      setClassMode("offline");
    }
    if (instituteDetails?.avatar?.length) {
      setInstituteImage(instituteDetails?.avatar);
    }
  }, [instituteDetails]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
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
  const [openAchievement, setOpenAchievement] = useState(false);
  const [viewAllPhoto, setViewAllPhoto] = useState(false);
  const [viewAllVideo, setViewAllVideo] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isDisable3, setIsDisable3] = useState(true);
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
  const [languageError, setLanguageError] = useState("");
  const [computerError, setComputerError] = useState("");

  useEffect(() => {
    setRefetch(!reFetch);
  }, [showPopUp]);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "My Profile - Ostello India";
  }, []);

  const renderVideos = (source) => {
    return source?.map((video, idx) => {
      return (
        <div key={idx} className="flex">
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
          boards: boardsJrSchool,
          classes: classesJrSchool,
          subjects: subjectsJrSchool,
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

  const [subjectsForStreams, setSubjectsForStreams] = useState([]);

  const saveServicesToState = (services) => {
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
    //For some time

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

  let [savedServices, setSavedServices] = useState(false);

  const [instituteNameError, setInstituteNameError] = useState("");
  const [contactNoError, setContactNoError] = useState();
  const [enrolledStudentError, setEnrolledStudentError] = useState();
  const [totalFacultiesError, setTotalFacultiesError] = useState();
  const [establishedError, setEstablishedStudentError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [instituteEmailError, setaInstituteEmailError] = useState();
  const [typeOfInstituteError, setTypeOfInstituteError] = useState();
  const [showUpdateRequestModal, setShowUpdateRequestModal] = useState(false);

  const [mode, setMode] = useState(null);

  const saveRef = useRef({});

  useEffect(() => {
    if (!instituteDetails?.reviews?.length) {
      toast.error("Encourage students to provide reviews on institute page");
    }
  }, [instituteDetails?.reviews?.length]);

  useEffect(() => {
    let value = !isEmpty(classMode) && classMode?.toLowerCase();

    value === "hybrid"
      ? setMode(1)
      : value === "online"
      ? setMode(2)
      : value === "offline" && setMode(3);
  }, [classMode]);

  const [editBankDetails, setEditBankDetails] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [editLocationValues, setEditLocationValues] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [isEditServices, setIsEditServices] = useState(false);

  const [isEditOwnerDetails, setIsEditOwnerDetails] = useState(false);

  const [ownerName, setOwnerName] = useState(
    instituteDetails?.owner?.name || ""
  );
  const [ownerContact, setOwnerContact] = useState(
    instituteDetails?.owner?.phonenumber || ""
  );
  const [ownerEmail, setOwnerEmail] = useState(
    instituteDetails?.owner?.email || ""
  );
  const [descriptionParagraph1, setDescriptionParagraph1] = useState();
  const [descriptionParagraph2, setDescriptionParagraph2] = useState();
  const [descriptionParagraph3, setDescriptionParagraph3] = useState();

  //image url changed pushed

  useEffect(() => {
    if (instituteDetails?.locations?.length) {
      let temp = [];
      instituteDetails?.locations?.forEach((item) => temp.push(item && item));
      setLocationValues(temp);
    }

    if (!isEmpty(instituteDetails.workinghours)) {
      let [a, b] = instituteDetails.workinghours.split(" to ");
      setOpeningTime(a);
      setClosingTime(b);
    }
    if (!isEmpty(instituteDetails.services) && !savedServices) {
      saveServicesToState(instituteDetails.services);
      setSavedServices(true);
    }
    const desc = instituteDetails.description;

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
  }, [instituteDetails]);

  useEffect(() => {
    setInstituteDescription([
      descriptionParagraph1,
      descriptionParagraph2,
      descriptionParagraph3,
    ]);
  }, [descriptionParagraph1, descriptionParagraph2, descriptionParagraph3]);

  const refetch = () => {
    dispatch(getInstituteDetails());
  };

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
        setTimeout(() => {
          facultyRun();
        }, 5000);
        setFacultyValues(facultyValues.filter((a) => a.id !== id));
      })
      .catch((e) => {
        toast.error(e.message);
        console.error(e);
        facultyRun();
      })
      .finally(() => {});
  };

  const [imageUploading, setImageUploading] = useState(false);
  const [imageUpload, setImageUpload] = useState(true);
  const [buttonShow, setButtonShow] = useState(false);

  const handleInstituteUploadImages = async () => {
    const imageUploadStarted = toast.loading("Uploading please wait ...");

    try {
      let images = await FileUploader(instituteImage, (percent) =>
        dispatch(updatePercentage(percent))
      );

      const data = {
        id:
          typeof window !== "undefined" &&
          window.localStorage.getItem("INSTITUTE_ID"),
        updates: {
          avatar: images,
        },
      };

      await axios.patch(`${host}/institute/media`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });

      toast.success("successfully uploaded");
      setButtonShow(false);
    } catch (err) {
      console.error(err, "err");
      toast.error(err.message);
    } finally {
      toast.remove(imageUploadStarted);
      setImageUploading(false);
      dispatch(uploadingEnded());
      // setImageFile([])
    }
  };

  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (instituteDetails?.accountplan === "pro_plan") {
      setPaid(true);
    } else {
      setPaid(false);
    }
  }, [instituteDetails?.accountplan]);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <section className=" w-full h-screen font-dm-sans overflow-x-hidden overflow-y-scroll relative space-y-4">
      <Modal
        open={showUpdateRequestModal}
        onClose={() => setShowUpdateRequestModal(false)}
      >
        <CloseCircleOutlined
          onClick={() => setShowUpdateRequestModal(false)}
          className="float-right m-5 text-xl cursor-pointer"
        />

        <div className="p-10">
          <p className="text-md">
            Your request has been sent to the super admin. Wait For the approval
          </p>
        </div>
      </Modal>
     
      {showPopUp1 && (
        <FacultyPopup
          facultyData={facultyData}
          activeFaculty={activeFaculty}
          showPopUpState1={[showPopUp1, setShowPopUp1]}
          valuesState={[facultyValues, setFacultyValues]}
          fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
          title="Add faculty"
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
      {openAchievement && (
        <AddAchievementPopup
          afterClose={() => {
            setOpenAchievement(false);
            dispatch(getInstituteDetails());
          }}
          title="Add achievement"
          name3="Describe your achievement"
        />
      )}
      {viewAllPhoto && (
        <div
          className=" absolute   h-max  "
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="flex flex-wrap justify-center relative w-screen overflow-x-scroll  h-max gap-10  p-20 pb-20 pt-20 lg:pl-10">
            <AiFillCloseCircle
              className="text-primary absolute right-10 top-0 mr-16 mt-8 text-3xl"
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
              className="text-primary absolute right-10 top-0 mr-16 mt-8 text-3xl"
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
          <div className="heading mb-5">
            <h1 className="text-2xl font-bold ">My Profile</h1>
          </div>
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
              <div className="flex space-x-2 ml-auto">
                <button
                  onClick={() => {
                    refetch();
                    setIsDisable(true);
                  }}
                  className="text-white w-20  bg-[#4C4C4C] rounded-full p-1  ml-auto"
                >
                  Cancel
                </button>
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    function countWords(str) {
                      const arr = str?.split(" ");
                      return arr?.filter((word) => word !== "").length;
                    }

                    if (countWords(instituteShortDescription) > 30) {
                      toast.error(
                        "Short Description  Will Be Under 25 To 30 Words"
                      );
                      return;
                    }

                    const sending = toast.loading(
                      "Sending the update request..."
                    );
                    let formData = new FormData();
                    formData.append(
                      "id",
                      typeof window !== "undefined" &&
                        window.localStorage.getItem("INSTITUTE_ID")
                    );

                    let data = {};

                    if (instituteDetails?.name !== instituteName) {
                      data.name = instituteName;
                    }
                    if (instituteDetails?.phonenumber !== instituteMobile) {
                      data.phonenumber = instituteMobile;
                      totalFaculties;
                    }
                    if (instituteDetails?.email !== instituteEmail) {
                      data.email = instituteEmail;
                    }
                    if (instituteDetails?.classmode !== mode) {
                      data.classmode = mode;
                    }

                    if (instituteDetails?.establishedyear !== establishedYear) {
                      data.establishedyear = establishedYear;
                    }

                    const student = parseInt(enrolledStudent);
                    if (instituteDetails?.studentsenrolled !== student) {
                      data.studentsenrolled = student;
                    }

                    const facultiesCount = parseInt(totalFaculties);
                    if (instituteDetails?.totalfaculties !== totalFaculties) {
                      data.totalfaculties = totalFaculties;
                    }

                    if (
                      instituteDetails?.short_description !==
                      instituteShortDescription
                    ) {
                      data.short_description = instituteShortDescription;
                    }

                    const desc = JSON.stringify(instituteDescription);

                    if (instituteDetails?.description !== desc) {
                      data.description = desc;
                    }
                    const time =
                      openingTime && closingTime
                        ? `${openingTime} to ${closingTime}`
                        : null;
                    if (instituteDetails?.workinghours !== time) {
                      data.workinghours = time;
                    }

                    formData.append("updates", JSON.stringify(data));

                    const updateRequestData = {
                      id:
                        typeof window !== "undefined" &&
                        window.localStorage.getItem("INSTITUTE_ID"),
                      updates: data,
                    };

                    axios
                      .patch(`${host}/institute/update`, updateRequestData, {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          Authorization: `Bearer ${
                            typeof window !== "undefined" &&
                            window.localStorage.getItem("ACCESS_TOKEN")
                          }`,
                        },
                      })
                      .then(({ data }) => {
                        // setShowUpdateRequestModal(true)
                        toast.success(
                          "update request sent . wait for the super admin approval"
                        );

                        refetch();
                      })
                      .catch((err) => {
                        console.error(err);
                        toast.error("Something went wrong !");
                      })
                      .finally(() => {
                        setIsDisable(true);
                        toast.remove(sending);
                      });
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {isDropDown1 && (
            <Fragment>
              <div className="flex flex-col    lg:flex-row lg:space-x-10">
                <CustomInputField
                  required={true}
                  defaultValue={instituteName}
                  onChange={(e) => setInstituteName(e)}
                  errorState={(err) => setInstituteNameError(err)}
                  className=" lg:w-96 shrink  mb-4 lg:mb-0"
                  disableState={[isDisable, setIsDisable]}
                  name="Institute Name"
                />
                <CustomInputField
                  onChange={(value) => setInstituteMobile(value)}
                  defaultValue={instituteMobile}
                  className="lg:w-96 shrink"
                  errorState={(err) => setContactNoError(err)}
                  disableState={[isDisable, setIsDisable]}
                  name="Contact No."
                  required
                />
              </div>

              <CustomInputField
                type="textarea"
                defaultValue={descriptionParagraph1}
                onChange={(e) => setDescriptionParagraph1(e)}
                className=" lg:w-9/12 shrink"
                disableState={[isDisable, setIsDisable]}
                name="Description (Paragraph1)"
                required
                errorState={(err) => setDescriptionError(err)}
              />
              <CustomInputField
                type="textarea"
                defaultValue={descriptionParagraph2}
                onChange={(e) => setDescriptionParagraph2(e)}
                className=" lg:w-9/12 shrink"
                disableState={[isDisable, setIsDisable]}
                name="Description (Paragraph2)"
              />
              <CustomInputField
                type="textarea"
                defaultValue={descriptionParagraph3}
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

              <div className="mb-3">
                <p className="text-lg font-medium text-slate ">
                  Add Institute Image
                </p>

                <div
                  className="
                    w-full md:w-3/4 h-[260px] bg-white shadow-md rounded-xl  rounded-md 
                    "
                >
                  {isEmpty(instituteImage) ? (
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        onClick={() => imageInputRef.current.click()}
                        className="w-[30px] h-[30px] cursor-pointer "
                        src={imgProto.src}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="p-2">
                      {/* <div
                    onClick={() => fileInputRef.current.click()}
                    className="flex flex-col items-center cursor-pointer border border-dashed "
                  >
                    <div className="flex items-center space-x-1 ">
                      <p className="text-center">Add more</p>
                      <img
                        className="w-[16px] h-[16px] "
                        src={imgProto.src}
                        alt=""
                      />
                    </div>
                  </div> */}
                      {instituteImage.length ? (
                        <section>
                          {/* For Images */}
                          {/* <p>Image:</p> */}
                          <div className="">
                            {instituteImage?.map((item, idx) => (
                              <div key={idx} className="relative ">
                                <img
                                  className="w-[200px] h-[180px]"
                                  src={
                                    item?.url
                                      ? `https://cdn.ostello.co.in/${item?.key}`
                                      : URL.createObjectURL(item)
                                  }
                                  alt=""
                                />
                                <CloseCircleOutlined
                                  onClick={async () => {
                                    const data = {
                                      id:
                                        typeof window !== "undefined" &&
                                        window.localStorage.getItem(
                                          "INSTITUTE_ID"
                                        ),
                                      updates: {
                                        avatar: instituteImage.filter(
                                          (image) => image.key !== item.key
                                        ),
                                      },
                                    };

                                    try {
                                      await axios.patch(
                                        `${host}/institute/media`,
                                        data,
                                        {
                                          headers: {
                                            "Access-Control-Allow-Origin": "*",
                                            Authorization: `Bearer ${
                                              typeof window !== "undefined" &&
                                              window.localStorage.getItem(
                                                "ACCESS_TOKEN"
                                              )
                                            }`,
                                          },
                                        }
                                      );

                                      toast.success("Successfully Deleted");
                                      refetch();
                                    } catch {
                                      toast.error("got an error !");
                                    } finally {
                                    }
                                  }}
                                  className="absolute right-0 top-0"
                                />
                              </div>
                            ))}
                            {isUploading && imageUploading ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box sx={{ width: "50%", mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={percentage}
                                  />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >{`${Math.round(percentage)}%`}</Typography>
                                </Box>
                              </Box>
                            ) : buttonShow ? (
                              <div className=" w-full flex justify-center ">
                                <button
                                  disabled={!imageUpload}
                                  onClick={() => {
                                    handleInstituteUploadImages();
                                    setImageUploading(true);
                                    !imageUpload &&
                                      toast.error(
                                        "You can't upload more than 8 image at a time ! please remove image.."
                                      );
                                  }}
                                  className=" px-5 py-2 my-5 text-white active:bg-medium-violet bg-primary rounded-lg cursor-pointer select-none"
                                >
                                  Upload Institute Image
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </section>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  <input
                    onChange={(e) => {
                      const filesObj = e.target.files;
                      Object.values(filesObj).forEach((item) => {
                        if (item.type.includes("image")) {
                          setInstituteImage((prv) => prv.concat(item));
                        }
                      });
                      setButtonShow(true);
                    }}
                    ref={imageInputRef}
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="sm:w-2/4 w-full my-4">
                <p className="text-lg font-medium text-slate ">
                  Get Institution QR Code
                </p>
                <QRCodeFunction />
              </div>
              <div className="flex flex-col  lg:flex-row lg:space-x-10">
                <CustomInputField
                  defaultValue={instituteEmail}
                  onChange={(e) => setInstituteEmail(e)}
                  className=" lg:w-96 shrink mb-4 lg:mb-0"
                  disableState={[isDisable, setIsDisable]}
                  name="Institute email"
                  required
                  errorState={(err) => setaInstituteEmailError(err)}
                />
                <CustomInputField
                  onChange={(value) => setEnrolledStudent(value)}
                  defaultValue={enrolledStudent}
                  className="lg:w-96 shrink"
                  errorState={(err) => setEnrolledStudentError(err)}
                  disableState={[isDisable, setIsDisable]}
                  name="Enrolled Student"
                  required
                />
                <CustomInputField
                  onChange={(value) => setEstablishedYear(value)}
                  defaultValue={establishedYear}
                  className="lg:w-96 shrink"
                  errorState={(err) => setEstablishedStudentError(err)}
                  disableState={[isDisable, setIsDisable]}
                  name="Established Year"
                  required
                />
              </div>

              <CustomInputField
                onChange={(value) => setTotalFaculties(value)}
                defaultValue={totalFaculties}
                className="lg:w-96 shrink"
                errorState={(err) => setTotalFacultiesError(err)}
                disableState={[isDisable, setIsDisable]}
                name="Total Faculties"
                required
              />

              <h2 className="text-lg font-medium text-slate my-4">
                Type of Institute
              </h2>
              <div
                className={` border-light-gray px-4 py-2 w-full shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
              >
                <div className="flex justify-center items-center">
                  {" "}
                  <label htmlFor="online" className="">
                    Online mode only
                  </label>
                  <input
                    type="radio"
                    id="online"
                    name="institute"
                    value="online"
                    checked={classMode?.toLowerCase() === "online"}
                    className=" block ml-auto justify-start items-start "
                    onChange={(e) => setClassMode(e.target.value)}
                  />
                </div>
                <hr className="my-4" style={{ color: "#D2D2D2" }} />

                <div className="flex justify-center items-center">
                  <label htmlFor="offline">Offline mode only</label>{" "}
                  <input
                    type="radio"
                    id="css"
                    name="institute"
                    value="offline"
                    checked={classMode?.toLowerCase() === "offline"}
                    className="block ml-auto justify-start items-start"
                    onChange={(e) => setClassMode(e.target.value)}
                  />
                </div>
                <hr className="my-4" style={{ color: "#D2D2D2" }} />
                <div className="flex justify-center items-center">
                  <label htmlFor="hybrid">Both (Hybrid mode)</label>{" "}
                  <input
                    type="radio"
                    checked={classMode?.toLowerCase() === "hybrid"}
                    id="hybrid"
                    name="institute"
                    value="hybrid"
                    className="block ml-auto justify-start items-start"
                    onChange={(e) => setClassMode(e.target.value)}
                  />
                </div>
              </div>
              {classMode === "online" ? (
                ""
              ) : (
                <div>
                  <h2 className="text-lg font-medium text-slate my-4">
                    Institute Operational Details
                  </h2>
                  <div className="flex items-center flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                    <div className=" flex w-full flex-col space-y-2">
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
                  </div>{" "}
                </div>
              )}
            </Fragment>
          )}
        </section>

        {/* section-2 */}
   

        {/* section-3  */}

        <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
          <div className="flex">
            <DropdownSelector
              title="Your Services"
              isDropDown1State={[isDropDown8, setIsDropDown8]}
              className=""
            />
            {!isEditServices ? (
              <button
                className="  text-white w-20 rounded-full p-1  ml-auto bg-gray"
                onClick={() => {
                  setIsEditServices(true);
                }}
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-2 ml-auto">
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      // const formData = new FormData();
                      // formData.append(
                      //   "id",
                      //   typeof window !== "undefined" &&
                      //     window.localStorage.getItem("INSTITUTE_ID")
                      // );
                      // formData.append(
                      //   "updates",
                      //   JSON.stringify({
                      //     services: formattedDomain(),
                      //   })
                      // );

                      const data = {
                        id:
                          typeof window !== "undefined" &&
                          window.localStorage.getItem("INSTITUTE_ID"),
                        updates: {
                          services: formattedDomain(),
                        },
                      };

                      const res = await axios.patch(
                        `${host}/institute/update`,
                        data,
                        {
                          headers: {
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                          },
                        }
                      );

                      toast.success(res.data.message);
                      setIsEditServices(false);
                    } catch (err) {
                      toast.error("Something went wrong !");
                      console.error(err, "error");
                    } finally {
                    }
                  }}
                >
                  Save
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditServices(false);
                    dispatch(getInstituteDetails());
                  }}
                  className="  text-white w-20 rounded-full p-1  ml-auto bg-gray"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {isDropDown8 && (
            <>
              <CategorySelect
                disabled={!isEditServices}
                categories={[
                  "Junior Secondary School (Class 6-8th)",
                  "Higher Secondary School (Class 9-10th)",
                  "Senior Secondary School (Class 11-12th)",
                  "Competitive Exams",
                  "Test Prep",

                  "Skill Based Courses",
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
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
                    categories={["Class 6", "Class 7", "Class 8"]}
                    selectedState={[classesJrSchool, setClassesJrSchool]}
                    placeholderText="Select class"
                    errorState={[classesJrSchoolError, setClassesJrSchoolError]}
                  />
                  <CategorySelect
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
                    categories={["Class 9", "Class 10"]}
                    selectedState={[classesHrSchool, setClassesHrSchool]}
                    placeholderText="Select class"
                    errorState={[classesHrSchoolError, setClassesHrSchoolError]}
                  />
                  <CategorySelect
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
                    categories={[
                      "Science",
                      "Commerce",
                      "Arts/Humanities",
                      "Vocational",
                    ]}
                    selectedState={[streamsSrSchool, setStreamsSrSchool]}
                    placeholderText="Select Streams"
                    errorState={[streamsSrSchoolError, setStreamsSrSchoolError]}
                  />
                  <CategorySelect
                    disabled={!isEditServices}
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
                    Competitive Exams
                  </h2>
                  <CategorySelect
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
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
              {instituteDomain.includes("Test Prep") && (
                <React.Fragment>
                  <h2 className="text-lg font-medium text-slate my-4">
                    Test Prep
                  </h2>
                  <CategorySelect
                    disabled={!isEditServices}
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
                    placeholderText="Please enter the test prep's classes you provide   "
                    errorState={[testPrepError, setTestPrepError]}
                  />
                </React.Fragment>
              )}
              {instituteDomain.includes("Skill Based Courses") && (
                <React.Fragment>
                  <h2 className="text-lg font-medium text-slate my-4">
                    Skill Based Courses
                  </h2>
                  <CategorySelect
                    disabled={!isEditServices}
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
                    placeholderText="Please enter the skills you provide classes  "
                    errorState={[skillsError, setSkillsError]}
                  />
                </React.Fragment>
              )}
              {instituteDomain.includes("Language Courses") && (
                <React.Fragment>
                  <h2 className="text-lg font-medium text-slate my-4">
                    Language Courses
                  </h2>
                  <CategorySelect
                    disabled={!isEditServices}
                    categories={[
                      "Spoken English",
                      "French",
                      "German",
                      "Spanish",
                      "Japanese",
                    ]}
                    selectedState={[language, setLanguage]}
                    placeholderText="Please enter the courses you provide classes"
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
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
                    categories={["Science", "Commerce", "Humanities"]}
                    selectedState={[graduationStreams, setGraduationStreams]}
                    placeholderText="Select Streams "
                    errorState={[majorsError, setMajorsError]}
                  />
                  <CategorySelect
                    disabled={!isEditServices}
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
                    disabled={!isEditServices}
                    categories={["Science", "Commerce", "Humanities"]}
                    selectedState={[
                      postGraduationStreams,
                      setPostGraduationStreams,
                    ]}
                    placeholderText="Select Streams"
                    errorState={[postMajorsError, setPostMajorsError]}
                  />
                  <CategorySelect
                    disabled={!isEditServices}
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
            {!isEditOwnerDetails ? (
              <button
                className="  text-white w-20 rounded-full p-1  ml-auto"
                style={{ background: "#4C4C4C" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditOwnerDetails(true);
                }}
              >
                Edit
              </button>
            ) : (
              <div className=" ml-auto flex justify-center items-center space-x-2">
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={async (e) => {
                    e.preventDefault();

                    try {
                      const data = {
                        id: instituteDetails.owner.id,
                        updates: {
                          name: ownerName,
                          phonenumber: ownerContact,
                          email: ownerEmail,
                        },
                      };
                      await axios.patch(`${host}/users/`, data, {
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          Authorization: `Bearer ${
                            typeof window !== "undefined" &&
                            window.localStorage.getItem("ACCESS_TOKEN")
                          }`,
                        },
                      });
                      toast.success("Sent the request");
                      setIsEditOwnerDetails(false);
                    } catch (err) {
                      toast.error("got an error");
                      console.error(err, "error");
                    }
                  }}
                >
                  Save
                </button>
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setIsEditOwnerDetails(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {isDropDown3 && (
            <Fragment>
              <div className="flex flex-col   lg:flex-row lg:space-x-10">
                <CustomInputField
                  defaultValue={ownerName}
                  className=" lg:w-96 shrink  mb-4 lg:mb-0 "
                  disableState={[!isEditOwnerDetails, setIsEditOwnerDetails]}
                  name="Owner Name"
                  onChange={(e) => setOwnerName(e)}
                />
                <CustomInputField
                  defaultValue={ownerContact}
                  className="lg:w-96 shrink"
                  disableState={[!isEditOwnerDetails, setIsEditOwnerDetails]}
                  name="Contact No."
                  onChange={(e) => setOwnerContact(e)}
                />
              </div>
              <CustomInputField
                defaultValue={ownerEmail}
                className="lg:w-96 shrink"
                disableState={[!isEditOwnerDetails, setIsEditOwnerDetails]}
                name="Owner email"
                onChange={(e) => setOwnerEmail(e)}
              />
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
          <div className="space-y-10">{isDropDown4 && <MediaManager />}</div>
        </section>

        <section className="  w-full px-6 space-y-4 lg:space-y-5 lg:px-12   mb-6">
          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:mb-5">
            <DropdownSelector
              title="Faculty"
              isDropDown1State={[isDropDown5, setIsDropDown5]}
            />
            <button
              className="bg-primary text-white w-32  rounded-full p-1 lg:ml-auto"
              onClick={(e) => {
                e.preventDefault();
                if (!paid) {
                  if (facultyValues) {
                    toast.error(
                      "You added faculty! To add more, Please upgarade your plan"
                    );
                    handleOpen();
                  }
                  if (facultyValues.length === 0) {
                    setShowPopUp1(!showPopUp1);
                  }
                } else {
                  setShowPopUp1(!showPopUp1);
                }
              }}
            >
              + Add Faculty
            </button>
          </div>
          {isDropDown5 && (
            <>
              {facultyValues?.filter((a) => a.position === "Founder").length ? (
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
              {facultyValues?.filter((a) => a.position === "Teacher").length ? (
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
            </>
          )}
        </section>

        <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
          <div className="flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0 lg:mb-10 ">
            <DropdownSelector
              title="Achievements"
              isDropDown1State={[isDropDown6, setIsDropDown6]}
            />
            <button
              className="bg-primary text-white w-44  rounded-full p-1 "
              onClick={(e) => {
                e.preventDefault();
                setOpenAchievement(!showPopUp);
                // setIsDropDown1(false);
                // setIsDropDown2(false);
                // setIsDropDown3(false);
                // setIsDropDown4(false);
                // setIsDropDown5(false);
                // setIsDropDown6(false);
                // setIsDropDown7(false);
              }}
            >
              + Add Achievement
            </button>
          </div>
          <div className=" space-y-5  ">
            {instituteDetails?.achievements?.map((item, idx) => (
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
                        dispatch(getInstituteDetails());
                      })
                      .catch((err) => {
                        toast.error(
                          "Got an error. Could not delete the achievement"
                        );
                        console.error(err);
                      });
                  }}
                  twoToneColor={"red"}
                  className="absolute -top-4 -right-6 cursor-pointer text-xl"
                />
                <div key={item.id} className="border rounded-md w-fit p-2 e">
                  <div className="shadow-sm flex items-center space-x-2">
                    <img src={item.image.url} className="w-10" alt="" />
                    <div>
                      <p>
                        <span className="font-bold">Title:</span> {item.title}
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
          {isDropDown6 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 z-0 ">
              {achievementValues?.map((element, index) => (
                <div key={index} className="relative">
                  <img
                    src={`${element.src}`}
                    alt=""
                    height="15rem"
                    className="w-72 rounded-lg h-full relative "
                  />

                  <div className="absolute bottom-0 px-5 text-white ">
                    <div className="flex space-x-3 items-center justify-start w-full text-white">
                      <p className="text-xs">{element.views} views</p>
                      <p className="items-start">.</p>
                      <p className="text-xs">{element.timestamp}</p>
                    </div>

                    <hr className="w-64 mb-3" />

                    <div className="flex  space-x-3 ">
                      <div className="flex bg-black w-20 items-center     space-x-3 rounded-full p-1">
                        <IoRocketSharp
                          className="text-primary p-1 w-7 h-7  rounded-full cursor-pointer"
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                        <p className="text-white text-sm">{element.boosts}</p>
                      </div>
                      <div className="flex items-center">
                        <TiMessage className="text-3xl" />
                        <p className="">{element.comments}</p>
                      </div>
                    </div>
                    <p className=" w-64 mb-3 ">{element.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
          <div className="flex">
            <DropdownSelector
              title="Banking details"
              isDropDown1State={[isDropDown7, setIsDropDown7]}
            />
            {editBankDetails ? (
              <div className="space-x-2 ml-auto">
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setEditBankDetails(false);
                    saveRef.current.click();
                  }}
                >
                  Save
                </button>
                <button
                  className="  text-white w-20 rounded-full p-1  ml-auto"
                  style={{ background: "#4C4C4C" }}
                  onClick={() => {
                    setEditBankDetails(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="  text-white w-20 rounded-full p-1  ml-auto"
                style={{ background: "#4C4C4C" }}
                onClick={() => {
                  setEditBankDetails(true);
                }}
              >
                Edit
              </button>
            )}
          </div>
          {isDropDown7 && (
            <BankingDetails
              {...{
                editBankDetails: !editBankDetails,
                setEditBankDetails,
                saveRef,
              }}
            />
          )}
          <>
            <div className="flex items-center justify-between">
              <DropdownSelector
                title="Document Submission"
                isDropDown1State={[isDropDown8, setIsDropDown8]}
              />
            </div>
            {isDropDown8 && (
              <>{<DocumentSubmission {...{ instituteDetails }} />}</>
            )}
          </>

          <UpgardeModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
        </section>
      </div>
    </section>
  );
};

export default MyProfile;
