import { useRouter } from "next/router";
import React from "react";

const ExamPreparation = () => {
  const router = useRouter();
  return (
    <div id="cuet-program" className="container mx-auto lg:px-20 px-5 grid grid-cols-1 gap-y-5 mt-10">
      <h1 className=" leading-none font-bold text-2xl md:text-4xl">
        <span className="text-primary font-bold">CUET </span>Preparation
        programs: As you like, for all the subjects
      </h1>
      <p className="lg:text-lg pb-5">
        Select your target year and the program of your choice to get started
        with your preparation
      </p>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-10">
        <div className="flex flex-col gap-2 pl-5 py-5 rounded-[10px] border-2 border-primary shadow-md shadow-primary">
          <p className="text-start">When you are appearing for CUET in?</p>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">2023</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">2024</span>
          </label>
        </div>
        <div className="flex flex-col gap-2 pl-5 py-5 rounded-md border-2 border-primary shadow-md shadow-primary">
          <p className="text-start">I want this program</p>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">In center</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Self paced program</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Fast paced program</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Live online</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Test series</span>
          </label>
        </div>
        <div className="flex flex-col gap-2 pl-5 py-5 rounded-md border-2 border-primary shadow-md shadow-primary">
          <p className="text-start">I am keen on</p>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Humanities</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Commerce</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-3 h-3 rounded-full" />
            <span className="ml-2">Sciences</span>
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={()=> router.push("/exams/cuet/programs")}
          className="bg-primary text-white w-full md:w-1/4 border py-2 mb-5 rounded-lg  xl:mb-0"
        >
          View Program
        </button>
      </div>
      <p className="lg:text-2xl pb-5 font-bold mt-20">
        Offerings subjects in all the streams for your Boards + CUET preparation
        in the program of your choice
      </p>
      <div className="grid md:grid-cols-12 grid-cols-1 w-full gap-2">
        <div className="flex flex-col col-span-3 items-center">
        <button
          onClick={() => {}}
          className="bg-white border-primary text-primary md:text-[21px] w-2/4 md:w-[214px] border py-1.5 rounded-lg mt-6 xl:mb-0"
        >
          Section 1 - Language
        </button>
        <div className="flex flex-col gap-3 rounded w-[180px] h-[242px] bg-[#F4EBFF] px-5 py-5 my-7">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">English</span>
          </label>
        </div>
        </div>
        <div className="flex flex-col col-span-6 items-center gap-2">
        <button
            onClick={() => {}}
          className="bg-white border-primary text-primary md:w-[220px] md:text-[21px] w-2/4 border py-1.5  rounded-lg mt-6 mb-5 md:mb-0"
        >
          Section 2 - Domain
        </button>
        <div className="grid md:grid-cols-3 grid-cols-2  gap-4 py-5">
        <div className="flex flex-col gap-3 rounded bg-[#BAE8E8] w-[180px] h-[242px] px-5 py-5">
          <p className="text-start font-bold">Commerce</p>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Accountancy</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Economics</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Business studies</span>
          </label>
        </div>
        <div className="flex flex-col gap-2 rounded bg-[#F4EBFF] w-[180px] h-[242px] px-5 py-5">
          <p className="text-start font-bold">Humanities</p>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Pol Science</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">History</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Psychology</span>
          </label>
        </div>
        <div className="flex flex-col gap-2 rounded bg-[#BAE8E8] w-[180px] h-[242px] px-5 py-5">
          <p className="text-start font-bold">Science</p>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Physics</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Chemistry</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">Maths</span>
          </label>
        </div>
        </div>
        </div>
        <div className="flex flex-col col-span-3 items-center">
        <button
             onClick={() => {}}
          className="bg-white border-primary text-primary md:text-[20px] w-3/4 border py-1.5  rounded-lg mt-6 xl:mb-0"
        >
          Section 3 - General
        </button>
        <div className="flex flex-col rounded w-[180px] h-[242px] bg-[#F4EBFF] px-5 py-5 my-7">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="w-3 h-3 rounded-full text-primary"
            />
            <span className="ml-2 font-bold">General Test</span>
          </label>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPreparation;
