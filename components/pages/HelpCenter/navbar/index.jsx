import React from 'react'
import Link  from 'next/link'
import Logo from '../../../../assets/logo_title.svg'

const Navbar = () => {
  return (
    <div className='shadow z-40 flex justify-between items-center px-6 md:px-14 pt-6 pb-4 bg-white w-full'>
      <Link legacyBehavior prefetch={false} href='/'>
        <img src={Logo.src} alt='logo' className='w-40' />
      </Link>
      <Link legacyBehavior prefetch={false}
        href='/login'
      >
        <p className='bg-primary px-8 py-1 font-dm-sans text-white rounded-lg' >Login</p>
      </Link>
    </div>
  )
}

export default Navbar