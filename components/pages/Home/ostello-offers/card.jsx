import React from 'react'

const Card = ({ currentValue }) => {
  return (
    <div
      key={currentValue.id}
      style={{ backgroundImage: `url(${currentValue.bg.src})` }}
      className='single-offer rounded-3xl overflow-hidden bg-top bg-no-repeat bg-cover flex justify-start items-end  '
    >
      <div className='p-5 md:p-10'>
        <h3 className='font-dm-sans text-white font-semibold text-xl md:text-4xl md:my-4'>
          {currentValue.title}
        </h3>
        <p className='font-dm-sans text-white font-medium text-base md:text-xl md:w-40 mx-auto'>
          {currentValue.desc}
        </p>
      </div>
    </div>
  )
}

export default Card
