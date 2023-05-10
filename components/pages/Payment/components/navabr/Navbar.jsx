import React from 'react'
// import './style.css'
import logo from '../../../../../assets/logo_title.svg'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../../redux/slices/authSlice'

const Navbar = () => {
  const router = useRouter()

  
  const dispatch = useDispatch()
  return (
    <nav id='nav' className='nav-bg p-4 w-full shadow-md'>
      <div className='w-full flex justify-between items-center md:px-24 sm:px-14'>
        <img onClick={() => router.push('/')}  className='w-40' src={logo.src} alt='ostello' />
        {
         router.pathname === '/merchant/details' || router.pathname === '/merchant/details/success' ? (
            <button
          onClick={() => dispatch(logout())}
          className='rounded-md px-5 py-1 font-light  border-solid border border-primary bg-[#ffff] text-[#7D23E0] hover:text-white duration-300 hover:bg-[#7D23E0]'
        >
          Log Out
        </button>
          )
          :
          <button
          onClick={() => router.push('/')}
          className='rounded-md px-5 py-1 font-light capitalize border-solid border border-primary bg-[#ffff] text-[#7D23E0] hover:text-white duration-300 hover:bg-[#7D23E0]'
        >
          cancel
        </button>
        }
        
      </div>
    </nav>
  )
}

export default Navbar
