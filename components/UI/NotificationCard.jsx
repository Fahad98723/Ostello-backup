import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
const NotificationCard = ({ item }) => {
  return (
    <div className='flex w-full p-3 bg-white space-x-2 lg:space-x-4'>
      <img src={item.src} alt='' className='w-14 h-14 rounded-full' />
      <div className='w-full  '>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-base'>
            {item.name}
            {item.type === 'comment' && (
              <span className='text-primary block text-sm'>
                commented on your course
              </span>
            )}
          </h1>
          <h1 className='text-primary text-sm'>{`${item.time}min ago`}</h1>
        </div>
        <div className='flex items-center justify-between'>
          <h1 className='text-base w-11/12'>{item.content}</h1>
          <h1 className='text-base text-ghost cursor-pointer'>
            <RiDeleteBin6Line></RiDeleteBin6Line>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
