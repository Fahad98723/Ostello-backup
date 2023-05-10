import {
  MinusCircleFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'

export default function FAQCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      onClick={() => {
        setIsOpen((prv) => !prv)
      }}
      className='flex  justify-between text-lg w-full mb-5  leading-6'
    >
      <div className=' '>
        <p className='flex justify-between items-center text-black font-bold cursor-pointer select-none'>
          {question}
        </p>
        {isOpen && <p className='text-gray mt-2'>{answer}</p>}
      </div>
      <span className='text-gray cursor-pointer'>
        {isOpen ? (
          <MinusCircleOutlined className='text-primary' />
        ) : (
          <PlusCircleOutlined />
        )}
      </span>
    </div>
  )
}
