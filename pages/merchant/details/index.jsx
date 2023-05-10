import React, { useState, useEffect } from "react";
import InstituteInformation from "../../../components/pages/Merchant/InstituteInformation";
import ContactInformation from "../../../components/pages/Merchant/ContactInformation";
import CourseDetails from "../../../components/pages/Merchant/CourseDetails";
import { merchantSelector } from "../../../redux/slices/merchantSlice";
import { useDispatch, useSelector } from "react-redux";
import { Steps } from "antd";
import {
  authSelector,
  getInstituteDetails,
} from "../../../redux/slices/authSlice";
import { isEmpty } from "../../../utils/utils";
import Footer from "../../../components/layout/Footer";
import { useRouter } from "next/router";
import first from "../../../assets/merchant-details/first-base.svg";
import second from "../../../assets/merchant-details/second-base.svg";
import third from "../../../assets/merchant-details/third-base.svg";
import Navbar from "../../../components/pages/Payment/components/navabr/Navbar";
import MetaHelmet from "../../../components/MetaHelmet";
const { Step } = Steps;
const MerchantDetails = ({ meta }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { instituteDetails } = useSelector(authSelector);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const onChange = (value) => {
    setPage(value);
  };
  useEffect(() => {
    if (
      isEmpty(
        typeof window !== "undefined" &&
          window.localStorage.getItem("ACCESS_TOKEN")
      )
    ) {
      router.push("/merchant/login");
    }
    dispatch(getInstituteDetails());
  }, [router]);

  useEffect(() => {
    if (!isEmpty(instituteDetails.approval)) {
      const approval = instituteDetails.approval;
      if (!approval || approval !== 1) {
        router.push("/merchant/details/success");
      } else if (approval === 1) router.push("/merchant/dashboard");
      // navigate(
      //   approval === 1 ? '/merchant/dashboard' : '/merchant/details/success'
      // )
    }
  }, [instituteDetails, router]);

  const [instituteDomain, setInstituteDomain] = useState([]);

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

  return (
    <>
      <MetaHelmet title={meta.title} />
      <main className="w-screen h-screen m-0 p-0 overflow-y-auto overflow-x-hidden  font-dm-sans bg-white">
        <div className="fixed w-full bg-white z-50 top-0 shadow">
          <Navbar />
        </div>
        <section className="text-center w-full flex flex-col justify-center items-center pt-6 pb-16 mt-7">
          <header className="lg:w-3/5 space-y-2 mt-6 lg:mt-12">
            <>
              
            </>
            <div className="">
              <Steps
                labelPlacement="vertical"
                responsive={true}
                current={page}
                onChange={onChange}
                direction="horizontal"
                className="steps-design"
              >
                <Step
                  title={`${""} Institute`}
                  description="Please provide your name and email"
                  className="steps-design"
                  icon={
                    page >= 1 ? (
                      <img src={first.src} alt="" />
                    ) : (
                      <img src={third.src} alt="" />
                    )
                  }
                />
                <Step
                  title="Contact"
                  className="steps-design"
                  description="A few details about your company"
                  icon={
                    page === 1 ? (
                      <img src={third.src} alt="" />
                    ) : page >= 2 ? (
                      <img src={first.src} alt="" />
                    ) : (
                      <img src={second.src} alt="" />
                    )
                  }
                />
                <Step
                  title="Course"
                  className="steps-design"
                  description="Please provide your name and email"
                  icon={
                    page === 2 ? (
                      <img src={third.src} alt="" />
                    ) : page >= 3 ? (
                      <img src={first.src} alt="" />
                    ) : (
                      <img src={second.src} alt="" />
                    )
                  }
                />
              </Steps>
            </div>
          </header>

          <div className="h-fit rounded-[10px] flex items-center justify-center md:max-w-[810px] bg-[#F7F5FD] w-full lg:w-4/6 lg:px-12 py-2 lg:py-12 mt-4">
            {page === 0 && (
              <InstituteInformation
                pageState={[page, setPage]}
                progressState={[progress, setProgress]}
              />
            )}
            {page === 1 && (
              <ContactInformation
                pageState={[page, setPage]}
                progressState={[progress, setProgress]}
              />
            )}
            {page === 2 && (
              <CourseDetails
                instituteDomainState={[instituteDomain, setInstituteDomain]}
                boardsJrSchoolState={[boardsJrSchool, setBoardsJrSchool]}
                classesJrSchoolState={[classesJrSchool, setClassesJrSchool]}
                subjectsJrSchoolState={[subjectsJrSchool, setSubjectsJrSchool]}
                boardsHrSchoolState={[boardsHrSchool, setBoardsHrSchool]}
                classesHrSchoolState={[classesHrSchool, setClassesHrSchool]}
                subjectsHrSchoolState={[subjectsHrSchool, setSubjectsHrSchool]}
                boardsSrSchoolState={[boardsSrSchool, setBoardsSrSchool]}
                streamsSrSchoolState={[streamsSrSchool, setStreamsSrSchool]}
                subjectsSrSchoolState={[subjectsSrSchool, setSubjectsSrSchool]}
                graduationStreamsState={[
                  graduationStreams,
                  setGraduationStreams,
                ]}
                graduationCoursesState={[
                  graduationCourses,
                  setGraduationCourses,
                ]}
                postStreamsState={[
                  postGraduationStreams,
                  setPostGraduationStreams,
                ]}
                postGraduationCoursesState={[
                  postGraduationCourses,
                  setPostGraduationCourses,
                ]}
                fieldsCompetitiveExamsState={[
                  fieldsCompetitiveExams,
                  setFieldsCompetitiveExams,
                ]}
                examsCompetitiveExamsState={[
                  examsCompetitiveExams,
                  setExamsCompetitiveExams,
                ]}
                skillsState={[skills, setSkills]}
                testPrepState={[testPrep, setTestPrep]}
                pageState={[page, setPage]}
                progressState={[progress, setProgress]}
              />
            )}
          </div>
        </section>
        <section className="bg-[#F4EBFF] px-6 mt-10 py-10 lg:pt-16 mx-auto">
          <div className="md:max-w-[1200px]">
            <div className="md:flex justify-between md:ml-12">
              <div className="">
                <p className="text-xl font-semibold">Join our newsletter</p>
                <p className="text-base">
                  We’ll send you a nice letter once per week. No spam.
                </p>
              </div>

              <div className="my-3 ml-5">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-4 px-2 join w-full md:w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl"
                />
                <button className="px-6 w-full md:w-[120px] py-3 shadow-md my-1 rounded-lg bg-primary">
                  <p className="font-medium text-base text-white">Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer className="" />
      </main>
    </>
  );
};

export default MerchantDetails;

export const getStaticProps = async () => {
  const meta = {
    title: "Merchant Details - Ostello",
  };

  return {
    props: {
      meta,
    },
  };
};
