import React from 'react'

const Scroll = ({ style, children, className }) => {
  return (
    <div
      style={style}
      className={`${className} w-full absolute top-0 mt-14 ounded-xl bg-white`}
    >
      {children}
    </div>
  )
}

export default Scroll
