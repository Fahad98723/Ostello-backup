import React, { useState } from 'react'
import { useClickOutside } from '../../../../hooks/useClickOutside'
import SearchHead from './SearchHead'
import LocationCard from './locationCard'
import Scroll from '../search_field/scroll'

const GpsDetector = () => {
  const [toggle, setToggle] = useState(false)
  let domNode = useClickOutside(() => {
    setToggle(false)
  })

  return (
    <div ref={domNode} className='relative w-full'>
      <SearchHead currentValue={toggle} onClick={() => setToggle(!toggle)} />

      {toggle && (
        <Scroll
          style={{ boxShadow: '0px 4px 15px rgba(125, 35, 224, 0.2)' }}
          className='md:h-24 '
        >
          <LocationCard toggle={toggle} setToggle={setToggle} />
        </Scroll>
      )}
    </div>
  )
}

export default GpsDetector
