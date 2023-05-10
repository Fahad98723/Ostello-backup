import React from 'react'
import moment from 'moment'
import { IoIosRocket } from 'react-icons/io'
import deepikaImg from '../../../../assets/images/deepika.png'
import tarunImg from '../../../../assets/images/tarun.png'
import coverImg from '../../../../assets/images/achImg.png'
import { Divider } from 'antd'
import { BiCommentDetail, BiComment, BiShareAlt } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { institutesSelector } from '../../../../redux/slices/instituteSlice'
export default function AchievementCard({
  image,
  timestamp,
  title,
  description,
  boosts,
}) {
  const { currentInstitute } = useSelector(institutesSelector)
  
  const cardData = {
    coverImg: coverImg,
    instituteName: 'Allen Institute',
    date: moment(Date.now()).format('DD MMMM YYYY'),
    postText:
      'The Institute is in parallel with Indian values, spiritualism & hard work under the efficient directions of Shri Govind Maheshwari, S',
    comments: [
      {
        userName: 'Tarun',
        userImg: tarunImg,
        date: moment(Date.now()).format('dd MMMM YYYY'),
        comment: 'Great work Deepika, keep it up!',
      },
      {
        userName: 'Deepika',
        userImg: deepikaImg,
        date: moment(Date.now()).format('dd MMMM YYYY'),
        comment: 'Thank you Tarun, continue inspiring!',
      },
      {
        userName: 'Tarun',
        userImg: tarunImg,
        date: moment(Date.now()).format('dd MMMM YYYY'),
        comment: 'Great work Deepika, keep it up!',
      },
      {
        userName: 'Deepika',
        userImg: deepikaImg,
        date: moment(Date.now()).format('dd MMMM YYYY'),
        comment: 'Thank you Tarun, continue inspiring!',
      },
      {
        userName: 'Tarun',
        userImg: tarunImg,
        date: moment(Date.now()).format('dd MMMM YYYY'),
        comment: 'Great work Deepika, keep it up!',
      },
      {
        userName: 'Deepika',
        userImg: deepikaImg,
        date: moment(Date.now()).format('dd MMMM YYYY'),
        comment: 'Thank you Tarun, continue inspiring!',
      },
    ],
  }
  
  return (
    <div className='py-5'>
      <div className='max-w-[1200px] lg:mx-auto text-[#424242]  bg-white flex flex-wrap lg:flex-nowrap rounded-2xl justify-center my-5 mx-5 relative'>
        <img
          className='lg:w-5/12 hidden lg:block rounded-2xl  object-cover '
          src={image?.url}
          alt=''
        />
        <img
          className='rounded-2xl lg:hidden h-[250px] object-center w-full object-cover '
          src={image?.url}
          alt=''
        />
        <div className='absolute top-5 right-5 h-10 w-10 flex items-center justify-center bg-white rounded-full shadow-md shadow-current cursor-pointer active:opacity-75 lg:hidden'>
          <BiShareAlt className='text-3xl p-1' />
        </div>

        <div>
          <div className='px-5 py-3 font-medium space-y-2 lg:mr-20'>
            <div className=' '>
              <h1 className=' xl:text-3xl text-xl'>{currentInstitute?.name}</h1>
              <p className='xl:text-md  text-gray-400'>
                {
                  moment(timestamp).format('DD MMMM YYYY')
                  // new Date(timestamp).toLocaleDateString('en-GB')
                }
              </p>
            </div>
            <p className='xl:text-lg'>{description}</p>
          </div>
          {/* <div className='px-5 xl:mr-20 mr-10'>
            <Divider type='horizontal' className=' bg-gray/20' />
          </div>
          <div>
            <div
              className={`pb-5 space-y-5 w-full  px-6  rounded-lg flex flex-col bg-white z-[100] rounded-t-none  `}
            >
              <p className=' xl:text-xl font-bold'>
                Comments{' '}
                <span className='lg:hidden'>({cardData.comments.length})</span>
                <span className=' float-right lg:hidden'>view all</span>
              </p>

              <div className=' overflow-y-scroll no-scrollbar space-y-5 h-[250px] lg:mr-20'>
                {cardData.comments.map((item, i) => (
                  <div
                    key={i}
                    className='space-x-5 flex items-start font-semibold text-[#414141] '
                  >
                    <img
                      className='xl:w-12 xl:h-12 w-8 '
                      src={item.userImg}
                      alt=''
                    />

                    <div className='bg-gray/10 py-2  px-4  w-full rounded-lg'>
                      <h1 className='xl:text-lg text-sm '>{item.userName}</h1>
                      <span className='text-gray-400 sm:text-md text-xs'>
                        {moment(item.date).format('DD MMM YYYY')}
                      </span>
                      <p className='pt-1  text-sm'>{item.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className=' text-gray text-lg font-semibold space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex space-x-5'>
                    <div className='rounded-xl bg-gray/200 flex space-x-2 items-center justify-center px-2 py-1  h-fit '>
                      <div className='w-6 h-6 flex items-center justify-center bg-white rounded-full '>
                        <IoIosRocket className='text-[#7D23E0]' />
                      </div>
                      <span className='text-sm'>120</span>
                    </div>
                    <div className='flex items-center justify-center space-x-2'>
                      <BiComment className='xl:text-xl' />
                      <span>{cardData.comments.length}</span>
                    </div>
                  </div>
                  <BiShareAlt className='text-3xl hidden lg:block' />
                </div>
                <div className='flex sm:space-x-5 space-x-2 border border-1 border-gray/20 md:px-5 px-2 py-3  rounded-lg text-sm sm:text-md'>
                  <img
                    className='xl:w-12 xl:h-12 w-8 h-8'
                    src={cardData.comments[0].userImg}
                    alt=''
                  />
                  <input
                    type='text'
                    className='outline-none border-none focus:outline-none text-md focus:border-none font-medium w-full'
                    placeholder='Type your comment..'
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
