import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isJsonParsable } from "../../../../../../utils/utils";
import CategorySelect from "../../../../../CategorySelect";

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

const YourServices = () => {
  const [aadharfile, setaadharFile] = useState(null);
  const [addressfile, setaddressfile] = useState(null);
  const [registrationfile, setregistrationfile] = useState(null);
  const { adminSingleInstitute } = useSelector(
    (state) => state.adminInstitutes
  );

  const { services } = adminSingleInstitute;


  const {
    boardsSrSchool: defaultBoardsSrSchool,
    instituteDomain: defaultInstituteDomain,
    boardsJrSchool: defaultBoardsJrSchool,
    classesJrSchool: defaultClassesJrSchool,
    subjectsJrSchool: defaultSubjectsJrSchool,
    boardsHrSchool: defaultBoardsHrSchool,
    classesHrSchool: defaultClassesHrSchool,
    subjectsHrSchool: defaultSubjectsHrSchool,
    streamsSrSchool: defaultStreamsSrSchool,
    subjectsSrSchool: defaultSubjectsSrSchool,
    fieldsCompetitiveExams: defaultFieldsCompetitiveExams,
    examsCompetitiveExams: defaultExamsCompetitiveExams,
    skills: defaultSkills,
    majors: defaultMajors,
    graduationFields: defaultGraduationFields,
    postMajors: defaultPostMajors,
    postGraduationFields: defaultPostGraduationFields,
  } = isJsonParsable(services) ? JSON.parse(services) : services;

  const initialMerchantDetails = {
    page2: {
      instituteDomain: [...defaultInstituteDomain],
      boardsJrSchool: [...defaultBoardsJrSchool],
      classesJrSchool: [...defaultClassesJrSchool],
      subjectsJrSchool: [...defaultSubjectsJrSchool],
      boardsHrSchool: [...defaultBoardsHrSchool],
      classesHrSchool: [...defaultClassesHrSchool],
      subjectsHrSchool: [...defaultSubjectsHrSchool],
      boardsSrSchool: [...defaultBoardsSrSchool],
      streamsSrSchool: [...defaultStreamsSrSchool],
      subjectsSrSchool: [...defaultSubjectsSrSchool],
      fieldsCompetitiveExams: [...defaultFieldsCompetitiveExams],
      examsCompetitiveExams: [...defaultExamsCompetitiveExams],
      skills: [...defaultSkills],
      majors: [...defaultMajors],
      graduationFields: [...defaultGraduationFields],
      postMajors: [...defaultPostMajors],
      postGraduationFields: [...defaultPostGraduationFields],
    },
  };

  const [merchantDetails, setMerchantDetails] = useState(
    initialMerchantDetails
  );

  const [instituteDomain, setInstituteDomain] = useState(
    merchantDetails.page2.instituteDomain
  );

  const [boardsJrSchool, setBoardsJrSchool] = useState(
    merchantDetails.page2.boardsJrSchool
  );

  const [classesJrSchool, setClassesJrSchool] = useState(
    merchantDetails.page2.classesJrSchool
  );
  const [subjectsJrSchool, setSubjectsJrSchool] = useState(
    merchantDetails.page2.subjectsJrSchool
  );

  const [boardsHrSchool, setBoardsHrSchool] = useState(
    merchantDetails.page2.boardsHrSchool
  );

  const [classesHrSchool, setClassesHrSchool] = useState(
    merchantDetails.page2.classesHrSchool
  );
  const [subjectsHrSchool, setSubjectsHrSchool] = useState(
    merchantDetails.page2.subjectsHrSchool
  );

  const [boardsSrSchool, setBoardsSrSchool] = useState(
    merchantDetails.page2.boardsSrSchool
  );
  const [streamsSrSchool, setStreamsSrSchool] = useState(
    merchantDetails.page2.streamsSrSchool
  );
  const [subjectsSrSchool, setSubjectsSrSchool] = useState(
    merchantDetails.page2.subjectsSrSchool
  );

  const [majors, setMajors] = useState(merchantDetails.page2.majors);
  const [graduationFields, setGraduationFields] = useState(
    merchantDetails.page2.graduationFields
  );

  const [postMajors, setPostMajors] = useState(
    merchantDetails.page2.postMajors
  );
  const [postGraduationFields, setPostGraduationFields] = useState(
    merchantDetails.page2.postGraduationFields
  );

  const [fieldsCompetitiveExams, setFieldsCompetitiveExams] = useState(
    merchantDetails.page2.fieldsCompetitiveExams
  );
  const [examsCompetitiveExams, setExamsCompetitiveExams] = useState(
    merchantDetails.page2.examsCompetitiveExams
  );
  const [skills, setSkills] = useState(merchantDetails.page2.skills);

  const isJrSchoolValid = () =>
    !instituteDomain.includes("Junior Secondary School (Class 6-8th)") ||
    (boardsJrSchool.length > 0 &&
      classesJrSchool.length > 0 &&
      subjectsJrSchool.length > 0);

  const isHrSchoolValid = () =>
    !instituteDomain.includes("Higher Secondary School (Class 9-10th)") ||
    (boardsHrSchool.length > 0 &&
      classesHrSchool.length > 0 &&
      subjectsHrSchool.length > 0);

  const isSrSchoolValid = () =>
    !instituteDomain.includes("Senior Secondary School (Class 11-12th)") ||
    (boardsSrSchool.length > 0 &&
      streamsSrSchool.length > 0 &&
      subjectsSrSchool.length > 0);

  const isGraduationValid = () =>
    !instituteDomain.includes("Graduation") ||
    (boardsSrSchool.length > 0 &&
      majors.length > 0 &&
      graduationFields.length > 0);

  const isPostGraduationValid = () =>
    !instituteDomain.includes("Post Graduation") ||
    (boardsSrSchool.length > 0 &&
      postMajors.length > 0 &&
      postGraduationFields.length > 0);

  const isCompetitiveExamsValid = () =>
    !instituteDomain.includes("Competitive Exams") ||
    (fieldsCompetitiveExams.length > 0 && examsCompetitiveExams.length > 0);

  const isSkillBasedValid = () =>
    !instituteDomain.includes("Skill Based") || skills.length > 0;

  const saveIsError = () =>
    !isJrSchoolValid() ||
    !isHrSchoolValid() ||
    !isSrSchoolValid() ||
    !isCompetitiveExamsValid() ||
    !isSkillBasedValid() ||
    !isGraduationValid() ||
    !isPostGraduationValid() ||
    instituteDomain.length <= 0;

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

  const [language, setLanguage] = useState([]);
  const [languageError, setLanguageError] = useState("");
  const [computer, setComputer] = useState([]);
  const [computerError, setComputerError] = useState("");

  return (
    <div className="text-left w-full">
      <CategorySelect
        categories={[
          "Junior Secondary School (Class 6-8th)",
          "Higher Secondary School (Class 9-10th)",
          "Senior Secondary School (Class 11-12th)",
          "Competitive Exams",
          "Skill Based Courses",
          "Graduation",
          "Post Graduation",
        ]}
        selectedState={[instituteDomain, setInstituteDomain]}
        placeholderText="Select your domain"
        errorState={[instituteDomainError, setInstituteDomainError]}
      />
      {instituteDomain.includes("Junior Secondary School (Class 6-10th)") && (
        <React.Fragment>
          <h2 className="text-lg font-medium text-slate my-4">
            Junior Secondary School (Class 6-10th)
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
            categories={[
              "Class 6",
              "Class 7",
              "Class 8",
              "Class 9",
              "Class 10",
            ]}
            selectedState={[classesJrSchool, setClassesJrSchool]}
            placeholderText="Select class"
            errorState={[classesJrSchoolError, setClassesJrSchoolError]}
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
              "Biology ",
              "Other ",
            ]}
            selectedState={[subjectsJrSchool, setSubjectsJrSchool]}
            placeholderText="Select subjects as per classes"
            errorState={[subjectsJrSchoolError, setSubjectsJrSchoolError]}
          />
        </React.Fragment>
      )}
      {instituteDomain.includes("Higher Secondary School (Class 6-10th)") && (
        <React.Fragment>
          <h2 className="text-lg font-medium text-slate my-4">
            Higher Secondary School (Class 6-10th)
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
            categories={[
              "Class 6",
              "Class 7",
              "Class 8",
              "Class 9",
              "Class 10",
            ]}
            selectedState={[classesHrSchool, setClassesHrSchool]}
            placeholderText="Select class"
            errorState={[classesHrSchoolError, setClassesHrSchoolError]}
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
              "Biology ",
              "Other ",
            ]}
            selectedState={[subjectsHrSchool, setSubjectsHrSchool]}
            placeholderText="Select subjects as per classes"
            errorState={[subjectsHrSchoolError, setSubjectsHrSchoolError]}
          />
        </React.Fragment>
      )}
      {instituteDomain.includes("Senior Secondary School (Class 11-12th)") && (
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
            errorState={[streamsSrSchoolError, setStreamsSrSchoolError]}
          />
          <CategorySelect
            categories={getSubjectsFromStreams(streamsSrSchool)}
            selectedState={[subjectsSrSchool, setSubjectsSrSchool]}
            placeholderText="Select subjects as per streams"
            errorState={[subjectsSrSchoolError, setSubjectsSrSchoolError]}
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
            selectedState={[fieldsCompetitiveExams, setFieldsCompetitiveExams]}
            placeholderText="Select your field"
            errorState={[
              fieldsCompetitiveExamsError,
              setFieldsCompetitiveExamsError,
            ]}
          />
          <CategorySelect
            categories={getExamsFromFields(fieldsCompetitiveExams)}
            selectedState={[examsCompetitiveExams, setExamsCompetitiveExams]}
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
          <h2 className="text-lg font-medium text-slate my-4">Computer</h2>
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
    </div>
  );
};

export default YourServices;
