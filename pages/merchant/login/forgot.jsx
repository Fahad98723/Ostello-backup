import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import PhoneInput from 'react-phone-number-input'
import Footer from '../../../components/layout/Footer'
import MetaHelmet from '../../../components/MetaHelmet'
import Navbar from '../../../components/pages/Payment/components/navabr/Navbar'
import { host } from '../../../utils/constant'
import { phoneNumberToNumber } from '../../../utils/utils'
import {
  hasMin8,
  hasNumber,
  hasSpecialChar,
  hasUppercase
} from '../signup/index'

const OTPInput = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)
const ResendOTP  = dynamic(
  () => {
    return import('otp-input-react')
  },
  { ssr: false }
)
const initialErrorText = {
  color: '',
  phone: '',
  email: '',
  otp: '',
  password: '',
  confirmPassword: '',
}

export const VerifyPhoneNumber = ({
  phoneVerifyState,
  errorState,
  phoneNumberState,
  phoneVerifiedState,
}) => {
  const [phoneNumber, setPhoneNumber] = phoneNumberState
  const [, setIsPhoneVerified] = phoneVerifyState
  const [errorText, setErrorText] = errorState
  const [, setShowError] = useState(false)
  const [value, setValue] = useState('+91')
  const [, setPhoneVerified] = phoneVerifiedState
  const router = useRouter()
  const handlePhoneNumber = (e) => {
    const normalizedPhoneNumber = (value, previousValue) => {
      if (!value) return value
      const currentValue = value.replace(/[^\d]/g, '')
      const cvLength = currentValue.length

      if (!previousValue || value.length !== previousValue.length) {
        setErrorText(initialErrorText)
        if (cvLength < 4) return currentValue
        else if (cvLength <= 7)
          return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`
        else return `${currentValue.slice(0, 5)} ${currentValue.slice(5, 10)}`
      }
    }

    e.preventDefault()
    setPhoneNumber(normalizedPhoneNumber(e.target.value, phoneNumber))
  }

  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpSec, setOtpSec] = useState(30)
  const [otpSentOnce, setOtpSentOnce] = useState(false)


  const handleOTPSend = (e) => {
    e.preventDefault()
    if (`${phoneNumberToNumber(phoneNumber)}`.length < 10) {
      setErrorText({
        ...errorText,
        color: 'red',
        phone: 'Enter a valid Phone Number',
      })
      return
    }

    window.localStorage.setItem('OWNER_PHONE', phoneNumber)

    axios
      .get(`${host}/users?phonenumber=${phoneNumberToNumber(phoneNumber)}`)
      .then((res) => {
        if (res.data.message.id) {
          setOtpSent(true)
          setOtpSec(30)
          if (!otpSentOnce) {
            axios({
              method: 'get',
              url: `${host}/auth/otp/generate`,
              params: {
                phonenumber: phoneNumberToNumber(phoneNumber),
                email: '',
              },
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            })
              .then((res) => {
                setErrorText({
                  ...errorText,
                  color: 'green',
                  otp: res.data.message,
                })
                setOtpSentOnce(false)
              })
              .catch((err) => {
                console.error(err)
                setErrorText({
                  ...errorText,
                  color: 'red',
                  otp: err.data.error,
                })
              })
          } else {
            axios({
              method: 'get',
              url: `${host}/auth/otp/resend`,
              params: {
                phonenumber: phoneNumberToNumber(phoneNumber),
                retrytype: 'string',
              },
            })
              .then((res) => {
                setErrorText({
                  ...errorText,
                  color: 'green',
                  otp: res.data.message,
                })
                setOtpSentOnce(true)
              })
              .catch((err) => {
                console.error(err)
                setErrorText({
                  ...errorText,
                  color: 'red',
                  otp: err.data.error,
                })
              })
          }
        }
      })
      .catch((err) => {
        console.error(err)
        toast.error('User not found !')
      })
  }

  const handleOTPVerify = (e) => {
    e.preventDefault()
    axios({
      method: 'get',
      url: `${host}/auth/otp/verify`,
      params: {
        phonenumber: phoneNumberToNumber(phoneNumber),
        otp: otp,
      },
    })
      .then((res) => {
        setErrorText({
          ...errorText,
          color: 'green',
          otp: res.data.message,
        })
        setIsPhoneVerified(true)
        setPhoneVerified(true)

        // axios
        //   .get(`${host}/users?phonenumber=${phoneNumberToNumber(phoneNumber)}`)
        //   .then((res) => {
        //     
        //     if (res.data.message.id) {
        //       window.localStorage.setItem('OWNER_ID', res.data.message.id)
        //       navigate('/merchant/login')
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err)
        //   })
      })
      .catch((err) => {
        console.error(err)

        setErrorText({
          ...errorText,
          color: 'red',
          otp: err.data.error,
        })
        setShowError(true)
      })
  }

  useEffect(() => {
    let timer = null
    if (otpSent) {
      timer = setTimeout(() => {
        setOtpSec((s) => s - 1)
        if (otpSec <= 1) {
          setOtpSent(true)
          clearInterval(timer)
        }
      }, 1000)
    }
    return () => clearTimeout(timer)
  })

  return (
    <div className='space-y-4 mt-6 sm:max-w-[375px]'>
      <div className=''>
        <div className='flex'>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>{errorText.phone}</p>
        </div>

        <div className={`${otpSent && 'hidden'} h-10 px-4 border rounded-[10px] mb-5 border-[#D0D5DD] lg:w-5/5 flex items-center text-lg w-full`}>
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
            value={phoneNumber}
          />
                </div>

        <div className=''>
          <div className='flex-1'></div>
          <p
            className={`text-${errorText.color} flex justify-center items-center m-auto`}
          >
            {errorText.otp}
          </p>
        </div>

        {otpSent ? (
          <div className='flex justify-between items-center space-x-2 py-4 px-4 text-xl sm:max-w-[375px]'>
            <OTPInput
              inputClassName='border-2 border-[#DFCBFB] text-[24px] md:text-[48px] md:w-[60px] md:h-[60px] rounded text-primary font-bold'
              className='items-center m-auto '
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={4}
              otpType='number'
              disabled={false}
            />
          </div>
        ) : (
          ''
        )}


        {otpSent ? (
          <div className='flex justify-center '>
          <button
            onClick={(e) => handleOTPVerify(e)}
            className='border border-[#D0D5DD] hover:text-[#344054] w-[360px] hover:font-bold px-10 
            lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary  text-white '
          >
            Verify OTP
          </button>
        </div>
        ) : (
          <div className='flex justify-center'>
        <button
          onClick={(e) => handleOTPSend(e)}
          className='border border-[#D0D5DD] w-[360px] hover:text-[#344054] hover:font-bold px-10 
          lg:w-full lg:py-2  transition-all hover:-translate-y-1 m-auto py-1 text-base  lg:space-x-2 rounded-[10px]  hover:bg-lavender bg-primary hover:text-#344054  text-white '
        >
          Proceed
        </button>
      </div>
        )}
        
        {otpSent && otpSec < 1 && (
          <button
          onClick={(e) => handleOTPSend(e)}
            className={`  w-full lg:py-2 m-auto py-1 text-base flex justify-center items-center lg:space-x-2  `}
          >
            <p>Didn’t receive the OTP?</p>
            <p className=' font-bold text-primary'>
              Click to resend
            </p>
          </button>
        )}

        {otpSec !== 30 && otpSec !== 0 && otpSec > 0 && (
          <p className='text-gray text-sm flex justify-center items-center mt-3  m-auto mb-3'>
            Resend OTP in <span className='font-medium pl-2'> {otpSec}</span>s
          </p>
        )}
      </div>

      <div className={`${otpSent && 'hidden'} flex lg:flex-row flex-col items-center  space-x-2  lg:w-max  `}>
        <p className='font-medium text-sm text-gray'>
          Already have an account ?
        </p>

        <button onClick={() => router.push('/merchant/login')}>
          <div className='px-12 lg:px-0 lg:py-0 rounded-full text-sm text-primary'>
            Login to your Merchant Account
          </div>
        </button>
      </div>
    </div>
  )
}

export default function Forgot({meta}) {
  const router = useRouter()
  const [errorText, setErrorText] = useState(initialErrorText)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isPhoneVerified, setisPhoneVerified] = useState(false)
  const [isVerified, setisVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   if (isPhoneVerified) {
  //     setisVerified(true);
  //   } else {
  //     setErrorText({
  //       ...errorText,
  //       color: "red",
  //       phone: "Please verify your phone number",
  //     });
  //   }
  // };

  const handleChangePWD = (e) => {
    e.preventDefault()
    if (
      !hasMin8(password) ||
      !hasNumber(password) ||
      !hasSpecialChar(password) ||
      !hasUppercase(password)
    ) {
      setErrorText({
        ...errorText,
        color: 'red',
        password: 'Enter a valid password',
      })
    } else if (password !== confirmPassword) {
      setErrorText({
        ...errorText,
        color: 'red',
        confirmPassword: 'Confirm password do not match',
      })
    } else {
      axios
        .patch(`${host}/users/forgot`, {
          phonenumber: phoneNumberToNumber(phoneNumber),
          password: password,
        })
        .then((res) => {
          toast.success('Password reset successfully completed !')
          router.push('/merchant/login')
        })
        .catch((err) => console.error(err))
    }
  }

  useEffect(() => {
    if (isPhoneVerified) {
      setisVerified(true)
    }
  }, [isPhoneVerified])

  return (
    <>
    <MetaHelmet title={meta.title} link={meta.link} />
    <div className="fixed w-full bg-white z-50 top-0 shadow">
      <Navbar />
      </div>
      <main className='w-screen h-screen m-0 p-0 font-dm-sans mt-[130px]'>
        <section className='p-3 flex flex-col-reverse gap-8 lg:flex-row items-center bg-white '>
          <div className='h-screen w-full flex flex-col items-center lg:px-24'>
            <div className='flex flex-col lg:py-0 items-center  w-full lg:h-full '>
              <div className='flex items-center transition-all'>
                <div className='flex flex-col items-center w-full '>
                  <>
                    {' '}
                    <h1 className='font-bold text-2xl text-left '>Forgot Password</h1>
                    <h2 className='font-medium text-base text-left '>
                    Please enter your details to reset.
                    </h2>
                  </>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className=''>
            {!isVerified ? (
              <VerifyPhoneNumber
                phoneNumberState={[phoneNumber, setPhoneNumber]}
                phoneVerifyState={[isPhoneVerified, setisPhoneVerified]}
                errorState={[errorText, setErrorText]}
                phoneVerifiedState={[phoneVerified, setPhoneVerified]}
              />
            ) : (
              <CreateNewPassword
                errorState={[errorText, setErrorText]}
                passwordState={[password, setPassword]}
                confirmpwdState={[confirmPassword, setConfirmPassword]}
              />
              // <div className="">Yayy</div>
            )}
            <div className='flex flex-col items-center py-5'>
              {!isVerified ? (
                ''
              ) : (
                // <button
                //   onClick={(e) => handleVerify(e)}
                //   className="bg-purple-main transition-all hover:-translate-y-1 shadow-lg px-12 lg:px-24 py-2 rounded-full font-medium text-lg text-white"
                // >
                //   Verify
                // </button>
                <button
                  onClick={(e) => handleChangePWD(e)}
                  className='bg-purple-main transition-all hover:-translate-y-1 shadow-lg px-12 lg:px-12 py-2 rounded-full font-medium text-lg text-white'
                >
                  Reset password
                </button>
              )}

              {/* <p className="font-medium text-sm mt-8 mb-2 text-gray">
                New to Ostello ?
              </p>
              <button
                className="text-purple-main transition-all hover:-translate-y-1 p-[4px] rounded-full font-medium text-lg bg-white"
                onClick={() => navigate("/merchant/signup")}
              >
                <div className="px-12 lg:px-12 py-2 bg-white rounded-full text-base">
                  Create your Institute account
                </div>
              </button> */}
            </div>
          </form>
            </div>
          </div>
        </section>
        <section className='bg-[#F4EBFF] px-6 py-10 lg:pt-16 '>
          <div className='md:max-w-[1200px]'>
            <div className='md:flex justify-between'>
              <div className=''>
                <p className='text-xl font-semibold'>Join our newsletter</p>
                <p className='text-base'>
                  We’ll send you a nice letter once per week. No spam.
                </p>
              </div>

              <div className='my-3'>
                <input
                  type='text'
                  placeholder='Enter your email'
                  className='py-4 px-2 join w-full md:w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl'
                />
                <button className='px-6 w-full md:w-[120px] py-3 shadow-md my-1 rounded-lg bg-primary'>
                  <p className='font-medium text-base text-white'>Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
      </>
  )
}

const CreateNewPassword = ({ passwordState, errorState, confirmpwdState }) => {
  const [password, setPassword] = passwordState
  const [confirmpwd, setConfirmpwd] = confirmpwdState
  // eslint-disable-next-line no-unused-vars
  const [errorText, setErrorText] = errorState

  const handlePassword = (e) => {
    e.preventDefault()
    setErrorText(initialErrorText)
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    e.preventDefault()
    setErrorText(initialErrorText)
    setConfirmpwd(e.target.value)
  }

  const [isPassShown, setIsPassShown] = useState(false)

  return (
    <div className='space-y-6 mt-10'>
      <div className=''>
        <div className='flex pb-2'>
          <div className='text-base'>New Password</div>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>{errorText.password}</p>
        </div>
        <div className='flex justify-center rounded-[10px] shadow
            border border-[#D0D5DD]  items-center
            py-1.5
            '>
          <input
            type={isPassShown ? 'text' : 'password'}
            placeholder='Create new password'
            className='w-full px-3
            mx-auto
            text-[14px]
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:outline-none
            '
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <button
            className={` px-2 py-1 font-medium flex justify-center items-center lg:space-x-2 rounded-2xl `}
            onClick={(e) =>{e.preventDefault()
             setIsPassShown(!isPassShown)}}
          >
            {isPassShown ? (
              <React.Fragment>
                <BsEyeSlash className='text-slate text-2xl' />
                {/* <span className="text-slate hidden lg:block">Hide</span> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <BsEye className=' text-2xl text-slate' />
                {/* <span className="text-white hidden lg:block">Show</span> */}
              </React.Fragment>
            )}
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasMin8(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm'>Minimum 8 characters</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasUppercase(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm flex-1 min-w-48'>An Uppercase</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-primary'>
            {hasSpecialChar(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm'>Special char(&$%#)</p>
        </div>
        <div className='flex space-x-1 items-center text-lavender'>
          <div className='text-pri'>
            {hasNumber(password) ? (
              <AiFillCheckCircle />
            ) : (
              <AiOutlineCheckCircle />
            )}
          </div>
          <p className='text-slate text-sm'>A Number</p>
        </div>
      </div>

      <div className=''>
        <div className='flex pb-2'>
          <div className='text-base'>Confirm Password</div>
          <div className='flex-1'></div>
          <p className={`text-${errorText.color}`}>
            {errorText.confirmPassword}
          </p>
        </div>
        <div className='flex justify-center rounded-[10px] shadow
            border border-[#D0D5DD]  items-center
            py-1.5
            '>
          <input
            type={isPassShown ? 'text' : 'password'}
            placeholder='Create new password'
            className='w-full px-3
            mx-auto
            text-[14px]
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:outline-none
            '
            value={confirmpwd}
            onChange={(e) => handleConfirmPassword(e)}
          />
          <button
            className={` px-2 py-1 font-medium flex justify-center items-center lg:space-x-2 rounded-2xl `}
            onClick={(e) =>{e.preventDefault()
             setIsPassShown(!isPassShown)}}
          >
            {isPassShown ? (
              <React.Fragment>
                <BsEyeSlash className='text-slate text-2xl' />
                {/* <span className="text-slate hidden lg:block">Hide</span> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <BsEye className=' text-2xl text-slate' />
                {/* <span className="text-white hidden lg:block">Show</span> */}
              </React.Fragment>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const meta = {
    title: 'Forgot Password - ostello.co.in',
    link: 'https://www.ostello.co.in/merchant/login/forgot',
  }
  // 
  return {
    props: {
      meta,
    },
  }
}