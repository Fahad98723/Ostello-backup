import React from 'react'

import TabPaymentMethod from './TabPaymentMethod'
import AccordPaymentMethod from './AccordionPaymentMethod'

const PaymentOptions = () => {
  return (
    <>
      <TabPaymentMethod />
      <AccordPaymentMethod />
    </>
  )
}

export default PaymentOptions
