import React from 'react'

export default function Container(props) {
  const { children, className } = props
  return (
    <div
      {...props}
      className={`container mx-auto mb-5 xl:px-20 md:px-15 ${className}`}
    >
      {children}
    </div>
  )
}
