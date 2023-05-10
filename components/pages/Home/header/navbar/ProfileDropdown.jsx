import { DownOutlined, UpOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  authSelector,
  getInstituteDetails,
  getUser,
  logout,
} from '../../../../redux/slices/authSlice'
import { useClickOutside } from '../../../../components/hooks/useClickOutside'
import { useRouter } from 'next/router'

export default function ProfileDropdown() {
  const { userData, isAuthenticated, instituteDetails } =
    useSelector(authSelector)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const router = useRouter()
  let domNode = useClickOutside(() => {
    setOpen(false)
  })
  useEffect(() => {
    dispatch(getUser())
    dispatch(getInstituteDetails())
  }, [dispatch])

  const options = [
    'Profile',
    'Wishlist',
    'Recently viewed',
    'Purchased courses',
    'Ongoing courses',
    'Reviews',
    'Referral & Coupons',
    'Payment Methods',
    'Logout',
  ]

  let userName = userData?.name || instituteDetails?.owner?.name

  
  return (
    <div className='' ref={domNode}>
      <div
        onClick={() => setOpen(!open)}
        className={`flex relative items-center  
         ring-gray/30 z-50  justify-between m-1 px-3 rounded-md text-xl text-white py-1 space-x-2 w-fit cursor-pointer select-none  `}
      >
        <div className='bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1'>
          {userName?.slice(0, 1).toUpperCase()}
        </div>
        <p className=' whitespace-nowrap '>{userName}</p>

        <>
          {open ? (
            <UpOutlined className={`flex items-center text-white text-xs $`} />
          ) : (
            <DownOutlined className={`flex items-center  text-xs text-white`} />
          )}
        </>

        <>
          <div
            className={`absolute top-14  rounded-md
             -right-2 shadow-3xl divide-y-[.5px] divide-gray/50 bg-white text-black ${
               !open && 'hidden'
             }`}
          >
            {options.map((item, i) => (
              <div
                onClick={() => {
                  setSelected(item)

                  setOpen(!open)
                }}
                key={i}
              >
                <p
                  onClick={() => {
                    if (item === 'Logout') {
                      dispatch(logout())
                      return
                    }
                    router.push(`/${item.toLowerCase()}`)
                  }}
                  className={`px-3 w-full py-1 cursor-pointer transition-all whitespace-nowrap duration-300 ease-in-out hover:bg-primary/60 hover:text-white `}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  )
}
