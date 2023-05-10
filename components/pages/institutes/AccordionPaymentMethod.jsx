import React from 'react'
import Data from '../Payment/section/payment_options/data'
import Item from '../Payment/section/payment_options/AccordionItem'

const AccordPaymentMethod = () => {
  return (
    <div className='md:hidden'>
      <div>
        {Data.map((d,i) => (
          <Item currentvalue={d} key={i} />
        ))}
      </div>
    </div>
  )
}

export default AccordPaymentMethod
