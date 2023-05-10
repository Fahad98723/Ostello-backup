export const subjectsForStreams = {
  Science: [
    'English ',
    'Chemistry',
    'Biology',
    'Physics',
    'Maths',
    'Botany',
    'Zoology',
    'IP',
    'Computer Science ',
    'Java ',
    'Other',
  ],
  Commerce: [
    'Commerce ',
    'English ',
    'Accountancy',
    'Economics',
    'Business Studies',
    'Mathematics',
    'Statistics',
    'IP',
    'Computer Science',
    'Java ',
    'Other',
  ],
  'Arts/Humanities': [
    'Economics',
    'Psychology',
    'History',
    'Geography ',
    'Philosophy',
    'Sociology',
    'Anthropology ',
    'Political Science',
    'Journalism ',
    'English ',
    'Law',
    'Other ',
  ],
  Vocational: [
    'Banking ',
    'Accountancy & Auditing',
    'Fabrication Technology',
    'Marketing & Salesmanship',
    'Horticulture ',
    'Food Service & Management ',
    'Life Insurance ',
    'Financial Market Management',
    'Library Management',
    'Other ',
  ],
}

export const examsFromFields = {
  UPSC: ['CSE', 'SSC'],
  'Defence Services': [
    'NDA',
    'CDS',
    'Indian Air Force Recruitment',
    'Indian Naval Academy Recruitment',
    'AFCAT',
    'SSB',
  ],
  'Foreign English': ['OET', 'IELTS', 'PTE', 'TOEFL', 'CELPIP'],
  Medical: [
    'NEET',
    'NEET PG',
    'AIIMS',
    'AIIMS PG',
    'PGIMER',
    'CMSE',
    'FPMT',
    'NPE FET',
  ],
  'Foreign English': ['OET, IELTS , PTE , TOEFL , CELPIP'],
  Engineering: [
    'IIT-JEE-MAIN',
    'IIT-JEE-ADVANCE',
    'BITSAT',
    'VITEEE',
    'SRMJEE',
    'COMEDK',
    'KIITEE',
    'WBJEE',
    'MHTCET',
    'MET',
  ],
  Railways: ['RRB NTPC', 'RRB GROUP D', 'RRB JE', 'RRB ALP'],
  MBA: [
    'CAT',
    'XAT',
    'MAT',
    'GMAT',
    'CMAT',
    'IIFT',
    'NMAT',
    'SNAP',
    'TISSNET',
    'IBSAT',
  ],
  'College Entrance Exams': [
    'Delhi University Entrance Exam (DUET)',
    'Common University Entrance Test (CUET)',
    'Central Universities Common Entrance Test (CUCET)',
    'Common Entrance Test (CET)',
    'IIMC Entrance Exam',
    'Jamia Milia Islamia Entrance',
    'NMAT',
    'SNAP',
    'TISSNET',
    'IBSAT',
  ],
  LAW: [
    'CLAT',
    'DUET',
    'DU LLB',
    'CLAT PG',
    'AIBE',
    'DU LLM',
    'LSAT INDIA',
    'HPNET',
  ],
  Banking: [
    'SBI PO',
    'SBI SO',
    'SBI Clerk',
    'IBPS PO (CWE PO/MT)',
    'IBPS SO (CWE SO)',
    'IBPS Clerk (CWE Clerical)',
    ' IBPS RRB (CWE RRB)',
    'RBI Officer Grade B',
    ' RBI Officer Grade C',
    ' RBI Office Assistant',
    'NABARD',
  ],
}


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



export const getGraduationFromStreams = (fields) => {
  let course = [];
  fields?.forEach((field) => {
    course = course.concat(graduationCourseFields[field]);
  });
  return course.filter((course, index, self) => self.indexOf(course) === index);
};

export const getPostGraduationFromStreams = (fields) => {
  let course = [];
  fields?.forEach((field) => {
    course = course.concat(postGraduationCourseFields[field]);
  });
  return course.filter((course, index, self) => self.indexOf(course) === index);
};

export const getSubjectsFromStreams = (streams) => {
  let subjects = []
  streams?.forEach((stream) => {
    subjects = subjects.concat(subjectsForStreams[stream])
  })
  return subjects.filter(
    (subject, index, self) => self.indexOf(subject) === index
  )
}

export const getExamsFromFields = (fields) => {
  let exams = []
  fields?.forEach((field) => {
    exams = exams.concat(examsFromFields[field])
  })
  return exams.filter((exam, index, self) => self.indexOf(exam) === index)
}
