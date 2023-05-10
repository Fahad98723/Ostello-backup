import React from 'react'
import TopInstitutes from './TopInstitutes'
import StudentRegistering from './StudentRegistering'

const Chart = () => {
  return (
    <div className='flex lg:flex-row flex-col items-center my-12 gap-y-6 md:gap-x-6'>
      <div className=' lg:w-8/12 w-full'>
        <StudentRegistering />
      </div>
      <div className='lg:w-4/12 w-full'>
        <TopInstitutes />
      </div>
    </div>
  )
}

export default Chart
