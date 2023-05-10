import React from 'react'

const Button = ({ content, className, ...props }) => {
  return (
    <button
      {...props}
      className={`font-bold mt-3 bg-primary text-white  border-primary-500 border w-full p-2.5 text-xl rounded-[10px] duration-500 hover:opacity-80 ${className}`}
    >
      {content}
    </button>
  )
}

export default Button
