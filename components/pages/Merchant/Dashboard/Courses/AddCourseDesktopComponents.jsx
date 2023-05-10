import React, { useState } from "react";
import { BasicDetails } from "./CourseAdding/BasicDetails";
import AdditionalDescription from "./CourseAdding/AdditionalDescription";
import Filters from "./CourseAdding/Filters";
import CoursePrice from "./CourseAdding/CoursePrice";
import ProductionSupport from "./CourseAdding/ProductionSupport";
import SyllabusDescription from "./CourseAdding/SyllabusDescription";

const AddCourseDesktopComponents = ({ data }) => {
  const [
    setIsAdditionaDetails,
    setIsFilters,
    proceed1,
    setProceed1,
    isBasicDetails,
    isAdditionaDetails,
    isFilters,
    isSyllabus,
    isProduct,
    isCoursePrice,
    d,
    proceed2,
    setProceed2,
    proceed3,
    setProceed3,
    setIsSyllabus,
    proceed4,
    setProceed4,
    isSubmitTrue,
    setIsSubmitTrue,
    proceed5,
    setProceed5,
    setIsCoursePrice,
    proceed6,
    setIsProduct,
    setProceed6,
  ] = data;

  const [handleButton, setHandleButton] = useState(false);
  const [details, setDetails] = useState(false);
  
  return (
    <div className=" lg:block hidden col-span-12 lg:col-span-8  ">
      {isBasicDetails && (
        <BasicDetails
          setDetails={setDetails}
          proceedState={[proceed1, setProceed1]}
        />
      )}
      {isAdditionaDetails && (
        <AdditionalDescription
          setDetails={setDetails}
          proceedState1={[
            proceed2,
            setProceed2,
            setIsAdditionaDetails,
            setIsFilters,
          ]}
        />
      )}
      {isFilters && <Filters proceedState2={[proceed3, setProceed3]} />}

      {isSyllabus && (
        <SyllabusDescription
          proceedState3={[proceed4, setProceed4]}
          setIsCoursePrice={setIsCoursePrice}
          isCoursePrice={isCoursePrice}
          setIsSyllabus={setIsSyllabus}
        />
      )}

      {isCoursePrice &&
        !isFilters &&
        !isBasicDetails &&
        !isAdditionaDetails &&
        !isSyllabus && (
          <CoursePrice
            setIsCoursePrice={setIsCoursePrice}
            proceedState4={[proceed5, setProceed5]}
            setHandleButton={setHandleButton}
            // setIsProduct={setIsProduct}
          />
        )}
      {/* {isProduct && (
                  <ProductionSupport
                    submitTrueState={[isSubmitTrue, setIsSubmitTrue]}
                  />
                )} */}
    </div>
  );
};

export default AddCourseDesktopComponents;
