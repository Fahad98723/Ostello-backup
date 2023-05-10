import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InputField from './InputField'

const BasicDetails = ({ handleChange }) => {
  const { adminSingleInstitute } = useSelector((state) => state.adminInstitutes)
  const { name, email, phonenumber, description } = adminSingleInstitute

  return (
    <div className='md:my-0 my-3'>
      <div className='flex gap-x-8 flex-col md:flex-row justify-between'>
        <InputField
          setOnchange={handleChange}
          defaultValue={name}
          title='name'
          label={'Institute Name'}
        />
        <InputField
          defaultValue={phonenumber}
          setOnchange={handleChange}
          type={'number'}
          label={'Contact No.'}
          title='phonenumber'
        />
      </div>
      <div className='bg-white px-6 rounded-xl md:my-4 my-1 border border-[#C8C8C8] py-2 w-full'>
        <p className='text-[14px] md:text-black text-[#979797] md:font-normal font-bold'>
          Overview
        </p>
        <textarea
          defaultValue={description}
          onChange={handleChange}
          rows='4'
          title='description'
          className='border-0 outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full'
        />
      </div>
      <div className='flex md:flex-row flex-col gap-x-8 justify-between'>
        <InputField
          defaultValue={email}
          label={'Institute Email'}
          setOnchange={handleChange}
          type={'email'}
          title='email'
        />
        <InputField
          defaultValue={'XYZ_institute.co.in'}
          label={'Institute Website'}
        />
      </div>
      <div className='flex justify-between'>
        <div className='md:w-[48%] w-full'>
          <InputField defaultValue={'Hybrid'} label={'TypeofInstitute'} />
        </div>
      </div>
    </div>
  )
}

export default BasicDetails
