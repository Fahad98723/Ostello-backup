import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import InputField from './InputField'

const OwnerDetails = ({ handleChange }) => {
  const [owner, setOwner] = useState(null)
  const { adminSingleInstitute, loading } = useSelector(
    (state) => state?.adminInstitutes
  )

  useEffect(() => {
    if (adminSingleInstitute?.owner?.name?.length) {
      setOwner(adminSingleInstitute.owner)
    }
  }, [adminSingleInstitute])

  if (loading) return <p>Loading..</p>

  return (
    <div className='my-3'>
      <div className='flex flex-col md:flex-row md:gap-x-8 justify-between'>
        <InputField
          defaultValue={owner?.name}
          label={'Owner Name'}
          setOnchange={handleChange}
          title='ownerName'
        />
        <InputField
          defaultValue={owner?.phonenumber}
          label={'Contact No.'}
          setOnchange={handleChange}
          title='ownerPhoneNumber'
          type='number'
        />
      </div>
      <div className='flex justify-between'>
        <div className='md:w-[48%] w-full'>
          <InputField
            defaultValue={owner?.email}
            setOnchange={handleChange}
            title='ownerEmail'
            type='email'
            label={'TypeofInstitute'}
          />
        </div>
      </div>
    </div>
  )
}

export default OwnerDetails
