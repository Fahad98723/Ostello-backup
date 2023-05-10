import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CategorySelect from "../../CategorySelect";
import { merchantSelector } from "../../../redux/slices/merchantSlice";
import { titleToUrl } from "../../utils";
import { host } from "../../../utils/constant";
import { useRouter } from "next/router";

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

export const examsFromFields = {
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

const CourseDetails = ({
  pageState,
  instituteDomainState,
  boardsJrSchoolState,
  classesJrSchoolState,
  subjectsJrSchoolState,
  boardsHrSchoolState,
  classesHrSchoolState,
  subjectsHrSchoolState,
  boardsSrSchoolState,
  streamsSrSchoolState,
  subjectsSrSchoolState,
  graduationStreamsState,
  graduationCoursesState,
  postStreamsState,
  postGraduationCoursesState,
  fieldsCompetitiveExamsState,
  examsCompetitiveExamsState,
  skillsState,
  testPrepState,
}) => {
  const [instituteDomain, setInstituteDomain] = instituteDomainState;

  const [boardsJrSchool, setBoardsJrSchool] = boardsJrSchoolState;
  const [classesJrSchool, setClassesJrSchool] = classesJrSchoolState;
  const [subjectsJrSchool, setSubjectsJrSchool] = subjectsJrSchoolState;

  const [boardsHrSchool, setBoardsHrSchool] = boardsHrSchoolState;
  const [classesHrSchool, setClassesHrSchool] = classesHrSchoolState;
  const [subjectsHrSchool, setSubjectsHrSchool] = subjectsHrSchoolState;

  const [boardsSrSchool, setBoardsSrSchool] = boardsSrSchoolState;
  const [streamsSrSchool, setStreamsSrSchool] = streamsSrSchoolState;
  const [subjectsSrSchool, setSubjectsSrSchool] = subjectsSrSchoolState;

  const [graduationStreams, setGraduationStreams] = graduationStreamsState;
  const [graduationCourses, setGraduationCourses] = graduationCoursesState;

  const [postGraduationStreams, setPostGraduationStreams] = postStreamsState;
  const [postGraduationCourses, setPostGraduationCourses] =
    postGraduationCoursesState;

  const [fieldsCompetitiveExams, setFieldsCompetitiveExams] =
    fieldsCompetitiveExamsState;
  const [examsCompetitiveExams, setExamsCompetitiveExams] =
    examsCompetitiveExamsState;

  const [skills, setSkills] = skillsState;
  const [testPrep, setTestPrep] = testPrepState;

  const [language, setLanguage] = useState([]);
  const [languageError, setLanguageError] = useState("");

  const [computer, setComputer] = useState([]);
  const [computerError, setComputerError] = useState("");

  const [instituteDomainError, setInstituteDomainError] = useState("");
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

  const [subjectsForStreams, setSubjectsForStreams] = useState([]);

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

  const saveServicesToState = (services) => {
    if (services["Junior Secondary School (Class 6-10th)"]) {
      setInstituteDomain((prv) =>
        prv.concat("Junior Secondary School (Class 6-10th)")
      );
      setBoardsJrSchool(
        services["Junior Secondary School (Class 6-10th)"].boards
      );
      setClassesJrSchool(
        services["Junior Secondary School (Class 6-10th)"].classes
      );
      setSubjectsJrSchool(
        services["Junior Secondary School (Class 6-10th)"].subjects
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

  const { instituteInformation, contactInformation } =
    useSelector(merchantSelector);
  let mode = instituteInformation.classmode;

  const router = useRouter();

  
  

  const handleSave = async (e) => {
    e.preventDefault();
    const formattedServices = formattedDomain();
    let error = false;

    if (instituteDomain.length === 0) {
      setInstituteDomainError("Please select institute category");
      error = true;
    }
    if (
      instituteDomain.includes("Junior Secondary School (Class 6-8th)") &&
      boardsJrSchool.length === 0
    ) {
      setBoardsJrSchoolError("Please select boards");
      error = true;
    }
    if (
      instituteDomain.includes("Junior Secondary School (Class 6-8th)") &&
      classesJrSchool.length === 0
    ) {
      setClassesJrSchoolError("Please select classes");
      error = true;
    }
    if (
      instituteDomain.includes("Junior Secondary School (Class 6-8th)") &&
      subjectsJrSchool.length === 0
    ) {
      setSubjectsJrSchoolError("Please select subjects as per classes");
      error = true;
    }
    if (
      instituteDomain.includes("Higher Secondary School (Class 9-10th)") &&
      boardsHrSchool.length === 0
    ) {
      setBoardsJrSchoolError("Please select boards");
      error = true;
    }
    if (
      instituteDomain.includes("Higher Secondary School (Class 9-10th)") &&
      classesHrSchool.length === 0
    ) {
      setClassesJrSchoolError("Please select classes");
      error = true;
    }
    if (
      instituteDomain.includes("Higher Secondary School (Class 9-10th)") &&
      subjectsHrSchool.length === 0
    ) {
      setSubjectsJrSchoolError("Please select subjects as per classes");
      error = true;
    }
    if (
      instituteDomain.includes("Senior Secondary School (Class 11-12th)") &&
      boardsSrSchool.length === 0
    ) {
      setBoardsSrSchoolError("Please select boards");
      error = true;
    }
    if (
      instituteDomain.includes("Senior Secondary School (Class 11-12th)") &&
      streamsSrSchool.length === 0
    ) {
      setStreamsSrSchoolError("Please select streams");
      error = true;
    }
    if (
      instituteDomain.includes("Senior Secondary School (Class 11-12th)") &&
      subjectsSrSchool.length === 0
    ) {
      setSubjectsSrSchoolError("Please select subjects as per streams");

      error = true;
    }
    if (
      instituteDomain.includes("Graduation") &&
      graduationStreams.length === 0
    ) {
      setMajorsError("Please select streams");
      error = true;
    }
    if (
      instituteDomain.includes("Graduation") &&
      graduationCourses.length === 0
    ) {
      setGraduationFieldsError("Please select courses");
      error = true;
    }

    if (
      instituteDomain.includes("Post Graduation") &&
      postGraduationStreams.length === 0
    ) {
      setPostMajorsError("Please select streams");
      error = true;
    }
    if (
      instituteDomain.includes("Post Graduation") &&
      postGraduationCourses.length === 0
    ) {
      setPostGraduationFieldsError("Please select courses");
      error = true;
    }
    if (
      instituteDomain.includes("Competitive Exams") &&
      fieldsCompetitiveExams.length === 0
    ) {
      setFieldsCompetitiveExamsError("Please select categories");
      error = true;
    }
    if (
      instituteDomain.includes("Competitive Exams") &&
      examsCompetitiveExams.length === 0
    ) {
      setExamsCompetitiveExamsError("Please select exams");
      error = true;
    }
    if (
      instituteDomain.includes("Skill Based Courses") &&
      skills.length === 0
    ) {
      setSkillsError("Please select skills");
      error = true;
    }
    if (instituteDomain.includes("Language Courses") && language.length === 0) {
      setLanguageError("Please select language course");
      error = true;
    }
    if (instituteDomain.includes("Computer") && computer.length === 0) {
      setLanguageError("Please select computer course");
      error = true;
    }

    if (error) {
      return toast.error("Please choose required fields !");
    }
    let name = instituteInformation.instituteName
      ?.toLowerCase()
      ?.replace("/,/g,");
    let line1 = instituteInformation.addressLine1
      ?.toLowerCase()
      ?.replace("/,/g,");
    let line2 = instituteInformation.addressLine2
      ?.toLowerCase()
      ?.replace("/,/g,");
    let city = instituteInformation.city?.toLowerCase()?.replace("/,/g,");
    let state = instituteInformation.state?.toLowerCase()?.replace("/,/g,");
    let country = instituteInformation.country?.toLowerCase()?.replace("/,/g,");
    let pincode = parseInt(instituteInformation.pincode);
    let area = instituteInformation.area?.toLowerCase()?.replace("/,/g,");

    const body = {
      name: instituteInformation.instituteName,
      description: instituteInformation.description,
      establishedyear: instituteInformation.instituteStart,
      workinghours: instituteInformation.workingtime,
      phonenumber: parseInt(contactInformation.mobileNumber),
      short_description: instituteInformation.shortDesc,
      email: contactInformation.ownerEmail,
      // instituteWebsite: contactInformation.instituteWebsite,
      address: {
        line1: instituteInformation.addressLine1,
        line2: instituteInformation.addressLine2 || '',
        pincode: parseInt(instituteInformation.pincode),
        area: instituteInformation.area,
        city: instituteInformation.city,
        state: instituteInformation.state,
        country: instituteInformation.country,
      },
      area_tags: [
        line1?.toLowerCase().trim(),
        line2?.length && line2?.toLowerCase().trim(),
        city?.toLowerCase().trim(),
        state?.toLowerCase().trim(),
        country?.toLowerCase().trim(),
        pincode,
        area?.toLowerCase(),
      ],
      classmode: (() => {
        if (mode.includes("hybrid")) return 1;
        else if (mode.includes("online")) return 2;
        else if (mode.includes("offline")) return 3;
      })(),
      ownerId:
        typeof window !== "undefined" &&
        window.localStorage.getItem("OWNER_ID"),
      services: formattedServices,
      coursecategories: [],
      slug: `${titleToUrl(instituteInformation.instituteName)}`,
    };
    

    try {
      // Updating UserName
      await axios.patch(
        `${host}/users`,
        {
          id:
            typeof window !== "undefined" &&
            window.localStorage.getItem("OWNER_ID"),
          updates: {
            name: contactInformation.ownerName,
          },
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${
              typeof window !== "undefined" &&
              window.localStorage.getItem("ACCESS_TOKEN")
            }`,
          },
        }
      );

      // Posting the data
      await axios.post(`${host}/institute/`, body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      toast.success(
        "Your institute information is submitted successfully ! Wait for admin approval"
      );
      router.push("/merchant/details/success");
    } catch (err) {
      
      toast.error(err.message);
    }
  };

  return (
    <form
      className="text-left w-full flex flex-col items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col justify-center items-start md:w-[410px]">
        <div className="space-y-2 mb-4">
          <h1 className="text-[20px] font-bold text-slate">
            Services you offer
          </h1>
          <div className="h-1 w-36 bg-primary"></div>
          <p className="text-grey-500 text-[14px]">
            Let’s organise the services you offer to make it easy for students
            to enroll
          </p>
        </div>
        <label htmlFor="first-name" className="block text-gray-500">
          Select your domain*
        </label>
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
          placeholderText=""
          errorState={[instituteDomainError, setInstituteDomainError]}
        />
        {instituteDomain?.includes("Junior Secondary School (Class 6-8th)") && (
          <React.Fragment>
            <h2 className="text-lg font-medium text-slate my-4">
              Junior Secondary School (Class 6-8th)
            </h2>
            <label htmlFor="first-name" className="block text-gray-500">
              Select Board*
            </label>
            <CategorySelect
              placeholderText={""}
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
            <label htmlFor="first-name" className="block text-gray-500">
              Select class*
            </label>
            <CategorySelect
              categories={[
                "Class 6",
                "Class 7",
                "Class 8",
                "Class 9",
                "Class 10",
              ]}
              selectedState={[classesJrSchool, setClassesJrSchool]}
              placeholderText=""
              errorState={[classesJrSchoolError, setClassesJrSchoolError]}
            />
            <label htmlFor="first-name" className="block text-gray-500">
              Select subjects as per classes*
            </label>
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
              errorState={[subjectsJrSchoolError, setSubjectsJrSchoolError]}
            />
          </React.Fragment>
        )}
        {instituteDomain?.includes(
          "Higher Secondary School (Class 9-10th)"
        ) && (
          <React.Fragment>
            <h2 className="text-lg font-medium text-slate my-4">
              Higher Secondary School (Class 9-10th)
            </h2>
            <label htmlFor="first-name" className="block text-gray-500">
              Select Board*
            </label>
            <CategorySelect
              placeholderText={""}
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
            <label htmlFor="first-name" className="block text-gray-500">
              Select class*
            </label>
            <CategorySelect
              categories={[
                "Class 6",
                "Class 7",
                "Class 8",
                "Class 9",
                "Class 10",
              ]}
              selectedState={[classesHrSchool, setClassesHrSchool]}
              placeholderText=""
              errorState={[classesHrSchoolError, setClassesHrSchoolError]}
            />
            <label htmlFor="first-name" className="block text-gray-500">
              Select subjects as per classes*
            </label>
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
              errorState={[subjectsHrSchoolError, setSubjectsHrSchoolError]}
            />
          </React.Fragment>
        )}
        {instituteDomain?.includes(
          "Senior Secondary School (Class 11-12th)"
        ) && (
          <React.Fragment>
            <h2 className="text-lg font-medium text-slate my-4">
              Senior Secondary School (Class 11-12th)
            </h2>
            <label htmlFor="first-name" className="block text-gray-500">
              Select Board*
            </label>
            <CategorySelect
              placeholderText={""}
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
            <label htmlFor="first-name" className="block text-gray-500">
              Select Streams*
            </label>
            <CategorySelect
              categories={[
                "Science",
                "Commerce",
                "Arts/Humanities",
                "Vocational",
              ]}
              selectedState={[streamsSrSchool, setStreamsSrSchool]}
              placeholderText=""
              errorState={[streamsSrSchoolError, setStreamsSrSchoolError]}
            />
            <label htmlFor="first-name" className="block text-gray-500">
              Select subjects as per streams*
            </label>
            <CategorySelect
              categories={getSubjectsFromStreams(streamsSrSchool)}
              selectedState={[subjectsSrSchool, setSubjectsSrSchool]}
              placeholderText=""
              errorState={[subjectsSrSchoolError, setSubjectsSrSchoolError]}
            />
          </React.Fragment>
        )}
        {instituteDomain?.includes("Competitive Exams") && (
          <React.Fragment>
            <h2 className="text-lg font-medium text-slate my-4">
              For Competitive Exams
            </h2>
            <label htmlFor="first-name" className="block text-gray-500">
              Select your field*
            </label>
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
              placeholderText=""
              errorState={[
                fieldsCompetitiveExamsError,
                setFieldsCompetitiveExamsError,
              ]}
            />
            <label htmlFor="first-name" className="block text-gray-500">
              Select exams as per fields*
            </label>
            <CategorySelect
              categories={getExamsFromFields(fieldsCompetitiveExams)}
              selectedState={[examsCompetitiveExams, setExamsCompetitiveExams]}
              placeholderText=""
              errorState={[
                examsCompetitiveExamsError,
                setExamsCompetitiveExamsError,
              ]}
            />
          </React.Fragment>
        )}
        {instituteDomain?.includes("Skill Based Courses") && (
          <React.Fragment>
            <h2 className="text-lg font-medium text-slate my-4">
              Skill Based Courses
            </h2>
            <label htmlFor="first-name" className="block text-gray-500">
              Please enter the skills you provide classes for *
            </label>
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
              placeholderText=""
              errorState={[skillsError, setSkillsError]}
            />
          </React.Fragment>
        )}
        {instituteDomain?.includes("Test Prep") && (
          <React.Fragment>
            <h2 className="text-lg font-medium text-slate my-4">Test Prep</h2>
            <label htmlFor="first-name" className="block text-gray-500">
              Please enter the test prep's classes you provide *
            </label>
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
              placeholderText=""
              errorState={[testPrepError, setTestPrepError]}
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
            <h2 className="text-lg font-medium text-slate my-4">Computer</h2>
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
            <h2 className="text-lg font-medium text-slate my-4">Graduation</h2>
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
              errorState={[graduationFieldsError, setGraduationFieldsError]}
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
              selectedState={[postGraduationStreams, setPostGraduationStreams]}
              placeholderText="Select Streams"
              errorState={[postMajorsError, setPostMajorsError]}
            />
            <CategorySelect
              categories={getPostGraduationFromStreams(postGraduationStreams)}
              selectedState={[postGraduationCourses, setPostGraduationCourses]}
              placeholderText="Select Courses "
              errorState={[
                postGraduationFieldsError,
                setPostGraduationFieldsError,
              ]}
            />
          </React.Fragment>
        )}

        <div className="w-full flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSave(e);
            }}
            className="my-2 transition-all hover:-translate-y-1 border bg-primary shadow hover:shadow-lg rounded-full px-10 py-3 text-white font-medium"
          >
            Save & Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseDetails;
