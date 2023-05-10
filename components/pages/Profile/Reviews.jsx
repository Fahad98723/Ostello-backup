import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'

import image from '../../../assets/merchantDashboard/Accountancy/defaultbg.png'
import CourseReviews from './CourseReviews'
import InstituteReviews from './InstituteReviews'
import logo from '../../../assets/merchantDashboard/Accountancy/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, getUser } from '../../../redux/slices/authSlice'

const api = [
  {
    id: 1,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'institute',
    upVoted: 20,
  },
  {
    id: 2,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'course',
    upVoted: 20,
  },
  {
    id: 3,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'institute',
    upVoted: 20,
  },
  {
    id: 4,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'course',
    upVoted: 20,
  },
  {
    id: 5,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'institute',
    upVoted: 20,
  },
  {
    id: 6,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'course',
    upVoted: 20,
  },
  {
    id: 7,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'institute',
    upVoted: 20,
  },
  {
    id: 8,
    src: image.src,
    name: 'XYZ Design Academy ',
    location: 'Saket, New Delhi',
    ratings: '2',
    date: 'February, 2022',
    reviews:
      "This course is definitely above expectations so far. I didn't expect to get so much insight into the communication between UX Designer.",
    type: 'course',
    upVoted: 20,
  },
]
const Reviews = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('Institute Reviews')
  const [dropDown, setDropDown] = useState(false)
  const router = useRouter()
  const { userData } = useSelector(authSelector)
  
  const userLogin = useSelector((state) => state.auth.isAuthenticated)
  useEffect(() => {
    if (!userLogin) return router.push('/')
  }, [userLogin, router])

  useEffect(() => {
    dispatch(getUser())
  }, [])

  

  return (
    <div>
      <div className='heading my-2 px-5 pt-5 md:max-w-[1000px]'>
        <p className='text-2xl font-bold lg:block hidden '>Reviews</p>
      </div>
      <div className=' '>
        {/* Top Nav Tabs for Desktop  */}
        {/* 
        <div className=' flex  justify-between'>
          <div className='flex flex-col lg:flex-row w-full items-end lg:items-center lg:gap-10 text-base '>
            <div
              className={`${
                activeTab === 'Institute Reviews'
                  ? 'bg-ghost/10 text-primary'
                  : 'bg-white text-black'
              }  hidden lg:inline-block w-full cursor-pointer  rounded-t-lg py-2 text-center`}
              onClick={() => {
                setActiveTab('Institute Reviews')
              }}
            >
              <p className={`font-medium text-2xl`}>Institute Reviews</p>
            </div>

            <div
              className={`${
                activeTab === 'Course Reviews'
                  ? 'bg-ghost/10 text-primary'
                  : 'bg-white text-black'
              }    hidden lg:inline-block w-full cursor-pointer rounded-t-lg py-2 text-center`}
              onClick={() => {
                setActiveTab('Course Reviews')
              }}
            >
              <p className='font-medium text-2xl'>Course Reviews</p>
            </div>


          </div>
        </div> */}

        <div className='flex justify-between items-center px-5'>
          <div className='heading mb-5 block lg:hidden '>
            <h1 className='text-2xl font-bold '>Reviews</h1>
          </div>

          <div className='relative '>
            <div
              className='flex lg:hidden  justify-center items-center space-x-2 p-3 text-primary bg-white  '
              onClick={() => {
                setDropDown(!dropDown)
              }}
            >
              <p className='text-center'>{activeTab}</p>
              {dropDown ? (
                <MdOutlineKeyboardArrowUp className='text-2xl' />
              ) : (
                <MdOutlineKeyboardArrowDown className='text-2xl' />
              )}
            </div>
            <div className=''>
              {dropDown && (
                <div
                  className='lg:hidden absolute z-10 right-0 top-15 bg-white px-5 py-3'
                  onClick={() => {
                    setDropDown(!dropDown)
                  }}
                >
                  <div
                    className={` cursor-pointer ${
                      activeTab === 'Institute Reviews' ? 'text-primary' : ''
                    } lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab('Institute Reviews')
                    }}
                  >
                    Institute Reviews
                  </div>

                  <div
                    className={`cursor-pointer ${
                      activeTab === 'Course Reviews' ? 'text-primary' : ''
                    }  lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab('Course Reviews')
                    }}
                  >
                    Course Reviews
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CourseReviews />

        {/* <div className='bg-ghost/10 rounded-b-2xl'>
          {activeTab === 'Institute Reviews' && <InstituteReviews api={api} />}
          {activeTab === 'Course Reviews' && <CourseReviews api={api} />}
        </div> */}
      </div>
    </div>
  )
}

export default Reviews
