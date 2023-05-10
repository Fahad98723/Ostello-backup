import React, { useState } from 'react'
import TextBackground2 from '../assets/background/commingsoongradient2.png'
import BackgroundGradient from '../assets/background/landing_gradient.png'
import useScreenWidth from '../components/hooks/useScreenWidth'
import Footer from '../components/layout/Footer'
import MetaHelmet from '../components/MetaHelmet'
import Navbar from '../components/pages/HomeLanding/Header/Navbar'

const CommingSoon = ({
  meta,
  isAuth = typeof window !== 'undefined' &&
    window.localStorage.getItem('ACCESS_TOKEN') !== null,
}) => {
  const { screenWidth } = useScreenWidth()
  const [showMark, setShowMark] = useState(false)
  const [email, setEmail] = useState('second')
 

  return (
    <div
      className='font-dm-sans w-screen min-h-screen'
      style={
        screenWidth > 768
          ? {
              backgroundImage: `url(${BackgroundGradient.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100vw 90vh',
              backgroundPosition: '50% 0%',
              marginTop:"70px",
            }
          : {}
      }
    >
    <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />

    <div className="fixed md:max-w-[1350px] w-full mx-auto bg-white z-50 top-0 shadow">
    <Navbar />
    </div>

      <img
        src={TextBackground2.src}
        alt=''
        className='mx-auto w-4/5 lg:w-6/12 pt-14 lg:pt-20  lg:py-3'
      />

      <p className='text-center hidden lg:block '>
        Still Confused about your future? Don't worry!
        <br /> Ostello is working to help you UPSKILL yourself & make the right
        career choice.
      </p>

      <div className=''>
        <div className='relative  py-10  lg:py-16'>
          <h1 className='text-primary text-2xl lg:text-3xl font-bold text-center lg:py-2'>
            Stay upto date.
          </h1>
          <p className='text-base lg:text-lg text-center'>
            Don’t miss out future blogs.
          </p>

          <div className='flex flex-col m-auto space-y-5 lg:space-y-0  lg:relative py-8   lg:w-max'>
            <input
              type='email'
              className='h-12 mt-2 lg:mt-0  px-4  rounded-lg w-72  xl:w-[480px] border-2 border-primary m-auto lg:m-0  '
              placeholder='type your email here'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
            />

            <button
              onFocus={() => {
                email.length > 1 && email.includes('@')
                  ? setShowMark(true)
                  : setShowMark(false)
              }}
              className={
                (showMark && email.length > 1 && email.includes('@')
                  ? 'bg-green lg:bg-green '
                  : 'bg-blue lg:bg-primary  ') +
                ' text-white lg:absolute  lg:right-0 text-md   rounded-md mt-  p-3 w-40 m-auto  lg:w-40      '
              }
            >
              {showMark && email.length > 1 && email.includes('@')
                ? '✔'
                : 'Register'}
            </button>
            {showMark && email.length > 1 && email.includes('@') ? (
              <p className='text-white'>Thanks For Subscribing Newsletter</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CommingSoon

export const getStaticProps = async () => {
  const meta = {
    title: "Coming Soon - Ostello.co.in",
    description: "Book your course at Ostello at the best coaching institutes in Delhi near you. | Compare and Choose from the best teachers through Demo classes | Interact with the toppers and choose what's best for you",
    link: "https://www.ostello.co.in/commingsoon"
  }
  return {
    props: {
      meta,
    },
  };
};