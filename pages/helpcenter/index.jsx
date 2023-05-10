import React, { useEffect } from 'react'
//components
import Cards from '../../components/pages/HelpCenter/card'
import Email from '../../components/pages/HelpCenter/email'
import Navbar from '../../components/pages/HelpCenter/navbar'
import Search from '../../components/pages/HelpCenter/search'
//styled components
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Footer from '../../components/layout/Footer'
import MetaHelmet from '../../components/MetaHelmet'
import { setUserLocation } from '../../redux/slices/UserAnalytics'

export const Container = styled.div`
  .shadow {
    box-shadow: 0px 8px 60px rgba(122, 129, 220, 0.15);
  }

  .gradient {
    background: linear-gradient(
      180deg,
      rgba(122, 129, 220, 0.1) 0%,
      rgba(196, 196, 196, 0) 68.86%
    );
  }
`

const HelpCenter = ({meta}) => {
  const dispatch = useDispatch()
  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
  return (
    <Container className='h-full'>
      <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />
      <div className="fixed w-full bg-white z-50 top-0 shadow">
    <Navbar />
    </div>
      <div className='gradient flex flex-col justify-center items-center pt-20 mt-7'>
        <h2 className='font-dm-sans text-4xl font-semibold text-primary pb-10 text-center w-72 md:w-full mb-10'>
          Ostello Help Center
        </h2>
        <Search />
        <Cards />
        <Email />
      </div>
      <Footer/>
    </Container>
  )
}
export default HelpCenter
export const getStaticProps = async () => {
  const meta = {
    title: "Help Center - ostello.co.in",
    description: "Help Center - ostello.co.in - Information on all tuition centers and institutes in India",
    link: "https://www.ostello.co.in/helpcenter"
  }
  // 
  return {
    props: {
      meta,
    },
  };
};