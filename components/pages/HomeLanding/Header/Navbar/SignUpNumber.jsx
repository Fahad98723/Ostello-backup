import React, { useEffect, useRef, useState } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import PhoneInput from 'react-phone-number-input'
import google from '../../../../../assets/contact-us/google.svg'
import toast from 'react-hot-toast'
import axios from 'axios'
import { host } from '../../../../../utils/constant'
import { phoneNumberToNumber } from '../../../../../utils/utils'
import { useRouter } from 'next/router'
import { Check, Times } from '../../../../auth/student/sub-components/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addRegisterData } from '../../../../../redux/slices/signUpSlice'
import { setAuthModalState } from '../../../../../redux/slices/authSlice'
export default function SignUpNumber({
  handleClose,
  mobilenumber,
  handleOtpSent,
  handleActive,
  handleNumber,
  handleGoogleSignIn,
}) {
  const [value, setValue] = useState('+91')
  const dispatch = useDispatch()

  const handlePhoneNumber = (e) => {
    const normalizedPhoneNumber = (value, previousValue) => {
      if (!value) return value
      const currentValue = value.replace(/[^\d]/g, '')
      const cvLength = currentValue.length

      if (!previousValue || value.length !== previousValue.length) {
        if (cvLength < 4) return currentValue
        else if (cvLength <= 7)
          return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`
        else return `${currentValue.slice(0, 5)} ${currentValue.slice(5, 10)}`
      }
    }

    e.preventDefault()
    handleNumber(normalizedPhoneNumber(e.target.value, mobilenumber))
  }
  return (
    <div className='  rounded-[10px] md:w-[370px] w-[300px]'>
      <div className='flex text-white rounded-t-[5px] bg-primary h-[80px] justify-center items-center'>
        <div className='text-center flex flex-col w-full'>
          <div className='flex justify-between items-center mt-3'>
            <LeftOutlined
              onClick={() => dispatch(setAuthModalState(4))}
              className='pl-3 text-[14px] font-bold'
            />
            <span className='text-[18px] font-bold'>Sign Up</span>
            <p
              className='cursor-pointer text-[16px] font-bold pr-3'
              onClick={handleClose}
            >
              x
            </p>
          </div>
          <p className='text-[12px] pr-3 pl-3 '>
            You’re just one step away from signing up
          </p>
          <p className="text-[13px] pr-3 pl-3 pb-5 font-bold">
            Sign up and get Cashback!
          </p>
        </div>
      </div>
     <div className="bg-white pt-5 rounded-b-[10px]">
     <div className='flex flex-col gap-4 p-3 items-center '>
        <div
          className={`h-10 px-4 border rounded-[10px] mb-5 border-[#D0D5DD] lg:w-5/5 flex items-center text-lg w-full`}
        >
          <PhoneInput
            className='w-10'
            placeholder='Enter your mobile number'
            defaultCountry='IN'
            value={value}
            onChange={setValue}
            international
          />
          <p className='py-2'>{value}</p>
          <p className='px-2 text-3xl text-gray'>|</p>
          <input
            type='text'
            placeholder='Enter your Phone No '
            className='flex-1 focus:outline-none focus:border-0 text-base '
            onChange={(e) => handlePhoneNumber(e)}
            value={mobilenumber}
          />
        </div>

        <button
          onClick={() => {
            axios
              .get(
                `${host}/users?phonenumber=${phoneNumberToNumber(mobilenumber)}`
              )
              .then((res) => {
                if (res.data.message.id) {
                  toast.error('User already exist. Please login')
                  typeof window !== 'undefined' &&
                    window.localStorage.setItem('OWNER_ID', res.data.message.id)
                  dispatch(setAuthModalState(1))
                }
              })
              .catch(() => {
                dispatch(
                  addRegisterData({
                    phonenumber: mobilenumber,
                    // email: emailRef.current.value,
                  })
                )
                axios({
                  method: 'get',
                  url: `${host}/auth/otp/generate`,
                  params: {
                    phonenumber: mobilenumber,
                    // email: emailRef.current.value,
                    //   otp: 2154,
                  },
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                  },
                })
                  .then((res) => {
                    
                    handleOtpSent()
                    dispatch(setAuthModalState(6))
                  })
                  .catch((err) => {
                    
                  })
              })
          }}
          className='font-lg w-full ml-3 mr-3 px-2 py-2 text-white bg-primary border border-[#D0D5DD] rounded-[10px] active:opacity-75'
        >
          Continue
        </button>
      </div>
      <p className='text-[#333232] text-center mt-5'>
        Have an account?{' '}
        <span
          onClick={() => {
            dispatch(setAuthModalState(1))
          }}
          className='text-primary cursor-pointer mr-3'
        >
          LOG IN
        </span>
      </p>
      <div className='relative flex p-5 items-center'>
        <div className='flex-grow border-t border-[#D0D5DD]'></div>
        <span className='flex-shrink mx-4 text-[#333232]'>or</span>
        <div className='flex-grow border-t border-[#D0D5DD]'></div>
      </div>
      <div className='flex flex-row items-center pb-5'>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleGoogleSignIn()
          }}
          className='font-lg w-full ml-3 mr-3 px-2 py-2 text-[#333232] bg-white border border-[#D0D5DD] flex justify-start rounded-[10px] active:opacity-75'
        >
          <span className='text-left'>
            <img className='w-[20px] mr-10' src={google.src} alt='' />
          </span>
          <span className='ml-[80px]'>GOOGLE</span>
        </button>
      </div>
     </div>
    </div>
  )
}
