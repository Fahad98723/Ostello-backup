import Link from 'next/link'
import React from 'react'
import vector404 from '../assets/vectors/404.png'
import Navbar from '../components/pages/HomeLanding/Header/Navbar'

const Error404 = () => {
  return (
    <div className='font-dm-sans w-screen h-screen '>
     <div className=" md:max-w-[1350px] w-full mx-auto bg-white z-50 top-0 shadow">
      <Navbar />
      </div>

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit max-w-[100vw] flex flex-col items-center justify-center space-y-3 h-[calc(100vh)] px-6 lg:py-12 mt-7'>
        <img
          src={vector404.src}
          alt=''
          className='h-5/6 max-h-[300px] lg:max-h-[400px] w-auto '
        />
        <h1 className='text-3xl lg:text-5xl font-bold text-center'>
          Left, Right Oops <span className='text-primary'>Lost</span>
        </h1>
        <div className='text-center text-[#FF0000] text-lg font-medium'>
          The page you are looking for might have been removed, had it's name
          changed, or is temporarily unavailable.
        </div>

        <Link legacyBehavior prefetch={false}
          href='/'
          className='bg-primary text-white uppercase px-12 py-2 rounded-full'
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

export default Error404
