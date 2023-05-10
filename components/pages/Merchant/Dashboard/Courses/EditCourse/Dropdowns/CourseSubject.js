import React, { useState } from "react";

const CourseSubject = ({ subjectValues }) => {
  const [selectSubjectValues, setSelectSubjectValues] = useState([]);
  return (
    <div
      className="mt-3 h-auto px-5 rounded-lg py-3 "
      onChange={(e) => {
        if (e.target.checked) {
          selectSubjectValues.push(e.target.name);
        } else {
          selectSubjectValues.pop(e.target.checked);
        }

        typeof window !== 'undefined' && window.localStorage.setItem(
          "selectSubject_Checked",
          JSON.stringify(selectSubjectValues)
        );
      }}
    >
      <div className="lg:float-left w-80">
        <div className="flex  items-center space-x-5 ">
          <input type="checkbox" name="Upper" className="text-xl" />{" "}
          <label htmlFor="Upper" className="text-xl">
            Upper Primary
          </label>
        </div>
        <div className="flex flex-col items-start py-5 space-y-3  px-10">
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="English" className="text-xl" />{" "}
            <label htmlFor="English" className="text-lg">
              English
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Hindi" className="text-xl" />{" "}
            <label htmlFor="Hindi" className="text-lg">
              Hindi
            </label>{" "}
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Maths" className="text-xl" />{" "}
            <label htmlFor="Maths" className="text-lg">
              Maths
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Science" className="text-xl" />{" "}
            <label htmlFor="Science" className="text-lg">
              Science
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Social" className="text-xl" />{" "}
            <label htmlFor="Social" className="text-lg">
              Social Studies
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Computer" className="text-xl" />{" "}
            <label htmlFor="Computer" className="text-lg">
              Computer Science
            </label>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex  items-center space-x-5 ">
          <input type="checkbox" name="High" className="text-xl" />{" "}
          <label htmlFor="High" className="text-xl">
            High School
          </label>
        </div>
        <div className="flex flex-col items-start py-5 space-y-3  px-10">
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="English" className="text-xl" />{" "}
            <label htmlFor="English" className="text-lg">
              English
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Hindi" className="text-xl" />{" "}
            <label htmlFor="Hindi" className="text-lg">
              Hindi
            </label>{" "}
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Maths" className="text-xl" />{" "}
            <label htmlFor="Maths" className="text-lg">
              Maths
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Physics" className="text-xl" />{" "}
            <label htmlFor="Physics" className="text-lg">
              Physics
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Chemistry" className="text-xl" />{" "}
            <label htmlFor="Chemistry" className="text-lg">
              Chemistry
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Biology" className="text-xl" />{" "}
            <label htmlFor="Biology" className="text-lg">
              Biology
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Social" className="text-xl" />{" "}
            <label htmlFor="Social" className="text-lg">
              Social Studies
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Science" className="text-xl" />{" "}
            <label htmlFor="Science" className="text-lg">
              Science
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Computer" className="text-xl" />{" "}
            <label htmlFor="Computer" className="text-lg">
              Computer Science
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="SST" className="text-xl" />{" "}
            <label htmlFor="SST" className="text-lg">
            SST
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Hindi" className="text-xl" />{" "}
            <label htmlFor="Hindi" className="text-lg">
            Hindi
            </label>
          </div>
          {/* <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Sanskrit" className="text-xl" />{" "}
            <label htmlFor="Sanskrit" className="text-lg">
            Sanskrit
            </label>
          </div> */}
        </div>
      </div>
      <hr className="text-[#DDDDDD]" />

      <div className="lg:float-left w-80 py-5">
        <div className="flex  items-center space-x-5 ">
          <input type="checkbox" name="Science" className="text-xl" />{" "}
          <label htmlFor="Science" className="text-xl">
            Science
          </label>
        </div>
        <div className="flex flex-col items-start py-5 space-y-3  px-10">
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="English" className="text-xl" />{" "}
            <label htmlFor="English" className="text-lg">
              English
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Chemistry" className="text-xl" />{" "}
            <label htmlFor="Chemistry" className="text-lg">
              Chemistry
            </label>{" "}
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Physics" className="text-xl" />{" "}
            <label htmlFor="Physics" className="text-lg">
              Physics
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Biology" className="text-xl" />{" "}
            <label htmlFor="Biology" className="text-lg">
              Biology
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Maths" className="text-xl" />{" "}
            <label htmlFor="Maths" className="text-lg">
              Maths
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Botany" className="text-xl" />{" "}
            <label htmlFor="Botany" className="text-lg">
              Botany
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Zoology" className="text-xl" />{" "}
            <label htmlFor="Zoology" className="text-lg">
              Zoology
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="IP" className="text-xl" />{" "}
            <label htmlFor="IP" className="text-lg">
              IP
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Computer" className="text-xl" />{" "}
            <label htmlFor="Computer" className="text-lg">
              Computer Science
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Java" className="text-xl" />{" "}
            <label htmlFor="Java" className="text-lg">
              Java
            </label>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="flex  items-center space-x-5 ">
          <input type="checkbox" name="Commerce" className="text-xl" />{" "}
          <label htmlFor="Commerce" className="text-xl">
            Commerce
          </label>
        </div>
        <div className="flex flex-col items-start py-5 space-y-3  px-10">
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="English" className="text-xl" />{" "}
            <label htmlFor="English" className="text-lg">
              English
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Accounts" className="text-xl" />{" "}
            <label htmlFor="Accounts" className="text-lg">
              Accounts
            </label>{" "}
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Economics" className="text-xl" />{" "}
            <label htmlFor="Economics" className="text-lg">
              Economics
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Business" className="text-xl" />{" "}
            <label htmlFor="Business" className="text-lg">
              Business Studies
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Mathematics" className="text-xl" />{" "}
            <label htmlFor="Mathematics" className="text-lg">
              Mathematics
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Statistics" className="text-xl" />{" "}
            <label htmlFor="Statistics" className="text-lg">
              Statistics
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="IP" className="text-xl" />{" "}
            <label htmlFor="IP" className="text-lg">
              IP
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Computer" className="text-xl" />{" "}
            <label htmlFor="Computer" className="text-lg">
              Computer Science
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Java" className="text-xl" />{" "}
            <label htmlFor="Java" className="text-lg">
              Java
            </label>
          </div>
        </div>
      </div>

      <hr className="text-[#DDDDDD] w-full" />

      <div className="lg:float-left w-80 py-5">
        <div className="flex  items-center space-x-5 ">
          <input type="checkbox" name="Arts/Humanities" className="text-xl" />{" "}
          <label htmlFor="Arts/Humanities" className="text-xl">
            Arts/Humanities
          </label>
        </div>
        <div className="flex flex-col items-start py-5 space-y-3  px-10">
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Economics" className="text-xl" />{" "}
            <label htmlFor="Economics" className="text-lg">
              Economics
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="History" className="text-xl" />{" "}
            <label htmlFor="History" className="text-lg">
              History
            </label>{" "}
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Geography" className="text-xl" />{" "}
            <label htmlFor="Geography" className="text-lg">
              Geography
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Philosophy" className="text-xl" />{" "}
            <label htmlFor="Philosophy" className="text-lg">
              Philosophy
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Sociology" className="text-xl" />{" "}
            <label htmlFor="Sociology" className="text-lg">
              Sociology
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Anthropology" className="text-xl" />{" "}
            <label htmlFor="Anthropology" className="text-lg">
              Anthropology
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input
              type="checkbox"
              name="Political Science"
              className="text-xl"
            />{" "}
            <label htmlFor="Political Science" className="text-lg">
              Political Science
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Journalism" className="text-xl" />{" "}
            <label htmlFor="Journalism" className="text-lg">
              Journalism
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="English" className="text-xl" />{" "}
            <label htmlFor="English" className="text-lg">
              English
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Law" className="text-xl" />{" "}
            <label htmlFor="Law" className="text-lg">
              Law
            </label>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="flex  items-center space-x-5 ">
          <input type="checkbox" name="Commerce" className="text-xl" />{" "}
          <label htmlFor="Commerce" className="text-xl">
            Vocational
          </label>
        </div>
        <div className="flex flex-col items-start py-5 space-y-3  px-10">
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Banking" className="text-xl" />{" "}
            <label htmlFor="Banking" className="text-lg">
              Banking
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Accountancy" className="text-xl" />{" "}
            <label htmlFor="Accountancy" className="text-lg">
              Accountancy & Auditing
            </label>{" "}
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Fabrication" className="text-xl" />{" "}
            <label htmlFor="Fabrication" className="text-lg">
              Fabrication Technology
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Marketing" className="text-xl" />{" "}
            <label htmlFor="Marketing" className="text-lg">
              Marketing & Salesmanship
            </label>
          </div>

          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Horticulture" className="text-xl" />{" "}
            <label htmlFor="Horticulture" className="text-lg">
              Horticulture
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Food" className="text-xl" />{" "}
            <label htmlFor="Food" className="text-lg">
              Food Service & Management
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Life" className="text-xl" />{" "}
            <label htmlFor="Life" className="text-lg">
              Life Insurance
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Library" className="text-xl" />{" "}
            <label htmlFor="Library" className="text-lg">
              Library Management
            </label>
          </div>
          <div className="flex items-center space-x-5 ">
            <input type="checkbox" name="Financial" className="text-xl" />{" "}
            <label htmlFor="Financial" className="text-lg">
              Financial Market Management
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSubject;
