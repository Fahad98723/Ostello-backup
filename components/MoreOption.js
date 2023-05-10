import { MoreOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

export default function MoreOption({ children, className }) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div
      onClick={() => setIsVisible(!isVisible)}
      className={` ${className} cursor-pointer`}
    >
      <div className='relative'>
        <MoreOutlined className='rounded-full bg-gray-200 h-8 w-8 flex items-center justify-center  ' />
        <div className=' bg-white absolute right-0 rounded-md divide-y-[.5px] shadow-[#7D23E0]/20 shadow-lg  font-medium '>
          {isVisible && children}
        </div>
      </div>
    </div>
  )
}
