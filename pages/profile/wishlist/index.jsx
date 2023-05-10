import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import logo from '../../../assets/merchantDashboard/Accountancy/logo.png'
import Footer from '../../../components/layout/Footer'
import OstelloSubscribe from '../../../components/pages/HomeLanding/OstelloSubscribe'
import ProfileNavbar from '../../../components/pages/Profile/ProfileNavbar'
import ProfileToggleNavbar from '../../../components/pages/Profile/ProfileToggleNavbar'
import Wishlist from '../../../components/pages/Profile/Wishlist'
import { setShowSideBar } from '../../../redux/slices/UserProfileSidePopUp'

const Wish = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <Head>
        <title>Wishlist - Profile - Ostello</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ProfileToggleNavbar></ProfileToggleNavbar>

      <Link legacyBehavior prefetch={false} href={'/'}>
        <a
          href=''
          className='logo lg:flex items-center ml-4 mt-5 mb-12 hidden '
        >
          <img src={logo.src} alt='' />
        </a>
      </Link>
      <div className=' grid grid-cols-8 gap-0 bg-white '>
        <div className=' hidden  lg:block col-span-2 '>
          <div>
            <ProfileNavbar></ProfileNavbar>
          </div>
        </div>

        <div
          style={{
            height: '100%',
          }}
          className=' col-span-8 lg:col-span-6 mb-5 '
          onClick={() => dispatch(setShowSideBar(false))}
        >
          <div className=' lg:border border-ghost/60 border-0 rounded-2xl lg:max-w-[1200px] lg:w-[95%] w-full '>
            <div className=''>
              <Wishlist />
            </div>
          </div>
        </div>
      </div>
      <OstelloSubscribe />
      <Footer />
    </div>
  )
}

export default Wish
