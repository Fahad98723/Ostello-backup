import Image from 'next/image'
import React from 'react'
import secureImg from '../../../../../assets/secure.svg'

const SecureConnection = () => {
  return (
    <div className='flex justify-end mt-9 text-4xl md:text-7xl text-gray-400 pr-14'>
      <img
        src={secureImg.src}
        className='mr-3 w-8 md:w-12 '
        alt='secure connection'
      />
      <div className='text-base md:text-xl w-8 md:w-12'>secure connection</div>
    </div>
  )
}

export default SecureConnection
