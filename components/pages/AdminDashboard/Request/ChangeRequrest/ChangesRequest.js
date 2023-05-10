import React, { useEffect, useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

import ChangeCourses from './ChangeCourses/ChangeCourses'
import ChangeInstitutes from './ChangeInstitutes/ChangeInstitutes'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../Loader'
import { clearAddCourseState } from '../../../../../redux/slices/AddCourseSlice'

const ChangesRequest = () => {
  const [showCourses, setShowCourses] = useState(true)
  const [showInstitutes, setShowInstitutes] = useState(true)
  const { loadingData } = useSelector((state) => state.adminInstitutes)

  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAddCourseState())
  }, [dispatch])

  return (
    <>
      {/* {loadingData ? (
        <Loader />
      ) : ( */}
        <div className='flex flex-col'>
          <div>
            <div className='flex items-center space-x-3'>
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
            {showInstitutes && <ChangeInstitutes />}
          </div>
          <div className='mt-8'>
            <div className='flex items-center space-x-3'>
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
            {showCourses && <ChangeCourses />}
          </div>
        </div>
      {/* )} */}
    </>
  )
}

export default ChangesRequest
