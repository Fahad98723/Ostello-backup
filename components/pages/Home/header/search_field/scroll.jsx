import React from 'react'

const Scroll = ({ style, children, className }) => {
  return (
    <div
      style={style}
      className={`${className} w-full absolute mt-9 rounded-xl bg-white`}
    >
      {children}
    </div>
  )
}

export default Scroll
