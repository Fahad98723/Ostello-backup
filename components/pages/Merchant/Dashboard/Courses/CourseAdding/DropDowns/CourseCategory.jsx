import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseSelector,
  setCategorySelected,
  setSubCategories,
} from "../../../../../../../redux/slices/AddCourseSlice";

export const CategorySideNav = ({
  dropDownClose,
  classState,
  boardState,
  subjectState,
  subCategoryState,
  examState,
}) => {
  const [isDropDown3, setIsDropDown3] = dropDownClose;
  const [categoryCheck, setCategoryCheck] = useState([]);
  const [isExpand1, setIsExpand1] = useState(false);
  const [isExpand2, setIsExpand2] = useState(false);
  const [isExpand3, setIsExpand3] = useState(false);
  const [isExpand4, setIsExpand4] = useState(false);
  const [isExpand5, setIsExpand5] = useState(false);
  const [isExpand6, setIsExpand6] = useState(false);
  const [isExpand7, setIsExpand7] = useState(false);
  const [isExpand8, setIsExpand8] = useState(false);
  const [isExpand9, setIsExpand9] = useState(false);
  const [isExpand10, setIsExpand10] = useState(false);
  const [isExpand11, setIsExpand11] = useState(false);
  const [isExpand12, setIsExpand12] = useState(false);
  const [isExpand13, setIsExpand13] = useState(false);

  const [subCategories, setSubCategories] = subCategoryState;
  const { categorySelected } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  return (
    <>
      <div className="lg:flex hidden bg-white rounded-xl shadow-lg ">
        <div
          className="space-y-7 pl-10 py-4 w-full lg:w-60 flex flex-col cursor-pointer px-5 lg:px-0 lg:items-start text-[#757575]"
          style={{ backgroundColor: "rgba(226, 206, 248, 0.2)" }}
        >
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Academics"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Academics
          </h1>
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Competitive Exams"));
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Competitive Exams
          </h1>
          {/* <h1
            className={`${categorySelected === 'Competitive Exams' ? 'block' : 'hidden'} text-sm ml-10`}
            onClick={() => {
              setIsExpand8(true)
              setIsExpand7(false)
              setIsExpand6(false)
              setIsExpand5(false)
              setIsExpand4(false)
              setIsExpand3(false)
              setIsExpand2(false)
              setIsExpand1(false)
              setIsExpand9(false)
              setIsExpand10(false);
              setIsExpand11(false);
              dispatch(setCategorySelected('Foreign English'))
            }}
          >
            Foreign English
          </h1> */}
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Engineering"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Engineering
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Medical"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Medical
          </h1>

          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Graduation"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Graduation
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Post Graduation"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Post Graduation
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("CSIR-NET/JRF"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            CSIR-NET/JRF
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("IIT - JAM"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            IIT - JAM
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Current Affairs"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Current Affairs
          </h1>
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Skills"));
            }}
          >
            Skills
          </h1>
          <h1
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand1(true);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Photography"));
            }}
          >
            Photography
          </h1>

          <h1
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand2(true);
              setIsExpand3(false);
              setIsExpand1(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              dispatch(setCategorySelected("Business"));
            }}
          >
            Business
          </h1>
          <h1
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand3(true);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("IT & Software"));
            }}
          >
            IT & Software
          </h1>
          <h1
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand4(true);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Design"));
            }}
          >
            Design
          </h1>
          <h1
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(true);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Marketing"));
            }}
          >
            Marketing
          </h1>
          <h1
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand6(true);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Development"));
            }}
          >
            Development
          </h1>
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand7(true);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Other Skills"));
              setIsExpand6(false);
            }}
          >
            Other Skills
          </h1>
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Commerce"));
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Commerce
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("B.Com"));
            }}
          >
            B.Com
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA LLB"));
            }}
          >
            BBA LLB
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA/BMS"));
            }}
          >
            BBA/BMS
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(true);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Chartered Accountancy(CA)"));
            }}
          >
            Chartered Accountancy(CA)
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Company Secretary(CS)"));
            }}
          >
            Company Secretary(CS)
          </h1>
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(true);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Computer"));
            }}
          >
            Computer
          </h1>
          <h1
            className={` text-xl ml-5`}
            onClick={() => {
              setIsExpand8(true);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("English"));
            }}
          >
            English
          </h1>
          <h1
            className="text-xl ml-5"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(true);
              dispatch(setCategorySelected("Entrance Exam"));
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Entrance Exam
          </h1>

          <h1
            className={`${
              categorySelected === "Entrance Exam" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(true);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA"));
            }}
          >
            BBA
          </h1>
          <h1
            className={`${
              categorySelected === "Entrance Exam" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(true);
              setIsExpand13(false);
              dispatch(setCategorySelected("Under UG Entrances"));
            }}
          >
            Under UG Entrances
          </h1>
        </div>

        {isExpand1 && <PhotographyDropDown />}
        {isExpand2 && <BusinessDropDown />}
        {isExpand3 && <ItDropDown />}
        {isExpand4 && <DesignDropDown />}
        {isExpand5 && <MarketingDropDown />}
        {isExpand6 && <DevelopmentDropDown />}
        {isExpand7 && <OtherSkillsDropDown />}
        {isExpand8 && <ForeignEnglishDropDown />}
        {isExpand9 && <CommerceDropDown />}
        {isExpand10 && <ComputerDropDown />}
        {isExpand11 && <BBAEntranceDropDown />}
        {isExpand12 && <UnderUGEntranceDropDown />}
        {isExpand13 && <EntranceDropDown />}
      </div>

      {/*  Mobile DropDown */}

      <div className=" lg:hidden ">
        <div
          className="space-y-7 py-4 w-full flex flex-col cursor-pointer px-5 lg:px-0 lg:items-center text-[#757575]"
          style={{ backgroundColor: "rgba(226, 206, 248, 0.2)" }}
        >
          <h1
            className="text-xl"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Academics"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Academics
          </h1>
          <h1
            className="text-xl"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Competitive Exams"));
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Competitive Exams
          </h1>
          {/* <div
            className={`${categorySelected === 'Competitive Exams' ? 'block' : 'hidden'} text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false)
              setIsExpand2(false)
              setIsExpand3(false)
              setIsExpand4(false)
              setIsExpand5(false)
              setIsExpand6(false)
              setIsExpand7(false)
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand8(!isExpand8)
              setIsExpand11(false);
              dispatch(setCategorySelected('Foreign English'))
            }}
          >
            <h1 className='text-xl'>Foreign English</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand8 ? 'hidden' : 'flex'} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand8 ? 'flex' : 'hidden'} ml-auto`}
            />{' '}
          </div> */}
          {/* {isExpand8 && (
            <ForeignEnglishDropDown getData={(data) => setSubCategories(data)} />
          )} */}
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Engineering"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Engineering
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Medical"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Medical
          </h1>

          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Graduation"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Graduation
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Post Graduation"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Post Graduation
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("CSIR-NET/JRF"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            CSIR-NET/JRF
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("IIT - JAM"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            IIT - JAM
          </h1>
          <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Current Affairs"));
              setIsDropDown3(!isDropDown3);
            }}
          >
            Current Affairs
          </h1>
          <h1
            className="text-xl"
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Skills"));
            }}
          >
            Skills
          </h1>
          <div
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(!isExpand1);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Photography"));
            }}
          >
            <h1 className="text-xl">Photography</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand1 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand1 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand1 && (
            <PhotographyDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(!isExpand2);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Business"));
            }}
          >
            {" "}
            <h1 className="text-xl">Business</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand2 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand2 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand2 && (
            <BusinessDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(!isExpand3);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("IT & Software"));
            }}
          >
            {" "}
            <h1 className="text-xl">IT & Software</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand3 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand3 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>

          {isExpand3 && (
            <ItDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(!isExpand4);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Design"));
            }}
          >
            {" "}
            <h1 className="text-xl">Design</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand4 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand4 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand4 && (
            <DesignDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(!isExpand5);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);

              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Marketing"));
            }}
          >
            <h1 className="text-xl">Marketing</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand5 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand5 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand5 && (
            <MarketingDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Skills" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(!isExpand6);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Development"));
            }}
          >
            {" "}
            <h1 className="text-xl">Development</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand6 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand6 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand6 && (
            <DevelopmentDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className="flex"
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(!isExpand7);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Other Skills"));
            }}
          >
            {" "}
            <h1 className="text-xl">Other Skills</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand7 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand7 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand7 && (
            <OtherSkillsDropDown getData={(data) => setSubCategories(data)} />
          )}
          <h1
            className="text-xl"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Commerce"));
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Commerce
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("B.Com"));
              setIsDropDown3(false);
            }}
          >
            B.Com
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA LLB"));
              setIsDropDown3(false);
            }}
          >
            BBA LLB
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA/BMS"));
              setIsDropDown3(false);
            }}
          >
            BBA/BMS
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA LLB"));
              setIsDropDown3(false);
            }}
          >
            BBA LLB
          </h1>
          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BCA"));
              setIsDropDown3(false);
            }}
          >
            BCA
          </h1>

          <div
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(!isExpand9);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Chartered Accountancy(CA)"));
            }}
          >
            <h1 className="text-sm">Chartered Accountancy(CA)</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand9 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand9 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand9 && categorySelected === "Chartered Accountancy(CA)" && (
            <CommerceDropDown getData={(data) => setSubCategories(data)} />
          )}

          <h1
            className={`${
              categorySelected === "Commerce" ? "block" : "hidden"
            } text-sm ml-5`}
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Company Secretary(CS)"));
              setIsDropDown3(false);
            }}
          >
            Company Secretary(CS)
          </h1>
          <div
            className="flex items-center"
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(!isExpand10);
              dispatch(setCategorySelected("Computer"));
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
            }}
          >
            {" "}
            <h1 className="text-xl">Computer</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand10 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand10 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand10 && (
            <ComputerDropDown getData={(data) => setSubCategories(data)} />
          )}
          <div
            className={`text-xl flex items-center`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(!isExpand8);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("English"));
            }}
          >
            <h1 className="text-xl">English</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand8 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand8 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand8 && (
            <ForeignEnglishDropDown
              getData={(data) => setSubCategories(data)}
            />
          )}

          <h1
            className="text-xl"
            onClick={() => {
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              dispatch(setCategorySelected("Entrance Exam"));
              // setIsDropDown3(!isDropDown3)
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
            }}
          >
            Entrance Exams
          </h1>

          <div
            className={` text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              dispatch(setCategorySelected("Entrance Exam"));
              setIsExpand12(false);
              setIsExpand13(!isExpand13);
            }}
          >
            <h1 className="text-sm">Entrance Exam</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand13 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand13 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand13 && categorySelected === "Entrance Exam" && (
            <EntranceDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Entrance Exam" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(!isExpand11);
              dispatch(setCategorySelected("BBA"));
              setIsExpand12(false);
              setIsExpand13(false);
            }}
          >
            <h1 className="text-sm">BBA</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand11 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand11 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand11 && categorySelected === "BBA" && (
            <BBAEntranceDropDown getData={(data) => setSubCategories(data)} />
          )}

          <div
            className={`${
              categorySelected === "Entrance Exam" ? "block" : "hidden"
            } text-sm flex ml-5`}
            onClick={() => {
              setIsExpand1(false);
              setIsExpand2(false);
              setIsExpand3(false);
              setIsExpand4(false);
              setIsExpand5(false);
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Under UG Entrances"));
              setIsExpand12(!isExpand12);
            }}
          >
            <h1 className="text-sm">Under UG Entrances</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand12 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand12 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand12 && categorySelected === "Under UG Entrances" && (
            <UnderUGEntranceDropDown
              getData={(data) => setSubCategories(data)}
            />
          )}
        </div>
      </div>
    </>
  );
};

// Dropdowns
export const EntranceDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="SLAT"
          className="text-lg lg:text-xl"
          checked={isChecked("SLAT")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="SLAT" className="text-lg lg:text-xl">
          SLAT
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CLAT"
          className="text-lg lg:text-xl"
          checked={isChecked("CLAT")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CLAT" className="text-lg lg:text-xl">
          CLAT
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CUET"
          className="text-lg lg:text-xl"
          checked={isChecked("CUET")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CUET" className="text-lg lg:text-xl">
          CUET
        </label>
      </div>
    </form>
  );
};

export const UnderUGEntranceDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="BBA"
          className="text-lg lg:text-xl"
          checked={isChecked("BBA")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="BBA" className="text-lg lg:text-xl">
          BBA
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="BCA"
          className="text-lg lg:text-xl"
          checked={isChecked("BCA")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="BCA" className="text-lg lg:text-xl">
          BCA
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="HM (Hotel Management)"
          className="text-lg lg:text-xl"
          checked={isChecked("HM (Hotel Management)")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="HM (Hotel Management)" className="text-lg lg:text-xl">
          HM (Hotel Management)
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="BMS"
          className="text-lg lg:text-xl"
          checked={isChecked("BMS")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="BMS" className="text-lg lg:text-xl">
          BMS
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Mass Com"
          className="text-lg lg:text-xl"
          checked={isChecked("Mass Com")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Mass Com" className="text-lg lg:text-xl">
          Mass Com
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="BFIA"
          className="text-lg lg:text-xl"
          checked={isChecked("BFIA")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="BFIA" className="text-lg lg:text-xl">
          BFIA
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="BBE"
          className="text-lg lg:text-xl"
          checked={isChecked("BBE")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="BBE" className="text-lg lg:text-xl">
          BBE
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="B.COM Honours"
          className="text-lg lg:text-xl"
          checked={isChecked("B.COM Honours")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="B.COM Honours" className="text-lg lg:text-xl">
          B.COM Honours
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Economics Honours"
          className="text-lg lg:text-xl"
          checked={isChecked("Economics Honours")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Economics Honours" className="text-lg lg:text-xl">
          Economics Honours
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CUET"
          className="text-lg lg:text-xl"
          checked={isChecked("CUET")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CUET" className="text-lg lg:text-xl">
          CUET
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="IPMAT"
          className="text-lg lg:text-xl"
          checked={isChecked("IPMAT")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="IPMAT" className="text-lg lg:text-xl">
          IPMAT
        </label>
      </div>
    </form>
  );
};

export const BBAEntranceDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="IPU CET Exam Coaching"
          className="text-lg lg:text-xl"
          checked={isChecked("IPU CET Exam Coaching")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="IPU CET Exam Coaching" className="text-lg lg:text-xl">
          IPU CET Exam Coaching
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="UGAT Exam Coaching"
          className="text-lg lg:text-xl"
          checked={isChecked("UGAT Exam Coaching")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="UGAT Exam Coaching" className="text-lg lg:text-xl">
          UGAT Exam Coaching
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="SET BBA Exam Coaching"
          className="text-lg lg:text-xl"
          checked={isChecked("SET BBA Exam Coaching")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="SET BBA Exam Coaching" className="text-lg lg:text-xl">
          SET BBA Exam Coaching
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CUET BBA Exam Coaching"
          className="text-lg lg:text-xl"
          checked={isChecked("CUET BBA Exam Coaching")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CUET BBA Exam Coaching" className="text-lg lg:text-xl">
          CUET BBA Exam Coaching
        </label>
      </div>
    </form>
  );
};

export const ComputerDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Advance Excel"
          className="text-lg lg:text-xl"
          checked={isChecked("Advance Excel")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Advance Excel" className="text-lg lg:text-xl">
          Advance Excel
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name=" VBA Macro"
          className="text-lg lg:text-xl"
          checked={isChecked(" VBA Macro")}
          onChange={() => {}}
        />{" "}
        <label htmlFor=" VBA Macro" className="text-lg lg:text-xl">
          VBA Macro
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Python"
          className="text-lg lg:text-xl"
          checked={isChecked("Python")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Python" className="text-lg lg:text-xl">
          Python
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Machine Learning"
          className="text-lg lg:text-xl"
          checked={isChecked("Machine Learning")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Machine Learning" className="text-lg lg:text-xl">
          Machine Learning
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="SAS"
          className="text-lg lg:text-xl"
          checked={isChecked("SAS")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="SAS" className="text-lg lg:text-xl">
          SAS
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="R"
          className="text-lg lg:text-xl"
          checked={isChecked("R")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="R" className="text-lg lg:text-xl">
          R
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Programming"
          className="text-lg lg:text-xl"
          checked={isChecked("Programming")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Programming" className="text-lg lg:text-xl">
          Programming
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="SAP"
          className="text-lg lg:text-xl"
          checked={isChecked("SAP")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="SAP" className="text-lg lg:text-xl">
          SAP
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Digital Marketing"
          className="text-lg lg:text-xl"
          checked={isChecked("Digital Marketing")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Digital Marketing" className="text-lg lg:text-xl">
          Digital Marketing
        </label>
      </div>
    </form>
  );
};
export const CommerceDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CA Foundation course"
          className="text-lg lg:text-xl"
          checked={isChecked("CA Foundation course")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CA Foundation course" className="text-lg lg:text-xl">
          CA Foundation course
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name=" CA Intermediate examination"
          className="text-lg lg:text-xl"
          checked={isChecked(" CA Intermediate examination")}
          onChange={() => {}}
        />{" "}
        <label
          htmlFor=" CA Intermediate examination"
          className="text-lg lg:text-xl"
        >
          CA Intermediate examination
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CA Final"
          className="text-lg lg:text-xl"
          checked={isChecked("CA Final")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CA Final" className="text-lg lg:text-xl">
          CA Final
        </label>
      </div>
    </form>
  );
};
export const ForeignEnglishDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Spoken English"
          className="text-lg lg:text-xl"
          checked={isChecked("Spoken English")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Spoken English" className="text-lg lg:text-xl">
          Spoken English
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Foreign English"
          className="text-lg lg:text-xl"
          checked={isChecked("Foreign English")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Foreign English" className="text-lg lg:text-xl">
          Foreign English
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="OET"
          className="text-lg lg:text-xl"
          checked={isChecked("OET")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="OET" className="text-lg lg:text-xl">
          OET
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="IELTS"
          className="text-lg lg:text-xl"
          checked={isChecked("IELTS")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="IELTS" className="text-lg lg:text-xl">
          IELTS
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="PTE"
          className="text-lg lg:text-xl"
          checked={isChecked("PTE")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="PTE" className="text-lg lg:text-xl">
          PTE
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="TOEFL"
          className="text-lg lg:text-xl"
          checked={isChecked("TOEFL")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="TOEFL" className="text-lg lg:text-xl">
          TOEFL
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="CELPIP"
          className="text-lg lg:text-xl"
          checked={isChecked("CELPIP")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="CELPIP" className="text-lg lg:text-xl">
          CELPIP
        </label>
      </div>
    </form>
  );
};

export const PhotographyDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <form
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Digital"
          className="text-lg lg:text-xl"
          checked={isChecked("Digital")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Digital" className="text-lg lg:text-xl">
          Digital Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Landscape"
          className="text-lg lg:text-xl"
          checked={isChecked("Landscape")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Landscape" className="text-lg lg:text-xl">
          Landscape Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Portrait"
          className="text-lg lg:text-xl"
          checked={isChecked("Portrait")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Portrait" className="text-lg lg:text-xl">
          Portrait Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Commercial"
          className="text-lg lg:text-xl"
          checked={isChecked("Commercial")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Commercial" className="text-lg lg:text-xl">
          Commercial Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Video"
          className="text-lg lg:text-xl"
          checked={isChecked("Video")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Video" className="text-lg lg:text-xl">
          Video Editing
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Photo"
          className="text-lg lg:text-xl"
          checked={isChecked("Photo")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Photo" className="text-lg lg:text-xl">
          Photo Editing
        </label>
      </div>
    </form>
  );
};

export const BusinessDropDown = ({ getData = () => {} }) => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <div
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="Digital"
          name="Management"
          className="text-lg lg:text-xl"
          checked={isChecked("Management")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Management" className="text-lg lg:text-xl">
          {" "}
          Management
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Business Strategy"
          className="text-lg lg:text-xl"
          checked={isChecked("Business Strategy")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Business" className="text-lg lg:text-xl">
          Business Strategy
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Operations"
          className="text-lg lg:text-xl"
          checked={isChecked("Operations")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Operations" className="text-lg lg:text-xl">
          Operations
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Human Resources"
          className="text-lg lg:text-xl"
          checked={isChecked("Human Resources")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Human" className="text-lg lg:text-xl">
          Human Resources
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Business Law"
          className="text-lg lg:text-xl"
          checked={isChecked("Business Law")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Business" className="text-lg lg:text-xl">
          Business Law
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="E-commerce"
          className="text-lg lg:text-xl"
          checked={isChecked("E-commerce")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="E-commerce" className="text-lg lg:text-xl">
          E-commerce
        </label>
      </div>
    </div>
  );
};

export const ItDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <div
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="IT Certifications"
          className="text-lg lg:text-xl"
          checked={isChecked("IT Certifications")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="It" className="text-lg lg:text-xl">
          {" "}
          IT Certifications
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Network & Security"
          className="text-lg lg:text-xl"
          checked={isChecked("Network & Security")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Network" className="text-lg lg:text-xl">
          Network & Security
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Hardware"
          className="text-lg lg:text-xl"
          checked={isChecked("Hardware")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Hardware" className="text-lg lg:text-xl">
          Hardware
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="OS & Servers"
          className="text-lg lg:text-xl"
          checked={isChecked("OS & Servers")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="OS" className="text-lg lg:text-xl">
          OS & Servers
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Others"
          className="text-lg lg:text-xl"
          checked={isChecked("Others")}
          onChange={() => {}}
        />{" "}
        <label htmlFor="Others" className="text-lg lg:text-xl">
          Others
        </label>
      </div>
    </div>
  );
};

export const DesignDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };

  return (
    <div
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Graphic Design")}
          onChange={() => {}}
          name="Graphic Design"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Graphic" className="text-lg lg:text-xl">
          {" "}
          Graphic Design{" "}
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("UX Design")}
          onChange={() => {}}
          name="UX Design"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="UX" className="text-lg lg:text-xl">
          UX Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Interior Design")}
          onChange={() => {}}
          name="Interior Design"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Interior" className="text-lg lg:text-xl">
          Interior Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Fashion Design")}
          onChange={() => {}}
          name="Fashion Design"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Fashion" className="text-lg lg:text-xl">
          Fashion Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Architectural Design")}
          onChange={() => {}}
          name="Architectural Design"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Architectural" className="text-lg lg:text-xl">
          Architectural Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Web Design")}
          onChange={() => {}}
          name="Web Design"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Web" className="text-lg lg:text-xl">
          Web Design
        </label>
      </div>
    </div>
  );
};

export const MarketingDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };
  return (
    <div
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Digital Marketing")}
          onChange={() => {}}
          name="Digital Marketing"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Digital" className="text-lg lg:text-xl">
          {" "}
          Digital Marketing{" "}
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Branding")}
          onChange={() => {}}
          name="Branding"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Branding" className="text-lg lg:text-xl">
          Branding
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Public Relations")}
          onChange={() => {}}
          name="Public Relations"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Public" className="text-lg lg:text-xl">
          Public Relations
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Product Marketing")}
          onChange={() => {}}
          name="Product Marketing"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Product" className="text-lg lg:text-xl">
          Product Marketing
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Marketing Fundamentals")}
          onChange={() => {}}
          name="Marketing Fundamentals"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Marketing" className="text-lg lg:text-xl">
          Marketing Fundamentals
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Content Marketing")}
          onChange={() => {}}
          name="Content Marketing"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Content" className="text-lg lg:text-xl">
          Content Marketing
        </label>
      </div>
    </div>
  );
};

export const DevelopmentDropDown = ({ getData = () => {} }) => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };
  return (
    <div
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Web Development")}
          onChange={() => {}}
          name="Web Development"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Web" className="text-lg lg:text-xl">
          {" "}
          Web Development{" "}
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Data Science")}
          onChange={() => {}}
          name="Data Science"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Data" className="text-lg lg:text-xl">
          Data Science
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Programming Languages")}
          onChange={() => {}}
          name="Programming Languages"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Programming" className="text-lg lg:text-xl">
          Programming Languages
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Game Development")}
          onChange={() => {}}
          name="Game Development"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Game" className="text-lg lg:text-xl">
          Game Development
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("No-code Development")}
          onChange={() => {}}
          name="No-code Development"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="No-code" className="text-lg lg:text-xl">
          No-code Development
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Mobile Development")}
          onChange={() => {}}
          name="Mobile Development"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Content" className="text-lg lg:text-xl">
          Mobile Development
        </label>
      </div>
    </div>
  );
};

export const OtherSkillsDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(subCategories.filter((item) => item !== e.target.name))
      );
    }
  };
  return (
    <div
      className="bg-white px-5 py-3 text-[#939393] space-y-5"
      onChange={handleChange}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Finance & Accounting")}
          onChange={() => {}}
          name="Finance & Accounting"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Finance" className="text-lg lg:text-xl">
          {" "}
          Finance & Accounting{" "}
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("E-commerce")}
          onChange={() => {}}
          name="Personal Development"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Personal" className="text-lg lg:text-xl">
          Personal Development
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Lifestyle")}
          onChange={() => {}}
          name="Lifestyle"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Lifestyle" className="text-lg lg:text-xl">
          Lifestyle
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Health & Fitness")}
          onChange={() => {}}
          name="Health & Fitness"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Health" className="text-lg lg:text-xl">
          Health & Fitness
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Music")}
          onChange={() => {}}
          name="Music"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Music" className="text-lg lg:text-xl">
          Music
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Language Learning")}
          onChange={() => {}}
          name="Language Learning"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Language" className="text-lg lg:text-xl">
          Language Learning
        </label>
      </div>
    </div>
  );
};
