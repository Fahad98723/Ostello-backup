import React, { useEffect, useState } from 'react'
import InputField from '../../InputField'
import { BsCheck } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
  addContactInformation,
  merchantSelector,
} from '../../../redux/slices/merchantSlice'
import { isEmpty } from '../../utils'


const ContactInformation = ({ pageState, progressState }) => {
  const ownerPhone = typeof window !== 'undefined' && window.localStorage
    .getItem('OWNER_PHONE')
    ?.replaceAll(' ', '') || ''
  const dispatch = useDispatch()
  const { contactInformation } = useSelector(merchantSelector)

  const [, setPage] = pageState
  const [, setProgress] = progressState
  const [mobileNumber, setMobileNumber] = useState(
    ownerPhone || contactInformation?.mobileNumber
  )
  const [landlineNumber, setLandlineNumber] = useState()
  const [ownerName, setOwnerName] = useState(contactInformation?.ownerName)
  const [ownerEmail, setOwnerEmail] = useState(contactInformation?.ownerEmail)
  const [ownerMobileNumber, setOwnerMobileNumber] = useState(
    ownerPhone || contactInformation?.ownerMobileNumber
  )
  const [instituteWebsite, setInstituteWebsite] = useState(
    contactInformation?.instituteWebsite
  )

  const [checked, setChecked] = useState(false)

  const [mobileNumberError, setMobileNumberError] = useState('')
  const [landlineNumberError, setLandlineNumberError] = useState('')
  const [ownerNameError, setOwnerNameError] = useState('')
  const [ownerEmailError, setOwnerEmailError] = useState('')
  const [ownerMobileNumberError, setOwnerMobileNumberError] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    let error = false

    if (isEmpty(mobileNumber)) {
      error = true
      setMobileNumberError('Mobile number is required')
      
      return
    } else if (mobileNumber.trim().length !== 10) {
      error = true
      setMobileNumberError('Enter a valid mobile number')
      
      return
    }
    // if (isEmpty(landlineNumber) || landlineNumber.length !== 11)
    //   setLandlineNumberError('Enter a valid landline number')
    if (isEmpty(ownerName)) {
      setOwnerNameError('Owner name is required')
      
      error = true
      return
    }
    if (isEmpty(ownerEmail)) {
      setOwnerEmailError('Owner email is required')
      
      error = true
      return
    }
    if (isEmpty(ownerMobileNumber)) {
      setOwnerMobileNumberError('Owner mobile number is required')
      
      error = true
      return
    }
    // else if ( ownerMobileNumber.length !== 10 )
    // {
    //   setOwnerMobileNumberError('Enter a valid owner mobile number')
    //   
    //   error = true
    // }
    if (error) {
      alert('Please fill all the fields correctly')
      
      return
    }

    
    dispatch(
      addContactInformation({
        mobileNumber,
        ownerName,
        ownerEmail,
        ownerMobileNumber,
        instituteWebsite,
      })
    )
    setProgress((progress) => progress + 1)
    setPage((page) => page + 1)
    localStorage.setItem('PAGE', 2)
  }

  const handleCheck = (e) => {
    e.preventDefault()
    setOwnerMobileNumberError('')
    if (checked) {
      setChecked(false)
      setOwnerMobileNumber('')
    } else {
      setChecked(true)
      setOwnerMobileNumber(mobileNumber)
    }
  }

  return (
    <form className='text-left w-full flex flex-col items-center' onSubmit={(e) => e.preventDefault()}>
     <div className="flex flex-col justify-center items-start md:w-[410px]">
     <div className='space-y-2 mb-4'>
        <h1 className='text-xl font-medium text-slate'>
          Contact number at institute
        </h1>
        <div className='h-1 w-36 bg-primary'></div>
      </div>
      <InputField
      placeholder=''
        className=''
        inputState={[mobileNumber, setMobileNumber]}
        label='Mobile No.'
        errorState={[mobileNumberError, setMobileNumberError]}
      />
      <InputField
      placeholder=''
        className=''
        inputState={[landlineNumber, setLandlineNumber]}
        label='Landline No. (Optional)'
        errorState={[landlineNumberError, setLandlineNumberError]}
      />
      <InputField
      placeholder=''
        className=''
        inputState={[instituteWebsite, setInstituteWebsite]}
        label='Institute website (Optional)'
        errorState={[landlineNumberError, setLandlineNumberError]}
      />
      <div className='space-y-2 mb-4'>
        <h1 className='text-xl font-medium text-slate'>
          Institute owner Details
        </h1>
        <div className='h-1 w-36 bg-primary'></div>
      </div>
      <InputField
      placeholder=''
        className=''
        inputState={[ownerName, setOwnerName]}
        label="Owner's Name"
        errorState={[ownerNameError, setOwnerNameError]}
      />
      <InputField
      placeholder=''
        className=''
        type='email'
        inputState={[ownerEmail, setOwnerEmail]}
        label="Owner's Email"
        errorState={[ownerEmailError, setOwnerEmailError]}
      />

      <InputField
      placeholder=''
        className=''
        inputState={[ownerMobileNumber, setOwnerMobileNumber]}
        label="Owner's Mobile No."
        errorState={[ownerMobileNumberError, setOwnerMobileNumberError]}
      />
      <button
        className='flex space-x-2 items-center ml-1 select-none'
        onClick={(e) => handleCheck(e)}
      >
        <div
          className={`h-4 w-4 border-gray ${
            !checked ? 'bg-white' : 'bg-primary'
          } border items-center justify-center`}
        >
          <BsCheck
            className={`${!checked ? 'text-transparent' : 'text-white'}`}
          />
        </div>
        <p className='text-slate text-sm'>Same as Institute mobile no.</p>
      </button>
      <div className='w-full flex items-center justify-center mt-5'>
        <button
          onClick={(e) => handleSave(e)}
          className='my-2 transition-all hover:-translate-y-1 border bg-primary shadow hover:shadow-lg rounded-full px-12 py-2 text-white font-medium'
        >
          Save & Continue
        </button>
      </div>
     </div>
    </form>
  )
}

export default ContactInformation
