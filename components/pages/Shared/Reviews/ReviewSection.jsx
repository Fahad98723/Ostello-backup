import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import Carousel from 'react-elastic-carousel'
import { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Modal from '../../../UI/Modal/Modal'
import ShareReview from './ShareReview'
import axios from 'axios'
import { host } from '../../../../utils/constant'

export default function ReviewSection() {
  const { currentInstitute = {} } = useSelector((state) => state.institute)
  const [reviews , setReviews] = useState([])

  useEffect(() => {
   const run = async() => {
    if(currentInstitute.id){
      try {
        const res = await axios.get(
          `${host}/review?instituteId=${currentInstitute.id}&nolimit=true`
        );
        setReviews(res?.data?.message)
      } catch (err) {
        
      }
    }
   }

   run()
  }, [currentInstitute.id]);
  let item_limit = 8

  const [pageData, setPageData] = useState([])
  const [page, setPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false)
  let item_remaining = reviews?.length - pageData?.length || 0

  useEffect(() => {
    if (reviews?.length > 0) {
      let filtered = reviews
        .slice()
        .reverse()
        .slice(0, item_limit * page)
      setPageData(filtered)
    }
  }, [reviews, page, item_limit])

  return (
   <>
    <div>
      <div className=' md:grid grid-cols-1 gap-4  place-items-center  mt-5'>
        <div className='flex-grow w-full border-b border-[#D0D5DD]'></div>
        {pageData?.map((item) => (
          <ReviewCard key={item?.id} {...item} />
        ))}

        <>
          <div  onClick={() => {
                if (item_remaining > 0) {
                  setPage((prv) => prv + 1)
                } else {
                  if (page > 1) {
                    setPage((prv) => prv - 1)
                  }
                }
              }} className='py-6 px-10 bg-white shadow-lg rounded flex justify-between items-center w-full'>
            <p
             
              className='font-bold hover:underline cursor-pointer text-primary'
            >
              {item_remaining > 0
                ? ` More ${item_remaining} reviews`
                : `Show less `}
            </p>
            <PlusOutlined className=' cursor-pointer' />
          </div>
        </>
      </div>
      
      
    </div>
    {/* <div className='md:hidden py-5 '>
    <Carousel
      renderPagination={({ pages, activePage, onClick }) => {
        return (
          <div className='flex   mt-2'>
            {pages.map((page) => {
              // return (
              //   <div
              //     className={`cursor-pointer h-2 rounded-lg transition-all duration-500 ease-in-out ${
              //       activePage === page
              //         ? 'bg-primary w-28 '
              //         : 'bg-gray/20 w-6'
              //     }`}
              //     key={page}
              //     onClick={() => onClick(page)}
              //   />
              // )
            })}
          </div>
        )
      }}
      itemsToShow={1}
      className=''
      showArrows={false}
    >
      {reviews?.map((item) => (
        <ReviewCard key={item?.id} {...item} />
      ))}
    </Carousel>
  </div> */}
   </>
  )
}
