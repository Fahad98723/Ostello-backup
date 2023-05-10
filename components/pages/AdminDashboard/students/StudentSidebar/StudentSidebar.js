import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import Link from 'next/link'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { LogoutIcon, LogoWithTitle } from '../../../../SVGIcons'
import { allData } from '../AllData'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'

const StudentSidebar = ({ active, setActive }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const goBack = router.back

  function logout() {
    router.push('/')
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <div className='h-screen hidden md:block w-[250px] bg-white'>
        <div className=' flex justify-between items-center py-5 lg:px-2 xl:px-4 md:px-2'>
          <LogoWithTitle />
        </div>
        <div className='h-[70%]'>
          <div
            onClick={() => goBack()}
            className='p-5 mt-5 text-[#828095] flex cursor-pointer text-lg font-medium items-center'
          >
            <MdOutlineKeyboardArrowLeft className='mr-2 scale-125' /> Back
          </div>
          {allData.map((data, index) => (
            <button
              className={
                active === data.title
                  ? 'text-[#7D23E0] bg-gradient-to-r from-[#f3e8ff] fill-[#7D23E0] via-[#fff] to-[#fff] flex items-center cursor-pointer gap-x-3 py-2 '
                  : 'flex items-center text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] gap-x-3 py-2 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff]'
              }
              key={index}
              onClick={() => setActive(data.title)}
            >
              <div className='group'>
                <div className='flex items-center gap-x-3 py-1 sm:pl-[15px] lg:pl-[30px]'>
                  {data.icon}
                  <p className='font-medium'>{data.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Link legacyBehavior prefetch={false} href=''>
          <div className='flex w-full items-center gap-x-3 px-[25px]'>
            <LogoutIcon />
            <div onClick={() => logout()}>
              <p className='font-semibold text-[#828095]'>Logout</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Sidebar */}
      <div className='md:hidden block bg-white py-5 px-10 shadow-md !mt-0'>
        <div className='flex justify-start'>
          <GiHamburgerMenu
            onClick={() => setOpen(true)}
            className='text-xl scale-150 text-[#232323]'
          />
        </div>
      </div>
      {open && (
        <div className='h-screen md:hidden block w-[70%] z-50 rounded-r-3xl scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-scroll shadow-[0_35px_800px_-10px_rgba(0,0,0,0.9)] fixed top-0 left-0 bg-white'>
          <div className='flex justify-between items-center pt-12 px-4'>
            <div className=' flex w-[80%] items-center'>
              <LogoWithTitle />
            </div>
            <ImCross
              onClick={() => setOpen(false)}
              className='text-[#414141] cursor-pointer mr-3'
            />
          </div>

          <div className='flex py-5 justify-center items-center flex-col'>
            <img src={largeLogo} alt='' />
            <h3 className='pt-1'>Super Admin</h3>
          </div>
          <div
            onClick={goBack}
            className='p-5 mt-5 text-[#828095] flex cursor-pointer text-lg font-medium items-center'
          >
            <MdOutlineKeyboardArrowLeft className='mr-2 scale-125' /> Back
          </div>
          {allData.map((data, index) => (
            <button onClick={() => setActive(data.title)} key={index}>
              <span
                className={
                  data.title === active
                    ? 'text-[#7D23E0] bg-gradient-to-r from-[#f3e8ff] fill-[#7D23E0] via-[#fff] to-[#fff] flex items-center cursor-pointer gap-x-3 py-2 '
                    : 'flex items-center text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] gap-x-3 py-2 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff]'
                }
              >
                {' '}
                <div className='group px-8'>
                  <div className='flex items-center gap-x-3 py-1 sm:pl-[15px] lg:pl-[30px]'>
                    {data.icon}
                    <p className='font-semibold'>{data.title}</p>
                  </div>
                </div>
              </span>
            </button>
          ))}

          <Link legacyBehavior prefetch={false} href='/'>
            <div className='flex w-full items-center gap-x-3 px-8 py-5'>
              <LogoutIcon />
              <div>
                <p className='font-semibold text-[#828095]'>Logout</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default StudentSidebar
