import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

// import './style.css'

const AccordionItem = ({ currentvalue }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <div key={currentvalue.id} className='p-1 cursor-pointer'>
      <div
        onClick={() => setToggle(!toggle)}
        className={
          toggle
            ? ' flex radius bg-color-one  p-4 mb-1'
            : 'card-border flex radius p-4 mb-2'
        }
      >
        <div
          className={
            toggle
              ? 'w-11 text-xl mt-1 text-white'
              : 'w-11 text-xl text-primary-700 mt-1'
          }
        >
          {currentvalue.icon}
        </div>
        <div
          className={
            toggle
              ? 'ml-5 text-xl font-medium text-white'
              : 'font text-xl font-medium ml-5'
          }
        >
          {currentvalue.title}
        </div>
        <span className={toggle ? 'mt-1 text-white ml-auto' : 'mt-1 ml-auto'}>
          {toggle ? <BsChevronUp /> : <BsChevronDown />}
        </span>
      </div>
      {toggle && <p className='mb-4'>{currentvalue.input}</p>}
    </div>
  )
}

export default AccordionItem
