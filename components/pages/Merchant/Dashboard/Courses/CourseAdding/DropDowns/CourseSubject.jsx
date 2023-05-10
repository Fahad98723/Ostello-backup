import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseSelector,
  setDivision,
  setSubjects,
} from "../../../../../../../redux/slices/AddCourseSlice";

const CourseSubject = ({ setSubject }) => {
  const { subjects, classes, division } = useSelector(addCourseSelector);

  
  const dispatch = useDispatch();

  let handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubjects(subjects.concat(e.target.name)));
      setSubject(subjects.concat(e.target.name));
    } else {
      dispatch(setSubjects(subjects.filter((item) => item !== e.target.name)));
      setSubject(subjects.filter((item) => item !== e.target.name));
    }
  };

  

  const isChecked = (item) => subjects.includes(item);

  return (
    <form className="mt-3 h-auto px-5 rounded-lg py-3 " onChange={handleChange}>
      {classes.includes("Pre-nursery") ||
      classes.includes("Nursery") ||
      classes.includes("Class 1") ||
      classes.includes("Class 2") ||
      classes.includes("Class 3") ||
      classes.includes("Class 4") ||
      classes.includes("Class 5") ||
      classes.includes("Class 6") ||
      classes.includes("Class 7") ? (
        <div className="lg:float-left w-80">
          <div className="flex  items-center space-x-5 ">
            <input
              type="checkbox"
              name="Upper"
              className="text-xl"
              onChange={() => {}}
              checked={isChecked("Upper")}
            />{" "}
            <label htmlFor="Upper" className="text-xl">
              Upper Primary
            </label>
          </div>
          <div className="flex flex-col items-start py-5 space-y-3  px-10">
            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/English"
                className="text-xl"
                checked={isChecked("Upper Primary/English")}
              />{" "}
              <label htmlFor="English" className="text-lg">
                English
              </label>
            </div>
            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/Hindi"
                className="text-xl"
                checked={isChecked("Upper Primary/Hindi")}
              />{" "}
              <label htmlFor="Hindi" className="text-lg">
                Hindi
              </label>{" "}
            </div>
            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/Maths"
                className="text-xl"
                checked={isChecked("Upper Primary/Maths")}
              />{" "}
              <label htmlFor="Maths" className="text-lg">
                Maths
              </label>
            </div>
            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/Science"
                className="text-xl"
                checked={isChecked("Upper Primary/Science")}
              />{" "}
              <label htmlFor="Science" className="text-lg">
                Science
              </label>
            </div>
            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/Biology"
                className="text-xl"
                checked={isChecked("Upper Primary/Biology")}
              />{" "}
              <label htmlFor="Biology" className="text-lg">
                Biology
              </label>
            </div>

            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/Social"
                className="text-xl"
                checked={isChecked("Upper Primary/Social")}
              />{" "}
              <label htmlFor="Social" className="text-lg">
                Social Studies
              </label>
            </div>
            <div className="flex items-center space-x-5 ">
              <input
                type="checkbox"
                name="Upper Primary/Computer"
                className="text-xl"
                checked={isChecked("Upper Primary/Computer")}
              />{" "}
              <label htmlFor="Computer" className="text-lg">
                Computer Science
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <>
        {classes.includes("Class 8") ||
        classes.includes("Class 9") ||
        classes.includes("Class 10") ? (
          <div className="">
            <div className="flex  items-center space-x-5 ">
              <input
                type="checkbox"
                name="High"
                className="text-xl"
                checked={isChecked("")}
              />{" "}
              <label htmlFor="High" className="text-xl">
                High School
              </label>
            </div>
            <div className="flex flex-col items-start py-5 space-y-3  px-10">
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/English"
                  className="text-xl"
                  checked={isChecked("High School/English")}
                />{" "}
                <label htmlFor="English" className="text-lg">
                  English
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Hindi"
                  className="text-xl"
                  checked={isChecked("High School/Hindi")}
                />{" "}
                <label htmlFor="Hindi" className="text-lg">
                  Hindi
                </label>{" "}
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Maths"
                  className="text-xl"
                  checked={isChecked("High School/Maths")}
                />{" "}
                <label htmlFor="Maths" className="text-lg">
                  Maths
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Physics"
                  className="text-xl"
                  checked={isChecked("High School/Physics")}
                />{" "}
                <label htmlFor="Physics" className="text-lg">
                  Physics
                </label>
              </div>

              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Chemistry"
                  className="text-xl"
                  checked={isChecked("High School/Chemistry")}
                />{" "}
                <label htmlFor="Chemistry" className="text-lg">
                  Chemistry
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Biology"
                  className="text-xl"
                  checked={isChecked("High School/Biology")}
                />{" "}
                <label htmlFor="Biology" className="text-lg">
                  Biology
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Social Studies"
                  className="text-xl"
                  checked={isChecked("High School/Social Studies")}
                />{" "}
                <label htmlFor="Social" className="text-lg">
                  Social Studies
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Science"
                  className="text-xl"
                  checked={isChecked("High School/Science")}
                />{" "}
                <label htmlFor="Social" className="text-lg">
                  Science
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Computer Science"
                  className="text-xl"
                  checked={isChecked("High School/Computer Science")}
                />{" "}
                <label htmlFor="Computer" className="text-lg">
                  Computer Science
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/SST"
                  className="text-xl"
                  checked={isChecked("High School/SST")}
                />{" "}
                <label htmlFor="SST" className="text-lg">
                  SST
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Hindi"
                  className="text-xl"
                  checked={isChecked("High School/Hindi")}
                />{" "}
                <label htmlFor="Hindi" className="text-lg">
                  Hindi
                </label>
              </div>
              <div className="flex items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="High School/Sanskrit"
                  className="text-xl"
                  checked={isChecked("High School/Sanskrit")}
                />{" "}
                <label htmlFor="Sanskrit" className="text-lg">
                  Sanskrit
                </label>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <hr className="text-[#DDDDDD]" />
        <div className="lg:flex">
          {division?.includes("Science") ? (
            <div className="w-80 py-5">
              <div className="flex  items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="Science"
                  className="text-xl"
                  checked={isChecked("")}
                />{" "}
                <label htmlFor="Science" className="text-xl">
                  Science
                </label>
              </div>
              <div className="flex flex-col items-start py-5 space-y-3  px-10">
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/English"
                    className="text-xl"
                    checked={isChecked("Science/English")}
                  />{" "}
                  <label htmlFor="English" className="text-lg">
                    English
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Chemistry"
                    className="text-xl"
                    checked={isChecked("Science/Chemistry")}
                  />{" "}
                  <label htmlFor="Chemistry" className="text-lg">
                    Chemistry
                  </label>{" "}
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Physics"
                    className="text-xl"
                    checked={isChecked("Science/Physics")}
                  />{" "}
                  <label htmlFor="Physics" className="text-lg">
                    Physics
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Biology"
                    className="text-xl"
                    checked={isChecked("Science/Biology")}
                  />{" "}
                  <label htmlFor="Biology" className="text-lg">
                    Biology
                  </label>
                </div>

                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Maths"
                    className="text-xl"
                    checked={isChecked("Science/Maths")}
                  />{" "}
                  <label htmlFor="Maths" className="text-lg">
                    Maths
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Botany"
                    className="text-xl"
                    checked={isChecked("Science/Botany")}
                  />{" "}
                  <label htmlFor="Botany" className="text-lg">
                    Botany
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Zoology"
                    className="text-xl"
                    checked={isChecked("Science/Zoology")}
                  />{" "}
                  <label htmlFor="Zoology" className="text-lg">
                    Zoology
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/IP"
                    className="text-xl"
                    checked={isChecked("Science/IP")}
                  />{" "}
                  <label htmlFor="IP" className="text-lg">
                    IP
                  </label>
                </div>

                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Computer Science"
                    className="text-xl"
                    checked={isChecked("Science/Computer Science")}
                  />{" "}
                  <label htmlFor="Computer" className="text-lg">
                    Computer Science
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Science/Java"
                    className="text-xl"
                    checked={isChecked("Science/Java")}
                  />{" "}
                  <label htmlFor="Java" className="text-lg">
                    Java
                  </label>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {division?.includes("Commerce") ? (
            <div className="py-5">
              <div className="flex  items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="Commerce"
                  className="text-xl"
                  checked={isChecked("")}
                />{" "}
                <label htmlFor="Commerce" className="text-xl">
                  Commerce
                </label>
              </div>
              <div className="flex flex-col items-start py-5 space-y-3  px-10">
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/English"
                    className="text-xl"
                    checked={isChecked("Commerce/English")}
                  />{" "}
                  <label htmlFor="English" className="text-lg">
                    English
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Accounts"
                    className="text-xl"
                    checked={isChecked("Commerce/Accounts")}
                  />{" "}
                  <label htmlFor="Accounts" className="text-lg">
                    Accounts
                  </label>{" "}
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Economics"
                    className="text-xl"
                    checked={isChecked("Commerce/Economics")}
                  />{" "}
                  <label htmlFor="Economics" className="text-lg">
                    Economics
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Business"
                    className="text-xl"
                    checked={isChecked("Commerce/Business")}
                  />{" "}
                  <label htmlFor="Business" className="text-lg">
                    Business Studies
                  </label>
                </div>

                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Mathematics"
                    className="text-xl"
                    checked={isChecked("Commerce/Mathematics")}
                  />{" "}
                  <label htmlFor="Mathematics" className="text-lg">
                    Mathematics
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Statistics"
                    className="text-xl"
                    checked={isChecked("Commerce/Statistics")}
                  />{" "}
                  <label htmlFor="Statistics" className="text-lg">
                    Statistics
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/IP"
                    className="text-xl"
                    checked={isChecked("Commerce/IP")}
                  />{" "}
                  <label htmlFor="IP" className="text-lg">
                    IP
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Computer"
                    className="text-xl"
                    checked={isChecked("Commerce/Computer")}
                  />{" "}
                  <label htmlFor="Computer" className="text-lg">
                    Computer Science
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Commerce/Java"
                    className="text-xl"
                    checked={isChecked("Commerce/Java")}
                  />{" "}
                  <label htmlFor="Java" className="text-lg">
                    Java
                  </label>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <hr className="text-[#DDDDDD] w-full" />

        <div>
          {division?.includes("Humanities") ? (
            <div className="lg:float-left w-80 py-5">
              <div className="flex  items-center space-x-5 ">
                <input
                  type="checkbox"
                  name="Arts/Humanities"
                  className="text-xl"
                  checked={isChecked("Arts/Humanities")}
                />{" "}
                <label htmlFor="Arts/Humanities" className="text-xl">
                  Arts/Humanities
                </label>
              </div>
              <div className="flex flex-col items-start py-5 space-y-3  px-10">
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Economics"
                    className="text-xl"
                    checked={isChecked("Humanities/Economics")}
                  />{" "}
                  <label htmlFor="Economics" className="text-lg">
                    Economics
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/History"
                    className="text-xl"
                    checked={isChecked("Humanities/History")}
                  />{" "}
                  <label htmlFor="History" className="text-lg">
                    History
                  </label>{" "}
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Geography"
                    className="text-xl"
                    checked={isChecked("Humanities/Geography")}
                  />{" "}
                  <label htmlFor="Geography" className="text-lg">
                    Geography
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Philosophy"
                    className="text-xl"
                    checked={isChecked("Humanities/Philosophy")}
                  />{" "}
                  <label htmlFor="Philosophy" className="text-lg">
                    Philosophy
                  </label>
                </div>

                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Sociology"
                    className="text-xl"
                    checked={isChecked("Humanities/Sociology")}
                  />{" "}
                  <label htmlFor="Sociology" className="text-lg">
                    Sociology
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Anthropology"
                    className="text-xl"
                    checked={isChecked("Humanities/Anthropology")}
                  />{" "}
                  <label htmlFor="Anthropology" className="text-lg">
                    Anthropology
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Political Science"
                    className="text-xl"
                    checked={isChecked("Humanities/Political Science")}
                  />{" "}
                  <label htmlFor="Political Science" className="text-lg">
                    Political Science
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Journalism"
                    className="text-xl"
                    checked={isChecked("Humanities/Journalism")}
                  />{" "}
                  <label htmlFor="Journalism" className="text-lg">
                    Journalism
                  </label>
                </div>

                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/English"
                    className="text-xl"
                    checked={isChecked("Humanities/English")}
                  />{" "}
                  <label htmlFor="English" className="text-lg">
                    English
                  </label>
                </div>
                <div className="flex items-center space-x-5 ">
                  <input
                    type="checkbox"
                    name="Humanities/Law"
                    className="text-xl"
                    checked={isChecked("Humanities/Law")}
                  />{" "}
                  <label htmlFor="Law" className="text-lg">
                    Law
                  </label>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {classes.includes("Class 11") || classes.includes("Class 12")
            ? !division?.length && (
                <div className="py-5">
                  <div className="flex  items-center space-x-5 ">
                    <input
                      type="checkbox"
                      name="Commerce"
                      className="text-xl"
                      checked={isChecked("Commerce")}
                    />{" "}
                    <label htmlFor="Commerce" className="text-xl">
                      Vocational
                    </label>
                  </div>
                  <div className="flex flex-col items-start py-5 space-y-3  px-10">
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Banking"
                        className="text-xl"
                        checked={isChecked("Vocational/Banking")}
                      />{" "}
                      <label htmlFor="Banking" className="text-lg">
                        Banking
                      </label>
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Accountancy"
                        className="text-xl"
                        checked={isChecked("Vocational/Accountancy")}
                      />{" "}
                      <label htmlFor="Accountancy" className="text-lg">
                        Accountancy & Auditing
                      </label>{" "}
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Fabrication"
                        className="text-xl"
                        checked={isChecked("Vocational/Fabrication")}
                      />{" "}
                      <label htmlFor="Fabrication" className="text-lg">
                        Fabrication Technology
                      </label>
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Marketing"
                        className="text-xl"
                        checked={isChecked("Vocational/Marketing")}
                      />{" "}
                      <label htmlFor="Marketing" className="text-lg">
                        Marketing & Salesmanship
                      </label>
                    </div>

                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Horticulture"
                        className="text-xl"
                        checked={isChecked("Vocational/Horticulture")}
                      />{" "}
                      <label htmlFor="Horticulture" className="text-lg">
                        Horticulture
                      </label>
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Food"
                        className="text-xl"
                        checked={isChecked("Vocational/Food")}
                      />{" "}
                      <label htmlFor="Food" className="text-lg">
                        Food Service & Management
                      </label>
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Life"
                        className="text-xl"
                        checked={isChecked("Vocational/Life")}
                      />{" "}
                      <label htmlFor="Life" className="text-lg">
                        Life Insurance
                      </label>
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Library"
                        className="text-xl"
                        checked={isChecked("Vocational/Library")}
                      />{" "}
                      <label htmlFor="Library" className="text-lg">
                        Library Management
                      </label>
                    </div>
                    <div className="flex items-center space-x-5 ">
                      <input
                        type="checkbox"
                        name="Vocational/Financial"
                        className="text-xl"
                        checked={isChecked("Vocational/Financial")}
                      />{" "}
                      <label htmlFor="Financial" className="text-lg">
                        Financial Market Management
                      </label>
                    </div>
                  </div>
                </div>
              )
            : ""}
        </div>
      </>
    </form>
  );
};

export default CourseSubject;
