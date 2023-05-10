import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";

import { CloseCircleTwoTone, EditOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CategorySelect from "../../../../components/CategorySelect";
import AddAchievementPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/AddAchievementPopup";
import AdminLocationPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/AdminLocationPopup";
import { CustomInputField } from "../../../../components/pages/Merchant/Dashboard/MyProfile/CustomInputField";
import DocumentSubmission from "../../../../components/pages/Merchant/Dashboard/MyProfile/DocumentSubmission";
import DropdownSelector from "../../../../components/pages/Merchant/Dashboard/MyProfile/DropdownSelector";
import FacultyEditPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/FacultyEditPopup";
import FacultyPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/FacultyPopup";
import { LogoIcon } from "../../../../components/SVGIcons";
import {
  adminUpdateInstitute,
  fetchAdminInstitutes,
} from "../../../../redux/slices/adminInstitutesSlice";
import { host } from "../../../../utils/constant";
import { isEmpty, isJsonParsable, titleToUrl } from "../../../../utils/utils";
// import {
//   examsFromFields,
//   getExamsFromFields,
//   getSubjectsFromStreams,
//   subjectsForStreams,
// } from '../../../../components/pages/AdminDashboard/Institutes/AdminInstituteDetails/AdminInstituteOverview/Data'
import { useRouter } from "next/router";
import AdminMediaManager from "../../../../components/pages/AdminDashboard/Institutes/AdminInstituteDetails/AdminInstituteOverview/AdminMediaManager";
// old

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
  "Foreign English": ["OET", "IELTS", "PTE", "TOEFL", "CELPIP"],
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
  "Foreign English": ["OET, IELTS , PTE , TOEFL , CELPIP"],
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

const ReviewChanges = () => {
  const router = useRouter();
  const navigate = (link) => router.push(link);
  const { instituteId } = router.query;

  const [id, setId] = useState(instituteId);
  const [reFetch, setRefetch] = useState(false);

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

  const [language, setLanguage] = useState([]);
  const [languageError, setLanguageError] = useState("");

  const [computer, setComputer] = useState([]);
  const [computerError, setComputerError] = useState("");

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [instituteEmail, setInstituteEmail] = useState(instituteDetails?.email);

  const [enrolledStudent, setEnrolledStudent] = useState(
    instituteDetails?.studentsenrolled
  );

  const [singleInstitute, setSingleInstitute] = useState({});
  const dispatch = useDispatch();
  const { loading, adminInstitutes, error, isUpdatedData, isUpdated } =
    useSelector((state) => state.adminInstitutes);

  const [editBankDetails, setEditBankDetails] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [editLocationValues, setEditLocationValues] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);

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

  useEffect(() => {
    const run = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `${host}/institute?id=${id}&relations=owner,achievements`
          );
          setInstituteDetails(res?.data?.message);
          setRefetch(false);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [id, reFetch]);

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

  const [instituteShortDescription, setInstituteShortDescription] =
    useState("");
  const [toppers, setToppers] = useState([]);

  useEffect(() => {
    if (instituteDetails?.updatedRequest?.name) {
      setInstituteName(instituteDetails?.updatedRequest?.name);
    } else {
      setInstituteName(instituteDetails?.name);
    }
    if (instituteDetails?.updatedRequest?.toppers) {
      setToppers(instituteDetails?.updatedRequest?.toppers);
    } else {
      setToppers(instituteDetails?.toppers);
    }
    if (instituteDetails?.updatedRequest?.short_description) {
      setInstituteShortDescription(
        instituteDetails?.updatedRequest?.short_description
      );
    } else {
      setInstituteShortDescription(instituteDetails?.short_description);
    }

    if (instituteDetails?.updatedRequest?.phonenumber) {
      setInstituteMobile(instituteDetails?.updatedRequest?.phonenumber);
    } else {
      setInstituteMobile(instituteDetails?.phonenumber);
    }

    if (
      instituteDetails?.description &&
      !instituteDetails?.updatedRequest?.description
    ) {
      const desc = instituteDetails?.description;
      if (isJsonParsable(desc)) {
        let parsed = JSON.parse(desc);
        setInstituteDescription(parsed);
        setDescriptionParagraph1(parsed[0]);
        setDescriptionParagraph2(parsed[1]);
        setDescriptionParagraph3(parsed[2]);
      } else {
        setInstituteDescription([desc]);
        setDescriptionParagraph1(desc);
      }
    }

    if (instituteDetails?.updatedRequest?.description) {
      const desc = instituteDetails?.updatedRequest?.description;
      if (isJsonParsable(desc)) {
        let parsed = JSON.parse(desc);
        setInstituteDescription(parsed);
        setDescriptionParagraph1(parsed[0]);
        setDescriptionParagraph2(parsed[1]);
        setDescriptionParagraph3(parsed[2]);
      } else {
        setInstituteDescription([desc]);
        setDescriptionParagraph1(desc);
      }
    }

    if (instituteDetails?.updatedRequest?.email) {
      setInstituteEmail(instituteDetails?.updatedRequest?.email);
    } else {
      setInstituteEmail(instituteDetails?.email);
    }
    if (instituteDetails?.updatedRequest?.studentsenrolled) {
      setEnrolledStudent(instituteDetails?.updatedRequest?.studentsenrolled);
    } else {
      setEnrolledStudent(instituteDetails?.studentsenrolled);
    }

    if (instituteDetails?.updatedRequest?.owner?.name) {
      setOwnerName(instituteDetails?.updatedRequest?.owner?.name);
    } else {
      setOwnerName(instituteDetails?.owner?.name);
    }

    if (instituteDetails?.updatedRequest?.owner?.email) {
      setOwnerEmail(instituteDetails?.updatedRequest?.owner?.email);
    } else {
      setOwnerEmail(instituteDetails?.owner?.email);
    }

    if (instituteDetails?.updatedRequest?.owner?.phonenumber) {
      setOwnerPhone(instituteDetails?.updatedRequest?.owner?.phonenumber);
    } else {
      setOwnerPhone(instituteDetails?.owner?.phonenumber);
    }
    if (instituteDetails?.updatedRequest?.classmode) {
      setMode(instituteDetails?.updatedRequest?.classmode);
    } else {
      setMode(instituteDetails?.classmode);
    }

    if (instituteDetails?.updatedRequest?.workingtime) {
      setOpeningTime(
        instituteDetails?.updatedRequest?.workingtime?.split("to")[0].trim()
      );
      setClosingTime(
        instituteDetails?.updatedRequest?.workingtime?.split("to")[1].trim()
      );
    }

    if (instituteDetails?.updatedRequest?.coursecategories) {
      setInstituteDomain([
        ...instituteDetails?.updatedRequest?.coursecategories,
      ]);
    }

    // if (instituteDetails?.updatedRequest?.faculties) {
    //   setFacultyValues(instituteDetails?.updatedRequest?.faculties);
    // }

    // if (instituteDetails?.updatedRequest?.achievements) {
    //   setFacultyValues(instituteDetails?.updatedRequest?.achievements);
    // }

    // if (instituteDetails?.updatedRequest?.services) {
    //   let courseCategory = instituteDetails?.updatedRequest?.services?.map(
    //     (item) => item.domainName
    //   );
    //   setInstituteDomain([...courseCategory]);
    //   if (instituteDetails?.updatedRequest?.services[0]) {
    //     if (instituteDetails?.updatedRequest?.services[0]?.streams) {
    //       setStreamsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[0]?.streams,
    //       ]);
    //       setBoardsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[0]?.boards,
    //       ]);
    //       setSubjectsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[0]?.subjects,
    //       ]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[0]?.domainName ===
    //       "Graduation"
    //     ) {
    //       setGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[0]?.courses,
    //       ]);
    //       setGraduationStreams([...instituteDetails?.updatedRequest?.services[0]?.grstreams]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[0]?.domainName ===
    //       "Post Graduation"
    //     ) {
    //       setPostGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[0]?.courses,
    //       ]);
    //       setPostGraduationStreams([
    //         ...instituteDetails?.updatedRequest?.services[0]?.grstreams,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[0]?.skills) {
    //       setSkills([...instituteDetails?.updatedRequest?.services[0]?.skills]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[0]?.language) {
    //       setLanguage([
    //         ...instituteDetails?.updatedRequest?.services[0]?.language,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[0]?.computer) {
    //       setComputer([
    //         ...instituteDetails?.updatedRequest?.services[0]?.computer,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[0]?.classes) {
    //       setSubjectsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[0]?.subjects,
    //       ]);
    //       setClassesJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[0]?.classes,
    //       ]);
    //       setBoardsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[0]?.boards,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[0]?.examsPerFields) {
    //       setFieldsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[0]?.fields,
    //       ]);
    //       setExamsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[0]?.examsPerFields,
    //       ]);
    //     }
    //   }
    //   if (instituteDetails?.updatedRequest?.services[1]) {
    //     if (instituteDetails?.updatedRequest?.services[1]?.streams) {
    //       setStreamsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[1]?.streams,
    //       ]);
    //       setBoardsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[1]?.boards,
    //       ]);
    //       setSubjectsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[1]?.subjects,
    //       ]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[1]?.domainName ===
    //       "Graduation"
    //     ) {
    //       setGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[1]?.courses,
    //       ]);
    //       setGraduationStreams([...instituteDetails?.updatedRequest?.services[1]?.grstreams]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[1]?.domainName ===
    //       "Post Graduation"
    //     ) {
    //       setPostGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[1]?.courses,
    //       ]);
    //       setPostGraduationStreams([
    //         ...instituteDetails?.updatedRequest?.services[1]?.grstreams,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[1]?.skills) {
    //       setSkills([...instituteDetails?.updatedRequest?.services[1]?.skills]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[1]?.language) {
    //       setLanguage([
    //         ...instituteDetails?.updatedRequest?.services[1]?.language,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[1]?.computer) {
    //       setComputer([
    //         ...instituteDetails?.updatedRequest?.services[1]?.computer,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[1]?.classes) {
    //       setSubjectsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[1]?.subjects,
    //       ]);
    //       setClassesJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[1]?.classes,
    //       ]);
    //       setBoardsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[1]?.boards,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[1]?.examsPerFields) {
    //       setFieldsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[1]?.fields,
    //       ]);
    //       setExamsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[1]?.examsPerFields,
    //       ]);
    //     }
    //   }
    //   if (instituteDetails?.updatedRequest?.services[2]) {
    //     if (instituteDetails?.updatedRequest?.services[2]?.streams) {
    //       setStreamsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[2]?.streams,
    //       ]);
    //       setBoardsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[2]?.boards,
    //       ]);
    //       setSubjectsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[2]?.subjects,
    //       ]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[2]?.domainName ===
    //       "Graduation"
    //     ) {
    //       setGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[2]?.courses,
    //       ]);
    //       setGraduationStreams([...instituteDetails?.updatedRequest?.services[2]?.grstreams]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[2]?.domainName ===
    //       "Post Graduation"
    //     ) {
    //       setPostGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[2]?.courses,
    //       ]);
    //       setPostGraduationStreams([
    //         ...instituteDetails?.updatedRequest?.services[2]?.grstreams,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[2]?.skills) {
    //       setSkills([...instituteDetails?.updatedRequest?.services[2]?.skills]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[2]?.language) {
    //       setLanguage([
    //         ...instituteDetails?.updatedRequest?.services[2]?.language,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[2]?.computer) {
    //       setComputer([
    //         ...instituteDetails?.updatedRequest?.services[2]?.computer,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[2]?.classes) {
    //       setSubjectsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[2]?.subjects,
    //       ]);
    //       setClassesJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[2]?.classes,
    //       ]);
    //       setBoardsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[2]?.boards,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[2]?.examsPerFields) {
    //       setFieldsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[2]?.fields,
    //       ]);
    //       setExamsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[2]?.examsPerFields,
    //       ]);
    //     }
    //   }
    //   if (instituteDetails?.updatedRequest?.services[3]) {
    //     if (instituteDetails?.updatedRequest?.services[3]?.streams) {
    //       setStreamsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[3]?.streams,
    //       ]);
    //       setBoardsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[3]?.boards,
    //       ]);
    //       setSubjectsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[3]?.subjects,
    //       ]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[3]?.domainName ===
    //       "Graduation"
    //     ) {
    //       setGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[3]?.courses,
    //       ]);
    //       setGraduationStreams([...instituteDetails?.updatedRequest?.services[3]?.grstreams]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[3]?.domainName ===
    //       "Post Graduation"
    //     ) {
    //       setPostGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[3]?.courses,
    //       ]);
    //       setPostGraduationStreams([
    //         ...instituteDetails?.updatedRequest?.services[3]?.grstreams,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[3]?.skills) {
    //       setSkills([...instituteDetails?.updatedRequest?.services[3]?.skills]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[3]?.language) {
    //       setLanguage([
    //         ...instituteDetails?.updatedRequest?.services[3]?.language,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[3]?.computer) {
    //       setComputer([
    //         ...instituteDetails?.updatedRequest?.services[3]?.computer,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[3]?.classes) {
    //       setSubjectsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[3]?.subjects,
    //       ]);
    //       setClassesJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[3]?.classes,
    //       ]);
    //       setBoardsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[3]?.boards,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[3]?.examsPerFields) {
    //       setFieldsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[3]?.fields,
    //       ]);
    //       setExamsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[3]?.examsPerFields,
    //       ]);
    //     }
    //   }
    //   if (instituteDetails?.updatedRequest?.services[4]) {
    //     if (instituteDetails?.updatedRequest?.services[4]?.streams) {
    //       setStreamsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[4]?.streams,
    //       ]);
    //       setBoardsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[4]?.boards,
    //       ]);
    //       setSubjectsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[4]?.subjects,
    //       ]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[4]?.domainName ===
    //       "Graduation"
    //     ) {
    //       setGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[4]?.courses,
    //       ]);
    //       setGraduationStreams([...instituteDetails?.updatedRequest?.services[4]?.grstreams]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[4]?.domainName ===
    //       "Post Graduation"
    //     ) {
    //       setPostGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[4]?.courses,
    //       ]);
    //       setPostGraduationStreams([
    //         ...instituteDetails?.updatedRequest?.services[4]?.grstreams,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[4]?.skills) {
    //       setSkills([...instituteDetails?.updatedRequest?.services[4]?.skills]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[4]?.language) {
    //       setLanguage([
    //         ...instituteDetails?.updatedRequest?.services[4]?.language,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[4]?.computer) {
    //       setComputer([
    //         ...instituteDetails?.updatedRequest?.services[4]?.computer,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[4]?.classes) {
    //       setSubjectsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[4]?.subjects,
    //       ]);
    //       setClassesJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[4]?.classes,
    //       ]);
    //       setBoardsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[4]?.boards,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[4]?.examsPerFields) {
    //       setFieldsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[4]?.fields,
    //       ]);
    //       setExamsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[4]?.examsPerFields,
    //       ]);
    //     }
    //   }
    //   if (instituteDetails?.updatedRequest?.services[5]) {
    //     if (instituteDetails?.updatedRequest?.services[5]?.streams) {
    //       setStreamsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[5]?.streams,
    //       ]);
    //       setBoardsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[5]?.boards,
    //       ]);
    //       setSubjectsSrSchool([
    //         ...instituteDetails?.updatedRequest?.services[5]?.subjects,
    //       ]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[5]?.domainName ===
    //       "Graduation"
    //     ) {
    //       setGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[5]?.courses,
    //       ]);
    //       setGraduationStreams([...instituteDetails?.updatedRequest?.services[5]?.grstreams]);
    //     }
    //     if (
    //       instituteDetails?.updatedRequest?.services[5]?.domainName ===
    //       "Post Graduation"
    //     ) {
    //       setPostGraduationCourses([
    //         ...instituteDetails?.updatedRequest?.services[5]?.courses,
    //       ]);
    //       setPostGraduationStreams([
    //         ...instituteDetails?.updatedRequest?.services[5]?.grstreams,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[5]?.skills) {
    //       setSkills([...instituteDetails?.updatedRequest?.services[5]?.skills]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[5]?.language) {
    //       setLanguage([
    //         ...instituteDetails?.updatedRequest?.services[5]?.language,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[5]?.computer) {
    //       setComputer([
    //         ...instituteDetails?.updatedRequest?.services[5]?.computer,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[5]?.classes) {
    //       setSubjectsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[5]?.subjects,
    //       ]);
    //       setClassesJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[5]?.classes,
    //       ]);
    //       setBoardsJrSchool([
    //         ...instituteDetails?.updatedRequest?.services[5]?.boards,
    //       ]);
    //     }
    //     if (instituteDetails?.updatedRequest?.services[5]?.examsPerFields) {
    //       setFieldsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[5]?.fields,
    //       ]);
    //       setExamsCompetitiveExams([
    //         ...instituteDetails?.updatedRequest?.services[5]?.examsPerFields,
    //       ]);
    //     }
    //   }
    // }

    const temp = [];

    if (
      instituteDetails?.locations &&
      !instituteDetails?.updatedRequest?.locations
    ) {
      instituteDetails?.locations.forEach((location) => {
        if (isJsonParsable(location)) {
          temp.push(JSON.parse(location));
        } else {
          temp.push(location);
        }
      });
      setLocationValues(temp);
    }

    if (instituteDetails?.updatedRequest?.locations) {
      instituteDetails?.updatedRequest?.locations.forEach((location) => {
        if (isJsonParsable(location)) {
          temp.push(JSON.parse(location));
        } else {
          temp.push(location);
        }
      });
      setLocationValues(temp);
    }

    // if(instituteDetails?.updatedRequest?.locations){
    //   if (isJsonParsable(instituteDetails?.updatedRequest?.locations)) {
    //     setLocationValues(JSON.parse(instituteDetails?.updatedRequest?.locations));

    //   } else {
    //     setLocationValues(instituteDetails?.updatedRequest?.locations);
    //   }
    // }

    if (instituteDetails?.updatedRequest?.classmode) {
      if (instituteDetails.updatedRequest.classmode == 1) {
        setClassMode("Hybrid");
      } else if (instituteDetails.updatedRequest.classmode == 2) {
        setClassMode("Online");
      } else if (instituteDetails.updatedRequest.classmode == 3) {
        setClassMode("Offline");
      }
    }

    if (instituteDetails?.updatedRequest?.bank) {
      setAccountHolderName(
        instituteDetails?.updatedRequest?.bank?.accHolderName
      );
      setBankAccountNo(instituteDetails?.updatedRequest?.bank?.bankAccNo);
      setBankName(instituteDetails?.updatedRequest?.bank?.bankName);
      setBranch(instituteDetails?.updatedRequest?.bank?.branch);
      setGstNo(instituteDetails?.updatedRequest?.bank?.gstNo);
      setIfscCode(instituteDetails?.updatedRequest?.bank?.ifscNo);
    }

    if (
      instituteDetails?.bank?.accHolderName &&
      !instituteDetails?.updatedRequest?.bank
    ) {
      setAccountHolderName(instituteDetails?.bank?.accHolderName);
      setBankAccountNo(instituteDetails?.bank?.bankAccNo);
      setBankName(instituteDetails?.bank?.bankName);
      setBranch(instituteDetails?.bank?.branch);
      setGstNo(instituteDetails?.bank?.gstNo);
      setIfscCode(instituteDetails?.bank?.ifscNo);
    }

    if (
      instituteDetails?.services &&
      !instituteDetails?.updatedRequest?.services
    ) {
      saveServicesToState(instituteDetails.services);
    }

    if (instituteDetails?.updatedRequest?.services) {
      saveServicesToState(instituteDetails?.updatedRequest?.services);
    }

    if (instituteDetails && !instituteDetails?.updatedRequest?.achievements) {
      if (instituteDetails?.achievements) {
        setAchievementValues([...instituteDetails?.achievements]);
      }
    }

    if (instituteDetails && !instituteDetails?.updatedRequest?.workingtime) {
      if (instituteDetails?.workinghours) {
        setClosingTime(instituteDetails?.workinghours?.split("to")[1].trim());
        setOpeningTime(instituteDetails?.workinghours?.split("to")[0].trim());
      }
    }

    // if (instituteDetails && !instituteDetails?.updatedRequest?.faculties) {
    //   if (instituteDetails?.faculties) {
    //     setFacultyValues(instituteDetails?.faculties);
    //   }
    // }

    if (instituteDetails && !instituteDetails?.updatedRequest?.classmode) {
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
    }

    if (instituteDetails && !instituteDetails?.updatedRequest?.name) {
      if (instituteDetails?.faculties) {
        setInstituteName(instituteDetails?.name);
      }
    }
  }, [instituteDetails, instituteId, dispatch, id, singleInstitute]);

  const formattedDomain = () => {
    const temp = {};

    instituteDomain.forEach((item) => {
      if (item === "Junior Secondary School (Class 6-10th)") {
        let tempObj = {
          domainName: "Junior Secondary School (Class 6-10th)",
          boards: boardsJrSchool,
          classes: classesJrSchool,
          subjects: subjectsJrSchool,
        };

        temp["Junior Secondary School (Class 6-10th)"] = tempObj;
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

  const [allThumbnail, setAllThumbnail] = useState([]);

  let initialLocation = locationValues?.[0] || {};

  const [mode, setMode] = useState(instituteDetails?.classmode);

  useEffect(() => {
    setRefetch(!reFetch);
  }, [showPopUp]);

  const [merchantProfile, setMerchantProfile] = useState(false);

  const uploadFiles = () => {
    const myFile = document.getElementById("myFile");
    myFile.click();
  };

  //   const uploadFiles1 = () => {
  //     const myFile = document.getElementById('myFile1')
  //     myFile.click()
  //   }

  //   const imageHandleChange = (e) => {
  //     setImages([])
  //     if (e.target.files) {
  //       let filesArray = e.target.files
  //       Object.values(filesArray).forEach((item) => {
  //         if (item.type.toLowerCase().includes('video')) {
  //
  //           setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]))
  //         }
  //         if (item.type.toLowerCase().includes('image')) {
  //
  //           setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]))
  //         }
  //       })

  //       const fileArray = Array.from(e.target.files)?.map((file) =>
  //         URL.createObjectURL(file)
  //       )
  //       setImageCounter((prev) => prev + fileArray.length)
  //       Array.from(e.target.files)?.map((file) => URL.revokeObjectURL(file))
  //     }
  //   }

  //   const videoChangeHandle = (e) => {
  //     setVideos([])
  //     if (e.target.files) {
  //       let filesArray = e.target.files
  //
  //       Object.values(filesArray).forEach((item) => {
  //         if (item.type.toLowerCase().includes('video')) {
  //
  //           setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]))
  //         }
  //         if (item.type.toLowerCase().includes('image')) {
  //
  //           setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]))
  //         }
  //       })
  //       FilterImagesAndVideos(filesArray, setImages, setVideos)
  //       const fileArray = Array.from(e.target.files)?.map((file) =>
  //         URL.createObjectURL(file)
  //       )
  //       setSelectedVideos((prevVideos) => prevVideos.concat(fileArray))
  //       setVideoCounter((prev) => prev + fileArray.length)
  //       Array.from(e.target.files)?.map((file) => URL.revokeObjectURL(file))
  //     }
  //   }

  const renderVideos = (source) => {
    return source?.map((video, key) => {
      return (
        <div key={key} className="flex">
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

  const [locationOpen, setLocationOpen] = React.useState(false);
  const handleLocationOpen = () => setLocationOpen(true);

  const [facultyOpen, setFacultyOpen] = React.useState(false);
  const handleFacultyOpen = () => setFacultyOpen(true);

  const [achievementOpen, setAchievementOpen] = React.useState(false);
  const handleAchievementOpen = () => setAchievementOpen(true);

  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);

  const [allVideos, setAllVideos] = useState([]);
  const [allImages, setAllImages] = useState([]);

  const handleSubmit = async () => {
    if (instituteName) {
      let updatedArea = [];

      if (instituteDetails?.updatedRequest?.locations) {
        instituteDetails?.updatedRequest?.locations.forEach((item) => {
          Object.values(item).forEach((keywords) => {
            updatedArea.push(
              keywords
                .toString()
                .replace(/\s*\,\s*/g, ",")
                .trim()
                .replace(/,(?=[^,]*$)/, "")
                .toLowerCase()
            );
          });
        });
      }

      if (!instituteDetails?.updatedRequest?.locations) {
        updatedArea.push(
          instituteDetails?.updatedRequest?.areas || instituteDetails?.areas
        );
      }

      const updatedData = {
        id,
        updates: {
          name: instituteName,
          description: JSON.stringify(instituteDescription),
          coursecategories: instituteDomain,
          phonenumber: instituteMobile,
          email: instituteEmail,
          workinghours:
            openingTime && closingTime
              ? `${openingTime} to ${closingTime}`
              : null,
          services: formattedDomain(),
          achievements: [],
          bank: {
            accHolderName: accountHolderName,
            bankAccNo: bankAccountNo,
            bankName: bankName,
            branch: branch,
            gstNo: gstNo,
            ifscNo: ifscCode,
          },
          classmode: mode,
          areas: updatedArea,
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
          slug: `${titleToUrl(instituteDetails?.name)}`,
          images: allImages,
          videos: allVideos,
          locations: locationValues,
          studentsenrolled: enrolledStudent || 0,
          toppers:
            instituteDetails?.updatedRequest?.toppers ||
            instituteDetails?.toppers ||
            [],
          testimonials:
            instituteDetails?.updatedRequest?.testimonials ||
            instituteDetails?.testimonials ||
            [],
        },
      };

      const updateAreas = await axios.patch(
        `${host}/institute/refresh/areas?id=${id}`
      );
      const data = {
        id,
        updates: instituteDetails.updatedRequest,
      };

      dispatch(adminUpdateInstitute(data));

      setTimeout(() => {
        navigate("/admin-dashboard/requests/institute-requests");
      }, 3000);
    }
  };

  const [instituteDomainData, setInstituteDomainData] = useState([]);

  useEffect(() => {
    if (instituteDomain) {
      let uniqueChars = [...new Set(instituteDomain)];
      setInstituteDomainData(uniqueChars);
    }
  }, [instituteDomain]);

  return (
    <div className="flex bg-[#fafafa] min-h-screen md:flex-row flex-col">
      <div className="w-[220px] md:block hidden  px-5 ">
        <div
          className="heading mb-5 flex items-center text-2xl cursor-pointer "
          onClick={() => navigate("/admin-dashboard/overview")}
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
                setRefetch(true);
              }}
            />
          )}
          {showPopUp1 && (
            <FacultyPopup
              instituteDetails={instituteDetails}
              activeFaculty={activeFaculty}
              showPopUpState1={[showPopUp1, setShowPopUp1]}
              valuesState={[facultyValues, setFacultyValues]}
              fileSrcState={[fileSrcFaculty, setFileSrcFaculty]}
              title="Add faculty"
            />
          )}

          {showEditPopUp && (
            <FacultyEditPopup
              instituteDetails={instituteDetails}
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
                      description={instituteMobile}
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
                      description={instituteEmail}
                      className=" lg:w-96 shrink mb-4 lg:mb-0"
                      disableState={[isDisable, setIsDisable]}
                      name="Institute email"
                    />
                    <CustomInputField
                      inputState={[enrolledStudent, setEnrolledStudent]}
                      description={enrolledStudent}
                      className=" lg:w-96 shrink mb-4 lg:mb-0"
                      disableState={[isDisable, setIsDisable]}
                      name="Enrolled Students"
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
                      "Junior Secondary School (Class 6-8th)",
                      "Higher Secondary School (Class 9-10th)",
                      "Senior Secondary School (Class 11-12th)",
                      "Competitive Exams",
                      "Skill Based Courses",
                      "Graduation",
                      "Post Graduation",
                      "Language Courses",
                      "Computer",
                    ]}
                    selectedState={[instituteDomainData, setInstituteDomain]}
                    placeholderText="Select your domain"
                    errorState={[instituteDomainError, setInstituteDomainError]}
                  />

                  {instituteDomainData.includes(
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
                  {instituteDomainData.includes(
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
                  {instituteDomainData.includes(
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
                  {instituteDomainData.includes("Competitive Exams") && (
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
                          "Foreign English ",
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
                  {instituteDomainData.includes("Skill Based Courses") && (
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
                  {instituteDomainData.includes("Language Courses") && (
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
                  {instituteDomainData.includes("Computer") && (
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
                  {instituteDomainData.includes("Graduation") && (
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
                  {instituteDomainData.includes("Post Graduation") && (
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
                        placeholderText="Select Streams "
                        errorState={[postMajorsError, setPostMajorsError]}
                      />
                      <CategorySelect
                        categories={getPostGraduationFromStreams(
                          postGraduationStreams
                        )}
                        selectedState={[
                          postGraduationCourses,
                          setPostGraduationStreams,
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
                      description={ownerName}
                      className=" lg:w-96 shrink  mb-4 lg:mb-0 "
                      disableState={[isDisable, setIsDisable]}
                      name="Owner Name"
                    />
                    <CustomInputField
                      inputState={[ownerPhone, setOwnerPhone]}
                      description={ownerPhone}
                      className="lg:w-96 shrink"
                      disableState={[isDisable, setIsDisable]}
                      name="Contact No."
                    />
                  </div>
                  <CustomInputField
                    inputState={[ownerEmail, setOwnerEmail]}
                    description={ownerEmail}
                    className="lg:w-96 shrink"
                    disableState={[isDisable, setIsDisable]}
                    name="Owner email"
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
                    handleFacultyOpen();
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
                                achievementValues.filter(
                                  (f) => f.id !== item.id
                                )
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

            <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
              <div className="flex">
                <DropdownSelector
                  title="Banking details"
                  isDropDown1State={[isDropDown7, setIsDropDown7]}
                />
              </div>
              {isDropDown7 && (
                <Fragment>
                  <div className="flex flex-col   lg:flex-row lg:space-x-10">
                    <CustomInputField
                      description={bankAccountNo}
                      className=" lg:w-96 shrink  mb-4 lg:mb-0"
                      disableState={[isDisable, setIsDisable]}
                      name="Bank Account No"
                      inputState={[bankAccountNo, setBankAccountNo]}
                    />
                    <CustomInputField
                      description={bankName}
                      className="lg:w-96 shrink"
                      disableState={[isDisable, setIsDisable]}
                      name="Name of the Bank"
                      inputState={[bankName, setBankName]}
                    />
                  </div>
                  <div className="flex flex-col   lg:flex-row lg:space-x-10">
                    <CustomInputField
                      description={ifscCode}
                      className=" lg:w-96 shrink  mb-4 lg:mb-0 "
                      disableState={[isDisable, setIsDisable]}
                      name="IFSC Code"
                      inputState={[ifscCode, setIfscCode]}
                    />
                    <CustomInputField
                      description={gstNo}
                      className="lg:w-96 shrink"
                      disableState={[isDisable, setIsDisable]}
                      name="GST No."
                      inputState={[gstNo, setGstNo]}
                    />
                  </div>
                  <div className="flex flex-col   lg:flex-row lg:space-x-10">
                    <CustomInputField
                      description={accountHolderName}
                      className=" lg:w-96 shrink  mb-4 lg:mb-0 "
                      disableState={[isDisable, setIsDisable]}
                      name="Account Holder Name"
                      inputState={[accountHolderName, setAccountHolderName]}
                    />
                    <CustomInputField
                      description={branch}
                      className="lg:w-96 shrink"
                      disableState={[isDisable, setIsDisable]}
                      name="Branch"
                      inputState={[branch, setBranch]}
                    />
                  </div>
                </Fragment>
              )}
              {isDropDown8 && (
                <>
                  {<DocumentSubmission instituteDetails={instituteDetails} />}
                </>
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
              className="ml-3 bg-red-500/60 my-2 transition-all  hover:-translate-y-1 shadow-md hover:shadow-lg rounded px-16 py-3 text-white font-medium "
              onClick={() => {
                navigate("/admin-dashboard/requests/institute-requests");
                setIsDisable(true);
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

export default ReviewChanges;
