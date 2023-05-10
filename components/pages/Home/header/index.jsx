import React from 'react'
import { BiSearch } from 'react-icons/bi'

import GpsDetector from './gps-detector'
import BG from '../../../../assets/courses_institutions/header/header.jpg'
import Search from './search_field/search'
import Navbar from './navbar'

const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className='relative  bg-no-repeat bg-cover bg-center '
    >
      <div
        className='absolute top-0 bottom-0 left-0 right-0 '
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: '5' }}
      ></div>
      <Navbar />
      <div className='md:py-20 py-5'>
        <div className='flex justify-center items-center h-full flex-col my-20 '>
          <h1 className='z-10 font-dm-sans text-3xl lg:text-5xl text-white font-semibold text-center w-10/12 md:w-9/12 lg:w-7/12'>
            Discover the <br className='sm:hidden ' /> best coaching in{' '}
            <br className='hidden sm:block' /> your area with Ostello
          </h1>

          <div className='input-container flex justify-center items-center bg-transparent md:bg-white z-10 flex-col md:flex-row w-11/12 md:w-4/6 mt-16 rounded-xl  sm:mb-0 md:py-5  px-3'>
            <div className='one flex items-center w-full md:w-2/4 '>
              <GpsDetector />
            </div>

            <div className='two flex items-center  '>
              <span>
                <BiSearch className='md:ml-4 mr-2 text-primary text-2xl' />
              </span>
              {/* <Search
                className='input-courses w-full relative'
                placeholder='Search for courses, institutes, exams'
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
