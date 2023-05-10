import React, { useEffect, useState } from 'react'
//components
import Navbar from '../../components/pages/HelpCenter/navbar'
import FaqLogic from '../../components/pages/Home/FAQ/FaqLogic'
import Data from '../../components/pages/Home/FAQ/data'
import Email from '../../components/pages/HelpCenter/email'
//styled components
import styled from 'styled-components'
import MetaHelmet from '../../components/MetaHelmet'
import Footer from '../../components/layout/Footer'
import { useDispatch } from 'react-redux'
import { setUserLocation } from '../../redux/slices/UserAnalytics'

const Container = styled.div`
  .gradient {
    background: linear-gradient(
      180deg,
      rgba(122, 129, 220, 0.1) 0%,
      rgba(196, 196, 196, 0) 68.86%
    );
  }
`

const FaqPage = ({meta}) => {
  const [clicked, setClicked] = useState(1)
  const handleToggle = (id) => {
    if (clicked === id) {
      setClicked(1)
    }
    setClicked(id)
  }
  const dispatch = useDispatch()
  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
  return (
    <Container>
      <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />
      <div className="fixed w-full bg-white z-50 top-0 shadow">
    <Navbar />
    </div>
      <div className='gradient pt-20 mt-7'>
        <h2 className='font-dm-sans text-4xl font-semibold text-primary pb-10 text-center w-72 md:w-full mb-10'>
          Frequently Asked Questions
        </h2>
        <div className='flex items-center justify-center flex-col'>
          {Data.map((d, idx) => (
            <FaqLogic
              currentValue={d}
              key={idx}
              onClick={() => handleToggle(d.id)}
              active={clicked === d.id}
            />
          ))}
        </div>
        <Email className='mt-16' />
      </div>
      <Footer/>
    </Container>
  )
}
export default FaqPage
export const getStaticProps = async () => {
  const meta = {
    title: "FAQs - ostello.co.in",
    description: "FAQ | Frequently asked questions about ostello.co.in",
    link: "https://www.ostello.co.in/faq"
  }

  return {
    props: {
      meta,
    },
  };
};