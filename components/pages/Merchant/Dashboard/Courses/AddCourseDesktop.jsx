import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { addCourseSelector } from '../../../../../redux/slices/AddCourseSlice'

const AddCourseDesktop = ({ data }) => {
  const [
    setIsBasicDetails,
    setIsAdditionaDetails,
    setIsSyllabus,
    setIsCoursePrice,
    setIsProduct,
    setIsFilters,
    isBasicDetails,
    proceed1,
    proceed2,
    proceed3,
    proceed4,
    proceed5,
    proceed6,
    isAdditionaDetails,
    handleSend,
    buttonDisable,
    isProduct,
    isCoursePrice,
    isSyllabus,
    isFilters,
    setProceed1,
    setProceed2,
    setProceed3,
    setD,
  ] = data

  const {
    basicDetails,
    additionalDescription,
    coursePrice,
    selectedImages,
    selectedVideos,
    syllabusDescription,
    thumbnails,
  } = useSelector(addCourseSelector)

  const [basicFinished, setBasicFinished] = useState(false)
  const [descFinished, setDescFinished] = useState(false)
  const [mediaFinished, setMediaFinished] = useState(false)

  useEffect(() => {
    if (basicDetails.courseName) {
      setBasicFinished(true)
    }
    if (additionalDescription.faculty) {
      setDescFinished(true)
    }
    if (selectedImages.length && selectedVideos.length) {
      setMediaFinished(true)
    }
  }, [
    basicDetails.courseName,
    additionalDescription.faculty,
    selectedImages.length,
    selectedVideos.length,
  ])

  return (
    <div className='hidden   lg:flex gap-5'>
      <nav
        className={`hidden lg:inline font-dm-sans mt-4 mb-10 lg:mb-20 px-10 py-4 lg:bg-[#F9F9F9] h-max z-40  `}
      >
        <div className=''>
          <h1 className='text-2xl font-medium '>Profile Section</h1>

          <div className='bg-white my-7 mx-2 mb-10 px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72'>
            <div className='flex items-center gap-2 w-full'>
              {' '}
              <button
                className={`${
                  isBasicDetails ? 'text-primary' : 'text-solid'
                } text-lg `}
                onClick={(e) => {
                  setIsBasicDetails(true)
                  setIsAdditionaDetails(false)
                  setIsFilters(false)
                  setIsSyllabus(false)
                  setIsCoursePrice(false)
                  setIsProduct(false)
                  setProceed1(false)
                  setProceed2(false)
                  setProceed3(false)
                }}
              >
                Basic Details
              </button>
              {basicFinished && (
                <BsCheck
                  className='w-7 h-7 ml-auto text-[#0D9F1C] rounded-full'
                  style={{ background: 'rgba(13, 159, 28, 0.25)' }}
                />
              )}
            </div>
            <div className='flex items-center gap-2 w-full'>
              <button
                className={`${
                  isAdditionaDetails ? 'text-primary' : 'text-solid'
                } text-lg `}
                onClick={() => {
                  setIsBasicDetails(false)
                  setIsCoursePrice(false)
                  setIsAdditionaDetails(true)
                  setIsFilters(false)
                  setIsSyllabus(false)
                  setProceed1(false)
                  setProceed2(false)
                  setProceed3(false)
                  setIsProduct(false)
                  setD(false)
                }}
              >
                Additional Description
              </button>

              {descFinished && (
                <BsCheck
                  className='w-7 h-7 ml-auto text-[#0D9F1C] rounded-full'
                  style={{ background: 'rgba(13, 159, 28, 0.25)' }}
                />
              )}
            </div>
            <div className='flex items-center gap-2 w-full'>
              <button
                className={`${
                  isFilters ? 'text-primary' : 'text-solid'
                } text-lg `}
                onClick={() => {
                  setIsBasicDetails(false)
                  setIsAdditionaDetails(false)
                  setIsCoursePrice(false)
                  setIsFilters(true)
                  setIsSyllabus(false)
                  setProceed1(false)
                  setProceed2(false)
                  setProceed3(false)
                  setIsProduct(false)
                }}
              >
                Images & Videos
              </button>
              {mediaFinished && (
                <BsCheck
                  className='w-7 h-7 ml-auto text-[#0D9F1C] rounded-full'
                  style={{ background: 'rgba(13, 159, 28, 0.25)' }}
                />
              )}
            </div>
          </div>

          <h1 className='text-2xl font-medium '>What’s in the course</h1>

          <div className='bg-white my-7 mx-2 mb-10 px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72'>
            <div className='flex items-center gap-2 w-full'>
              <button
                className={`${
                  isSyllabus ? 'text-primary' : 'text-solid'
                } text-lg `}
                onClick={() => {
                  setIsBasicDetails(false)
                  setIsAdditionaDetails(false)
                  setIsFilters(false)

                  setIsCoursePrice(!isCoursePrice)
                  setIsSyllabus(true)
                  setIsProduct(false)
                }}
              >
                Syllabus description
              </button>
              {proceed4 && (
                <BsCheck
                  className='w-7 h-7 ml-auto text-[#0D9F1C] rounded-full'
                  style={{ background: 'rgba(13, 159, 28, 0.25)' }}
                />
              )}
            </div>

            {/* <div className="flex items-center gap-2 w-full">
              <button
                className={`${isFaqs ? "text-primary" : "text-solid"} text-lg `}
                onClick={() => {
                  setIsBasicDetails(false);
                  setIsAdditionaDetails(false);
                  setIsFilters(false);
                  setIsSyllabus(false);
                  setIsFaqs(true);
                  setIsCoursePrice(false);
                  setIsProduct(false);
                }}
              >
                FAQs
              </button>
              {proceed6 && (
                <BsCheck
                  className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                  style={{ background: "rgba(13, 159, 28, 0.25)" }}
                />
              )}
            </div> */}
          </div>

          <h1 className='text-2xl font-medium '>Payment</h1>

          <div className='bg-white my-7 mx-2  px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72'>
            <div className='flex items-center gap-2 w-full'>
              <button
                className={`${
                  isCoursePrice ? 'text-primary' : 'text-solid'
                } text-lg `}
                onClick={() => {
                  setIsBasicDetails(false)
                  setIsAdditionaDetails(false)
                  setIsFilters(false)
                  setIsSyllabus(false)

                  setIsCoursePrice(true)
                  setIsProduct(false)
                }}
              >
                Course Price & Coupons
              </button>
              {proceed5 && (
                <BsCheck
                  className='w-7 h-7 ml-auto text-[#0D9F1C] rounded-full'
                  style={{ background: 'rgba(13, 159, 28, 0.25)' }}
                />
              )}
            </div>

            {/* <button
              className={`${isProduct ? "text-primary" : "text-solid"} text-lg `}
              onClick={() => {
                setIsBasicDetails(false);
                setIsAdditionaDetails(false);
                setIsFilters(false);
                setIsSyllabus(false);

                setIsCoursePrice(false);
                setIsProduct(true);
              }}
            >
              Production Support
            </button> */}
          </div>
        </div>

        <div className='bg-primary w-48 my-10 px-3 py-3 rounded-lg '>
          <button
            disabled={buttonDisable}
            className='m-auto w-full text-lg font-bold z-50 text-white'
            onClick={handleSend}
          >
            Submit for Review
          </button>
        </div>
      </nav>
    </div>
  )
}

export default AddCourseDesktop
