import React, { useState, useEffect } from 'react'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md'
import activeTabContext from '../../../../ActiveTabContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCourseSelector,
  clearAddCourseState,
  setBoards,
  setClasses,
  setExams,
  setSubCategories,
  setSubjects,
} from '../../../../../redux/slices/AddCourseSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import AddCourseDesktop from './AddCourseDesktop'
import AddCourseMobile from './AddCourseMobile'
import AddCourseDesktopComponents from './AddCourseDesktopComponents'
import { useRouter } from 'next/router'
import {
  ACCESS_TOKEN,
  host,
  INSTITUTE_ID,
  OWNER_ID,
} from '../../../../../utils/constant'

export const ActiveTabState = (props) => {
  const s1 = {
    name: 'preetham',
    class: '3rd',
  }
  const [hover, setHover] = useState(s1)

  return (
    <activeTabContext.Provider value={hover}>
      {props.children}
    </activeTabContext.Provider>
  )
}

const AddCourse = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    basicDetails,
    additionalDescription,
    coursePrice,
    coursePriceDetails,
    selectedImages,
    selectedVideos,
    syllabusDescription,
    thumbnails,
  } = useSelector(addCourseSelector)

  const [proceed1, setProceed1] = useState(false)
  const [proceed2, setProceed2] = useState(false)
  const [proceed3, setProceed3] = useState(false)
  const [proceed4, setProceed4] = useState(false)
  const [proceed5, setProceed5] = useState(false)
  const [proceed6, setProceed6] = useState(false)
  const [proceed11, setProceed11] = useState(false)
  const [proceed21, setProceed21] = useState(false)
  const [proceed31, setProceed31] = useState(false)
  const [proceed41, setProceed41] = useState(false)
  const [proceed51, setProceed51] = useState(false)
  const [proceed61, setProceed61] = useState(false)
  const [isBasicDetails, setIsBasicDetails] = useState(true)
  const [isBasicDetails11, setIsBasicDetails11] = useState(false)
  const [isAdditionaDetails, setIsAdditionaDetails] = useState(false)
  const [isFilters, setIsFilters] = useState(false)
  const [isSyllabus, setIsSyllabus] = useState(false)
  const [isCoursePrice, setIsCoursePrice] = useState(false)
  const [isProduct, setIsProduct] = useState(false)
  const [isSubmitTrue, setIsSubmitTrue] = useState(false)

  const [page1, setPage1] = useState(true)
  const [page2, setPage2] = useState(false)
  const [page3, setPage3] = useState(false)

  const [track1, setTrack1] = useState(false)
  const [track2, setTrack2] = useState(false)
  const { categorySelected } = useSelector(addCourseSelector)

  const [isDropDown1, setisDropDown1] = useState(false)
  const [isDropDown2, setisDropDown2] = useState(false)
  const [isDropDown3, setisDropDown3] = useState(false)
  const [isDropDown4, setisDropDown4] = useState(false)
  const [isDropDown5, setisDropDown5] = useState(false)
  const [isDropDown6, setisDropDown6] = useState(false)
  const [isDropDown7, setisDropDown7] = useState(false)
  const [d, setD] = useState(true)

  const { classes, subjects, boards, exams, subCategories } =
    useSelector(addCourseSelector)

  const [buttonDisable, setButtonDisable] = useState(false)

  useEffect(() => {
    if (proceed1) {
      setIsAdditionaDetails(true)
      setIsBasicDetails(false)
    }
    if (proceed2) {
      setIsAdditionaDetails(false)
      setIsFilters(true)
    }

    if (proceed3) {
      setIsSyllabus(true)
      setIsFilters(false)
    }
    if (proceed4) {
      setIsSyllabus(false)
      setIsCoursePrice(true)
    }
    if (proceed5) {
      setIsProduct(true)
      setIsCoursePrice(false)
    }
  }, [proceed1, proceed2, proceed3, proceed4, proceed6, proceed5])

  useEffect(() => {
    dispatch(clearAddCourseState())
  }, [dispatch])

  const handleSend = async (e) => {
    const uploading = toast.loading('Uploading data , please wait...')
    setButtonDisable(true)
    const videos = selectedVideos
    let images = selectedImages
    toast.remove(uploading)
    const sending = toast.loading('Sending data , please wait...')
    const data = {
      instituteid: INSTITUTE_ID,
      name: basicDetails.courseName,
      description: basicDetails.courseDescription,
      classtype:
        basicDetails.courseMode === 'Hybrid'
          ? 1
          : basicDetails.courseMode === 'Online'
          ? 2
          : 3,
      duration: basicDetails.courseDuration,
      category: basicDetails.category,
      syllabus: syllabusDescription,
      faculties: additionalDescription.faculty,
      grossprice: coursePrice.grossPriceValue,
      discountprice: coursePrice.discPriceValue,
      minimumprice: coursePrice.minimumPriceValue,
      effectiveprice: coursePrice.effectivePriceValue,
      emi: coursePrice.emiPriceValue,
      shortdescription: additionalDescription.shortDescription,
      pricingdetails:coursePriceDetails,
      coursetype: basicDetails?.courseType,
      images,
      videos,
      couponid: coursePrice.coupon,
    }
    

    try {
      await axios.post(`${host}/course`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })

      toast.success('Course is added !')
      setIsSubmitTrue(true)
      dispatch(clearAddCourseState())
      setProceed1(false)
      setProceed2(false)
      setProceed3(false)
      setProceed4(false)
      setProceed5(false)
      setProceed6(false)
      router.push('/merchant/dashboard/courses')
    } catch (err) {
      toast.error(err.message)
      
    } finally {
      toast.remove(sending)
      setButtonDisable(false)
    }
  }

  useEffect(() => {
    dispatch(setBoards([]))
    dispatch(setSubCategories([]))
    dispatch(setExams([]))
    dispatch(setSubjects([]))
    dispatch(setClasses([]))
  }, [dispatch])

  useEffect(() => {
    if (OWNER_ID === null) router.push('/merchant/login')
    else if (INSTITUTE_ID === null) router.push('/merchant/details')
  }, [dispatch, router])

  return (
    <>
      <div style={{ background: ' #FAFAFB' }}>
        <div className='header'>
          <header className='flex items-center bg-white h-16  lg:px-10'>
            <button
              className='flex font-medium items-center px-2 lg:px-0 space-x-1 lg:space-x-2'
              onClick={() => {
                router.back()
                dispatch(clearAddCourseState())
              }}
            >
              <MdKeyboardArrowLeft />
              <p className=''> Back to courses</p>
            </button>

            <div className='flex-1'></div>

            <div className='border-2  px-3 rounded-md mr-10 border-primary'>
              <button className='text-primary'>Save as draft</button>
            </div>
          </header>

          <div>
            <div className=' grid grid-cols-12 gap-2 '>
              <div className=' col-span-12 lg:col-span-4'>
                {/* Add course sidebar design  For Desktop */}

                <AddCourseDesktop
                  data={[
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
                  ]}
                />

                {/* Add course side bar design fro mobile view */}

                <AddCourseMobile
                  data={[
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
                  ]}
                />
              </div>

              <AddCourseDesktopComponents
                data={[
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
                  setProceed6,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCourse
