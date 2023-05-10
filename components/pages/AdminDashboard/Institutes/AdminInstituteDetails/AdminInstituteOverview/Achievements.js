import React, { useRef, useState } from 'react'

import Slider from 'react-slick'
import Image from '../../../../../../assets/achievementImg.png'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useSelector } from 'react-redux'
import AddAchievementModal from '../../../AdminModal/AddAchievementModal/AddAchievementModal'

const allData = [
  {
    title: 'Heading',
    imgS: Image,
    date: '22 Oct 2021',
    desc: 'The Institute is in parallel with Indian values, spiritualism & hard work under the efficient directions of Shri Govind Maheshwari.',
  },
  {
    title: 'Heading',
    imgS: Image,
    date: '22 Oct 2021',
    desc: 'The Institute is in parallel with Indian values, spiritualism & hard work under the efficient directions of Shri Govind Maheshwari.',
  },
  {
    title: 'Heading',
    imgS: Image,
    date: '22 Oct 2021',
    desc: 'The Institute is in parallel with Indian values, spiritualism & hard work under the efficient directions of Shri Govind Maheshwari.',
  },
  {
    title: 'Heading',
    imgS: Image,
    date: '22 Oct 2021',
    desc: 'The Institute is in parallel with Indian values, spiritualism & hard work under the efficient directions of Shri Govind Maheshwari.',
  },
]

const Achievements = () => {
  const { adminAchievement } = useSelector((state) => state.adminInstitutes)
  const sliderRef = useRef(null)
  const [addAchievement, setAddAchievement] = useState(false)
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <div className='my-5 achievementContainer relative'>
      <Slider ref={sliderRef} {...settings}>
        {allData.map((data, i) => (
          <div
            key={i}
            className=' bg-white md:!w-[90%] w-full min-h-[415px] rounded-xl border border-[#A4A4A4]'
          >
            <img
              src={data.imgS}
              className='w-full h-[210px] rounded-lg '
              alt=''
            />
            <div className='flex flex-col p-4'>
              <h1 className='text-[26px] font-bold'>{data.title}</h1>
              <span className='text-sm text-[#A4A4A4]'>{data.date}</span>
              <p className='pt-3 text-[#424242]'>{data.desc}</p>
            </div>
          </div>
        ))}
        {adminAchievement?.map((newData, i) => (
          <div
            key={i}
            className=' bg-white md:!w-[90%] w-full min-h-[415px] rounded-xl border border-[#A4A4A4]'
          >
            <img
              src={newData.imgUrl}
              className='w-full h-[210px] rounded-lg '
              alt=''
            />
            <div className='flex flex-col p-4'>
              <h1 className='text-[26px] font-bold'>
                {newData.achievementTitle}
              </h1>
              <span className='text-sm text-[#A4A4A4]'>22 Oct 2021</span>
              <p className='pt-3 text-[#424242]'>
                {newData.achievementDetails}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className='absolute cursor-pointer md:left-[36%] left-[20%] bottom-[50px]  md:bottom-[-35px]'>
        <IoIosArrowBack
          onClick={() => sliderRef.current.slickPrev()}
          style={{ boxShadow: '0px 0px 5px grey' }}
          className='w-[40px] bg-white h-[40px] text-[#7A81DC] rounded-full p-[6px]'
        />
      </div>
      <div className='absolute cursor-pointer md:right-[36%] right-[20%] bottom-[50px]  md:bottom-[-35px]'>
        <IoIosArrowForward
          onClick={() => sliderRef.current.slickNext()}
          style={{ boxShadow: '0px 0px 5px grey' }}
          className='w-[40px] bg-white h-[40px] text-[#7A81DC] rounded-full p-[6px]'
        />
      </div>
      <div className=' md:hidden block mt-6 mb-4'>
        <div className='flex justify-center mt-12'>
          <button
            onClick={() => setAddAchievement(true)}
            className='text-[14px] none px-5 py-2 rounded-full text-white bg-[#7D23E0]'
          >
            + Add Achievement
          </button>
        </div>
      </div>
      {addAchievement && (
        <AddAchievementModal setAddAchievement={setAddAchievement} />
      )}
    </div>
  )
}

export default Achievements
