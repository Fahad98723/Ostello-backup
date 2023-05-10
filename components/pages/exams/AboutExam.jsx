import React from "react";
import Link from 'next/link'
const AboutExam = () => {
  const cards = [
    {
      title: "Online coaching",
      description:
        "Ostello has mastered the perfect recipe for you to crack CUET online, from live classes to 1:1 review sessions to  mock tests and reviews and in-depth analysis of past year paper's and more.",
    },
    {
      title: "Classroom",
      description:
        "Ostello's in-class sessions provides you with a holistic and rigorous training program from knowledge sessions by expert academician to group discussions and doubt solving sessions.",
    },
    {
      title: "Self Paced",
      description:
        "Ostello prides itself in being able to cater to all types of students for CUET Preparation, customize your own program with pre recorded lectures and clear your concepts and take a look whenever in doubt.",
    },
    {
      title: "Test Series",
      description:
        "Ostello has curated a test series like no other, Attempt mocks with past year questions and feedback to improve your answers and our in depth analysis tool to monitor your progress.",
    }
  ];
  const cuetUni = ["ALIGARH MUSLIM UNIVERSITY","ASSAM UNIVERSITY","BANARAS HINDU UNI","CENTRAL SANSKRIT UNI","CENTRAL UNI. OF GUJARAT","CENTRAL UNI. OF HARYANA","CENTRAL UNI. OF JAMMU","CENTRAL UNI. OF RAJASTHAN"];
  const cuetExams = ["CUET Exam","CUET Eligibility","CUET Application Fee","CUET Syllabus","CUET Pattern","CUET Preparation","CUET Previous Year Paper","CUET Previous Year Paper"];
  const cuetColleges = ["ALIGARH MUSLIM UNIVERSITY","ASSAM UNIVERSITY","BANARAS HINDU UNI","CENTRAL SANSKRIT UNI","CENTRAL UNI. OF GUJARAT","CENTRAL UNI. OF HARYANA","CENTRAL UNI. OF JAMMU","CENTRAL UNI. OF RAJASTHAN"];
  const cuetCourses = ["Arts Courses","Top Courses for Commerce","Top BSC Courses","Hotel Management Courses","Fashion Designing Courses","BA (English) Honours","BA (Economics) Honours","BA (Economics) Honours"];

  const date = "2023";
  return (
    <div className="container mx-auto lg:px-20 px-5 grid grid-cols-1 gap-y-5 mt-20">
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl mb-5">
        About CUET <span className="text-primary font-bold">{date}</span>
      </h1>
      <p className="lg:text-lg pb-5">
      The National Testing Agency (NTA) conducts the Common University Entrance Test (CUET), an all-India exam, for admissions to undergraduate and postgraduate programmes at numerous central, state, and other Indian universities, including Delhi University, BHU, Allahabad University, Tezpur University, and the University of Hyderabad, among others. Since students may find it challenging to comprehend the CUET's overall structure, our specialists at Ostello have gathered all the pertinent details regarding the exam to aid in your thorough knowledge of all its components.
      </p>
      <p className="lg:text-lg pb-5">
        Tentative CUET {date} dates are mentioned below:
      </p>
      <div className="w-full">
        <table className="table-auto w-full pl-5 border-collapse border border-[#B0B0B0]">
          <thead className="bg-primary border border-spacing-2  md:text-[20px] shadow h-[40px] text-white">
            <tr>
              <th className="text-start pl-5 border border-[#B0B0B0]">Events</th>
              <th className="text-start pl-5 border border-[#B0B0B0]">Date(Tentative Outline)</th>
            </tr>
          </thead>
          <tbody className="text-[20px] border border-[#B0B0B0]">
            <tr className="border border-[#B0B0B0] py-1.5">
              <td className="text-start pl-5 border border-[#B0B0B0]">Registration starts</td>
              <td className="text-start pl-5 border border-[#B0B0B0]">February 2023</td>
            </tr>
            <tr className="border border-[#B0B0B0] py-1.5">
              <td className="text-start pl-5 border border-[#B0B0B0]">Registration closes</td>
              <td className="text-start pl-5 border border-[#B0B0B0]">March 2023</td>
            </tr>
            <tr className="border border-[#B0B0B0] py-1.5">
              <td className="text-start pl-5 border border-[#B0B0B0]">Admit card</td>
              <td className="text-start pl-5 border border-[#B0B0B0]">1 week prior to the exam</td>
            </tr>
            <tr className="border border-[#B0B0B0] py-1.5">
              <td className="text-start pl-5 border border-[#B0B0B0]">Exam</td>
              <td className="text-start pl-5 border border-[#B0B0B0]">23 April 2023 - Mid -May 2023</td>
            </tr>
            <tr className="border border-[#B0B0B0] py-1.5">
              <td className="text-start pl-5 border border-[#B0B0B0]">Answer key</td>
              <td className="text-start pl-5 border border-[#B0B0B0]">End of May 2023</td>
            </tr>
            <tr className="border border-[#B0B0B0] py-1.5">
              <td className="text-start pl-5 border border-[#B0B0B0]">Result</td>
              <td className="text-start pl-5 border border-[#B0B0B0]">June 2023</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl mt-10">
        <span className="text-primary font-bold">CUET </span>Coaching
      </h1>
      <p className="lg:text-lg pb-5">
      Look no further than Ostello if you need CUET coaching. Ostello is known for its success in helping students prepare for aptitude tests, and CUET will be no exception. Our team of knowledgeable faculty members, who have spent years preparing students for numerous entrance tests, manages our programme for CUET instruction.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 justify-center  gap-10 mt-5">
        {cards.map((item,index)=>(
        <div key={index} className="flex bg-primary flex-col  w-full  lg:min-h-[344px] lg:h-full h-full text-white text-start p-5 rounded">
          <h4 className="text-white md:text-[22px] font-bold pb-5">
            <span className="border-b-[2px] border-white">CUET</span> {item.title}
          </h4>
          <p className="md:text-[15px] md:mt-5">
            {item.description}
          </p>
          <div className="flex justify-between gap-2 md:mt-[50px] text-[12px]">
          <Link href="#cuet-uni"
            >
             <p className='bg-white w-full text-black text-center mb-6 xl:mb-0 py-1.5 px-2 cursor-pointer'>View Details</p> 
            </Link>
            <Link
              href="#cuet-program"
            >
              <p className='bg-primary text-center border border-white text-white w-full  mb-6 xl:mb-0 py-1.5 px-2 cursor-pointer'>Enroll Now</p>
            </Link>
          </div>
        </div>
        ))}
      </div>
      <h1 id="cuet-uni" className=" leading-none font-bold text-2xl lg:text-4xl mt-10">
        <span className="text-primary font-bold">CUET </span>Participating Universities
      </h1>
          <p className="lg:text-lg pb-5">
          CUET will be the mandatory admission test for universities established under an Act of Parliament and are under the control and purview of the Ministry of Education, Government of India. In 2009, Parliament passed the Central Universities Act, which paved the way for the creation of 16 Central Universities in addition to the existing ones, to give representation to all states.
      </p>
      <p className="lg:text-lg pb-5">
      As of now, there are 54 central universities in India. The 54 Central Universities together offer close to 1.68 Lac seats under various disciplines at the undergraduate level. The admissions to most universities hitherto done based on merit (class XII marks) will come under the purview of CUET.
      </p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-5">
        {cuetUni.map((item,index)=>(
          <div key={index}>
            <p className="text-center text-[#009EF6] border border-[#B0B0B0] py-1.5 px-2">
              {item}
            </p>
          </div>
        ))}
      </div>
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl mt-10">About
        <span className="text-primary font-bold"> CUET </span>
      </h1>
          <p className="lg:text-lg pb-5">
          CUET is being conducted at such a scale for the first time in 2022. Hence, our experts at Ostello have collated all the important information about CUET to help you understand all the aspects of this exam comprehensively.
      </p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-5">
        {cuetExams.map((item,index)=>(
          <div key={index}>
            <p className="text-center text-[#009EF6] border border-[#B0B0B0] py-1.5 px-2">
              {item}
            </p>
          </div>
        ))}
      </div>
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl mt-10">
        <span className="text-primary font-bold">CUET </span>Colleges
      </h1>
          <p className="lg:text-lg pb-5">
          CUET will be a mandatory entrance test for admissions into central universities in India. We've collated the information about some of top colleges from top universities in India that will come under the purview of CUET. Get information about the courses, application and admission process, placements and fees in these articles.
      </p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-5">
        {cuetColleges.map((item,index)=>(
          <div key={index}>
            <p className="text-center text-[#009EF6] border border-[#B0B0B0] py-1.5 px-2">
              {item}
            </p>
          </div>
        ))}
      </div>
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl mt-10">
        <span className="text-primary font-bold">CUET </span>Courses
      </h1>
          <p className="lg:text-lg pb-5">
          The participating universities will offer admissions in some of their top courses through CUET. In these articles, we have collated the information about top courses, their scope, the best colleges you can apply for and career avenues that are available after completing graduation in these subjects.
      </p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-5">
        {cuetCourses.map((item,index)=>(
          <div key={index}>
            <p className="text-center text-[#009EF6] border border-[#B0B0B0] py-1.5 px-2">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutExam;
