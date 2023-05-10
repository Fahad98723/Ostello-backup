import React from 'react';
import mentor1 from "../../../assets/exams/mentor1.svg";
import mentor2 from "../../../assets/exams/mentor2.svg";
import mentor3 from "../../../assets/exams/mentor3.svg";
import mentor4 from "../../../assets/exams/mentor4.svg";

const ExamsMentor = () => {
  const mentors = [
    {
      id: 1,
      name: "Rajbir Naryan R.",
      work: "Ostello group of institutions",
      img: mentor1.src,
      institute:"IIM Ranchi"
    },{
      id: 2,
      name: "Rajbir Naryan R.",
      work: "Ostello group of institutions",
      img: mentor1.src,
      institute:"IIM Ranchi"
    },{
      id: 3,
      name: "Rajbir Naryan R.",
      work: "Ostello group of institutions",
      img: mentor1.src,
      institute:"IIM Ranchi"
    },
    {
      id: 4,
      name: "Rajbir Naryan R.",
      work: "Ostello group of institutions",
      img: mentor1.src,
      institute:"IIM Ranchi"
    },
    {
      id: 5,
      name: "Rajbir Naryan R.",
      work: "Ostello group of institutions",
      img: mentor1.src,
      institute:"IIM Ranchi"
    },
  ];
  return (
    <div className='container mx-auto lg:px-20 px-5 grid grid-cols-1 place-items-center gap-y-5 mt-20'>
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl mb-5">
        CUET{" "}
        <span className="text-primary font-bold">Mentors & Teachers</span>
      </h1>
      <div className="flex items-center justify-center mx-auto p-1  md:p-2 flex-wrap w-full gap-4">
      {mentors.map((item,index) => (
        <div key={index} className="flex flex-col md:w-[350px] justify-between bg-white border border-primary shadow p-5">
        <div className="flex gap-2">
          <div>
            <img
              className="md:w-[125px] md:h-[100px] border border-primary shadow"
              src={item.img}
              alt=""
            />
          </div>
          <div className="">
            <h4 className='md:text-[24px] font-bold'>{item?.name}</h4>
            <p className='md:text-[16px] font-bold text-primary'>{item?.work}</p>
            <h4 className='font-bold md:text-[20px]'>{item?.institute}</h4>
          </div>
        </div>
      </div>
      ))}
      </div>
      <a href="#"><p className="text-center mt-5 underline hover:text-primary font-bold text-[18px]">
        ...meet more subject experts
      </p></a>
    </div>
  );
};

export default ExamsMentor;