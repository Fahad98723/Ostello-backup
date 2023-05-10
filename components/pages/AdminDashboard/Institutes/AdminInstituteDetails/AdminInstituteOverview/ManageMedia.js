import React, { useRef, useState } from 'react'

import Slider from 'react-slick'
import Image from '../../../../../../assets/images/courses-image.png'
import Video from '../../../../../../assets/images/courses-video.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { AddImageIcon, CrossIcon } from '../../../../../SVGIcons'

const images = [
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
  {
    img: Image,
  },
]

const videos = [
  {
    videoAvatar: Video,
  },
  {
    videoAvatar: Video,
  },
  {
    videoAvatar: Video,
  },
  {
    videoAvatar: Video,
  },
]

const ManageMedia = () => {
  const sliderRef1 = useRef(null)
  const sliderRef2 = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0]
    setSelectedImage(URL.createObjectURL(selectedFiles))
  }

  const settings = {
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    responsive: [
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 3,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 5,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 6,
          slidesPerRow: 1,
        },
      },
    ],
  }
  const settings1 = {
    infinite: true,
    speed: 200,
    slidesToShow: 2,
  }

  return (
    <div>
      {/* For Image Upload */}
      <div className='flex md:flex-row flex-col justify-between gap-x-5 my-5'>
        <div className='relative bg-white w-full md:w-5/12 p-3 my-3 md:my-0 border-2 text-[#A8A8A8] md:h-[230px] h-130px overflow-hidden rounded-lg border-[#A4A4A4]'>
          <label>
            {!selectedImage ? (
              <div className='h-full'>
                <p className='h-[10%] md:block hidden'>Cover Images</p>
                <div className='h-[90%] flex justify-center items-center flex-col'>
                  <AddImageIcon />
                  <p className='text-[20px]'>Cover Images</p>
                </div>
                <input
                  onChange={onSelectFile}
                  accept='image/*'
                  type='file'
                  className='hidden'
                />
              </div>
            ) : (
              <div>
                <img
                  className='w-full h-[205px] shadow-sm rounded-3xl object-cover'
                  src={selectedImage}
                  alt=''
                />
              </div>
            )}
          </label>
          {selectedImage && (
            <button
              className='absolute top-6 w-[30px] right-6 '
              onClick={() => setSelectedImage(null)}
            >
              <CrossIcon className='w-full' />
            </button>
          )}
        </div>
        <div className='relative md:w-7/12 w-full p-3 bg-white border-2 text-[#A8A8A8] h-[230px] overflow-hidden rounded-lg border-[#A4A4A4]'>
          <Slider ref={sliderRef1} {...settings}>
            {images.map((image, i) => (
              <div key={i} className='p-2'>
                <div className='relative w-fit'>
                  <img
                    className='w-[85px] h-[85px] rounded-xl '
                    src={image.img}
                    alt=''
                  />
                  <button className='absolute top-1 w-[20px] right-1 '>
                    <CrossIcon className='w-full' />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          <div className='absolute cursor-pointer left-[8px] top-[42%] '>
            <IoIosArrowBack
              onClick={() => sliderRef1.current.slickPrev()}
              style={{ boxShadow: '0px 0px 5px grey' }}
              className='w-[35px] bg-white h-[35px] text-[#000] rounded-full p-[6px]'
            />
          </div>
          <div className='absolute cursor-pointer right-[8px] top-[42%]'>
            <IoIosArrowForward
              onClick={() => sliderRef1.current.slickNext()}
              style={{ boxShadow: '0px 0px 5px grey' }}
              className='w-[35px] bg-white h-[35px] text-[#000] rounded-full p-[6px]'
            />
          </div>
        </div>
      </div>
      {/* For Video Upload */}
      <div className='flex md:flex-row flex-col gap-x-5 my-5'>
        <div className='relative bg-white w-full md:w-[41%] p-3 border-2 text-[#A8A8A8] h-[100px] md:h-[230px] overflow-hidden rounded-lg border-[#A4A4A4]'>
          <label>
            {!selectedImage ? (
              <div className='h-full'>
                <p className='h-[10%] md:block hidden'>Cover Video</p>
                <div className='h-[90%] flex justify-center items-center flex-col'>
                  <AddImageIcon />
                  <p className='text-[20px]'>Cover Video</p>
                </div>
                <input
                  onChange={onSelectFile}
                  accept='image/*'
                  type='file'
                  className='hidden'
                />
              </div>
            ) : (
              <div>
                <img
                  className='w-full h-[205px] shadow-sm rounded-3xl object-cover'
                  src={selectedImage}
                  alt=''
                />
              </div>
            )}
          </label>
          {selectedImage && (
            <button
              className='absolute top-6 w-[30px] right-6 '
              onClick={() => setSelectedImage(null)}
            >
              <CrossIcon className='w-full' />
            </button>
          )}
        </div>
        <div className=' md:w-5/12 w-full mt-5 md:mt-0 p-3 relative bg-white border-2 text-[#A8A8A8] h-[230px] overflow-hidden rounded-lg border-[#A4A4A4] '>
          <Slider ref={sliderRef2} {...settings1}>
            {videos.map((video, i) => (
              <div key={i} className='p-2'>
                <div className='relative w-fit'>
                  <img
                    className='w-[205px] h-[188px]'
                    src={video.videoAvatar}
                    alt=''
                  />
                  <button className='absolute top-1 w-[20px] right-1 '>
                    <CrossIcon className='w-full' />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          <div className='absolute cursor-pointer left-[8px] top-[42%] '>
            <IoIosArrowBack
              onClick={() => sliderRef2.current.slickPrev()}
              style={{ boxShadow: '0px 0px 5px grey' }}
              className='w-[35px] bg-white h-[35px] text-[#000] rounded-full p-[6px]'
            />
          </div>
          <div className='absolute cursor-pointer right-[8px] top-[42%]'>
            <IoIosArrowForward
              onClick={() => sliderRef2.current.slickNext()}
              style={{ boxShadow: '0px 0px 5px grey' }}
              className='w-[35px] bg-white h-[35px] text-[#000] rounded-full p-[6px]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageMedia
