import React, { useEffect, useState } from "react";
import { BasicDetails } from "./CourseAdding/BasicDetails";
import AdditionalDescription from "./CourseAdding/AdditionalDescription";
import Filters from "./CourseAdding/Filters";
import CoursePrice from "./CourseAdding/CoursePrice";
import ProductionSupport from "./CourseAdding/ProductionSupport";
import SyllabusDescription from "./CourseAdding/SyllabusDescription";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

const AddCourseMobile = ({ data }) => {
  const [
    setIsBasicDetails,
    setIsAdditionaDetails,
    setIsSyllabus,
    setIsCoursePrice,
    setIsProduct,
    setIsFilters,
    isBasicDetails,
    proceed1,
    setPage1,
    setPage2,
    setPage3,
    track1,
    track2,
    isBasicDetails11,
    isDropDown1,
    setisDropDown1,
    page1,
    setProceed1,
    isDropDown2,
    setisDropDown2,
    isDropDown3,
    setisDropDown3,
    proceed21,
    setProceed21,
    setisDropDown6,
    isDropDown6,
    isSubmitTrue,
    setIsSubmitTrue,
    setTrack2,
    page3,
    setisDropDown5,
    isDropDown5,
    proceed51,
    setProceed51,
    isDropDown4,
    setisDropDown7,
    setisDropDown4,
    page2,
    setTrack1,
    proceed31,
    setProceed31,
    setIsBasicDetails11,
    proceed41,
    setProceed41,
    isDropDown7,
    proceed61,
    setProceed61,
    isAdditionaDetails,
    handleSend,
    isProduct,
    isCoursePrice,
    isSyllabus,
    isFilters,
  ] = data;

  const [handleButton, setHandleButton] = useState(false);
  const [details, setDetails] = useState(false);

  //   useEffect(() => {
  // if(proceed1){
  //     setIsAdditionaDetails(true)
  // }
  // if(details){
  //     setIsAdditionaDetails(false)
  //     setIsFilters(true);
  // }

  //   },[proceed1, setIsAdditionaDetails, details, setIsFilters])

  return (
    <div className="bg-white py-2 lg:hidden">
      <div className="flex mt-6 py-2 lg:hidden px-10  justify-center ">
        <div className="flex justify-center items-center ">
          <p
            className="bg-primary text-white w-7 h-7 text-center rounded-full"
            onClick={() => {
              setPage1(true);
              setPage2(false);
              setPage3(false);
            }}
          >
            1
          </p>
          <hr
            className="w-24"
            style={
              track1
                ? { borderTop: "1px solid #7D23E0" }
                : {
                    borderTop: "1px dashed  rgba(53, 53, 53, 0.33)",
                  }
            }
          />
        </div>
        <div className="flex justify-center items-center">
          <p
            className={`${
              track1 ? "bg-primary" : "bg-gray"
            } text-white w-7 h-7 text-center rounded-full`}
            onClick={() => {
              setPage1(false);
              setPage2(true);
              setPage3(false);
            }}
          >
            2
          </p>
          <hr
            className="w-24"
            style={
              track2
                ? { borderTop: "1px solid #7D23E0" }
                : {
                    borderTop: "1px dashed  rgba(53, 53, 53, 0.33)",
                  }
            }
          />
        </div>
        <div className="flex justify-center items-center">
          <p
            className={`${
              track2 ? "bg-primary" : "bg-gray"
            }  text-white w-7 h-7 text-center rounded-full `}
            onClick={() => {
              setPage1(false);
              setPage2(false);
              setPage3(true);
            }}
          >
            3
          </p>
        </div>
      </div>

      {page1 && (
        <nav className={` lg:hidden font-dm-sans mb-10  px-5 py-4  z-50  `}>
          <div className="bg-white">
            <h1 className="text-2xl font-medium ">Profile Section</h1>

            <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
              <div
                className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                  isBasicDetails11 ? "bg-primary " : "bg-white"
                }`}
                onClick={() => {
                  setIsBasicDetails(!isBasicDetails);
                  setDetails(false);
                  setIsFilters(false);
                  setIsSyllabus(false);
                  setIsCoursePrice(false);
                  setisDropDown1(!isDropDown1);
                  setProceed1(false);
                  setProceed21(false);
                  setProceed31(false);
                }}
              >
                <button
                  className={`${
                    isBasicDetails11 ? "text-white " : "text-solid"
                  } text-lg `}
                >
                  Basic Details
                </button>
                <div className="flex-1"></div>

                <MdKeyboardArrowDown
                  className={`text-2xl ${isDropDown1 ? "hidden" : "flex"}`}
                />
                <MdKeyboardArrowUp
                  className={`text-2xl ${
                    isDropDown1 ? "flex text-white" : "hidden"
                  }`}
                />
              </div>

              {isBasicDetails && (
                <BasicDetails
                  {...{
                    proceedState: [proceed1, setProceed1],
                    setDetails,
                    isAdditionaDetails,
                    setIsBasicDetails,
                    isBasicDetails,
                  }}
                />
              )}

              <div
                className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                  isAdditionaDetails ? "bg-primary " : "bg-white"
                }`}
                onClick={() => {
                  setIsBasicDetails(false);
                  setDetails(!details);
                  setIsFilters(false);
                  setIsSyllabus(false);
                  setIsCoursePrice(false);
                  setIsProduct(false);
                  setisDropDown2(!isDropDown2);
                  setProceed1(false);
                  setProceed21(false);
                  setProceed31(false);
                }}
              >
                <button
                  className={`${
                    isAdditionaDetails ? "text-white" : "text-solid"
                  } text-lg `}
                >
                  Additional Description
                </button>
                <div className="flex-1"></div>

                <MdKeyboardArrowDown
                  className={`text-2xl ${isDropDown2 ? "hidden" : "flex"}`}
                />
                <MdKeyboardArrowUp
                  className={`text-2xl ${
                    isDropDown2 ? "flex text-white" : "hidden"
                  }`}
                />
              </div>
              {details && (
                <AdditionalDescription
                  proceedState1={[proceed21, setProceed21, setIsAdditionaDetails, setIsFilters]}
                  isFilters={isFilters}
                  setDetails={setDetails}
                  isAdditionaDetails={isAdditionaDetails}
                  //   setDetails={setDetails}
                />
              )}

              <div
                className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                  isFilters ? "bg-primary " : "bg-white"
                }`}
                onClick={() => {
                  setIsBasicDetails11(false);
                  setDetails(false);
                  setIsFilters(!isFilters);
                  // setIsSyllabus(false)
                  // setIsCoursePrice(false)
                  // setIsProduct(false)
                  setisDropDown3(!isDropDown3);
                  setProceed1(false);
                  setProceed21(false);
                  setProceed31(false);
                }}
              >
                <button
                  className={`${
                    isFilters ? "text-white" : "text-solid"
                  } text-lg `}
                >
                  Images and Videos
                </button>
                <div className="flex-1"></div>

                {isDropDown3 ? (
                  <MdKeyboardArrowUp className={`text-2xl `} />
                ) : (
                  <MdKeyboardArrowDown className={`text-2xl`} />
                )}
              </div>
            </div>

            {isFilters && (
              <Filters
                setIsFilters={setIsFilters}
                isFilters={isFilters}
                setIsSyllabus={setIsSyllabus}
                isSyllabus={isSyllabus}
                setPage2={setPage2}
                setPage1={setPage1}
                setTrack1={setTrack1}
                proceedState2={[proceed31, setProceed31]}
              />
            )}
          </div>
          {/* <div
            className="flex mt-5 justify-end"
            onClick={() => {
              setPage2(true);
              setPage1(false);
              setTrack1(true);
            }}
          >
            <button className="text-white bg-primary w-44 py-3 rounded-lg  ">
              Save and Continue
            </button>
          </div> */}
        </nav>
      )}

      {page2 && (
        <nav className={` lg:hidden font-dm-sans mb-10  px-5 py-4  z-50  `}>
          <div className="">
            <h1 className="text-2xl font-medium ">What’s in the course</h1>

            <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
              <div
                className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                  isSyllabus ? "bg-primary " : "bg-white"
                }`}
                onClick={() => {
                  setIsSyllabus(!isSyllabus);
                  setisDropDown4(!isDropDown4);
                  setisDropDown7(false);
                }}
              >
                <button
                  className={`${
                    isSyllabus ? "text-white " : "text-solid"
                  } text-lg `}
                >
                  Syallabus description
                </button>
                <div className="flex-1"></div>

                <MdKeyboardArrowDown
                  className={`text-2xl ${isDropDown4 ? "hidden" : "flex"}`}
                />
                <MdKeyboardArrowUp
                  className={`text-2xl ${
                    isDropDown4 ? "flex text-white" : "hidden"
                  }`}
                />
              </div>

              {isSyllabus && (
                <SyllabusDescription
                  proceedState3={[proceed41, setProceed41]}
                  setPage3={setPage3}
                  setPage2={setPage2}
                  setPage1={setPage1}
                  setTrack2={setTrack2}
                  setIsCoursePrice={setIsCoursePrice}
                  isCoursePrice={isCoursePrice}
                  setIsSyllabus={setIsSyllabus}
                />
              )}
            </div>
          </div>

          {/* <div
            className="flex mt-5 justify-end"
            onClick={() => {
              setPage3(true);
              setPage2(false);
              setPage1(false);
              setTrack2(true);
            }}
          >
            <button className="text-white bg-primary w-44 py-3 rounded-lg  ">
              Save and Continue
            </button>
          </div> */}
        </nav>
      )}

      {page3 && (
        <nav className={` lg:hidden font-dm-sans mb-10  px-5 py-4  z-50  `}>
          <div className="">
            <h1 className="text-2xl font-medium ">Payment</h1>

            <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
              <div
                className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                  isCoursePrice ? "bg-primary " : "bg-white"
                }`}
                onClick={() => {
                  setIsCoursePrice(!isCoursePrice);
                  setIsProduct(false);
                  setisDropDown5(!isDropDown5);
                }}
              >
                <button
                  className={`${
                    isCoursePrice ? "text-white " : "text-solid"
                  } text-lg `}
                >
                  Set a course price
                </button>
                <div className="flex-1"></div>

                <MdKeyboardArrowDown
                  className={`text-2xl ${isDropDown5 ? "hidden" : "flex"}`}
                />
                <MdKeyboardArrowUp
                  className={`text-2xl ${
                    isDropDown5 ? "flex text-white" : "hidden"
                  }`}
                />
              </div>
              {isCoursePrice && (
                <CoursePrice
                  setIsCoursePrice={setIsCoursePrice}
                  // setIsProduct={setIsProduct}
                  // isProduct={isProduct}
                  proceedState4={[proceed51, setProceed51]}
                  setHandleButton={setHandleButton}
                />
              )}

              {/* <div
                className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                  isProduct ? "bg-primary " : "bg-white"
                }`}
                onClick={() => {
                  setIsCoursePrice(false);
                  setIsProduct(!isProduct);
                  setisDropDown6(!isDropDown6);
                }}
              >
                <button
                  className={`${
                    isProduct ? "text-white " : "text-solid"
                  } text-lg `}
                >
                  Production Support
                </button>
                <div className="flex-1"></div>

                <MdKeyboardArrowDown
                  className={`text-2xl ${isDropDown6 ? "hidden" : "flex"}`}
                />
                <MdKeyboardArrowUp
                  className={`text-2xl ${
                    isDropDown6 ? "flex text-white" : "hidden"
                  }`}
                />
              </div>
              {isProduct && (
                <ProductionSupport
                  submitTrueState={[isSubmitTrue, setIsSubmitTrue]}
                />
              )} */}

              <div className="bg-primary w-48 my-10 px-3 py-3 rounded-lg ">
                <button
                  disabled={!handleButton && "disabled"}
                  className="m-auto w-full text-lg font-bold z-50 text-white"
                  onClick={handleSend}
                >
                  Submit for Review
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default AddCourseMobile;
