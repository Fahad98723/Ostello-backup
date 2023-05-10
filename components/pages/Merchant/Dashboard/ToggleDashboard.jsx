import React from 'react'
import { MdDashboard, MdReviews } from 'react-icons/md'
import { RiFileMarkLine } from 'react-icons/ri'
import { MdOutlineInsertChart } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiFillSetting, AiOutlineDatabase } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link'
import { LogOut } from '../../../../utils/constant'
import { FaUsers } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../redux/slices/authSlice'

const ToggleDashboard = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch()

  return (
    <div className='flex items-center cursor-pointer   lg:hidden mb-3  bg-white'>
      {showSidebar ? (
        <button
          className='flex text-4xl items-center cursor-pointer fixed left-10 top-2 z-50'
          style={{ color: '#414141' }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className='flex  items-center cursor-pointer ml-4 my-3 lg:hidden '
          fill='
          #414141'
          viewBox='0 0 100 80'
          width='30'
          height='30'
        >
          <rect width='100' height='10'></rect>
          <rect y='30' width='100' height='10'></rect>
          <rect y='60' width='100' height='10'></rect>
        </svg>
      )}

      <div
        className={`top-0 left-0  bg-white   fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? '-translate-x-0 ' : '-translate-x-full'
        }`}
      >
        <div className='menu dashboard justify-start mt-16'>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/'
            activeClass='active'
            className='menu-item flex items-center gap-3'
          >
            <p className='menu-item flex items-center gap-3'>
            {' '}
            <MdDashboard></MdDashboard> Dashboard{' '}
            </p>
          </Link>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/courses'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            {' '}
            <RiFileMarkLine></RiFileMarkLine> Courses{' '}
            </p>
          </Link>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/accountancy'
            activeClass='active'
            className='menu-item flex items-center gap-3'
          >
            <p className='menu-item flex items-center gap-3'>
            <MdOutlineInsertChart></MdOutlineInsertChart> Accounts{' '}
            </p>
          </Link>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/profile'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <CgProfile></CgProfile> My Profile{' '}
            </p>
          </Link>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/students'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <FaUsers></FaUsers> Our Students{' '}
            </p>
          </Link>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/leadenquiries'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <AiOutlineDatabase></AiOutlineDatabase> Leads & Enquiries{' '}
            </p>
          </Link>

          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/reviews'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <MdReviews/> Reviews & Subscriber{' '}
            </p>
          </Link>

          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/posts'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <MdReviews/> Posts{' '}
            </p>
          </Link>

          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/notifications'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <IoIosNotificationsOutline></IoIosNotificationsOutline>Notification{' '}
            <span className='bg-red/30 p-1 rounded-full text-xs text-[#FF0000]-700'>
              0
            </span>
            </p>
          </Link>
          <Link legacyBehavior prefetch={false}
            href='/merchant/dashboard/settings'
            activeClass='active'
            
          >
            <p className='menu-item flex items-center gap-3'>
            <AiFillSetting></AiFillSetting> Setting{' '}
            </p>
          </Link>
          <h3
            onClick={() => dispatch(logout())}
            className='menu-item flex items-center gap-3'
          >
            {' '}
            <FiLogOut></FiLogOut> Log Out{' '}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default ToggleDashboard
