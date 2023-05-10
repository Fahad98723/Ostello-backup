import React, { useState } from "react";
import DropdownPP from "../../components/SidePopup/DropdownPP";
// import InputFieldPP from "../../components/SidePopup/InputFieldPP";
// import TextAreaPP from "../../components/SidePopup/TextAreaPP";
// import { AiOutlinePlus } from "react-icons/ai";
// import { BsFillPenFill } from "react-icons/bs";
// import axios from "axios";
import LabelOutputPP from "../../components/SidePopup/LabelOutputPP";

const ViewCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  // const [instructorName, setInstructorName] = useState("");
  // const [boardOfEdu, setBoardOfEdu] = useState("");
  // const [classOfEduError, setClassOfEduError] = useState("");
  // const [stream, setStream] = useState("");
  // const [domain, setDomain] = useState("");
  // const [exam, setExam] = useState("");
  // const [skills, setSkills] = useState("");
  // const [mode, setMode] = useState("");
  // const [batchSize, setBatchSize] = useState("");
  // const [description, setDescription] = useState("");
  // const [basePrice, setBasePrice] = useState("");
  // const [discount, setDiscount] = useState("");
  // const [discountLimit, setDiscountLimit] = useState("");
  // const [promoCode, setPromoCode] = useState("");

  return (
    <React.Fragment>
      <form className="mt-6 w-full h-[calc(100vh-148px)] px-6 overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <DropdownPP
            selectValueState={[category, setCategory]}
            placeholderText="Loading..."
            errorState={[categoryError, setCategoryError]}
            title="Category"
            options={[
              "Junior Secondary School (Class 6-10th)",
              "Senior Secondary School (Class 11-12th)",
              "Competitive Exams",
              "Skill Based Courses",
            ]}
          />
          <DropdownPP
            selectValueState={[courseName, setCourseName]}
            placeholderText="Choose Course"
            errorState={[courseNameError, setCourseNameError]}
            title={`Course Name`}
            options={["Course 1", "Course 2", "Course 3", "Course 4"]}
          />
        </div>
        {category.length > 0 && courseName.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <LabelOutputPP title="Instructor Name" text="Alison G." />
              {category === "Skill Based Courses" && (
                <LabelOutputPP title="Skill" text="Backend Development" />
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-x-4">
              {category === "Junior Secondary School (Class 6-10th)" && (
                <div className="flex-1 flex flex-row space-x-4">
                  <LabelOutputPP title="Class" text="Class 8" />
                  <LabelOutputPP title="Board" text="CBSE" />
                </div>
              )}
              {category === "Senior Secondary School (Class 11-12th)" && (
                <div className="flex flex-1 flex-row space-x-4">
                  <LabelOutputPP title="Stream" text="Vocational Studies" />
                  <LabelOutputPP title="Board" text="CBSE" />
                </div>
              )}
              {category === "Competitive Exams" && (
                <div className="flex flex-1 flex-row space-x-4">
                  <LabelOutputPP title="Domain" text="Engineering" />
                  <LabelOutputPP title="Exam" text="JEE Main" />
                </div>
              )}
              <div className="flex flex-1 flex-row space-x-4">
                <LabelOutputPP title="Batch Size" text="40" />
                <LabelOutputPP title="Mode" text="Offline" />
              </div>
            </div>

            <h2 className="font-medium text-gray mt-8 text-lg">
              Price Details
            </h2>
            <div className="flex flex-col lg:flex-row gap-x-4">
              <div className="flex flex-1 flex-row space-x-4">
                <LabelOutputPP title="Base Price" text=" &#8377;600" />
                <LabelOutputPP title="Discount" text="60% upto &#8377; 200" />
              </div>
              <div className="flex flex-1 flex-row space-x-4">
                <LabelOutputPP title="Promo code" text="OSTELLO22" />
                <LabelOutputPP
                  title="Effective Price"
                  text={<span className="text-green"> &#8377; 530</span>}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </form>
      {/* <div className="flex space-x-4 items-center py-4 px-6">
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="px-4  text-sm py-2 border-primary text-primary border-2 w-1/2 rounded-lg"
        >
          Discard Information
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="px-4  text-sm py-2 border-primary bg-primary text-white border-2 w-1/2 rounded-lg"
        >
          Save Changes
        </button>
      </div> */}
    </React.Fragment>
  );
};

export default ViewCourse;
