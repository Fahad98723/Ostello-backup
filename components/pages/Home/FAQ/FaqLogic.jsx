import Link from 'next/link'
import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'

const FaqLogic = ({ currentValue }) => {
  const [active, setActive] = useState(false)

  return (
    <div key={currentValue.id} className='w-11/12 md:w-7/12'>
      <h4
        style={{ backgroundColor: '#7A81DC' }}
        key={currentValue.id}
        onClick={() => setActive(!active)}
        className=' rounded-xl px-8 py-4 md:py-9 cursor-pointer flex items-center justify-between bg-[#6E3DA5] my-2 md:my-4 text-white font-medium'
      >
        <div className='text-lg'>{currentValue.title} </div>
        <BsPlusLg
          className={` transition-all duration-200 ease-in-out  ${
            active ? 'rotate-45' : ''
          }`}
        />
      </h4>
      {active && (
        <div>
          <div
            className='md:px-7 md:py-6 py-2 px-3 rounded-xl mt-2'
            style={{ border: ' 2px solid #7A81DC' }}
          >
            <h5
              style={{ color: '#595959' }}
              key={currentValue.id}
              className='font-medium text-lg md:text-xl mb-1'
            >
              {currentValue.question1}
            </h5>
            <p className='text-medium-slate text-base' key={currentValue.id}>
              {currentValue.answer1}
            </p>
          </div>
          <div
            className='md:px-7 md:py-6 py-2 px-3  rounded-xl mt-2'
            style={{ border: ' 2px solid #7A81DC' }}
          >
            <h5
              style={{ color: '#595959' }}
              key={currentValue.id}
              className='font-medium text-lg md:text-xl mb-1'
            >
              {currentValue.question2}
            </h5>
            <p className='text-medium-slate text-base' key={currentValue.id}>
              {currentValue.answer2}
            </p>
          </div>
          <div
            className='md:px-7 md:py-6 py-2 px-3 rounded-xl mt-2 mb-7'
            style={{ border: ' 2px solid #7A81DC' }}
          >
            <h5
              style={{ color: '#595959' }}
              key={currentValue.id}
              className='font-medium text-lg md:text-xl mb-1'
            >
              {currentValue.question3}
            </h5>
            <p className='text-medium-slate text-base' key={currentValue.id}>
              {currentValue.answer3}{' '}
              <Link legacyBehavior prefetch={false} href='/'>
                <a className='underline font-bold' style={{ color: '#0026AE' }}>
                  Help Center
                </a>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FaqLogic
