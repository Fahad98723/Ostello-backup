import React from 'react'
import { useSelector } from 'react-redux'
import InputField from '../../../../../InputField'

const BankingDetails = ({ handleChange }) => {
  return (
    <div className='my-5'>
      <div className='flex flex-col md:flex-row gap-x-8 justify-between'>
        <InputField
          defaultValue={'5674 6578 7568 7564'}
          label={'Bank Account No'}
          setOnchange={handleChange}
          title='bankNumber'
        />
        <InputField
          defaultValue={'Hitler Peace Bank'}
          label={'Name of the Bank'}
          setOnchange={handleChange}
          title='bankName'
        />
      </div>
      <div className='flex flex-col md:flex-row gap-x-8 justify-between'>
        <InputField
          defaultValue={'1234NAZ1'}
          label={'IFSC Code'}
          setOnchange={handleChange}
          title='ifscCode'
        />
        <InputField
          defaultValue={'321245IOS879'}
          label={'GST No.'}
          setOnchange={handleChange}
          title='gstNo'
        />
      </div>
    </div>
  )
}

export default BankingDetails
