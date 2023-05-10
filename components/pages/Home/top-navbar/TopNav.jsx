import React, { useEffect, useState } from 'react'
import { Container } from './index.styled'
import Tabs from './tabs'
import Data from './data'

const TopNav = () => {
  const [clicked, setClicked] = useState(1)

  const handleToggle = (id) => {
    if (clicked === id) {
      return setClicked(1)
    }
    setClicked(id)
  }

  useEffect(() => {
    const header = document.getElementById('top-nav')

    const handleScroll = window.addEventListener('scroll', () => {
      if (window.scrollY < 450) {
        header.classList.add('hidden')
      } else {
        header.classList.remove('hidden')
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      id='top-nav'
      className='fixed md:hidden flex  justify-between space-x-2 top-0 bg-white z-40 p-3 w-full'
    >
      {Data.map((d) => (
        <Tabs
          key={d.id}
          currentValue={d}
          onToggle={() => handleToggle(d.id)}
          active={clicked === d.id}
          setClicked={setClicked}
        />
      ))}
    </div>
  )
}

export default TopNav
