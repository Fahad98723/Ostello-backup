import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../../../../assets/courses_institutions/header/logo.svg'
import { authSelector, getUser } from '../../../../../redux/slices/authSlice'
import { capitalizeFirstLetter, isEmpty } from '../../../../../utils/utils'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  let { userData, isAuthenticated, loading } = useSelector(authSelector)
  const dispatch = useDispatch()
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [isMounted, setMount] = useState(false)

  useEffect(() => {
    dispatch(getUser())
    setMount(true)
  }, [dispatch])

  useEffect(() => {
    if (userData?.name?.length) {
      setUserName(userData.name)
    }
  }, [userData])

  !isMounted && null

  return (
    <nav className='w-full'>
      <div className='flex md:justify-between px-20 py-10 justify-center'>
        <div
          className='z-20'
          onClick={() => {
            router.push('/')
          }}
        >
          <img
            className='w-32 md:w-44'
            src={Logo.src}
            alt='logo'
            style={{ zIndex: '15' }}
          />
        </div>

        <div className='z-20 hidden  md:flex justify-center'>
          <Link legacyBehavior prefetch={false} href="/merchant">
          <p className='mx-3 border-2 border-white border-solid py-2 px-7 rounded-lg text-lg text-white h-fit cursor-pointer'
          >
            Add your institute
          </p>
          </Link>

          {isAuthenticated ? (
            <div
              onClick={() =>
                router.push(
                  userData.usertype === 2
                    ? '/merchant/dashboard/profile'
                    : userData.usertype === 3 && '/profile'
                )
              }
              className='flex items-center space-x-2 hover:scale-110 duration-300 cursor-pointer'
            >
              <div className='bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer '>
                {userName?.slice(0, 1).toUpperCase()}
              </div>
              <p className='text-white text-lg'>
                {!isEmpty(userName) && capitalizeFirstLetter(userName)}
              </p>
            </div>
          ) : (
            <Link legacyBehavior prefetch={false} href='/login'>
              <a className='mx-3 bg-primary py-2 px-6 rounded-lg text-lg text-white'>
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar