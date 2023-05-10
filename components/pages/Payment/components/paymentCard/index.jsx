import React from 'react'

const PaymentCard = ({ children, className }) => {
  return (
    <div
      className={`${className} text-grey-border rounded-3xl shadow-xl pt-9 px-4 md:px-7 pb-24 md:h-screen`}
    >
      {children}
    </div>
  )
}

export default PaymentCard
