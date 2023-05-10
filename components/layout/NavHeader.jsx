import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoWithTitle from '../../assets/logo_title.svg'
import MobileLogo from '../../assets/mobile_navLogo.png'
import { BsFillGridFill } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import { community_group_link } from '../../utils/constant'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
const NavHeader = ({
  className = '',
  type = 'client',
  isAuth = typeof window !== 'undefined' && window.localStorage.getItem('ACCESS_TOKEN') !== null,
  isForm = false,
}) => {
  const [isMobileNav, setIsMobileNav] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <>
      <MobileNavBar type={type} isForm={isForm} />
      <nav
        className={`${className}  flex justify-center items-center space-x-8 font-dm-sans bg-transparent px-10 py-5`}
      >
        <Link legacyBehavior prefetch={false} href='/'>
          <img
            src={LogoWithTitle.src}
            alt='logo'
            className='w-auto cursor-pointer hidden lg:block h-4 lg:h-6 xl:h-10 pr-6 xl:pr-0'
          />
        </Link>

        {type === 'merchant' && isForm && (
          <div
            className='items-center space-x-20 hidden lg:flex'
            style={{ color: '#616161' }}
          >
            <Link legacyBehavior prefetch={false} href='/'>
              <p style={{ color: '#616161' }} className='font-medium text-base'>
                How it works
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} style={{ color: '#616161' }} href='/about-us'>
              <p style={{ color: '#616161' }} className='font-medium text-base'>
                About Us
              </p>
            </Link>
            <Link legacyBehavior prefetch={false} style={{ color: '#616161' }} href='/'>
              <p style={{ color: '#616161' }} className='font-medium text-base'>
                Benefits
              </p>
            </Link>
          </div>
        )}
        {type === 'client' && (
          <div className='items-center lg:space-x-10 xl:space-x-16 hidden lg:flex text-medium-slate'>
            <Link legacyBehavior prefetch={false} href='/about-us'>
              <p className='font-medium text-sm  xl:text-base xl:w-max text-medium-slate cursor-pointer'>
                About Us
              </p>
            </Link>

            <Link legacyBehavior prefetch={false} href='/search'>
              <p className=' cursor-pointer font-medium text-sm xl:text-base text-medium-slate'>
                Buy a course
              </p>
            </Link>
            <a
              href='https://chat.whatsapp.com/K2TxCrG5ySo4ryBufzBIqO'
              target={'_blank'}
              rel='noreferrer'
            >
              <p className='font-medium text-sm xl:text-base text-medium-slate '>
                Community
              </p>
            </a>
          </div>
        )}
        <div className='flex-1 hidden lg:block'></div>

        <div className='hidden lg:flex items-center space-x-6 '>
          <Link legacyBehavior prefetch={false} href='/merchantLanding'>
            <p
              className={`font-medium text-sm xl:text-base xl:w-max  lg:p-1 lg:px-2 text-primary border-2 rounded  border-primary transition-transform duration-500 ease-in-out hover:shadow-3xl hover:scale-[1.1]   ${
                type === 'merchant' ? 'hidden' : 'block'
              }`}
            >
              List your Institute
            </p>
          </Link>

          {!isAuth ? (
            <React.Fragment>
              <Link legacyBehavior prefetch={false} href={type === 'merchant' ? '/merchant/login' : '/login'}>
                <button className='lg:w-20 xl:w-32 xl:h-10 py-1 border-2 border-primary rounded bg-primary shadow-md transition-transform duration-100 ease-in-out hover:shadow-3xl  '>
                  <p className='font-medium text-base text-white'>Login</p>
                </button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <button
                className={`bg-primary shadow-md px-6 py-1 rounded-xl flex space-x-2 items-center  ${
                  type === 'merchant' ? 'hidden' : 'block'
                }`}
              >
                <div className='w-8 h-8 rounded-full  bg-lavender'></div>
                <p className='text-base text-white font-medium'>My Profile</p>
              </button> */}

              <button
                className='px-6 py-1 border-2  shadow-md rounded-lg border-primary'
                onClick={() => {
                  dispatch(logout())
                  router.push('/merchant')
                }}
              >
                <p className='font-medium text-base text-primary'>Logout</p>
              </button>
            </React.Fragment>
          )}
        </div>
      </nav>
    </>
  )
}

export default NavHeader

export const MobileNavBar = ({
  className = '',
  type = 'client',
  isAuth = typeof window !== 'undefined' && window.localStorage.getItem('ACCESS_TOKEN') !== null,
  isForm = false,
  navState,
}) => {
  const [isMobileNav, setIsMobileNav] = useState(false)
  return (
    <>
      <div className='lg:hidden flex justify-center items-center space-x-8 py-5'>
        <Link legacyBehavior prefetch={false} href='/'>
          <img
            src={MobileLogo.src}
            alt=''
            className='lg:hidden w-auto px-10 h-10'
          />
        </Link>
        <div className='flex-1  lg:hidden'></div>

        <button
          className={` pr-8 rounded-xl ${
            isMobileNav ? 'hidden' : ''
          } lg:hidden`}
          onClick={() => {
            setIsMobileNav(!isMobileNav)
          }}
        >
          <BsFillGridFill className='text-primary' />
        </button>
        {isMobileNav && (
          <button
            className=' pr-6 rounded-xl  lg:hidden'
            onClick={() => {
              setIsMobileNav(!isMobileNav)
            }}
          >
            <GrFormClose className='text-primary text-3xl' />
          </button>
        )}
      </div>

      {/* Mobile Side nav Bar   */}

      {isMobileNav && (
        <div
          className='absolute w-screen z-10 h-screen lg:hidden'
          style={{ backgroundColor: 'white' }}
        >
          {type === 'merchant' && isForm && (
            <div className='  ' style={{ color: '#616161' }}>
              <Link legacyBehavior prefetch={false} href='/'>
                <p className='font-medium text-center text-lg'>How it works</p>
              </Link>
              <Link legacyBehavior prefetch={false} href='/about-us'>
                <p className='font-medium text-center mb-4 mt-4 text-lg'>
                  About Us
                </p>
              </Link>
              <Link legacyBehavior prefetch={false} href='/'>
                <p className='font-medium text-center mb-4 text-lg'>Benefits</p>
              </Link>
              {isMobileNav && (
                <button
                  className=' pr-6 rounded-xl  lg:hidden'
                  onClick={() => {
                    setIsMobileNav(!isMobileNav)
                  }}
                >
                  <GrFormClose className='text-primary text-3xl' />
                </button>
              )}
            </div>
          )}
          {type === 'client' && (
            <div className='m-auto text-medium-slate'>
              <Link legacyBehavior prefetch={false} href='/about-us'>
                <p className='font-medium text-lg text-center  '>About Us</p>
              </Link>
              <Link legacyBehavior prefetch={false} href='/courses_institutes'>
                <p className='font-medium  text-center mb-4 mt-4 text-lg  '>
                  Buy a course
                </p>
              </Link>
              <a href={community_group_link}>
                <p className='font-medium text-center  mb-4 text-lg'>
                  Community
                </p>
              </a>
            </div>
          )}

          <div className=' flex flex-col  lg:hidden items-center '>
            <Link legacyBehavior prefetch={false} href='/merchantLanding'>
              <p
                className={`font-medium text-center  mb-4 text-lg xl:w-max   ${
                  type === 'merchant' ? 'hidden' : ''
                }`}
              >
                List your Institute
              </p>
            </Link>

            {!isAuth ? (
              <React.Fragment>
                {' '}
                <Link legacyBehavior prefetch={false}
                  href={type === 'merchant' ? '/merchant/signup' : '/signup'}
                >
                  <button className='w-20  mb-4 xl:w-28 xl:h-10 py-1 border-2 rounded hover:bg-primary border-primary font-medium hover:text-white  text-base text-primary'>
                    Sign Up
                  </button>
                </Link>
                <Link legacyBehavior prefetch={false} href={type === 'merchant' ? '/merchant/login' : '/login'}>
                  <button className='w-20 xl:w-32 xl:h-10 py-1 border-2 border-primary rounded bg-primary shadow-md'>
                    <p className='font-medium text-base text-white'>Login</p>
                  </button>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  className={`bg-primary shadow-md px-6 py-1 rounded-xl  space-x-2 items-center  ${
                    type === 'merchant' ? 'hidden' : 'block'
                  }`}
                >
                  <div className='w-8 h-8 rounded-full  bg-lavender'></div>
                  <p className='text-base text-white font-medium'>My Profile</p>
                </button>

                <button
                  className='px-6 py-1 border-2  shadow-md rounded-lg border-primary'
                  onClick={() => {
                    typeof window !== 'undefined' && window.localStorage.removeItem('ACCESS_TOKEN')
                    typeof window !== 'undefined' && window.localStorage.removeItem('OWNER_ID')
                    typeof window !== 'undefined' && window.location.reload()
                  }}
                >
                  <p className='font-medium text-base text-primary'>Logout</p>
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </>
  )
}
