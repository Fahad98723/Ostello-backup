import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillCircleFill } from 'react-icons/bs'
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { HybridIcon } from '../../../SVGIcons'
import { fetchAdminCourses } from '../../../../redux/slices/adminCourseSlice'
import Loader from '../../../Loader'

const allData = [
  {
    title: 'Course Name Here',
    location: 'Location here',
    price: 500,
  },
  {
    title: 'Course Name Here',
    location: 'Location here',
    price: 500,
  },
  {
    title: 'Course Name Here',
    location: 'Location here',
    price: 500,
  },
  {
    title: 'Course Name Here',
    location: 'Location here',
    price: 500,
  },
  {
    title: 'Course Name Here',
    location: 'Location here',
    price: 500,
  },
]

const TopCourses = () => {
  const [open, setOpen] = useState(null)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const { loading, adminCourses, isUpdated } = useSelector(
    (state) => state.adminCourses
  )

  useEffect(() => {
    dispatch(fetchAdminCourses())
  }, [dispatch, isUpdated])

  

  const showCourse = (index) => {
    if (open === index) {
      if (!show) {
        setShow(true)
      } else {
        setShow(false)
      }
      return
    }
    setOpen(index)
    setShow(true)
  }

  const reviewClassHandler = (item) => {
    let classes =
      "rating flex xl:space-x-2 justify-between items-center  px-2 py-1  md:text-xl text-sm rounded-md font-bold ";
      if (item === 0) {
        classes += "text-white bg-[#FF3044]";
    } else if (item === 1) {
      classes += "text-white bg-deep_red";
    } else if (item <= 2) {
      classes += " bg-light_red border-light_red";
      if (item < 2) {
        classes += " text-light_red";
      } else {
        classes += " text-white";
      }
    } else if (item <= 3) {
      if (item < 3) {
        classes += " text-light_yellow";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_yellow border-light_yellow";
    } else if (item <= 4) {
      if (item < 4) {
        classes += " text-light_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_green border-light_green";
    } else if (item <= 5) {
      if (item < 5) {
        classes += " text-deep_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-deep_green border-deep_green";
    } else {
      return classes;
    }
    return classes;
  };

  return (
    <div className='bg-white p-5 md:w-8/12 w-full rounded-lg'>
      <div>
        <h4 className='capitalize font-bold text-[21px]'>Top Courses</h4>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {adminCourses.length ? (
            <div className='space-y-2 pt-3'>
              <div className='md:block hidden'>
                <div className='text-[#CBCBCB] flex font-medium lg:gap-x-[7.5rem] justify-end'>
                  <div></div>
                  <div>Reviews</div>
                  <div>Price</div>
                  <div>Type</div>
                </div>
              </div>
              {adminCourses
                .slice()
                .sort((a, b) => b.rating - a.rating)
                .map((data, index) => (
                  <div
                    key={index}
                    className={`  
          ${adminCourses.length - 1 !== index && 'border-b border-light-gray'}
          flex items-center justify-between flex-col md:flex-row gap-x-2 pb-2`}
                  >
                    <div className='flex items-start justify-between md:w-2/5 w-full gap-x-2 md:pb-2'>
                      <div className='space-y-0.5'>
                        <p className='capitalize text-[16px] font-semibold'>
                          {data.name}
                        </p>
                        <p className='text-[#6B7280] text-[14px]'>
                          {data.institute.locations[0].city},{' '}
                          {data.institute.locations[0].state}
                        </p>
                      </div>
                      <div className='md:hidden block'>
                        <div onClick={() => showCourse(index)}>
                          {open === index && show ? (
                            <MdOutlineKeyboardArrowDown className='text-[2rem] cursor-pointer text-[#414141] ' />
                          ) : (
                            <MdKeyboardArrowRight className='text-[2rem] cursor-pointer text-[#414141] ' />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='md:flex hidden justify-between w-full md:w-3/5'>
                      <div>
                        <div className='text-[#CBCBCB] md:hidden text-[14px] flex font-medium justify-end'>
                          Reviews
                        </div>
                        <div className={` ${reviewClassHandler(data.rating)} flex bg-[#FFD130] px-2 justify-center text-white font-bold rounded-lg  items-center`}>
                          {data.rating}
                          <AiFillStar className='ml-1' />
                        </div>
                      </div>
                      <div>
                        <div className='text-[#CBCBCB] md:hidden text-[14px] flex font-medium justify-end'>
                          Price
                        </div>
                        <div className='font-medium'>
                          Rs. {data.minimumprice}
                        </div>
                      </div>
                      <div>
                        <div className='text-[#CBCBCB] md:hidden text-[14px] flex font-medium justify-end'>
                          Type
                        </div>
                        <div className='flex  md:mt-1 mb-2 mt-[-4px] items-center'>
                          {data.classtype === 1 ? (
                            <HybridIcon />
                          ) : (
                            <BsFillCircleFill
                              className={`text-[6px] ${
                                data.classtype === 2
                                  ? 'text-[#3AC817]'
                                  : 'text-[#FF0000]-600'
                              }`}
                            />
                          )}
                          <span className='ml-2 capitalize text-[#414141]'>
                            {data.classtype === 1
                              ? 'Hybrid'
                              : data.classtype === 2
                              ? 'Online'
                              : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {open === index && show && (
                      <div className='flex justify-between w-full md:w-3/5'>
                        <div className='py-3'>
                          <div className='text-[#CBCBCB] pb-1 md:hidden text-[14px] flex font-medium justify-end'>
                            Reviews
                          </div>
                          <div className='flex bg-[#FFD130] px-2 justify-center text-white font-bold rounded-lg  items-center'>
                            {data.rating}
                            <AiFillStar className='ml-1' />
                          </div>
                        </div>
                        <div className='py-3'>
                          <div className='text-[#CBCBCB] pb-1 md:hidden text-[14px] flex font-medium justify-end'>
                            Price
                          </div>
                          <div className='font-medium'>Rs. {data.price}</div>
                        </div>
                        <div className='py-3'>
                          <div className='text-[#CBCBCB] pb-1 md:hidden text-[14px] flex font-medium justify-end'>
                            Type
                          </div>
                          <div className='flex items-center'>
                            {data.mode === 1 ? (
                              <HybridIcon />
                            ) : (
                              <BsFillCircleFill
                                className={`text-[6px] ${
                                  data.mode === 2
                                    ? 'text-[#3AC817]'
                                    : 'text-[#FF0000]-600'
                                }`}
                              />
                            )}
                            <span className='ml-2 capitalize text-[#414141]'>
                              {data.mode === 1
                                ? 'Hybrid'
                                : data.mode === 2
                                ? 'Online'
                                : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className='py-8 font-medium flex justify-center'>
              No top courses are available now
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TopCourses
