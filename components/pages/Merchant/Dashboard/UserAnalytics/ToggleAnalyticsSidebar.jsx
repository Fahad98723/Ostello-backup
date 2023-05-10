import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

const ToggleAnalyticsSidebar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className='flex items-center cursor-pointer   lg:hidden mb-3  bg-white'>
      {showSidebar ? (
        <button
          className='flex text-4xl items-center cursor-pointer fixed left-10 top-2 z-50'
          style={{ color: '#414141' }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className='flex  items-center cursor-pointer ml-4 my-3 lg:hidden '
          fill='
          #414141'
          viewBox='0 0 100 80'
          width='30'
          height='30'
        >
          <rect width='100' height='10'></rect>
          <rect y='30' width='100' height='10'></rect>
          <rect y='60' width='100' height='10'></rect>
        </svg>
      )}

      <div
        className={`top-0 left-0  bg-white   fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? '-translate-x-0 ' : '-translate-x-full'
        }`}
      >
        <div className='menu dashboard justify-start mt-16'>
        <div
            onClick={() => router.back()}
            className='p-5 mt-5 text-[#828095] flex cursor-pointer text-lg font-medium items-center'
          >
            <MdOutlineKeyboardArrowLeft className='mr-2 scale-125' /> Back
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToggleAnalyticsSidebar
