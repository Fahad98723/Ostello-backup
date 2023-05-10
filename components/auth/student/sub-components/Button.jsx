import React from 'react'

const Button = ({ className, content, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${className} mb-4 font-dm-sans text-white bg-primary border-0 outline-none rounded-lg px-5 py-1`}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
export default Button
