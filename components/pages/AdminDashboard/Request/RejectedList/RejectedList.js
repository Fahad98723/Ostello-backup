import React, { useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import Loader from '../../../../Loader'
import CourseRejectedList from './CourseRejectedList'
import InstituteRejectedList from './InstituteRejectedList'

const RejectedList = () => {
  const [showCourses, setShowCourses] = useState(true)
  const [showInstitutes, setShowInstitutes] = useState(true)
  const { loading, adminInstitutes } = useSelector(
    (state) => state.adminInstitutes
  )

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col'>
          <div>
            <div className='flex items-center gap-x-3'>
              <h5 className='text-[24px] ml-3 md:ml-0 font-medium text-[#414141]'>
                Institutes
              </h5>{' '}
              {showInstitutes ? (
                <TiArrowSortedUp
                  onClick={() => setShowInstitutes(false)}
                  className='rounded-full bg-white p-1 cursor-pointer text-2xl drop-shadow-lg text-[#323232]'
                />
              ) : (
                <TiArrowSortedDown
                  onClick={() => setShowInstitutes(true)}
                  className='rounded-full bg-white p-1 cursor-pointer text-2xl drop-shadow-lg text-[#323232]'
                />
              )}
            </div>
            {showInstitutes && <InstituteRejectedList />}
          </div>
          <div className='mt-8'>
            <div className='flex items-center gap-x-3'>
              <h5 className='text-[24px] ml-3 md:ml-0 font-medium text-[#414141]'>
                Courses
              </h5>{' '}
              {showCourses ? (
                <TiArrowSortedUp
                  onClick={() => setShowCourses(false)}
                  className='rounded-full bg-white p-1 cursor-pointer text-2xl drop-shadow-lg text-[#323232]'
                />
              ) : (
                <TiArrowSortedDown
                  onClick={() => setShowCourses(true)}
                  className='rounded-full bg-white p-1 cursor-pointer text-2xl drop-shadow-lg text-[#323232]'
                />
              )}
            </div>
            {showCourses && <CourseRejectedList />}
          </div>
        </div>
      )}
    </>
  )
}

export default RejectedList
