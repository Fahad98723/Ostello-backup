import React from 'react'
import { CLoseBtn } from './icons'

const Panel = ({ children, className }) => {
  return (
    <div
      style={{ maxWidth: '500px', height: '700px' }}
      className={`shadow relative w-full md:w-5/12 md:mx-9 md:rounded-3xl p-5 md:p-9 font-dm-sans`}
    >
      <CLoseBtn />
      {children}
    </div>
  )
}

export default Panel
