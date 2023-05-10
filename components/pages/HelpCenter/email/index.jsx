import React from 'react'
import { FaEnvelope } from 'react-icons/fa'

const Email = ({ className }) => {
  return (
    <div
      className={`pb-20 flex flex-col justify-center items-center ${className}`}
    >
      <h3 className='text-2xl font-semibold font-dm-sans mb-4 text-light-black'>
        Can’t find your answer?
      </h3>
      <div className='flex justify-center items-center'>
        <FaEnvelope className='text-primary mr-2' />
        <a
          style={{ color: '#0026AE', borderColor: '#0026AE' }}
          href='Support@ostello.co.in'
          className='font-dm-sans border-b'
        >
          Support@ostello.co.in
        </a>
      </div>
    </div>
  )
}

export default Email
