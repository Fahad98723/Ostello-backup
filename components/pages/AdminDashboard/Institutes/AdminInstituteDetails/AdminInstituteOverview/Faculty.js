import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from '../../../../../../assets/images/courses-image.png'
import AddFacultyModal from '../../../AdminModal/AddFacultyModal/AddFacultyModal'

const Faculty = () => {
  const { adminFaculty } = useSelector((state) => state.adminInstitutes)
  const [addFaculty, setAddFaculty] = useState(false)

  return (
    <div className='my-5'>
      <div className='flex flex-col md:flex-row gap-y-4 flex-wrap justify-between'>
        <div className='bg-white md:w-[49%] w-full px-5 py-2 border border-[#C8C8C8] rounded-xl flex items-center gap-x-5'>
          <img src={Image} className='h-[50px] w-[50px] rounded-full' alt='' />
          <div className='flex flex-col'>
            <h5 className='capitalize font-bold text-[18px]'>Mahima Singh</h5>
            <p className='text-[#A4A4A4]'>PHD, MSc</p>
          </div>
        </div>
        <div className='bg-white md:w-[49%] w-full rounded-xl px-5 py-2 border border-[#C8C8C8] flex items-center gap-x-5'>
          <img src={Image} className='h-[50px] w-[50px] rounded-full' alt='' />
          <div className='flex flex-col'>
            <h5 className='capitalize font-bold text-[18px]'>Mahima Singh</h5>
            <p className='text-[#A4A4A4]'>PHD, MSc</p>
          </div>
        </div>
        <div className='bg-white md:w-[49%] w-full rounded-xl px-5 py-2 border border-[#C8C8C8] flex items-center gap-x-5'>
          <img src={Image} className='h-[50px] w-[50px] rounded-full' alt='' />
          <div className='flex flex-col'>
            <h5 className='capitalize font-bold text-[18px]'>Mahima Singh</h5>
            <p className='text-[#A4A4A4]'>PHD, MSc</p>
          </div>
        </div>
        {adminFaculty &&
          adminFaculty.map((data, i) => (
            <div
              key={i}
              className='bg-white md:w-[49%] w-full rounded-xl px-5 py-2 border border-[#C8C8C8] flex items-center gap-x-5'
            >
              <img
                src={data.imgUrl}
                className='h-[50px] w-[50px] rounded-full'
                alt=''
              />
              <div className='flex flex-col'>
                <h5 className='capitalize font-bold text-[18px]'>
                  {data.facultyName}
                </h5>
                <p className='text-[#A4A4A4]'>{data.qualification}</p>
              </div>
            </div>
          ))}
      </div>
      <div className=' md:hidden block mt-6 mb-4'>
        <div className='flex justify-center'>
          <button
            onClick={() => setAddFaculty(true)}
            className='text-[14px] none px-5 py-2 rounded-full text-white bg-[#7D23E0]'
          >
            + Add Faculty
          </button>
        </div>
      </div>
      {addFaculty && <AddFacultyModal setAddFaculty={setAddFaculty} />}
    </div>
  )
}

export default Faculty
