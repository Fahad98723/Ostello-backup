import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseSelector,
  setExams,
} from "../../../../../../redux/slices/AddCourseSlice";

const Engineering = ({ selectedExam }) => {
  const [isDropDown21, setIsDropDown21] = useState(false);
  const [isDropDown12, setIsDropDown12] = useState(false);
  const { exams } = useSelector(addCourseSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedExam) {
      dispatch(setExams(selectedExam));
    }
  }, [dispatch, selectedExam]);

  let handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setExams(exams.concat(e.target.name)));
    } else {
      dispatch(setExams(exams.filter((item) => item !== e.target.name)));
    }
  };

  const isChecked = (item) => exams.includes(item);
  return (
    <div className="lg:flex lg:py-5 gap-3 " onChange={handleChange}>
      <div className="relative">
        <div
          className="flex items-center  lg:w-52  rounded-lg text-lg px-3 py-2 border cursor-pointer "
          onClick={() => {
            setIsDropDown21(!isDropDown21);
            setIsDropDown12(false);
          }}
        >
          <input
            type="text"
            className="text-slate px-8 focus:outline-none cursor-pointer w-full   bg-white"
            placeholder="Exam"
            disabled
          />
          <MdKeyboardArrowDown
            className={`text-2xl ${isDropDown21 ? "hidden" : "flex"}`}
          />
          <MdKeyboardArrowUp
            className={`text-2xl ${isDropDown21 ? "flex" : "hidden"}`}
          />
        </div>
        <div className="block lg:absolute ">
          {isDropDown21 && (
            <div
              className="bg-white w-full m-auto rounded-lg  py-3 flex-col text-[#939393] px-5 space-y-5"
              style={{
                boxShadow: "0px 2px 40px rgba(125, 35, 224, 0.15)",
              }}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="JEE Mains"
                  className="text-xl"
                  checked={isChecked("JEE Mains")}
                />{" "}
                <label htmlFor="JEE" className="text-xl">
                  JEE Mains
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="JEE Advanced"
                  className="text-xl"
                  checked={isChecked("JEE Advanced")}
                />{" "}
                <label htmlFor="Advanced" className="text-xl">
                  JEE Advanced
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="GATE"
                  className="text-xl"
                  checked={isChecked("GATE")}
                />{" "}
                <label htmlFor="GATE" className="text-xl">
                  GATE
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="NATA"
                  className="text-xl"
                  checked={isChecked("NATA")}
                />{" "}
                <label htmlFor="NATA" className="text-xl">
                  NATA
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="DUET"
                  className="text-xl"
                  checked={isChecked("DUET")}
                />{" "}
                <label htmlFor="DUET" className="text-xl">
                  DUET
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="AMET"
                  className="text-xl"
                  checked={isChecked("AMET")}
                />{" "}
                <label htmlFor="AMET" className="text-xl">
                  AMET
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="CIPET JEE"
                  className="text-xl"
                  checked={isChecked("CIPET JEE")}
                />{" "}
                <label htmlFor="CIPET" className="text-xl">
                  CIPET JEE
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="IMU"
                  className="text-xl"
                  checked={isChecked("IMU")}
                />{" "}
                <label htmlFor="IMU" className="text-xl">
                  IMU CET
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Engineering;
