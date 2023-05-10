import React, { useEffect } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import Data from './data'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAdminInstitutes,
  fetchAdminSingleInstitute,
} from '../../../../redux/slices/adminInstitutesSlice'
import { selectSearch, setLocationQuery } from '../../../../redux/slices/SearchSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SingleDesktop = ({ className }) => {
  const { adminInstitutes, isDeleted } = useSelector(
    (state) => state.adminInstitutes
  )
  const {locationQuery} = useSelector(selectSearch)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAdminInstitutes())
  }, [dispatch])

  // 

  // adminInstitutes.forEach(element => {
  //   
  // });
  const router = useRouter()
  return (
    <div
        className={`main mx-auto w-10/12 flex justify-center items-center z-20 flex-wrap ${className}`}
    >
        <>
            {Data.map((d) => (
                <div
                onClick={() => {
                  dispatch(setLocationQuery(d.title))
                  locationQuery !== "" && router.push(`/search/${d.title.replace(/\s/g, '')}`)
                }}
                    key={d.id}
                    className="font-dm-sans single text-black bg-white flex items-center justify-between rounded-xl px-4 py-5 mb-2 mx-8 cursor-pointer"
                >
                    <div className="w-64 whitespace-nowrap overflow-ellipsis overflow-hidden text-light-black text-md xl:text-lg">
                        {d.title}
                    </div>
                    <span>
                        <BsChevronRight />
                    </span>
                </div>
            ))}
        </>
    </div>
);
};

export default SingleDesktop
