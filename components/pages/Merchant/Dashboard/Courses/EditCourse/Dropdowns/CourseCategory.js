import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseSelector,
  setCategorySelected,
  setSubCategories,
} from "../../../../../../../redux/slices/AddCourseSlice";

export const CategorySideNav = ({
  setCategorySelect,
  dropDownClose,
  subCategoryState,
  subCategory,
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

  const { subCategories } = useSelector(addCourseSelector);

  // const [subCategories, setSubCategories] = subCategoryState;
  const { categorySelected } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subCategory?.length) {
      dispatch(setSubCategories(subCategory));
    }
  }, [subCategory, dispatch]);

  

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
              setCategorySelect("Academics");
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
              setCategorySelect("Competitive Exams");
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Competitive Exams
          </h1>
          {/* <h1
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm ml-10`}
            onClick={() => {
              setIsExpand8(true);
              setIsExpand7(false);
              setIsExpand6(false);
              setIsExpand5(false);
              setIsExpand4(false);
              setIsExpand3(false);
              setIsExpand2(false);
              setIsExpand1(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              dispatch(setCategorySelected("Foreign English"));
              setCategorySelect("Foreign English");
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
              setCategorySelect("Engineering");
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
              setCategorySelect("Medical");
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
              setCategorySelect("Graduation");
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
              setCategorySelect("Post Graduation");
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
              setCategorySelect("CSIR-NET/JRF");
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
              setCategorySelect("IIT - JAM");
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
              setCategorySelect("Current Affairs");
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
              setCategorySelect("Skills");
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
              setCategorySelect("Photography");
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
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Business"));
              setCategorySelect("Business");
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
              setCategorySelect("IT & Software");
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
              setCategorySelect("Design");
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
              setCategorySelect("Marketing");
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
              setCategorySelect("Development");
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
              setCategorySelect("Other Skills");
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
              setCategorySelect("Commerce");
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
              setCategorySelect("B.Com");
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
              setCategorySelect("BBA LLB");
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
              setCategorySelect("BBA/BMS");
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
              setCategorySelect("Chartered Accountancy(CA)");
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
              setCategorySelect("Company Secretary(CS)");
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
              setCategorySelect("Computer");
              setIsExpand6(false);
            }}
          >
            Computer
          </h1>
          <h1
            className={` text-XL ml-5`}
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
              setCategorySelect("English");
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
              setCategorySelect("Entrance Exam");
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
              setCategorySelect("BBA");
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
              setIsExpand12(false);
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
              setCategorySelect("Academics");
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
              setCategorySelect("Competitive Exams");
              // setIsDropDown3(!isDropDown3)
            }}
          >
            Competitive Exams
          </h1>
          {/* <div
            className={`${
              categorySelected === "Competitive Exams" ? "block" : "hidden"
            } text-sm flex ml-5`}
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
              dispatch(setCategorySelected("English"));
              setCategorySelect(" English");
            }}
          >
            <h1 className="text-sm">English</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand8 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand8 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand8 && categorySelected === "Foreign English" && (
            <ForeignEnglishDropDown
              getData={(data) => setSubCategories(data)}
            />
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
              setCategorySelect("Engineering");
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
              setCategorySelect("Medical");
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
              setIsExpand6(false);
              setIsExpand7(false);
              setIsExpand8(false);
              setIsExpand9(false);
              setIsExpand10(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Graduation"));
              setCategorySelect("Graduation");
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
              setCategorySelect("Post Graduation");
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
              setCategorySelect("CSIR-NET/JRF");
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
              setCategorySelect("IIT - JAM");
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
              setCategorySelect("Current Affairs");
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
              setCategorySelect("Skills");
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
              setCategorySelect("Photography");
            }}
          >
            <h1 className="text-sm">Photography</h1>
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
              setCategorySelect("Business");
            }}
          >
            {" "}
            <h1 className="text-sm">Business</h1>
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
              setCategorySelect("IT & Software");
            }}
          >
            {" "}
            <h1 className="text-sm">IT & Software</h1>
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
              setCategorySelect("Design");
            }}
          >
            {" "}
            <h1 className="text-sm">Design</h1>
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
              setCategorySelect("Marketing");
            }}
          >
            <h1 className="text-sm">Marketing</h1>
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
              setCategorySelect("Development");
            }}
          >
            {" "}
            <h1 className="text-sm">Development</h1>
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
              setCategorySelect("Other Skills");
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
              setCategorySelect("Commerce");
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
              setCategorySelect("B.Com");
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
              setCategorySelect("BBA LLB");
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
              setCategorySelect("BBA/BMS");
              setIsDropDown3(false);
            }}
          >
            BBA/BMS
          </h1>
          {/* <h1
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
              dispatch(setCategorySelected("BBA LLB"));
              setIsDropDown3(false);
            }}
          >
            BBA LLB
          </h1> */}
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
              dispatch(setCategorySelected("BCA"));
              setCategorySelect("BCA");
              setIsDropDown3(false);
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
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
              setCategorySelect("Chartered Accountancy(CA)");
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
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Company Secretary(CS)"));
              setCategorySelect("Company Secretary(CS)");
              setIsDropDown3(false);
            }}
          >
            Company Secretary(CS)
          </h1>
          <div
            className="flex"
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
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Computer"));
              setCategorySelect("Computer");
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
            className={`flex `}
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
              setCategorySelect("English");
            }}
          >
            <h1 className="text-sm"> English</h1>
            <MdKeyboardArrowDown
              className={`text-2xl ${isExpand8 ? "hidden" : "flex"} ml-auto`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isExpand8 ? "flex" : "hidden"} ml-auto`}
            />{" "}
          </div>
          {isExpand8 && categorySelected === "English" && (
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
              setIsExpand11(false);
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("Entrance Exam"));
              setCategorySelect("Entrance Exam");
              // setIsDropDown3(!isDropDown3)
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
              setCategorySelect("Entrance Exam");
              setIsExpand12(false);
              setIsExpand13(false);
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
              setIsExpand12(false);
              setIsExpand13(false);
              dispatch(setCategorySelected("BBA"));
              setCategorySelect("BBA");
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

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
export const PhotographyDropDown = ({}) => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const [photographyCheckValue, setPhotographyCheckValue] = useState([]);

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("Digital")}
          name="Digital"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Digital" className="text-lg lg:text-xl">
          Digital Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Landscape")}
          type="checkbox"
          name="Landscape"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Landscape" className="text-lg lg:text-xl">
          Landscape Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Portrait")}
          type="checkbox"
          name="Portrait"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Portrait" className="text-lg lg:text-xl">
          Portrait Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Commercial")}
          type="checkbox"
          name="Commercial"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Commercial" className="text-lg lg:text-xl">
          Commercial Photography
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Video")}
          type="checkbox"
          name="Video"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Video" className="text-lg lg:text-xl">
          Video Editing
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Photo")}
          name="Photo"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Photo" className="text-lg lg:text-xl">
          Photo Editing
        </label>
      </div>
    </div>
  );
};

export const BusinessDropDown = () => {
  const [businessValues, setBusinessValues] = useState([]);

  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("Management")}
          type="checkbox"
          id="Digital"
          name="Management"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Management" className="text-lg lg:text-xl">
          {" "}
          Management
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Business")}
          type="checkbox"
          name="Business"
          className="text-lg lg:text-xl"
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
        />{" "}
        <label htmlFor="Operations" className="text-lg lg:text-xl">
          Operations
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Human")}
          type="checkbox"
          name="Human"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Human" className="text-lg lg:text-xl">
          Human Resources
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          checked={isChecked("Business")}
          type="checkbox"
          name="Business"
          className="text-lg lg:text-xl"
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
        />{" "}
        <label htmlFor="E-commerce" className="text-lg lg:text-xl">
          E-commerce
        </label>
      </div>
    </div>
  );
};

//these need to convert

export const ItDropDown = () => {
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("It")}
          name="It"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="It" className="text-lg lg:text-xl">
          {" "}
          IT Certifications
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Network")}
          name="Network"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Network" className="text-lg lg:text-xl">
          Network & Security
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Hardware"
          checked={isChecked("Hardware")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Hardware" className="text-lg lg:text-xl">
          Hardware
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="OS"
          checked={isChecked("OS")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="OS" className="text-lg lg:text-xl">
          OS & Servers
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Others"
          checked={isChecked("Others")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Others" className="text-lg lg:text-xl">
          Others
        </label>
      </div>
    </div>
  );
};

export const DesignDropDown = () => {
  const [designCheckValue, setDesignCheckValue] = useState([]);

  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("Graphic")}
          name="Graphic"
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
          checked={isChecked("UX")}
          name="UX"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="UX" className="text-lg lg:text-xl">
          UX Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Interior"
          checked={isChecked("Interior")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Interior" className="text-lg lg:text-xl">
          Interior Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Fashion"
          checked={isChecked("Fashion")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Fashion" className="text-lg lg:text-xl">
          Fashion Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Architectural"
          className="text-lg lg:text-xl"
          checked={isChecked("Architectural")}
        />{" "}
        <label htmlFor="Architectural" className="text-lg lg:text-xl">
          Architectural Design
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Web")}
          name="Web"
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
  const [markerCheckValues, setMarkerCheckValues] = useState([]);

  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("Digital")}
          name="Digital"
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
          name="Branding"
          checked={isChecked("Branding")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Branding" className="text-lg lg:text-xl">
          Branding
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Public"
          checked={isChecked("Public")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Public" className="text-lg lg:text-xl">
          Public Relations
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Product"
          checked={isChecked("Product")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Product" className="text-lg lg:text-xl">
          Product Marketing
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Marketing"
          className="text-lg lg:text-xl"
          checked={isChecked("Marketing")}
        />{" "}
        <label htmlFor="Marketing" className="text-lg lg:text-xl">
          Marketing Fundamentals
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Content")}
          name="Content"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Content" className="text-lg lg:text-xl">
          Content Marketing
        </label>
      </div>
    </div>
  );
};

export const DevelopmentDropDown = () => {
  const [developmentCheckValues, setDevelopmentCheckValues] = useState([]);
  // const handleChange = (e) => {
  //   const { name, checked } = e.target
  // }
  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("Web")}
          name="Web"
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
          checked={isChecked("Data")}
          name="Data"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Data" className="text-lg lg:text-xl">
          Data Science
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Programming"
          checked={isChecked("Programming")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Programming" className="text-lg lg:text-xl">
          Programming Languages
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Game")}
          name="Game"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Game" className="text-lg lg:text-xl">
          Game Development
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("No-code")}
          name="No-code"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="No-code" className="text-lg lg:text-xl">
          No-code Development
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Mobile")}
          name="Mobile"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Mobile" className="text-lg lg:text-xl">
          Mobile Development
        </label>
      </div>
    </div>
  );
};

export const OtherSkillsDropDown = () => {
  const [otherSkillsCheckValues, setOtherSkillsCheckValues] = useState([]);

  // const handleChange = (e) => {
  //   const { name, checked } = e.target

  // }

  const { subCategories } = useSelector(addCourseSelector);
  const dispatch = useDispatch();

  const isChecked = (item) => subCategories?.includes(item);
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setSubCategories(subCategories?.concat(e.target.name)));
    } else {
      dispatch(
        setSubCategories(
          subCategories?.filter((item) => item !== e.target.name)
        )
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
          checked={isChecked("Finance")}
          name="Finance"
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
          checked={isChecked("Personal")}
          name="Personal"
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Personal" className="text-lg lg:text-xl">
          Personal Development
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="Lifestyle"
          className="text-lg lg:text-xl"
          checked={isChecked("Lifestyle")}
        />{" "}
        <label htmlFor="Lifestyle" className="text-lg lg:text-xl">
          Lifestyle
        </label>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked("Health")}
          name="Health"
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
          name="Language"
          checked={isChecked("Language")}
          className="text-lg lg:text-xl"
        />{" "}
        <label htmlFor="Language" className="text-lg lg:text-xl">
          Language Learning
        </label>
      </div>
    </div>
  );
};
